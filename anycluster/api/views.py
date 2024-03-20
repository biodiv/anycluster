from django.conf import settings
from django.core import serializers

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status

from anycluster.MapClusterer import MapClusterer, Gis
from anycluster.definitions import GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA, CLUSTER_TYPE_GRID, CLUSTER_TYPE_KMEANS

from .serializers import (ClusterRequestSerializer, ClusterContentRequestSerializer, MapContentCountSerializer,
                            GroupedMapContentSerializer, AreaContentRequestSerializer)

from anycluster import ClusterCache
from anycluster.utils import import_module

gis_serializer_path = getattr(settings, 'ANYCLUSTER_GIS_MODEL_SERIALIZER', 'anycluster.api.serializers.GisModelSerializer')
GisModelSerializer = import_module(gis_serializer_path)

import json

class APIHome(APIView):

    def get(self, request, *args, **kwargs):
        return Response({'success':True})


class MapClusterViewBase:

    cache_name = 'anycluster_cache'

    def parse_srid(self, srid_str):
        output_srid = int(srid_str.split(':')[-1])
        return output_srid


    def get_schema_name(self, request):
        return 'public'


    def get_map_clusterer(self, geometry_type, clustertype, filters, clear_cache, output_srid, request, **kwargs):

        grid_size = kwargs['grid_size']
        zoom = kwargs['zoom']

        if clear_cache == True:
            cluster_cache = ClusterCache(geometry_type, zoom, clustertype, filters)
        else:
            cluster_cache = self.get_cache(geometry_type, zoom, clustertype, request, filters)

        schema_name = self.get_schema_name(request)
        clusterer = MapClusterer(cluster_cache, grid_size=grid_size, output_srid=output_srid, schema_name=schema_name)
        return clusterer


    def get_cache(self, geometry_type, zoom, clustertype, request, filters):
        cached = request.session.get(self.cache_name, {})
        cluster_cache = ClusterCache(geometry_type, zoom, clustertype, filters)
        # ClusterCache decides if the cache is still valid for the given parameters and loads the cache if so
        cluster_cache.load_geometries(cached)
        return cluster_cache


    def set_cache(self, request, cluster_cache):
        cluster_cache_json = cluster_cache.serialize()
        request.session[self.cache_name] = cluster_cache_json


    def serialize_gis_model_list(self, map_clusterer, instances_list, order_by=None):

        instances_pks = [i.pk for i in instances_list]

        gis_queryset = Gis.objects.filter(pk__in=instances_pks)

        if order_by:
            gis_queryset = gis_queryset.order_by(order_by)

        serializer_context = { 'request': self.request }

        serializer = GisModelSerializer(gis_queryset, context=serializer_context, many=True)
        data = serializer.data

        return data


