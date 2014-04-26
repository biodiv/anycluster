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


def getBounds(request,srid=4326):
    clusterer = MapClusterer()
    filters = clusterer.parseFilters(request)
    filterstring = clusterer.constructFilterstring(filters)

    bounds = clusterer.getBounds(filterstring,srid)

    return HttpResponse(json.dumps(
        bounds
        ), content_type="application/json")


def getClusterContent(request, zoom, gridSize):

    clusterer = MapClusterer(zoom, gridSize)
    filters = clusterer.parseFilters(request)

    clusterIDs = request.GET.getlist("id",[])
    x = float(request.GET["x"])
    y = float(request.GET["y"])

    entries = clusterer.getKmeansClusterContent(x,y, clusterIDs, filters)

    return render(request, 'anycluster/clusterPopup.html', {'entries':entries})

    
def getAreaMarkers(request, zoom, gridSize):

    clusterer = MapClusterer(zoom, gridSize)

    postclustering = bool(int(request.GET.get("postclustering",0)))
    
    if postclustering:
        a=b

    else:
        viewport, filters = clusterer.parseRequest(request)

        if filters:
            filterstring = clusterer.constructFilterstring(filters)

        else:
            filterstring = ""
        
        polystring = GEOSGeometry(clusterer.maptools.bounds_ToPolyString(viewport), srid=clusterer.input_srid)
        polystring.transform(clusterer.srid_db)
    
        markers = Gis.objects.raw(
            "SELECT * FROM %s WHERE ST_WITHIN(%s, ST_GeomFromText('%s',%s) ) %s;" % (geo_table, geo_column_str, polystring, clusterer.srid_db, filterstring)
        )

    return render(request, 'anycluster/clusterPopup.html', {'entries':markers})
