"use strict";

import { AnyclusterLeaflet } from "/static/anycluster-leaflet.js";
import { MapInteractions } from "/static/anymap/map-interactions.js";

let map = L.map('map', {
    center: [47.4, 10.3],
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

const mapInteractions = new MapInteractions(anyclusterLeaflet);