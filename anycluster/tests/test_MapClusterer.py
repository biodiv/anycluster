from django.test import TestCase, override_settings, modify_settings
from django.conf import settings
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.gdal import SpatialReference, CoordTransform
from anycluster.MapClusterer import MapClusterer
from anycluster import MapTools

from anycluster.definitions import (CLUSTER_TYPES, GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA, GEOMETRY_TYPES,
                                    CLUSTER_TYPE_KMEANS, CLUSTER_TYPE_GRID)
from anycluster.tests.common import GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION
from anycluster.tests.mixins import WithGIS, WithFilters, WithGardens

from anymap.models import Gardens, Owner

import json

TEST_ZOOM_LEVEL = 7
TEST_GRID_SIZE = 256

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

                    #filters = []

                    markers = map_clusterer.kmeans_cluster(geojson, geometry_type, zoom, filters)

                    print(len(markers))

                    #if geometry_type == GEOMETRY_TYPE_VIEWPORT:
                    #    self.assertTrue(len(markers) > 0)


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

                    expected_field_names = ['anymap_gardens.id', 'anymap_gardens.name', 'anymap_gardens.style', 'anymap_gardens.rating', 'anymap_gardens.free_entrance', 'anymap_gardens.last_renewal',
                                            'anymap_gardens.coordinates::bytea']

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
                    expected_str = 'anymap_gardens.id,anymap_gardens.name,anymap_gardens.style,anymap_gardens.rating,anymap_gardens.free_entrance,anymap_gardens.last_renewal,anymap_gardens.coordinates::bytea'

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

            garden_ = map_clusterer.get_dataset_content(garden.id)

            for field_name in map_clusterer.get_gis_field_names():

                if field_name == 'anymap_gardens.coordinates::bytea':
                    field_name = 'anymap_gardens.coordinates'

                model_field_name = field_name.replace('anymap_gardens.', '')

                self.assertEqual(getattr(garden, model_field_name), getattr(garden_, model_field_name))

    def test_panned_request(self):
        pass

    def test_zoom_level_changed(self):
        pass

    def test_clustertype_changed(self):
        pass

    def test_clear_cache(self):
        pass



