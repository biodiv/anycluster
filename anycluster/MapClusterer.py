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

import json
from anycluster.MapTools import MapTools
from django.contrib.gis.geos import Point, GEOSGeometry

# Debugging prints out statements in console. Use it from python, not a browser.
DEBUG = False

if DEBUG is False:
    from django.conf import settings
    from django.db.models import Q, Min
    from django.db.models.loading import get_model

    # get the model as defined in settings
    geoapp, geomodel = settings.ANYCLUSTER_GEODJANGO_MODEL.split('.')
    geo_column_str = settings.ANYCLUSTER_COORDINATES_COLUMN

    # Columns that can be used for filtering markers
    CLUSTER_FILTERS = getattr(settings, 'ANYCLUSTER_FILTERS', None)

    # column for determining the pin image for pins with count 1
    PINCOLUMN = getattr(settings, 'ANYCLUSTER_PINCOLUMN', None)

    # raw sql for getting pin column value
    if PINCOLUMN:
        
        pin_qry = [', MIN(%s) AS pinimg' % (PINCOLUMN), PINCOLUMN + ',']
    else:
        pin_qry = ['', '']

    Gis = get_model(geoapp, geomodel)

    geo_table = Gis._meta.db_table
    

else:
    Gis = "Gardens"
    geo_column_str = 'coordinates'
    geo_table = 'Gardens'
    

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

        if DEBUG is False:
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
        PARSING THE AJAX INPUT

        - The variables and filters coming from the ajax request are transformed into python-usables like lists and dictionaries
        - anycluster receives a json object containing geojson and filters
    ---------------------------------------------------------------------------------------------------------------------------'''   
    def loadJson(self, request):
        json_str = request.body.decode(encoding='UTF-8')
        params = json.loads(json_str)
        return params
    
    def parseRequest(self, request):

        params = self.loadJson(request)

        # store geojson in viewport
        request.session['geojson'] = params['geojson']
        
        viewport = self.parseViewport(params['geojson'])
        filters = self.parseFilters(params.get("filters"))

        if 'cache' in params:
            deliver_cache = params["cache"]

        else:
            deliver_cache = False
            
        return viewport, filters, deliver_cache

    def parseViewport(self, geojson):

        linearString = geojson['geometry']['coordinates'][0]

        viewport = {'left': linearString[0][0], 'top': linearString[0][1], 'right':linearString[1][0], 'bottom':linearString[2][1]}
        
        return viewport
    
    def parseFilters(self, query_filters):

        filters = []

        if CLUSTER_FILTERS:
            for key in CLUSTER_FILTERS:
                if key != "id":
                    value_pre = query_filters.get(key, None)
                    if value_pre:
                        vwop = value_pre.split('_')

                        if len(vwop) == 2:
                            operator = vwop[0]
                            values_string = vwop[1]
                            values = values_string.split(',')

                            filters.append(
                                {'column': key, 'values': values, 'operator': operator})

                        else:
                            values = value_pre.split(',')

                            filters.append({'column': key, 'values': values})

        return filters
    

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

    def compareWithCache(self, request, deliver_cache, filters, clustercells):

        clustercache = request.session.get('clustercache', {})

        new_clustercells = []

        use_cache = False

        if clustercache and not deliver_cache:
            # clear cache if zoomlevel changed
            last_zoom = clustercache.get('zoom', None)

            if int(self.zoom) == int(last_zoom):

                applied_filters = clustercache.get('filters', [])

                if filters == applied_filters:
                    use_cache = True

        if use_cache:
            # changed for Django1.6 compatibility
            old_cells = set(clustercache['cellIDs'])
            new_clustercells = set(clustercells) - old_cells

            clustered_cells = old_cells.union(new_clustercells)

        else:
            clustered_cells = set(clustercells)
            new_clustercells = clustered_cells

        # changed for Django1.6 compatibility
        clustercache['cellIDs'] = list(clustered_cells)
        clustercache['filters'] = filters
        clustercache['zoom'] = self.zoom

        request.session['clustercache'] = clustercache

        return new_clustercells


    '''---------------------------------------------------------------------------------------------------------------------------------
        WRAPPER FUNCTION FOR COMMON TASKS

        wraps parsing, calculating cells and caching in one funtion
    ---------------------------------------------------------------------------------------------------------------------------------'''
        
    def getClusterParameters(self, request):

        viewport, filters, deliver_cache = self.parseRequest(request)
        # get the clustering cells
        clustercells_pre = self.getClusterCells(viewport)
        # clean the cells
        clustercells = self.compareWithCache(
            request, deliver_cache, filters, clustercells_pre)

        return clustercells, filters


    '''---------------------------------------------------------------------------------------------------------------------------------
        SQL FOR FILTERING

        Converts the filter dictionary into a raw querystring that is added to the raw sql later

        Used by both kmeans and grid cluster
    ---------------------------------------------------------------------------------------------------------------------------------'''

    def constructFilterstring(self, filters):

        filterstring = ''

        for fltr in filters:

            # there can be multiple values
            values = fltr['values']
            column = fltr['column']
            operator = fltr.get('operator', None)

            if values:

                filterstring += ' AND ( '

                if column == 'time':

                    if operator is None or operator == 'seq':
                        days = values[0].split('-')
                        months = values[1].split('-')
                        years = values[2].split('-')

                    if operator is not None:

                        if operator in self.valid_operators:

                            filterstring += "%s %s TIMESTAMP '%s'" % (
                                column, operator, values[0])

                        elif operator == 'range':
                            filterstring += "%s >= TIMESTAMP '%s' AND %s <= TIMESTAMP '%s' " % (
                                column, values[0], column, values[1])

                        elif operator == 'seq':

                            filterstring += '''EXTRACT(YEAR FROM time) >= %s
                                            AND EXTRACT(YEAR FROM time) <= %s
                                            AND EXTRACT(MONTH FROM time) >= %s
                                            AND EXTRACT(MONTH FROM time) <= %s
                                            ''' % (years[0], years[1], months[0], months[1])

                    else:

                        filterstring += '''EXTRACT(YEAR FROM time) >= %s
                                            AND EXTRACT(YEAR FROM time) <= %s
                                            AND EXTRACT(MONTH FROM time) >= %s
                                            AND EXTRACT(MONTH FROM time) <= %s
                                            ''' % (years[0], years[1], months[0], months[1])

                else:

                    if operator == 'list' or operator == '!list':
                        if operator == 'list':
                            operator = 'IN'
                        else:
                            operator = 'NOT IN'

                        filterstring += ' %s %s (' % (column, operator)

                        first = True
                        for val in values:
                            if first:
                                filterstring += "'%s'" % val
                                first = False
                            else:
                                filterstring += ",'%s'" % val

                        filterstring += ')'

                    else:

                        valcounter = 0

                        for val in values:
                            if valcounter > 0:
                                filterstring += ' OR '

                            if operator and operator in self.valid_operators:
                                filterstring += "%s %s '%s' " % (column,
                                                                 operator, val)
                            else:
                                filterstring += "%s ~ '^%s.*' " % (column, val)

                            valcounter += 1

                filterstring += ')'

        return filterstring


    '''---------------------------------------------------------------------------------------------------------------------------------
        MERGING MARKERS BY DISTANCE

        - if the geometric centroids are too close to each other after the kmeans algorithm (e.g. overlap), they are merged to one cluster
        - used by kmeansCluster as phase 2
    ---------------------------------------------------------------------------------------------------------------------------------'''

    # this is currently broken
    def distanceCluster(self, points, c_distance=30):

        # clusterdistance in pixels, as this is constant on every zoom level

        current_clist = []

        for point in points:
            point.id = [point.id]
            current_clist.append(point)

        # hack
        return current_clist

        count = len(current_clist)

        if count > 1:

            for c in range(count):

                cluster = current_clist.pop(c)

                # iterate over remaining, grab and remove all in range
                rcount = len(current_clist)

                remove_points = []

                for i in range(rcount):

                    point = current_clist[i]

                    clustercoords = getattr(cluster, geo_column_str)
                    pointcoords = getattr(point, geo_column_str)

                    dist = self.maptools.points_calcPixelDistance(clustercoords, pointcoords, self.zoom)

                    if dist <= c_distance:

                        remove_points.append(i)
                        cluster.count += point.count
                        cluster.id += point.id

                        count += -1

                remove_points.reverse()
                for r in remove_points:
                    current_clist.pop(r)

                current_clist.insert(0, cluster)

                if c + 1 >= count:
                    break

        return current_clist

    
    '''---------------------------------------------------------------------------------------------------------------------------------
        KMEANS CLUSTERING

        - perform a raw query on the database, pass the result to phase 2 (distanceCluster) and return the result
    ---------------------------------------------------------------------------------------------------------------------------------'''       

    def kmeansCluster(self, clustercells, filters):

        pins = []

        # kmeans cluster in each cell
        for cell in clustercells:

            cell_topright, cell_bottomleft, poly = self.clusterCellToBounds(cell)

            if filters:

                filterstring = self.constructFilterstring(filters)

            else:

                filterstring = ""

            cellpins = Gis.objects.raw(
                '''SELECT kmeans AS id, count(*), ST_Centroid(ST_Collect(%s)) AS %s %s
                            FROM (
                              SELECT %s kmeans(ARRAY[ST_X(%s), ST_Y(%s)], 6) OVER (), %s
                              FROM "%s"
                              WHERE ST_Within(%s, ST_GeomFromText('%s',%s) ) %s
                            ) AS ksub
                            GROUP BY kmeans
                            ORDER BY kmeans;
                        ''' % (geo_column_str, geo_column_str, pin_qry[0],
                               pin_qry[1], geo_column_str, geo_column_str,
                               geo_column_str, geo_table, geo_column_str,
                               poly, self.srid_db, filterstring)
            )

            # merge near clusters
            cellpins = self.distanceCluster(list(cellpins))

            if DEBUG:
                print('pins after phase2: %s' % cellpins)

            for cell in cellpins:
                point = getattr(cell, geo_column_str)

                if point.srid != self.input_srid:
                    self.maptools.point_AnyToAny(point, point.srid, self.input_srid)

                if PINCOLUMN:
                    pinimg = cell.pinimg
                else:
                    pinimg = None

                pins.append({'ids': cell.id, 'count': cell.count, 'center': {
                            'x': point.x, 'y': point.y}, 'pinimg': pinimg})

        return pins


    '''---------------------------------------------------------------------------------------------------------------------------------
        GRID CLUSTERING 
    ---------------------------------------------------------------------------------------------------------------------------------'''

    # returns a poly for search and bounds for map display
    # this should be moved to MapTools!!
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

        return cell_topright, cell_bottomleft, poly
    
    
    def gridCluster(self, clustercells, filters):

        if DEBUG:
            print('clustercells: %s' % clustercells)

        gridCells = []

        # turn each cell into a poly. for more speed iterate only once over the
        # cells
        for cell in clustercells:

            cell_topright, cell_bottomleft, poly = self.clusterCellToBounds(cell)

            if DEBUG:
                print('\n\npoly: %s' % poly)

            # get count within poly. poly transformed to database srid
            Q_filters = Q()
            lookup = "%s__within" % geo_column_str
            Q_filters.add(Q(**{lookup: poly}), Q.AND)

            # apply optional filters
            if filters:

                filterstring = self.constructFilterstring(filters)

                pin_count_pre = Gis.objects.raw(''' SELECT COUNT(*) AS id FROM "%s" WHERE ST_Within(%s, ST_GeomFromText('%s',%s) )
                                                %s
                                            ''' % (geo_table, geo_column_str, poly, self.srid_db, filterstring))

                pin_count = int(pin_count_pre[0].id)

                if PINCOLUMN is not None and pin_count == 1:
                    pinimg_pre = Gis.objects.raw(''' SELECT %s AS id, %s AS %s FROM "%s" WHERE ST_Within(%s, ST_GeomFromText('%s',%s) )
                                                %s
                                            ''' % (PINCOLUMN, geo_column_str, geo_column_str, geo_table, geo_column_str, poly, self.srid_db, filterstring))

                    pinimg = pinimg_pre[0].id
                    coordinates = getattr(pinimg_pre[0], geo_column_str)
                else:
                    pinimg = None

            else:
                if PINCOLUMN:
                    pin_count = Gis.objects.filter(Q_filters).count()

                    if pin_count == 1:
                        pinimg_pre = Gis.objects.filter(Q_filters)[0]
                        pinimg = getattr(pinimg_pre, PINCOLUMN)
                        coordinates = getattr(pinimg_pre, geo_column_str)
                    else:
                        pinimg = None

                else:
                    pin_count = Gis.objects.filter(Q_filters).count()
                    pinimg = None

            # transform the polys to output srid if necessary
            if self.srid_db != self.input_srid:
                self.maptools.point_AnyToAny(
                    cell_topright, self.srid_db, self.input_srid)
                self.maptools.point_AnyToAny(
                    cell_bottomleft, self.srid_db, self.input_srid)

            # construct a square for grid nodes
            nodes = {
                "left": cell_bottomleft.x,
                "top": cell_topright.y,
                "right": cell_topright.x,
                "bottom": cell_bottomleft.y
                #"topRight":[cell_topright.x, cell_topright.y],
                #{x: cell_topright.x, y: cell_bottomleft.y},
                #"bottomLeft": [cell_bottomleft.x, cell_bottomleft.y]
                #, {x: cell_bottomleft.x, y: cell_topright.y}
            }

            if int(pin_count) == 1 and PINCOLUMN is not None:
                center_pre = Point(
                    coordinates.x, coordinates.y, srid=self.srid_db)

                if self.srid_db != self.input_srid:
                    self.maptools.point_AnyToAny(
                        center_pre, self.srid_db, self.input_srid)

                center_x = center_pre.x
                center_y = center_pre.y

            else:
                center_x = (cell_topright.x + cell_bottomleft.x) / 2
                center_y = (cell_topright.y + cell_bottomleft.y) / 2

            center = {"x": center_x, "y": center_y}

            cellobj = {'cell': nodes, 'count': pin_count,
                       'center': center, 'pinimg': pinimg}

            if DEBUG:
                print('\n\noutput: %s ' % nodes)

            gridCells.append(cellobj)

        return gridCells


    
    '''---------------------------------------------------------------------------------------------------------------------------------
        NON-CLUSTERING FUNCTIONS
    ---------------------------------------------------------------------------------------------------------------------------------'''
    
    def getKmeansClusterContent(self, x, y, kmeansList, filters):
        # return all IDs of the pins contained by a cluster

        cluster = Point(x, y, srid=self.input_srid)

        cell = self.maptools.getCellIDForPoint(
            cluster, self.zoom, self.gridSize)

        cell_str = ",".join(str(c) for c in cell)

        cell_topright, cell_bottomleft, poly = self.clusterCellToBounds(
            cell_str)

        kmeans_string = (",").join(str(k) for k in kmeansList)

        if filters:

            filterstring = self.constructFilterstring(filters)

        else:

            filterstring = ""

        entries = Gis.objects.raw('''SELECT *
                        FROM (
                          SELECT kmeans(ARRAY[ST_X(%s), ST_Y(%s)], 6) OVER (), %s.*
                          FROM "%s"
                          WHERE ST_Within(%s, ST_GeomFromText('%s',%s) ) %s
                        ) AS ksub
                        WHERE kmeans IN (%s);
                    ''' % (geo_column_str, geo_column_str, geo_table, geo_table, geo_column_str, poly, self.srid_db, filterstring, kmeans_string)
        )

        return entries
