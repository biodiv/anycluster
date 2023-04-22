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

    def as_sql(self):

        filterstring = ''

        for filter in self.filters:

            column = filter['column']
            operator = filter['operator']
            value = filter['value']

            filterstring += ' AND ('

            if isinstance(value, list):
                parsed_operator = self.list_operator_mapping[operator]

                sql_value = str(tuple(value))

                filterstring += '{column} {operator} {sql_value}'.format(column=column, operator=parsed_operator,
                                                                         sql_value=sql_value)

            else:
                parsed_operator = self.operator_mapping[operator]

                sql_value = self.parse_filter_value(operator, value)

                filterstring += '{column} {operator} {sql_value}'.format(column=column, operator=parsed_operator,
                                                                         sql_value=sql_value)

            filterstring += ')'

        return filterstring
