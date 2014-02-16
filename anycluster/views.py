from django.http import HttpResponse
from anycluster.MapClusterer import MapClusterer
from anycluster.scripts import getKmeansClusterEntries
from django.utils import simplejson


def getGrid(request, zoom, gridSize=256):

    clusterer = MapClusterer(zoom, gridSize)
    clustercells, filters = clusterer.getClusterParameters(request)

    grid = clusterer.gridCluster(clustercells,filters)
    
    return HttpResponse(simplejson.dumps(
        grid
        ), content_type="application/json")


def getPins(request, zoom, gridSize=512):

    clusterer = MapClusterer(zoom, gridSize)
    clustercells, filters = clusterer.getClusterParameters(request)

    markers = clusterer.kmeansCluster(clustercells,filters)
    
    return HttpResponse(simplejson.dumps(
        markers
        ), content_type="application/json")


def getBounds(request,srid=4326):
    clusterer = MapClusterer()
    filters = clusterer.parseFilters(request)
    filterstring = clusterer.constructFilterstring(filters)

    bounds = clusterer.getBounds(filterstring,srid)

    return HttpResponse(simplejson.dumps(
        bounds
        ), content_type="application/json")


#eaxmple for getting entries
def getClusterContent(request, zoom, gridSize=512):

    entries_raw = getKmeansClusterEntries(request,zoom,gridSize)

    
    entries = []

    for e in entries_raw:
        entries.append(e.id)
    

    return HttpResponse(simplejson.dumps(
        entries
        ), content_type="application/json")

    
