"use strict";

import { AnyclusterLeaflet } from "/static/anycluster-leaflet.js";

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


const singlePinImages = {
    'imperial': '/static/anycluster/pin_imperial.png',
    'stone': '/static/anycluster/pin_stone.png',
    'wild': '/static/anycluster/pin_wild.png',
    'japanese': '/static/anycluster/pin_japan.png',
    'flower': '/static/anycluster/pin_flower.png'
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