class TestMapClustererContentCounts(WithFilters, WithGardens, TestCase):

    def test_get_map_content_counts(self):

        zoom = 10

        # test modulations
        filters = [
            {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            }
        ]

        modulations = {
            'free' : {

                'filters' : [
                    {
                        'column': 'free_entrance',
                        'value': True,
                        'operator': '=',
                    }
                ]
            },
            'paid' : {
                'filters' : [
                    {
                        'column': 'free_entrance',
                        'value': True,
                        'operator': '!=',
                    }
                ]
            }
        }

        simple_modulations = {
            'free' : {
                'column': 'free_entrance',
                'value': True,
                'operator': '=',
            },
            'paid' : {
                'column': 'free_entrance',
                'value': True,
                'operator': '!=',
            }
        }

        
        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

                    if clustertype == CLUSTER_TYPE_GRID and geometry_type != GEOMETRY_TYPE_VIEWPORT:
                        continue

                    if geometry_type == GEOMETRY_TYPE_VIEWPORT and geojson != GEOJSON_RECTANGLE:
                        continue

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)
                    map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

                    result = map_clusterer.get_map_content_counts(geojson, geometry_type, filters, zoom, modulations)

                    result_from_simple_modulations = result = map_clusterer.get_map_content_counts(geojson,
                        geometry_type, filters, zoom, simple_modulations)

                    expected_result = {
                        'count': 0,
                        'modulations':  {
                            'free' : {
                                'count': 0,
                            },
                            'paid' : {
                                'count': 0,
                            }
                        },
                    }
                    self.assertEqual(result, expected_result)
                    self.assertEqual(result_from_simple_modulations, expected_result)

                    if geometry_type == GEOMETRY_TYPE_VIEWPORT:

                        self.create_point('name 1', 'stone')
                        self.create_point('name 2', 'flower')

                        result = map_clusterer.get_map_content_counts(geojson, geometry_type, filters, zoom, modulations)
                        result_from_simple_modulations = result = map_clusterer.get_map_content_counts(geojson,
                            geometry_type, filters, zoom, simple_modulations)

                        expected_result = {
                            'count': 1,
                            'modulations': {
                                'free': {
                                    'count': 0
                                    },
                                'paid': {
                                    'count': 1
                                }
                            }
                        }

                        # print(result)

                        self.assertEqual(result, expected_result)
                        self.assertEqual(result_from_simple_modulations, expected_result)
                    
                    gardens = Gardens.objects.all()
                    for garden in gardens:
                        garden.delete()


                    gardens = Gardens.objects.all()

                    self.assertEqual(gardens.count(), 0)


    def test_query_map_content_count(self):

        zoom = 10
        geometry_type = GEOMETRY_TYPE_VIEWPORT
        clustertype = CLUSTER_TYPE_KMEANS

        
        filters = []
        modulation_filters = []

        cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)
        map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

        geojson = GEOJSON_RECTANGLE

        geometries_for_counting = map_clusterer.get_geometries_for_counting(geojson, geometry_type, zoom)

        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, modulation_filters)
        self.assertEqual(count, 0)

        self.create_point('name 1', 'stone')
        
        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, modulation_filters)
        self.assertEqual(count, 1)

        self.create_point('name 2', 'flower')

        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, modulation_filters)
        self.assertEqual(count, 2)


        filters = [
            {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            }
        ]

        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, modulation_filters)
        self.assertEqual(count, 1)

        filters = [
            {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            },
            {
                'column': 'style',
                'value': 'flower',
                'operator': '=',
                'logicalOperator': 'OR',
            }
        ]

        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, modulation_filters)
        self.assertEqual(count, 2)

        gardens = Gardens.objects.all()
        for garden in gardens:
            garden.delete()

        gardens = Gardens.objects.all()

        self.assertEqual(gardens.count(), 0)


    def test_query_map_content_count_with_modulations(self):

        zoom = 10
        geometry_type = GEOMETRY_TYPE_VIEWPORT
        clustertype = CLUSTER_TYPE_KMEANS

        filters = [
            {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            },
            {
                'column': 'style',
                'value': 'flower',
                'operator': '=',
                'logicalOperator': 'OR',
            }
        ]

        cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)
        map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

        geojson = GEOJSON_RECTANGLE

        geometries_for_counting = map_clusterer.get_geometries_for_counting(geojson, geometry_type, zoom)


        stone_modulation = [{
            'column': 'style',
            'value': 'stone',
            'operator': '=',
        }]


        garden_1 = self.create_point('name 1', 'stone')
        garden_2 =  self.create_point('name 2', 'flower')
        garden_3 = self.create_point('name 3', 'stone')
        garden_4 = self.create_point('name 4', 'stone')
        garden_5 = self.create_point('name 5', 'stone')
        garden_6 = self.create_point('name 6', 'stone')

        garden_1.free_entrance = True
        garden_1.save()
        garden_3.free_entrance = True
        garden_3.save()

        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, stone_modulation)
        self.assertEqual(count, 5)

        stone_free_modulation = [
            {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            },
            {
                'column': 'free_entrance',
                'value': True,
                'operator': '=',
                'logicalOperator': 'AND',
            },
        ]

        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, stone_free_modulation)
        self.assertEqual(count, 2)


    def test_query_map_content_count_left_join(self):
        zoom = 10
        geometry_type = GEOMETRY_TYPE_VIEWPORT
        clustertype = CLUSTER_TYPE_KMEANS

        filters = [
            {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            },
        ]

        modulation_filters = [
            {
                'column': 'owner__name',
                'value': 'Joe',
                'operator': '=',
            }
        ]

        cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)
        map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

        geojson = GEOJSON_RECTANGLE

        geometries_for_counting = map_clusterer.get_geometries_for_counting(geojson, geometry_type, zoom)

        joe = Owner(name='Joe')
        joe.save()


        garden_1 = self.create_point('name 1', 'stone', owner=joe)
        garden_2 =  self.create_point('name 2', 'flower', owner=joe)
        garden_3 = self.create_point('name 3', 'stone')
        garden_4 = self.create_point('name 4', 'stone')
        garden_5 = self.create_point('name 5', 'stone')
        garden_6 = self.create_point('name 6', 'stone')

        garden_1.free_entrance = True
        garden_1.save()
        garden_3.free_entrance = True
        garden_3.save()

        count = map_clusterer.query_map_content_count(geometries_for_counting, filters, modulation_filters)
        self.assertEqual(count, 1)


    def test_get_geometries_for_counting(self):
        
        zoom = 10
        
        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

                    if clustertype == CLUSTER_TYPE_GRID and geometry_type != GEOMETRY_TYPE_VIEWPORT:
                        continue

                    if geometry_type == GEOMETRY_TYPE_VIEWPORT and geojson != GEOJSON_RECTANGLE:
                        continue

                    filters = []

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)
                    map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

                    geos_geometries = map_clusterer.get_geometries_for_counting(geojson, geometry_type, zoom)

                    self.assertTrue(isinstance(geos_geometries, list))

                    for geometry in geos_geometries:
                        #print(geometry)
                        self.assertTrue('POLYGON' in geometry.wkt)


    def test_snap_viewport_to_grid(self):
        
        filters = []
        zoom = 10

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:
        
                cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

                # rectangle is 4326
                geos_geometries = map_clusterer.convert_geojson_to_geos(GEOJSON_RECTANGLE)

                grid_rectangle = map_clusterer.snap_viewport_to_grid(geos_geometries, zoom)

                self.assertEqual(str(grid_rectangle), 'SRID=3857;POLYGON ((978393.96205 5948635.289016, 1565430.33928 5948635.289016, 1565430.33928 6574807.424728, 978393.96205 6574807.424728, 978393.96205 5948635.289016))')
                self.assertEqual(grid_rectangle.srid, 3857)

                grid_rectangle.transform(4326)

                polygon_4326 = 'SRID=4326;POLYGON ((8.7890624999977 47.04018214327889, 14.06249999999632 47.04018214327889, 14.06249999999632 50.7364551355909, 8.7890624999977 50.7364551355909, 8.7890624999977 47.04018214327889))'

                self.assertEqual(polygon_4326, str(grid_rectangle))


    def test_get_grouped_map_contents(self):

        zoom = 10
        filters = []

        self.create_point('name 1', 'stone')
        self.create_point('name 2', 'flower')
        
        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

                    group_by = 'style'

                    result = map_clusterer.get_grouped_map_contents(geojson, geometry_type, zoom, filters, group_by)

                    if geometry_type == GEOMETRY_TYPE_VIEWPORT:

                        expected_result = {
                            'stone' : {
                                'count': 1
                            },
                            'flower' : {
                                'count': 1
                            }
                        }

                        self.assertEqual(result, expected_result)

                    gardens = Gardens.objects.all()
                    self.assertEqual(gardens.count(), 2)


