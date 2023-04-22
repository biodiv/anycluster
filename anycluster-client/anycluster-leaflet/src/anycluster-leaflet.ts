import {
    AnyclusterClient,
    AnyclusterClientSettings,
    Viewport,
    Cluster,
    ClusterMethod,
    GeoJSON as IGeoJSON,
} from 'anycluster-client';

import * as  L from 'leaflet';

export {
    ClusterMethod
};

export class AnyclusterLeaflet extends AnyclusterClient {

    currentZoom: number

    constructor(map: any, apiUrl: string, markerFolderPath: string, settings: AnyclusterClientSettings) {
        super(map, apiUrl, markerFolderPath, settings);

        this.currentZoom = this.getZoom();

    }


    removeArea() {
        if (this.map.hasOwnProperty("areaLayer")) {
            this.map.areaLayer.clearLayers();
        }
    }

    addArea(geojson: IGeoJSON) {
        if (!this.map.hasOwnProperty("areaLayer")) {
            this.createAreaLayer();
        }

        L.geoJSON(geojson, {
            style: {
                color: 'red'
            }
        }).addTo(this.map.areaLayer);

    }

    createClusterLayers() {
        const kmeansLayer = L.layerGroup().addTo(this.map);
        this.map.kmeansLayer = kmeansLayer;

        // support geojson for grid cluster
        const gridClusterLayer = L.layerGroup().addTo(this.map);
        this.map.gridClusterLayer = gridClusterLayer;

    }

    createAreaLayer() {
        const areaLayer = L.layerGroup().addTo(this.map);
        this.map.areaLayer = areaLayer;

    }

    getMarkerIcon(cluster: Cluster) {

        // get the correct icon
        const piniconObj = this.selectPinIcon(cluster);

        // create a leaflet icon
        const markerIcon = L.icon({
            iconUrl: piniconObj.url,
            iconSize: piniconObj.size,
            iconAnchor: piniconObj.anchor,
            popupAnchor: piniconObj.popupAnchor
        });

        return markerIcon;

    }

    drawMarker(cluster: Cluster) {
        const markerIcon = this.getMarkerIcon(cluster);

        const latLng = L.latLng(cluster.center.y, cluster.center.x);

        const marker_options = {
            icon: markerIcon
        };

        let marker = L.marker(latLng, marker_options);

        marker = this.setMarkerProps(marker, cluster);

        this.addMarkerClickListener(marker);

        marker.addTo(this.map.kmeansLayer);

        this.markerList.push(marker);

    }

    drawCell(cluster: Cluster) {
        const count = cluster.count;

        if (count == 1) {
            this.drawMarker(cluster)
        }
        else {
            const latLng = L.latLng(cluster.center.y, cluster.center.x);

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

            const cell = L.geoJSON(geojson, {
                style: {
                    color: strokeColor,
                    stroke: true,
                    fillColor: fillColor,
                    weight: strokeWeight,
                    fillOpacity: 1,
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

        if (this.map.hasOwnProperty("gridClusterLayer")) {
            this.map.gridClusterLayer.clearLayers();
        }

        this.markerList.length = 0;


    }

    addMapEventListeners() {
        this.map.addEventListener("moveend", event => this.getClusters());
        this.map.addEventListener("zoomend", event => this.removeAllMarkers());
    }


    getViewport(): Viewport {

        const viewport = this.map.getBounds();

        if (viewport.isValid()) {
            const viewportJSON = {
                "left": viewport.getSouthWest().wrap().lng,
                "top": viewport.getNorthEast().wrap().lat,
                "right": viewport.getNorthEast().wrap().lng,
                "bottom": viewport.getSouthWest().wrap().lat
            };

            return viewportJSON;
        }
        else {
            throw new Error("invalid viewport");
        }

    }

    getZoom(): number {
        return this.map.getZoom();
    }

    setZoom(zoom: number): void {
        this.map.setZoom(zoom);
    }


    setMap(x: number, y: number, zoom: number): void {
        const center = L.latLng(y, x);
        this.map.setView(center, zoom);
    }

    addMarkerClickListener(marker) {

        const zoom = this.getZoom();

        if (zoom >= 13 || marker.count == 1) {
            marker.on("click", (event) => {
                this.onMarkerFinalClick(marker);
            });
        }

        else {
            marker.on("click", (event) => {
                this.markerClickFunction(marker.x, marker.y);
            });
        }
    }

}