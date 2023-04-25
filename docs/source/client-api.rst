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

settings.onFinalClick
    Hook for what happens when the user clicks on a final marker.

    .. code-block:: javascript

        const settings = {
            onFinalClick: function (marker, data) {
                alert(JSON.stringify(data))
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
        "value" : VALUE
    };


DATABASE_COLUMN
    The :code:`DATABASE_COLUMN` string is the name of the database column this filter should be applied to.

VALUE
    The :code:`VALUE` of the filter can be of type :code:`string`, :code:`number`, :code:`bool` or :code:`Array`

OPERATOR
    The :code:`OPERATOR` string can be one of the following:

    +---------------------+----------------------------------------------------+----------------------------------------+
    | operator            | description                                        |          applicable to value types     |
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


Filtering methods of AnyclusterClient
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

filter(filterObject, reloadMarkers *boolean*)
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