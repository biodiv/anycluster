from anycluster.MapClusterer import MapClusterer
from django.conf import settings
from django.db.models.loading import get_model
from django.contrib.gis.geos import GEOSGeometry

#load the gis
geoapp, geomodel = settings.ANYCLUSTER_GEODJANGO_MODEL.split('.')
geo_column_str = settings.ANYCLUSTER_COORDINATES_COLUMN
Gis = get_model(geoapp, geomodel)
geo_table = Gis._meta.db_table


def getKmeansClusterEntries(request, zoom, gridSize):

    clusterer = MapClusterer(zoom, gridSize)
    filters = clusterer.parseFilters(request)

    clusterIDs = request.GET.getlist("id",[])
    x = float(request.GET["x"])
    y = float(request.GET["y"])

    entries = clusterer.getKmeansClusterContent(x,y, clusterIDs, filters)

    return entries

    
def getViewportMarkers(request, zoom, gridSize):

    postclustering = bool(int(request.GET.get("postclustering",0)))

    clusterer = MapClusterer(zoom, gridSize)

    if postclustering:
    
        filters = clusterer.parseFilters(request)

    else:
        viewport = clusterer.parseViewport(request)
        polystring = GEOSGeometry(clusterer.maptools.bounds_ToPolyString(viewport))
        polystring.srid = 4326

        qrystring = '%s__within' %geo_column_str

        markers = Gis.objects.filter(**{qrystring: polystring})


    return markers
        
        
    
