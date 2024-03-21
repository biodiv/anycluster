import {IconType as $hgUW1$IconType, AnyclusterClient as $hgUW1$AnyclusterClient, ClusterMethod as $34187c1d26cab582$re_export$ClusterMethod} from "anycluster-client";
import {geoJSON as $hgUW1$geoJSON, layerGroup as $hgUW1$layerGroup, divIcon as $hgUW1$divIcon, icon as $hgUW1$icon, latLng as $hgUW1$latLng, marker as $hgUW1$marker} from "leaflet";



class $34187c1d26cab582$export$d28c3646e727c4c9 extends (0, $hgUW1$AnyclusterClient) {
    constructor(map, apiUrl, markerFolderPath, settings){
        super(map, apiUrl, markerFolderPath, settings);
        this.currentZoom = this.getZoom();
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
        let markerIcon;
        if (this.iconType === (0, $hgUW1$IconType).exact && cluster.count > 1) markerIcon = $hgUW1$divIcon({
            className: "",
            html: `<div style="display:flex;align-items:center;justify-content:center;color:#FFF;font-weight:bold;fonts-size:12px;width:100%;height:100%;background-image:url('${piniconObj.url}')">${cluster.count}</div>`,
            iconSize: piniconObj.size,
            iconAnchor: piniconObj.anchor,
            popupAnchor: piniconObj.popupAnchor
        });
        else // create a leaflet icon
        markerIcon = $hgUW1$icon({
            iconUrl: piniconObj.url,
            iconSize: piniconObj.size,
            iconAnchor: piniconObj.anchor,
            popupAnchor: piniconObj.popupAnchor
        });
        return markerIcon;
    }
    _getLMarker(cluster) {
        const markerIcon = this.getMarkerIcon(cluster);
        const latLng = $hgUW1$latLng(cluster.center.y, cluster.center.x);
        const marker_options = {
            icon: markerIcon
        };
        const marker = $hgUW1$marker(latLng, marker_options);
        return marker;
    }
    _drawLMarker(marker) {
        this.addMarkerClickListener(marker);
        marker.addTo(this.map.kmeansLayer);
        this.markerList.push(marker);
    }
    drawKmeansMarker(cluster) {
        let marker = this._getLMarker(cluster);
        marker = this.setMarkerProps(marker, cluster);
        this._drawLMarker(marker);
    }
    drawGridMarker(cluster) {
        let marker = this._getLMarker(cluster);
        marker = this.setCellProps(marker, cluster);
        this._drawLMarker(marker);
    }
    drawCell(cluster) {
        const count = cluster.count;
        if (count == 1) this.drawGridMarker(cluster);
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
            const fillColor = this.gridFillColors[roundedCount];
            const strokeColor = this.gridStrokeColors[roundedCount];
            const strokeWeight = 1;
            const cell = $hgUW1$geoJSON(geojson, {
                style: {
                    color: strokeColor,
                    stroke: true,
                    fillColor: fillColor,
                    weight: strokeWeight,
                    fillOpacity: 1
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
        if (zoom >= this.maxZoom || marker.count == 1) marker.on("click", (event)=>{
            this.onMarkerFinalClick(marker);
        });
        else marker.on("click", (event)=>{
            this.markerClickFunction(marker.x, marker.y);
        });
    }
}




export {$34187c1d26cab582$re_export$ClusterMethod as ClusterMethod, $34187c1d26cab582$export$d28c3646e727c4c9 as AnyclusterLeaflet};
//# sourceMappingURL=anycluster-leaflet.js.map
