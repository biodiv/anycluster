'''---------------------------------------------------------------------------------------

                                    DJANGO MAP CLUSTERING

                                    - kmeans
                                    - grid

VERSION: 0.1
AUTHOR: biodiv
LICENSE: GPL

---------------------------------------------------------------------------------------'''
import math, pyproj
from django.db.models import Q
from django.contrib.gis.gdal import SpatialReference, CoordTransform
from django.contrib.gis.geos import Point
from globalmaptiles import GlobalMercator, GlobalGeodetic #optional for fallback calculations, not included yet


DEBUG = False

if DEBUG == False:
    from django.conf import settings
    from django.db.models.loading import get_model

    #get the model as defined in settings
    geoapp, geomodel = settings.ANYCLUSTER_GEODJANGO_MODEL.split('.')
    geo_column_str = settings.ANYCLUSTER_COORDINATES_COLUMN
    cluster_filters = getattr(settings, 'ANYCLUSTER_FILTERS', None)

    Gis = get_model(geoapp,geomodel)

    geo_table = Gis._meta.db_table

    #get the table name

else:
    geo_column_str = 'coordinates'
    geo_table = 'SIGHTINGS_GIS'



'''--------------------------------------------------------------------------------------

    GRID CLUSTERING

    - receives viewport coordinates
    - gets map grid (coordinates -> mercator -> pixels)
    - counts markers in each cell
    - returns the cells as polygons (output srid = input srid) alongside the count
    
--------------------------------------------------------------------------------------'''
'''--------------------------------------------------------------------------------------

    KMEANS-GRID CLUSTERING

    - receives viewport coordinates
    - creates bigger cells than gridclusteronly
    - kmeans clusters in each cell
    - returns kmeans cluster points, not cells
    
--------------------------------------------------------------------------------------'''

'''----------------------------------------------------------------------------------
VIEWPORT CORNERS TO TILES
having the pixel coordinates of the viewport corners (topright, bottomleft) calculate
on which cells the kmeans clustering has to be done.

 ----------                -----------
|          |              | 01  | 11  |
|          |              |     |     |
|   0/0    | --------->   |-----------|
|          |              | 00  | 10  |
|          |              |     |     |
 ----------                -----------
   zoom 0                     zoom 1
----------------------------------------------------------------------------------'''


'''

    A VIEWPORT is defined by topright bottomleft coordinates + SRID

    4-------------a
    |             |
    |             |     a -> 2 -> b -> 4 -> a    ------> POLYGON: a.long a.lat ; a.long b.lat ; b.long b.lat; b.long a.lat ; a.long a.lat (long extends to right)
    |             |
    b-------------2


    format of viewport is a json array: [a_x, a_y, b_x, b_y]
        while x/y can be lat/lng or any other coordinate pair alongside the corresponding srid

    GEOS is lnglat, google latlng
    
'''



'''
zoom 0

== Tile Boundaries ==

WGS84 datum (longitude/latitude):
-180 -85.05112877980659
180 85.0511287798066

Spherical Mercator (meters):
-20037508.342789244 -20037508.342789244
20037508.342789244 20037508.342789244


Mercator max: 20037508
Mercator min: -20037508

Pixels at zoom 0:
0 0 256 256


World max: 40075016
World min: 40075016
    
'''

if DEBUG:
    viewport = {'left':-180,'top':89.90729724588122,'right':180,'bottom':-89.33684882403654}
    viewport2 = {'left':-180,'top':86.18232163314582,'right':180,'bottom':-82.57085949880509}
    viewport3 = {'left':-175.78124999999775, 'top':84.67351256610502, 'right':175.78124999999775, 'bottom':-84.67351256610502}


