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

OPERATOR_MAPPING = {
    '=': '=',
    '!=': '!=',
    '>=': '>=',
    '<=': '<=',
    'startswith': '~',
    'contains': '~'
}

LIST_OPERATOR_MAPPING = {
    'in': 'IN',
    'not in': 'NOT IN',
}

class FilterComposer:
    
    def __init__(self, gis_model, filters):
        self.filters = filters
        self.gis_model = gis_model
        self.geo_table = gis_model._meta.db_table

        self.foreign_key_map = {}

        self.selected_columns = []
        self.selected_fk_columns = []

        self.fill_selects_and_foreign_key_map(self.filters)

    def fill_selects_and_foreign_key_map(self, filters):

        for filter in filters:

            if 'filters' in filter:
                self.fill_selects_and_foreign_key_map(filter['filters'])

            else:

                column = filter['column']
                table_name = self.gis_model._meta.db_table

                if '__' in column:
                    parts = column.split('__')
                    foreign_key_name = parts[0]
                    fk_column = parts[1]

                    fk_field = getattr(self.gis_model, foreign_key_name)
                    table_name = fk_field.field.related_model._meta.db_table

                    if foreign_key_name not in self.foreign_key_map:

                        self.foreign_key_map[foreign_key_name] = {
                            'table': table_name,
                            'field': fk_field,
                            'alias': column
                        }

                    
                    if column not in self.selected_fk_columns:
                        select = '{table_name}.{fk_column} AS {column}'.format(table_name=table_name, fk_column=fk_column,
                                                                                column=column)
                        self.selected_fk_columns.append(select)

                else:
                    select = '{table_name}.{column}'.format(table_name=table_name, column=column)
                    if select not in self.selected_columns:
                        self.selected_columns.append(select)
                        

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

    def parse_filter(self, filter, table_name_override=None):

        filterstring = ''

        column = filter['column']
        table_name = self.geo_table
        if '__' in column:
            parts =column.split('__')
            foreign_key_name = parts[0]

            if not table_name_override:
                column = parts[1]
            foreign_key = self.foreign_key_map[foreign_key_name]
            table_name = foreign_key['table']

        if table_name_override:
            table_name = table_name_override

        comparison_operator = filter['operator']
        value = filter['value']

        filterstring += '('

        if isinstance(value, list):
            parsed_operator = LIST_OPERATOR_MAPPING[comparison_operator]

            sql_value = str(tuple(value))

            filterstring += '{table_name}.{column} {operator} {sql_value}'.format(table_name=table_name, column=column,
                                                                        operator=parsed_operator, sql_value=sql_value)

        else:
            parsed_operator = OPERATOR_MAPPING[comparison_operator]

            sql_value = self.parse_filter_value(comparison_operator, value)

            filterstring += '{table_name}.{column} {operator} {sql_value}'.format(table_name=table_name, column=column,
                                                                        operator=parsed_operator, sql_value=sql_value)

        filterstring += ')'

        return filterstring


    def parse_filters(self, filters, table_name_override=None):

        filterstring = ''

        if len(filters) > 1:
                filterstring += '('

        for counter, filter in enumerate(filters, 0):

            is_nested = 'filters' in filter

            logical_operator = filter.get('logicalOperator', 'AND')

            if counter > 0:
                filterstring += ' {logical_operator} '.format(logical_operator=logical_operator)

            if is_nested == False:
                filterstring += self.parse_filter(filter, table_name_override=table_name_override)

            else:
                nested_filter_composer = FilterComposer(self.gis_model, filter['filters'])
                filterstring += nested_filter_composer.parse_filters(filter['filters'], table_name_override=table_name_override)
            

        
        if len(filters) > 1:
            filterstring += ')'

        return filterstring


    def get_left_join_sql(self):

        join_str = ''
        geo_table = self.gis_model._meta.db_table

        joined_tables = []

        for foreign_key_name, foreign_key in self.foreign_key_map.items():

            fk_field = foreign_key['field']
            fk_table = foreign_key['table']

            if fk_table not in joined_tables:
                join_str += '{join_str} LEFT JOIN {fk_table} ON {geo_table}.{foreign_key_name}_id = {fk_table}.{fk_field_name} '.format(
                    join_str=join_str, fk_table=fk_table, geo_table=geo_table, foreign_key_name=foreign_key_name, fk_field_name=fk_field.field.to_fields[0])
                joined_tables.append(fk_table)

        return join_str


    def as_sql(self, omit_leading_AND=False, table_name_override=None):

        filterstring = ''

        if self.filters:

            if omit_leading_AND == False:
                filterstring = ' AND '

            filterstring += self.parse_filters(self.filters, table_name_override=table_name_override)

        return filterstring

    # foreign key columns are aliased to avoid ambiguous names
    def get_selected_columns(self):
        select_string = ', '.join(self.selected_columns)
        fk_select_string = ', '.join(self.selected_fk_columns)

        combined_select_string = '{0}, {1}'.format(select_string, fk_select_string).strip(' ').strip(',')

        return combined_select_string

