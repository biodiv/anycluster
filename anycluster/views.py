from django.http import HttpResponse
from django.shortcuts import render
from anycluster.MapClusterer import MapClusterer
from anycluster.scripts import getKmeansClusterEntries, getViewportMarkers
import json


def getGrid(request, zoom, gridSize=256):

    clusterer = MapClusterer(zoom, gridSize)
    clustercells, filters = clusterer.getClusterParameters(request)

    grid = clusterer.gridCluster(clustercells,filters)
    
    return HttpResponse(json.dumps(
        grid
        ), content_type="application/json")


def getPins(request, zoom, gridSize=512):

    clusterer = MapClusterer(zoom, gridSize)
    clustercells, filters = clusterer.getClusterParameters(request)

    markers = clusterer.kmeansCluster(clustercells,filters)
    
    return HttpResponse(json.dumps(
        markers
        ), content_type="application/json")


def getBounds(request,srid=4326):
    clusterer = MapClusterer()
    filters = clusterer.parseFilters(request)
    filterstring = clusterer.constructFilterstring(filters)

    bounds = clusterer.getBounds(filterstring,srid)

    return HttpResponse(json.dumps(
        bounds
        ), content_type="application/json")


#eaxmple for getting entries
def getClusterContent(request, zoom, gridSize):

    entries_raw = getKmeansClusterEntries(request,zoom,gridSize)   

    return render(request, 'anycluster/clusterPopup.html', {'entries':entries_raw})

    
#example for gett viewport markers
def getAllViewPortMarkers(request,zoom,gridSize):

    markers = getViewportMarkers(request,zoom,gridSize)

    return HttpResponse(simplejson.dumps(
        markers
        ), content_type="application/json")
