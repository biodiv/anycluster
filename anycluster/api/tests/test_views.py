from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework import status

from anycluster import ClusterCache, Filters
from anycluster.MapClusterer import MapClusterer
from anycluster.definitions import (CLUSTER_TYPES, GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA, GEOMETRY_TYPES,
                                    CLUSTER_TYPE_KMEANS, CLUSTER_TYPE_GRID)

from anycluster.tests.mixins import WithGIS
from anycluster.tests.common import GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION

from anycluster.api.views import MapClusterViewBase, KmeansCluster, GridCluster, GetClusterContent, GetAreaContent 

MAP_TILESIZE = 256
GRID_SIZE = 256
ZOOM = 10


class TestMapClusterViewBase(APITestCase):


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

        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:
                clusterer = base.get_map_clusterer(geometry_type, clustertype, clear_cache, request, **kwargs)

                self.assertTrue(isinstance(clusterer, MapClusterer))


    def test_get_cache(self):
        
        request = self.get_request()

        base = MapClusterViewBase()

        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:
                cache = base.get_cache(geometry_type, ZOOM, clustertype, request)

                self.assertTrue(isinstance(cache, ClusterCache))


    def test_set_cache(self):
        
        request = self.get_request()

        base = MapClusterViewBase()

        for geometry_type in GEOMETRY_TYPES:
            for clustertype in CLUSTER_TYPES:

                cluster_cache = base.get_cache(geometry_type, ZOOM, clustertype, request)
                
                base.set_cache(request, cluster_cache)

                self.assertIn(base.cache_name, request.session)

                for attr in ['geometry_type', 'zoom', 'clustertype']:

                    self.assertEqual(getattr(cluster_cache, attr), request.session[base.cache_name][attr])



class TestGridCluster(WithGIS, APITestCase):

    def get_url_kwargs(self):

        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        return url_kwargs

    def get_post_data(self):

        post_data = {
            'geojson' : GEOJSON_RECTANGLE,
            'filters': [],
            'geometry_type': GEOMETRY_TYPE_VIEWPORT,
        }

        return post_data


    def test_post(self):
        
        url_kwargs = self.get_url_kwargs()
        url = reverse('grid_cluster', kwargs=url_kwargs)

        post_data = self.get_post_data()

        response = self.client.post(url, post_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestKmeansCluster(WithGIS, APITestCase):

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


    def get_post_data(self, geometry_type, geojson):

        post_data = {
            'geojson' : geojson,
            'filters': [],
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
        

        for geojson in [GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

            post_data = self.get_post_data(GEOMETRY_TYPE_AREA, geojson)

            response = self.client.post(url, post_data, format='json')

            if response.status_code != status.HTTP_200_OK:
                print(geojson)
                print(response.data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetKmeansClusterContent(WithGIS, APITestCase):

    def test_post(self):

        for geometry_type in GEOMETRY_TYPES:
        
            url_kwargs = {
                'zoom': ZOOM,
                'grid_size': GRID_SIZE,
            }

            kmeans_url = reverse('kmeans_cluster', kwargs=url_kwargs)

            kmeans_post_data = {
                'geojson' : GEOJSON_RECTANGLE,
                'filters': [],
                'geometry_type': geometry_type,
            }

            factory = APIRequestFactory()
            kmeans_request = factory.post(kmeans_url, kmeans_post_data, format='json')
            kmeans_request.session = {}

            kmeans_view = KmeansCluster.as_view()

            kmeans_response = kmeans_view(kmeans_request, **url_kwargs)

            if geometry_type == GEOMETRY_TYPE_AREA:
                self.assertEqual(len(kmeans_request.session['anycluster_cache']['geometries']), 1)

            cluster = kmeans_response.data[0]

            # raw test
            cluster_cache = ClusterCache(geometry_type, ZOOM, CLUSTER_TYPE_KMEANS)
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

            filters = Filters([])

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
                'filters': [],
            }

            request = factory.post(url, post_data, format='json')
            request.session = kmeans_request.session

            view = GetClusterContent.as_view()
            response = view(request, **url_kwargs)

            self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetAreaContent(WithGIS, APITestCase):

    def test_post(self):

        url_kwargs = {
            'zoom': ZOOM,
            'grid_size': GRID_SIZE,
        }

        url = reverse('get_area_content', kwargs=url_kwargs)

        
        for geojson in [GEOJSON_RECTANGLE, GEOJSON_POLYGON, GEOJSON_MULTIPOLYGON, GEOJSON_FEATURECOLLECTION]:

            post_data = {
                'geometry_type': GEOMETRY_TYPE_AREA,
                'geojson': geojson,
                'filters': [],
            }

            response = self.client.post(url, post_data, format='json')

            if response.status_code != status.HTTP_200_OK:
                print(geojson)
                print(response.data)
                
            self.assertEqual(response.status_code, status.HTTP_200_OK)