class MapTools():
    
    def __init__(self, mapTileSize = 256):
        EARTH_RADIUS = 6378137 #as in WGS84
        #resolution at zoom 0 (?)
        #2r pi = umfang/perimeter in meters
        self.init_resolution = 2 * math.pi * EARTH_RADIUS / mapTileSize #gives the number of tilesizeXtilesize tiles needed for earth radius
        #gives a resolution in meters per pixel
        
        self.mapTileSize = mapTileSize

        #shoft mercator origin to bottom left
        BottomLeft_4326 = Point(-180, -85.05112878, srid=4326)  #bottomleft of lnglat
        BottomLeft_Mercator = self.point_ToMercator(BottomLeft_4326) #bottomleft of mercator projection

        self.originshift_mercator = BottomLeft_Mercator
        
    
    def point_ToMercator(self, point):

        source_srid = point.srid
        sourcecoord = SpatialReference(source_srid)
        mercator = SpatialReference("900913")
        trans = CoordTransform(sourcecoord, mercator)
        
        point.transform(trans)

        return point

    def point_ToLatLng(self, point):
        source_srid = point.srid
        sourcecoord = SpatialReference(source_srid)
        wsg84 = SpatialReference("4326")
        trans = CoordTransform(sourcecoord, wsg84)
        
        point.transform(trans)

        return point
        


    #"World" in this case means mercator values with shifted origin (to bottom left)
    #the shift produces coordinates that are always > 0
    #origin shifted to bottomleft
    #unit is meters
    def point_MercatorToWorld(self, point):
        
        #set the origin of the mercator projected COordinate SYstem to bottom left
        point.x = point.x - self.originshift_mercator.x
    
        point.y = point.y - self.originshift_mercator.y
        
        #google shifts to topleft. "google world coordinates" would be:
        #wy = ORIGINSHIFT - merc_coords[1]
        #and then calculating world to pixels at zoom 0 gives googles world coordinates
        #as it is more common, we use bottomleft as cosy origin

        return point


    #meters/pixel depending on zoom level, 2**zoom gives the number of tiles in a row/column pre zoom level:
    # 2^0 = 1 tile, 2^1 = 2 tiles, 2^2 = 4tiles per row...
    def resolution(self, zoom):
        res = (self.init_resolution / (2**zoom) )
        return res

    #convert meters into pixel count
    def point_WorldToPixels(self, point, zoom):
        #receives point in world coordinates and calculates floating point pixel coordinates
 
        #resolution in meters/pixel
        res = self.resolution(zoom)
        
        point.x = point.x / res
        point.y = point.y / res

        if DEBUG:
            print('resolution: %s , zoom: %s \n' %(res,zoom) )
        
        return point

    def point_AnyToAny(self, point, source_srid, target_srid):
        source_srid = SpatialReference(source_srid)
        target_srid = SpatialReference(target_srid)
        trans = CoordTransform(source_srid, target_srid)
        
        point.transform(trans)

        return point



    def bounds_PixelToMercator(self, bounds, zoom):

        res = self.resolution(zoom)

        mleft = bounds['left'] * res + self.originshift_mercator.x
        mtop = bounds['top'] * res + self.originshift_mercator.y
        mright = bounds['right'] * res + self.originshift_mercator.x
        mbottom = bounds['bottom'] * res + self.originshift_mercator.y
        
        mbounds = {'left':mleft,'top':mtop, 'right':mright, 'bottom':mbottom}

        return mbounds
         

    #receives a point in pixel coordinates and returns the cellid according to the tilesize
    def point_PixelToCellID(self, point, gridSize):

        if DEBUG:
            print('gridsize: %i'  %gridSize)
            print('x: %f' %point.x)

        cellX = int( math.ceil( point.x / float(gridSize) ) - 1 )
        cellY = int( math.ceil( point.y / float(gridSize) ) - 1 )
        #cellX,cellY = self.maptiles.PixelsToTile(point.x, point.y)

        if DEBUG:
            print('cellX: %s' %cellX)

        return [cellX, cellY]


    #returns tile bounds in pixels
    def cellIDToTileBounds(self, cellID, gridSize):
        left = cellID[0] * gridSize #minx
        bottom = cellID[1] * gridSize #miny
        right = (cellID[0]+1) * gridSize #maxx
        top = (cellID[1]+1) * gridSize #maxy

        if DEBUG:
            print('pixelbounds for cell %s%s: left: %s, top: %s, right: %s, bottom: %s' %(cellID[0],cellID[1],left,top,right, bottom))

        pixelbounds = {'left':left, 'top':top, 'right':right, 'bottom':bottom}

        return pixelbounds
        
    


    '''

    VIEWPORT 

    ---------------             ----------------
    |            A|             |cdefghijklmnoA|
    |             |    ----->   |pqrstuvwxyz123|
    |B            |             |B4567890CDEFGH|
    ---------------             ---------------


    Given the topright and bottom left Cell IDs, for example A(10,2) and B(15,1) calculate all cells spanned by A and B
    
    '''

    def get_ClusterCells(self, toprightCellID, bottomleftCellID):
        clusterCells = []
        max_x = toprightCellID[0]
        max_y = toprightCellID[1]
        min_x = bottomleftCellID[0]
        min_y = bottomleftCellID[1]
        for x in range(min_x,max_x+1,1):
            for y in range(min_y,max_y+1,1):
                cell = [x,y]
                clusterCells.append(cell)
                
        return clusterCells

    #bounds -> points -> poly (5 points as starting and end point are the same)
    def bounds_ToPolyString(self, bounds):
        #a->b->c->d->a
        
        poly = 'POLYGON((%f %f, %f %f, %f %f, %f %f, %f %f))' %(bounds['right'], bounds['top'],
                                                                bounds['right'], bounds['bottom'],
                                                                bounds['left'], bounds['bottom'],
                                                                bounds['left'], bounds['top'],
                                                                bounds['right'], bounds['top'])
        
        return poly
    
    

