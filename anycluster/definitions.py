CLUSTER_TYPE_GRID = 'grid'
CLUSTER_TYPE_KMEANS = 'kmeans'
CLUSTER_TYPES = [CLUSTER_TYPE_GRID, CLUSTER_TYPE_KMEANS]

GEOMETRY_TYPE_VIEWPORT = 'viewport'
GEOMETRY_TYPE_AREA = 'area'
GEOMETRY_TYPES = [GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA]

MAX_BOUNDS = {
    '4326' : {
        'min_x' : -179, # left or min longitude
        'max_x' : 179, # right or max longitude
        'min_y' : -89, # bottom or min latitude
        'max_y' : 89 # top or max latitude
    },
    '3857' : {
        'min_x' : -20037500,
        'max_x' : 20037500,
        'min_y' : -20048960,
        'max_y' : 20048960
    }
}