'''
    GridCluster only supports GEOMETRY_TYPE_VIEWPORT
'''
class GridCluster(MapClusterViewBase, APIView):

    authentication_classes = []
    permission_classes = []
    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):

        serializer = ClusterRequestSerializer(data=request.data)

        if serializer.is_valid():

            clear_cache = serializer.validated_data['clear_cache']
            output_srid = self.parse_srid(serializer.validated_data['output_srid'])

            filters = serializer.validated_data['filters']
            
            map_clusterer = self.get_map_clusterer(GEOMETRY_TYPE_VIEWPORT, CLUSTER_TYPE_GRID, filters, clear_cache,
                output_srid, request, **kwargs)
            
            geojson = serializer.validated_data['geojson']
            zoom = kwargs['zoom']

            grid = map_clusterer.grid_cluster(geojson, zoom, filters)
            
            self.set_cache(request, map_clusterer.cluster_cache)
            return Response(grid, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class KmeansCluster(MapClusterViewBase, APIView):

    def post(self, request, *args, **kwargs):

        serializer = ClusterRequestSerializer(data=request.data)

        if serializer.is_valid():

            geometry_type = serializer.validated_data['geometry_type']
            clear_cache = serializer.validated_data['clear_cache']
            output_srid = self.parse_srid(serializer.validated_data['output_srid'])

            filters = serializer.validated_data['filters']

            map_clusterer = self.get_map_clusterer(geometry_type, CLUSTER_TYPE_KMEANS, filters, clear_cache, output_srid,
                request, **kwargs)

            geojson = serializer.validated_data['geojson']
            zoom = kwargs['zoom']

            markers = map_clusterer.kmeans_cluster(geojson, geometry_type, zoom, filters)
            self.set_cache(request, map_clusterer.cluster_cache)
            return Response(markers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
    Get contents of a kmeans cluster
'''
class GetClusterContent(MapClusterViewBase, APIView):

    def post(self, request, *args, **kwargs):

        serializer = ClusterContentRequestSerializer(data=request.data)

        if serializer.is_valid():

            geometry_type = serializer.validated_data['geometry_type']
            output_srid = self.parse_srid(serializer.validated_data['output_srid'])
            input_srid = self.parse_srid(serializer.validated_data['input_srid'])

            filters = serializer.validated_data['filters']

            map_clusterer = self.get_map_clusterer(geometry_type, CLUSTER_TYPE_KMEANS, filters, False, output_srid,
                request, **kwargs)

            ids = serializer.validated_data['ids']
            x = serializer.validated_data['x']
            y = serializer.validated_data['y']

            zoom = kwargs['zoom']

            cluster_content = map_clusterer.get_kmeans_cluster_content(geometry_type, ids, x, y, filters, zoom,
                input_srid=input_srid)

            data = self.serialize_gis_model_list(map_clusterer, cluster_content)

            return Response(data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



'''
    Get contents of an area or grid cluster
'''
class GetAreaContent(MapClusterViewBase, APIView):

    def post(self, request, *args, **kwargs):

        serializer = AreaContentRequestSerializer(data=request.data)

        if serializer.is_valid():

            geometry_type = serializer.validated_data['geometry_type']
            output_srid = self.parse_srid(serializer.validated_data['output_srid'])

            limit = serializer.validated_data.get('limit', None)
            offset = serializer.validated_data.get('offset', None)
            order_by = serializer.validated_data.get('order_by', 'id')

            filters = serializer.validated_data['filters']

            map_clusterer = self.get_map_clusterer(geometry_type, CLUSTER_TYPE_KMEANS, filters, False, output_srid,
                request, **kwargs)

            geojson = serializer.validated_data['geojson']

            area_content = map_clusterer.get_area_content(geojson, filters, limit, offset, order_by)

            data = self.serialize_gis_model_list(map_clusterer, area_content, order_by=order_by)

            return Response(data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class GetDatasetContent(MapClusterViewBase, APIView):

    def get(self, request, *args, **kwargs):

        output_srid = request.GET.get('output_srid', 4326)

        filters = []

        map_clusterer = self.get_map_clusterer(GEOMETRY_TYPE_VIEWPORT, CLUSTER_TYPE_GRID, filters, False, output_srid,
            request, **kwargs)

        dataset_id = kwargs['dataset_id']

        dataset = map_clusterer.get_dataset_content(dataset_id)

        serializer_context = { 'request': request }

        serializer = GisModelSerializer(dataset, context=serializer_context)
        data = serializer.data

        return Response(data)


class GetMapContentCount(MapClusterViewBase, APIView):

    def post(self, request, *args, **kwargs):

        serializer = MapContentCountSerializer(data=request.data)

        if serializer.is_valid():

            clear_cache = True
            filters = serializer.validated_data['filters']
            geometry_type = serializer.validated_data['geometry_type']
            output_srid = self.parse_srid(serializer.validated_data['output_srid'])

            geojson = serializer.validated_data['geojson']
            zoom = kwargs['zoom']
            modulations = serializer.validated_data['modulations']

            map_clusterer = self.get_map_clusterer(geometry_type, CLUSTER_TYPE_KMEANS, filters, clear_cache, output_srid,
                request, **kwargs)

            map_content_counts = map_clusterer.get_map_content_counts(geojson, geometry_type, filters, zoom, modulations)

            return Response(map_content_counts, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetGroupedMapContents(MapClusterViewBase, APIView):

    # hook
    def prepare_groups(self, groups):
        return groups
    
    def post(self, request, *args, **kwargs):
        
        serializer = GroupedMapContentSerializer(data=request.data)

        if serializer.is_valid():

            clear_cache = True
            filters = serializer.validated_data['filters']
            geometry_type = serializer.validated_data['geometry_type']
            output_srid = self.parse_srid(serializer.validated_data['output_srid'])

            geojson = serializer.validated_data['geojson']
            zoom = kwargs['zoom']

            group_by = serializer.validated_data['group_by']

            map_clusterer = self.get_map_clusterer(geometry_type, CLUSTER_TYPE_KMEANS, filters, clear_cache, output_srid,
                request, **kwargs)

            groups = map_clusterer.get_grouped_map_contents(geojson, geometry_type, zoom, filters, group_by)

            prepared_groups = self.prepare_groups(groups)

            return Response(prepared_groups, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
