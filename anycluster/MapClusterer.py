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
from django.db import connections

# Debugging prints out statements in console. Use it from python, not a browser.
DEBUG = False

if DEBUG is False:
    from django.conf import settings
    from django.db.models import Q, Min
    from django.db.models.loading import get_model

    BASE_K = getattr(settings, 'ANYCLUSTER_BASE_K', 6)
    K_CAP = getattr(settings, 'ANYCLUSTER_K_CAP', 30)

    # get the model as defined in settings
    geoapp, geomodel = settings.ANYCLUSTER_GEODJANGO_MODEL.split('.')
    geo_column_str = settings.ANYCLUSTER_COORDINATES_COLUMN

    # column for determining the pin image for pins with count 1
    PINCOLUMN = getattr(settings, 'ANYCLUSTER_PINCOLUMN', None)

    # raw sql for getting pin column value
    if PINCOLUMN:
        pin_qry = [', MIN(%s) AS pinimg' % (PINCOLUMN), PINCOLUMN + ',']
    else:
        pin_qry = ['', '']

    Gis = get_model(geoapp, geomodel)

    geo_table = Gis._meta.db_table
    

if DEBUG:
    # some viewports for debugging using the python shell
    viewport = {'left': -68.37890625, 'top': 75.8041001126815,
                'right': 68.37890625, 'bottom': -49.03257075030672}
    viewport2 = {'left': 161.89453125, 'top': 77.11983306610325,
                 'right': -61.34765625, 'bottom': -45.20731114149848}

    viewport3 = {'left': 136.078125, 'top': 76.75037266166416,
                 'right': 107.42578125, 'bottom': 2.5914519003430008}


