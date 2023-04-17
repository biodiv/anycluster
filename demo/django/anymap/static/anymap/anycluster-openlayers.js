import { ClusterMethod, AnyclusterOpenLayers } from "/static/anycluster-openlayers.js";


const Map = ol.Map;
const TileLayer = ol.layer.Tile;
const OSM = ol.source.OSM;
const View = ol.View;
const fromLonLat = ol.proj.fromLonLat

const singlePinImages = {
    'imperial': '/static/anycluster/pin_imperial.png', //optional, use in conjunction with django settings: 'ANYCLUSTER_PINCOLUMN'
    'stone': '/static/anycluster/pin_stone.png',
    'wild': '/static/anycluster/pin_wild.png',
    'japanese': '/static/anycluster/pin_japan.png',
    'flower': '/static/anycluster/pin_flower.png'
}

const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([10.329083, 47.422763]),
      zoom: 3,
      minZoom: 3,
      constrainResolution: true,
    }),
});

const apiUrl = "http://localhost:8080/anycluster/";

const settings = {
    srid: 'EPSG:3857',
    singlePinImages: singlePinImages,
    onFinalClick: function (marker, data) {
        alert(JSON.stringify(data))
    }
};

const markerFolderPath = '/static/anycluster/images/';

const anyclusterOpenLayers = new AnyclusterOpenLayers(map, apiUrl, markerFolderPath, settings);

const kmeansButton = document.getElementById("kmeans-button");
const gridButton = document.getElementById("grid-button");

kmeansButton.addEventListener("click", function (event) {
    anyclusterOpenLayers.setClusterMethod(ClusterMethod.kmeans);
});

gridButton.addEventListener("click", function (event) {
    areaButton.checked = false;
    viewportButton.checked = true;
    anyclusterOpenLayers.setClusterMethod(ClusterMethod.grid);
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
    anyclusterOpenLayers.setArea(null);
});

areaButton.addEventListener("click", function (event) {
    gridButton.checked = false;
    kmeansButton.checked = true;
    anyclusterOpenLayers.setArea(bavaria);
});