import {AnyclusterClient as $hgUW1$AnyclusterClient, ClusterMethod as $34187c1d26cab582$re_export$ClusterMethod} from "anycluster-client";
import {geoJSON as $hgUW1$geoJSON, layerGroup as $hgUW1$layerGroup, icon as $hgUW1$icon, latLng as $hgUW1$latLng, marker as $hgUW1$marker} from "leaflet";



const $34187c1d26cab582$var$defaultGridFillColors = {
    5: "rgba(100, 75, 80, 1)",
    10: "rgba(90, 50, 50, 1)",
    50: "rgba(100, 50, 31, 1)",
    100: "rgba(100, 65, 0, 1)",
    1000: "rgba(255, 69, 0, 1)",
    10000: "rgba(255, 0 , 0, 1)"
};
const $34187c1d26cab582$var$defaultGridStrokeColors = {
    5: "pink",
    10: "lightcoral",
    50: "coral",
    100: "orange",
    1000: "orangered",
    10000: "red"
};
class $34187c1d26cab582$export$d28c3646e727c4c9 extends (0, $hgUW1$AnyclusterClient) {
    constructor(map, apiUrl, markerFolderPath, settings){
        super(map, apiUrl, markerFolderPath, settings);
        this.currentZoom = this.getZoom();
        this.gridFillColors = settings.gridFillColors ? settings.gridFillColors : $34187c1d26cab582$var$defaultGridFillColors;
        this.gridStrokeColors = settings.gridStrokeColors ? settings.gridStrokeColors : $34187c1d26cab582$var$defaultGridStrokeColors;
    }
    removeArea() {
        if (this.map.hasOwnProperty("areaLayer")) this.map.areaLayer.clearLayers();
    }
    addArea(geojson) {
        if (!this.map.hasOwnProperty("areaLayer")) this.createAreaLayer();
        $hgUW1$geoJSON(geojson, {
            style: {
                color: "red"
            }
        }).addTo(this.map.areaLayer);
    }
    createClusterLayers() {
        const kmeansLayer = $hgUW1$layerGroup().addTo(this.map);
        this.map.kmeansLayer = kmeansLayer;
        // support geojson for grid cluster
        const gridClusterLayer = $hgUW1$layerGroup().addTo(this.map);
        this.map.gridClusterLayer = gridClusterLayer;
    }
    createAreaLayer() {
        const areaLayer = $hgUW1$layerGroup().addTo(this.map);
        this.map.areaLayer = areaLayer;
    }
    getMarkerIcon(cluster) {
        // get the correct icon
        const piniconObj = this.selectPinIcon(cluster);
        // create a leaflet icon
        const markerIcon = $hgUW1$icon({
            iconUrl: piniconObj.url,
            iconSize: piniconObj.size,
            iconAnchor: piniconObj.anchor,
            popupAnchor: piniconObj.popupAnchor
        });
        return markerIcon;
    }
    drawMarker(cluster) {
        const markerIcon = this.getMarkerIcon(cluster);
        const latLng = $hgUW1$latLng(cluster.center.y, cluster.center.x);
        const marker_options = {
            icon: markerIcon
        };
        let marker = $hgUW1$marker(latLng, marker_options);
        marker = this.setMarkerProps(marker, cluster);
        this.addMarkerClickListener(marker);
        marker.addTo(this.map.kmeansLayer);
        this.markerList.push(marker);
    }
    drawCell(cluster) {
        const count = cluster.count;
        if (count == 1) this.drawMarker(cluster);
        else {
            const latLng = $hgUW1$latLng(cluster.center.y, cluster.center.x);
            const geojson = {
                "type": "Feature",
                "count": count,
                "geometry": cluster.geojson,
                "properties": {
                    "count": count
                }
            };
            const roundedCount = this.roundMarkerCount(count);
            const fillColor = $34187c1d26cab582$var$defaultGridFillColors[roundedCount];
            const strokeWeight = 0;
            const cell = $hgUW1$geoJSON(geojson, {
                style: {
                    color: fillColor,
                    stroke: true
                }
            });
            // add properties required by anycluster to marker
            cell.latitude = latLng.lat;
            cell.longitude = latLng.lng;
            cell.x = latLng.lng;
            cell.y = latLng.lat;
            cell.count = count;
            cell.geojson = geojson;
            this.addMarkerClickListener(cell);
            cell.addTo(this.map.gridClusterLayer);
        }
    }
    removeAllMarkers() {
        // remove all the markers in one go
        this.map.kmeansLayer.clearLayers();
        if (this.map.hasOwnProperty("gridClusterLayer")) this.map.gridClusterLayer.clearLayers();
        this.markerList.length = 0;
    }
    addMapEventListeners() {
        this.map.addEventListener("moveend", (event)=>this.getClusters());
        this.map.addEventListener("zoomend", (event)=>this.removeAllMarkers());
    }
    getViewport() {
        const viewport = this.map.getBounds();
        if (viewport.isValid()) {
            const viewportJSON = {
                "left": viewport.getSouthWest().wrap().lng,
                "top": viewport.getNorthEast().wrap().lat,
                "right": viewport.getNorthEast().wrap().lng,
                "bottom": viewport.getSouthWest().wrap().lat
            };
            return viewportJSON;
        } else throw new Error("invalid viewport");
    }
    getZoom() {
        return this.map.getZoom();
    }
    setZoom(zoom) {
        this.map.setZoom(zoom);
    }
    setMap(x, y, zoom) {
        const center = $hgUW1$latLng(y, x);
        this.map.setView(center, zoom);
    }
    addMarkerClickListener(marker) {
        const zoom = this.getZoom();
        if (zoom >= 13 || marker.count == 1) marker.on("click", (event)=>{
            this.onMarkerFinalClick(marker);
        });
        else marker.on("click", (event)=>{
            this.markerClickFunction(marker.x, marker.y);
        });
    }
}




export {$34187c1d26cab582$re_export$ClusterMethod as ClusterMethod, $34187c1d26cab582$export$d28c3646e727c4c9 as AnyclusterLeaflet};
//# sourceMappingURL=ancluster-leaflet.js.map
