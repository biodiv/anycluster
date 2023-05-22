from django.conf import settings
from rest_framework import serializers

import jsonschema

from .json_schemas import FEATURE_OR_FEATURECOLLECTION_SCHEMA

from anycluster.definitions import GEOMETRY_TYPES, GEOMETRY_TYPE_VIEWPORT


def filters_are_allowed(filters):

    for filter in filters:

        is_nested = 'filters' in filter

        if is_nested == False:
            column = filter.get('column', None)
            if not column:
                raise serializers.ValidationError('Filter require a column')
        
            if column not in settings.ANYCLUSTER_FILTERS:
                raise serializers.ValidationError('It is not allowed to filter Column {0}'.format(column))
        
        else:
            filters_are_allowed(filter['filters'])

# needs to supprt FeatureCollection and Multipolygon
class ClusterRequestSerializer(serializers.Serializer):

    output_srid = serializers.CharField(default='EPSG:4326', required=False, write_only=True)

    geometry_type = serializers.ChoiceField(choices=GEOMETRY_TYPES, write_only=True)

    geojson = serializers.JSONField(write_only=True)
    filters = serializers.ListField(required=False, default=[], write_only=True)

    clear_cache = serializers.BooleanField(default=False, required=False, write_only=True)

    # viewport can be one or two polygons
    def validate(self, data):
        if data['geometry_type'] == GEOMETRY_TYPE_VIEWPORT:

            geojson = data['geojson']
            coordinates = geojson['geometry']['coordinates'][0]
            if not len(coordinates) == 5:
                raise serializers.ValidationError('Viewport must consist of 5 points')

        return data


    def validate_geojson(self, value):
        try:
            is_valid = jsonschema.validate(value, FEATURE_OR_FEATURECOLLECTION_SCHEMA)
        except jsonschema.exceptions.ValidationError as e:
            raise serializers.ValidationError(e.message)
        return value

    def validate_filters(self, value):
        filters_are_allowed(value)
        return value


class ClusterContentRequestSerializer(serializers.Serializer):

    output_srid = serializers.CharField(default='EPSG:4326', required=False, write_only=True)
    input_srid = serializers.CharField(default='EPSG:4326', required=False, write_only=True)

    geometry_type = serializers.ChoiceField(choices=GEOMETRY_TYPES, write_only=True)

    ids = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    x = serializers.FloatField(write_only=True)
    y = serializers.FloatField(write_only=True)
    filters = serializers.ListField(required=False, default=[], write_only=True)

    def validate_filters(self, value):
        filters_are_allowed(value)
        return value