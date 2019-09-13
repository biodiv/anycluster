"use strict";

var gridColorValues = {
	5: "pink",
	10: "lightcoral",
	50: "coral",
	100: "orange",
	1000: "orangered",
	10000: "red"
};

//set marker sizes according to your images for correct display
var markerImageSizes = {
	1: [24,39],
	5 : [30,30],
	10: [30,30],
	50: [40,40],
	100: [40,40],
	1000: [50,50],
	10000: [60,60]
};


var Anycluster = function(mapdiv_id, settings_, mapInitCallback){

	this.mapdiv_id = mapdiv_id;

	if (typeof mapInitCallback === "function") {
		google.maps.event.addDomListener(window, 'load', mapInitCallback);
	}

	this.loadSettings(settings_);

	this.viewportMarkerCount = 0;	
	this.markerList = [];
	this.clearMarkers = false;
	
	for (let key in this.api[this.mapType]){
		this[key] = this.api[this.mapType][key];
	}

	this.initialize();
	
};

Anycluster.prototype = {

	loadSettings : function(settings_) {

		this.baseURL = settings_.baseURL || "/anycluster/";
		this.autostart = typeof(settings_.autostart) == "boolean" ? settings_.autostart : true;
		this.filters = settings_.filters || [];
		this.center = settings_.center || [0,0];
		this.clusterMethod = settings_.clusterMethod || "grid";
		this.iconType = settings_.iconType || "exact";
		this.gridSize = settings_.gridSize || 64;
		this.mapType = settings_.mapType; // "google" or "leaflet"
		this.zoom = settings_.zoom || 3;
		this.singlePinImages = settings_.singlePinImages ? settings_.singlePinImages : {};
		this.onFinalClick = settings_.onFinalClick || this.onFinalClick;
		this.loadEnd = settings_.loadEnd || this.loadEnd;
		this.loadStart = settings_.loadStart || this.loadStart;
		this.clusterArea = settings_.clusterArea || false;
		this.returnFormat = settings_.returnFormat || "html"; // return format for final clicks, html or json
		this.mobile = settings_.mobile || false;
		this.markerFolder = settings_.markerFolder || "/static/anycluster/images/";

		if (this.mapType == "kmeans"){
			this.gridSize = 256;
		}

		// api specific settings
		if (this.mapType == "google"){
			this.api_settings = settings_.google || {};
		}
		else if (this.mapType == "leaflet"){
			this.api_settings = settings_.leaflet || {};
		}

		for (let key in this.api[this.mapType]["default_settings"]){
			if (!(this.api_settings.hasOwnProperty(key)) ){
				this.api_settings[key] = this.api[this.mapType]["default_settings"][key];
			}
		}
	},

	prepare_xhr : function(xhr){
		if (this.mobile == true){
			xhr.withCredentials = true;
		}
		else {		
			var csrftoken = getCookieValue("csrftoken");
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}

		return xhr;
	},

	// on small markers or on final zoom, this function is launched
	markerFinalClickFunction : function(mapmarker) {
	
		if (this.clusterMethod == "kmeans") {
			this.getClusterContent(mapmarker, this.onFinalClick);
		}
		else if (this.clusterMethod = "grid"){
			var geojson = mapmarker["geojson"];
			this.getAreaContent(geojson, this.onFinalClick);
		}
	},

	// hook for you to implement what happens if a user clicks on the final marker
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

	cluster : function(cache, clusteredCB){

		if (this.clusterArea == false){
			var viewport_json = this.getViewport();	
			var geoJson = this.viewportToGeoJson(viewport_json);
			var geometry_type = "viewport";
		}
		else {
			var geoJson = clusterer.clusterArea;
			var geometry_type = "strict";
		}

		this.getClusters(geoJson, geometry_type, clusteredCB, cache);

	},

	getClusters : function(geoJson, geometry_type, gotClusters, cache){

		this.zoom = this.getZoom();
	
		var clusterer = this;
	
		this.loadStart();
		
		var url = this.baseURL + this.clusterMethod + '/' + this.zoom + '/' + this.gridSize + '/';

		var postParams = {
			'geojson' : geoJson,
			'filters': this.filters,
			'geometry_type': geometry_type
		};

		if (cache === true){
			postParams['cache'] = 'load';
		}
		
		//send the ajax request
		url = encodeURI(url);

		var xhr = new XMLHttpRequest();

		xhr.onload = function(){
			console.log("[xhr] finished with status " + xhr.status);

			if (clusterer.clearMarkers == true){
				clusterer.removeAllMarkers();
			}

			var clusters = JSON.parse(xhr.responseText);
			
			//route the clusters
			if (clusterer.clusterMethod == "grid"){
				var clusterFunction = clusterer.drawCell;
			}
			else if (clusterer.clusterMethod == "kmeans"){

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

			for (let i=0; i<clusters.length; i++) {
				
				var cluster = clusters[i];

				if ( cluster.count == 1) {
					clusterer.drawMarker(clusterer, cluster);
				}
				else {
					clusterFunction(clusterer, cluster);
				}
				
			}

			clusterer.post_clustering();

			//update totalcount
			clusterer.viewportMarkerCount = clusterer.getViewportMarkerCount();

			clusterer.loadEnd();
					
			if (typeof clusteredCB === "function") {
				gotClusters();
			}

		}
		
		xhr.open("POST", url, true);

		xhr = this.prepare_xhr(xhr);

		xhr.send(JSON.stringify(postParams));
		
	},
	
	getClusterContent : function(cluster, gotClusterContent){

		var postParams = {
			"x": cluster.longitude,
			"y": cluster.latitude,
			"ids":cluster.ids,
			"filters": this.filters
		}
		
		
		var url = this.baseURL + "getClusterContent/" + this.zoom + "/" + this.gridSize + "/";

		if (this.returnFormat == 'json'){
			url += '?format=json'; 
		}

		url = encodeURI(url);
		
		var xhr = new XMLHttpRequest();
		
		xhr.onload = function(){
			gotClusterContent(xhr.responseText);
		}

		
		xhr.open("POST",url,true);

		xhr = this.prepare_xhr(xhr);

		xhr.send(JSON.stringify(postParams));
	
	},

	getViewportContent : function(gotViewportContent){
		var viewport_json = this.getViewport();
		var geoJson = this.viewportToGeoJson(viewport_json);
		
		this.getAreaContent(geoJson, gotViewportContent);
		
	},
	
	getAreaContent : function(geoJson, gotAreaContent){

		this.zoom = this.getZoom();

		var postParams = {
			"geojson":geoJson,
			"filters":this.filters
		}
		

		var url = this.baseURL + "getAreaContent/" + this.zoom + "/" + this.gridSize + "/"

		if (this.returnFormat == 'json'){
			url += '?format=json'; 
		}
			
		url = encodeURI(url);
		var xhr = new XMLHttpRequest();
	
		xhr.onload = function(){
			gotAreaContent(xhr.responseText);
		}

		xhr.open("POST",url,true);

		xhr = this.prepare_xhr(xhr);

		xhr.send(JSON.stringify(postParams));
	
	},

	_max_bounds : {
		"left" : -179,
		"top" : 89,
		"right" : 179,
		"bottom" : -89
	},

	viewportToGeoJson : function(viewport){

		if (viewport["left"] < this._max_bounds["left"]){
			viewport["left"] = this._max_bounds["left"];
		}

		if (viewport["bottom"] < this._max_bounds["bottom"]){
			viewport["bottom"] = this._max_bounds["bottom"];
		}

		if (viewport["top"] > this._max_bounds["top"]){
			viewport["top"] = this._max_bounds["top"];
		}

		if (viewport["right"] > this._max_bounds["right"]){
			viewport["right"] = this._max_bounds["right"];
		}

		// check if the viewport spans the edges of coordinate system
		
		if (viewport["left"] > viewport["right"]) {
			var geomtype = "MultiPolygon";
			var coordinates = [ [
					[ viewport["left"], viewport["top"] ],
					[ 179, viewport["top"] ],
					[ 179, viewport["bottom"] ],
					[ viewport["left"], viewport["bottom"] ],
					[ viewport["left"], viewport["top"] ]
			],
			[
					[ -179, viewport["top"] ],
					[ viewport["right"], viewport["top"] ],
					[ viewport["right"], viewport["bottom"] ],
					[ -179, viewport["bottom"] ],
					[ -179, viewport["top"] ]
			]];
		}
		else {
			var geomtype = "Polygon";
			var coordinates = [ [
				[ viewport["left"], viewport["top"] ], 
				[ viewport["right"], viewport["top"] ],
				[ viewport["right"], viewport["bottom"] ],
				[ viewport["left"], viewport["bottom"] ],
				[ viewport["left"], viewport["top"] ]
			]];
		}

		var geoJson = {
			"type": "Feature",
			"properties" : {},
			"geometry": {
				"type": geomtype,
				"coordinates": coordinates
			}
		}

		return geoJson;

	},
	
	selectPinIcon : function(cluster) {

		var count = cluster["count"];
		var pinimg = cluster["pinimg"];
	
		if (count == 1) {
		
			var singlePinURL = "" + this.markerFolder + "pin_unknown.png";

			if( typeof(this.singlePinImages) == "function"){
				singlePinURL = this.singlePinImages(cluster);
			}
			else {
			
				if (this.singlePinImages.hasOwnProperty(pinimg)){
					singlePinURL = this.singlePinImages[pinimg];
				}
			}

	    }

	    else if (count > 10000){
	        var pinicon = "10000";
	    }

	    else if (count > 1000) {
	        var pinicon = "1000";
	    }

	    else if (count > 100) {
	        var pinicon = "100";
	    }

	    else if (count > 50) {
	        var pinicon = "50";
	    }

	    else if (count > 10) {
	        var pinicon = "10";
	    }

	    else {
	        var pinicon = "5";
	    }
	    
	    if (count == 1){
	    		var imgurl = singlePinURL;
	    		var pinicon = "1";
	    }
	    else {
	    
			if (this.iconType == "exact"){
				var imgurl = "" + this.markerFolder + pinicon + "_empty.png";
			}
			else {
				var imgurl = "" + this.markerFolder + pinicon + ".png";
			}
	    }

		var size = markerImageSizes[pinicon];

		if (count == 1){
			var anchor = [parseInt(size[0]/2), size[1]-1];
		}
		else {
			var anchor = [parseInt(size[0]/2), parseInt(size[1]/2)];
		}
	    
	    var imgObj = {
	    	url : imgurl,
	    	size : size,
			anchor: anchor
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
		
		return urlParams;
		
	},

	markerIsInRectangle: function(marker, rectangle){
		if (rectangle["right"] > marker.longitude && rectangle["left"] < marker.longitude && rectangle["top"] > marker.latitude && rectangle["bottom"] < marker.latitude) {
			return true;
		}
		else {
			return false;
		}
	},

	getViewportMarkerCount: function(){
		var viewport = this.getViewport();
		var totalCount = 0;
		for (var i=0; i<this.markerList.length; i++){
			var marker = this.markerList[i];
			if (viewport["left"] > viewport["right"]) {
				
				var viewport_part1 = {"left": viewport["left"], "top": viewport["top"], "right": 180, "bottom": viewport["bottom"]},
					viewport_part2 = {"left": -180, "top": viewport["top"], "right": viewport["right"], "bottom": viewport["bottom"]};

				if ( this.markerIsInRectangle(marker, viewport_part1) || this.markerIsInRectangle(marker, viewport_part2) ){
					totalCount += marker.count;
				}
			}
			else {
				if ( this.markerIsInRectangle(marker, viewport) ){
					totalCount += marker.count;
				}
			}
		}
		return totalCount;
	},

	loadStart : function(){},
	loadEnd : function(){},

	api : {

		"google" : {

			default_settings : {
				"mapTypeId" : "HYBRID"
			},

			initialize : function(){
			
				var googleOptions = {
					zoom: this.zoom,
					scrollwheel: false,
					center: new google.maps.LatLng(this.center[0], this.center[1]),
					mapTypeId: google.maps.MapTypeId[this.MapTypeId]
				}
		
				this.map = new google.maps.Map(document.getElementById(this.mapdiv_id), googleOptions);
				
				if (this.autostart == true){
					this.startClustering();
				}
				
			},

			startClustering : function(){
				var clusterer = this;
				var firstLoad = true;

				google.maps.event.addListener(this.map, "idle", function() {
					
					if (firstLoad === true){
						firstLoad = false;
						clusterer.cluster(true);
					}
					else {
						clusterer.cluster(false);
					}
					 
				});
				
				
				google.maps.event.addListener(this.map, "zoom_changed", function() {
					 clusterer.removeAllMarkers();
				});
			},

			setMap : function(lng, lat){
			
				var zoom = this.map.getZoom();
				zoom = zoom + 3;
				this.zoom = zoom;
				var center = new google.maps.LatLng(lat,lng);
				this.map.setCenter(center, zoom);
				this.map.setZoom(zoom);
			
			},

			add_marker_click_listener : function(marker, count){
				var clusterer = this;

				if (clusterer.zoom >= 13 || count <= 3) {
					google.maps.event.addListener(marker, "click", function() {
						clusterer.markerFinalClickFunction(this);
					});
				}
			
				else {
					google.maps.event.addListener(marker, "click", function() {
						clusterer.markerClickFunction(this);
					});
				}
			},
		
			drawMarker : function(clusterer, cluster){
			
				var center = new google.maps.LatLng(cluster["center"]["y"], cluster["center"]["x"]);
				var count = cluster["count"];
				var pinimg = cluster["pinimg"];
				var ids = cluster["ids"];
			
				var piniconObj = clusterer.selectPinIcon(cluster);
				
				var pinicon = piniconObj.url;
			
				var marker = new google.maps.Marker({
				    position: center,
				    latitude: center.lat(),
					longitude: center.lng(),
				    map: clusterer.map,
				    count: count,
				    icon: pinicon,
					geojson: cluster.geojson,
				    ids: ids
				});

				clusterer.markerList.push(marker);
			
				clusterer.add_marker_click_listener(marker, count);
			
			},
			
			drawMarkerExactCount : function(clusterer, cluster){
			
				var center = new google.maps.LatLng(cluster["center"]["y"], cluster["center"]["x"]);
				var count = cluster["count"];
				var pinimg = cluster["pinimg"];
				var ids = cluster["ids"];
				
				var marker = new clusterMarker(center, count, clusterer.map, ids);

				clusterer.markerList.push(marker);
			
				clusterer.add_marker_click_listener(marker, count);
			
			},
			
			drawCell : function(clusterer, cluster){
				
				var geojson = {
					"type": "Feature",
					"count": cluster.count,
					"geometry": JSON.parse(cluster.geojson),
					"properties": {"count": cluster.count}
				}

				clusterer.map.data.addGeoJson(geojson);
			
			},

			post_clustering : function(){
				this.paintGridColors();
			},

			paintGridColors : function(){
			
				var clusterer = this;

				var setColorStyleFn = function(feature) {

					var count = feature.getProperty("count");
					var rounded_count = roundMarkerCount(count);				

				  	return {
						  fillColor: gridColorValues[rounded_count],
						  strokeWeight: 0
					};

				}
				
				this.map.data.setStyle(setColorStyleFn);
				
			},

			getZoom : function(){
				return this.map.getZoom();
			},

			getViewport : function(){
				var viewport = this.map.getBounds();

				var viewport_json = {
					"left" : viewport.getSouthWest().lng(),
					"top" : viewport.getNorthEast().lat(),
					"right" : viewport.getNorthEast().lng(),
					"bottom" : viewport.getSouthWest().lat()
				};

				return viewport_json;
			},

			removeAllMarkers : function(){

				var clusterer = this;
				
				for (var i=0; i<this.markerList.length; i+=1){
					this.markerList[i].setMap(null);
				}
				if (typeof(this.map.data) == "object"){
					this.map.data.forEach(function(feature){
						clusterer.map.data.remove(feature);
					});
				}
				
				this.clearMarkers = false;
				this.markerList.length = 0;
				
			}

		},

		"leaflet" : {

			default_settings : {
				"layers": {
					"streets" : L.tileLayer("https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png",
						{
							attribution: "&copy; OpenStreetMap, Tiles courtesy of Humanitarian OpenStreetMap Team",
							subdomains: "ab"
						}
					),
					"satellite" : L.layerGroup([
						L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
							{
								attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
								maxZoom: 20,
								maxNativeZoom: 18
							}
						),
						L.tileLayer('http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.{ext}',
							{
								attribution: 'Map tiles by Stamen Design, CC BY 3.0 &mdash; Map data &copy; OpenStreetMap',
								subdomains: 'abcd',
								minZoom: 0,
								maxNativeZoom: 18,
								maxZoom: 20,
								ext: 'png'
							}	
						)
					])
				}
			},

			initialize : function(){

				var map = L.map(this.mapdiv_id, {
					center: this.center,
					zoom: this.zoom,
					scrollWheelZoom: false,
					layers: this.api_settings["layers"]["streets"]
				});

				L.control.layers(this.api_settings["layers"], {}, {"position":"topright"}).addTo(map);


				var markerLayers = L.layerGroup().addTo(map);
				map.markerLayers = markerLayers;


				// support geojson for grid cluster
				var geoJsonLayers = L.layerGroup().addTo(map);
				map.geoJsonLayers = geoJsonLayers;

				this.map = map;
				
				if (this.autostart == true){
					this.startClustering();
				}
			},

			startClustering : function(){

				var firstLoad = true;
				var clusterer = this;

				clusterer.cluster(true);

				this.map.addEventListener("moveend", function(event){
					clusterer.cluster(false);
				});
				
				
				this.map.addEventListener("zoomend", function(event) {
					 clusterer.removeAllMarkers();
				});

			},

			getViewport : function(){
				var viewport = this.map.getBounds();
				var viewport_json = {
					"left" : viewport.getSouthWest().lng,
					"top" : viewport.getNorthEast().lat,
					"right" : viewport.getNorthEast().lng,
					"bottom" : viewport.getSouthWest().lat
				};
				return viewport_json;
			},

			getZoom : function(){
				return this.map.getZoom();
			},

			add_marker_click_listener : function(marker, count){

				var clusterer = this;

				if (clusterer.zoom >= 13 || count <= 3) {
					marker.on("click", function(event) {
						clusterer.markerFinalClickFunction(this);
					});
				}
			
				else {
					marker.on("click", function(event) {
						clusterer.markerClickFunction(this);
					});
				}
			},

			drawMarkerOnMap : function(cluster, clusterIcon){
				
				var clusterer = this;

				var latLng = L.latLng(cluster["center"]["y"], cluster["center"]["x"]);

				var count = cluster["count"];
				var pinimg = cluster["pinimg"];
				
				var marker_options = {
					icon : clusterIcon
				};

				var marker = L.marker(latLng, marker_options);

				// add properties required by anycluster to marker
				marker.latitude = latLng.lat;
				marker.longitude = latLng.lng;
				marker.count = count;

				if (cluster.hasOwnProperty("ids")){
					marker.ids = cluster["ids"];
				}
		
				if (cluster.hasOwnProperty("geojson")){
					var geojson = {
						"type": "Feature",
						"count": count,
						"geometry": JSON.parse(cluster.geojson),
						"properties": {"count": count}
					};
					marker.geojson = geojson;
				}

				clusterer.add_marker_click_listener(marker, count);

				marker.addTo(clusterer.map.markerLayers);

				clusterer.markerList.push(marker);
			},

			drawMarker : function(clusterer, cluster){
			
				var count = cluster["count"];
				var pinimg = cluster["pinimg"];
				

				// get the correct icon
				var piniconObj = clusterer.selectPinIcon(cluster);

				// create a leaflet icon
				var clusterIcon = L.icon({
					iconUrl: piniconObj.url,
					iconSize: piniconObj.size,
					iconAnchor: piniconObj.anchor
				});

				clusterer.drawMarkerOnMap(cluster, clusterIcon);
			
			},
			
			drawMarkerExactCount : function(clusterer, cluster){

				var count = cluster['count'];
				var pinimg = cluster['pinimg'];

				var piniconObj = clusterer.selectPinIcon(cluster);

				// exact count needs "marker with text"

				var clusterIcon = L.divIcon({
					html : '<div class="clusterMarkerText exactCountCluster" style="background-image:url('  + piniconObj.url + ');"><div>' + count + '</div></div>',
					iconSize: piniconObj.size,
					iconAnchor: piniconObj.anchor
				});

				clusterer.drawMarkerOnMap(cluster, clusterIcon);
			
			},

			setMap : function(lng, lat){

				var center = L.latLng(lat, lng);
			
				var zoom = this.map.getZoom();
				zoom = zoom + 3;
				this.zoom = zoom;

				// setView(<LatLng> center, <Number> zoom, <Zoom/pan options> options?)

				this.map.setView(center, zoom);

			},

			removeAllMarkers : function(){

				// remove all the markers in one go
				this.map.markerLayers.clearLayers();

				if (this.map.hasOwnProperty("geoJsonLayers")){
					this.map.geoJsonLayers.clearLayers();
				}
				
				this.clearMarkers = false;
				this.markerList.length = 0;
				
			},

			drawCell : function(clusterer, cluster){
				
				var count = cluster.count;
				var latLng = L.latLng(cluster["center"]["y"], cluster["center"]["x"]);
				
				var geojson = {
					"type": "Feature",
					"count": count,
					"geometry": JSON.parse(cluster.geojson),
					"properties": {"count": cluster.count}
				};


				var rounded_count = roundMarkerCount(count);				

			  	var fillColor = gridColorValues[rounded_count];
				var strokeWeight = 0;

				var cell = L.geoJSON(geojson, {
					style: function (feature) {
						return {
							color: fillColor,
							stroke: false
						};
					}
				});

				// add properties required by anycluster to marker
				cell.latitude = latLng.lat;
				cell.longitude = latLng.lng;
				cell.count = count;
				cell.geojson = geojson;

				clusterer.add_marker_click_listener(cell, count);

				cell.addTo(clusterer.map.geoJsonLayers);
			
			},

			post_clustering : function(){
			}

		}
	}
	
}


// also used by anycluster_marker.js
var roundMarkerCount = function(count){

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
		count = 10000;
	}

	return count;
};
