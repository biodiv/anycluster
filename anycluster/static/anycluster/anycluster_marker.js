// set cluster images depending on count here
var anyclusterImages = {
	5 : '/static/anycluster/images/5_empty.png',
	10: '/static/anycluster/images/10_empty.png',
	50: '/static/anycluster/images/50_empty.png',
	100: '/static/anycluster/images/100_empty.png',
	1000: '/static/anycluster/images/1000_empty.png',
	10000: '/static/anycluster/images/10000_empty.png'
}


/** @constructor */
function clusterMarker(latlng, count, map, ids) {

	// Initialize all properties.
	this.center = latlng;
	this.ids = ids;
	this.count_ = count;
	this.rounded_count_ = this.roundMarkerCount(count);
	this.map_ = map;

	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;

	// Explicitly call setMap on this overlay.
	this.setMap(map);

};

clusterMarker.prototype = new google.maps.OverlayView();

clusterMarker.prototype.roundMarkerCount = function(){
	var count;

	if (this.count_ == 1){
		count = 1;
	}
	else if (this.count_ <= 5) {
		count = 5;
	}
	else if (this.count_ <= 10) {
		count = 10;
	}
	else if (this.count_ <= 50) {
		count = 50;
	}
	else if (this.count_ <= 100) {
		count = 100;
	}
	else if (this.count_ <= 1000) {
		count = 1000;
	}
	else {
		count = 10000
	}

	return count;
}


/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
clusterMarker.prototype.onAdd = function() {

	var div = document.createElement('div');
	div.style.position = 'absolute';

	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = anyclusterImages[this.rounded_count_];
	div.appendChild(img);

	var labelDiv = document.createElement('div');
	labelDiv.style.textAlign = 'center';
	labelDiv.style.position = 'absolute';
	labelDiv.style.top = "0px";
	labelDiv.style.left = "0px";
	labelDiv.className = "clusterMarkerText cluster-" + this.rounded_count_;
	labelDiv.textContent = this.count_;
	div.appendChild(labelDiv)

	this.div_ = div;
	this.labelDiv_ = labelDiv;

	// Add the element to the "overlayMouseTarget" pane for making clicks possible.
	var panes = this.getPanes();
	panes.overlayMouseTarget.appendChild(div);

	// set this as locally scoped var so event does not get confused
	var me = this;

	// Add a listener - we'll accept clicks anywhere on this div, but you may want
	// to validate the click i.e. verify it occurred in some portion of your overlay.
	google.maps.event.addDomListener(div, 'click', function() {
		google.maps.event.trigger(me, 'click');
	});


};


clusterMarker.prototype.draw = function() {

	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();

	// Transform the center into pixel position on map
	var pos = overlayProjection.fromLatLngToDivPixel(this.center);

	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;

	var xOffset = this.div_.clientWidth / 2;
	var yOffset = this.div_.clientHeight / 2;

	var x = pos.x - xOffset;
	var y = pos.y - yOffset

	div.style.left = x + 'px';
	div.style.top = y + 'px';
	
	var labelDiv = this.labelDiv_;
	labelDiv.style.width = div.clientWidth + "px";
	labelDiv.style.lineHeight = div.clientHeight + "px";

};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.

clusterMarker.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
};

