//osm and single markers need image sizes
var markerImageSizes = {
	5 : [30,30],
	10: [30,30],
	50: [40,40],
	100: [40,40],
	1000: [50,50],
	10000: [60,60],
	"pin_unknown": [24,39]
}


var Anycluster = function(mapdiv_id, mapOptions){

	var clusterer = this;
	
	this.pincount = 0;
	this.filters = {};	
	this.gridCells = [];
	this.clusterMethod = mapOptions.clusterMethod;
	this.iconType = mapOptions.iconType;
	this.gridSize = mapOptions.gridSize;
	this.mapType = mapOptions.mapType;
	this.zoom = mapOptions.zoom;
	this.clearMarkers = false;
	
	//overridable start/end functions, e.g. for showing a loading spinner
	this.loadStart = function(){};
	this.loadEnd = function(){};
	
	if (mapOptions.mapType == "google"){
	
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
		        ids: ids
		    });

		    clusterer.gridCells.push(marker);
		
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
		
			var anchor,
				icon,
				piniconObj = clusterer.selectPinIcon(count,pinimg),
				label_content;
				
			var pinicon = piniconObj.url;
			var pinsize = piniconObj.size;
				
			if (count == 1){
			
				icon = new google.maps.MarkerImage(pinicon,
					// second line defines the dimensions of the image
					new google.maps.Size(pinsize[0], pinsize[2]),
					// third line defines the origin of the custom icon
					new google.maps.Point(0,0),
					// and the last line defines the offset for the image
					new google.maps.Point(pinsize[0]/2,pinsize[1])
				);
				anchor = new google.maps.Point(4,9);
				label_content = '';
			
			}
			else if (count > 10000){
			   icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(pinsize[0], pinsize[1]),
					new google.maps.Point(0,0),
					new google.maps.Point(pinsize[0]/2, pinsize[1]/2)
				);
				anchor = new google.maps.Point(16,9);
				label_content = count;
			}

			else if (count > 1000) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(pinsize[0], pinsize[1]),
					new google.maps.Point(0,0),
					new google.maps.Point(pinsize[0]/2, pinsize[1]/2)
				);
				anchor = new google.maps.Point(12,9);
				label_content = count;
			}

			else if (count > 100) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(pinsize[0], pinsize[1]),
					new google.maps.Point(0,0),
					new google.maps.Point(pinsize[0]/2, pinsize[1]/2)
				);
				anchor = new google.maps.Point(9,9);
				label_content = count;
			}

			else if (count > 50) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(pinsize[0], pinsize[1]),
					new google.maps.Point(0,0),
					new google.maps.Point(pinsize[0]/2, pinsize[1]/2)
				);
				anchor = new google.maps.Point(6,9);
				label_content = count;
			}

			else if (count > 10) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(pinsize[0], pinsize[1]),
					new google.maps.Point(0,0),
					new google.maps.Point(pinsize[0]/2, pinsize[1]/2)
				);
				anchor = new google.maps.Point(6,9);
				label_content = count;
			}

			else {
			    icon = new google.maps.MarkerImage(pinicon,
					// second line defines the dimensions of the image
					new google.maps.Size(pinsize[0], pinsize[1]),
					// third line defines the origin of the custom icon
					new google.maps.Point(0,0),
					// and the last line defines the offset for the image
					new google.maps.Point(pinsize[0]/2, pinsize[1]/2)
				);
				anchor = new google.maps.Point(4,9);
				label_content = count;
			}
			
			var marker = new MarkerWithLabel({
				   position: center,
				   latitude: center.lat(),
				   longitude: center.lng(),
				   map: clusterer.gmap,
				   draggable: false,
				   labelContent: label_content,
				   icon: icon,
				   labelAnchor: anchor,
				   labelClass: "clusterlabels", // the CSS class for the label
				   labelInBackground: false,
				   count: count,
				   ids: ids
			});
		
			clusterer.gridCells.push(marker);
		
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
		
			var center = new google.maps.LatLng(cluster['center']['y'], cluster['center']['x']);
			var count = cluster['count'];
			var pinimg = cluster['pinimg'];
			var ids = cluster["ids"];
		
			if (count > 0) {
				var labelText = count;
								
				var boxText = document.createElement("div");
				boxText.id = "c" + i;
				boxText.position = center;
				boxText.style.cssText = "border: none;background: none;";
				boxText.innerHTML = count;
				boxText.count = count;
					
				//set opacity according to count
				var opacity;
		
				if (count <= 5 ){
					opacity = 0.2;
				}
		
				else if (count < 10) {
					opacity = 0.3;
				}
		
				else if (count < 100 ) {
					opacity = 0.4;
				}
		
				else if (count < 1000 ) {
					opacity = 0.6;
				}
		
				else {
					opacity = 0.7;
				};
			
				var offset = -clusterer.gridSize/2;

				var myOptions = {
					 content: boxText
					,boxStyle: {
					   border: "none"
					  ,background: "rgba(200, 54, 54," + opacity + ")"
					  ,textAlign: "center"
					  ,fontSize: "12pt"
					  ,fontWeight: "bold"
					  ,width: "" + clusterer.gridSize-2 +'px'
					  ,height: "" + clusterer.gridSize-2 +'px'
					  ,lineHeight: "" + clusterer.gridSize-2 +'px'
					 }
					,disableAutoPan: true
					,pixelOffset: new google.maps.Size(offset,offset)
					,position: center
					,closeBoxURL: ""
					,isHidden: false
					,pane: "floatPane"
					,enableEventPropagation: true
				};

				var gridLabel = new InfoBox(myOptions);
				gridLabel.open(clusterer.gmap);
			
				clusterer.gridCells.push(gridLabel);
			
				if (clusterer.zoom >= 13 || count <= 3) {
						
					google.maps.event.addDomListener(gridLabel.content_,'click', function() {
						  clusterer.markerFinalClickFunction(this);
						}
					);
				}
			
				else {
					google.maps.event.addDomListener(gridLabel.content_, 'click', function() {
						clusterer.markerClickFunction(this);
					});
				};
			}
		
		}
	
		this.cluster = function(cache, clusteredCB){
		
			clusterer.zoom = clusterer.gmap.getZoom();
			var viewport = clusterer.gmap.getBounds();
			var viewport_json = {'left':viewport.getSouthWest().lng(), 'top':viewport.getNorthEast().lat(), 'right':viewport.getNorthEast().lng(), 'bottom':viewport.getSouthWest().lat()};
		
			clusterer.getClusters(viewport_json, cache, clusteredCB);

		}
	
		this.initialize = function(){
		
			var googleOptions = {
				zoom: mapOptions.zoom,
				scrollwheel: false,
				center: new google.maps.LatLng(mapOptions.center[0], mapOptions.center[1]),
				mapTypeId: google.maps.MapTypeId[mapOptions.MapTypeId]
			}
	
			clusterer.gmap = new google.maps.Map(document.getElementById(mapdiv_id), googleOptions);
			
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
				 clusterer.removeMarkerCells();
			});
			
				
			if (typeof initcallback === "function") {
				initcallback();
			}
			
		}
	}
	else if (mapOptions.mapType == "osm"){
	
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
			clusterer.zoom = clusterer.omap.getZoom();
			
			var viewport = clusterer.omap.getExtent().transform(
				clusterer.omap.getProjectionObject(),
				new OpenLayers.Projection("EPSG:4326")
			).toArray(); //left, bottom, right, top
			
			var viewport_json = {'left':viewport[0], 'top':viewport[3], 'right':viewport[2], 'bottom':viewport[1]};
		
			clusterer.getClusters(viewport_json, cache, clusteredCB);
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
			
			var center = new OpenLayers.LonLat(mapOptions.center[1],mapOptions.center[0]).transform(
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
				clusterer.removeMarkerCells();
				clusterer.omap.zoomToProxy(zoom,xy); 

			};
        	
        	clusterer.cluster(true);
		
		}
	
	}
	
	
	clusterer.initialize();
	
}

