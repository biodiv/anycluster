var gridColorValues = {
	5: "pink",
	10: "lightcoral",
	50: "coral",
	100: "orange",
	1000: "orangered",
	10000: "red"
}

//set marker sizes according to your images for correct display
var markerImageSizes = {
	1: [24,39],
	5 : [30,30],
	10: [30,30],
	50: [40,40],
	100: [40,40],
	1000: [50,50],
	10000: [60,60]
}


var Anycluster = function(mapdiv_id, settings_, mapInitCallback){


	if (typeof mapInitCallback === "function") {
		google.maps.event.addDomListener(window, 'load', mapInitCallback);
	}


	this.loadSettings(settings_);

	settings_ = null;

	var clusterer = this;

	this.viewportMarkerCount = 0;	
	this.markerList = [];
	this.clearMarkers = false;
	
	if (this.mapType == "google"){
	
		this.setMap = function(lng,lat){
		
			var zoom = clusterer.gmap.getZoom();
			zoom = zoom + 3;
			clusterer.zoom = zoom;
			var center = new google.maps.LatLng(lat,lng);
			clusterer.gmap.setCenter(center, zoom);
			clusterer.gmap.setZoom(zoom);
		
		}
	
		this.drawMarker = function(cluster){
		
			var center = new google.maps.LatLng(cluster['center']['y'], cluster['center']['x']);
			var count = cluster['count'];
			var pinimg = cluster['pinimg'];
			var ids = cluster["ids"];
		
			var piniconObj = clusterer.selectPinIcon(count,pinimg);
			
			var pinicon = piniconObj.url;
		
			var marker = new google.maps.Marker({
		        position: center,
		        latitude: center.lat(),
				longitude: center.lng(),
		        map: clusterer.gmap,
		        count: count,
		        icon: pinicon,
				geojson: cluster.geojson,
		        ids: ids
		    });

		    clusterer.markerList.push(marker);
		
			if (clusterer.zoom >= 13 || count <= 3) {
				google.maps.event.addListener(marker, 'click', function() {
					clusterer.markerFinalClickFunction(this);
				});
			}
		
			else {
				google.maps.event.addListener(marker, 'click', function() {
					clusterer.markerClickFunction(this);
				});
			}
		
		}
		
		this.drawMarkerExactCount = function(cluster){
		
			var center = new google.maps.LatLng(cluster['center']['y'], cluster['center']['x']);
			var count = cluster['count'];
			var pinimg = cluster['pinimg'];
			var ids = cluster["ids"];
			
			var marker = new clusterMarker(center, count, clusterer.gmap, ids);

			clusterer.markerList.push(marker);
		
			if (clusterer.zoom >= 13 || count <= 3) {
				google.maps.event.addListener(marker, 'click', function() {
					clusterer.markerFinalClickFunction(this);
				});
			}
		
			else {
				google.maps.event.addListener(marker, 'click', function() {
					clusterer.markerClickFunction(this);
				});
			}
		
		}
		
		this.drawCell = function(cluster,i){
			
			var geojson = {
				"type": "Feature",
				"count": cluster.count,
				"geometry": JSON.parse(cluster.geojson),
				"properties": {"count": cluster.count}
			}

			clusterer.gmap.data.addGeoJson(geojson);
		
		},

		this.paintGridColors = function(){

			var setColorStyleFn = function(feature) {

				var count = feature.getProperty('count');
				var rounded_count = roundMarkerCount(count);				

			  	return {
				      fillColor: gridColorValues[rounded_count],
				      strokeWeight: 0
				}

			}
			
			clusterer.gmap.data.setStyle(setColorStyleFn);
			
		},

		this.getZoom = function(){
			return clusterer.gmap.getZoom();
		},
	
		this.cluster = function(cache, clusteredCB){
		
			var viewport_json = this.getViewport();	
			var geoJson_viewport = this.quadToGeoJson(viewport_json);
			clusterer.getClusters(geoJson_viewport, "viewport", clusteredCB, cache);

		}

		this.getViewport = function(){
			var viewport = clusterer.gmap.getBounds();
			var viewport_json = {'left':viewport.getSouthWest().lng(), 'top':viewport.getNorthEast().lat(), 'right':viewport.getNorthEast().lng(), 'bottom':viewport.getSouthWest().lat()};
			return viewport_json
		}

		this.startClustering = function(){
			var firstLoad = true;
			google.maps.event.addListener(clusterer.gmap, 'idle', function() {
				
				if (firstLoad === true){
					firstLoad = false;
					clusterer.cluster(true);
				}
				else {
					clusterer.cluster(false);
				}
				 
			});
			
			
			google.maps.event.addListener(clusterer.gmap, 'zoom_changed', function() {
				 clusterer.removeAllMarkers();
			});
		}
	
		this.initialize = function(){
		
			var googleOptions = {
				zoom: clusterer.zoom,
				scrollwheel: false,
				center: new google.maps.LatLng(clusterer.center[0], clusterer.center[1]),
				mapTypeId: google.maps.MapTypeId[clusterer.MapTypeId]
			}
	
			clusterer.gmap = new google.maps.Map(document.getElementById(mapdiv_id), googleOptions);
			
			if (clusterer.autostart == true){
				clusterer.startClustering();
			}
			
		}
	}
	else if (this.mapType == "openlayers"){
	
		this.setMap = function(lng,lat){

			var zoom = clusterer.omap.getZoom();
			zoom = zoom + 3;
			clusterer.zoom = zoom;
			
			var center = new OpenLayers.LonLat(lng, lat).transform(
				new OpenLayers.Projection("EPSG:4326"),
				clusterer.omap.getProjectionObject()
			);
			
			clusterer.omap.setCenter(center, zoom);

		}
	
		this.drawMarker = function(cluster){
		
			var center = new OpenLayers.LonLat(cluster['center']['x'], cluster['center']['y']).transform(
				new OpenLayers.Projection("EPSG:4326"),
				clusterer.omap.getProjectionObject()
			);
			var count = cluster['count'];
			var pinimg = cluster['pinimg'];
		
			var piniconObj = clusterer.selectPinIcon(count,pinimg);
			var pinicon = piniconObj.url;
			var pinsize = piniconObj.size
			
			var size = new OpenLayers.Size(pinsize[0],pinsize[1]);
			if (cluster.count == 1){
				var offset = new OpenLayers.Pixel(-(pinsize[0]/2), -size.h);
			}
			else {
				var offset = new OpenLayers.Pixel(-(pinsize[0]/2), -(pinsize[1]/2));
			}
            
            var icon = new OpenLayers.Icon(pinicon,size,offset);
            
            var marker = new OpenLayers.Marker(center,icon);
            marker.latitude = cluster['center']['y'];
            marker.longitude = cluster['center']['x'];
            marker.ids = cluster["ids"];
            
            if (clusterer.zoom >= 13 || count <= 3) {
            
            	marker.events.register('mousedown', marker, function(evt) {
            		clusterer.markerFinalClickFunction(this);
            	});
			}
			else {
			
				marker.events.register('mousedown', marker, function(evt) {
            		clusterer.markerClickFunction(this);
            	});
			}
            

			clusterer.markerLayer.addMarker(marker);
		}
		
		this.drawMarkerExactCount = function(cluster){
		}
		
		this.drawCell = function(cluster,i){
		}
	
		this.cluster = function(cache, clusteredCB){
			
			var viewport = clusterer.omap.getExtent().transform(
				clusterer.omap.getProjectionObject(),
				new OpenLayers.Projection("EPSG:4326")
			).toArray(); //left, bottom, right, top
			
			var viewport_json = {'left':viewport[0], 'top':viewport[3], 'right':viewport[2], 'bottom':viewport[1]};
		
			clusterer.getClusters(viewport_json, "viewport", clusteredCB, cache);
		}
		
		this.initialize = function(){
		
			clusterer.omap = new OpenLayers.Map({
		    	div: "osmap",
		    	projection: "EPSG:900913",
		    	theme: null,
		    	layers: [
		        	new OpenLayers.Layer.OSM("OpenStreetMap"),
		        	new OpenLayers.Layer.Vector('multiPolygon')
		    	],
		    	center: new OpenLayers.LonLat(0, 0),
		    	zoom: 1
		  	});
		  	
		  	clusterer.markerLayer = new OpenLayers.Layer.Markers( "Markers" );
            clusterer.omap.addLayer(clusterer.markerLayer);
			
			var center = new OpenLayers.LonLat(settings.center[1],settings.center[0]).transform(
		    	new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
		    	clusterer.omap.getProjectionObject() // to Spherical Mercator Projection
		  	);
			
			clusterer.omap.setCenter(center,clusterer.zoom);
			
			//disable mousehweel
			var Navigation = new OpenLayers.Control.Navigation({
				'zoomWheelEnabled': false,
				'defaultDblClick': function ( event ) { 
					return; 
				 }
			});

			clusterer.omap.addControl(Navigation);

			var NavigationControls = clusterer.omap.getControlsByClass('OpenLayers.Control.Navigation')
			  , i;

			for ( i = 0; i < NavigationControls.length; i++ ) {
				NavigationControls[i].disableZoomWheel();
			}
			
			clusterer.omap.events.register("moveend", clusterer.omap, function() {
				clusterer.cluster(false);
        	});
        	
        	clusterer.omap.zoomToProxy = clusterer.omap.zoomTo;
			clusterer.omap.zoomTo =  function (zoom,xy){
				clusterer.removeAllMarkers();
				clusterer.omap.zoomToProxy(zoom,xy); 

			};
        	
        	clusterer.cluster(true);
		
		}
	
	}

	clusterer.initialize();
	
}