@override_settings(ANYCLUSTER_ADDITIONAL_GROUP_BY_COLUMNS = ['rating', 'last_renewal'])
class TestMapClustererAlternativeSettings(WithFilters, WithGIS, TestCase):


    def test_get_additional_group_by_columns_string(self):

        zoom = 10
        filters = []

        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

                    columns_string = map_clusterer.get_additional_group_by_columns_string()

                    expected_string = ', MIN(rating::VARCHAR) AS rating, MIN(last_renewal::VARCHAR) AS last_renewal'
                    self.assertEqual(columns_string, expected_string)


    def test_get_grouped_map_contents_additional_columns(self):

        zoom = 10
        filters = []

        self.create_point('name 1', 'stone')
        self.create_point('name 2', 'flower')

        self.assertTrue(hasattr(settings, 'ANYCLUSTER_ADDITIONAL_GROUP_BY_COLUMNS'))
        
        for clustertype in CLUSTER_TYPES:
            for geometry_type in GEOMETRY_TYPES:

                for geojson in [GEOJSON_POLYGON, GEOJSON_RECTANGLE, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

                    cluster_cache = self.get_cluster_cache(geometry_type, zoom, clustertype, filters)

                    map_clusterer = MapClusterer(cluster_cache, grid_size=TEST_GRID_SIZE)

                    group_by = 'style'

                    result = map_clusterer.get_grouped_map_contents(geojson, geometry_type, zoom, filters, group_by)

                    if geometry_type == GEOMETRY_TYPE_VIEWPORT:

                        for aggregate, data in result.items():

                            self.assertIn('rating', data)
                            self.assertIn('last_renewal', data)
