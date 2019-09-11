from django.http import HttpResponse
from django.views.generic import TemplateView
from django.shortcuts import render
from django.core import serializers
from django.conf import settings
from django.apps import apps

from anycluster.MapClusterer import MapClusterer

import json


class ClusterView(TemplateView):

    def get_clusterer(self, request, zoom, grid_size, **kwargs):
        clusterer = MapClusterer(request, zoom, grid_size)
        return clusterer

    def dispatch(self, request, *args, **kwargs):
        zoom = kwargs['zoom']
        grid_size = kwargs['grid_size']
        self.clusterer = self.get_clusterer(request, zoom, grid_size)
        return super().dispatch(request, *args, **kwargs)


class GridCluster(ClusterView):

    def post(self, request, *args, **kwargs):

        grid = self.clusterer.gridCluster()        

        return HttpResponse(json.dumps(
            grid
            ), content_type="application/json")


class KmeansCluster(ClusterView):

    def post(self, request, *args, **kwargs):

        markers = self.clusterer.kmeansCluster()
        
        return HttpResponse(json.dumps(
            markers
            ), content_type="application/json")



'''
    Cluster/ AreaContent Retrieval
    - json or html
'''
class EntriesJsonMixin:
    def entries_as_json(self, entries):

        serializer_fields = self.clusterer.get_gis_field_names()

        data = serializers.serialize('json', entries, fields=serializer_fields)

        return data
    

class GetClusterContent(EntriesJsonMixin, ClusterView):

    template_name = 'anycluster/clusterPopup.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        entries = self.clusterer.getClusterContent()
        context['entries'] = entries

        return context

    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)

        return_format = request.GET.get('format', 'html')

        if return_format == 'json':
            entries_json = self.entries_as_json(context['entries'])
            return HttpResponse(json.dumps(entries_json), content_type="application/json")
        
        return self.render_to_response(context)



class GetAreaContent(EntriesJsonMixin, ClusterView):

    template_name = 'anycluster/clusterPopup.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        entries = self.clusterer.getAreaContent()
        context['entries'] = entries

        return context

    def post(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)

        return_format = request.GET.get('format', 'html')

        if return_format == 'json':
            entries_json = self.entries_as_json(context['entries'])
            return HttpResponse(json.dumps(entries_json), content_type="application/json")
        
        return self.render_to_response(context)

