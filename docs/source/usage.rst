Basic Usage
===========

OpenLayers
----------

1. Install or download the anycluster-openlayers client
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

npm
"""

You can install :code:`anycluster-openlayers from npm`

.. code-block:: shell

    npm install anycluster-openlayers


js module
"""""""""

Instead of using npm, you also can download and include the anycluster-openlayers client into your static files.
Put the files :code:`anycluster-openlayers.js` and :code:`anycluster-openlayers.js.map` somewhere in your static files.


2. Provide marker images
^^^^^^^^^^^^^^^^^^^^^^^^
anycluster requires marker images which will be placed on the map. You can use your own images or download marker images here.

You have to make the marker images accessible by anycluster-openlayers.

If you are using django templates, put the marker images into your static files to make them accessible by anycluster.
For example, put all marker images into the folder :code:`{somewhere}/static/anycluster/`


3. Create a script instantiating AnyclusterOpenLayers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
    You have to use :code:`constrainResolution: true` on your :code:`ol.View`.
    This ensures that only integer zoom levels are used.

    The given example script is for the use-case of the js module in django templates.
    If you have installed anycluster-openlayers from **npm**, use
    :code:`import { AnyclusterOpenLayers } from 'anycluster-openlayers';`

    **Important:** openlayers uses :code:`EPSG:3857` by default, so make sure to adjust the
    settings passed to :code:`AnyclusterOpenLayers` accordingly.


.. code-block:: javascript

    import { AnyclusterOpenLayers } from '/static/anycluster-openlayers.js';

    const Map = ol.Map;
    const TileLayer = ol.layer.Tile;
    const OSM = ol.source.OSM;
    const View = ol.View;
    const fromLonLat = ol.proj.fromLonLat

    let map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat([10.3, 47.4]),
            zoom: 3,
            minZoom: 3,
            constrainResolution: true,
        }),
    });

    const apiUrl = 'URL_TO_YOUR_SERVER_RUNNING_ANYCLUSTER';

    const settings = {
        srid: 'EPSG:3857',
        onFinalClick: function (marker, data) {
            alert(JSON.stringify(data))
        }
    };

    const markerFolderPath = '/static/anycluster/images/';

    let anyclusterOpenLayers = new AnyclusterOpenLayers(map, apiUrl, markerFolderPath, settings);
    
Put the script in the appropriate django template or javascript file.

**That's it. Your OpenLayers map markers are now being clustered!**

----

Leaflet
-------

1. Download the anycluster-leaflet client
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

2. Include the anycluster-leaflet client into your static files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Put the files :code:`anycluster-leaflet.js` and :code:`anycluster-leaflet.js.map` somewhere in your static files.

3. Provide marker images
^^^^^^^^^^^^^^^^^^^^^^^^
anycluster requires marker images which are placed on the map.
You can use your own images or download marker images here.

Put the marker images into your static files to make them accessible by anycluster.
For example, put all marker images into the folder :code:`{somewhere}/static/anycluster/`

4. Create a script instantiating AnyclusterLeaflet
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


.. note::
    The given example script is for the use-case of the js module in django templates.
    If you have installed anycluster-leaflet from **npm**, use
    :code:`import { AnyclusterLeaflet } from 'anycluster-leaflet';`

.. code-block:: javascript

    import { AnyclusterLeaflet } from '/static/anycluster-leaflet.js';

    let map = L.map('map', {
        center: [47.4, 10.3],
        zoom: 3,
        minZoom: 3,
        worldCopyJump: true,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    const apiUrl = 'URL_TO_YOUR_SERVER_RUNNING_ANYCLUSTER';

    const settings = {
        onFinalClick: function (marker, data) {
            alert(JSON.stringify(data))
        }
    };

    const markerFolderPath = '/static/anycluster/images/';

    let anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);

----

Google Maps
-----------