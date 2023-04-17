from django.contrib.gis.gdal import SpatialReference, CoordTransform, SRSException
from django.contrib.gis.geos import Point, GEOSGeometry
import math


class MapTools():

    def __init__(self, mapTileSize=256):
        EARTH_RADIUS = 6378137
        # as in WGS84
        # resolution at zoom 0 (?)
        # 2r pi = umfang/perimeter in meters
        # gives the number of tilesizeXtilesize tiles needed for earth radius
        self.init_resolution = 2 * math.pi * EARTH_RADIUS / mapTileSize
        # gives a resolution in meters per pixel

        self.mapTileSize = mapTileSize

        # shoft mercator origin to bottom left
        # bottomleft of lnglat
        BottomLeft_4326 = Point(-180, -85.05112878, srid=4326)
        # bottomleft of mercator projection
        BottomLeft_Mercator = self.point_ToMercator(BottomLeft_4326)

        self.originshift_mercator = BottomLeft_Mercator

        self.DEBUG = False

    def point_ToMercator(self, point):

        source_srid = point.srid
        sourcecoord = SpatialReference(source_srid)
        try:
            mercator = SpatialReference("3857")
        except SRSException:
            try:
                mercator = SpatialReference("900913")
            except SRSException:
                mercator = SpatialReference("3785")
        trans = CoordTransform(sourcecoord, mercator)

        point.transform(trans)

        return point

    def point_ToLatLng(self, point):
        source_srid = SpatialReference(point.srid)
        wsg84 = SpatialReference("4326")
        trans = CoordTransform(source_srid, wsg84)

        point.transform(trans)

        return point

    # "World" in this case means mercator values with shifted origin (to bottom left)
    # the shift produces coordinates that are always > 0
    # origin shifted to bottomleft
    # unit is meters
    def point_MercatorToWorld(self, point):

        # set the origin of the mercator projected COordinate SYstem to bottom
        # left
        point.x = point.x - self.originshift_mercator.x

        point.y = point.y - self.originshift_mercator.y

        # google shifts to topleft. "google world coordinates" would be:
        # wy = ORIGINSHIFT - merc_coords[1]
        # and then calculating world to pixels at zoom 0 gives googles world coordinates
        # as it is more common, we use bottomleft as cosy origin

        return point

    # meters/pixel depending on zoom level, 2**zoom gives the number of tiles in a row/column per zoom level:
    # 2^0 = 1 tile, 2^1 = 2 tiles, 2^2 = 4tiles per row...
    def resolution(self, zoom):
        res = (self.init_resolution / (2 ** zoom))
        return res

    # convert meters into pixel count
    def point_WorldToPixels(self, point, zoom):
        # receives point in world coordinates and calculates floating point
        # pixel coordinates

        # resolution in meters/pixel
        res = self.resolution(zoom)

        point.x = point.x / res
        point.y = point.y / res

        if self.DEBUG:
            print('resolution: %s , zoom: %s \n' % (res, zoom))

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

        mbounds = {
            'left': mleft, 'top': mtop, 'right': mright, 'bottom': mbottom}

        return mbounds

    # receives a point in pixel coordinates and returns the cellid according
    # to the tilesize
    def point_PixelToCellID(self, point, gridSize):

        if self.DEBUG:
            print('gridsize: %i' % gridSize)
            print('x: %f' % point.x)

        cellX = int(math.ceil(point.x / float(gridSize)) - 1)
        cellY = int(math.ceil(point.y / float(gridSize)) - 1)
        # cellX,cellY = self.maptiles.PixelsToTile(point.x, point.y)

        if self.DEBUG:
            print('cellX: %s' % cellX)

        return [cellX, cellY]
    

    # returns tile bounds in pixels
    def cellIDToTileBounds(self, cellID, gridSize):
        # x, y = cellID.split(',')
        x = cellID[0]
        y = cellID[1]
        left = int(x) * gridSize  # minx
        bottom = int(y) * gridSize  # miny
        right = (int(x) + 1) * gridSize  # maxx
        top = (int(y) + 1) * gridSize  # maxy

        if self.DEBUG:
            print('pixelbounds for cell %s%s: left: %s, top: %s, right: %s, bottom: %s' % (
                cellID[0], cellID[1], left, top, right, bottom))

        pixelbounds = {
            'left': left, 'top': top, 'right': right, 'bottom': bottom}

        return pixelbounds

    '''

    VIEWPORT

    ---------------             ----------------
    |            A|             |cdefghijklmnoA|
    |             |    ----->   |pqrstuvwxyz123|
    |B            |             |B4567890CDEFGH|
    ---------------             ---------------


    Given the topright and bottom left Cell IDs, for example A(10,2) and B(15,1) calculate all cells spanned by A and B

    Possibility:
    ---------------
    |xxxA       xM|
    |xxxx       xx|
    |Lxxx       Bx|
    ---------------

    convert this into two rectangles AL + MB

    '''

    def calculate_ClusterCells(self, rectangleList):

        clusterCells = []

        for rect in rectangleList:

            max_x = max(rect["topright"][0], rect["bottomleft"][0])
            max_y = max(rect["topright"][1], rect["bottomleft"][1])
            min_x = min(rect["topright"][0], rect["bottomleft"][0])
            min_y = min(rect["topright"][1], rect["bottomleft"][1])

            for x in range(min_x, max_x + 1, 1):
                for y in range(min_y, max_y + 1, 1):
                    cell = (x,y)
                    # cell = '%s,%s' % (x, y)
                    clusterCells.append(cell)

        return clusterCells


    def getClusterCells(self, toprightCellID, bottomleftCellID, zoom):

        if toprightCellID[0] >= bottomleftCellID[0]:

            clusterCells = self.calculate_ClusterCells(
                [{"topright": toprightCellID, "bottomleft": bottomleftCellID}])

        else:
            # topright is left of bottomleft
            bottomleftEdgeCellID = [0, bottomleftCellID[1]]
            cellMax = (2 ** zoom) - 1
            toprightEdgeCellID = [cellMax, toprightCellID[1]]

            clusterCells = self.calculate_ClusterCells([{"topright": toprightCellID, "bottomleft": bottomleftEdgeCellID}, {
                                                       "topright": toprightEdgeCellID, "bottomleft": bottomleftCellID}])

        return clusterCells


    def clusterCellToBounds(self, cell, zoom, gridSize, srid):

        pixelbounds = self.cellIDToTileBounds(cell, gridSize)
        mercatorbounds = self.bounds_PixelToMercator(pixelbounds, zoom)

        # convert mercatorbounds to latlngbounds
        cell_topright = Point(mercatorbounds['right'], mercatorbounds['top'], srid=3857)
        cell_bottomleft = Point(mercatorbounds['left'], mercatorbounds['bottom'], srid=3857)

        # if it is not a latlng database, convert the polygons
        if srid != 3857:
            self.point_AnyToAny(cell_topright, 3857, srid)
            self.point_AnyToAny(cell_bottomleft, 3857, srid)

        poly_string = self.bounds_ToPolyString({'top': cell_topright.y, 'right': cell_topright.x,
                                                  'bottom': cell_bottomleft.y, 'left': cell_bottomleft.x})


        return poly_string


    def getClusterCellsAsPolyList(self, toprightCellID, bottomleftCellID, zoom, gridSize, srid):

        cells_as_poly = []
        
        cells_as_keys = self.getClusterCells(toprightCellID, bottomleftCellID, zoom)

        for cell in cells_as_keys:
            poly_string = self.clusterCellToBounds(cell, zoom, gridSize, srid)
            poly = GEOSGeometry(poly_string, srid=srid)
            cells_as_poly.append(poly)

        return cells_as_poly
    

    # bounds -> points -> poly (5 points as starting and end point are the
    # same)
    def bounds_ToPolyString(self, bounds):
        # a->b->c->d->a

        poly = 'POLYGON((%f %f, %f %f, %f %f, %f %f, %f %f))' % (bounds['right'], bounds['top'],
                                                                 bounds['right'], bounds[
                                                                     'bottom'],
                                                                 bounds['left'], bounds[
                                                                     'bottom'],
                                                                 bounds['left'], bounds[
                                                                     'top'],
                                                                 bounds['right'], bounds['top'])

        return poly

    # this one needs points in 3758, 900913 or 3857
    def points_calcPixelDistance(self, pointA, pointB, zoom):

        usable_srids = [3758, 900913, 3857]

        if pointA.srid not in usable_srids:
            pointA.transform(3857)

        if pointB.srid not in usable_srids:
            pointB.transform(3857)

        # calc distance in meters
        distance_m = math.sqrt(
            (pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2)

        # convert this to pixeldistance
        res = self.resolution(zoom)
        distance_p = distance_m / res

        return int(distance_p)


    def getCellIDForPoint(self, point_lnglat, zoom, gridSize):

        if point_lnglat.srid != 4326:
            point_lnglat.transform(4326)

        point_mercator = self.point_ToMercator(point_lnglat)
        point_world = self.point_MercatorToWorld(point_mercator)
        point_pixels = self.point_WorldToPixels(point_world, zoom)
        cellid = self.point_PixelToCellID(point_pixels, gridSize)

        return cellid


    def getCellForPointAsGeos(self, point, zoom, gridSize, srid):
        point = point.clone()
        cell_id = self.getCellIDForPoint(point, zoom, gridSize)
        poly_string = self.clusterCellToBounds(cell_id, zoom, gridSize, srid)
        poly = GEOSGeometry(poly_string, srid=srid)

        return poly
        

