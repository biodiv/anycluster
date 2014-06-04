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

    clusterer = MapClusterer(zoom, gridSize)
    clustercells, filters = clusterer.getClusterParameters(request)

    grid = clusterer.gridCluster(clustercells,filters)
    
    return HttpResponse(json.dumps(
        grid
        ), content_type="application/json")


def getPins(request, zoom, gridSize):

    clusterer = MapClusterer(zoom, gridSize)
    clustercells, filters = clusterer.getClusterParameters(request)

    markers = clusterer.kmeansCluster(clustercells,filters)
    
    return HttpResponse(json.dumps(
        markers
        ), content_type="application/json")


def getClusterContent(request, zoom, gridSize):

    clusterer = MapClusterer(zoom, gridSize)
    
    params = clusterer.loadJson(request)
    filters = clusterer.parseFilters(params.get("filters"))

    entries = clusterer.getKmeansClusterContent(params["x"],params["y"], params["ids"], filters)

    return render(request, 'anycluster/clusterPopup.html', {'entries':entries})

# function used by severeal views for offering the possibility to select a template
def loadAreaContent(request, zoom, gridSize):

    clusterer = MapClusterer(zoom, gridSize)
    
    viewport, filters, deliver_cache = clusterer.parseRequest(request)

    params = clusterer.loadJson(request)

    if filters:
        filterstring = clusterer.constructFilterstring(filters)

    else:
        filterstring = ""

    geometry = GEOSGeometry(json.dumps(params["geojson"]["geometry"]), srid=clusterer.input_srid)
    geometry.transform(clusterer.srid_db)

    markers = Gis.objects.raw(
        "SELECT * FROM %s WHERE ST_WITHIN(%s, ST_GeomFromText('%s',%s) ) %s;" % (geo_table, geo_column_str, geometry, clusterer.srid_db, filterstring)
    )

    return markers
    

def getAreaMarkers(request, zoom, gridSize):

    markers = loadAreaContent(request, zoom, gridSize)

    return render(request, 'anycluster/clusterPopup.html', {'entries':markers})


def getViewportMarkers(request, zoom, gridSize):

    markers = loadAreaContent(request, zoom, gridSize)

    return render(request, 'anycluster/viewportMarkerList.html', {'entries':markers})
