from django.test import TestCase
from django.contrib.gis.geos import GEOSGeometry

from anycluster import ClusterCache

from anycluster.definitions import (GEOMETRY_TYPES, CLUSTER_TYPES, GEOMETRY_TYPE_AREA, GEOMETRY_TYPE_VIEWPORT,
                                    CLUSTER_TYPE_KMEANS, CLUSTER_TYPE_GRID)

from anycluster.tests.common import GEOJSON_RECTANGLE, GEOJSON_POLYGON
from anycluster.tests.mixins import WithFilters

import json

TEST_ZOOM = 10

class TestClusterCache(WithFilters, TestCase):

    def get_geos_geometry_geojson(self, geometry):

        geos = GEOSGeometry(json.dumps(geometry['geometry']))

        geos_geojson = geos.geojson

        self.assertTrue(isinstance(geos_geojson, str))

        return geos_geojson

 
    def test__init__(self):
        
        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:
                for filters in self.get_test_filters():
                    cluster_cache = ClusterCache(geometry_type, TEST_ZOOM, clustertype, filters=filters)

                    self.assertEqual(cluster_cache.geometry_type, geometry_type)
                    self.assertEqual(cluster_cache.clustertype, clustertype)
                    self.assertEqual(cluster_cache.zoom, TEST_ZOOM)
                    self.assertEqual(cluster_cache.filters, filters)
                    self.assertEqual(cluster_cache.geometries, [])

    def test_add_geometry(self):
        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                filter_lists = self.get_test_filters()

                for filters in filter_lists:

                    cluster_cache = ClusterCache(geometry_type, TEST_ZOOM, clustertype, filters)

                    for geometry in [GEOJSON_RECTANGLE, GEOJSON_POLYGON]:

                        geos_geojson = self.get_geos_geometry_geojson(geometry)
                        cluster_cache.add_geometry(geos_geojson)

                        self.assertIn(geos_geojson, cluster_cache.geometries)

                        with self.assertRaises(ValueError):
                            cluster_cache.add_geometry(geometry)

    def test_add_redundant_geometry(self):
        
        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                filter_lists = self.get_test_filters()

                for filters in filter_lists:
                    cluster_cache = ClusterCache(geometry_type, TEST_ZOOM, clustertype, filters)

                    geometry = GEOJSON_RECTANGLE

                    geos_geojson = self.get_geos_geometry_geojson(geometry)
                    cluster_cache.add_geometry(geos_geojson)

                    self.assertEqual(cluster_cache.geometries[0], geos_geojson)
                    self.assertEqual(len(cluster_cache.geometries), 1)

                    cluster_cache.add_geometry(geos_geojson)
                    cluster_cache.add_geometry(geos_geojson)

                    self.assertEqual(cluster_cache.geometries[0], geos_geojson)
                    self.assertEqual(len(cluster_cache.geometries), 1)


    def test_load_geometries(self):
        
        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                filter_lists = self.get_test_filters()

                for filters in filter_lists:

                    cluster_cache = ClusterCache(geometry_type, TEST_ZOOM, clustertype, filters=filters)

                    for geometry in [GEOJSON_RECTANGLE, GEOJSON_POLYGON]:

                        geos_geojson = self.get_geos_geometry_geojson(geometry)
                        cluster_cache.add_geometry(geos_geojson)

                        serialized = cluster_cache.serialize()

                        # test with same zoom, geometry type, clustertype
                        cluster_cache_2 = ClusterCache(geometry_type, TEST_ZOOM, clustertype, filters=filters)
                        cluster_cache_2.load_geometries(serialized)

                        self.assertEqual(cluster_cache_2.geometries, cluster_cache.geometries)

                        if geometry_type == GEOMETRY_TYPE_AREA:
                            other_geometry_type = GEOMETRY_TYPE_VIEWPORT
                        else:
                            other_geometry_type = GEOMETRY_TYPE_AREA

                        gt_cluster_cache = ClusterCache(other_geometry_type, TEST_ZOOM, clustertype, filters=filters)

                        gt_cluster_cache.load_geometries(serialized)
                        self.assertEqual(gt_cluster_cache.geometries, [])

                        zoom = 11

                        zoom_cluster_cache = ClusterCache(geometry_type, zoom, clustertype, filters=filters)
                        zoom_cluster_cache.load_geometries(serialized)
                        self.assertEqual(zoom_cluster_cache.geometries, [])


                        if clustertype == CLUSTER_TYPE_GRID:
                            other_clustertype = CLUSTER_TYPE_KMEANS
                        else:
                            other_clustertype = CLUSTER_TYPE_GRID

                        ct_cluster_cache = ClusterCache(geometry_type, TEST_ZOOM, other_clustertype, filters=filters)

                        ct_cluster_cache.load_geometries(serialized)
                        self.assertEqual(ct_cluster_cache.geometries, [])

                        # change filters
                        if filter_lists[0] == filters:
                            other_filters = filter_lists[1]
                        else:
                            other_filters = filter_lists[0]

                        filters_cluster_cache = ClusterCache(geometry_type, TEST_ZOOM, clustertype, filters=other_filters)
                        filters_cluster_cache.load_geometries(serialized)
                        self.assertEqual(filters_cluster_cache.geometries, [])


    def test_serialize(self):
        
        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                filter_lists = self.get_test_filters()

                for filters in filter_lists:
                    cluster_cache = ClusterCache(geometry_type, TEST_ZOOM, clustertype, filters)

                    for geometry in [GEOJSON_RECTANGLE, GEOJSON_POLYGON]:

                        geos_geojson = self.get_geos_geometry_geojson(geometry)
                        cluster_cache.add_geometry(geos_geojson)

                        serialized = cluster_cache.serialize()

                        self.assertEqual(serialized['geometry_type'], cluster_cache.geometry_type)
                        self.assertEqual(serialized['clustertype'], cluster_cache.clustertype)
                        self.assertEqual(serialized['zoom'], cluster_cache.zoom)
                        self.assertEqual(serialized['filters'], cluster_cache.filters)
                        self.assertEqual(serialized['geometries'], cluster_cache.geometries)