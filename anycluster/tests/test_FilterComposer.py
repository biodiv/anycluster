from django.test import TestCase

from anycluster import FilterComposer

import numbers, decimal

class Testfilters(TestCase):


    def get_possible_operators(self, value):

        if type(value) == str:
            return ['=', '!=', 'startswith', 'contains']

        elif type(value) == bool:
            return ['=', '!=']

        elif isinstance(value, numbers.Number) or isinstance(value, decimal.Decimal):
            return ['=', '!=', '>=', '<=']

        elif isinstance(value, list):
            return ['in', 'not in']


    def get_filters(self):
        filters = []

        string_value = 'flower'
        string_operators = self.get_possible_operators(string_value)

        for operator in string_operators:
            filter = {
                'column': 'style',
                'value': string_value,
                'operator': operator
            }

            filters.append(filter)
        
        return filters

    def test__init__(self):
        
        filter_list = self.get_filters()

        filter_composer = FilterComposer(filter_list)
        self.assertEqual(filter_composer.filters, filter_list)

    def test_parse_filter_value(self):

        filter_list = self.get_filters()

        filter_composer = FilterComposer(filter_list)
        
        # test string operators
        string_value = 'flower'
        
        string_equals = filter_composer.parse_filter_value('=', string_value)
        self.assertEqual(string_equals, "'flower'")

        string_unequals = filter_composer.parse_filter_value('!=', string_value)
        self.assertEqual(string_unequals, "'flower'")

        string_startswith = filter_composer.parse_filter_value('startswith', string_value)
        self.assertEqual(string_startswith, "'^flower.*'")

        string_startswith = filter_composer.parse_filter_value('contains', string_value)
        self.assertEqual(string_startswith, "'flower.*'")

        for operator, operator_ in filter_composer.operator_mapping.items():

            true_value = filter_composer.parse_filter_value(operator, True)
            self.assertEqual(true_value, 'TRUE')

            false_value = filter_composer.parse_filter_value(operator, False)
            self.assertEqual(false_value, 'FALSE')

            number_value = filter_composer.parse_filter_value(operator, 3.45)
            self.assertEqual(number_value, 3.45)

            dec = decimal.Decimal(1.3)
            dec_value = filter_composer.parse_filter_value(operator, dec)
            self.assertEqual(dec, dec_value)


    def test_string_as_sql(self):

        string_value = 'flower'
        
        equals_filter = {
            'column': 'style',
            'value': string_value,
            'operator': '=',
        }

        filter_composer = FilterComposer([equals_filter])

        equals_sql = filter_composer.as_sql()
        
        self.assertEqual(equals_sql, " AND (style = 'flower')")
        
        unequals_filter = {
            'column': 'style',
            'value': string_value,
            'operator': '!=',
        }

        filter_composer = FilterComposer([unequals_filter])

        unequals_sql = filter_composer.as_sql()
        
        self.assertEqual(unequals_sql, " AND (style != 'flower')")

        # list
        list_value = ['flower', 'stone']
        in_list_filter = {
            'column': 'style',
            'value': list_value,
            'operator': 'in',
        }

        filter_composer = FilterComposer([in_list_filter])

        in_list_sql = filter_composer.as_sql()
        
        self.assertEqual(in_list_sql, " AND (style IN ('flower', 'stone'))")

        not_in_list_filter = {
            'column': 'style',
            'value': list_value,
            'operator': 'not in',
        }

        filter_composer = FilterComposer([not_in_list_filter])

        not_in_list_sql = filter_composer.as_sql()
        
        self.assertEqual(not_in_list_sql, " AND (style NOT IN ('flower', 'stone'))")