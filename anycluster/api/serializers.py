from django.conf import settings
from rest_framework import serializers

import jsonschema

from .json_schemas import FEATURE_OR_FEATURECOLLECTION_SCHEMA

from anycluster.definitions import GEOMETRY_TYPES, GEOMETRY_TYPE_VIEWPORT
from anycluster.MapClusterer import Gis

from anycluster.FilterComposer import OPERATOR_MAPPING, LIST_OPERATOR_MAPPING

VALID_OPERATORS = list(OPERATOR_MAPPING.keys())
VALID_LIST_OPERATORS = list(LIST_OPERATOR_MAPPING.keys())

def filters_are_allowed(filters):

    for filter in filters:

        is_nested = 'filters' in filter

        if is_nested == False:
            column = filter.get('column', None)

            operator = filter.get('operator', None)

            value = filter.get('value', None)

            if not column:
                raise serializers.ValidationError('Filters require a column')
        
            if column not in settings.ANYCLUSTER_FILTERS:
                raise serializers.ValidationError('It is not allowed to filter Column {0}'.format(column))

            if value == None:
                raise serializers.ValidationError('Filters require a value')

            if not operator:
                raise serializers.ValidationError('Filters require an operator')
            
            if isinstance(value, list):
                if operator not in VALID_LIST_OPERATORS:
                    message = 'Invalid operator: {0}. Allowed list operators are: {1}'.format(operator,
                        ','.join(VALID_LIST_OPERATORS))
                    raise serializers.ValidationError(message)
            
            else:
                if operator not in VALID_OPERATORS:
                    message = 'Invalid operator: {0}. Allowed operators are: {1}'.format(operator,
                        ','.join(VALID_OPERATORS))
                    raise serializers.ValidationError(message)

            
        else:
            filters_are_allowed(filter['filters'])

# needs to supprt FeatureCollection and Multipolygon
class ClusterRequestSerializer(serializers.Serializer):

    output_srid = serializers.CharField(default='EPSG:4326', required=False, write_only=True)

    geometry_type = serializers.ChoiceField(choices=GEOMETRY_TYPES, write_only=True)

    geojson = serializers.JSONField(write_only=True)
    filters = serializers.ListField(required=False, default=[], write_only=True)

    clear_cache = serializers.BooleanField(default=False, required=False, write_only=True)


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



class AreaContentRequestSerializer(ClusterRequestSerializer):

    limit = serializers.IntegerField(required=False, write_only=True)
    offset = serializers.IntegerField(required=False, write_only=True)
    order_by = serializers.CharField(required=False, write_only=True)


class MapContentCountSerializer(ClusterRequestSerializer):
    # additional filters, which are applied on top of filters, only for the count query
    modulations = serializers.JSONField(required=False, default={}, write_only=True)

    def validate_modulations(self, value):

        if value:

            if not isinstance(value, dict):
                raise serializers.ValidationError('Modulations have to be of type dict')

            # modulation can be a filter or a nested filter
            for modulation_name, modulation in value.items():

                if not isinstance(modulation_name, str):
                    raise serializers.ValidationError('Invalid modulation key: {0}'.format(modulation_name))

                if not isinstance(modulation, dict):
                    raise serializers.ValidationError('Invalid modulation')

                filters_are_allowed([modulation])

        return value


class GroupedMapContentSerializer(ClusterRequestSerializer):
    group_by = serializers.CharField(write_only=True)
    

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



class GisModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Gis
        fields = '__all__'