Anycluster.prototype = {

	loadSettings : function(settings_) {

		this.baseURL = settings_.baseURL || "/anycluster/"
		this.autostart = typeof(settings_.autostart) == "boolean" ? settings_.autostart : true;
		this.filters = settings_.filters || {};
		this.center = settings_.center || [0,0];
		this.clusterMethod = settings_.clusterMethod || "grid";
		this.iconType = settings_.iconType || "exact";
		this.gridSize = settings_.gridSize || 256;
		this.mapType = settings_.mapType;
		this.mapTypeId = settings_.mapTypeId || "HYBRID";
		this.zoom = settings_.zoom || 3;
		this.singlePinImages = settings_.singlePinImages ? settings_.singlePinImages : {};
		this.onFinalClick = settings_.onFinalClick || this.onFinalClick;
		this.loadEnd = settings_.loadEnd || this.loadEnd;
		this.loadStart = settings_.loadStart || this.loadStart;

	},

	//on small markers or on final zoom, this function is launched
	markerFinalClickFunction : function(mapmarker) {
	
		if (this.clusterMethod == "kmeans") {
			this.getClusterContent(mapmarker, this.onFinalClick);
		}
		else if (this.clusterMethod = "grid"){
			var geojson = { type: "Feature",
				geometry: JSON.parse(mapmarker["geojson"])
			};
			this.getAreaContent(geojson, this.onFinalClick);
		}
	},

	onFinalClick: function(entries_html){
		alert(entries_html);
	},

	markerClickFunction : function(marker) {
	
		this.removeAllMarkers();
		this.setMap(marker.longitude, marker.latitude);
		
	},

	filter: function(filterObj){
		this.filters = filterObj;
		this.clearMarkers = true;
		this.cluster();	
	},

	addFilters: function(newfilters){
	
		for (var f=0; f<newfilters.length; f++){
			
			this.filters.push(newfilters[f]);
		}

		this.clearMarkers = true;
		
	},
	
	removeFilters: function(activefilters){
		
		for (i=0; i<= activefilters.length; i++){
		
			delete this.filters[ activefilters[i] ];
		}
		
		this.clearMarkers = true;
		
	},
	
	removeAllMarkers : function(){

		var clusterer = this;
		
		if (this.mapType == "google"){
			for (var i=0; i<this.markerList.length; i+=1){
				this.markerList[i].setMap(null);
			}
			if (typeof(this.gmap.data) == "object"){
				this.gmap.data.forEach(function(feature){
					clusterer.gmap.data.remove(feature);
				});
			}
		}
		else if (this.mapType == "osm"){
			this.markerLayer.clearMarkers();
		}
		
		this.clearMarkers = false;
		this.markerList.length = 0;
		
	},
	
	getClusters : function(geoJson, geometry_type, gotClusters, cache){

		this.zoom = this.getZoom();
	
		var clusterer = this;
	
		this.loadStart();
		
		var url = this.baseURL + this.clusterMethod + '/' + this.zoom + '/' + this.gridSize + '/'; // + urlParams;

		postParams = {
			'geojson' : geoJson,
			'filters': this.filters,
			'geometry_type': geometry_type
		}

		if (cache === true){
			postParams['cache'] = 'load';
		}
		
		//send the ajax request
		url = encodeURI(url);
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4 && xhr.status==200) {


				if (clusterer.clearMarkers == true){
					clusterer.removeAllMarkers();
				}

				var clusters = JSON.parse(xhr.responseText);
				
				//route the clusters
				if (clusterer.clusterMethod == 'grid'){
					var clusterFunction = clusterer.drawCell;
				}
				else if (clusterer.clusterMethod == 'kmeans'){
					if (clusterer.iconType == "simple"){
						var clusterFunction = clusterer.drawMarker;
					}
					else {
						var clusterFunction = clusterer.drawMarkerExactCount;
					} 
				}

				if (clusters.length > 0 && geometry_type == "strict"){

					clusterer.removeAllMarkers();
				}

				for(i=0; i<clusters.length; i++) {
					
					var cluster = clusters[i];
	
					if ( cluster.count == 1) {
						clusterer.drawMarker(cluster);
					}
					else {
						clusterFunction(cluster);
					}
					
				}
				
				if (clusterer.clusterMethod == 'grid'){
					clusterer.paintGridColors();
				}

				//update totalcount
				clusterer.viewportMarkerCount = clusterer.getViewportMarkerCount();

				clusterer.loadEnd();
						
				if (typeof clusteredCB === "function") {
					gotClusters();
				}
				
			}
		}
		xhr.open("POST", url, true);
		
		var csrftoken = getCookieValue('csrftoken');
    		xhr.setRequestHeader("X-CSRFToken", csrftoken);

		xhr.send(JSON.stringify(postParams));
		
	},
	
	getClusterContent : function(cluster, gotClusterContent){

		var postParams = {
			"x": cluster.longitude,
			"y": cluster.latitude,
			"ids":cluster.ids,
			"filters": this.filters
		}
		
		
		var url = encodeURI(this.baseURL + 'getClusterContent/' + this.zoom + '/' + this.gridSize + '/');
		
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4 && xhr.status==200) {
				gotClusterContent(xhr.responseText);
			}
		}

		
		xhr.open("POST",url,true);

		var csrftoken = getCookieValue('csrftoken');
    		xhr.setRequestHeader("X-CSRFToken", csrftoken);

		xhr.send(JSON.stringify(postParams));
	
	},

	getViewportContent : function(gotViewportContent){
		var viewport_json = this.getViewport();
		var geoJson = this.quadToGeoJson(viewport_json);
		
		this.getAreaContent(geoJson, gotViewportContent);
		
	},
	
	getAreaContent : function(geoJson, gotAreaContent){

		this.zoom = this.getZoom();

		var postParams = {
			"geojson":geoJson,
			"filters":this.filters
		}
		

		var url = this.baseURL + "getAreaContent/" + this.zoom + '/' + this.gridSize + '/'
			
		url = encodeURI(url);
		var xhr = new XMLHttpRequest();
	
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4 && xhr.status==200) {
				
				gotAreaContent(xhr.responseText);

			}
		}
		xhr.open("POST",url,true);

		var csrftoken = getCookieValue('csrftoken');
    		xhr.setRequestHeader("X-CSRFToken", csrftoken);

		xhr.send(JSON.stringify(postParams));
	
	},

	quadToGeoJson : function(quad){
		var geoJson = {
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [ [
					[ quad["left"], quad["top"] ], 
					[ quad["right"], quad["top"] ],
					[ quad["right"], quad["bottom"] ],
					[ quad["left"], quad["bottom"] ],
					[ quad["left"], quad["top"] ]
				]]
			}
		}

		return geoJson

	},
	
	selectPinIcon : function(count, pinimg) {
	
		if (count == 1) {
		
			var singlePinURL = "/static/anycluster/images/pin_unknown.png";

			if( typeof(this.singlePinImages) == "function"){
				singlePinURL = this.singlePinImages(pinimg);
			}
			else {
			
				if (this.singlePinImages.hasOwnProperty(pinimg)){
					singlePinURL = this.singlePinImages[pinimg];
				}
			}

	    }

	    else if (count > 10000){
	        var pinicon = '10000';
	    }

	    else if (count > 1000) {
	        var pinicon = '1000';
	    }

	    else if (count > 100) {
	        var pinicon = '100';
	    }

	    else if (count > 50) {
	        var pinicon = '50';
	    }

	    else if (count > 10) {
	        var pinicon = '10';
	    }

	    else {
	        var pinicon = '5';
	    }
	    
	    if (count == 1){
	    		var imgurl = singlePinURL;
	    		var pinicon = 1;
	    }
	    else {
	    
			if (this.iconType == "exact"){
				var imgurl = "/static/anycluster/images/" + pinicon + "_empty.png";
			}
			else {
				var imgurl = "/static/anycluster/images/" + pinicon + ".png";
			}
	    }
	    
	    var imgObj = {
	    	url : imgurl,
	    	size : markerImageSizes[pinicon]
	    }
	    
	    return imgObj;
	
	},
	
	urlizeObject: function(obj){
		var urlParams = "?";
		var first = true;
		for (var key in obj){
		
			if (first == true){
				first = false;
				urlParams = urlParams + key + "=" + obj[key];
			}
			else {
				urlParams = urlParams + "&" + key + "=" + obj[key];
			}
		}
		
		return urlParams
		
	},

	getViewportMarkerCount: function(){
		var viewport = this.getViewport();
		var totalCount = 0;
		for (var i=0; i<this.markerList.length; i++){
			var marker = this.markerList[i];
			if (viewport["right"] > marker.longitude && viewport["left"] < marker.longitude && viewport["top"] > marker.latitude && viewport["bottom"] < marker.latitude){
				totalCount += marker.count;
			}
		}
		return totalCount
	},

	loadStart : function(){},
	loadEnd : function(){}
	
}

function roundMarkerCount(count){

	if (count == 1){
		count = 1;
	}
	else if (count <= 5) {
		count = 5;
	}
	else if (count <= 10) {
		count = 10;
	}
	else if (count <= 50) {
		count = 50;
	}
	else if (count <= 100) {
		count = 100;
	}
	else if (count <= 1000) {
		count = 1000;
	}
	else {
		count = 10000
	}

	return count;
}