class MapClusterer():

    def __init__(self, zoom=1, gridSize=256, input_srid=4326, mapTileSize=256):
        
        # the srid of the coordinates coming from javascript. input_srid = output_srid
        self.input_srid = int(input_srid)

        # the size of the grid in pixels. each grid cell gets its own kmeans clustering
        self.gridSize = int(gridSize)

        self.zoom = int(zoom)
        self.maptools = MapTools(int(mapTileSize))

        # filter operators
        self.valid_operators = ['=', '<', '>', '<=', '>=', 'list', '!list']

        self.srid_db = self.getDatabaseSRID()
        

    # read the srid of the database. 
    def getDatabaseSRID(self):

        srid_qry = 'SELECT id, ST_SRID(%s) FROM "%s" LIMIT 1;' % (
            geo_column_str, geo_table)
        srid_db_objs = Gis.objects.raw(srid_qry)

        if len(list(srid_db_objs)) > 0:
            srid_db = srid_db_objs[0].st_srid
        else:
            try:
                srid_db = settings.ANYCLUSTER_COORDINATES_COLUMN_SRID
            except:
                srid_db = 4326

        return srid_db

    
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

    def getClusterCells(self, viewport):

        if DEBUG:
            print('VIEWPORT(wgs84datum, 4326, longlat): %s' %viewport)

        # create points according to input srid
        topright = Point(
            viewport['right'], viewport['top'], srid=self.input_srid)
        
        bottomleft = Point(
            viewport['left'], viewport['bottom'], srid=self.input_srid)

        if self.input_srid != 4326:
            topright = self.maptools.point_ToLatLng(topright)
            bottomleft = self.maptools.point_ToLatLng(bottomleft)

        # Polar areas with abs(latitude) bigger then 85.05112878 are clipped off as google does.
        if topright.y > 85.0:
            topright.y = 85.0

        if topright.x > 179.9999:
            topright.x = 179.9999

        if bottomleft.y < -85:
            bottomleft.y = -85

        if bottomleft.x < -179.9999:
            bottomleft.x = -179.9999

        if DEBUG:
            print('4326, longlat: topright: (%s,%s) | bottomleft: (%s,%s)' %
                  (topright.x, topright.y, bottomleft.x, bottomleft.y))

        # project points to mercator 3875, plane coordinates
        self.maptools.point_ToMercator(topright)
        self.maptools.point_ToMercator(bottomleft)

        if DEBUG:
            print('MERCATOR: topright: (%s,%s) | bottomleft: (%s,%s)' %
                  (topright.x, topright.y, bottomleft.x, bottomleft.y))

        # shift origin
        self.maptools.point_MercatorToWorld(topright)
        self.maptools.point_MercatorToWorld(bottomleft)

        if DEBUG:
            print('WORLD: topright: (%s,%s) | bottomleft: (%s,%s)' %
                  (topright.x, topright.y, bottomleft.x, bottomleft.y))

        # calculate pixelcoords from world coords depending on zoom
        self.maptools.point_WorldToPixels(topright, self.zoom)
        self.maptools.point_WorldToPixels(bottomleft, self.zoom)

        if DEBUG:
            print('PIXELS: topright: (%s,%s) | bottomleft: (%s,%s)' %
                  (topright.x, topright.y, bottomleft.x, bottomleft.y))

        # get topright and bottom left cellID, e.g. (03,01)
        toprightCell = self.maptools.point_PixelToCellID(topright, self.gridSize)
        bottomleftCell = self.maptools.point_PixelToCellID(bottomleft, self.gridSize)

        if DEBUG:
            print('CELLID: toprightCell: %s  |  bottomleftCell: %s' %
                  (toprightCell, bottomleftCell))

        # get all Cells that need to be clustered
        clusterCells = self.maptools.get_ClusterCells(
            toprightCell, bottomleftCell, self.zoom)

        # from ID-list create list of polygons
        return clusterCells


    '''---------------------------------------------------------------------------------------------------------------------------------
        CACHING MECHANISM

        Filters, zoomlevel and cellIDs are stored in the django session. If the map is panned,
        only those cells that are new to the viewport are being clustered and returned.

        If the map is zoomed, the cache is cleared.
        
        dict: {'filters':{}, 'cellIDs':[], 'zoom':1}

    ---------------------------------------------------------------------------------------------------------------------------------'''

    def compareWithCache(self, request, geometry, geometry_type, filters, deliver_cache):
        
        clustercache = request.session.get('clustercache', {})

        new_cluster_geometry = []
        last_zoom = clustercache.get('zoom', -1)
                       
        if geometry_type == "viewport":

            compare_geometry_with_cache = False

            # check if we need to compare with the cache or if the cache can be omitted
            if clustercache and not deliver_cache:

                if int(self.zoom) == int(last_zoom):
                    last_filters = clustercache.get('filters', [])
                    if filters == last_filters:
                        compare_geometry_with_cache = True
            
            if compare_geometry_with_cache:
                # in this case, geometry is a set of cells
                cached_cells = set([tuple(cell) for cell in clustercache['clusterAreas']])
                new_clustercells = set(geometry) - cached_cells

                new_cells_for_cache = cached_cells.union(new_clustercells)

            else:
                new_cells_for_cache = set(geometry)
                new_clustercells = new_cells_for_cache


            clustercache['clusterAreas'] = list(new_cells_for_cache)

            # convert new_clustercells into a postgis geometry collection
            if new_clustercells:
                # new_cluster_geometry = self.convertCellsToGEOS(new_clustercells)
                new_cluster_geometry = new_clustercells

        elif geometry_type == "strict":

            perform_clustering = False
            
            if clustercache:
                cached_areas = clustercache.get('clusterAreas', None)
                if geometry != cached_areas or filters != clustercache.get('filters',[]):
                    perform_clustering = True

            if int(self.zoom) != int(last_zoom):
                perform_clustering = True

            if perform_clustering:
                clustercache['clusterAreas'] = geometry

                new_cluster_geometry = geometry

        
        clustercache['filters'] = filters
        clustercache['zoom'] = self.zoom

        request.session['clustercache'] = clustercache

        return new_cluster_geometry

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
            query_collection += "ST_GeomFromText('%s', %s)" % (poly, self.srid_db)

        query_collection += "])"

        return query_collection
                


    '''---------------------------------------------------------------------------------------------------------------------------------
        CONVERTING GEOJSON TO GEOS

        multipolygon and collections are not supported by ST_Within so they need to be split into several geometries
    ---------------------------------------------------------------------------------------------------------------------------------'''

    # returns a geos_list
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
                
                if geos.srid != self.srid_db: 
                    ct = CoordTransform(SpatialReference(geos.srid), SpatialReference(self.srid_db))
                    geos.transform(ct)

                geos_geometries.append(geos)
                

        else:
            
            try:
                geos = GEOSGeometry(json.dumps(feature["geometry"]), srid=srid)
            except:
                return None

            if geos:

                if geos.srid != self.srid_db: 
                    ct = CoordTransform(SpatialReference(geos.srid), SpatialReference(self.srid_db))
                    geos.transform(ct)
                
                geos_geometries.append(geos)
                

        return geos_geometries
        

    # returns GEOS instances
    def getClusterGeometries(self, request, params, clustertype):

        geojson = params['geojson']

        geometry_type = params["geometry_type"]
            
        deliver_cache = bool(params.get("cache", False))

        '''
            There are two geometrytypes: "viewport" and "geometry". "viewport" is a rectangle which is expanded to a zoom-level
            dependant fixed grid. "geometry" just clusters within the given geometry
        '''

        clusterGeometries = []

        if geometry_type == "viewport":
            if geojson["geometry"]["type"] == "Polygon":
                linearString = geojson['geometry']['coordinates'][0]
                viewport = {'left': linearString[0][0], 'top': linearString[0][1], 'right':linearString[1][0], 'bottom':linearString[2][1]}
            else:
                #Multipolygon when spanning edge
                linearString = geojson['geometry']['coordinates'][0]
                linearString_2 = geojson['geometry']['coordinates'][1]
                viewport = {'left': linearString[0][0], 'top': linearString[0][1], 'right':linearString_2[1][0], 'bottom':linearString[2][1]}
                
            clustercells_pre = self.getClusterCells(viewport)

            clusterGeometries_pre = self.compareWithCache(request, clustercells_pre, geometry_type, params["filters"], deliver_cache)
            
            for cell in clusterGeometries_pre:
                poly = self.clusterCellToBounds(cell)
                cell_geos = GEOSGeometry(poly, srid = self.srid_db)
                clusterGeometries.append({"geos": cell_geos, "k": BASE_K})


        else:

            # geojson or []
            clusterGeometries_geojson = self.compareWithCache(request, geojson, geometry_type, params["filters"], deliver_cache)

            #convert the geojson into strings usable with postgis
            if clusterGeometries_geojson:

                if clusterGeometries_geojson["type"] == "FeatureCollection":

                    geos_geometries = []
                    
                    for feature in clusterGeometries_geojson["features"]:

                        geos_geometries += self.convertGeojsonFeatureToGEOS(feature)
                        
                        

                elif clusterGeometries_geojson["type"] == "Feature":

                        geos_geometries = self.convertGeojsonFeatureToGEOS(clusterGeometries_geojson)


                for geos in geos_geometries:
                    k = self.calculateK(geos)
                                    
                    clusterGeometries.append({"geos": geos, "k":k})


        return clusterGeometries


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
        

    '''---------------------------------------------------------------------------------------------------------------------------------
        SQL FOR FILTERING

        Converts the filter dictionary into a raw querystring that is added to the raw sql later

        Used by both kmeans and grid cluster
    ---------------------------------------------------------------------------------------------------------------------------------'''
    def parseFilterValue(self, operator, value):

        if type(value) == str:
            if operator == "startswith":
                return "'^%s.*' " % value

            elif operator == "contains":
                return "'%s.*'" % value
            
            else:
                return "'%s'" % value

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

        for column in filters:

            filterparams = filters[column]

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

                    filterstring += "%s %s %s" % (column, operator, sql_value)
                

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

                filterstring += "%s %s %s" % (column, operator, sql_value)
                    

            filterstring += ')'

        return filterstring



    '''---------------------------------------------------------------------------------------------------------------------------------
        MERGING MARKERS BY DISTANCE

        - if the geometric centroids are too close to each other after the kmeans algorithm (e.g. overlap), they are merged to one cluster
        - used by kmeansCluster as phase 2
        - uses pixels for calculation as this is constant on every zoom level
        - transforms cluster.id into a list
    ---------------------------------------------------------------------------------------------------------------------------------'''

    def distanceCluster(self, clusters, c_distance=30):

        clusters_processed = []

        for cluster in clusters:
            clustercoords = getattr(cluster, geo_column_str)

            added = False

            for processed_cluster in clusters_processed:
                processed_coords = getattr(processed_cluster, geo_column_str)
                pixel_distance = self.maptools.points_calcPixelDistance(clustercoords, processed_coords, self.zoom)
                
                if pixel_distance <= c_distance:
                    if not type(processed_cluster.id) == list:
                        processed_cluster.id = [processed_cluster.id]

                    processed_cluster.id.append(cluster.id)
                    processed_cluster.count += cluster.count
                    added = True
                    break

            if not added:
                if not type(cluster.id) == list:
                    cluster.id = [cluster.id]
                clusters_processed.append(cluster)

        
        return clusters_processed

    
    '''---------------------------------------------------------------------------------------------------------------------------------
        KMEANS CLUSTERING
        - cluster only if 1. the geometry contains a new area or 2. the filters changed
        - perform a raw query on the database, pass the result to phase 2 (distanceCluster) and return the result
    ---------------------------------------------------------------------------------------------------------------------------------'''        

    def kmeansCluster(self, request, custom_filterstring=""):

        params = self.loadJson(request)

        clusterGeometries = self.getClusterGeometries(request, params, "kmeans")

        markers = []

        if clusterGeometries:

            
            filterstring = self.constructFilterstring(params["filters"])

            filterstring += custom_filterstring

            for geometry_dic in clusterGeometries:

                geos_geometry = geometry_dic["geos"]
                k = geometry_dic["k"]
   
                kclusters_queryset = Gis.objects.raw('''
                    SELECT kmeans AS id, count(*), ST_AsText(ST_Centroid(ST_Collect(%s))) AS %s %s
                    FROM ( 
                      SELECT %s kmeans(ARRAY[ST_X(%s), ST_Y(%s)], %s) OVER () AS kmeans, %s
                      FROM "%s" WHERE %s IS NOT NULL AND ST_Intersects(%s, ST_GeometryFromText('%s') ) %s
                    ) AS ksub

                    GROUP BY id
                    ORDER BY kmeans;
                    
                ''' % (geo_column_str, geo_column_str, pin_qry[0],
                       pin_qry[1], geo_column_str, geo_column_str, k, geo_column_str,
                       geo_table, geo_column_str, geo_column_str, geos_geometry.ewkt, filterstring) )
            
                kclusters = list(kclusters_queryset)

                kclusters = self.distanceCluster(kclusters)

                for cluster in kclusters:
                    point = getattr(cluster, geo_column_str)

                    if point.srid != self.input_srid:
                        self.maptools.point_AnyToAny(point, point.srid, self.input_srid)

                    if PINCOLUMN:
                        pinimg = cluster.pinimg
                    else:
                        pinimg = None

                    markers.append({'ids': cluster.id, 'count': cluster.count, 'center': {
                                'x': point.x, 'y': point.y}, 'pinimg': pinimg})


        return markers



    '''---------------------------------------------------------------------------------------------------------------------------------
        GRID CLUSTERING 
    ---------------------------------------------------------------------------------------------------------------------------------'''

    def clusterCellToBounds(self, cell):

        bounds = []

        pixelbounds = self.maptools.cellIDToTileBounds(cell, self.gridSize)
        mercatorbounds = self.maptools.bounds_PixelToMercator(
            pixelbounds, self.zoom)

        # convert mercatorbounds to latlngbounds
        cell_topright = Point(
            mercatorbounds['right'], mercatorbounds['top'], srid=3857)
        cell_bottomleft = Point(
            mercatorbounds['left'], mercatorbounds['bottom'], srid=3857)
        self.maptools.point_ToLatLng(cell_topright)
        self.maptools.point_ToLatLng(cell_bottomleft)

        # if it is not a latlng database, convert the polygons
        if self.srid_db != 4326:
            self.maptools.point_AnyToAny(cell_topright, 4326, self.srid_db)
            self.maptools.point_AnyToAny(cell_bottomleft, 4326, self.srid_db)

        poly = self.maptools.bounds_ToPolyString({'top': cell_topright.y, 'right': cell_topright.x,
                                                  'bottom': cell_bottomleft.y, 'left': cell_bottomleft.x})

        if DEBUG:
            print('%s' % poly)

        return poly
    
    
    def gridCluster(self, request):

        params = self.loadJson(request)

        clusterGeometries = self.getClusterGeometries(request, params, "viewport")

        gridCells = []

        if clusterGeometries:

            filterstring = self.constructFilterstring(params["filters"])

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
                            ST_GeometryFromText('%s')
                    )).geom )
                ''' % clusterGeometry["geos"].ewkt)

            # indexing did not increase performance
            # cursor.execute('''CREATE INDEX temp_gix ON temp_clusterareas USING GIST (polygon);''')

            gridcluster_queryset = '''
                SELECT count(*) AS count, polygon FROM "%s", temp_clusterareas
                WHERE coordinates IS NOT NULL AND ST_Intersects(coordinates, polygon) %s
                GROUP BY polygon
            ''' % (geo_table, filterstring)

            cursor.execute(gridcluster_queryset)            

            gridCells_pre = cursor.fetchall()

            for cell in gridCells_pre:

                count = cell[0]

                geos = GEOSGeometry(cell[1])
                geos.transform(self.input_srid)
                centroid = geos.centroid
                
                cellobj = {"count":count, "geojson": geos.geojson, "center":{"x":centroid.x, "y": centroid.y}}

                gridCells.append(cellobj)
                
        return gridCells


    
    '''---------------------------------------------------------------------------------------------------------------------------------
        NON-CLUSTERING FUNCTIONS
    ---------------------------------------------------------------------------------------------------------------------------------'''
    # return all IDs of the pins contained by a cluster
    def getKmeansClusterContent(self, request, custom_filterstring = ""):

        params = self.loadJson(request)

        x = params["x"]
        y = params["y"]
        
        kmeans_list = params["ids"]
        kmeans_string = (",").join(str(k) for k in kmeans_list)

        filters = params["filters"]

        cluster = Point(x, y, srid=self.input_srid)

        cell = self.maptools.getCellIDForPoint(cluster, self.zoom, self.gridSize)

        poly = self.clusterCellToBounds(cell)

        filterstring = self.constructFilterstring(filters)

        filterstring += custom_filterstring

        entries_queryset = Gis.objects.raw('''
                    SELECT * FROM ( 
                      SELECT kmeans(ARRAY[ST_X(%s), ST_Y(%s)], %s) OVER () AS kmeans, "%s".*
                      FROM "%s" WHERE %s IS NOT NULL AND ST_Intersects(%s, ST_GeometryFromText('%s', %s) ) %s
                    ) AS ksub
                    WHERE kmeans IN (%s)
                    ''' %(geo_column_str, geo_column_str, BASE_K, geo_table,
                          geo_table, geo_column_str, geo_column_str, poly, self.srid_db, filterstring,
                          kmeans_string ))

        return entries_queryset


    '''---------------------------------------------------------------------------------------------------------------------------------
        COSTRUCT A FILTERSTRING FOR GEOMETRIES

        multipolygon and collections are not supported by ST_Within so they need to be split into several geometries
        this function converts geometries into a string usable as a raw sql query
        if no request is given, it will take the geometry from the cache

        first, the geojson is converted to a list of GEOS
        second, the list is converted to a string
    ---------------------------------------------------------------------------------------------------------------------------------'''

    def getGeomFilterstring(self, geojson=None):

        geomfilterstring = ""

        if not geojson:
            geojson = request.session.get('geojson', None)


        if geojson:
            
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
                geomfilterstring += " ST_Intersects(%s, ST_GeometryFromText('%s', %s) ) " %(geo_column_str, geos.wkt, self.srid_db)

            geomfilterstring += ")"
            

        return geomfilterstring
            
        
