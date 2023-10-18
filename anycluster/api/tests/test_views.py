from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework import status

from anycluster import ClusterCache
from anycluster.MapClusterer import MapClusterer
from anycluster.definitions import (CLUSTER_TYPES, GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA, GEOMETRY_TYPES,
                                    CLUSTER_TYPE_KMEANS, CLUSTER_TYPE_GRID)

from anycluster.tests.mixins import WithGIS, WithFilters, WithGardens
from anycluster.tests.common import GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION

from anycluster.api.views import (MapClusterViewBase, KmeansCluster, GridCluster, GetClusterContent, GetAreaContent,
                                    GetMapContentCount)


from anymap.models import Gardens

import json

MAP_TILESIZE = 256
GRID_SIZE = 256
ZOOM = 10

class TestMapClusterViewBase(WithFilters, APITestCase):


    def get_url_kwargs(self):

        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        return url_kwargs


    def get_request(self):

        factory = APIRequestFactory()

        url_kwargs = self.get_url_kwargs()
        url = reverse('kmeans_cluster', kwargs=url_kwargs)
        request = factory.post(url, {})

        request.session = {}

        return request


    def test_get_map_clusterer(self):
        
        request = self.get_request()

        base = MapClusterViewBase()
        kwargs = self.get_url_kwargs()

        clear_cache = False

        output_srid = 4326
        filter_lists = self.get_test_filters()

        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                for filters in filter_lists:
                    clusterer = base.get_map_clusterer(geometry_type, clustertype, filters, clear_cache, output_srid,
                        request, **kwargs)
                    self.assertTrue(isinstance(clusterer, MapClusterer))


    def test_get_cache(self):
        
        request = self.get_request()

        base = MapClusterViewBase()

        filter_lists = self.get_test_filters()

        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                for filters in filter_lists:
                    cache = base.get_cache(geometry_type, ZOOM, clustertype, request, filters)

                    self.assertTrue(isinstance(cache, ClusterCache))


    def test_set_cache(self):
        
        request = self.get_request()

        base = MapClusterViewBase()

        filter_lists = self.get_test_filters()

        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                for filters in filter_lists:

                    cluster_cache = base.get_cache(geometry_type, ZOOM, clustertype, request, filters)
                
                    base.set_cache(request, cluster_cache)

                    self.assertIn(base.cache_name, request.session)

                    for attr in ['geometry_type', 'zoom', 'clustertype', 'filters']:

                        self.assertEqual(getattr(cluster_cache, attr), request.session[base.cache_name][attr])



class TestGridCluster(WithGIS, WithFilters, APITestCase):

    def get_url_kwargs(self):

        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        return url_kwargs

    def get_post_data(self, filters=[]):

        post_data = {
            'geojson' : GEOJSON_RECTANGLE,
            'filters': filters,
            'geometry_type': GEOMETRY_TYPE_VIEWPORT,
        }

        return post_data


    def test_post(self):

        filter_lists = self.get_test_filters()

        url_kwargs = self.get_url_kwargs()
        url = reverse('grid_cluster', kwargs=url_kwargs)

        for filters in filter_lists:

            post_data = self.get_post_data(filters)

            response = self.client.post(url, post_data, format='json')

            self.assertEqual(response.status_code, status.HTTP_200_OK)



