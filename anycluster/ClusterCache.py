from anycluster.definitions import CLUSTER_TYPES, GEOMETRY_TYPES

import json

class ClusterCache:

    def __init__(self, geometry_type, zoom, clustertype, filters):

        if geometry_type not in GEOMETRY_TYPES:
            raise ValueError('Invalid geometry_type: {0}'.format(geometry_type))

        if clustertype not in CLUSTER_TYPES:
            raise ValueError('Invalid clustertype: {0}'.format(clustertype))

        self.geometry_type = geometry_type
        self.clustertype = clustertype
        self.zoom = zoom
        self.filters = filters

        self.geometries = []


    def add_geometry(self, geojson):

        try:
            json.loads(geojson)
        except Exception as e:
            raise ValueError('Invalid geojson string given')

        if geojson not in self.geometries:
            self.geometries.append(geojson)

    # cache from request.session['anycluster_cache'], as serialized by ClusterCache.serialize
    def load_geometries(self, cache):

        if cache:

            load_geometries = True

            for arg in ['geometry_type', 'clustertype', 'zoom', 'filters']:
                if getattr(self, arg) != cache[arg]:

                    load_geometries = False

            if load_geometries == True:
                self.geometries = cache['geometries']


    def serialize(self):

        cache = {
            'geometry_type': self.geometry_type,
            'clustertype': self.clustertype,
            'zoom': self.zoom,
            'filters': self.filters,
            'geometries': self.geometries,
        }

        return cache