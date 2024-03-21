var e=require("anycluster-client"),r=require("leaflet");function t(e,r,t,a){Object.defineProperty(e,r,{get:t,set:a,enumerable:!0,configurable:!0})}t(module.exports,"ClusterMethod",()=>$daa68199c6ecee0a$re_export$ClusterMethod),t(module.exports,"AnyclusterLeaflet",()=>a);class a extends e.AnyclusterClient{constructor(e,r,t,a){super(e,r,t,a),this.currentZoom=this.getZoom()}removeArea(){this.map.hasOwnProperty("areaLayer")&&this.map.areaLayer.clearLayers()}addArea(e){this.map.hasOwnProperty("areaLayer")||this.createAreaLayer(),r.geoJSON(e,{style:{color:"red"}}).addTo(this.map.areaLayer)}createClusterLayers(){let e=r.layerGroup().addTo(this.map);this.map.kmeansLayer=e;let t=r.layerGroup().addTo(this.map);this.map.gridClusterLayer=t}createAreaLayer(){let e=r.layerGroup().addTo(this.map);this.map.areaLayer=e}getMarkerIcon(t){let a=this.selectPinIcon(t);return this.iconType===e.IconType.exact&&t.count>1?r.divIcon({className:"",html:`<div style="display:flex;align-items:center;justify-content:center;color:#FFF;font-weight:bold;fonts-size:12px;width:100%;height:100%;background-image:url('${a.url}')">${t.count}</div>`,iconSize:a.size,iconAnchor:a.anchor,popupAnchor:a.popupAnchor}):r.icon({iconUrl:a.url,iconSize:a.size,iconAnchor:a.anchor,popupAnchor:a.popupAnchor})}_getLMarker(e){let t=this.getMarkerIcon(e),a=r.latLng(e.center.y,e.center.x),o=r.marker(a,{icon:t});return o}_drawLMarker(e){this.addMarkerClickListener(e),e.addTo(this.map.kmeansLayer),this.markerList.push(e)}drawKmeansMarker(e){let r=this._getLMarker(e);r=this.setMarkerProps(r,e),this._drawLMarker(r)}drawGridMarker(e){let r=this._getLMarker(e);r=this.setCellProps(r,e),this._drawLMarker(r)}drawCell(e){let t=e.count;if(1==t)this.drawGridMarker(e);else{let a=r.latLng(e.center.y,e.center.x),o={type:"Feature",count:t,geometry:e.geojson,properties:{count:t}},s=this.roundMarkerCount(t),i=this.gridFillColors[s],l=this.gridStrokeColors[s],n=r.geoJSON(o,{style:{color:l,stroke:!0,fillColor:i,weight:1,fillOpacity:1}});n.latitude=a.lat,n.longitude=a.lng,n.x=a.lng,n.y=a.lat,n.count=t,n.geojson=o,this.addMarkerClickListener(n),n.addTo(this.map.gridClusterLayer)}}removeAllMarkers(){this.map.kmeansLayer.clearLayers(),this.map.hasOwnProperty("gridClusterLayer")&&this.map.gridClusterLayer.clearLayers(),this.markerList.length=0}addMapEventListeners(){this.map.addEventListener("moveend",e=>this.getClusters()),this.map.addEventListener("zoomend",e=>this.removeAllMarkers())}getViewport(){let e=this.map.getBounds();if(e.isValid()){let r={left:e.getSouthWest().wrap().lng,top:e.getNorthEast().wrap().lat,right:e.getNorthEast().wrap().lng,bottom:e.getSouthWest().wrap().lat};return r}throw Error("invalid viewport")}getZoom(){return this.map.getZoom()}setZoom(e){this.map.setZoom(e)}setMap(e,t,a){let o=r.latLng(t,e);this.map.setView(o,a)}addMarkerClickListener(e){let r=this.getZoom();r>=this.maxZoom||1==e.count?e.on("click",r=>{this.onMarkerFinalClick(e)}):e.on("click",r=>{this.markerClickFunction(e.x,e.y)})}}
//# sourceMappingURL=main.js.map