class TestKmeansCluster(WithGIS, WithFilters, APITestCase):

    def get_url_kwargs(self):

        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        return url_kwargs


    def get_url(self):

        url_kwargs = self.get_url_kwargs()
        url = reverse('kmeans_cluster', kwargs=url_kwargs)
        return url


    def get_post_data(self, geometry_type, geojson, filters=[]):

        post_data = {
            'geojson' : geojson,
            'filters': filters,
            'geometry_type': geometry_type,
        }

        return post_data


    def test_post(self):

        url = self.get_url()

        # viewport
        post_data = self.get_post_data(GEOMETRY_TYPE_VIEWPORT, GEOJSON_RECTANGLE)

        response = self.client.post(url, post_data, format='json')

        if response.status_code != status.HTTP_200_OK:
            print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        filter_lists = self.get_test_filters()
        for geojson in [GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

            for filters in filter_lists:

                post_data = self.get_post_data(GEOMETRY_TYPE_AREA, geojson, filters)

                response = self.client.post(url, post_data, format='json')

                if response.status_code != status.HTTP_200_OK:
                    print(geojson)
                    print(response.data)
                self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetKmeansClusterContent(WithGIS, WithFilters, APITestCase):

    def test_post(self):

        filter_lists = self.get_test_filters()

        for geometry_type in GEOMETRY_TYPES:

            for filters in filter_lists:
        
                url_kwargs = {
                    'zoom': ZOOM,
                    'grid_size': GRID_SIZE,
                }

                kmeans_url = reverse('kmeans_cluster', kwargs=url_kwargs)

                kmeans_post_data = {
                    'geojson' : GEOJSON_RECTANGLE,
                    'filters': filters,
                    'geometry_type': geometry_type,
                }

                factory = APIRequestFactory()
                kmeans_request = factory.post(kmeans_url, kmeans_post_data, format='json')
                kmeans_request.session = {}

                kmeans_view = KmeansCluster.as_view()

                kmeans_response = kmeans_view(kmeans_request, **url_kwargs)

                if geometry_type == GEOMETRY_TYPE_AREA:
                    self.assertEqual(len(kmeans_request.session['anycluster_cache']['geometries']), 1)

                # for left join, the data has to be changed to yield a result
                if len(kmeans_response.data) == 0:
                    is_left_join = False
                    for filter in filters:
                        if '__' in filter['column']:
                            is_left_join = True
                            break

                    if is_left_join == True:
                        print(kmeans_response.data)
                        print(filters)
                        continue

                cluster = kmeans_response.data[0]

                # raw test
                cluster_cache = ClusterCache(geometry_type, ZOOM, CLUSTER_TYPE_KMEANS, filters)
                cluster_cache.load_geometries(kmeans_request.session['anycluster_cache'])

                self.assertEqual(cluster_cache.geometries, kmeans_request.session['anycluster_cache']['geometries'])

                if geometry_type == GEOMETRY_TYPE_AREA:
                    self.assertEqual(len(cluster_cache.geometries), 1)

                    geom = cluster_cache.geometries[0]

                    self.assertEqual(type(geom), str)

                map_clusterer = MapClusterer(cluster_cache)

                ids = cluster['ids']
                x = cluster['center']['x']
                y = cluster['center']['y']

                self.assertEqual(map_clusterer.cluster_cache.geometries, kmeans_request.session['anycluster_cache']['geometries'])

                cluster_content = list(map_clusterer.get_kmeans_cluster_content(geometry_type, ids, x, y, filters, ZOOM))

                self.assertTrue(len(list(cluster_content)) > 0)
                self.assertEqual(len(list(cluster_content)), cluster['count'])

                # view test

                url = reverse('get_kmeans_cluster_content', kwargs=url_kwargs)

                post_data = {
                    'geometry_type': geometry_type,
                    'ids': ids,
                    'x': x,
                    'y': y,
                    'filters': filters,
                }

                request = factory.post(url, post_data, format='json')
                request.session = kmeans_request.session

                view = GetClusterContent.as_view()
                response = view(request, **url_kwargs)

                self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetAreaContent(WithGIS, WithFilters, APITestCase):

    def test_post(self):

        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        url = reverse('get_area_content', kwargs=url_kwargs)

        filter_lists = self.get_test_filters()
        
        for geojson in [GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

            for filters in filter_lists:

                post_data = {
                    'geometry_type': GEOMETRY_TYPE_AREA,
                    'geojson': geojson,
                    'filters': filters,
                }

                response = self.client.post(url, post_data, format='json')

                if response.status_code != status.HTTP_200_OK:
                    print(geojson)
                    print(response.data)
                    
                self.assertEqual(response.status_code, status.HTTP_200_OK)

                
                is_left_join = False
                for filter in filters:
                    if '__' in filter['column']:
                        is_left_join = True
                        break

                if is_left_join == True:
                    self.assertEqual(len(response.data), 0)
                else:
                    self.assertTrue(len(response.data) > 0)


                    post_data.update({
                        'limit': 1,
                        'offset': 0,
                    })


                    response = self.client.post(url, post_data, format='json')

                    self.assertEqual(len(response.data), 1)
                    self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetDatasetContent(WithGIS, WithFilters, APITestCase):

    def test_get(self):

        dataset = Gardens.objects.all().last()

        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
            'dataset_id': dataset.id,
        }

        url = reverse('get_dataset_content', kwargs=url_kwargs)

        response = self.client.get(url, format='json')      

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        parsed_response = json.loads(response.content)
        self.assertEqual(parsed_response['id'], dataset.id)
        self.assertEqual(parsed_response['style'], dataset.style)


class TestGetMapContentCount(WithGardens, WithFilters, APITestCase):

    def test_post(self):

        self.create_points()
        
        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        url = reverse('get_map_content_count', kwargs=url_kwargs)

        filter_lists = self.get_test_filters()
        
        for geojson in [GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

            for filters in filter_lists:

                post_data = {
                    'geometry_type': GEOMETRY_TYPE_AREA,
                    'geojson': geojson,
                    'filters': filters,
                }

                response = self.client.post(url, post_data, format='json')

                if response.status_code != status.HTTP_200_OK:
                    print(geojson)
                    print(response.data)

                # print(json.loads(response.content))
                    
                self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_post_modulated(self):
        
        modulations = {
            'stone' : {
                'filters' : [
                    {
                        'column': 'style',
                        'value': 'stone',
                        'operator': '=',
                    }
                ]
            },
            'flower' : {
                'filters' : [
                    {
                        'column': 'style',
                        'value': 'flower',
                        'operator': '=',
                    }
                ]
            }
        }

        self.create_points()
        
        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        url = reverse('get_map_content_count', kwargs=url_kwargs)

        for geojson in [GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

            filter_lists = self.get_test_filters()

            for filters in filter_lists:

                post_data = {
                    'geometry_type': GEOMETRY_TYPE_AREA,
                    'geojson': geojson,
                    'filters': filters,
                    'modulations': modulations
                }

                response = self.client.post(url, post_data, format='json')

                if response.status_code != status.HTTP_200_OK:
                    print(geojson)
                    print(response.data)

                parsed_response = json.loads(response.content)
                #print(parsed_response)
                self.assertIn('modulations', parsed_response)
                self.assertIn('stone', parsed_response['modulations'])
                self.assertIn('flower', parsed_response['modulations'])
                    
                self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetGroupedMapContents(WithGardens, WithFilters, APITestCase):

    def test_post(self):

        self.create_points()
        
        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        url = reverse('get_grouped_map_contents', kwargs=url_kwargs)

        filters = []

        stone_gardens = Gardens.objects.filter(style='stone')
        self.assertTrue(stone_gardens.count() > 0)
        
        for geojson in [GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

            post_data = {
                'geometry_type': GEOMETRY_TYPE_AREA,
                'geojson': geojson,
                'filters': filters,
                'group_by': 'style'
            }

            response = self.client.post(url, post_data, format='json')

            if response.status_code != status.HTTP_200_OK:
                print(geojson)
                print(response.data)

            parsed_response = json.loads(response.content)
            styles = Gardens.objects.all().values_list('style', flat=True)

            for style in styles:
                self.assertIn(style, parsed_response)
                
            self.assertEqual(response.status_code, status.HTTP_200_OK)