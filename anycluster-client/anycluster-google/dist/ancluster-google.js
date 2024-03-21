import {IconType as $hgUW1$IconType, AnyclusterClient as $hgUW1$AnyclusterClient, ClusterMethod as $24b0c9e43d90857a$re_export$ClusterMethod} from "anycluster-client";
import {Loader as $hgUW1$Loader} from "@googlemaps/js-api-loader";



class $24b0c9e43d90857a$export$bdd7c550c60f19cc extends (0, $hgUW1$AnyclusterClient) {
    constructor(apiKey, map, apiUrl, markerFolderPath, settings){
        const loader = new (0, $hgUW1$Loader)({
            apiKey: apiKey,
            version: "monthly",
            libraries: [
                "marker",
                "drawing"
            ]
        });
        loader.load().then((google)=>{
            this.google = google;
        }).catch((e)=>{
        // do something
        });
        super(map, apiUrl, markerFolderPath, settings);
        this.currentZoom = this.getZoom();
    }
    removeArea() {
        this.map.data.forEach((feature)=>{
            this.map.data.remove(feature);
        });
    }
    addArea(geojson) {
        this.map.data.addGeoJson(geojson);
    }
    createClusterLayers() {
        this.map.data.setStyle((feature)=>{
            if (feature.getProperty("clustertype") == "cell") {
                const roundedCount = this.roundMarkerCount(feature.getProperty("count"));
                const fillColor = this.gridStrokeColors[roundedCount];
                const strokeColor = this.gridStrokeColors[roundedCount];
                const strokeWeight = 1;
                const style = {
                    "fillColor": fillColor,
                    //"fillOpacity": .5,
                    "strokeWeight": strokeWeight,
                    "strokeColor": strokeColor
                };
                return style;
            }
        });
        this.map.data.addListener("click", (event)=>{
            const feature = event.feature;
            if (feature.clustertype == "cell" || feature.clustertype == "marker") {
                let zoom = this.getZoom();
                if (zoom >= this.maxZoom || feature.count == 1) this.onMarkerFinalClick(feature);
                else this.markerClickFunction(feature.x, feature.y);
            }
        });
    }
    createAreaLayer() {}
    getMarkerIcon(cluster) {
        // get the correct icon
        const piniconObj = this.selectPinIcon(cluster);
        const iconSize = new this.google.maps.Size(piniconObj.size[0], piniconObj.size[1]);
        const anchor = new this.google.maps.Point(piniconObj.anchor[0], piniconObj.anchor[1]);
        const markerIcon = {
            "url": piniconObj.url,
            "size": iconSize,
            "anchor": anchor
        };
        return markerIcon;
    }
    _getSingleMarker(cluster) {
        const markerIcon = this.getMarkerIcon(cluster);
        const markerOptions = {
            "map": this.map,
            "position": {
                "lat": cluster.center.y,
                "lng": cluster.center.x
            },
            "icon": markerIcon
        };
        if (this.iconType === (0, $hgUW1$IconType).exact && cluster.count > 1) markerOptions.label = {
            text: cluster.count.toString(),
            color: "#FFF",
            fontWeight: "bold"
        };
        const marker = new this.google.maps.Marker(markerOptions);
        return marker;
    }
    _drawSingleMarker(marker) {
        this.addMarkerClickListener(marker);
        this.markerList.push(marker);
    }
    drawKmeansMarker(cluster) {
        let marker = this._getSingleMarker(cluster);
        marker = this.setMarkerProps(marker, cluster);
        this._drawSingleMarker(marker);
    }
    drawGridMakrer(cluster) {
        let marker = this._getSingleMarker(cluster);
        marker = this.setCellProps(marker, cluster);
        this._drawSingleMarker(marker);
    }
    drawCell(cluster) {
        const count = cluster.count;
        if (count == 1) this.drawGridMarker(cluster);
        else {
            const geojson = {
                "type": "Feature",
                "geometry": cluster.geojson,
                "properties": {
                    "clustertype": "cell",
                    "x": cluster.center.x,
                    "y": cluster.center.y,
                    "count": count,
                    "geojson": cluster.geojson
                }
            };
            const cell = this.map.data.addGeoJson(geojson)[0];
            cell.x = cluster.center.x;
            cell.y = cluster.center.y;
            cell.count = count;
            cell.geojson = geojson;
            cell.clustertype = "cell";
        }
    }
    removeAllMarkers() {
        for(let i = 0; i < this.markerList.length; i++)this.markerList[i].setMap(null);
        this.map.data.forEach((feature)=>{
            if (feature.clustertype == "cell") this.map.data.remove(feature);
        });
        this.markerList.length = 0;
    }
    addMapEventListeners() {
        this.map.addListener("tilesloaded", ()=>this.getClusters());
        this.map.addListener("zoom_changed", ()=>{
            this.removeAllMarkers();
            this.getClusters();
        });
    }
    getViewport() {
        const latLngBounds = this.map.getBounds();
        const northEast = latLngBounds.getNorthEast();
        const southWest = latLngBounds.getSouthWest();
        const viewport = {
            "left": southWest.lng(),
            "right": northEast.lng(),
            "top": northEast.lat(),
            "bottom": southWest.lat()
        };
        return viewport;
    }
    getZoom() {
        return this.map.getZoom();
    }
    setZoom(zoom) {
        this.map.setZoom(zoom);
    }
    setMap(x, y, zoom) {
        const mapOptions = {
            "center": {
                lat: y,
                lng: x
            },
            "zoom": zoom
        };
        this.map.setOptions(mapOptions);
    }
    addMarkerClickListener(marker) {
        const zoom = this.getZoom();
        if (zoom >= 13 || marker.count == 1) marker.addListener("click", (event)=>{
            this.onMarkerFinalClick(marker);
        });
        else marker.addListener("click", (event)=>{
            this.markerClickFunction(marker.x, marker.y);
        });
    }
}




export {$24b0c9e43d90857a$re_export$ClusterMethod as ClusterMethod, $24b0c9e43d90857a$export$bdd7c550c60f19cc as AnyclusterGoogle};
//# sourceMappingURL=ancluster-google.js.map
