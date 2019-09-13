'''---------------------------------------------------------------------------------------

DJANGO MAP CLUSTERING

- kmeans
- grid

VERSION: 0.1
AUTHOR: biodiv
LICENSE: GPL

---------------------------------------------------------------------------------------'''

'''--------------------------------------------------------------------------------------

    WORKFLOW

    1. anycluster receives viewport coordinates from ajax query
    2. anycluster calculates map grid in pixels (coordinates -> mercator -> pixels)
    3a. (grid cluster) counts markers in each cell
    3b. (kmeans cluster) calculates k centroids for each cell
    4a. (gridcluster) returns the cells as polygons (output srid = input srid) alongside the count
    4b. (kmeans cluster) returns kmeans centroids (output srid = input srid)

--------------------------------------------------------------------------------------'''

'''--------------------------------------------------------------------------------------
    A VIEWPORT is defined by topright bottomleft coordinates and the SRID of those coordinates

    4-------------a
    |             |
    |             |
    |             |
    b-------------2

    Polygon GEOS String:
    a -> 2 -> b -> 4 -> a
    
    GEOSGeometry('POLYGON((a.long a.lat, a.long b.lat, b.long b.lat, b.long a.lat, a.long a.lat))')

--------------------------------------------------------------------------------------'''

'''--------------------------------------------------------------------------------------
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

---------------------------------------------------------------------------------------'''

import json, math, numbers, decimal
from anycluster.MapTools import MapTools
from django.contrib.gis.geos import Point, GEOSGeometry
from django.contrib.gis.gdal import SpatialReference, CoordTransform
from django.contrib.gis.db.models.fields import BaseSpatialField
from django.db import connections

from django.conf import settings
from django.db.models import Q, Min, ForeignKey
from django.apps import apps

