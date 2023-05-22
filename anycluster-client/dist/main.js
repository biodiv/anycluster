function e(e,t,r,s){Object.defineProperty(e,t,{get:r,set:s,enumerable:!0,configurable:!0})}let t;var r;let s;var i;let o;var a;let n;var l;let h;var d;e(module.exports,"ClusterMethod",(()=>s)),e(module.exports,"GeometryType",(()=>o)),e(module.exports,"IconType",(()=>n)),e(module.exports,"SRIDS",(()=>t)),e(module.exports,"Operators",(()=>g)),e(module.exports,"Anycluster",(()=>y)),e(module.exports,"AnyclusterClient",(()=>k)),(r=t||(t={})).EPSG4326="EPSG:4326",r.EPSG3857="EPSG:3857",(i=s||(s={})).kmeans="kmeans",i.grid="grid",(a=o||(o={})).viewport="viewport",a.area="area",(l=n||(n={})).exact="exact",l.rounded="rounded",(d=h||(h={}))[d.grid=64]="grid",d[d.kmeans=150]="kmeans";const m={1:[24,39],5:[30,30],10:[30,30],50:[40,40],100:[40,40],1e3:[50,50],1e4:[60,60]};let g;var c;(c=g||(g={})).in="in",c.notIn="not in",c.equals="=",c.unEquals="!=",c.largerThan=">=",c.smallerThan="<=",c.startswith="startswith",c.contains="contains";const u=Object.freeze({minX:-179,maxX:179,minY:-89,maxY:89}),p=Object.freeze({minX:-20037500,maxX:20037500,minY:-20048960,maxY:20048960});class y{constructor(e,r,s){if(this.apiUrl=e,this.gridSize=r,this.srid=s,this.srid==t.EPSG4326)this.maxBounds=u;else{if(this.srid!=t.EPSG3857)throw new Error(`invalid srid given: ${this.srid} `);this.maxBounds=p}}async getGridCluster(e,t){const r=`${this.apiUrl}grid/${e}/${this.gridSize}/`;return await this.post(r,t)}async getKmeansCluster(e,t){const r=`${this.apiUrl}kmeans/${e}/${this.gridSize}/`;return await this.post(r,t)}async getKmeansClusterContent(e,t){const r=`${this.apiUrl}get-kmeans-cluster-content/${e}/${this.gridSize}/`;return await this.post(r,t)}async getDatasetContent(e,t){const r=`${this.apiUrl}get-dataset-content/${e}/${this.gridSize}/${t}/`;return await this.get(r)}getAreaContent(){}viewportToGeoJSON(e){const t=Math.max(e.left,this.maxBounds.minX),r=Math.min(e.right,this.maxBounds.maxX),s=Math.min(e.top,this.maxBounds.maxY),i=Math.max(e.bottom,this.maxBounds.minY);return{type:"Feature",geometry:{type:"Polygon",coordinates:[[[t,s],[r,s],[r,i],[t,i],[t,s]]],crs:{type:"name",properties:{name:this.srid}}}}}async post(e,t){const r=encodeURI(e),s={method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"},mode:"cors",credentials:"include"},i=await fetch(r,s),o=await i.json();if(i.ok)return o;throw new Error(JSON.stringify(o))}async get(e){const t=encodeURI(e),r=await fetch(t,{method:"GET",headers:{"Content-Type":"application/json"},mode:"cors",credentials:"include"}),s=await r.json();if(r.ok)return s;throw new Error(JSON.stringify(s))}}const w={5:"rgba(255, 192, 203, .5)",10:"rgba(240, 128, 128, .5)",50:"rgba(255, 127, 80, .5)",100:"rgba(255, 165, 0, .5)",1e3:"rgba(255, 69, 0, .5)",1e4:"rgba(255, 0 , 0, .5)"},C={5:"pink",10:"lightcoral",50:"coral",100:"orange",1e3:"orangered",1e4:"red"};class k{constructor(e,r,i,a){this.map=e,this.apiUrl=r,this.markerFolderPath=i,this.filters=[],this.map=e,this.apiUrl=r,this.markerFolderPath=i,a=a||{},this.srid=a.srid?a.srid:t.EPSG4326,this.kmeansGridSize=a.gridGridSize?a.gridGridSize:h.kmeans,this.gridGridSize=a.gridGridSize?a.gridGridSize:h.grid,this.clusterMethod=a.clusterMethod?a.clusterMethod:s.kmeans,this.geometryType=a.geometryType?a.geometryType:o.viewport,this.area=a.area?a.area:null,this.iconType=a.iconType?a.iconType:n.rounded,this.onFinalClick=a.onFinalClick?a.onFinalClick:this._onFinalClick,this.singlePinImages=a.singlePinImages?a.singlePinImages:{},this.markerImageSizes=a.markerImageSizes?a.markerImageSizes:m,this.gridFillColors=a.gridFillColors?a.gridFillColors:w,this.gridStrokeColors=a.gridStrokeColors?a.gridStrokeColors:C,this.area&&this.setArea(this.area);const l=this.getGridSize();this.anycluster=new y(this.apiUrl,l,this.srid),this.createClusterLayers(),this.markerList=[],this.startClustering()}createClusterLayers(){throw new Error("NotImplementedError: createClusterLayers")}addArea(e){throw new Error("NotImplementedError: addArea")}removeArea(){throw new Error("NotImplementedError: removeArea")}removeAllMarkers(){throw new Error("NotImplementedError: removeAllMarkers")}getZoom(){throw new Error("NotImplementedError: getZoom")}setMap(e,t,r){throw new Error("NotImplementedError: setMap")}getViewport(){throw new Error("NotImplementedError: setMap")}addMapEventListeners(){throw new Error("NotImplementedError: addMapEventListeners")}drawMarker(e){throw new Error("NotImplementedError: drawMarker")}drawCell(e){throw new Error("NotImplementedError: drawCell")}getAreaContent(e){throw new Error("NotImplementedError: getAreaContent")}getGridSize(){return this.clusterMethod==s.grid?this.gridGridSize:this.kmeansGridSize}setClusterMethod(e){e==s.grid&&(this.area=null,this.geometryType=o.viewport,this.removeArea()),this.removeAllMarkers(),this.clusterMethod=e;const t=this.getGridSize();this.anycluster=new y(this.apiUrl,t,this.srid),this.markerList=[],this.getClusters(!0)}setArea(e){this.area=e,this.removeArea(),null==e?(this.geometryType=o.viewport,this.setClusterMethod(s.kmeans)):(this.addArea(e),this.geometryType=o.area,this.setClusterMethod(s.kmeans))}getSinglePinImageURL(e){const t=e.pinimg;let r=`${this.markerFolderPath}pin_unknown.png`;return this.singlePinImages&&t&&t in this.singlePinImages&&(r=this.singlePinImages[t]),r}selectPinIcon(e){const t=e.count;let r=this.getSinglePinImageURL(e),s="1";t>1e4?s="10000":t>1e3?s="1000":t>100?s="100":t>50?s="50":t>10?s="10":t>1&&(s="5"),t>1&&(r=this.iconType==n.exact?`${this.markerFolderPath}${s}_empty.png`:`${this.markerFolderPath}${s}.png`);const i=this.markerImageSizes[s];let o=[Math.round(i[0]/2),i[1]-1],a=[.5,1];t>1&&(o=[Math.round(i[0]/2),Math.round(i[1]/2)],a=[.5,.5]);return{url:r,size:i,anchor:o,relativeAnchor:a,popupAnchor:[0,8-Math.round(i[1])]}}setMarkerProps(e,t){return e.x=t.center.x,e.y=t.center.y,e.count=t.count,t.hasOwnProperty("ids")&&(e.ids=t.ids),t.hasOwnProperty("id")&&(e.id=t.id),t.hasOwnProperty("geojson")&&(e.geojson=t.geojson),e}markerClickFunction(e,t){this.removeAllMarkers();let r=this.getZoom();r+=3,this.setMap(e,t,r)}async onMarkerFinalClick(e){const t=this.getZoom(),r=e.x,i=e.y,o=e.ids;if(this.clusterMethod==s.kmeans){const s={geometry_type:this.geometryType,input_srid:this.srid,x:r,y:i,ids:o,filters:this.filters},a=await this.anycluster.getKmeansClusterContent(t,s);this.onFinalClick(e,a)}else if(this.clusterMethod=s.grid)if(1==e.count){const r=await this.anycluster.getDatasetContent(t,e.id);this.onFinalClick(e,r)}else{const t=e.geojson,r=await this.getAreaContent(t);this.onFinalClick(e,r)}}roundMarkerCount(e){return e=1==e?1:e<=5?5:e<=10?10:e<=50?50:e<=100?100:e<=1e3?1e3:1e4}getClusterGeometry(){let e;if(this.geometryType==o.viewport){const t=this.getViewport();e=this.anycluster.viewportToGeoJSON(t)}else{if(this.geometryType!=o.area||!this.area)throw new Error("No cluster geometry found");e=this.area}return e}async getClusters(e=!1){const t=this.getClusterGeometry(),r={output_srid:this.srid,geometry_type:this.geometryType,geojson:t,clear_cache:e,filters:this.filters},i=this.getZoom();if(this.clusterMethod==s.kmeans){const e=await this.anycluster.getKmeansCluster(i,r);e.length>0&&e.forEach((e=>{this.drawMarker(e)}))}else{if(this.clusterMethod!=s.grid)throw new Error(`Invalid clusterMethod: ${this.clusterMethod}`);{const e=await this.anycluster.getGridCluster(i,r);e.length>0&&e.forEach((e=>{this.drawCell(e)}))}}}startClustering(){this.getClusters(!0),this.addMapEventListeners()}_onFinalClick(e,t){alert(JSON.stringify(t))}filtersAreEqual(e,t){return e.column==t.column&&e.value==t.value&&e.operator==t.operator}filter(e,t){Array.isArray(e)?this.filters=e:this.filters=[e],this.postFilterChange(t)}addFilter(e,t){let r=!1;for(let t=0;t<this.filters.length;t++){let s=this.filters[t];if(this.filtersAreEqual(e,s)){r=!0;break}}r||this.filters.push(e),this.postFilterChange(t)}addFilters(e,t){for(let t=0;t<e.length;t++){let r=e[t];this.addFilter(r,!1)}this.postFilterChange(t)}removeFilter(e,t){for(let t=0;t<this.filters.length;t++){let r=this.filters[t];if(this.filtersAreEqual(e,r)){this.filters.splice(t,1);break}}this.postFilterChange(t)}removeFilters(e,t){for(let t=0;t<e.length;t++){let r=e[t];this.removeFilter(r,!1)}this.postFilterChange(t)}resetFilters(e){this.filters=[],this.postFilterChange(e)}postFilterChange(e){0!=e&&(e=!0),1==e&&(this.removeAllMarkers(),this.getClusters(!0))}}
//# sourceMappingURL=main.js.map
