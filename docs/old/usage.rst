Usage
=====

Initialization
--------------
First you have to initialize your map.

.. code-block:: javascript

   var anyclusterSettings = { 
       mapType : "leaflet"
   }

   anycluster = new Anycluster("div_id", anyclusterSettings);


anyclusterSettings Properties
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**mapType**
  *string* currently only supports "google". Support for "openlayers" and "leaflet" is planned. This is the only required property.

**autostart**
  *boolean* true or false. Defaults to true. Defines if the map is automatically clustered when loaded

**center**
  *list* defaults to [0,0]. Set the center your map should begin at in [longitude,latitude].

**zoom**
  *integer* defaults to 3. Set the initial zoom level.

**clusterMethod**
  *string* "grid" or "kmeans". Defaults to "grid".

**iconType**
  *string* "exact" or "rounded". Affects kmeans clustering only, defaults to "exact". Determines if the counts on the clusters are displayed as an exact or rounded number.

**gridSize**
  *integer* defaults to 256. Defines the size of the grid for both kmeans and grid clustering.

**mapTypeId**
  *string* defaults to "HYBRID". Possible values are "ROADMAP", "SATELLITE", "HYBRID" or "TERRAIN".

**filters**
  *object* defaults to {}. See filter documentation.
		
**singlePinImages**
  *object* defaults to {}. 

**onFinalClick**
  *function* function fired when the clusters cannot be declustered anymore.

**loadEnd**
  *function* callback function fired after every clustering event.

**loadStart**
  *function* callback function fired before every clustering event.



Example (google):

.. code-block:: javascript

   var anyclusterSettings = {
		mapType : "google",
		google : {
			mapTypeId: "HYBRID",
		},
		gridSize: 256,
		zoom: 3,
		center: [30,30],
		clusterMethod : "kmeans",
		iconType: "exact", 
		singlePinImages: {
			'blue':'/static/anycluster/pin_blue.png',
			'red':'/static/anycluster/pin_red.png',
		},
		onFinalClick : function(entries){
			var dialog = $("#dialog");
			dialog.html(entries);
			dialog.dialog('open');
		},
		loadEnd: function(){ 
			$("#totalcount").text(anycluster.viewportMarkerCount);
		},
		autostart: true,
		filters: { "is_faved": {"values" : true} }
   }

   anycluster = new Anycluster("mymap", anyclusterSettings);


Example (leaflet):

	.. code-block:: javascript

   var anyclusterSettings = {
		mapType : "leaflet",
		gridSize: 256,
		zoom: 3,
		center: [30,30],
		clusterMethod : "kmeans",
		iconType: "exact", 
		singlePinImages: {
			'blue':'/static/anycluster/pin_blue.png',
			'red':'/static/anycluster/pin_red.png',
		},
		onFinalClick : function(entries){
			var dialog = $("#dialog");
			dialog.html(entries);
			dialog.dialog('open');
		},
		loadEnd: function(){ 
			$("#totalcount").text(anycluster.viewportMarkerCount);
		},
		autostart: true,
		filters: { "is_faved": {"values" : true} }
   }

   anycluster = new Anycluster("mymap", anyclusterSettings);

Properties of the anycluster instance
-------------------------------------

**anyclusterInstance.viewportMarkerCount**
  contains the count of all items that are currently on the viewport

Methods
-------
**anyclusterInstance.filter(filterObject)**
  applies all filters of the filterObject and reclusters the map. See filter documentation for filterObjects.
