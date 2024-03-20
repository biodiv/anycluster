'''-------------------------------------------------------------------------------------------------------------------------
SERVER SIDE MAP CLUSTERING
- kmeans
- grid
-------------------------------------------------------------------------------------------------------------------------'''

'''-------------------------------------------------------------------------------------------------------------------------

    WORKFLOW

    1. anycluster receives viewport coordinates from ajax query
    2. anycluster calculates map grid in pixels (coordinates -> mercator -> pixels)
    3a. (grid cluster) counts markers in each cell
    3b. (kmeans cluster) calculates k centroids for each cell
    4a. (grid_cluster) returns the cells as polygons (output srid = input srid) alongside the count
    4b. (kmeans cluster) returns kmeans centroids (output srid = input srid)

-------------------------------------------------------------------------------------------------------------------------'''

'''-------------------------------------------------------------------------------------------------------------------------
    A VIEWPORT is defined by topright bottomleft coordinates and the SRID of those coordinates

    4-------------a
    |             |
    |             |
    |             |
    b-------------2

    Polygon GEOS String:
    a -> 2 -> b -> 4 -> a
    
    GEOSGeometry('POLYGON((a.long a.lat, a.long b.lat, b.long b.lat, b.long a.lat, a.long a.lat))')

-------------------------------------------------------------------------------------------------------------------------'''

'''-------------------------------------------------------------------------------------------------------------------------
    TILE BOUNDARY RESTRICTIONS

    WGS84 datum (longitude/latitude):
    -180 -85.05112877980659
    180 85.0511287798066

    Spherical Mercator (meters):
    -20037508.342789244 -20037508.342789244
    20037508.342789244 20037508.342789244


    Mercator max: 20037508
    Mercator min: -20037508

    Pixels at zoom 0 (default, depends on gridsize):
    0 0 256 256

    "World" is a system google uses internally
    World max: 40075016
    World min: 40075016

-------------------------------------------------------------------------------------------------------------------------'''


from .clusters import PointCluster
from django.apps import apps
from django.db.models import ForeignKey
from django.conf import settings
from django.db import connections
from django.contrib.gis.db.models.fields import BaseSpatialField
from django.contrib.gis.gdal import SpatialReference, CoordTransform
from django.contrib.gis.geos import Point, GEOSGeometry, GeometryCollection, Polygon
from anycluster import MapTools, ClusterCache, FilterComposer
from anycluster.definitions import (CLUSTER_TYPE_KMEANS, CLUSTER_TYPE_GRID, GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA,
                                    MAX_BOUNDS)

import json, math
BASE_K = getattr(settings, 'ANYCLUSTER_BASE_K', 6)
K_CAP = getattr(settings, 'ANYCLUSTER_K_CAP', 30)

# get the model as defined in settings
geoapp, geomodel = settings.ANYCLUSTER_GEODJANGO_MODEL.split('.')
geo_column_str = settings.ANYCLUSTER_COORDINATES_COLUMN

# column for determining the pin image for pins with count 1
PINCOLUMN = getattr(settings, 'ANYCLUSTER_PINCOLUMN', None)
ADDITIONAL_COLUMN = getattr(settings, 'ANYCLUSTER_ADDITIONAL_COLUMN', None)

# raw sql for getting pin column value
if PINCOLUMN:
    pin_qry = [', MIN({pincolumn}) AS pinimg'.format(pincolumn=PINCOLUMN),
               '{pincolumn},'.format(pincolumn=PINCOLUMN)]
else:
    pin_qry = ['', '']

if ADDITIONAL_COLUMN:
    additional_column_qry = [', MIN({column}) AS {column}'.format(column=ADDITIONAL_COLUMN),
                             '{column},'.format(column=ADDITIONAL_COLUMN)]
else:
    additional_column_qry = ['', '']

app_config = apps.get_app_config(geoapp)
Gis = app_config.get_model(geomodel)

geo_table = Gis._meta.db_table


