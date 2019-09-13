// set cluster images depending on count here
var anyclusterImages = {
	5 : '/static/anycluster/images/5_empty.png',
	10: '/static/anycluster/images/10_empty.png',
	50: '/static/anycluster/images/50_empty.png',
	100: '/static/anycluster/images/100_empty.png',
	1000: '/static/anycluster/images/1000_empty.png',
	10000: '/static/anycluster/images/10000_empty.png'
}


var imageSizes = {
	5:30,
	10:30,
	50:40,
	100:40,
	1000:50,
	10000:60
};

if ("google" in window){

	/** @constructor */
	function clusterMarker(latlng, count, map, ids) {

		// Initialize all properties.
		this.center = latlng;
		this.longitude = latlng.lng();
		this.latitude = latlng.lat();
		this.ids = ids;
		this.count = count;
		this.rounded_count = roundMarkerCount(count);
		this.map_ = map;
		this.size = imageSizes[this.rounded_count];

		// Define a property to hold the image's div. We'll
		// actually create this div upon receipt of the onAdd()
		// method so we'll leave it null for now.
		this.div_ = null;

		// Explicitly call setMap on this overlay.
		this.setMap(map);

	};

	clusterMarker.prototype = new google.maps.OverlayView();

	/**
	 * onAdd is called when the map's panes are ready and the overlay has been
	 * added to the map.
	 */
	clusterMarker.prototype.onAdd = function() {

		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.width = this.size  + "px";
		div.style.height = this.size + "px";
		div.style.textAlign = "center";
		div.style.lineHeight = this.size + "px";
		div.style.background = "url('" + anyclusterImages[this.rounded_count] + "')";


		var labelDiv = document.createElement('div');
		labelDiv.className = "clusterMarkerText cluster-" + this.rounded_count;
		labelDiv.textContent = this.count;
		div.appendChild(labelDiv);

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

		// We use center minus offsets
		// coordinates of the overlay to peg it to the correct position and size.
		// To do this, we need to retrieve the projection from the overlay.
		var overlayProjection = this.getProjection();

		// Transform the center into pixel position on map
		var pos = overlayProjection.fromLatLngToDivPixel(this.center);

		// Resize the image's div to fit the indicated dimensions.
		var div = this.div_;

		var xOffset = this.size/2;
		var yOffset = this.size/2;

		var x = pos.x - xOffset;
		var y = pos.y - yOffset

		div.style.left = x + 'px';
		div.style.top = y + 'px';

	};

	// The onRemove() method will be called automatically from the API if
	// we ever set the overlay's map property to 'null'.

	clusterMarker.prototype.onRemove = function() {
		this.div_.parentNode.removeChild(this.div_);
		this.div_ = null;
	};

}
