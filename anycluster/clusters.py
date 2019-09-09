'''
    PointCluster
    - a class to represent clusters retrieved from the database kmeans query
'''
from django.conf import settings
from django.contrib.gis.geos import Point, GEOSGeometry

PINCOLUMN = getattr(settings, 'ANYCLUSTER_PINCOLUMN', None)

class PointCluster:

    # cluster_row = [id, count, coordinates_as_text]
    def __init__(self, kmeans_cluster_row, geo_column_str, srid):

        self.id = kmeans_cluster_row[0]
        self.count = kmeans_cluster_row[1]

        point = GEOSGeometry(kmeans_cluster_row[2], srid=srid)
        setattr(self, geo_column_str, point)

        if PINCOLUMN:
            self.pinimg = kmeans_cluster_row[3]
        else:
            self.pinimg = None
