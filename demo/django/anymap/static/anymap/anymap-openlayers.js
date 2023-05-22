import { AnyclusterOpenLayers } from "/static/anycluster-openlayers.js";
import { MapInteractions } from "/static/anymap/map-interactions.js";

const Map = ol.Map;
const TileLayer = ol.layer.Tile;
const OSM = ol.source.OSM;
const View = ol.View;
const fromLonLat = ol.proj.fromLonLat;

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

const mapInteractions = new MapInteractions(anyclusterOpenLayers);