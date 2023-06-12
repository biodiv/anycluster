anycluster-client api
=====================


Instantiation
-------------

The AncylusterClient class depends on your map framework.

.. code-block:: javascript

    let anyclusterOpenLayers = new AnyclusterOpenLayers(map, apiUrl, markerFolderPath, settings);
    let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);
    let anyclusterGoogle = new AnyclusterGoogle(apiKey, map, apiUrl, markerFolderPath, settings);


Parameters
^^^^^^^^^^

map
    Instatiated map object. Either :code:`ol.Map`, :code:`L.map` or :code:`google.maps.Map`

apiUrl
    A string representing the url of your running django project with anycluster installed. 
    
    E.g. :code:`http://localhost:8080/anycluster/api`.

apiKey *(google only)*
    Your google maps apiKey.

markerFolderPath
    A string representing the path to the images anycluster should use to represent clusters on the map.

    E.g. :code:`/static/anycluster/`

settings (optional)
    An object representing the settings for the anycluster client.


settings
--------

Available settings:

+---------------------+------------+--------------------------------------------------+----------------------------+
| setting             | type       | possible values, example                         | default                    |
+=====================+============+==================================================+============================+
| srid                | string     | :code:`EPSG:4326`, :code:`EPSG:3857`             | :code:`EPSG:4326`          |
+---------------------+------------+--------------------------------------------------+----------------------------+
| kmeansGridSize      | integer    |                                                  | 150                        |
+---------------------+------------+--------------------------------------------------+----------------------------+
| gridGridSize        | integer    |                                                  | 64                         |
+---------------------+------------+--------------------------------------------------+----------------------------+
| clusterMethod       | string     | :code:`kmeans`, :code:`grid`                     | :code:`kmeans`             |
+---------------------+------------+--------------------------------------------------+----------------------------+
| geometryType        | string     | :code:`viewport`, :code:`area`                   | :code:`viewport`           |
+---------------------+------------+--------------------------------------------------+----------------------------+
| area                | geoJSON    |                                                  | null                       |
+---------------------+------------+--------------------------------------------------+----------------------------+
| iconType            | string     | :code:`exact`, :code:`rounded`                   | :code:`rounded`            |
+---------------------+------------+--------------------------------------------------+----------------------------+
| onFinalClick        | function   |                                                  |                            |
+---------------------+------------+--------------------------------------------------+----------------------------+
| singlePinImages     | object     | .. code-block:: javascript                       | {}                         |
|                     |            |                                                  |                            |
|                     |            |   {                                              |                            |
|                     |            |    'stone': '/static/anycluster/pin_stone.png',  |                            |
|                     |            |    'flower': '/static/anycluster/pin_flower.png' |                            |
|                     |            |   }                                              |                            |
+---------------------+------------+--------------------------------------------------+----------------------------+
| markerImageSizes    | object     |                                                  | .. code-block:: javascript |
|                     |            |                                                  |                            |
|                     |            |                                                  |   {                        |
|                     |            |                                                  |        1: [24, 39],        |
|                     |            |                                                  |        5: [30, 30],        |
|                     |            |                                                  |       10: [30, 30],        |
|                     |            |                                                  |       50: [40, 40],        |
|                     |            |                                                  |      100: [40, 40],        |
|                     |            |                                                  |     1000: [50, 50],        |
|                     |            |                                                  |    10000: [60, 60]         |
|                     |            |                                                  |   }                        |
+---------------------+------------+--------------------------------------------------+----------------------------+
| gridFillColors      | object     |                                                  |                            |
+---------------------+------------+--------------------------------------------------+----------------------------+
| gridStrokeColors    | object     |                                                  |                            |
+---------------------+------------+--------------------------------------------------+----------------------------+
| onGotClusters       | function   |                                                  |                            |
+---------------------+------------+--------------------------------------------------+----------------------------+

settings.onFinalClick
    Hook for what happens when the user clicks on a final marker.

    .. code-block:: javascript

        const settings = {
            onFinalClick: function (marker, data) {
                alert(JSON.stringify(data))
            }
        };


