from django.conf import settings
from django.contrib.gis.geos import Point
from django.contrib.gis.gdal import SpatialReference, CoordTransform
from django.utils import timezone

from anycluster import ClusterCache

from anymap.models import Gardens, GARDEN_STYLES

import subprocess, random

from anycluster.tests.common import VALID_FILTERS, VALID_FILTERS_WITH_LEFT_JOIN, VALID_FILTERS_LEFT_JOIN_ONLY


class WithGardens:

    def create_points(self, amount=100):

        for c in range(0,amount):

            style_index = random.randint(0, 4)
            style = GARDEN_STYLES[style_index][0]

            name = 'test garden {0}'.format(c)

            garden = self.create_point(name, style)

            
    def create_point(self, name, style, owner=None):

        latitude = float('{0}.{1}'.format(random.randint(48,49), str(random.random()).split('.')[-1]))
        longitude = float('{0}.{1}'.format(random.randint(9,13), str(random.random()).split('.')[-1]))

        point = Point(longitude, latitude, srid=4326)

        ct = CoordTransform(SpatialReference(point.srid), SpatialReference(3857))
        point.transform(ct)

        garden = Gardens(
            name = name,
            style = style,
            rating = random.randint(1, 5),
            last_renewal = timezone.now(),
            coordinates = point,
            owner=owner,
        )

        garden.save()

        return garden

    def get_cluster_cache(self, geometry_type, zoom, clustertype, filters):

        cluster_cache = ClusterCache(geometry_type, zoom, clustertype, filters)

        return cluster_cache

class WithGIS(WithGardens):

    def setUp(self):
        super().setUp()
        self.create_points()

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        test_database_name = settings.DATABASES['default']['NAME']

        if not test_database_name.startswith('test_'):
            raise ValueError('Not a test database, aborting')
        #psql -f /usr/share/postgresql15/extension/kmeans.sql -d YOURGEODJANGODATABASE
        subprocess.run(['psql', '-f', '/usr/share/postgresql15/extension/kmeans.sql', '-d', test_database_name])
        


class WithFilters:

    def get_test_filters(self):

        filters = [
            [],
            VALID_FILTERS,
            VALID_FILTERS_WITH_LEFT_JOIN,
            VALID_FILTERS_LEFT_JOIN_ONLY
        ]

        return filters