#default is latlng 4326, input srid = output srid!
class MapClusterer():

    def __init__(self, mapTileSize=256, input_srid=4326 ):

        self.input_srid = input_srid
        self.maptools = MapTools(mapTileSize)


    #defaults to goole srid
    #viewport is {'top':1,'right':2,'bottom':3,'left':4}
    def gridCluster(self, viewport, zoom, gridSize = 256, **kwargs):

        #filters = kwargs.get('filters', None)
                
        clustercells = self.getClusterCells(viewport, zoom, gridSize)

        if DEBUG:
            print('clustercells: %s' %clustercells)

        gridCells = []
        
        #turn each cell into a poly. for more speed iterate only once over the cells
        for cell in clustercells:
            
            cell_topright, cell_bottomleft, poly, srid_db = self.clusterCellToBounds(cell, gridSize, zoom)

            if DEBUG:
                print('\n\npoly: %s' %poly)

            
            #get count within poly. poly transformed to database srid
            Q_filters = Q()
            lookup = "%s__within" % geo_column_str
            Q_filters.add(Q(**{lookup:poly}), Q.AND)

            #apply optional filters
            if cluster_filters:
                    
                    
                            
                    for key in cluster_filters:
                    
                        value = viewport.get(key, None)

                        if value:
                            E_filters = Q()
                            values = value.split('-')

                            for val in values:
                                lookup = "%s__startswith" %key
                                E_filters.add(Q(**{lookup:val}), Q.OR)
                                    
                            Q_filters.add(E_filters, Q.AND)
            
            pin_count = Gis.objects.filter(Q_filters).count()

            #transform the polys to output srid if necessary
            if srid_db != self.input_srid:
                self.maptools.point_AnyToAny(cell_topright, srid_db, self.input_srid)
                self.maptools.point_AnyToAny(cell_bottomleft, srid_db, self.input_srid)
            

            #construct a square for grid nodes
            x = 'x'
            y = 'y'
            nodes = [{x: cell_topright.x, y: cell_topright.y}, {x:cell_topright.x, y:cell_bottomleft.y},
                    {x: cell_bottomleft.x, y: cell_bottomleft.y}, {x: cell_bottomleft.x, y: cell_topright.y}]

            center_x = (cell_topright.x + cell_bottomleft.x)/2
            center_y = (cell_topright.y + cell_bottomleft.y)/2
            
            center = {x: center_x, y:center_y}

            cellobj = {'cell':nodes, 'count': pin_count, 'center':center}

            if DEBUG:
                print('\n\noutput: %s ' %nodes)

            gridCells.append(cellobj)

        return gridCells
    

    def kmeansCluster(self,viewport, zoom, gridSize=512, **kwargs):

        #filters = kwargs.get('filters', None)
        
        clustercells = self.getClusterCells(viewport, zoom, gridSize)

        pins = []

        #kmeans cluster in each cell
        for cell in clustercells:
            
            cell_topright, cell_bottomleft, poly, srid_db = self.clusterCellToBounds(cell, gridSize, zoom)

            if cluster_filters is not None:

                filterstring = ''

                counter = 0
                
                for key in cluster_filters:
                    
                    value = viewport.get(key, None)
                    
                    if value:

                        #if there are multiple values, they are separated by a comma
                        values = value.split('-')

                        if counter == 0:
                            filterstring += ' AND ( '

                        valcounter = 0

                        for val in values:
                            if valcounter > 0:
                                filterstring += ' OR '
                            
                            filterstring += "%s ~ '^%s.*' " %(key, val)
                            valcounter += 1
                        
                        counter += 1

                    if len(filterstring) > 0:
                        filterstring += ')'

                #ST_AsText( ST_MinimumBoundingCircle(ST_Collect(%s),3) ) AS nodes
                cellpins = Gis.objects.raw(
                        '''SELECT kmeans AS id, count(*), ST_Centroid(ST_Collect(%s)) AS coordinates
                            FROM (
                              SELECT kmeans(ARRAY[ST_X(%s), ST_Y(%s)], 4) OVER (), %s
                              FROM %s
                              WHERE ST_Within(%s, ST_GeomFromText('%s',%s) ) %s
                            ) AS ksub
                            GROUP BY kmeans
                            ORDER BY kmeans;
                        ''' %(geo_column_str,geo_column_str,geo_column_str,geo_column_str, geo_table,geo_column_str, poly, srid_db, filterstring)
                        )

            else:

                cellpins = Gis.objects.raw('''SELECT kmeans AS id, count(*), ST_Centroid(ST_Collect(%s)) AS coordinates
                            FROM (
                              SELECT kmeans(ARRAY[ST_X(%s), ST_Y(%s)], 4) OVER (), %s
                              FROM %s
                              WHERE ST_Within(%s, ST_GeomFromText('%s',%s) )
                            ) AS ksub
                            GROUP BY kmeans
                            ORDER BY kmeans;
                        ''' %(geo_column_str,geo_column_str,geo_column_str,geo_column_str, geo_table,geo_column_str, poly, srid_db)
                        )



            for cell in cellpins:
                point = cell.coordinates

                #calculate the radius in METERS
                '''
                if 'POLYGON' in cell.nodes:
                    rimnode = cell.nodes.lstrip('POLYGON((').strip('INT(').rstrip('))').split(',')[0]
                    
                    rimx, rimy = rimnode.split(' ')
                    rimpoint = Point(float(rimx),float(rimy), srid=srid_db)

                    if srid_db != 4326:
                        center = point.clone()
                        self.maptools.point_ToLatLng(rimpoint)
                        self.maptools.point_ToLatLng(center)

                    #calc distance
                    geod = pyproj.Geod(ellps='WGS84')

                    try:
                        angle1,angle2,distance = geod.inv(center.x, center.y, rimpoint.x, rimpoint.y)
                        #distance = math.sqrt( (float(rimx)-point.x)**2 + (float(rimy)-point.x)**2 )
                        #distance = center.distance(rimpoint)
                    except:
                        distance = 0
                    
                elif 'POINT' in cell.nodes:
                    distance = 0
                    
                else:
                    distance = 0

                if point.srid != self.input_srid:
                    self.maptools.point_AnyToAny(point, point.srid, self.input_srid)

                pins.append({'count':cell.count, 'x':point.x, 'y':point.y, 'radius':distance})
                '''
                if point.srid != self.input_srid:
                    self.maptools.point_AnyToAny(point, point.srid, self.input_srid)
                
                pins.append({'count':cell.count, 'x':point.x, 'y':point.y})

        return pins
        


    #returns a poly for search and bounds for map display
    def clusterCellToBounds(self, cell, gridSize, zoom):

        bounds = []

        pixelbounds = self.maptools.cellIDToTileBounds(cell,gridSize)
        mercatorbounds = self.maptools.bounds_PixelToMercator(pixelbounds, zoom)
        
        #convert mercatorbounds to latlngbounds
        cell_topright = Point(mercatorbounds['right'],mercatorbounds['top'], srid=3857)
        cell_bottomleft = Point(mercatorbounds['left'],mercatorbounds['bottom'], srid=3857)
        self.maptools.point_ToLatLng(cell_topright)
        self.maptools.point_ToLatLng(cell_bottomleft)
        

        #we need bounds according to the srid of the database
        srid_qry = "SELECT id, ST_SRID(%s) FROM %s LIMIT 1;" %(geo_column_str, geo_table)
        srid_db = Gis.objects.raw(srid_qry)[0].st_srid

        #if it is not a latlng database, convert the polygons
        if srid_db != 4326:
            self.maptools.point_AnyToAny(cell_topright, 4326, srid_db)
            self.maptools.point_AnyToAny(cell_bottomleft, 4326, srid_db)

                    
        
        poly = self.maptools.bounds_ToPolyString({'top':cell_topright.y,'right':cell_topright.x,
                                                  'bottom':cell_bottomleft.y,'left':cell_bottomleft.x})

        return cell_topright, cell_bottomleft, poly, srid_db

    '''-------------------------------------------------------------------------------------------------------------------

       LatLng --------> Meters (Mercator) ---------> Shifted origin ---------> pixel coords ---------> GRID, depending on tilesize

     -----------           -----------                -----------              -----------
    |           |         |           |              |           |            |           | 
    |           |         |           |              |           |            |           | 
    |     O     |         |     O     |              |           |            |           | 
    |           |         |           |              |           |            |           | 
    |           |         |           |              |           |            |           | 
     -----------           -----------               O-----------             O-----------
       LATLNG                 METERS                     METERS                   PIXELS
                                                 (shifted coordinates)
      
    O = origin

    The coordinate system with shifted origin has only coordinates with positive values.
    This makes it possible to calculate a quadKey value for each marker.
    --------------------------------------------------------------------------------------------------------------------'''
        

    #returns QuadKey IDS on the viewport according to a defined tilesize
    def getClusterCells(self, viewport, zoom, gridSize):

        #if DEBUG:
        #    print('VIEWPORT(wgs84datum, 4326, longlat): %s' %viewport)


        #create points according to input srid
        topright = Point(float(viewport['right']),float(viewport['top']), srid=self.input_srid)
        bottomleft = Point(float(viewport['left']),float(viewport['bottom']), srid=self.input_srid)

        if self.input_srid != 4326:
            topright = self.maptools.point_ToLatLng(topright)
            bottomleft = self.maptools.point_ToLatLng(bottomleft)

        #Polar areas with abs(latitude) bigger then 85.05112878 are clipped off.
        if topright.y > 85.0:
            topright.y = 85.0

        if topright.x > 179.9999:
            topright.x = 179.9999

        if bottomleft.y < -85:
            bottomleft.y = -85

        if bottomleft.x < -179.9999:
            bottomleft.x = -179.9999

        if DEBUG:
            print('4326, longlat: topright: (%s,%s) | bottomleft: (%s,%s)' %(topright.x,topright.y,bottomleft.x,bottomleft.y))

        #project points to mercator 3875, plane coordinates
        self.maptools.point_ToMercator(topright)
        self.maptools.point_ToMercator(bottomleft)

        if DEBUG:
            print('MERCATOR: topright: (%s,%s) | bottomleft: (%s,%s)' %(topright.x,topright.y,bottomleft.x,bottomleft.y))
        
        #shift origin
        self.maptools.point_MercatorToWorld(topright)
        self.maptools.point_MercatorToWorld(bottomleft)

        if DEBUG:
            print('WORLD: topright: (%s,%s) | bottomleft: (%s,%s)' %(topright.x,topright.y,bottomleft.x,bottomleft.y))
        
        #calculate pixelcoords from world coords depending on zoom
        self.maptools.point_WorldToPixels(topright, zoom)
        self.maptools.point_WorldToPixels(bottomleft, zoom)

        if DEBUG:
            print('PIXELS: topright: (%s,%s) | bottomleft: (%s,%s)' %(topright.x,topright.y,bottomleft.x,bottomleft.y))

        
        #get topright and bottom left cellID, e.g. (03,01)
        toprightCell = self.maptools.point_PixelToCellID(topright, gridSize)
        bottomleftCell = self.maptools.point_PixelToCellID(bottomleft, gridSize)

        if DEBUG:
            print('CELLID: toprightCell: %s  |  bottomleftCell: %s' %(toprightCell, bottomleftCell))
        
        
        #get all Cells that need to be clustered
        clusterCells = self.maptools.get_ClusterCells(toprightCell,bottomleftCell)
        
        #from ID-list create list of polygons
        return clusterCells



'''----------------------------------------------------------------------------------

                                     TILER

the tiler function splits a given rectangle into an amount of subrectangles
and returns these subrectangles. The root rectangle is sliced into a given number
of rows and columns. 
All rectangles are defined only by the topleft and bottom right coordinates

passing latlngs to this tiler works, but using projected rectangles is more
accurate.

----------------------------------------------------------------------------------'''

def tiler(topright, bottomleft, ROWS=5, COLUMNS=5): #an area is currently given as a list of 4 elements (topleft/bottom right latlng)
    #convert to mercator, then slice olygon
    #if area.geom_type == 'Polygon':
        lat1 = area[0]#topleft
        lon1 = area[1]#topleft
        lat2 = area[2]#bottomright
        lon2 = area[3]#bottomright
        latdiff = (lat2-lat1)/ROWS
        londiff = (lon2-lon1)/COLUMNS
        rectangle_list = []
        for row in range(1,(ROWS+1)):
            for column in range(1,COLUMNS+1):
                rectangle = [lat1+(latdiff*(column-1)),lon1+(londiff*(row-1)),lat1+(latdiff*column),lon1+(londiff*row)]#topleft,bottomright as latlng
                rectangle_list.append(rectangle)
        return rectangle_list

    