settings.onGotClusters
    Hook for things that should happen after the map has been updated with new clusters.
    This happens e.g. when the map has been panned or the zoom level changed.

    .. code-block:: javascript

        const settings = {
            onFinalClick: function () {
                console.log('got new clusters!')
            }
        };


Filtering
---------

You can manage the datasets shown on your map by using filters.

filter object
^^^^^^^^^^^^^

.. code-block:: javascript

    const filter = {
        "column": "DATABASE_COLUMN",
        "operator": "OPERATOR",
        "value" : VALUE,
        "logicalOperator": "LOGICAL_OPERATOR" // optional, only has effect if more than one filter is present
    };


DATABASE_COLUMN
    The :code:`DATABASE_COLUMN` string is the name of the database column this filter should be applied to.

VALUE
    The :code:`VALUE` of the filter can be of type :code:`string`, :code:`number`, :code:`bool` or :code:`Array`

OPERATOR
    The :code:`OPERATOR` string can be one of the following:

    +---------------------+----------------------------------------------------+----------------------------------------+
    | operator            | description                                        | applicable to value types              |
    +=====================+====================================================+========================================+
    | =                   | equals                                             | string, number, bool                   |
    +---------------------+----------------------------------------------------+----------------------------------------+
    | !=                  | does not equal                                     | string, number, bool                   |
    +---------------------+----------------------------------------------------+----------------------------------------+
    | >=                  | larger than or equal to                            | number                                 |
    +---------------------+----------------------------------------------------+----------------------------------------+
    | <=                  | smaller than or equal to                           | number                                 |
    +---------------------+----------------------------------------------------+----------------------------------------+
    | startswith          | string starts with, case insensitive               | string                                 |
    +---------------------+----------------------------------------------------+----------------------------------------+
    | contains            | string contains, case insensitive                  | string                                 |
    +---------------------+----------------------------------------------------+----------------------------------------+
    | in                  | values equal to one of the list items              | Array                                  |
    +---------------------+----------------------------------------------------+----------------------------------------+
    | not in              | values different from all of the list items        | Array                                  |
    +---------------------+----------------------------------------------------+----------------------------------------+


LOGICAL_OPERATOR

    The :code:`LOGICAL_OPERATOR` string can be one of the following:

    +---------------------+----------------------------------------------------+
    | logical operator    | description                                        | 
    +=====================+====================================================+
    | AND                 | Filters are concatenated using SQL AND             |
    +---------------------+----------------------------------------------------+
    | OR                  | Filters are concatenated using SQL OR              |
    +---------------------+----------------------------------------------------+


    The default concatenation method is :code:`AND`



Filtering methods of AnyclusterClient
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

filter(filterObject or filterObject[], reloadMarkers *boolean*)
    Applies the given filter to AnyclusterClient. Removes all other filters.

addFilter(filterObject, reloadMarkers *boolean*)
    Adds the given filter to AnyclusterClient if it does not yet exist. Does not remove previously added filters.

removeFilter(filterObject, reloadMarkers *boolean*)
    Removes the given filter from AnyclusterClient if it exists.

addFilters(filterObject[], reloadMarkers *boolean*)
    Adds multiple filters to AnyclusterClient at once. Doesn ot remove previously added filters.

removeFilters(filterObject[], reloadMarkers *boolean*)
    Removes multiple filters to AnyclusterClient at once.

resetFilters(reloadMarkers *boolean*)
    Removes all filters from AnyclusterClient.
   
Examples
^^^^^^^^

1. Applying one filter and refreshing the map.

.. code-block:: javascript

    let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);
    const filter = {
        "column": "style",
        "value": "flower",
        "operator": "=" 
    };

    anyclusterLeaflet.filter(filter);


2. Applying two filters and refreshing the map only after applying the second filter. This equals an :code:`AND` lookup.

.. code-block:: javascript

    let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);
    const styleFilter = {
        "column": "style",
        "value": "flower",
        "operator": "=" 
    };

    anyclusterLeaflet.addFilter(styleFilter, false);

    const entranceFilter = {
        "column": "free_entrance",
        "value": true,
        "operator": "=" 
    };

    anyclusterLeaflet.addFilter(entranceFilter);

