<script setup>
import { onMounted } from 'vue';
import { AnyclusterOpenLayers } from 'anycluster-openlayers';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';

onMounted( () => {
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 5,
      minZoom: 3,
      constrainResolution: true,
    }),
  });

  const apiUrl = "https://tomwork.sisol:8080/anycluster/";

  const singlePinImages = {
    'imperial': '/images/anycluster/pin_imperial.png',
    'stone': '/images/anycluster/pin_stone.png',
    'wild': '/images/anycluster/pin_wild.png',
    'japanese': '/images/anycluster/pin_japan.png',
    'flower': '/images/anycluster/pin_flower.png'
  }

  const settings = {
      srid: 'EPSG:3857',
      singlePinImages: singlePinImages,
      onFinalClick: function (marker, data) {
          alert(JSON.stringify(data))
      }
  };

  const markerFolderPath = '/images/anycluster/';

  const anyclusterOpenLayers = new AnyclusterOpenLayers(map, apiUrl, markerFolderPath, settings);

});

</script>

<template>
  <div id="box">
    <div>
      <h1>anycluster demo</h1>
    </div>
    
    <div id="map"></div>
  </div>
  
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#map {
    width: 100vw;
    border-radius: 1rem;
    aspect-ratio: 3/4;
}


@media (min-width: 640px) {

}
/* md */
@media (min-width: 768px) {

}

/* lg */
@media (min-width: 1024px) { 
  #map {
    width: 800px;
    border: .5rem solid black;
    aspect-ratio: 4/3;
  }
}

/* xl */
@media (min-width: 1280px) {

}

/* 2xl */
@media (min-width: 1536px) {

}

</style>
