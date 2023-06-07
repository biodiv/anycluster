django settings
===============

Available settings:

+---------------------------------------+------------+--------------------------------------------------+---------------------------+
| setting                               | type       | example                                          | required                  |
+=======================================+============+==================================================+===========================+
| ANYCLUSTER_GEODJANGO_MODEL            | string     | 'app_name.ModelName'                             | required                  |
+---------------------------------------+------------+--------------------------------------------------+---------------------------+
| ANYCLUSTER_COORDINATES_COLUMN         | string     | 'coordinates'                                    | required                  |
+---------------------------------------+------------+--------------------------------------------------+---------------------------+
| ANYCLUSTER_COORDINATES_COLUMN_SRID    | integer    | 3857                                             | optional                  |
+---------------------------------------+------------+--------------------------------------------------+---------------------------+
| ANYCLUSTER_FILTERS                    | string[]   | ['db_column_1', 'db_column_2']                   | optional                  |
+---------------------------------------+------------+--------------------------------------------------+---------------------------+
| ANCLUSTER_PINCOLUMN                   | string     | 'db_column'                                      | optional                  |
+---------------------------------------+------------+--------------------------------------------------+---------------------------+
| ANCLUSTER_GIS_MODEL_SERIALIZER        | string     | 'myapp.api.serializers.DatasetRetrieveSerializer'| optional                  |
+---------------------------------------+------------+--------------------------------------------------+---------------------------+

ANYCLUSTER_GEODJANGO_MODEL
    The model the anycluster api should query.

ANYCLUSTER_COORDINATES_COLUMN
    The name of the gis column of the model specified in ANYCLUSTER_GEODJANGO_MODEL.

ANYCLUSTER_COORDINATES_COLUMN_SRID *(optional)*
    anycluster will try to determine the srid of your database column by itself. If anycluster fails to read the srid, *4326* will be used.

ANYCLUSTER_FILTERS
    Only the specified columns can be used as filters.

ANYCLUSTER_PINCOLUMN
    If you want varying markers for pins with count 1, you can specify the database column here.

    Example setting:

    .. code-block:: python

        ANYCLUSTER_PINCOLUMN = 'style'

    In conjunction with the following setting of AnyclusterClient

    .. code-block:: javascript

        const settings = {
            singlePinImages : {
                'stone': '/static/anycluster/pin_stone.png',
                'flower': '/static/anycluster/pin_flower.png'
            }
        };

        const anyclusterClient = new anyclusterOpenLayers(map, apiUrl, markerFolderPath, settings);


    If the :code:`style` column of the dataset equals :code:`stone`, :code:`/static/anycluster/pin_stone.png` will be used as an image for the marker.
    

ANYCLUSTER_GIS_MODEL_SERIALIZER
    Define the `django-rest-framework <https://www.django-rest-framework.org/api-guide/serializers/>`_ serializer used for getting datasets with :code:`anyclusterClient.getMapContents`.
    The defined serializer is also used for the data received by :code:`anyclusterClient.onFinalClick`.


**Example settings with all entries**:

.. code-block:: python

    ANYCLUSTER_GEODJANGO_MODEL = 'anymap.Gardens'
    ANYCLUSTER_COORDINATES_COLUMN = 'coordinates'
    ANYCLUSTER_COORDINATES_COLUMN_SRID = 3857
    ANYCLUSTER_FILTERS = ['rating', 'free_entrance', 'last_renewal', 'style']
    ANYCLUSTER_PINCOLUMN = 'style'