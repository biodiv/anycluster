var e=require("anycluster-client"),t=require("@googlemaps/js-api-loader");function r(e,t,r,s){Object.defineProperty(e,t,{get:r,set:s,enumerable:!0,configurable:!0})}r(module.exports,"ClusterMethod",(()=>$13155a20c7fd0c4b$re_export$ClusterMethod)),r(module.exports,"AnyclusterGoogle",(()=>s));class s extends e.AnyclusterClient{constructor(e,r,s,o,a){new(0,t.Loader)({apiKey:e,version:"monthly",libraries:["marker","drawing"]}).load().then((e=>{this.google=e})).catch((e=>{})),super(r,s,o,a),this.currentZoom=this.getZoom()}removeArea(){this.map.data.forEach((e=>{this.map.data.remove(e)}))}addArea(e){this.map.data.addGeoJson(e)}createClusterLayers(){this.map.data.setStyle((e=>{if("cell"==e.getProperty("clustertype")){const t=this.roundMarkerCount(e.getProperty("count"));return{fillColor:this.gridStrokeColors[t],strokeWeight:1,strokeColor:this.gridStrokeColors[t]}}})),this.map.data.addListener("click",(e=>{const t=e.feature;if("cell"==t.clustertype||"marker"==t.clustertype){this.getZoom()>=13||1==t.count?this.onMarkerFinalClick(t):this.markerClickFunction(t.x,t.y)}}))}createAreaLayer(){}getMarkerIcon(e){const t=this.selectPinIcon(e),r=new this.google.maps.Size(t.size[0],t.size[1]),s=new this.google.maps.Point(t.anchor[0],t.anchor[1]);return{url:t.url,size:r,anchor:s}}drawMarker(e){const t=this.getMarkerIcon(e),r={map:this.map,position:{lat:e.center.y,lng:e.center.x},icon:t};let s=new this.google.maps.Marker(r);s=this.setMarkerProps(s,e),this.addMarkerClickListener(s),this.markerList.push(s)}drawCell(e){const t=e.count;if(1==t)this.drawMarker(e);else{const r={type:"Feature",geometry:e.geojson,properties:{clustertype:"cell",x:e.center.x,y:e.center.y,count:t,geojson:e.geojson}},s=this.map.data.addGeoJson(r)[0];s.x=e.center.x,s.y=e.center.y,s.count=t,s.geojson=r,s.clustertype="cell"}}removeAllMarkers(){for(let e=0;e<this.markerList.length;e++)this.markerList[e].setMap(null);this.map.data.forEach((e=>{"cell"==e.clustertype&&this.map.data.remove(e)})),this.markerList.length=0}addMapEventListeners(){this.map.addListener("dragend",(()=>this.getClusters())),this.map.addListener("zoom_changed",(()=>{this.removeAllMarkers(),this.getClusters()}))}getViewport(){const e=this.map.getBounds(),t=e.getNorthEast(),r=e.getSouthWest();return{left:r.lng(),right:t.lng(),top:t.lat(),bottom:r.lat()}}getZoom(){return this.map.getZoom()}setZoom(e){this.map.setZoom(e)}setMap(e,t,r){const s={center:{lat:t,lng:e},zoom:r};this.map.setOptions(s)}addMarkerClickListener(e){this.getZoom()>=13||1==e.count?e.addListener("click",(t=>{this.onMarkerFinalClick(e)})):e.addListener("click",(t=>{this.markerClickFunction(e.x,e.y)}))}}
//# sourceMappingURL=main.js.map
