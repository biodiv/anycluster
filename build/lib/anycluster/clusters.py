'''
    PointCluster
    - a class to represent clusters retrieved from the database kmeans query
'''
from django.conf import settings
from django.contrib.gis.geos import Point, GEOSGeometry

PINCOLUMN = getattr(settings, 'ANYCLUSTER_PINCOLUMN', None)
ADDITIONAL_COLUMN = getattr(settings, 'ANYCLUSTER_ADDITIONAL_COLUMN', None)

class PointCluster:

    # cluster_row = [id, count, coordinates_as_text]
    def __init__(self, kmeans_cluster_row, geo_column_str, srid):

        self.id = kmeans_cluster_row[0]
        self.count = kmeans_cluster_row[1]

        self.pinimg = None

        point = GEOSGeometry(kmeans_cluster_row[2], srid=srid)
        setattr(self, geo_column_str, point)

        if ADDITIONAL_COLUMN:
            setattr(self, ADDITIONAL_COLUMN, None)

        if PINCOLUMN:
            self.pinimg = kmeans_cluster_row[3]
            if ADDITIONAL_COLUMN:
                setattr(self, ADDITIONAL_COLUMN, kmeans_cluster_row[4])
        else:
            

            # additional column has index 3 in this case
            if ADDITIONAL_COLUMN:
                setattr(self, ADDITIONAL_COLUMN, kmeans_cluster_row[3])


