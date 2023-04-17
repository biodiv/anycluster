from django.test import TestCase

from anycluster.api.serializers import ClusterRequestSerializer

from anycluster.tests.common import VALID_VIEWPORT_REQUEST, VALID_POLYGON_REQUEST

class TestClusterRequestSerializer(TestCase):

    def test_deserialize_viewport(self):
        
        data = VALID_VIEWPORT_REQUEST

        serializer = ClusterRequestSerializer(data=data)

        is_valid = serializer.is_valid()
        if not is_valid:
            print(serializer.errors)
        self.assertEqual(serializer.errors, {})


    def test_deserialize_polygon(self):
        
        data = VALID_POLYGON_REQUEST

        serializer = ClusterRequestSerializer(data=data)

        is_valid = serializer.is_valid()
        if not is_valid:
            print(serializer.errors)
        self.assertEqual(serializer.errors, {})

