from django.test import TestCase

from anycluster.api.serializers import (ClusterRequestSerializer, filters_are_allowed, VALID_OPERATORS,
                                        VALID_LIST_OPERATORS, MapContentCountSerializer)
from anycluster.tests.common import VALID_VIEWPORT_REQUEST, VALID_POLYGON_REQUEST

from rest_framework.serializers import ValidationError


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


class TestFiltersAreAllowed(TestCase):

    def test_filters_are_allowed(self):

        filter = {
            'column': 'style',
            'value': 'stone',
        }

        for operator in VALID_OPERATORS:

            filter.update({
                'operator': operator
            })

            filters_are_allowed([filter])

        list_filter = {
            'column': 'style',
            'value': ['stone', 'flower'],
        }

        for list_operator in VALID_LIST_OPERATORS:

            list_filter.update({
                'operator': list_operator
            })

            filters_are_allowed([list_filter])

        invalid_operator_filter = {
            'column': 'style',
            'value': 'stone',
            'operator': 'startsWith',
        }

        with self.assertRaises(ValidationError):
            filters_are_allowed([invalid_operator_filter])

        invalid_column_filter = {
            'column': 'user',
            'value': 'stone',
            'operator': 'startsWith',
        }

        with self.assertRaises(ValidationError):
            filters_are_allowed([invalid_column_filter])

        invalid_list_filter = {
            'column': 'style',
            'value': ['stone', 'flower'],
            'operator': '=',
        }

        with self.assertRaises(ValidationError):
            filters_are_allowed([invalid_list_filter])


class TestMapContentCountSerializer(TestCase):

    def test_validate_modulations(self):
        
        simple_modulation = {
            'Stone': {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            }
        }

        serializer = MapContentCountSerializer()

        value = serializer.validate_modulations(simple_modulation)

        self.assertEqual(value, simple_modulation)

        invalid_modulation = {
            'column': 'style',
            'value': 'stone',
            'operator': '=',
        }

        with self.assertRaises(ValidationError):
            value = serializer.validate_modulations(invalid_modulation)

        nested_modulation = {
            'Stone': {
                'filters' : [
                    {
                        'column': 'style',
                        'value': 'stone',
                        'operator': '=',
                    }
                ]
            }
        }

        nested_value = serializer.validate_modulations(nested_modulation)
        self.assertEqual(nested_value, nested_modulation)

