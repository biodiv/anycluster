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
class Filters:
    
    def __init__(self, filters):
        self.filters = filters

    def parse_filter_value(self, operator, value):

        if type(value) == str:
            if operator == 'startswith':
                return "'^{value}.*' ".format(value=value)

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

        operator_mapping = {
            '=': '=',
            '!=': '!=',
            '>=': '>=',
            '<=': '<=',
            'startswith': '~',
            'contains': '~'
        }

        filterstring = ''

        for filter in self.filters:

            column = list(filter.keys())[0]

            filterparams = filter[column]

            filterstring += ' AND ('

            operator_pre = filterparams.get('operator', '=')

            values = filterparams['values']

            if 'either' in operator_pre:

                parts = operator_pre.split('_')

                operator = operator_mapping[parts[-1]]

                for counter, value in enumerate(values):
                    if counter > 0:
                        filterstring += ' OR '

                    sql_value = self.parse_filter_value(parts[-1], value)

                    filterstring += '{column} {operator} {sql_value}'.format(column=column, operator=operator,
                                                                             sql_value=sql_value)

            else:

                if type(values) == str or type(values) == bool:
                    operator = operator_mapping[operator_pre]
                    sql_value = self.parse_filter_value(operator_pre, values)

                elif type(values) == list:
                    if operator_pre == '!=':
                        operator = 'NOT IN'
                    else:
                        operator = 'IN'

                    sql_value = str(tuple(values))

                filterstring += '{column} {operator} {sql_value}'.format(column=column, operator=operator,
                                                                         sql_value=sql_value)

            filterstring += ')'

        return filterstring
