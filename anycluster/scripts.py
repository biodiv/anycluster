from anycluster.MapClusterer import MapClusterer


def getKmeansClusterEntries(request, zoom, gridSize = 512):

    

    clusterer = MapClusterer(zoom, gridSize)
    filters = clusterer.parseFilters(request)

    clusterIDs = request.GET.getlist("id",[])
    x = float(request.GET["x"])
    y = float(request.GET["y"])

    entries = clusterer.getKmeansClusterContent(x,y, clusterIDs, filters)

    return entries

    
