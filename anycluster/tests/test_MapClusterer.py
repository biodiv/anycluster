from django.test import TestCase

from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.gdal import SpatialReference, CoordTransform
from anycluster.MapClusterer import MapClusterer
from anycluster import MapTools

from anycluster.definitions import (CLUSTER_TYPES, GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA, GEOMETRY_TYPES,
                                    CLUSTER_TYPE_KMEANS, CLUSTER_TYPE_GRID)
from anycluster.tests.common import GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION
from anycluster.tests.mixins import WithGIS, WithFilters

from anymap.models import Gardens

import json

TEST_ZOOM_LEVEL = 7

class TestMapClusterer(WithFilters, WithGIS, TestCase):


    def test_init(self):

        for clustertype in CLUSTER_TYPES:

            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    zoom = TEST_ZOOM_LEVEL
                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    self.assertEqual(map_clusterer.cluster_cache, cluster_cache)
                    self.assertEqual(map_clusterer.schema_name, 'public')
                    self.assertEqual(map_clusterer.db_srid, 3857)
                    self.assertEqual(map_clusterer.grid_size, 256)
                    self.assertEqual(map_clusterer.maptools.__class__, MapTools)
                    self.assertTrue(isinstance(map_clusterer.valid_operators, list))


    def test_get_database_srid(self):

        for clustertype in CLUSTER_TYPES:

            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    zoom = 1
                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    db_srid = map_clusterer.get_database_srid()
                    self.assertEqual(db_srid, 3857)


    def test_convert_geojson_feature_to_geos_polygon(self):

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    zoom = TEST_ZOOM_LEVEL
                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE]:

                        geos_geometries = map_clusterer.convert_geojson_feature_to_geos(
                            geojson)

                        self.assertEqual(len(geos_geometries), 1)

                        for geos_geometry in geos_geometries:
                            self.assertTrue(isinstance(geos_geometry, GEOSGeometry))
                            self.assertEqual(geos_geometry.srid, 3857)

                    mp_geos_geometries = map_clusterer.convert_geojson_feature_to_geos(
                        GEOJSON_MULTIPOLYGON)

                    self.assertEqual(len(mp_geos_geometries), 2)

                    for geos_geometry in mp_geos_geometries:
                        self.assertTrue(isinstance(geos_geometry, GEOSGeometry))
                        self.assertEqual(geos_geometry.srid, 3857)


    def test_convert_geojson_to_geos_feature(self):

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    zoom = TEST_ZOOM_LEVEL
                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON]:

                        geos_geometries = map_clusterer.convert_geojson_to_geos(
                            geojson)

                        for geos_geometry in geos_geometries:
                            self.assertTrue(isinstance(geos_geometry, GEOSGeometry))


    def test_convert_geojson_to_geos_featurecollection(self):

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    zoom = TEST_ZOOM_LEVEL
                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)
                    geos_geometries = map_clusterer.convert_geojson_to_geos(
                        GEOJSON_FEATURECOLLECTION)

                    for geos_geometry in geos_geometries:
                        self.assertTrue(isinstance(geos_geometry, GEOSGeometry))


    def test_get_cluster_geometries_viewport(self):

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:


                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    zoom = TEST_ZOOM_LEVEL
                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON]:

                        cluster_geometries = map_clusterer.get_cluster_geometries(
                            geojson, geometry_type, zoom)

                        for geos_geometry in cluster_geometries:
                            self.assertTrue(isinstance(geos_geometry, GEOSGeometry))


    def test_get_cluster_geometries_area(self):

        for clustertype in CLUSTER_TYPES:


            filter_lists = self.get_test_filters()
            for filters in filter_lists:

                zoom = TEST_ZOOM_LEVEL
                cluster_cache = self.get_cluster_cache(GEOMETRY_TYPE_AREA, zoom, clustertype, filters)

                map_clusterer = MapClusterer(cluster_cache)

                geojson = GEOJSON_RECTANGLE

                cluster_geometries = map_clusterer.get_cluster_geometries(
                    geojson, GEOMETRY_TYPE_AREA, zoom)

                matching_geojson = GEOJSON_RECTANGLE['geometry'].copy()
                initial_geos = GEOSGeometry(
                    json.dumps(matching_geojson), srid=4326)
                ct = CoordTransform(SpatialReference(
                    initial_geos.srid), SpatialReference(3857))
                initial_geos.transform(ct)

                self.assertEqual(initial_geos.geojson,
                                cluster_geometries[0].geojson)

                for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON]:

                    cluster_geometries = map_clusterer.get_cluster_geometries(
                        geojson, GEOMETRY_TYPE_AREA, zoom)

                    for geos_geometry in cluster_geometries:
                        self.assertTrue(isinstance(geos_geometry, GEOSGeometry))


    def test_kmeans_cluster(self):

        zoom = TEST_ZOOM_LEVEL

        for geometry_type in GEOMETRY_TYPES:
            for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON]:


                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, CLUSTER_TYPE_KMEANS, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    filters = []

                    markers = map_clusterer.kmeans_cluster(geojson, geometry_type, zoom, filters)

                    if geometry_type == GEOMETRY_TYPE_VIEWPORT:
                        self.assertTrue(len(markers) > 0)


    def test_get_srid_from_geojson_feature(self):
        
        zoom = TEST_ZOOM_LEVEL

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE]:

                        srid = map_clusterer.get_srid_from_geojson_feature(geojson)

                        self.assertEqual(srid, 4326)


    def test_grid_cluster(self):

        filter_lists = self.get_test_filters()
        for filters in filter_lists:
        
            zoom = TEST_ZOOM_LEVEL
            cluster_cache = self.get_cluster_cache(GEOMETRY_TYPE_VIEWPORT, zoom, CLUSTER_TYPE_GRID, filters)

            map_clusterer = MapClusterer(cluster_cache)

            filters = []

            geojson = GEOJSON_RECTANGLE

            cells = map_clusterer.grid_cluster(geojson, zoom, filters)

            self.assertTrue(len(cells) > 0)


    def test_get_gis_field_names(self):
        
        zoom = TEST_ZOOM_LEVEL

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    field_names = map_clusterer.get_gis_field_names()

                    expected_field_names = ['id', 'name', 'style', 'rating', 'free_entrance', 'last_renewal',
                                            'coordinates::bytea']

                    self.assertEqual(field_names, expected_field_names)


    def test_get_gis_field_str(self):
        
        zoom = TEST_ZOOM_LEVEL

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:


                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    fields_str = map_clusterer.get_gis_fields_str()
                    expected_str = 'id,name,style,rating,free_entrance,last_renewal,coordinates::bytea'

                    self.assertEqual(fields_str, expected_str)


    def test_get_kmeans_cluster_content(self):
        
        zoom = 1

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:


                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    geojson = GEOJSON_RECTANGLE

                    filters = []

                    markers = map_clusterer.kmeans_cluster(geojson, geometry_type, zoom, filters)

                    if geometry_type == GEOMETRY_TYPE_AREA:
                        self.assertEqual(len(map_clusterer.cluster_cache.geometries), 1)

                    self.assertTrue(len(markers) > 0)

                    marker = markers[0]

                    ids = marker['ids']
                    x = marker['center']['x']
                    y = marker['center']['y']

                    cluster_content = map_clusterer.get_kmeans_cluster_content(geometry_type, ids, x, y, filters, zoom)

                    self.assertTrue(marker['count'] > 0)
                    self.assertEqual(len(list(cluster_content)), marker['count'])
            

    def test_get_area_content(self):
        
        zoom = 1

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:


                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    geojson = GEOJSON_RECTANGLE
                    filters = []

                    area_content = map_clusterer.get_area_content(geojson, filters)

                    self.assertEqual(len(list(area_content)), 100)


    def test_get_geom_filterstring(self):
        
        zoom = 1

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:


                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    geojson = GEOJSON_RECTANGLE

                    geom_filterstring = map_clusterer.get_geom_filterstring(geojson)

                    expected_string = "( ST_Intersects(coordinates, ST_GeometryFromText('POLYGON ((990852.5481939941 6539650.689072899, 990852.5481939941 5980227.102028428, 1559876.2279959028 5980227.102028428, 1559876.2279959028 6539650.689072899, 990852.5481939941 6539650.689072899))', 3857) ) )"

                    self.assertEqual(geom_filterstring, expected_string)


    def test_calculate_k(self):
        
        zoom = 10

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    geojson = GEOJSON_POLYGON

                    geos_geometries = map_clusterer.get_cluster_geometries(geojson, 'area', zoom)

                    self.assertEqual(len(geos_geometries), 1)

                    geos = geos_geometries[0]

                    k = map_clusterer.calculate_k(geos, zoom)

                    self.assertEqual(k, 30)


    def test_same_request_twice(self):

        zoom = TEST_ZOOM_LEVEL
        
        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:


                filter_lists = self.get_test_filters()
                for filters in filter_lists:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache)

                    geojson = GEOJSON_RECTANGLE

                    cluster_geometries = map_clusterer.get_cluster_geometries(
                        geojson, geometry_type, zoom)

                    self.assertTrue(len(cluster_geometries) > 0)
                    self.assertEqual(map_clusterer.cluster_cache.zoom, zoom)
                    self.assertEqual(map_clusterer.cluster_cache.clustertype, clustertype)
                    self.assertEqual(map_clusterer.cluster_cache.geometry_type, geometry_type)
                    self.assertEqual(map_clusterer.cluster_cache.filters, filters)

                    cache_cluster_geometries = map_clusterer.get_cluster_geometries(
                        geojson, geometry_type, zoom)

                    self.assertEqual(len(cache_cluster_geometries), 0)


    def test_get_dataset_content(self):
        
        garden = Gardens.objects.all().first()

        filter_lists = self.get_test_filters()
        for filters in filter_lists:

            cluster_cache = self.get_cluster_cache(GEOMETRY_TYPE_VIEWPORT, TEST_ZOOM_LEVEL, CLUSTER_TYPE_GRID, filters)
            map_clusterer = MapClusterer(cluster_cache)

            garden_ = map_clusterer.get_dataset_content(garden.id)[0]

            for field_name in map_clusterer.get_gis_field_names():

                if field_name == 'coordinates::bytea':
                    field_name = 'coordinates'

                self.assertEqual(getattr(garden, field_name), getattr(garden_, field_name))


    def test_panned_request(self):
        pass

    def test_zoom_level_changed(self):
        pass

    def test_clustertype_changed(self):
        pass

    def test_clear_cache(self):
        pass