class MapClusterer():

    def __init__(self, cluster_cache, grid_size=256, maptile_size=256, output_srid=4326, schema_name='public'):

        self.cluster_cache = cluster_cache

        # the size of the grid in pixels. each grid cell gets its own kmeans clustering
        self.grid_size = int(grid_size)

        self.output_srid = output_srid

        self.schema_name = schema_name

        # the srid of the database, falls back to 4326
        self.db_srid = self.get_database_srid()

        self.maptools = MapTools(int(maptile_size))

    # read the srid of the database.

    def get_database_srid(self):

        db_srid = None

        srid_qry = 'SELECT id, ST_SRID({geo_column}) FROM {schema_name}.{geo_table} LIMIT 1;'.format(
            geo_column=geo_column_str, schema_name=self.schema_name, geo_table=geo_table)

        with connections['default'].cursor() as cursor:
            cursor.execute(srid_qry)

            row = cursor.fetchone()

            if row and len(row) == 2:
                db_srid = row[1]

        if not db_srid:
            try:
                db_srid = settings.ANYCLUSTER_COORDINATES_COLUMN_SRID
            except:
                db_srid = 4326

        return db_srid

    '''---------------------------------------------------------------------------------------------------------------------
        CONVERTING QUADKEY CELLS TO POSTGIS USABLE POLYGONS

        - ST_Collect(geom)
        - create a geometry collection to reduce the database queries to 1
        - this is not yet working
    ---------------------------------------------------------------------------------------------------------------------'''
    '''
    def convert_cells_to_geos(self, cells):

        # ST_Collect(ST_GeomFromText('POINT(1 2)'),ST_GeomFromText('POINT(-2 3)') )

        query_collection = 'ST_Collect(ARRAY['

        for counter, cell in enumerate(cells):

            poly = self.cluster_cell_to_bounds(cell)

            if counter > 0:
                query_collection += ','

            # ST_GeomFromText('POLYGON((0 0, 10000 0, 10000 10000, 0 10000, 0 0))',3857)
            query_collection += "ST_GeomFromText('{poly}', {srid})".format(
                poly=poly, srid=self.db_srid)

        query_collection += '])'

        return query_collection
    '''

    '''---------------------------------------------------------------------------------------------------------------------
        CONVERTING GEOJSON TO GEOS

        multipolygon and collections are not supported by ST_Within so they need to be split into several geometries
    ---------------------------------------------------------------------------------------------------------------------'''
    def get_srid_from_geojson_feature(self, geojson_feature):

        srid = 4326

        if 'crs' in geojson_feature['geometry']:
            srid_str = geojson_feature['geometry']['crs']['properties']['name']
            srid = int(srid_str.split(':')[-1])

        return srid

    def convert_geojson_feature_to_geos(self, geojson_feature):

        geos_geometries = []

        input_srid = self.get_srid_from_geojson_feature(geojson_feature)

        if geojson_feature['geometry']['type'] == 'MultiPolygon':

            for polygon in geojson_feature['geometry']['coordinates']:

                geom = {
                    'type': 'Polygon',
                    'coordinates': [polygon]
                }

                # the below causes an error
                # geos = GEOSGeometry(json.dumps(geom), srid=input_srid)
                geos = GEOSGeometry(json.dumps(geom))
                geos.srid = input_srid

                if geos.srid != self.db_srid:
                    ct = CoordTransform(SpatialReference(
                        geos.srid), SpatialReference(self.db_srid))
                    geos.transform(ct)

                geos_geometries.append(geos)

        else:

            try:
                geos = GEOSGeometry(json.dumps(
                    geojson_feature['geometry']), srid=input_srid)
            except:
                raise TypeError(
                    'Invalid GEOJSON geometry for cluster area. Use Polygon or Multipolygon')

            if geos:

                if geos.srid != self.db_srid:
                    ct = CoordTransform(SpatialReference(
                        geos.srid), SpatialReference(self.db_srid))
                    geos.transform(ct)

                geos_geometries.append(geos)

        return geos_geometries


    # returns a list of polygons in GEOS format and db_srid
    def convert_geojson_to_geos(self, geojson):

        geos_geometries = []

        if geojson['type'] == 'FeatureCollection':

            geos_geometries = []

            for feature in geojson['features']:

                geos_geometries += self.convert_geojson_feature_to_geos(
                    feature)

        elif geojson['type'] == 'Feature':

            geos_geometries = self.convert_geojson_feature_to_geos(geojson)

        return geos_geometries


    '''
    expected geometry:
    var coordinates = [ [
        [ viewport["left"], viewport["top"] ], 
        [ viewport["right"], viewport["top"] ],
        [ viewport["right"], viewport["bottom"] ],
        [ viewport["left"], viewport["bottom"] ],
        [ viewport["left"], viewport["top"] ]
    ]];
    '''
    def sanitize_geojson_viewport(self, geojson):

        coordinates = geojson['geometry']['coordinates']

        # check if the viewport spans the edges of coordinate system
        left = coordinates[0][0][0]
        top = coordinates[0][0][1]
        right = coordinates[0][1][0]
        bottom = coordinates[0][2][1]

        srid =  geojson['geometry']['crs']['properties']['name'].split(':')[-1]

        #left = min(left, MAX_BOUNDS[srid]['min_x'])
        #right = min(right, MAX_BOUNDS[srid]['max_x'])
        top = min(top, MAX_BOUNDS[srid]['max_y'])
        bottom = min(top, MAX_BOUNDS[srid]['min_y'])

        if left > right:

            sanitized_geojson = {
                'type': 'Feature',
                'geometry': {
                    'crs': geojson['geometry']['crs'],
                    'type': 'MultiPolygon',
                    'coordinates': [
                        [
                            [left, top],
                            [MAX_BOUNDS[srid]['max_x'], top],
                            [MAX_BOUNDS[srid]['max_x'], bottom],
                            [left, bottom],
                            [left, top]
                        ],
                        [
                            [MAX_BOUNDS[srid]['min_x'], top],
                            [right, top],
                            [right, bottom],
                            [MAX_BOUNDS[srid]['min_x'], bottom],
                            [MAX_BOUNDS[srid]['min_x'], top]
                        ]
                    ]
                }
            }

        else:
            sanitized_geojson = geojson

        return sanitized_geojson


    def get_cluster_geometries(self, geojson, geometry_type, zoom):

        if geometry_type == GEOMETRY_TYPE_VIEWPORT:
            geojson = self.sanitize_geojson_viewport(geojson)

        # list of polygons
        geos_geometries = self.convert_geojson_to_geos(geojson)

        cluster_geometries = []

        # eg when panning, only new cluster areas which appeared on the viewport are returned
        cluster_cache = self.cluster_cache

        # elif bool(self.params.get('deliver_cache', False)) == True:
        #    remove_cached_geometries = False
        # elif self.params.get('cache', '') == 'load':
        #    remove_cached_geometries = False

        for geos in geos_geometries:

            if geometry_type == GEOMETRY_TYPE_AREA:

                if geos.geojson not in cluster_cache.geometries:
                    cluster_geometries.append(geos)
                    cluster_cache.add_geometry(geos.geojson)

            elif geometry_type == GEOMETRY_TYPE_VIEWPORT:
                envelope = geos.envelope

                cells = self.rectangle_to_clustercells(envelope, zoom)

                for cell in cells:

                    # check if geos is rectangular, better check needed
                    if geos.equals(envelope) == True:
                        cluster_geometry = cell

                    elif cell.intersects(geos):
                        cluster_geometry = cell.intersection(geos)


                    if cluster_geometry.geojson not in cluster_cache.geometries:
                        cluster_geometries.append(cluster_geometry)
                        cluster_cache.add_geometry(cluster_geometry.geojson)

            else:
                raise TypeError('Invalid geometry_type')

        self.cluster_cache = cluster_cache

        return cluster_geometries

    '''---------------------------------------------------------------------------------------------------------------------
        CALCULATE CELL-IDs ACCORDING TO VIEWPORT

        - given the viewport, expand to the nearest grid and get all cell ids of this grid
        - returns QuadKey IDS of a viewport according to MapClusterer.gridSize

        To calculate those cells, the coordinates are transformed as shown below:
        

    LatLng ---------> Meters (Mercator) -----> Shifted origin -------> pixel coords ---------> GRID, depending on tilesize

     -----------       -----------             -----------              -----------           -----------
    |           |     |           |           |           |            |           |         |00|10|20|30|
    |           |     |           |           |           |            |           |         |01|11|21|31|
    |     O     |     |     O     |           |           |            |           |          -----------
    |           |     |           |           |           |            |           |         |02|12|22|32|
    |           |     |           |           |           |            |           |         |03|13|23|33|
     -----------       -----------            O-----------             O-----------           -----------
       LATLNG            METERS                  METERS                   PIXELS                 GRID
                                          (shifted coordinates)                          (CELL-IDs according to QuadKey,
                                                                                          depends on zoom level)

    O = origin

    The coordinate system with shifted origin has only coordinates with positive values (essential).
    Now, get the CELL-ID (=QuadKey ID) the top-right (and bottom-left) viewport coordinate sits in.
    Finally calculate all CELL-IDs that are spanned by the top-right and bottom-left cell.
        
    ---------------------------------------------------------------------------------------------------------------------'''

    '''
        Expands an envelope (=rectangle) to the fixed world grid
        Splits the grid into cells of defined size
    '''

    def rectangle_to_clustercells(self, geos_envelope, zoom):
        linear_ring = geos_envelope[0]

        left = linear_ring[0][0]
        bottom = linear_ring[0][1]
        right = linear_ring[1][0]
        top = linear_ring[2][1]

        topright = Point(right, top, srid=self.db_srid)
        bottomleft = Point(left, bottom, srid=self.db_srid)

        # project points to mercator 3875, plane coordinates
        self.maptools.point_ToMercator(topright)
        self.maptools.point_ToMercator(bottomleft)

        # shift origin
        self.maptools.point_MercatorToWorld(topright)
        self.maptools.point_MercatorToWorld(bottomleft)

        # calculate pixelcoords from world coords depending on zoom
        self.maptools.point_WorldToPixels(topright, zoom)
        self.maptools.point_WorldToPixels(bottomleft, zoom)

        # get topright and bottom left cellID, e.g. (03,01)
        topright_cell = self.maptools.point_PixelToCellID(
            topright, self.grid_size)
        bottomleft_cell = self.maptools.point_PixelToCellID(
            bottomleft, self.grid_size)

        # get all Cells that need to be clustered, as quadKey
        cluster_cells = self.maptools.getClusterCellsAsPolyList(topright_cell, bottomleft_cell, zoom, self.grid_size,
                                                                self.db_srid)

        return cluster_cells

    '''---------------------------------------------------------------------------------------------------------------------
        MERGING MARKERS BY DISTANCE
        - retrieves cluster_rows
        - returns a list of PointCluster instances
        
        - if the geometric centroids are too close to each other after the kmeans algorithm (e.g. overlap),
          they are merged to one cluster
        - used by kmeans_cluster as phase 2
        - uses pixels for calculation as this is constant on every zoom level
        - transforms cluster.id into a list
    ---------------------------------------------------------------------------------------------------------------------'''

    def distance_cluster(self, cluster_rows, zoom, c_distance=30):

        clusters_processed = []

        for cluster_row in cluster_rows:

            point_cluster = PointCluster(
                cluster_row, geo_column_str, self.db_srid)

            clustercoords = getattr(point_cluster, geo_column_str)

            added = False

            for processed_cluster in clusters_processed:
                processed_coords = getattr(processed_cluster, geo_column_str)
                pixel_distance = self.maptools.points_calcPixelDistance(
                    clustercoords, processed_coords, zoom)

                if pixel_distance <= c_distance:
                    if not type(processed_cluster.id) == list:
                        processed_cluster.id = [processed_cluster.id]

                    processed_cluster.id.append(point_cluster.id)
                    processed_cluster.count += point_cluster.count
                    added = True
                    break

            if not added:
                if not type(point_cluster.id) == list:
                    point_cluster.id = [point_cluster.id]
                clusters_processed.append(point_cluster)

        return clusters_processed

    '''---------------------------------------------------------------------------------------------------------------------
        KMEANS CLUSTERING
        - cluster only if 1. the geometry contains a new area or 2. the filters changed
        - perform a raw query on the database, pass the result to phase 2 (distance_cluster) and return the result
    ---------------------------------------------------------------------------------------------------------------------'''

    def kmeans_cluster(self, geojson, geometry_type, zoom, filters):

        cluster_geometries = self.get_cluster_geometries(geojson, geometry_type, zoom)

        markers = []

        if cluster_geometries:

            filter_composer = FilterComposer(Gis, filters)
            filterstring = filter_composer.as_sql()
            left_join_sql = filter_composer.get_left_join_sql()

            for geos_geometry in cluster_geometries:

                k = BASE_K

                if geometry_type == GEOMETRY_TYPE_AREA:
                    k = self.calculate_k(geos_geometry, zoom)

                sql = '''
                    SELECT kmeans AS id, count(*), ST_AsText(ST_Centroid(ST_Collect({geo_column})))
                    AS {geo_column} {pin_qry_0} {additional_column_qry_0}
                    FROM ( 
                      SELECT {pin_qry_1} {additional_column_qry_1} kmeans(ARRAY[ST_X({geo_column}), ST_Y({geo_column})], {k}) OVER ()
                      AS kmeans, {geo_column}
                      FROM {schema_name}.{geo_table} {geo_table} {left_join_sql}
                      WHERE {geo_column} IS NOT NULL
                          AND ST_Intersects({geo_column}, ST_GeomFromEWKT('{geos_geometry}') ) {filterstring}
                    ) AS ksub

                    GROUP BY id
                    ORDER BY kmeans;
                    
                '''.format(geo_column=geo_column_str, pin_qry_0=pin_qry[0], pin_qry_1=pin_qry[1], k=k,
                           schema_name=self.schema_name, geo_table=geo_table, left_join_sql=left_join_sql,
                           geos_geometry=geos_geometry.ewkt,
                           filterstring=filterstring, additional_column_qry_0=additional_column_qry[0],
                           additional_column_qry_1=additional_column_qry[1])

                with connections['default'].cursor() as cursor:
                    cursor.execute(sql)

                    cluster_rows = cursor.fetchall()

                kclusters = self.distance_cluster(cluster_rows, zoom)

                for point_cluster in kclusters:
                    point = getattr(point_cluster, geo_column_str)

                    if point.srid != self.output_srid:
                        self.maptools.point_AnyToAny(
                            point, point.srid, self.output_srid)

                    marker = {
                        'ids': point_cluster.id, # distance cluster clusters ids
                        'count': point_cluster.count,
                        'center': {
                            'x': point.x,
                            'y': point.y
                        },
                        'pinimg': point_cluster.pinimg,
                    }

                    if ADDITIONAL_COLUMN:
                        marker[ADDITIONAL_COLUMN] = getattr(
                            point_cluster, ADDITIONAL_COLUMN)

                    markers.append(marker)

        return markers

    '''---------------------------------------------------------------------------------------------------------------------
        GRID CLUSTERING 
        - only for GEOMETRY_TYPE_VIEWPORT, not for GEOMETRY_TYPE_AREA
    ---------------------------------------------------------------------------------------------------------------------'''
    def grid_cluster(self, geojson, zoom, filters):

        cluster_geometries = self.get_cluster_geometries(geojson, GEOMETRY_TYPE_VIEWPORT, zoom)

        gridCells = []

        if cluster_geometries:

            filter_composer = FilterComposer(Gis, filters)
            filterstring = filter_composer.as_sql()
            left_join_sql = filter_composer.get_left_join_sql()

            cursor = connections['default'].cursor()

            sql_create_temporary_table = '''CREATE TEMPORARY TABLE temp_clusterareas (
                id serial,
                polygon geometry(Geometry,3857)
            )'''

            cursor.execute(sql_create_temporary_table)

            for clusterGeometry in cluster_geometries:

                sql_insert_clustergeom = '''
                    INSERT INTO temp_clusterareas (polygon)
                    ( SELECT (
                        ST_Dump(
                            ST_GeometryFromText('{geometry}')
                    )).geom )
                '''.format(geometry=clusterGeometry.ewkt)

                cursor.execute(sql_insert_clustergeom)

            # indexing did not increase performance
            # cursor.execute('''CREATE INDEX temp_gix ON temp_clusterareas USING GIST (polygon);''')

            grid_cluster_queryset = '''SELECT count(*) AS count, polygon {pin_qry_0}, ST_Union(coordinates), MAX({geo_table}.id)
                FROM {schema_name}.{geo_table} {geo_table} {left_join_sql}, temp_clusterareas
                WHERE coordinates IS NOT NULL AND ST_Intersects(coordinates, polygon) {filterstring}
                GROUP BY polygon
            '''.format(schema_name=self.schema_name, geo_table=geo_table, left_join_sql=left_join_sql,
                    filterstring=filterstring, pin_qry_0=pin_qry[0])

            cursor.execute(grid_cluster_queryset)

            gridCells_pre = cursor.fetchall()

            for cell in gridCells_pre:

                count = cell[0]
                pinimg = None
                id = None

                geos = GEOSGeometry(cell[1], srid=3857)
                geos.transform(self.output_srid)

                if count == 1 and PINCOLUMN:
                    pinimg = cell[2]
                    point_geos = GEOSGeometry(cell[3], srid=3857)
                    point_geos.transform(self.output_srid)
                    x = point_geos.x
                    y = point_geos.y
                    id = cell[4]

                else:
                    centroid = geos.centroid
                    x = centroid.x
                    y = centroid.y            

                cellobj = {
                    'count': count,
                    'geojson': json.loads(geos.geojson),
                    'center': {
                        'x': x,
                        'y': y
                    },
                    'pinimg': pinimg,
                    'id': id
                }

                gridCells.append(cellobj)

            sql_drop_temporary_table = 'DROP TABLE temp_clusterareas'
            cursor.execute(sql_drop_temporary_table)

        return gridCells

    '''---------------------------------------------------------------------------------------------------------------------
        NON-CLUSTERING METHODS
    ---------------------------------------------------------------------------------------------------------------------'''

    def get_gis_field_names(self, table_name=None):

        if table_name == None:
            table_name=geo_table

        gis_fields = Gis._meta.concrete_fields

        gis_field_names = []

        # Relational Fields are not supported
        for field in gis_fields:
            if isinstance(field, ForeignKey):
                # name = field.get_attname_column()[0]
                continue
            if isinstance(field, BaseSpatialField):
                name = '{table_name}.{field_name}::bytea'.format(table_name=table_name, field_name=field.name)
            else:
                name = '{table_name}.{field_name}'.format(table_name=table_name, field_name=field.name)

            gis_field_names.append(name)

        return gis_field_names


    def get_gis_fields_str(self, table_name=None):

        gis_field_names = self.get_gis_field_names(table_name=table_name)

        gis_fields_str = ','.join(gis_field_names)

        gis_fields_str.rstrip(',')

        return gis_fields_str


    # return all IDs of the pins contained by a kmeans cluster
    def get_kmeans_cluster_content(self, geometry_type, ids, x, y, filters, zoom, input_srid=4326):

        cluster = Point(x, y, srid=input_srid)

        # request lnglat point
        cell_geos = self.maptools.getCellForPointAsGeos(cluster, zoom, self.grid_size, self.db_srid)

        cluster.transform(self.db_srid)

        query_geometry = None
        k = BASE_K

        for geometry in self.cluster_cache.geometries:

            geos = GEOSGeometry(geometry)
            # cached geometries are always srid==self.db_srid
            # bug: geos.srid is set to 4326 here, which is wrong
            # it is impossible to instnatiate with GEOSGeometry(geometry, srid=3857), which throws an error

            #if geos.srid != self.db_srid:
            #    ct = CoordTransform(SpatialReference(geos.srid), SpatialReference(self.db_srid))
            #    geos.transform(ct)


            if cluster.within(geos):

                if geometry_type == GEOMETRY_TYPE_VIEWPORT:
                    query_geometry = geos.intersection(cell_geos)
                elif geometry_type == GEOMETRY_TYPE_AREA:
                    k = self.calculate_k(geos, zoom)
                    query_geometry = geos
                    
                break

        if not query_geometry:
            raise ValueError('cluster not found in cache')

        filter_composer = FilterComposer(Gis, filters)
        filterstring = filter_composer.as_sql()
        left_join_sql = filter_composer.get_left_join_sql()

        kmeans_list = ids
        kmeans_string = (',').join(str(k) for k in kmeans_list)

        gis_fields_str = self.get_gis_fields_str(table_name='ksub')

        sql = '''
            SELECT {fields} FROM ( 
              SELECT kmeans(ARRAY[ST_X({geo_column}), ST_Y({geo_column})], {k}) OVER ()
              AS kmeans, "{geo_table}".*
              FROM {schema_name}.{geo_table} {geo_table} {left_join_sql} WHERE {geo_column} IS NOT NULL
              AND ST_Intersects({geo_column}, ST_GeometryFromText('{geometry}', {srid}) ) {filterstring}
            ) AS ksub
            WHERE kmeans IN ({kmeans_string})
            '''.format(geo_column=geo_column_str, k=k, geo_table=geo_table, schema_name=self.schema_name,
                       left_join_sql=left_join_sql, geometry=query_geometry.ewkt, srid=self.db_srid,
                       filterstring=filterstring, kmeans_string=kmeans_string, fields=gis_fields_str)

        entries_queryset = Gis.objects.raw(sql)

        return list(entries_queryset)


    def get_area_content(self, geojson, filters, limit=None, offset=None, order_by='id'):

        geomfilterstring = self.get_geom_filterstring(geojson)

        filter_composer = FilterComposer(Gis, filters)
        filterstring = filter_composer.as_sql()
        left_join_sql = filter_composer.get_left_join_sql()

        gis_fields_str = self.get_gis_fields_str()

        order_direction = 'ASC'
        if order_by.startswith('-'):
            order_by = order_by[1:]
            order_direction = 'DESC'

        sql = '''SELECT {fields} FROM {schema_name}.{geo_table} {geo_table} {left_join_sql} WHERE {geomfilterstring} {filterstring} ORDER BY {order_by} {order_direction}'''.format(
                schema_name=self.schema_name, geo_table=geo_table, left_join_sql=left_join_sql,
                geomfilterstring=geomfilterstring, filterstring=filterstring, fields=gis_fields_str,
                order_by=order_by, order_direction=order_direction)

        if limit != None:
            sql = '{sql} LIMIT {limit}'.format(sql=sql, limit=limit)
        
        if offset != None:
            sql = '{sql} OFFSET {offset}'.format(sql=sql, offset=offset)

        sql = '{sql};'.format(sql=sql)

        entries_queryset = Gis.objects.raw(sql)

        return entries_queryset


    def get_dataset_content(self, id):

        #gis_fields_str = self.get_gis_fields_str()

        queryset = Gis.objects.filter(pk=id).first()

        #queryset = Gis.objects.raw(
        #    '''SELECT {fields} FROM {schema_name}.{geo_table} {geo_table} WHERE id={id};'''.format(
        #        schema_name=self.schema_name, geo_table=geo_table, fields=gis_fields_str, id=str(id))
        #)

        return queryset


    def get_map_content_counts(self, geojson, geometry_type, filters, zoom, modulations):

        result = {
            'count': 0,
            'modulations' : {},
        }

        # currently, the geometry type for counting is always set to GEOMETRY_TYPE_AREA,
        # because otherwise pins which are outside the current viewport, but inside the cluster geometry would be counted
        # the pins visible on the map would not always be the returned count if GEOMETRY_TYPE_VIEWPORT was supported
        geometry_type = GEOMETRY_TYPE_AREA

        geometries_for_counting = self.get_geometries_for_counting(geojson, geometry_type, zoom)

        unmodulated_count = self.query_map_content_count(geometries_for_counting, filters, [])
        result['count'] = unmodulated_count

        for modulation_name, modulation_filters in modulations.items():

            if 'filters' in modulation_filters:
                modulation_filters = modulation_filters['filters']
            else:
                modulation_filters = [modulation_filters]
                
            modulated_count = self.query_map_content_count(geometries_for_counting, filters, modulation_filters)
            result['modulations'][modulation_name] = {
                'count': modulated_count
            }

        return result


    # a nested select is required for the modulation filters
    def query_map_content_count(self, geometries_for_counting, filters, modulation_filters):

        count = 0

        filter_composer = FilterComposer(Gis, filters)
        filterstring = filter_composer.as_sql()
        left_join_sql = filter_composer.get_left_join_sql()

        geom_filterstring = self.get_geom_filter_string_from_geos(geometries_for_counting)

        modulation_filter_composer = FilterComposer(Gis, modulation_filters)
        modulation_filterstring = modulation_filter_composer.as_sql(omit_leading_AND=True,
            table_name_override='markers')
        modulation_left_join_sql = modulation_filter_composer.get_left_join_sql()

        if modulation_left_join_sql not in left_join_sql:
            left_join_sql = ' {0} {1}'.format(left_join_sql, modulation_left_join_sql)

        combined_filters = filters + modulation_filters
        combined_filter_composer = FilterComposer(Gis, combined_filters)
        selects = combined_filter_composer.get_selected_columns()


        content_count_sql = '''
            SELECT count(*) AS count FROM
                (SELECT {selects} FROM {schema_name}.{geo_table} {geo_table} {left_join_sql}
                    WHERE {geo_column_str} IS NOT NULL
                        AND {geom_filterstring} {filterstring}
                ) AS markers
        '''.format(selects=selects, schema_name=self.schema_name, geo_table=geo_table, left_join_sql=left_join_sql,
                    geo_column_str=geo_column_str, geom_filterstring=geom_filterstring, filterstring=filterstring)

        if modulation_filterstring:
            content_count_sql = '{content_count_sql} WHERE {modulation_filterstring}'.format(
                content_count_sql=content_count_sql, modulation_filterstring=modulation_filterstring
            )


        content_count_sql = '{content_count_sql};'.format(content_count_sql=content_count_sql)

        cursor = connections['default'].cursor()
        cursor.execute(content_count_sql)
        query_result = cursor.fetchone()

        count += query_result[0]

        return count


    def get_additional_group_by_columns_string(self):

        column_names = getattr(settings, 'ANYCLUSTER_ADDITIONAL_GROUP_BY_COLUMNS', [])

        additional_group_by_columns_string = ''

        for column_name in column_names:
            additional_group_by_columns_string = '{additional_group_by_columns_string}, MIN({column}::VARCHAR) AS {column}'.format(
                additional_group_by_columns_string=additional_group_by_columns_string, column=column_name)

        return additional_group_by_columns_string


    def get_grouped_map_contents(self, geojson, geometry_type, zoom, filters, group_by):

        # currently, the geometry type for counting is always set to GEOMETRY_TYPE_AREA,
        # because otherwise pins which are outside the current viewport, but inside the cluster geometry would be counted
        # the pins visible on the map would not always be the returned count if GEOMETRY_TYPE_VIEWPORT was supported
        geometry_type = GEOMETRY_TYPE_AREA

        geometries_for_counting = self.get_geometries_for_counting(geojson, geometry_type, zoom)

        geom_filterstring = self.get_geom_filter_string_from_geos(geometries_for_counting)
        
        filter_composer = FilterComposer(Gis, filters)
        filterstring = filter_composer.as_sql()
        left_join_sql = filter_composer.get_left_join_sql()

        additional_group_by_columns_string = self.get_additional_group_by_columns_string()

        groups = {}

        grouped_count_sql = '''
            SELECT COUNT(id), {group_by} {additional_group_by_columns_string}
            FROM {schema_name}.{geo_table} {geo_table} {left_join_sql}
                WHERE {geo_column_str} IS NOT NULL
                    AND {geom_filterstring} {filterstring}
                        GROUP BY {group_by} ORDER BY {group_by} ASC;
        '''.format(schema_name=self.schema_name, geo_table=geo_table, left_join_sql=left_join_sql,
                    geo_column_str=geo_column_str, geom_filterstring=geom_filterstring, filterstring=filterstring,
                    group_by=group_by, additional_group_by_columns_string=additional_group_by_columns_string)

        cursor = connections['default'].cursor()
        cursor.execute(grouped_count_sql)
        results = cursor.fetchall()

        additional_column_names = getattr(settings, 'ANYCLUSTER_ADDITIONAL_GROUP_BY_COLUMNS', [])
        
        for result in results:
            count = result[0]
            group_name = str(result[1])

            if group_name not in groups:
                groups[group_name] = {
                    'count' : count,
                }

                #groups[group_name][group_by] = group_name

                for index, additional_column in enumerate(additional_column_names, 0):
                    query_index = index + 2
                    groups[group_name][additional_column] = result[query_index]

            else:
                groups[group_name]['count'] += count
        
        return groups


    '''---------------------------------------------------------------------------------------------------------------------
        COSTRUCT A FILTERSTRING FOR GEOMETRIES

        multipolygon and collections are not supported by ST_Within so they need to be split into several geometries
        this function converts geometries into a string usable as a raw sql query
        if no request is given, it will take the geometry from the cache

        first, the geojson is converted to a list of GEOS
        second, the list is converted to a string
    ---------------------------------------------------------------------------------------------------------------------'''

    def get_geom_filterstring(self, geojson):

        geos_geometries = self.convert_geojson_to_geos(geojson)

        return self.get_geom_filter_string_from_geos(geos_geometries)


    def get_geom_filter_string_from_geos(self, geos_geometries):

        geomfilterstring = '('

        for counter, geos in enumerate(geos_geometries):
            if counter > 0:
                geomfilterstring += ' OR '
                
            geomfilterstring += " ST_Intersects({geo_column}, ST_GeometryFromText('{geometry}', {srid}) ) ".format(
                geo_column=geo_column_str, geometry=geos.wkt, srid=self.db_srid)

        geomfilterstring += ')'

        return geomfilterstring


    '''---------------------------------------------------------------------------------------------------------------------
        get non-cell-based geometries, eg fr cointing and grouping
    ---------------------------------------------------------------------------------------------------------------------'''
    # return a list of geometries
    def get_geometries_for_counting(self, geojson, geometry_type, zoom):

        geos_geometries = self.convert_geojson_to_geos(geojson)

        if geometry_type == GEOMETRY_TYPE_VIEWPORT:
            snapped_viewport = self.snap_viewport_to_grid(geos_geometries, zoom)
            geometries_for_counting = [snapped_viewport]
        else:
            geometries_for_counting = geos_geometries

        return geometries_for_counting


    def snap_viewport_to_grid(self, geos_geometries, zoom):

        srid = geos_geometries[0].srid

        viewport_geometry = GeometryCollection(*geos_geometries, srid=srid)

        envelope = viewport_geometry.envelope
        
        cells = self.rectangle_to_clustercells(envelope, zoom)

        first_cell = cells[0]
        last_cell = cells[-1]

        cells = GeometryCollection(first_cell, last_cell, srid=viewport_geometry.srid)

        grid_rectangle = cells.envelope

        return grid_rectangle


    '''---------------------------------------------------------------------------------------------------------------------
        K Calculation

        this is only used for strict geometries, such as drawn polygons or drawn circles
        based on the BASE_K in the settings (defaults to 6) it increases the k if one draws a big shape
    ---------------------------------------------------------------------------------------------------------------------'''
    # k calculation has to be done on square-pixel areas

    def calculate_k(self, geos_geometry, zoom):

        geom_copy = geos_geometry.clone() #transform(3857, clone=True)

        cellarea_pixels = self.grid_size * self.grid_size

        # 1m = ? pixels
        init_resolution = self.maptools.mapTileSize / (2 * math.pi * 6378137)

        resolution = init_resolution * (2**zoom)

        area_factor = resolution**2

        geom_copy_area_pixels = geom_copy.area * area_factor

        new_k = (BASE_K / cellarea_pixels) * geom_copy_area_pixels

        if new_k > K_CAP:
            new_k = K_CAP

        if new_k < BASE_K:
            new_k = BASE_K

        return int(math.ceil(new_k))
