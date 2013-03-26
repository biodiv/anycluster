from django.http import HttpResponse
from anycluster.clusterer import MapClusterer
from django.utils import simplejson


def getGrid(request, zoom, gridSize=256):

    clusterer = MapClusterer()

    grid = clusterer.gridCluster(request,int(zoom), int(gridSize))
    
    return HttpResponse(simplejson.dumps(
        grid
        ), content_type="application/json")


def getPins(request, zoom, gridSize=512):

    clusterer = MapClusterer()

    markers = clusterer.kmeansCluster(request,int(zoom), int(gridSize))
    
    return HttpResponse(simplejson.dumps(
        markers
        ), content_type="application/json")