from .clusters import PointCluster

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

    def __init__(self, request, zoom=1, gridSize=256, input_srid=4326, mapTileSize=256, schema_name='public'):

        self.schema_name = schema_name
        
        # the srid of the coordinates coming from javascript. input_srid = output_srid
        self.input_srid = int(input_srid)
        # the srid of the database, falls back to 4326
        self.db_srid = self.getDatabaseSRID()

        # the size of the grid in pixels. each grid cell gets its own kmeans clustering
        self.gridSize = int(gridSize)

        self.zoom = int(zoom)
        self.maptools = MapTools(int(mapTileSize))

        # filter operators
        self.valid_operators = ['=', '<', '>', '<=', '>=', 'list', '!list']

        self.request = request
        self.params = self.loadJson(request)
        self.cache = request.session.get("clustercache", {})

    # read the srid of the database. 
    def getDatabaseSRID(self):

        db_srid = None

        srid_qry = 'SELECT id, ST_SRID({geo_column}) FROM {schema_name}.{geo_table} LIMIT 1;'.format(
            geo_column=geo_column_str, schema_name=self.schema_name, geo_table=geo_table)

        with connections['default'].cursor() as cursor:
            cursor.execute(srid_qry)
        
            row = cursor.fetchone()

            if len(row) == 2:
                db_srid = row[1]
                

        if not db_srid:
            try:
                db_srid = settings.ANYCLUSTER_COORDINATES_COLUMN_SRID
            except:
                db_srid = 4326
        
        return db_srid

    
    '''---------------------------------------------------------------------------------------------------------------------------
        LOADING THE AJAX INPUT

        - The variables and filters coming from the ajax request are transformed into python-usables like lists and dictionaries
        - anycluster receives a json object containing geojson and filters
    ---------------------------------------------------------------------------------------------------------------------------'''   
    def loadJson(self, request):
        json_str = request.body.decode(encoding='UTF-8')
        params = json.loads(json_str)

        if "geojson" in params:
            request.session['geojson'] = params['geojson']
        
        return params    


    '''---------------------------------------------------------------------------------------------------------------------------------
        CONVERTING QUADKEY CELLS TO POSTGIS USABLE POLYGONS

        - ST_Collect(geom)
        - create a geometry collection to reduce the database queries to 1
        - this is not yet working
    ---------------------------------------------------------------------------------------------------------------------------------'''
    def convertCellsToGEOS(self,cells):

        #ST_Collect(ST_GeomFromText('POINT(1 2)'),ST_GeomFromText('POINT(-2 3)') )

        query_collection = "ST_Collect(ARRAY["

        for counter, cell in enumerate(cells):
            
            poly = self.clusterCellToBounds(cell)
                
            if counter > 0:
                query_collection += ","

            # ST_GeomFromText('POLYGON((0 0, 10000 0, 10000 10000, 0 10000, 0 0))',3857)
            query_collection += "ST_GeomFromText('{poly}', {srid})".format(poly=poly, srid=self.db_srid)

        query_collection += "])"

        return query_collection
                


    '''---------------------------------------------------------------------------------------------------------------------------------
        CONVERTING GEOJSON TO GEOS

        multipolygon and collections are not supported by ST_Within so they need to be split into several geometries
    ---------------------------------------------------------------------------------------------------------------------------------'''

    # returns a list of polygons in GEOS format and db_srid
    def convertGeojsonFeatureToGEOS(self, feature):

        geos_geometries = []

        if "properties" in feature and "srid" in feature["properties"]:
            srid = feature["properties"]["srid"]
        else:
            srid = 4326

        if feature["geometry"]["type"] == "MultiPolygon":

            for polygon in feature["geometry"]["coordinates"]:

                geom = { "type": "Polygon", "coordinates": [polygon[0]] }

                geos = GEOSGeometry(json.dumps(geom), srid=srid)
                
                if geos.srid != self.db_srid: 
                    ct = CoordTransform(SpatialReference(geos.srid), SpatialReference(self.db_srid))
                    geos.transform(ct)

                geos_geometries.append(geos)
                

        else:
            
            try:
                geos = GEOSGeometry(json.dumps(feature["geometry"]), srid=srid)
            except:
                raise TypeError("Invalid GEOJSON geometry for cluster area. Use Polygon or Multipolygon")

            if geos:

                if geos.srid != self.db_srid:
                    ct = CoordTransform(SpatialReference(geos.srid), SpatialReference(self.db_srid))
                    geos.transform(ct)
                
                geos_geometries.append(geos)
                

        return geos_geometries

    '''--------------------------------------------------------------------------------------------------------------
        GET CLUSTER GEOMETRIES AND CACHING MECHANISM

        The input is always a geojson Polygon or MultiPolygon.
        1. The envelope of this MP is calculated
        2. The envelope ist snapped to the grid and split into cells
        3. if the MP was not a rectangle, each cell is merged with the polygon
        4. the resulting set of polygons is the clusterGeometry AS GEOS

        compare with cache:
        - always cluster all cells if zoom has changed
        - always cluster all cells if filters have changed
        - only cluster uncached cells if neither zoom nor filter changed

        cache format:
        dict: {'filters':{}, 'geometries':[geojson,geojson,geojsn], 'zoom':1, 'clustertype': 'grid' or 'kmeans'}
    --------------------------------------------------------------------------------------------------------------'''
    def getClusterGeometries(self, clustertype):

        geojson_feature = self.params['geojson']

        # list of polygons
        geos_geometries = self.convertGeojsonFeatureToGEOS(geojson_feature)

        clusterGeometries = []
        remove_cached_geometries = True
        new_cache = {
            "geometries":[],
            "clustertype":clustertype,
            "zoom":self.zoom,
            "filters":json.dumps(self.params["filters"])
        }
        
        if self.zoom != self.cache.get("zoom",-1):
            remove_cached_geometries = False
        elif bool(self.params.get("deliver_cache",False)) == True:
            remove_cached_geometries = False
        elif self.params.get("filters", {}) != json.loads(self.cache.get("filters","{}")):
            remove_cached_geometries = False
        elif clustertype != self.cache.get("clustertype", None):
            remove_cached_geometries = False
        elif self.params.get("cache","") == "load":
            remove_cached_geometries = False


        for geos in geos_geometries:
            envelope = geos.envelope
            
            cells = self.rectangleToClusterCells(envelope)

            for cell in cells:

                # check if geos is rectangular, better check needed
                if geos.equals(envelope) == True:

                    cell_wk = {"geos":cell, "k":BASE_K}

                    if remove_cached_geometries == True:
                        if cell.geojson not in self.cache["geometries"]:
                            clusterGeometries.append(cell_wk)
                    else:
                        clusterGeometries.append(cell_wk)

                    new_cache["geometries"].append(cell.geojson)
                else:
                    if cell.intersects(geos):
                        intersection = cell.intersection(geos)

                        intersection_wk = {"geos":intersection, "k":BASE_K}
                        if remove_cached_geometries == True:
                            if intersection.geojson not in self.cache["geometries"]:
                                clusterGeometries.append(intersection_wk)
                        else:
                            clusterGeometries.append(intersection_wk)

                        new_cache["geometries"].append(intersection.geojson)

        self.request.session["clustercache"] = new_cache
        
        return clusterGeometries


    '''---------------------------------------------------------------------------------------------------------------------------------
        CALCULATE CELL-IDs ACCORDING TO VIEWPORT

        - given the viewport, expand to the nearest grid and get all cell ids of this grid
        - returns QuadKey IDS of a viewport according to MapClusterer.gridSize

        To calculate those cells, the coordinates are transformed as shown below:
        

    LatLng --------> Meters (Mercator) ---------> Shifted origin ---------> pixel coords ---------> GRID, depending on tilesize

     -----------           -----------                -----------              -----------           -----------
    |           |         |           |              |           |            |           |         |00|10|20|30|
    |           |         |           |              |           |            |           |         |01|11|21|31|
    |     O     |         |     O     |              |           |            |           |          -----------
    |           |         |           |              |           |            |           |         |02|12|22|32|
    |           |         |           |              |           |            |           |         |03|13|23|33|
     -----------           -----------               O-----------             O-----------           -----------
       LATLNG                 METERS                     METERS                   PIXELS                 GRID
                                                 (shifted coordinates)                          (CELL-IDs according to QuadKey, depends on zoom level)

    O = origin

    The coordinate system with shifted origin has only coordinates with positive values (essential).
    Now, get the CELL-ID (=QuadKey ID) the top-right (and bottom-left) viewport coordinate sits in.
    Finally calculate all CELL-IDs that are spanned by the top-right and bottom-left cell.
        
    ---------------------------------------------------------------------------------------------------------------------------------'''



    '''
        Expands an envelope (=rectangle) to the fixed world grid
        Splits the grid into cells of defined size
    '''
    def rectangleToClusterCells(self, geos_envelope):
        linearRing = geos_envelope[0]
                
        left = linearRing[0][0]
        bottom = linearRing[0][1]
        right = linearRing[1][0]
        top = linearRing[2][1]

        topright = Point(right, top, srid=self.db_srid)
        bottomleft = Point(left, bottom, srid=self.db_srid)

        # project points to mercator 3875, plane coordinates
        self.maptools.point_ToMercator(topright)
        self.maptools.point_ToMercator(bottomleft)

        # shift origin
        self.maptools.point_MercatorToWorld(topright)
        self.maptools.point_MercatorToWorld(bottomleft)

        # calculate pixelcoords from world coords depending on zoom
        self.maptools.point_WorldToPixels(topright, self.zoom)
        self.maptools.point_WorldToPixels(bottomleft, self.zoom)

        # get topright and bottom left cellID, e.g. (03,01)
        toprightCell = self.maptools.point_PixelToCellID(topright, self.gridSize)
        bottomleftCell = self.maptools.point_PixelToCellID(bottomleft, self.gridSize)

        # get all Cells that need to be clustered, as quadKey
        clusterCells = self.maptools.getClusterCellsAsPolyList(toprightCell, bottomleftCell, self.zoom,
                                                               self.gridSize, self.db_srid)

        return clusterCells
        

    '''---------------------------------------------------------------------------------------------------------------------------------
        SQL FOR FILTERING

        Converts the filter dictionary into a raw querystring that is added to the raw sql later

        Used by both kmeans and grid cluster
    ---------------------------------------------------------------------------------------------------------------------------------'''
    def parseFilterValue(self, operator, value):

        if type(value) == str:
            if operator == "startswith":
                return "'^{value}.*' ".format(value=value)

            elif operator == "contains":
                return "'{value}.*'".format(value=value)
            
            else:
                return "'{value}'".format(value=value)

        elif type(value) == bool:

            if value == False:
                return "FALSE"

            else:
                return "TRUE"

        elif isinstance(value, numbers.Number) or isinstance(value, decimal.Decimal):
            return value

        else:
            return value


    def constructFilterstring(self, filters):

        operator_mapping = {
            "=" : "=",
            "!=" : "!=",
            ">=" : ">=",
            "<=" : "<=",
            "startswith" : "~",
            "contains" : "~"
        }

        filterstring = ''

        for filter in filters:

            column = list(filter.keys())[0]

            filterparams = filter[column]

            filterstring += ' AND ('
            
            operator_pre = filterparams.get("operator", "=")

            values = filterparams["values"]

            if "either" in operator_pre:

                parts = operator_pre.split('_')

                operator = operator_mapping[parts[-1]]

                for counter, value in enumerate(values):
                    if counter >0:
                        filterstring += " OR "

                    sql_value = self.parseFilterValue(parts[-1], value)

                    filterstring += "{column} {operator} {sql_value}".format(column=column, operator=operator,
                                                                             sql_value=sql_value)
                

            else:
                
                if type(values) == str or type(values) == bool:
                    operator = operator_mapping[operator_pre]
                    sql_value = self.parseFilterValue(operator_pre, values)
                    

                elif type(values) == list:
                    if operator_pre == "!=":
                        operator = "NOT IN"
                    else:
                        operator = "IN"

                    sql_value = str(tuple(values))

                filterstring += "{column} {operator} {sql_value}".format(column=column, operator=operator,
                                                                         sql_value=sql_value)
                    

            filterstring += ')'

        return filterstring



    '''---------------------------------------------------------------------------------------------------------------------------------
        MERGING MARKERS BY DISTANCE
        - retrieves cluster_rows
        - returns a list of PointCluster instances
        
        - if the geometric centroids are too close to each other after the kmeans algorithm (e.g. overlap), they are merged to one cluster
        - used by kmeansCluster as phase 2
        - uses pixels for calculation as this is constant on every zoom level
        - transforms cluster.id into a list
    ---------------------------------------------------------------------------------------------------------------------------------'''

    def distanceCluster(self, cluster_rows, c_distance=30):

        clusters_processed = []

        for cluster_row in cluster_rows:

            point_cluster = PointCluster(cluster_row, geo_column_str, self.db_srid)
            
            clustercoords = getattr(point_cluster, geo_column_str)

            added = False

            for processed_cluster in clusters_processed:
                processed_coords = getattr(processed_cluster, geo_column_str)
                pixel_distance = self.maptools.points_calcPixelDistance(clustercoords, processed_coords, self.zoom)
                
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

    
    '''---------------------------------------------------------------------------------------------------------------------------------
        KMEANS CLUSTERING
        - cluster only if 1. the geometry contains a new area or 2. the filters changed
        - perform a raw query on the database, pass the result to phase 2 (distanceCluster) and return the result
    ---------------------------------------------------------------------------------------------------------------------------------'''        

    def kmeansCluster(self, custom_filterstring=""):
        
        clusterGeometries = self.getClusterGeometries("kmeans")

        markers = []

        if clusterGeometries:

            filterstring = self.constructFilterstring(self.params["filters"])

            filterstring += custom_filterstring

            for geometry_dic in clusterGeometries:

                geos_geometry = geometry_dic["geos"]
                k = geometry_dic["k"]

                sql = '''
                    SELECT kmeans AS id, count(*), ST_AsText(ST_Centroid(ST_Collect({geo_column})))
                    AS {geo_column} {pin_qry_0} {additional_column_qry_0}
                    FROM ( 
                      SELECT {pin_qry_1} {additional_column_qry_1} kmeans(ARRAY[ST_X({geo_column}), ST_Y({geo_column})], {k}) OVER ()
                      AS kmeans, {geo_column}
                      FROM {schema_name}.{geo_table}
                      WHERE {geo_column} IS NOT NULL
                          AND ST_Intersects({geo_column}, ST_GeometryFromText('{geos_geometry}') ) {filterstring}
                    ) AS ksub

                    GROUP BY id
                    ORDER BY kmeans;
                    
                '''.format(geo_column=geo_column_str, pin_qry_0=pin_qry[0], pin_qry_1=pin_qry[1], k=k,
                           schema_name=self.schema_name, geo_table=geo_table, geos_geometry=geos_geometry.ewkt,
                           filterstring=filterstring,additional_column_qry_0=additional_column_qry[0],
                           additional_column_qry_1=additional_column_qry[1])


                with connections['default'].cursor() as cursor:
                    cursor.execute(sql)
                
                    cluster_rows = cursor.fetchall()

                
                kclusters = self.distanceCluster(cluster_rows)
                

                for point_cluster in kclusters:
                    point = getattr(point_cluster, geo_column_str)

                    if point.srid != self.input_srid:
                        self.maptools.point_AnyToAny(point, point.srid, self.input_srid)

                    marker = {
                        'ids': point_cluster.id,
                        'count': point_cluster.count,
                        'center': {
                                'x': point.x,
                                'y': point.y
                        },
                        'pinimg': point_cluster.pinimg,
                    }

                    if ADDITIONAL_COLUMN:
                        marker[ADDITIONAL_COLUMN] = getattr(point_cluster, ADDITIONAL_COLUMN)

                    markers.append(marker)


        return markers



    '''---------------------------------------------------------------------------------------------------------------------------------
        GRID CLUSTERING 
    ---------------------------------------------------------------------------------------------------------------------------------'''
    
    
    def gridCluster(self):

        clusterGeometries = self.getClusterGeometries("grid")

        gridCells = []

        if clusterGeometries:

            filterstring = self.constructFilterstring(self.params["filters"])

            cursor = connections['default'].cursor()

            cursor.execute('''CREATE TEMPORARY TABLE temp_clusterareas (
                  id serial,
                  polygon geometry
               )''')

            for clusterGeometry in clusterGeometries:
                cursor.execute('''
                    INSERT INTO temp_clusterareas (polygon)
                    ( SELECT (
                        ST_Dump(
                            ST_GeometryFromText('{geometry}')
                    )).geom )
                '''.format(geometry=clusterGeometry["geos"].ewkt))

            # indexing did not increase performance
            # cursor.execute('''CREATE INDEX temp_gix ON temp_clusterareas USING GIST (polygon);''')

            gridcluster_queryset = '''SELECT count(*) AS count, polygon {pin_qry_0}
                FROM {schema_name}.{geo_table}, temp_clusterareas
                WHERE coordinates IS NOT NULL AND ST_Intersects(coordinates, polygon) {filterstring}
                GROUP BY polygon
            '''.format(schema_name=self.schema_name, geo_table=geo_table, filterstring=filterstring,
                       pin_qry_0=pin_qry[0])

            cursor.execute(gridcluster_queryset)            

            gridCells_pre = cursor.fetchall()

            for cell in gridCells_pre:

                count = cell[0]
                pinimg = None

                if count == 1 and PINCOLUMN:
                    pinimg = cell[2]

                geos = GEOSGeometry(cell[1])
                geos.transform(self.input_srid)
                centroid = geos.centroid
                
                cellobj = {"count":count, "geojson": geos.geojson, "center":{"x":centroid.x, "y": centroid.y},
                           "pinimg" : pinimg}

                gridCells.append(cellobj)
                
                
        return gridCells


    
    '''---------------------------------------------------------------------------------------------------------------------------------
        NON-CLUSTERING METHODS
    ---------------------------------------------------------------------------------------------------------------------------------'''
    def get_gis_field_names(self):

        gis_fields = Gis._meta.concrete_fields

        gis_field_names = []

        # Relational Fields are not supported
        for field in gis_fields:
            if isinstance(field, ForeignKey):
                #name = field.get_attname_column()[0]
                continue
            if isinstance(field, BaseSpatialField):
                name = '{name}::bytea'.format(name=field.name)
            else:
                name = field.name

            gis_field_names.append(name)

        return gis_field_names
        
        
    def get_gis_fields_str(self):

        gis_field_names = self.get_gis_field_names()

        gis_fields_str = ','.join(gis_field_names)

        gis_fields_str.rstrip(',')

        return gis_fields_str

    # return all IDs of the pins contained by a cluster
    def getClusterContent(self, custom_filterstring=""):

        x = self.params["x"]
        y = self.params["y"]

        cluster = Point(x, y, srid=self.input_srid)

        # request lnglat point
        cell_geos = self.maptools.getCellForPointAsGeos(cluster, self.zoom, self.gridSize, self.db_srid)
        
        cluster.transform(self.db_srid)

        query_geometry = None
        
        for geometry in self.cache["geometries"]:
            geos = GEOSGeometry(geometry)
            
            if cluster.within(geos):
                query_geometry = geos.intersection(cell_geos)
                break


        filterstring = self.constructFilterstring(json.loads(self.cache["filters"]))
        filterstring += custom_filterstring

        kmeans_list = self.params["ids"]
        kmeans_string = (",").join(str(k) for k in kmeans_list)

        gis_fields_str = self.get_gis_fields_str()

        sql= '''
            SELECT {fields} FROM ( 
              SELECT kmeans(ARRAY[ST_X({geo_column}), ST_Y({geo_column})], {base_k}) OVER ()
              AS kmeans, "{geo_table}".*
              FROM {schema_name}.{geo_table} WHERE {geo_column} IS NOT NULL
              AND ST_Intersects({geo_column}, ST_GeometryFromText('{geometry}', {srid}) ) {filterstring}
            ) AS ksub
            WHERE kmeans IN ({kmeans_string})
            '''.format(geo_column=geo_column_str, base_k=BASE_K, geo_table=geo_table, schema_name=self.schema_name,
                       geometry=query_geometry.ewkt, srid=self.db_srid, filterstring=filterstring,
                       kmeans_string=kmeans_string, fields=gis_fields_str)

        
        entries_queryset = Gis.objects.raw(sql)
                                               
        return entries_queryset


    def getAreaContent(self, custom_filterstring=""):

        geomfilterstring = self.getGeomFilterstring(self.params["geojson"])
        filterstring = self.constructFilterstring(json.loads(self.cache["filters"]))

        gis_fields_str = self.get_gis_fields_str()
        
        entries_queryset = Gis.objects.raw(
            '''SELECT {fields} FROM {schema_name}.{geo_table} WHERE {geomfilterstring} {filterstring};'''.format(
                schema_name=self.schema_name, geo_table=geo_table, geomfilterstring=geomfilterstring,
                filterstring=filterstring, fields=gis_fields_str)
            )

        return entries_queryset


    '''---------------------------------------------------------------------------------------------------------------------------------
        COSTRUCT A FILTERSTRING FOR GEOMETRIES

        multipolygon and collections are not supported by ST_Within so they need to be split into several geometries
        this function converts geometries into a string usable as a raw sql query
        if no request is given, it will take the geometry from the cache

        first, the geojson is converted to a list of GEOS
        second, the list is converted to a string
    ---------------------------------------------------------------------------------------------------------------------------------'''

    def getGeomFilterstring(self, geojson):

        geomfilterstring = ""
            
        if geojson["type"] == "FeatureCollection":

            geos_geometries = []
            
            for feature in geojson["features"]:

                geos_geometries += self.convertGeojsonFeatureToGEOS(feature)
                
                

        elif geojson["type"] == "Feature":

                geos_geometries = self.convertGeojsonFeatureToGEOS(geojson)


        geomfilterstring += "("
        
        for counter, geos in enumerate(geos_geometries):
            if counter > 0:
                geomfilterstring += " OR "
            geomfilterstring += " ST_Intersects({geo_column}, ST_GeometryFromText('{geometry}', {srid}) ) ".format(
                geo_column=geo_column_str, geometry=geos.wkt, srid=self.db_srid)

        geomfilterstring += ")"
            

        return geomfilterstring
        

            
    '''---------------------------------------------------------------------------------------------------------------------------------
        K Calculation

        this is only used for strict geometries, such as drawn polygons or drawn circles
        based on the BASE_K in the settings (defaults to 6) it increases the k if one draws a big shape
    ---------------------------------------------------------------------------------------------------------------------------------'''
    # k calculation has to be done on square-pixel areas
    def calculateK(self, geos_geometry):

        geom_copy = geos_geometry.transform(3857, clone=True)
        
        cellarea_pixels = self.gridSize * self.gridSize

        # 1m = ? pixels
        init_resolution = self.maptools.mapTileSize / (2 * math.pi * 6378137)
        
        resolution = init_resolution * (2**self.zoom)

        area_factor = resolution**2

        geom_copy_area_pixels = geom_copy.area * area_factor

        new_k = (BASE_K / cellarea_pixels) * geom_copy_area_pixels

        if new_k > K_CAP:
            new_k = K_CAP

        if new_k < BASE_K:
            new_k = BASE_K

        return int(math.ceil(new_k))