3. Applying a list filter and refreshing the map. This equals an :code:`OR` lookup.
   
.. code-block:: javascript

    let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);
    const filter = {
        "column": "style",
        "value": ["flower", "stone"],
        "operator": "in" 
    };

    anyclusterLeaflet.filter(filter);


4. Applying a logical operator

.. code-block:: javascript

    let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);
    const filters = [
        {
            "column": "style",
            "value": "flower",,
            "operator": "=" 
        },
        {
            "column": "style",
            "value": "stone",,
            "operator": "=",
            "logicalOperator": "OR"
        },
    ];

    anyclusterLeaflet.filter(filters);


Nested Filtering
----------------

If the standard filtering options are still not enough and you require more complex queries, you can use nested filters, alongside with logical operators.


Example
^^^^^^^

.. code-block:: javascript

    let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);
    const filters = [
        {
            "filters": [
                {
                    "column": "style",
                    "value": "flower",,
                    "operator": "=" 
                },
                {
                    "column": "free_entrance",
                    "value": true,
                    "operator": "=" 
                }
            ]
        },
        {
            "filters": [
                {
                    "column": "style",
                    "value": "stone",,
                    "operator": "=",
                },
                {
                    "column": "free_entrance",
                    "value": false,
                    "operator": "=" 
                }
            ],
            "logicalOperator": "OR"
        }
    ];

    anyclusterLeaflet.filter(filters);



Counting
--------

You can count the objects which are currently displayed on the map in different ways.

getMapContentCount(modulations:object)   
    You can count what currently is visible on the map.

    .. code-block:: javascript

        let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);

        const mapContentCount = await anyclusterLeaflet.getMapContentCount();

        const count = mapContentCount["count"];


    If no modulations are applied, the returned object looks like this:
    
    .. code-block:: javascript

        {
            "count": 756,
            "modulations": {}
        }

    
    **Modulations**

    Modulations are like filters, but they are applied only for the current :code:`getMapContentCount` request.
    They are not stored in :code:`anyclusterClient.filters`.
    You can use simple filters as well as nested filters for modulations.
    
    .. code-block:: javascript

        let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);
        
        const modulations = {
            "stone" : {
                "column": "style",
                "value": "stone",
                "operator": "="
            },
            "flower" : {
                "column": "style",
                "value": "flower",
                "operator": "="
            },
            "flowerOrStone" : {
                "filters" : [
                    {
                        "column": "style",
                        "value": "stone",
                        "operator": "="
                    },
                    {
                        "column": "style",
                        "value": "flower",
                        "operator": "=",
                        "logicalOperator": "OR"
                    },
                ]
            }
        };

        const mapContentCount = await anyclusterLeaflet.getMapContentCount(modulations);

    The returned object looks like this:

    .. code-block:: javascript

        {
            "count" : 756,
            "modulations": {
                "stone": {
                    "count": 102
                },
                "flower": {
                    "count": 76
                },
                "flowerOrStone": {
                    "count": 178
                }
            }
        }


getGroupedMapContents(groupBy:string)    
    You can query a list of the currently visible contents, grouped by a database column.
    
    .. code-block:: javascript

        let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);

        const groupBy = "style";
        const groupedMapContents = anyclusterLeaflet.getGroupedMapContents(groupBy);

    
    The returned object looks like this:

    .. code-block:: javascript

        {
            "flower": {
                "count": 1773
            },
            "imperial": {
                "count": 1884
            },
            "japanese": {
                "count": 1893
            },
            "other": {
                "count":1883
            },
            "stone":{
                "count":1783
            }
        }

    :code:`flower`, :code:`imperial`, :code:`japanese`, :code:`other` and :code:`stone` are the occurring values of the column :code:`style`, which had been applied in the :code:`GROUP BY` SQL clause.



Getting Content
---------------

getMapContents(limit?: number, offset?:number)
    Fetches a list of the currently displayed data. By default, model instances with all their fields are returned.
    You can configure this using a custom serializer with :code:`settings.ANYCLUSTER_GIS_MODEL_SERIALIZER`.
