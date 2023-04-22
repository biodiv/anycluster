from django.conf import settings
from django.contrib.gis.geos import Point
from django.contrib.gis.gdal import SpatialReference, CoordTransform
from django.utils import timezone

from anycluster import ClusterCache

from anymap.models import Gardens, GARDEN_STYLES

import subprocess, random

from anycluster.tests.common import VALID_FILTERS


class WithGIS:

    def setUp(self):
        super().setUp()
        self.create_points()


    def create_points(self, amount=100):

        for c in range(0,amount):


            latitude = float('{0}.{1}'.format(random.randint(48,49), str(random.random()).split('.')[-1]))
            longitude = float('{0}.{1}'.format(random.randint(9,13), str(random.random()).split('.')[-1]))

            point = Point(longitude, latitude, srid=4326)

            ct = CoordTransform(SpatialReference(point.srid), SpatialReference(3857))
            point.transform(ct)

            style_index = random.randint(0, 4)
            style = GARDEN_STYLES[style_index][0]

            garden = Gardens(
                name = 'test garden {0}'.format(c),
                style = style,
                rating = random.randint(1, 5),
                last_renewal = timezone.now(),
                coordinates = point
            )

            garden.save()


    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        test_database_name = settings.DATABASES['default']['NAME']

        if not test_database_name.startswith('test_'):
            raise ValueError('Not a test database, aborting')
        #psql -f /usr/share/postgresql15/extension/kmeans.sql -d YOURGEODJANGODATABASE
        subprocess.run(['psql', '-f', '/usr/share/postgresql15/extension/kmeans.sql', '-d', test_database_name])
        

    def get_cluster_cache(self, geometry_type, zoom, clustertype, filters):

        cluster_cache = ClusterCache(geometry_type, zoom, clustertype, filters)

        return cluster_cache


class WithFilters:

    def get_test_filters(self):

        filters = [
            [],
            VALID_FILTERS
        ]

        return filters