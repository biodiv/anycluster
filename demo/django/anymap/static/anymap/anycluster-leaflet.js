"use strict";

import { ClusterMethod, GeometryType, AnyclusterClient } from "/static/anymap/anycluster.js";

const gridColorValues = {
    5: "pink",
    10: "lightcoral",
    50: "coral",
    100: "orange",
    1000: "orangered",
    10000: "red"
};

const singlePinImages = {
    'imperial': '/static/anycluster/pin_imperial.png', //optional, use in conjunction with django settings: 'ANYCLUSTER_PINCOLUMN'
    'stone': '/static/anycluster/pin_stone.png',
    'wild': '/static/anycluster/pin_wild.png',
    'japanese': '/static/anycluster/pin_japan.png',
    'flower': '/static/anycluster/pin_flower.png'
}

let map = L.map('map', {
    center: [47.422763, 10.329083],
    zoom: 3,
    minZoom: 3,
    worldCopyJump: true,
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


class AnyclusterLeaflet extends AnyclusterClient {


    removeArea() {
        if (this.map.hasOwnProperty("areaLayer")) {
            this.map.areaLayer.clearLayers();
        }
    }

    addArea(geojson) {
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
        const gridClusterLayer = L.layerGroup().addTo(map);
        this.map.gridClusterLayer = gridClusterLayer;
    }

    createAreaLayer() {
        const areaLayer = L.layerGroup().addTo(map);
        this.map.areaLayer = areaLayer;
    }

    getMarkerIcon(cluster) {

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

    drawMarker(cluster) {

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

    drawCell(cluster) {

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

            const fillColor = gridColorValues[roundedCount];
            const strokeWeight = 0;

            const cell = L.geoJSON(geojson, {
                style:  {
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

        if (this.map.hasOwnProperty("gridClusterLayer")) {
            this.map.gridClusterLayer.clearLayers();
        }

        this.markerList.length = 0;

    }

    addMapEventListeners () {
        this.map.addEventListener("moveend", event => this.getClusters());
        this.map.addEventListener("zoomend", event => this.removeAllMarkers());
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
        }
        else {
            throw new Error("invalid viewport");
        }
    }

    getZoom() {
        return this.map.getZoom();
    }

    setZoom(zoom) {
        this.map.setZoom(zoom);
    }


    setMap(lng, lat, zoom) {
        const center = L.latLng(lat, lng);
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

const apiUrl = "http://localhost:8080/anycluster/";

const settings = {
    singlePinImages: singlePinImages,
    onFinalClick: function (marker, data) {
        alert(JSON.stringify(data))
    }
};

const markerFolderPath = '/static/anycluster/images/';

const anyclusterLeaflet = new AnyclusterLeaflet(map, apiUrl, markerFolderPath, settings);

const kmeansButton = document.getElementById("kmeans-button");
const gridButton = document.getElementById("grid-button");

kmeansButton.addEventListener("click", function (event) {
    anyclusterLeaflet.setClusterMethod(ClusterMethod.kmeans);
});

gridButton.addEventListener("click", function (event) {
    areaButton.checked = false;
    viewportButton.checked = true;
    anyclusterLeaflet.setClusterMethod(ClusterMethod.grid);
});

let bavaria = null;

fetch("/static/anymap/bavaria.geojson")
    .then((response) => response.json())
    .then((data) => {
        bavaria = data;
    });

const viewportButton = document.getElementById("geometry-viewport");
const areaButton = document.getElementById("geometry-area");

viewportButton.addEventListener("click", function (event) {
    anyclusterLeaflet.setArea(null);
});

areaButton.addEventListener("click", function (event) {
    gridButton.checked = false;
    kmeansButton.checked = true;
    anyclusterLeaflet.setArea(bavaria);
});