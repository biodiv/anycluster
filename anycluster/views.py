from django.http import HttpResponse
from anycluster.clusterer import MapClusterer
from django.utils import simplejson


def getGrid(request, zoom, gridSize=256):

    clusterer = MapClusterer()
    clustercells, filters = clusterer.getClusterParameters(request,int(zoom), int(gridSize))

    grid = clusterer.gridCluster(clustercells,filters,int(zoom), int(gridSize))
    
    return HttpResponse(simplejson.dumps(
        grid
        ), content_type="application/json")


def getPins(request, zoom, gridSize=512):

    clusterer = MapClusterer()
    clustercells, filters = clusterer.getClusterParameters(request,int(zoom),int(gridSize))

    markers = clusterer.kmeansCluster(clustercells,filters,int(zoom), int(gridSize))
    
    return HttpResponse(simplejson.dumps(
        markers
        ), content_type="application/json")


def getBounds(request,srid=4326):
    clusterer = MapClusterer()
    filters = clusterer.parseFilters(request)
    filterstring = clusterer.constructFilterstring(filters)

    bounds = clusterer.maptools.getBounds(filterstring,srid)

    return HttpResponse(simplejson.dumps(
        bounds
        ), content_type="application/json")
