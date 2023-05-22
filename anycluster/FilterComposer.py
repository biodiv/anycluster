'''----------------------------------------------------------------------------------------------------------------------
        SQL FOR FILTERING

        Converts the filter dictionary into a raw querystring that is added to the raw sql later

        Used by both kmeans and grid cluster

        filters are a list
        filters = [
            {"column": db_column_name, "values": value, "operator": operator_string }
        ]
    
------------------------------------------------------------------------------------------------------------------------'''
import numbers, decimal

# IMPLEMENT: check settings.ANYVLUSTER_ALLOWED_FILTER_COLUMNS
class FilterComposer:

    operator_mapping = {
        '=': '=',
        '!=': '!=',
        '>=': '>=',
        '<=': '<=',
        'startswith': '~',
        'contains': '~'
    }

    list_operator_mapping = {
        'in': 'IN',
        'not in': 'NOT IN',
    }
    
    def __init__(self, filters):
        self.filters = filters

    def parse_filter_value(self, operator, value):

        if type(value) == str:
            if operator == 'startswith':
                return "'^{value}.*'".format(value=value)

            elif operator == 'contains':
                return "'{value}.*'".format(value=value)

            else:
                return "'{value}'".format(value=value)

        elif type(value) == bool:

            if value == False:
                return 'FALSE'

            else:
                return 'TRUE'

        elif isinstance(value, numbers.Number) or isinstance(value, decimal.Decimal):
            return value

        else:
            return value


    def parse_filter(self, filter):

        filterstring = ''

        column = filter['column']
        comparison_operator = filter['operator']
        value = filter['value']

        filterstring += '('

        if isinstance(value, list):
            parsed_operator = self.list_operator_mapping[comparison_operator]

            sql_value = str(tuple(value))

            filterstring += '{column} {operator} {sql_value}'.format(column=column, operator=parsed_operator,
                                                                    sql_value=sql_value)

        else:
            parsed_operator = self.operator_mapping[comparison_operator]

            sql_value = self.parse_filter_value(comparison_operator, value)

            filterstring += '{column} {operator} {sql_value}'.format(column=column, operator=parsed_operator,
                                                                    sql_value=sql_value)

        filterstring += ')'

        return filterstring


    def parse_filters(self, filters):

        filterstring = ''

        if len(filters) > 1:
                filterstring += '('

        for counter, filter in enumerate(filters, 0):

            is_nested = 'filters' in filter

            logical_operator = filter.get('logicalOperator', 'AND')

            if counter > 0:
                filterstring += ' {logical_operator} '.format(logical_operator=logical_operator)

            if is_nested == False:
                filterstring += self.parse_filter(filter)

            else:
                nested_filter_composer = FilterComposer(filter['filters'])
                filterstring += nested_filter_composer.parse_filters(filter['filters'])
            

        
        if len(filters) > 1:
            filterstring += ')'

        return filterstring


    def as_sql(self):

        filterstring = ''

        if self.filters:

            filterstring = ' AND '

            filterstring += self.parse_filters(self.filters)

        return filterstring
