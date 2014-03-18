var Anycluster = function(mapdiv_id, mapOptions){

	var clusterer = this;
	
	//defaults
	this.pincount = 0;
	this.filters = {};	
	this.gridCells = [];
	this.clusterMethod = mapOptions.clusterMethod;
	this.iconType = mapOptions.iconType;
	this.gridSize = mapOptions.gridSize;
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
	
		this.drawMarker = function(center, count, pinimg, ids){
		
			var pinicon = clusterer.selectPinIcon(count,pinimg);
		
			var marker = new google.maps.Marker({
		        position: center,
		        map: clusterer.gmap,
		        count: count,
		        icon: pinicon,
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
		
		this.drawMarkerExactCount = function(center, count, pinimg, ids){
		
			var anchor,
				icon,
				pinicon = clusterer.selectPinIcon(count,pinimg),
				label_content;
				
			if (count == 1){
			
				icon = new google.maps.MarkerImage(pinicon,
					// second line defines the dimensions of the image
					new google.maps.Size(24, 39),
					// third line defines the origin of the custom icon
					new google.maps.Point(0,0),
					// and the last line defines the offset for the image
					new google.maps.Point(12,39)
				);
				anchor = new google.maps.Point(4,9);
				label_content = '';
			
			}
			else if (count > 10000){
			   icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(60, 60),
					new google.maps.Point(0,0),
					new google.maps.Point(30, 30)
				);
				anchor = new google.maps.Point(16,9);
				label_content = count;
			}

			else if (count > 1000) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(50, 50),
					new google.maps.Point(0,0),
					new google.maps.Point(25, 25)
				);
				anchor = new google.maps.Point(12,9);
				label_content = count;
			}

			else if (count > 100) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(40, 40),
					new google.maps.Point(0,0),
					new google.maps.Point(20, 20)
				);
				anchor = new google.maps.Point(9,9);
				label_content = count;
			}

			else if (count > 50) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(40, 40),
					new google.maps.Point(0,0),
					new google.maps.Point(20, 20)
				);
				anchor = new google.maps.Point(6,9);
				label_content = count;
			}

			else if (count > 10) {
			    icon = new google.maps.MarkerImage(pinicon,
					new google.maps.Size(30, 30),
					new google.maps.Point(0,0),
					new google.maps.Point(15, 15)
				);
				anchor = new google.maps.Point(6,9);
				label_content = count;
			}

			else {
			    icon = new google.maps.MarkerImage(pinicon,
					// second line defines the dimensions of the image
					new google.maps.Size(30, 30),
					// third line defines the origin of the custom icon
					new google.maps.Point(0,0),
					// and the last line defines the offset for the image
					new google.maps.Point(15, 15)
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
		
		this.drawCell = function(center,count,i){
		
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
		
			clusterer.getClusters(viewport_json, cache, function(clusters){
			
				for(i=0; i<clusters.length; i++) {
					var center = new google.maps.LatLng(clusters[i]['center']['y'], clusters[i]['center']['x']);
					var count = clusters[i]['count'];
					var pinimg = clusters[i]['pinimg'];
					var ids = clusters[i]["ids"];
					clusterer.pincount = clusterer.pincount + parseInt(count);
					
					if (clusterer.clusterMethod == 'grid'){
							
						if ( count == 1) {
							clusterer.drawMarker(center,count,pinimg,ids);
						}
						else {
							clusterer.drawCell(center,count,i);
						}
					}
						
					else if (clusterer.clusterMethod == 'kmeans'){
						if (clusterer.iconType == "simple"){
							clusterer.drawMarker(center,count,pinimg,ids);
						}
						else if (clusterer.iconType == "exact"){
							clusterer.drawMarkerExactCount(center,count,pinimg,ids);
						} 
					}
					
					clusterer.loadEnd();
						
					if (typeof clusteredCB === "function") {
						clusteredCB();
					}
				}
			
			});

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
		
			
		
		}
	
		this.drawMarker = function(center, count, pinimg){
		
			var pinicon = this.selectPinIcon(count);

		    var marker = new google.maps.Marker({
		        position: center,
		        map: clusterer.gmap,
		        count: count,
		        icon: '/static/anycluster/images/' + pinicon + '.png',
		    });

			//alert(pinicon);

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
		
		this.drawMarkerExactCount = function(center, count, pinimg, ids){
		}
		
		this.drawCell = function(center,count,i){
		}
	
		this.cluster = function(clusteredCB){
		}
		
		this.initialize = function(){
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
	
		for (var i=0; i<this.gridCells.length; i+=1){
			this.gridCells[i].setMap(null);
		}
		
		this.clearMarkers = false;
		
	},
	
	getClusters : function(viewport, cache, gotClusters){
	
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
				var data = JSON.parse(xhr.responseText);
				
				if (this.clearMarkers === true ){
					this.removeMarkerCells();
				}
				
				gotClusters(data);
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
			var pinicon = 'pin_unknown';
		
			if (anyclusterSettings.singlePinImages.hasOwnProperty(pinimg)){
				pinicon = anyclusterSettings.singlePinImages[pinimg];
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
	    
	    if (this.iconType == "exact"){
	    	var imgurl = "/static/anycluster/images/" + pinicon + "_empty.png"
	    }
	    else {
	    	var imgurl = "/static/anycluster/images/" + pinicon + ".png"
	    }
	    
	    return imgurl;
	
	}
	
}


