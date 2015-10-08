from django.http import HttpResponse
from django.shortcuts import render
from anycluster.MapClusterer import MapClusterer
from django.conf import settings
from django.db.models.loading import get_model
from django.contrib.gis.geos import GEOSGeometry

import json


#load the gis
geoapp, geomodel = settings.ANYCLUSTER_GEODJANGO_MODEL.split('.')
geo_column_str = settings.ANYCLUSTER_COORDINATES_COLUMN
Gis = get_model(geoapp, geomodel)
geo_table = Gis._meta.db_table


def getGrid(request, zoom, gridSize=256):

    clusterer = MapClusterer(request, zoom, gridSize)

    grid = clusterer.gridCluster()
    
    return HttpResponse(json.dumps(
        grid
        ), content_type="application/json")


def getPins(request, zoom, gridSize):

    clusterer = MapClusterer(request, zoom, gridSize)

    markers = clusterer.kmeansCluster()
    
    return HttpResponse(json.dumps(
        markers
        ), content_type="application/json")


def getClusterContent(request, zoom, gridSize):

    clusterer = MapClusterer(request, zoom, gridSize)

    entries = clusterer.getClusterContent()

    return render(request, 'anycluster/clusterPopup.html', {'entries':entries})



def getAreaContent(request, zoom, gridSize):

    clusterer = MapClusterer(request, zoom, gridSize)
    entries = clusterer.getAreaContent()

    return render(request, 'anycluster/clusterPopup.html', {'entries':entries})