Anycluster.prototype = {

	//on small markers or on final zoom, this function is launched
	markerFinalClickFunction : function(marker) {
	
		this.getClusterContent(marker, function(entries){
		
			/* put your custom final click behaviour here */
			alert(JSON.stringify(entries));
			
			
		});
	},

	markerClickFunction : function(marker) {
	
		this.removeMarkerCells();
		this.setMap(marker.longitude, marker.latitude);
		
	},

	addFilters: function(newfilters){
	
		for (var key in newfilters){
			
			if (newfilters.hasOwnProperty(key)) {
			    this.filters[key] = newfilters[key];
			}
		}

		this.clearMarkers = true;
		this.pincount = 0;
		
	},
	
	removeFilters: function(activefilters){
		
		for (i=0; i<= activefilters.length; i++){
		
			delete this.filters[ activefilters[i] ];
		}
		
		this.clearMarkers = true;
		this.pincount = 0;
		
	},
	
	removeMarkerCells : function(){
		
		if (this.mapType == "google"){
			for (var i=0; i<this.gridCells.length; i+=1){
				this.gridCells[i].setMap(null);
			}
		}
		else if (this.mapType == "osm"){
			this.markerLayer.clearMarkers();
		}
		
		this.clearMarkers = false;
		
	},
	
	getClusters : function(viewport, cache, gotClusters){
	
		var clusterer = this;
	
		if (cache === true){
			viewport['cache'] = 'load';
		}
	
		this.loadStart();
		
		var url = '/anycluster/' + this.clusterMethod + '/' + this.zoom + '/' + this.gridSize + '/?';
		
		var first = true;
		for (var key in viewport){
		
			if (first == true){
				first = false;
				url = url + key + "=" + viewport[key];
			}
			else {
				url = url + "&" + key + "=" + viewport[key];
			}
		}
		
		//if filters are given, add them to GET
		if (Object.keys(this.filters).length !== 0){
		
			for (var key in this.filters) {
				url = url + "&" + key + "=" + this.filters[key];
			}
		}
		
		//send the ajax request
		url = encodeURI(url);
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4 && xhr.status==200) {
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
				
			
				for(i=0; i<clusters.length; i++) {
					
					var cluster = clusters[i];
					clusterer.pincount = clusterer.pincount + parseInt(cluster.count);
	
					if ( cluster.count == 1) {
						clusterer.drawMarker(cluster);
					}
					else {
						clusterFunction(cluster);
					}
					
					clusterer.loadEnd();
						
					if (typeof clusteredCB === "function") {
						gotClusters();
					}
				}
				
			}
		}
		xhr.open("GET",url,true);
		xhr.send();
		
	},
	
	getClusterContent : function(cluster, gotClusterContent){
	
		var data_string = "?x=" + cluster.longitude + "&y=" + cluster.latitude;
		
		for (var i=0; i<cluster.ids.length; i++){
			data_string += "&id=" + cluster.ids[i];
		}
		
		for (var key in this.filters){
			data_string += "&" + key + "=" + this.filters[key];
		}
		
		
		var url = encodeURI('/anycluster/getClusterContent/' + this.zoom + '/' + this.gridSize + '/' + data_string);
		
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4 && xhr.status==200) {
				var data = JSON.parse(xhr.responseText);
				gotClusterContent(data);
			}
		}
		xhr.open("GET",url,true);
		xhr.send();
	
	},
	
	selectPinIcon : function(count, pinimg) {
	
		if (count == 1) {
		
			var singlePinURL = "/static/anycluster/images/pin_unknown.png";
			
			if (anyclusterSettings.singlePinImages.hasOwnProperty(pinimg)){
				singlePinURL = anyclusterSettings.singlePinImages[pinimg];
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
	
	}
	
}
