function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $aca83a355307fe8a$export$55fee9ea2526ad0d;
(function(SRIDS) {
    SRIDS["EPSG4326"] = "EPSG:4326";
    SRIDS["EPSG3857"] = "EPSG:3857";
})($aca83a355307fe8a$export$55fee9ea2526ad0d || ($aca83a355307fe8a$export$55fee9ea2526ad0d = {}));
var $aca83a355307fe8a$export$ae91e066970d978a;
(function(ClusterMethod) {
    ClusterMethod["kmeans"] = "kmeans";
    ClusterMethod["grid"] = "grid";
})($aca83a355307fe8a$export$ae91e066970d978a || ($aca83a355307fe8a$export$ae91e066970d978a = {}));
var $aca83a355307fe8a$export$8f4397a63c3cef66;
(function(GeometryType) {
    GeometryType["viewport"] = "viewport";
    GeometryType["area"] = "area";
})($aca83a355307fe8a$export$8f4397a63c3cef66 || ($aca83a355307fe8a$export$8f4397a63c3cef66 = {}));
var $aca83a355307fe8a$export$13ff1290a9e22e77;
(function(IconType) {
    IconType["exact"] = "exact";
    IconType["rounded"] = "rounded";
})($aca83a355307fe8a$export$13ff1290a9e22e77 || ($aca83a355307fe8a$export$13ff1290a9e22e77 = {}));
var $aca83a355307fe8a$export$9c3a9f8fbf06a34;
(function(DefaultGridSizes) {
    DefaultGridSizes[DefaultGridSizes["grid"] = 64] = "grid";
    DefaultGridSizes[DefaultGridSizes["kmeans"] = 150] = "kmeans";
})($aca83a355307fe8a$export$9c3a9f8fbf06a34 || ($aca83a355307fe8a$export$9c3a9f8fbf06a34 = {}));
const $aca83a355307fe8a$export$96b1907ff7fa3578 = {
    1: [
        24,
        39
    ],
    5: [
        30,
        30
    ],
    10: [
        30,
        30
    ],
    50: [
        40,
        40
    ],
    100: [
        40,
        40
    ],
    1000: [
        50,
        50
    ],
    10000: [
        60,
        60
    ]
};
var $aca83a355307fe8a$export$7fa100a28fbb5fe2;
(function(Operators) {
    Operators["in"] = "in";
    Operators["notIn"] = "not in";
    Operators["equals"] = "=";
    Operators["unEquals"] = "!=";
    Operators["largerThan"] = ">=";
    Operators["smallerThan"] = "<=";
    Operators["startswith"] = "startswith";
    Operators["contains"] = "contains";
})($aca83a355307fe8a$export$7fa100a28fbb5fe2 || ($aca83a355307fe8a$export$7fa100a28fbb5fe2 = {}));
var $aca83a355307fe8a$export$9a28c02ac0f6fc9d;
(function(LogicalOperators) {
    LogicalOperators["AND"] = "AND";
    LogicalOperators["OR"] = "OR";
})($aca83a355307fe8a$export$9a28c02ac0f6fc9d || ($aca83a355307fe8a$export$9a28c02ac0f6fc9d = {}));
const $aca83a355307fe8a$export$aa170efeb32c8cf9 = 13;



const $5660b38ff962cbfe$export$2104d4dd9d4984b2 = Object.freeze({
    minX: -179,
    maxX: 179,
    minY: -89,
    maxY: 89
});
const $5660b38ff962cbfe$export$6db2f048e15a981e = Object.freeze({
    minX: -20037500,
    maxX: 20037500,
    minY: -20048960,
    maxY: 20048960 //  20048966.1
});
class $5660b38ff962cbfe$export$5e01b9ff483562af {
    constructor(apiUrl, gridSize, srid){
        this.apiUrl = apiUrl;
        this.gridSize = gridSize;
        this.srid = srid;
        if (this.srid == (0, $aca83a355307fe8a$export$55fee9ea2526ad0d).EPSG4326) this.maxBounds = $5660b38ff962cbfe$export$2104d4dd9d4984b2;
        else if (this.srid == (0, $aca83a355307fe8a$export$55fee9ea2526ad0d).EPSG3857) this.maxBounds = $5660b38ff962cbfe$export$6db2f048e15a981e;
        else throw new Error(`invalid srid given: ${this.srid} `);
    }
    validateZoom(zoom) {
        if (!Number.isInteger(zoom)) throw new Error(`[anycluster] non-integer zoom: ${zoom}`);
    }
    async getGridCluster(zoom, data) {
        this.validateZoom(zoom);
        const url = `${this.apiUrl}grid/${zoom}/${this.gridSize}/`;
        const clusters = await this.post(url, data);
        return clusters;
    }
    async getKmeansCluster(zoom, data) {
        this.validateZoom(zoom);
        const url = `${this.apiUrl}kmeans/${zoom}/${this.gridSize}/`;
        const clusters = await this.post(url, data);
        return clusters;
    }
    async getKmeansClusterContent(zoom, data) {
        this.validateZoom(zoom);
        const url = `${this.apiUrl}get-kmeans-cluster-content/${zoom}/${this.gridSize}/`;
        const clusterContent = await this.post(url, data);
        return clusterContent;
    }
    async getDatasetContent(zoom, datasetId) {
        this.validateZoom(zoom);
        const url = `${this.apiUrl}get-dataset-content/${zoom}/${this.gridSize}/${datasetId}/`;
        const clusterContent = await this.get(url);
        return clusterContent;
    }
    async getMapContentCount(zoom, data) {
        this.validateZoom(zoom);
        const url = `${this.apiUrl}get-map-content-count/${zoom}/${this.gridSize}/`;
        const mapContentCount = await this.post(url, data);
        return mapContentCount;
    }
    async getGroupedMapContents(zoom, data) {
        this.validateZoom(zoom);
        const url = `${this.apiUrl}get-grouped-map-contents/${zoom}/${this.gridSize}/`;
        const groupedMapContents = await this.post(url, data);
        return groupedMapContents;
    }
    async getAreaContent(zoom, data) {
        this.validateZoom(zoom);
        const url = `${this.apiUrl}get-area-content/${zoom}/${this.gridSize}/`;
        const areaContent = await this.post(url, data);
        return areaContent;
    }
    viewportToGeoJSON(viewport) {
        const left = Math.max(viewport.left, this.maxBounds.minX);
        const right = Math.min(viewport.right, this.maxBounds.maxX);
        const top = Math.min(viewport.top, this.maxBounds.maxY);
        const bottom = Math.max(viewport.bottom, this.maxBounds.minY);
        const geometryType = "Polygon";
        const coordinates = [
            [
                [
                    left,
                    top
                ],
                [
                    right,
                    top
                ],
                [
                    right,
                    bottom
                ],
                [
                    left,
                    bottom
                ],
                [
                    left,
                    top
                ]
            ]
        ];
        const geoJSON = {
            "type": "Feature",
            "geometry": {
                "type": geometryType,
                "coordinates": coordinates,
                "crs": {
                    "type": "name",
                    "properties": {
                        "name": this.srid
                    }
                }
            }
        };
        return geoJSON;
    }
    async post(url, postData) {
        const encodedUrl = encodeURI(url);
        const options = {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            credentials: "include"
        };
        const response = await fetch(encodedUrl, options);
        const responseData = await response.json();
        if (response.ok) return responseData;
        else throw new Error(JSON.stringify(responseData));
    }
    async get(url) {
        const encodedUrl = encodeURI(url);
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            credentials: "include"
        };
        const response = await fetch(encodedUrl, options);
        const responseData = await response.json();
        if (response.ok) return responseData;
        else throw new Error(JSON.stringify(responseData));
    }
}




const $3e2183be5df4d9a4$var$defaultGridFillColors = {
    5: "rgba(255, 192, 203, .5)",
    10: "rgba(240, 128, 128, .5)",
    50: "rgba(255, 127, 80, .5)",
    100: "rgba(255, 165, 0, .5)",
    1000: "rgba(255, 69, 0, .5)",
    10000: "rgba(255, 0 , 0, .5)"
};
const $3e2183be5df4d9a4$var$defaultGridStrokeColors = {
    5: "pink",
    10: "lightcoral",
    50: "coral",
    100: "orange",
    1000: "orangered",
    10000: "red"
};
class $3e2183be5df4d9a4$export$a09c19a7c4419c1 {
    constructor(map, apiUrl, markerFolderPath, settings){
        this.map = map;
        this.apiUrl = apiUrl;
        this.markerFolderPath = markerFolderPath;
        this.filters = [];
        this.isStartup = false // openlayers fires moveend after loadend. This triggers two clustering requests of which the latter has to be dismissed
        ;
        this.latestFilterChangeTimestamp = null;
        this.map = map;
        this.apiUrl = apiUrl;
        this.markerFolderPath = markerFolderPath;
        settings = settings || {};
        // settings
        this.srid = settings.srid ? settings.srid : (0, $aca83a355307fe8a$export$55fee9ea2526ad0d).EPSG4326;
        this.kmeansGridSize = settings.gridGridSize ? settings.gridGridSize : (0, $aca83a355307fe8a$export$9c3a9f8fbf06a34).kmeans;
        this.gridGridSize = settings.gridGridSize ? settings.gridGridSize : (0, $aca83a355307fe8a$export$9c3a9f8fbf06a34).grid;
        this.clusterMethod = settings.clusterMethod ? settings.clusterMethod : (0, $aca83a355307fe8a$export$ae91e066970d978a).kmeans;
        this.geometryType = settings.geometryType ? settings.geometryType : (0, $aca83a355307fe8a$export$8f4397a63c3cef66).viewport;
        this.area = settings.area ? settings.area : null;
        this.iconType = settings.iconType ? settings.iconType : (0, $aca83a355307fe8a$export$13ff1290a9e22e77).rounded;
        this.singlePinImages = settings.singlePinImages ? settings.singlePinImages : {};
        this.getSinglePinImageURL = settings.getSinglePinImageURL ? settings.getSinglePinImageURL : this._getSinglePinImageURL;
        this.markerImageSizes = settings.markerImageSizes ? settings.markerImageSizes : (0, $aca83a355307fe8a$export$96b1907ff7fa3578);
        this.gridFillColors = settings.gridFillColors ? settings.gridFillColors : $3e2183be5df4d9a4$var$defaultGridFillColors;
        this.gridStrokeColors = settings.gridStrokeColors ? settings.gridStrokeColors : $3e2183be5df4d9a4$var$defaultGridStrokeColors;
        this.maxZoom = settings.maxZoom ? settings.maxZoom : (0, $aca83a355307fe8a$export$aa170efeb32c8cf9);
        // hooks
        this.onGotClusters = settings.onGotClusters ? settings.onGotClusters : this._onGotClusters;
        this.onFinalClick = settings.onFinalClick ? settings.onFinalClick : this._onFinalClick;
        if (this.area) this.setArea(this.area);
        const gridSize = this.getGridSize();
        this.anycluster = new (0, $5660b38ff962cbfe$export$5e01b9ff483562af)(this.apiUrl, gridSize, this.srid);
        this.createClusterLayers();
        this.markerList = [];
        const startClustering = settings.startClustering === false ? settings.startClustering : true;
        if (startClustering === true) this.startClustering();
    }
    createClusterLayers() {
        throw new Error("NotImplementedError: createClusterLayers");
    }
    addArea(geojson) {
        throw new Error("NotImplementedError: addArea");
    }
    removeArea() {
        throw new Error("NotImplementedError: removeArea");
    }
    removeAllMarkers() {
        throw new Error("NotImplementedError: removeAllMarkers");
    }
    getZoom() {
        throw new Error("NotImplementedError: getZoom");
    }
    setMap(x, y, zoom) {
        throw new Error("NotImplementedError: setMap");
    }
    getViewport() {
        throw new Error("NotImplementedError: setMap");
    }
    addMapEventListeners() {
        throw new Error("NotImplementedError: addMapEventListeners");
    }
    drawKmeansMarker(cluster) {
        throw new Error("NotImplementedError: drawKmeansMarker");
    }
    drawCell(cluster) {
        throw new Error("NotImplementedError: drawCell");
    }
    drawGridMarker(cluster) {
        throw new Error("NotImplementedError: drawGridMarker");
    }
    getGridSize() {
        if (this.clusterMethod == (0, $aca83a355307fe8a$export$ae91e066970d978a).grid) return this.gridGridSize;
        return this.kmeansGridSize;
    }
    setClusterMethod(clusterMethod) {
        if (clusterMethod == (0, $aca83a355307fe8a$export$ae91e066970d978a).grid) {
            this.area = null;
            this.geometryType = (0, $aca83a355307fe8a$export$8f4397a63c3cef66).viewport;
            this.removeArea();
        }
        this.removeAllMarkers();
        this.clusterMethod = clusterMethod;
        const gridSize = this.getGridSize();
        this.anycluster = new (0, $5660b38ff962cbfe$export$5e01b9ff483562af)(this.apiUrl, gridSize, this.srid);
        this.markerList = [];
        this.getClusters(true);
    }
    setArea(geojson) {
        this.area = geojson;
        this.removeArea();
        if (geojson == null) {
            this.geometryType = (0, $aca83a355307fe8a$export$8f4397a63c3cef66).viewport;
            this.setClusterMethod((0, $aca83a355307fe8a$export$ae91e066970d978a).kmeans);
        } else {
            this.addArea(geojson);
            this.geometryType = (0, $aca83a355307fe8a$export$8f4397a63c3cef66).area;
            this.setClusterMethod((0, $aca83a355307fe8a$export$ae91e066970d978a).kmeans);
        }
    }
    _getSinglePinImageURL(cluster) {
        const pinimg = cluster.pinimg;
        let url = `${this.markerFolderPath}pin_unknown.png`;
        if (this.singlePinImages && pinimg && pinimg in this.singlePinImages) url = this.singlePinImages[pinimg];
        return url;
    }
    selectPinIcon(cluster) {
        const count = cluster.count;
        let markerImageUrl = this.getSinglePinImageURL(cluster);
        let pinicon = "1";
        if (count > 10000) pinicon = "10000";
        else if (count > 1000) pinicon = "1000";
        else if (count > 100) pinicon = "100";
        else if (count > 50) pinicon = "50";
        else if (count > 10) pinicon = "10";
        else if (count > 1) pinicon = "5";
        if (count > 1) {
            if (this.iconType == (0, $aca83a355307fe8a$export$13ff1290a9e22e77).exact) markerImageUrl = `${this.markerFolderPath}${pinicon}_empty.png`;
            else markerImageUrl = `${this.markerFolderPath}${pinicon}.png`;
        }
        const size = this.markerImageSizes[pinicon];
        let anchor = [
            Math.round(size[0] / 2),
            size[1] - 1
        ];
        let relativeAnchor = [
            0.5,
            1
        ];
        if (count > 1) {
            anchor = [
                Math.round(size[0] / 2),
                Math.round(size[1] / 2)
            ];
            relativeAnchor = [
                0.5,
                0.5
            ];
        }
        const imgObj = {
            url: markerImageUrl,
            size: size,
            anchor: anchor,
            relativeAnchor: relativeAnchor,
            popupAnchor: [
                0,
                -Math.round(size[1]) + 8
            ]
        };
        return imgObj;
    }
    // marker can be an openlayers Feature or a L.marker
    setMarkerProps(marker, cluster) {
        // add properties required by anycluster
        marker.x = cluster.center.x;
        marker.y = cluster.center.y;
        marker.count = cluster.count;
        marker.ids = cluster.ids;
        return marker;
    }
    setCellProps(cell, cluster) {
        cell.x = cluster.center.x;
        cell.y = cluster.center.y;
        cell.count = cluster.count;
        cell.id = cluster.id;
        cell.geojson = cluster.geojson;
        return cell;
    }
    markerClickFunction(x, y) {
        this.removeAllMarkers();
        let zoom = this.getZoom();
        zoom = zoom + 3;
        this.setMap(x, y, zoom);
    }
    async onMarkerFinalClick(marker) {
        const zoom = this.getZoom();
        const x = marker.x;
        const y = marker.y;
        const geoJSON = this.getClusterGeometry();
        if (this.clusterMethod == (0, $aca83a355307fe8a$export$ae91e066970d978a).kmeans) {
            const ids = marker.ids;
            const postData = {
                "geometry_type": this.geometryType,
                "geojson": geoJSON,
                "input_srid": this.srid,
                "x": x,
                "y": y,
                "ids": ids,
                "filters": this.filters
            };
            const data = await this.anycluster.getKmeansClusterContent(zoom, postData);
            this.onFinalClick(marker, data);
        } else if (this.clusterMethod = (0, $aca83a355307fe8a$export$ae91e066970d978a).grid) {
            if (marker.count == 1) {
                const data = await this.anycluster.getDatasetContent(zoom, marker.id);
                this.onFinalClick(marker, data);
            } else {
                const geojson = marker["geojson"];
                const zoom = this.getZoom();
                const data = await this.anycluster.getAreaContent(zoom, geojson);
                this.onFinalClick(marker, data);
            }
        }
    }
    roundMarkerCount(count) {
        if (count == 1) count = 1;
        else if (count <= 5) count = 5;
        else if (count <= 10) count = 10;
        else if (count <= 50) count = 50;
        else if (count <= 100) count = 100;
        else if (count <= 1000) count = 1000;
        else count = 10000;
        return count;
    }
    getClusterGeometry() {
        let geoJSON;
        if (this.geometryType == (0, $aca83a355307fe8a$export$8f4397a63c3cef66).viewport) {
            const viewport = this.getViewport();
            geoJSON = this.anycluster.viewportToGeoJSON(viewport);
        } else if (this.geometryType == (0, $aca83a355307fe8a$export$8f4397a63c3cef66).area && this.area) geoJSON = this.area;
        else throw new Error("No cluster geometry found");
        return geoJSON;
    }
    async getClusters(clearCache = false) {
        const geoJSON = this.getClusterGeometry();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": this.geometryType,
            "geojson": geoJSON,
            "clear_cache": clearCache,
            "filters": this.filters
        };
        const zoom = this.getZoom();
        const filterTimestamp = this.latestFilterChangeTimestamp;
        if (this.clusterMethod == (0, $aca83a355307fe8a$export$ae91e066970d978a).kmeans) {
            const clusters = await this.anycluster.getKmeansCluster(zoom, postData);
            const postResponseZoom = this.getZoom();
            // only draw markers/cells if the user did not zoom or change filters during the wait for the response
            if (clusters.length > 0 && filterTimestamp === this.latestFilterChangeTimestamp && zoom === postResponseZoom) {
                clusters.forEach((cluster)=>{
                    this.drawKmeansMarker(cluster);
                });
                this.onGotClusters();
            } else console.log(`[anycluster]: not drawing markers because of outdated response`);
        } else if (this.clusterMethod == (0, $aca83a355307fe8a$export$ae91e066970d978a).grid) {
            const clusters = await this.anycluster.getGridCluster(zoom, postData);
            const postResponseZoom = this.getZoom();
            // only draw markers/cells if the user did not zoom or change filters during the wait for the response
            if (clusters.length > 0 && filterTimestamp === this.latestFilterChangeTimestamp && zoom === postResponseZoom) {
                clusters.forEach((cluster)=>{
                    this.drawCell(cluster);
                });
                this.onGotClusters();
            } else console.log(`[anycluster]: not drawing markers because of outdated response`);
        } else throw new Error(`Invalid clusterMethod: ${this.clusterMethod}`);
    }
    async startClustering() {
        this.isStartup = true;
        await this.getClusters(true);
        this.addMapEventListeners();
        this.isStartup = false;
    }
    filtersAreEqual(filter1, filter2) {
        if ("column" in filter1 && "column" in filter2) {
            if (filter1.column == filter2.column && filter1.value == filter2.value && filter1.operator == filter2.operator) return true;
        } else if (JSON.stringify(filter1) === JSON.stringify(filter2)) return true;
        return false;
    }
    // filtering
    filter(filter, reloadMarkers) {
        if (Array.isArray(filter)) this.filters = filter;
        else this.filters = [
            filter
        ];
        this.postFilterChange(reloadMarkers);
    }
    addFilter(filter, reloadMarkers) {
        let filterExists = false;
        for(let f = 0; f < this.filters.length; f++){
            let existingFilter = this.filters[f];
            if (this.filtersAreEqual(filter, existingFilter)) {
                filterExists = true;
                break;
            }
        }
        if (!filterExists) this.filters.push(filter);
        this.postFilterChange(reloadMarkers);
    }
    addFilters(filtersToAdd, reloadMarkers) {
        for(let fa = 0; fa < filtersToAdd.length; fa++){
            let filter = filtersToAdd[fa];
            this.addFilter(filter, false);
        }
        this.postFilterChange(reloadMarkers);
    }
    removeFilter(filter, reloadMarkers) {
        for(let f = 0; f < this.filters.length; f++){
            let existingFilter = this.filters[f];
            if (this.filtersAreEqual(filter, existingFilter)) {
                this.filters.splice(f, 1);
                break;
            }
        }
        this.postFilterChange(reloadMarkers);
    }
    removeFilters(filtersToRemove, reloadMarkers) {
        for(let fr = 0; fr < filtersToRemove.length; fr++){
            let filter = filtersToRemove[fr];
            this.removeFilter(filter, false);
        }
        this.postFilterChange(reloadMarkers);
    }
    resetFilters(reloadMarkers) {
        this.filters = [];
        this.postFilterChange(reloadMarkers);
    }
    postFilterChange(reloadMarkers) {
        this.latestFilterChangeTimestamp = new Date().getTime();
        if (reloadMarkers != false) reloadMarkers = true;
        if (reloadMarkers == true) {
            this.removeAllMarkers();
            this.getClusters(true);
        }
    }
    /**
   * method for getting the unaggregated, paginated content of the map
   */ async getMapContents(limit, offset, orderBy) {
        const geoJSON = this.getClusterGeometry();
        const zoom = this.getZoom();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": (0, $aca83a355307fe8a$export$8f4397a63c3cef66).area,
            "geojson": geoJSON,
            "clear_cache": false,
            "filters": this.filters,
            "limit": limit,
            "offset": offset,
            "order_by": orderBy
        };
        const data = this.anycluster.getAreaContent(zoom, postData);
        return data;
    }
    /**
   * methods for getting counts of objects on the current map / geometry
   */ async getMapContentCount(modulations) {
        const geoJSON = this.getClusterGeometry();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": this.geometryType,
            "geojson": geoJSON,
            "clear_cache": true,
            "filters": this.filters,
            "modulations": modulations
        };
        const zoom = this.getZoom();
        const data = await this.anycluster.getMapContentCount(zoom, postData);
        return data;
    }
    async getFilteredMapContentCount(filters, modulations) {
        const geoJSON = this.getClusterGeometry();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": this.geometryType,
            "geojson": geoJSON,
            "clear_cache": true,
            "filters": filters,
            "modulations": modulations
        };
        const zoom = this.getZoom();
        const data = await this.anycluster.getMapContentCount(zoom, postData);
        return data;
    }
    async getGroupedMapContents(groupBy) {
        const geoJSON = this.getClusterGeometry();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": this.geometryType,
            "geojson": geoJSON,
            "clear_cache": true,
            "filters": this.filters,
            "group_by": groupBy
        };
        const zoom = this.getZoom();
        const data = await this.anycluster.getGroupedMapContents(zoom, postData);
        return data;
    }
    async getFilteredGroupedMapContents(filters, groupBy) {
        const geoJSON = this.getClusterGeometry();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": this.geometryType,
            "geojson": geoJSON,
            "clear_cache": true,
            "filters": filters,
            "group_by": groupBy
        };
        const zoom = this.getZoom();
        const data = await this.anycluster.getGroupedMapContents(zoom, postData);
        return data;
    }
    // hooks
    _onFinalClick(marker, data) {
        alert(JSON.stringify(data));
    }
    _onGotClusters() {}
}




/**
 * @module ol/layer/Vector
 */ /**
 * @module ol/layer/BaseVector
 */ /**
 * @module ol/layer/Layer
 */ /**
 * @module ol/layer/Base
 */ /**
 * @module ol/Object
 */ /**
 * @module ol/events/Event
 */ /**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */ class $f22c10e3757627da$var$BaseEvent {
    /**
   * @param {string} type Type.
   */ constructor(type){
        /**
     * @type {boolean}
     */ this.propagationStopped;
        /**
     * @type {boolean}
     */ this.defaultPrevented;
        /**
     * The event type.
     * @type {string}
     * @api
     */ this.type = type;
        /**
     * The event target.
     * @type {Object}
     * @api
     */ this.target = null;
    }
    /**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */ preventDefault() {
        this.defaultPrevented = true;
    }
    /**
   * Stop event propagation.
   * @api
   */ stopPropagation() {
        this.propagationStopped = true;
    }
}
function $f22c10e3757627da$export$51134cce184326b9(evt) {
    evt.stopPropagation();
}
function $f22c10e3757627da$export$fa3b29edae795ef4(evt) {
    evt.preventDefault();
}
var $f22c10e3757627da$export$2e2bcd8739ae039 = $f22c10e3757627da$var$BaseEvent;


/**
 * @module ol/ObjectEventType
 */ /**
 * @enum {string}
 */ var $a6660a6615220f8c$export$2e2bcd8739ae039 /**
 * @typedef {'propertychange'} Types
 */  = {
    /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */ PROPERTYCHANGE: "propertychange"
};


/**
 * @module ol/Observable
 */ /**
 * @module ol/events/Target
 */ /**
 * @module ol/Disposable
 */ /**
 * @classdesc
 * Objects that need to clean up after themselves.
 */ class $2323388472940bb7$var$Disposable {
    constructor(){
        /**
     * The object has already been disposed.
     * @type {boolean}
     * @protected
     */ this.disposed = false;
    }
    /**
   * Clean up.
   */ dispose() {
        if (!this.disposed) {
            this.disposed = true;
            this.disposeInternal();
        }
    }
    /**
   * Extension point for disposable objects.
   * @protected
   */ disposeInternal() {}
}
var $2323388472940bb7$export$2e2bcd8739ae039 = $2323388472940bb7$var$Disposable;



/**
 * @module ol/functions
 */ /**
 * @module ol/array
 */ /**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function} [comparator] Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */ function $69c1cc8ae30f997f$export$2e0ae67339d5f1ac(haystack, needle, comparator) {
    let mid, cmp;
    comparator = comparator || $69c1cc8ae30f997f$export$fcb633242ef15540;
    let low = 0;
    let high = haystack.length;
    let found = false;
    while(low < high){
        /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */ mid = low + (high - low >> 1);
        cmp = +comparator(haystack[mid], needle);
        if (cmp < 0.0) /* Too low. */ low = mid + 1;
        else {
            /* Key found or too high */ high = mid;
            found = !cmp;
        }
    }
    /* Key not found. */ return found ? low : ~low;
}
function $69c1cc8ae30f997f$export$fcb633242ef15540(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}
function $69c1cc8ae30f997f$export$8a3786cc03fdb777(arr, target, direction) {
    if (arr[0] <= target) return 0;
    const n = arr.length;
    if (target <= arr[n - 1]) return n - 1;
    if (typeof direction === "function") {
        for(let i = 1; i < n; ++i){
            const candidate = arr[i];
            if (candidate === target) return i;
            if (candidate < target) {
                if (direction(target, arr[i - 1], candidate) > 0) return i - 1;
                return i;
            }
        }
        return n - 1;
    }
    if (direction > 0) {
        for(let i = 1; i < n; ++i){
            if (arr[i] < target) return i - 1;
        }
        return n - 1;
    }
    if (direction < 0) {
        for(let i = 1; i < n; ++i){
            if (arr[i] <= target) return i;
        }
        return n - 1;
    }
    for(let i = 1; i < n; ++i){
        if (arr[i] == target) return i;
        if (arr[i] < target) {
            if (arr[i - 1] - target < target - arr[i]) return i - 1;
            return i;
        }
    }
    return n - 1;
}
function $69c1cc8ae30f997f$export$292cfa960964f0e0(arr, begin, end) {
    while(begin < end){
        const tmp = arr[begin];
        arr[begin] = arr[end];
        arr[end] = tmp;
        ++begin;
        --end;
    }
}
function $69c1cc8ae30f997f$export$8b58be045bf06082(arr, data) {
    const extension = Array.isArray(data) ? data : [
        data
    ];
    const length = extension.length;
    for(let i = 0; i < length; i++)arr[arr.length] = extension[i];
}
function $69c1cc8ae30f997f$export$cd7f480d6b8286c3(arr, obj) {
    const i = arr.indexOf(obj);
    const found = i > -1;
    if (found) arr.splice(i, 1);
    return found;
}
function $69c1cc8ae30f997f$export$e9bab7fafb253603(arr1, arr2) {
    const len1 = arr1.length;
    if (len1 !== arr2.length) return false;
    for(let i = 0; i < len1; i++){
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
function $69c1cc8ae30f997f$export$c7d3d1f96a700512(arr, compareFnc) {
    const length = arr.length;
    const tmp = Array(arr.length);
    let i;
    for(i = 0; i < length; i++)tmp[i] = {
        index: i,
        value: arr[i]
    };
    tmp.sort(function(a, b) {
        return compareFnc(a.value, b.value) || a.index - b.index;
    });
    for(i = 0; i < arr.length; i++)arr[i] = tmp[i].value;
}
function $69c1cc8ae30f997f$export$efa610630f9e181(arr, func, strict) {
    const compare = func || $69c1cc8ae30f997f$export$fcb633242ef15540;
    return arr.every(function(currentVal, index) {
        if (index === 0) return true;
        const res = compare(arr[index - 1], currentVal);
        return !(res > 0 || strict && res === 0);
    });
}


function $2c3aa3ce33eccc0f$export$22e23a2304399231() {
    return true;
}
function $2c3aa3ce33eccc0f$export$8f11cee4bdc7e668() {
    return false;
}
function $2c3aa3ce33eccc0f$export$1cd1943b3a73bbe8() {}
function $2c3aa3ce33eccc0f$export$ff83df6f9971435f(fn) {
    let called = false;
    /** @type {ReturnType} */ let lastResult;
    /** @type {Array<any>} */ let lastArgs;
    let lastThis;
    return function() {
        const nextArgs = Array.prototype.slice.call(arguments);
        if (!called || this !== lastThis || !(0, $69c1cc8ae30f997f$export$e9bab7fafb253603)(nextArgs, lastArgs)) {
            called = true;
            lastThis = this;
            lastArgs = nextArgs;
            lastResult = fn.apply(this, arguments);
        }
        return lastResult;
    };
}
function $2c3aa3ce33eccc0f$export$4dbaaf6c79705e6c(getter) {
    function promiseGetter() {
        let value;
        try {
            value = getter();
        } catch (err) {
            return Promise.reject(err);
        }
        if (value instanceof Promise) return value;
        return Promise.resolve(value);
    }
    return promiseGetter();
}


/**
 * @module ol/obj
 */ /**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */ function $e2dfef87a88758ed$export$42ffd38884aecdac(object) {
    for(const property in object)delete object[property];
}
function $e2dfef87a88758ed$export$dd1bc94b04021eeb(object) {
    let property;
    for(property in object)return false;
    return !property;
}


/**
 * @typedef {EventTarget|Target} EventTargetLike
 */ /**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */ class $fd4e3201ad7386dc$var$Target extends (0, $2323388472940bb7$export$2e2bcd8739ae039) {
    /**
   * @param {*} [target] Default event target for dispatched events.
   */ constructor(target){
        super();
        /**
     * @private
     * @type {*}
     */ this.eventTarget_ = target;
        /**
     * @private
     * @type {Object<string, number>}
     */ this.pendingRemovals_ = null;
        /**
     * @private
     * @type {Object<string, number>}
     */ this.dispatching_ = null;
        /**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>}
     */ this.listeners_ = null;
    }
    /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */ addEventListener(type, listener) {
        if (!type || !listener) return;
        const listeners = this.listeners_ || (this.listeners_ = {});
        const listenersForType = listeners[type] || (listeners[type] = []);
        if (!listenersForType.includes(listener)) listenersForType.push(listener);
    }
    /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */ dispatchEvent(event) {
        const isString = typeof event === "string";
        const type = isString ? event : event.type;
        const listeners = this.listeners_ && this.listeners_[type];
        if (!listeners) return;
        const evt = isString ? new (0, $f22c10e3757627da$export$2e2bcd8739ae039)(event) : /** @type {Event} */ event;
        if (!evt.target) evt.target = this.eventTarget_ || this;
        const dispatching = this.dispatching_ || (this.dispatching_ = {});
        const pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
        if (!(type in dispatching)) {
            dispatching[type] = 0;
            pendingRemovals[type] = 0;
        }
        ++dispatching[type];
        let propagate;
        for(let i = 0, ii = listeners.length; i < ii; ++i){
            if ("handleEvent" in listeners[i]) propagate = /** @type {import("../events.js").ListenerObject} */ listeners[i].handleEvent(evt);
            else propagate = /** @type {import("../events.js").ListenerFunction} */ listeners[i].call(this, evt);
            if (propagate === false || evt.propagationStopped) {
                propagate = false;
                break;
            }
        }
        if (--dispatching[type] === 0) {
            let pr = pendingRemovals[type];
            delete pendingRemovals[type];
            while(pr--)this.removeEventListener(type, (0, $2c3aa3ce33eccc0f$export$1cd1943b3a73bbe8));
            delete dispatching[type];
        }
        return propagate;
    }
    /**
   * Clean up.
   */ disposeInternal() {
        this.listeners_ && (0, $e2dfef87a88758ed$export$42ffd38884aecdac)(this.listeners_);
    }
    /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */ getListeners(type) {
        return this.listeners_ && this.listeners_[type] || undefined;
    }
    /**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */ hasListener(type) {
        if (!this.listeners_) return false;
        return type ? type in this.listeners_ : Object.keys(this.listeners_).length > 0;
    }
    /**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */ removeEventListener(type, listener) {
        const listeners = this.listeners_ && this.listeners_[type];
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                if (this.pendingRemovals_ && type in this.pendingRemovals_) {
                    // make listener a no-op, and remove later in #dispatchEvent()
                    listeners[index] = (0, $2c3aa3ce33eccc0f$export$1cd1943b3a73bbe8);
                    ++this.pendingRemovals_[type];
                } else {
                    listeners.splice(index, 1);
                    if (listeners.length === 0) delete this.listeners_[type];
                }
            }
        }
    }
}
var $fd4e3201ad7386dc$export$2e2bcd8739ae039 = $fd4e3201ad7386dc$var$Target;


/**
 * @module ol/events/EventType
 */ /**
 * @enum {string}
 * @const
 */ var $f13d17e3c190470c$export$2e2bcd8739ae039 = {
    /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */ CHANGE: "change",
    /**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */ ERROR: "error",
    BLUR: "blur",
    CLEAR: "clear",
    CONTEXTMENU: "contextmenu",
    CLICK: "click",
    DBLCLICK: "dblclick",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DROP: "drop",
    FOCUS: "focus",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    LOAD: "load",
    RESIZE: "resize",
    TOUCHMOVE: "touchmove",
    WHEEL: "wheel"
};


/**
 * @module ol/events
 */ 
function $776f68d2a754760b$export$63174c828edd6ff8(target, type, listener, thisArg, once) {
    if (thisArg && thisArg !== target) listener = listener.bind(thisArg);
    if (once) {
        const originalListener = listener;
        listener = function() {
            target.removeEventListener(type, listener);
            originalListener.apply(this, arguments);
        };
    }
    const eventsKey = {
        target: target,
        type: type,
        listener: listener
    };
    target.addEventListener(type, listener);
    return eventsKey;
}
function $776f68d2a754760b$export$8d2a95bc11b44725(target, type, listener, thisArg) {
    return $776f68d2a754760b$export$63174c828edd6ff8(target, type, listener, thisArg, true);
}
function $776f68d2a754760b$export$b0a21c8b3c1c921(key) {
    if (key && key.target) {
        key.target.removeEventListener(key.type, key.listener);
        (0, $e2dfef87a88758ed$export$42ffd38884aecdac)(key);
    }
}


/***
 * @template {string} Type
 * @template {Event|import("./events/Event.js").default} EventClass
 * @template Return
 * @typedef {(type: Type, listener: (event: EventClass) => ?) => Return} OnSignature
 */ /***
 * @template {string} Type
 * @template Return
 * @typedef {(type: Type[], listener: (event: Event|import("./events/Event").default) => ?) => Return extends void ? void : Return[]} CombinedOnSignature
 */ /**
 * @typedef {'change'|'error'} EventTypes
 */ /***
 * @template Return
 * @typedef {OnSignature<EventTypes, import("./events/Event.js").default, Return> & CombinedOnSignature<EventTypes, Return>} ObservableOnSignature
 */ /**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */ class $0a5ecae53e50aa57$var$Observable extends (0, $fd4e3201ad7386dc$export$2e2bcd8739ae039) {
    constructor(){
        super();
        this.on = /** @type {ObservableOnSignature<import("./events").EventsKey>} */ this.onInternal;
        this.once = /** @type {ObservableOnSignature<import("./events").EventsKey>} */ this.onceInternal;
        this.un = /** @type {ObservableOnSignature<void>} */ this.unInternal;
        /**
     * @private
     * @type {number}
     */ this.revision_ = 0;
    }
    /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */ changed() {
        ++this.revision_;
        this.dispatchEvent((0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE);
    }
    /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */ getRevision() {
        return this.revision_;
    }
    /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */ onInternal(type, listener) {
        if (Array.isArray(type)) {
            const len = type.length;
            const keys = new Array(len);
            for(let i = 0; i < len; ++i)keys[i] = (0, $776f68d2a754760b$export$63174c828edd6ff8)(this, type[i], listener);
            return keys;
        }
        return (0, $776f68d2a754760b$export$63174c828edd6ff8)(this, /** @type {string} */ type, listener);
    }
    /**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */ onceInternal(type, listener) {
        let key;
        if (Array.isArray(type)) {
            const len = type.length;
            key = new Array(len);
            for(let i = 0; i < len; ++i)key[i] = (0, $776f68d2a754760b$export$8d2a95bc11b44725)(this, type[i], listener);
        } else key = (0, $776f68d2a754760b$export$8d2a95bc11b44725)(this, /** @type {string} */ type, listener);
        /** @type {Object} */ listener.ol_key = key;
        return key;
    }
    /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */ unInternal(type, listener) {
        const key = /** @type {Object} */ listener.ol_key;
        if (key) $0a5ecae53e50aa57$export$b7ef3f8527533384(key);
        else if (Array.isArray(type)) for(let i = 0, ii = type.length; i < ii; ++i)this.removeEventListener(type[i], listener);
        else this.removeEventListener(type, listener);
    }
}
/**
 * Listen for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */ $0a5ecae53e50aa57$var$Observable.prototype.on;
/**
 * Listen once for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */ $0a5ecae53e50aa57$var$Observable.prototype.once;
/**
 * Unlisten for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @api
 */ $0a5ecae53e50aa57$var$Observable.prototype.un;
function $0a5ecae53e50aa57$export$b7ef3f8527533384(key) {
    if (Array.isArray(key)) for(let i = 0, ii = key.length; i < ii; ++i)(0, $776f68d2a754760b$export$b0a21c8b3c1c921)(key[i]);
    else (0, $776f68d2a754760b$export$b0a21c8b3c1c921)(/** @type {import("./events.js").EventsKey} */ key);
}
var $0a5ecae53e50aa57$export$2e2bcd8739ae039 = $0a5ecae53e50aa57$var$Observable;


/**
 * @module ol/util
 */ /**
 * @return {never} Any return.
 */ function $ae7eaaa2c9c1e05d$export$817eb92a8194bab0() {
    throw new Error("Unimplemented abstract method.");
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */ let $ae7eaaa2c9c1e05d$var$uidCounter_ = 0;
function $ae7eaaa2c9c1e05d$export$5e82334337e0f204(obj) {
    return obj.ol_uid || (obj.ol_uid = String(++$ae7eaaa2c9c1e05d$var$uidCounter_));
}
const $ae7eaaa2c9c1e05d$export$a4ad2735b021c132 = "7.4.0";



class $d6cd7f1b627d5e92$export$cf395d7c4a2d5a17 extends (0, $f22c10e3757627da$export$2e2bcd8739ae039) {
    /**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */ constructor(type, key, oldValue){
        super(type);
        /**
     * The name of the property whose value is changing.
     * @type {string}
     * @api
     */ this.key = key;
        /**
     * The old value. To get the new value use `e.target.get(e.key)` where
     * `e` is the event object.
     * @type {*}
     * @api
     */ this.oldValue = oldValue;
    }
}
/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *    import("./Observable").OnSignature<import("./ObjectEventType").Types, ObjectEvent, Return> &
 *    import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types, Return>} ObjectOnSignature
 */ /**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable~Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */ class $d6cd7f1b627d5e92$var$BaseObject extends (0, $0a5ecae53e50aa57$export$2e2bcd8739ae039) {
    /**
   * @param {Object<string, *>} [values] An object with key-value pairs.
   */ constructor(values){
        super();
        /***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */ this.on;
        /***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */ this.once;
        /***
     * @type {ObjectOnSignature<void>}
     */ this.un;
        // Call {@link module:ol/util.getUid} to ensure that the order of objects' ids is
        // the same as the order in which they were created.  This also helps to
        // ensure that object properties are always added in the same order, which
        // helps many JavaScript engines generate faster code.
        (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(this);
        /**
     * @private
     * @type {Object<string, *>}
     */ this.values_ = null;
        if (values !== undefined) this.setProperties(values);
    }
    /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */ get(key) {
        let value;
        if (this.values_ && this.values_.hasOwnProperty(key)) value = this.values_[key];
        return value;
    }
    /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */ getKeys() {
        return this.values_ && Object.keys(this.values_) || [];
    }
    /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */ getProperties() {
        return this.values_ && Object.assign({}, this.values_) || {};
    }
    /**
   * @return {boolean} The object has properties.
   */ hasProperties() {
        return !!this.values_;
    }
    /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */ notify(key, oldValue) {
        let eventType;
        eventType = `change:${key}`;
        if (this.hasListener(eventType)) this.dispatchEvent(new $d6cd7f1b627d5e92$export$cf395d7c4a2d5a17(eventType, key, oldValue));
        eventType = (0, $a6660a6615220f8c$export$2e2bcd8739ae039).PROPERTYCHANGE;
        if (this.hasListener(eventType)) this.dispatchEvent(new $d6cd7f1b627d5e92$export$cf395d7c4a2d5a17(eventType, key, oldValue));
    }
    /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */ addChangeListener(key, listener) {
        this.addEventListener(`change:${key}`, listener);
    }
    /**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */ removeChangeListener(key, listener) {
        this.removeEventListener(`change:${key}`, listener);
    }
    /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */ set(key, value, silent) {
        const values = this.values_ || (this.values_ = {});
        if (silent) values[key] = value;
        else {
            const oldValue = values[key];
            values[key] = value;
            if (oldValue !== value) this.notify(key, oldValue);
        }
    }
    /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */ setProperties(values, silent) {
        for(const key in values)this.set(key, values[key], silent);
    }
    /**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */ applyProperties(source) {
        if (!source.values_) return;
        Object.assign(this.values_ || (this.values_ = {}), source.values_);
    }
    /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */ unset(key, silent) {
        if (this.values_ && key in this.values_) {
            const oldValue = this.values_[key];
            delete this.values_[key];
            if ((0, $e2dfef87a88758ed$export$dd1bc94b04021eeb)(this.values_)) this.values_ = null;
            if (!silent) this.notify(key, oldValue);
        }
    }
}
var $d6cd7f1b627d5e92$export$2e2bcd8739ae039 = $d6cd7f1b627d5e92$var$BaseObject;


/**
 * @module ol/layer/Property
 */ /**
 * @enum {string}
 */ var $e777f004feefd0c5$export$2e2bcd8739ae039 = {
    OPACITY: "opacity",
    VISIBLE: "visible",
    EXTENT: "extent",
    Z_INDEX: "zIndex",
    MAX_RESOLUTION: "maxResolution",
    MIN_RESOLUTION: "minResolution",
    MAX_ZOOM: "maxZoom",
    MIN_ZOOM: "minZoom",
    SOURCE: "source",
    MAP: "map"
};



/**
 * @module ol/asserts
 */ /**
 * @module ol/AssertionError
 */ /** @type {Object<number, string>} */ const $fc1e13bda45b0626$var$messages = {
    1: "The view center is not defined",
    2: "The view resolution is not defined",
    3: "The view rotation is not defined",
    4: "`image` and `src` cannot be provided at the same time",
    5: "`imgSize` must be set when `image` is provided",
    7: "`format` must be set when `url` is set",
    8: "Unknown `serverType` configured",
    9: "`url` must be configured or set using `#setUrl()`",
    10: "The default `geometryFunction` can only handle `Point` geometries",
    11: "`options.featureTypes` must be an Array",
    12: "`options.geometryName` must also be provided when `options.bbox` is set",
    13: "Invalid corner",
    14: "Invalid color",
    15: "Tried to get a value for a key that does not exist in the cache",
    16: "Tried to set a value for a key that is used already",
    17: "`resolutions` must be sorted in descending order",
    18: "Either `origin` or `origins` must be configured, never both",
    19: "Number of `tileSizes` and `resolutions` must be equal",
    20: "Number of `origins` and `resolutions` must be equal",
    22: "Either `tileSize` or `tileSizes` must be configured, never both",
    24: "Invalid extent or geometry provided as `geometry`",
    25: "Cannot fit empty extent provided as `geometry`",
    26: "Features must have an id set",
    27: "Features must have an id set",
    28: '`renderMode` must be `"hybrid"` or `"vector"`',
    30: "The passed `feature` was already added to the source",
    31: "Tried to enqueue an `element` that was already added to the queue",
    32: "Transformation matrix cannot be inverted",
    33: "Invalid units",
    34: "Invalid geometry layout",
    36: "Unknown SRS type",
    37: "Unknown geometry type found",
    38: "`styleMapValue` has an unknown type",
    39: "Unknown geometry type",
    40: "Expected `feature` to have a geometry",
    41: "Expected an `ol/style/Style` or an array of `ol/style/Style.js`",
    42: "Question unknown, the answer is 42",
    43: "Expected `layers` to be an array or a `Collection`",
    47: "Expected `controls` to be an array or an `ol/Collection`",
    48: "Expected `interactions` to be an array or an `ol/Collection`",
    49: "Expected `overlays` to be an array or an `ol/Collection`",
    50: "`options.featureTypes` should be an Array",
    51: "Either `url` or `tileJSON` options must be provided",
    52: "Unknown `serverType` configured",
    53: "Unknown `tierSizeCalculation` configured",
    55: "The {-y} placeholder requires a tile grid with extent",
    56: "mapBrowserEvent must originate from a pointer event",
    57: "At least 2 conditions are required",
    59: "Invalid command found in the PBF",
    60: "Missing or invalid `size`",
    61: "Cannot determine IIIF Image API version from provided image information JSON",
    62: "A `WebGLArrayBuffer` must either be of type `ELEMENT_ARRAY_BUFFER` or `ARRAY_BUFFER`",
    64: "Layer opacity must be a number",
    66: "`forEachFeatureAtCoordinate` cannot be used on a WebGL layer if the hit detection logic has not been enabled. This is done by providing adequate shaders using the `hitVertexShader` and `hitFragmentShader` properties of `WebGLPointsLayerRenderer`",
    67: "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both",
    68: "A VectorTile source can only be rendered if it has a projection compatible with the view projection",
    69: "`width` or `height` cannot be provided together with `scale`"
};
/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */ class $fc1e13bda45b0626$var$AssertionError extends Error {
    /**
   * @param {number} code Error code.
   */ constructor(code){
        const message = $fc1e13bda45b0626$var$messages[code];
        super(message);
        /**
     * Error code. The meaning of the code can be found on
     * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
     * the version found in the OpenLayers script's header comment if a version
     * other than the latest is used).
     * @type {number}
     * @deprecated ol/AssertionError and error codes will be removed in v8.0
     * @api
     */ this.code = code;
        /**
     * @type {string}
     */ this.name = "AssertionError";
        // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40
        this.message = message;
    }
}
var $fc1e13bda45b0626$export$2e2bcd8739ae039 = $fc1e13bda45b0626$var$AssertionError;


function $1e19c69d18d8b77c$export$a7a9523472993e97(assertion, errorCode) {
    if (!assertion) throw new (0, $fc1e13bda45b0626$export$2e2bcd8739ae039)(errorCode);
}


/**
 * @module ol/math
 */ /**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */ function $57ec69d152197e1d$export$7d15b64cf5a3a4c4(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function $57ec69d152197e1d$export$251bb0a9cef172e6(x, y, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx !== 0 || dy !== 0) {
        const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            x1 = x2;
            y1 = y2;
        } else if (t > 0) {
            x1 += dx * t;
            y1 += dy * t;
        }
    }
    return $57ec69d152197e1d$export$88e6ebb4fe54f538(x, y, x1, y1);
}
function $57ec69d152197e1d$export$88e6ebb4fe54f538(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx * dx + dy * dy;
}
function $57ec69d152197e1d$export$8240f01c446270e6(mat) {
    const n = mat.length;
    for(let i = 0; i < n; i++){
        // Find max in the i-th column (ignoring i - 1 first rows)
        let maxRow = i;
        let maxEl = Math.abs(mat[i][i]);
        for(let r = i + 1; r < n; r++){
            const absValue = Math.abs(mat[r][i]);
            if (absValue > maxEl) {
                maxEl = absValue;
                maxRow = r;
            }
        }
        if (maxEl === 0) return null; // matrix is singular
        // Swap max row with i-th (current) row
        const tmp = mat[maxRow];
        mat[maxRow] = mat[i];
        mat[i] = tmp;
        // Subtract the i-th row to make all the remaining rows 0 in the i-th column
        for(let j = i + 1; j < n; j++){
            const coef = -mat[j][i] / mat[i][i];
            for(let k = i; k < n + 1; k++)if (i == k) mat[j][k] = 0;
            else mat[j][k] += coef * mat[i][k];
        }
    }
    // Solve Ax=b for upper triangular matrix A (mat)
    const x = new Array(n);
    for(let l = n - 1; l >= 0; l--){
        x[l] = mat[l][n] / mat[l][l];
        for(let m = l - 1; m >= 0; m--)mat[m][n] -= mat[m][l] * x[l];
    }
    return x;
}
function $57ec69d152197e1d$export$56cb859c01fa134d(angleInRadians) {
    return angleInRadians * 180 / Math.PI;
}
function $57ec69d152197e1d$export$cba01ba138429a1d(angleInDegrees) {
    return angleInDegrees * Math.PI / 180;
}
function $57ec69d152197e1d$export$ba467bec01d66def(a, b) {
    const r = a % b;
    return r * b < 0 ? r + b : r;
}
function $57ec69d152197e1d$export$3a89f8d6f6bf6c9f(a, b, x) {
    return a + x * (b - a);
}
function $57ec69d152197e1d$export$a81f732198733497(n, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
}
function $57ec69d152197e1d$export$2077e0241d6afd3c(n, decimals) {
    return Math.round($57ec69d152197e1d$export$a81f732198733497(n, decimals));
}
function $57ec69d152197e1d$export$a3fe094919f356fd(n, decimals) {
    return Math.floor($57ec69d152197e1d$export$a81f732198733497(n, decimals));
}
function $57ec69d152197e1d$export$803ce6b71a0a94b2(n, decimals) {
    return Math.ceil($57ec69d152197e1d$export$a81f732198733497(n, decimals));
}


/**
 * A css color, or a function called with a view resolution returning a css color.
 *
 * @typedef {string|function(number):string} BackgroundColor
 * @api
 */ /**
 * @typedef {import("../ObjectEventType").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
 *    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} BaseLayerObjectEventTypes
 */ /***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<BaseLayerObjectEventTypes, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|BaseLayerObjectEventTypes, Return>} BaseLayerOnSignature
 */ /**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {BackgroundColor} [background] Background color for the layer. If not specified, no background
 * will be rendered.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */ /**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base~BaseLayer} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object~BaseObject} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */ class $caae539137eb9fda$var$BaseLayer extends (0, $d6cd7f1b627d5e92$export$2e2bcd8739ae039) {
    /**
   * @param {Options} options Layer options.
   */ constructor(options){
        super();
        /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */ this.on;
        /***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */ this.once;
        /***
     * @type {BaseLayerOnSignature<void>}
     */ this.un;
        /**
     * @type {BackgroundColor|false}
     * @private
     */ this.background_ = options.background;
        /**
     * @type {Object<string, *>}
     */ const properties = Object.assign({}, options);
        if (typeof options.properties === "object") {
            delete properties.properties;
            Object.assign(properties, options.properties);
        }
        properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).OPACITY] = options.opacity !== undefined ? options.opacity : 1;
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(typeof properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).OPACITY] === "number", 64); // Layer opacity must be a number
        properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).VISIBLE] = options.visible !== undefined ? options.visible : true;
        properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).Z_INDEX] = options.zIndex;
        properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAX_RESOLUTION] = options.maxResolution !== undefined ? options.maxResolution : Infinity;
        properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).MIN_RESOLUTION] = options.minResolution !== undefined ? options.minResolution : 0;
        properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).MIN_ZOOM] = options.minZoom !== undefined ? options.minZoom : -Infinity;
        properties[(0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAX_ZOOM] = options.maxZoom !== undefined ? options.maxZoom : Infinity;
        /**
     * @type {string}
     * @private
     */ this.className_ = properties.className !== undefined ? properties.className : "ol-layer";
        delete properties.className;
        this.setProperties(properties);
        /**
     * @type {import("./Layer.js").State}
     * @private
     */ this.state_ = null;
    }
    /**
   * Get the background for this layer.
   * @return {BackgroundColor|false} Layer background.
   */ getBackground() {
        return this.background_;
    }
    /**
   * @return {string} CSS class name.
   */ getClassName() {
        return this.className_;
    }
    /**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */ getLayerState(managed) {
        /** @type {import("./Layer.js").State} */ const state = this.state_ || /** @type {?} */ {
            layer: this,
            managed: managed === undefined ? true : managed
        };
        const zIndex = this.getZIndex();
        state.opacity = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(Math.round(this.getOpacity() * 100) / 100, 0, 1);
        state.visible = this.getVisible();
        state.extent = this.getExtent();
        state.zIndex = zIndex === undefined && !state.managed ? Infinity : zIndex;
        state.maxResolution = this.getMaxResolution();
        state.minResolution = Math.max(this.getMinResolution(), 0);
        state.minZoom = this.getMinZoom();
        state.maxZoom = this.getMaxZoom();
        this.state_ = state;
        return state;
    }
    /**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */ getLayersArray(array) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */ getLayerStatesArray(states) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */ getExtent() {
        return /** @type {import("../extent.js").Extent|undefined} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).EXTENT);
    }
    /**
   * Return the maximum resolution of the layer.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */ getMaxResolution() {
        return /** @type {number} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAX_RESOLUTION);
    }
    /**
   * Return the minimum resolution of the layer.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */ getMinResolution() {
        return /** @type {number} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MIN_RESOLUTION);
    }
    /**
   * Return the minimum zoom level of the layer.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */ getMinZoom() {
        return /** @type {number} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MIN_ZOOM);
    }
    /**
   * Return the maximum zoom level of the layer.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */ getMaxZoom() {
        return /** @type {number} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAX_ZOOM);
    }
    /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */ getOpacity() {
        return /** @type {number} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).OPACITY);
    }
    /**
   * @abstract
   * @return {import("../source/Source.js").State} Source state.
   */ getSourceState() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Return the value of this layer's `visible` property. To find out whether the layer
   * is visible on a map, use `isVisible()` instead.
   * @return {boolean} The value of the `visible` property of the layer.
   * @observable
   * @api
   */ getVisible() {
        return /** @type {boolean} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).VISIBLE);
    }
    /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. The default Z-index is 0.
   * @return {number} The Z-index of the layer.
   * @observable
   * @api
   */ getZIndex() {
        return /** @type {number} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).Z_INDEX);
    }
    /**
   * Sets the background color.
   * @param {BackgroundColor} [background] Background color.
   */ setBackground(background) {
        this.background_ = background;
        this.changed();
    }
    /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */ setExtent(extent) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).EXTENT, extent);
    }
    /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */ setMaxResolution(maxResolution) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAX_RESOLUTION, maxResolution);
    }
    /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */ setMinResolution(minResolution) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MIN_RESOLUTION, minResolution);
    }
    /**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */ setMaxZoom(maxZoom) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAX_ZOOM, maxZoom);
    }
    /**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */ setMinZoom(minZoom) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MIN_ZOOM, minZoom);
    }
    /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */ setOpacity(opacity) {
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(typeof opacity === "number", 64); // Layer opacity must be a number
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).OPACITY, opacity);
    }
    /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */ setVisible(visible) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).VISIBLE, visible);
    }
    /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */ setZIndex(zindex) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).Z_INDEX, zindex);
    }
    /**
   * Clean up.
   */ disposeInternal() {
        if (this.state_) {
            this.state_.layer = null;
            this.state_ = null;
        }
        super.disposeInternal();
    }
}
var $caae539137eb9fda$export$2e2bcd8739ae039 = $caae539137eb9fda$var$BaseLayer;




/**
 * @module ol/render/EventType
 */ /**
 * @enum {string}
 */ var $4585eb82aab12670$export$2e2bcd8739ae039 /**
 * @typedef {'postrender'|'precompose'|'postcompose'|'rendercomplete'} MapRenderEventTypes
 */  /**
 * @typedef {'postrender'|'prerender'} LayerRenderEventTypes
 */  = {
    /**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */ PRERENDER: "prerender",
    /**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */ POSTRENDER: "postrender",
    /**
   * Triggered before layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */ PRECOMPOSE: "precompose",
    /**
   * Triggered after layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */ POSTCOMPOSE: "postcompose",
    /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */ RENDERCOMPLETE: "rendercomplete"
};


/**
 * @module ol/View
 */ 
/**
 * @module ol/ViewHint
 */ /**
 * @enum {number}
 */ var $da1f857e3747bc07$export$2e2bcd8739ae039 = {
    ANIMATING: 0,
    INTERACTING: 1
};


/**
 * @module ol/ViewProperty
 */ /**
 * @enum {string}
 */ var $6221a0fc70b5fd5c$export$2e2bcd8739ae039 = {
    CENTER: "center",
    RESOLUTION: "resolution",
    ROTATION: "rotation"
};


/**
 * @module ol/tilegrid/common
 */ /**
 * Default maximum zoom for default tile grids.
 * @type {number}
 */ const $a96901ad7de10b0c$export$e98a216cdcc847dc = 42;
const $a96901ad7de10b0c$export$6b8cb5cd370bd90c = 256;


/**
 * @module ol/proj
 */ /**
 * The ol/proj module stores:
 * * a list of {@link module:ol/proj/Projection~Projection}
 * objects, one for each projection supported by the application
 * * a list of transform functions needed to convert coordinates in one projection
 * into another.
 *
 * The static functions are the methods used to maintain these.
 * Each transform function can handle not only simple coordinate pairs, but also
 * large arrays of coordinates such as vector geometries.
 *
 * When loaded, the library adds projection objects for EPSG:4326 (WGS84
 * geographic coordinates) and EPSG:3857 (Web or Spherical Mercator, as used
 * for example by Bing Maps or OpenStreetMap), together with the relevant
 * transform functions.
 *
 * Additional transforms may be added by using the http://proj4js.org/
 * library (version 2.2 or later). You can use the full build supplied by
 * Proj4js, or create a custom build to support those projections you need; see
 * the Proj4js website for how to do this. You also need the Proj4js definitions
 * for the required projections. These definitions can be obtained from
 * https://epsg.io/, and are a JS function, so can be loaded in a script
 * tag (as in the examples) or pasted into your application.
 *
 * After all required projection definitions are added to proj4's registry (by
 * using `proj4.defs()`), simply call `register(proj4)` from the `ol/proj/proj4`
 * package. Existing transforms are not changed by this function. See
 * examples/wms-image-custom-proj for an example of this.
 *
 * Additional projection definitions can be registered with `proj4.defs()` any
 * time. Just make sure to call `register(proj4)` again; for example, with user-supplied data where you don't
 * know in advance what projections are needed, you can initially load minimal
 * support and then load whichever are requested.
 *
 * Note that Proj4js does not support projection extents. If you want to add
 * one for creating default tile grids, you can add it after the Projection
 * object has been created with `setExtent`, for example,
 * `get('EPSG:1234').setExtent(extent)`.
 *
 * In addition to Proj4js support, any transform functions can be added with
 * {@link module:ol/proj.addCoordinateTransforms}. To use this, you must first create
 * a {@link module:ol/proj/Projection~Projection} object for the new projection and add it with
 * {@link module:ol/proj.addProjection}. You can then add the forward and inverse
 * functions with {@link module:ol/proj.addCoordinateTransforms}. See
 * examples/wms-custom-proj for an example of this.
 *
 * Note that if no transforms are needed and you only need to define the
 * projection, just add a {@link module:ol/proj/Projection~Projection} with
 * {@link module:ol/proj.addProjection}. See examples/wms-no-proj for an example of
 * this.
 */ 
/**
 * @module ol/proj/epsg3857
 */ /**
 * @module ol/proj/Projection
 */ /**
 * @module ol/proj/Units
 */ /**
 * @typedef {'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft'} Units
 * Projection units.
 */ /**
 * See http://duff.ess.washington.edu/data/raster/drg/docs/geotiff.txt
 * @type {Object<number, Units>}
 */ const $6a4fde186e5464e9$var$unitByCode = {
    "9001": "m",
    "9002": "ft",
    "9003": "us-ft",
    "9101": "radians",
    "9102": "degrees"
};
function $6a4fde186e5464e9$export$7f58726df3255edc(code) {
    return $6a4fde186e5464e9$var$unitByCode[code];
}
const $6a4fde186e5464e9$export$1482081eec883108 = {
    // use the radius of the Normal sphere
    "radians": 6370997 / (2 * Math.PI),
    "degrees": 2 * Math.PI * 6370997 / 360,
    "ft": 0.3048,
    "m": 1,
    "us-ft": 1200 / 3937
};


/**
 * @typedef {Object} Options
 * @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
 * @property {import("./Units.js").Units} [units] Units. Required unless a
 * proj4 projection is defined for `code`.
 * @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
 * @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
 * @property {boolean} [global=false] Whether the projection is valid for the whole globe.
 * @property {number} [metersPerUnit] The meters per unit for the SRS.
 * If not provided, the `units` are used to get the meters per unit from the {@link METERS_PER_UNIT}
 * lookup table.
 * @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
 * @property {function(number, import("../coordinate.js").Coordinate):number} [getPointResolution]
 * Function to determine resolution at a point. The function is called with a
 * `number` view resolution and a {@link module:ol/coordinate~Coordinate} as arguments, and returns
 * the `number` resolution in projection units at the passed coordinate. If this is `undefined`,
 * the default {@link module:ol/proj.getPointResolution} function will be used.
 */ /**
 * @classdesc
 * Projection definition class. One of these is created for each projection
 * supported in the application and stored in the {@link module:ol/proj} namespace.
 * You can use these in applications, but this is not required, as API params
 * and options use {@link module:ol/proj~ProjectionLike} which means the simple string
 * code will suffice.
 *
 * You can use {@link module:ol/proj.get} to retrieve the object for a particular
 * projection.
 *
 * The library includes definitions for `EPSG:4326` and `EPSG:3857`, together
 * with the following aliases:
 * * `EPSG:4326`: CRS:84, urn:ogc:def:crs:EPSG:6.6:4326,
 *     urn:ogc:def:crs:OGC:1.3:CRS84, urn:ogc:def:crs:OGC:2:84,
 *     http://www.opengis.net/gml/srs/epsg.xml#4326,
 *     urn:x-ogc:def:crs:EPSG:4326
 * * `EPSG:3857`: EPSG:102100, EPSG:102113, EPSG:900913,
 *     urn:ogc:def:crs:EPSG:6.18:3:3857,
 *     http://www.opengis.net/gml/srs/epsg.xml#3857
 *
 * If you use [proj4js](https://github.com/proj4js/proj4js), aliases can
 * be added using `proj4.defs()`. After all required projection definitions are
 * added, call the {@link module:ol/proj/proj4.register} function.
 *
 * @api
 */ class $dedce5f77fa1cc84$var$Projection {
    /**
   * @param {Options} options Projection options.
   */ constructor(options){
        /**
     * @private
     * @type {string}
     */ this.code_ = options.code;
        /**
     * Units of projected coordinates. When set to `TILE_PIXELS`, a
     * `this.extent_` and `this.worldExtent_` must be configured properly for each
     * tile.
     * @private
     * @type {import("./Units.js").Units}
     */ this.units_ = /** @type {import("./Units.js").Units} */ options.units;
        /**
     * Validity extent of the projection in projected coordinates. For projections
     * with `TILE_PIXELS` units, this is the extent of the tile in
     * tile pixel space.
     * @private
     * @type {import("../extent.js").Extent}
     */ this.extent_ = options.extent !== undefined ? options.extent : null;
        /**
     * Extent of the world in EPSG:4326. For projections with
     * `TILE_PIXELS` units, this is the extent of the tile in
     * projected coordinate space.
     * @private
     * @type {import("../extent.js").Extent}
     */ this.worldExtent_ = options.worldExtent !== undefined ? options.worldExtent : null;
        /**
     * @private
     * @type {string}
     */ this.axisOrientation_ = options.axisOrientation !== undefined ? options.axisOrientation : "enu";
        /**
     * @private
     * @type {boolean}
     */ this.global_ = options.global !== undefined ? options.global : false;
        /**
     * @private
     * @type {boolean}
     */ this.canWrapX_ = !!(this.global_ && this.extent_);
        /**
     * @private
     * @type {function(number, import("../coordinate.js").Coordinate):number|undefined}
     */ this.getPointResolutionFunc_ = options.getPointResolution;
        /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */ this.defaultTileGrid_ = null;
        /**
     * @private
     * @type {number|undefined}
     */ this.metersPerUnit_ = options.metersPerUnit;
    }
    /**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */ canWrapX() {
        return this.canWrapX_;
    }
    /**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */ getCode() {
        return this.code_;
    }
    /**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */ getExtent() {
        return this.extent_;
    }
    /**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */ getUnits() {
        return this.units_;
    }
    /**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */ getMetersPerUnit() {
        return this.metersPerUnit_ || (0, $6a4fde186e5464e9$export$1482081eec883108)[this.units_];
    }
    /**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */ getWorldExtent() {
        return this.worldExtent_;
    }
    /**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */ getAxisOrientation() {
        return this.axisOrientation_;
    }
    /**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */ isGlobal() {
        return this.global_;
    }
    /**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */ setGlobal(global) {
        this.global_ = global;
        this.canWrapX_ = !!(global && this.extent_);
    }
    /**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */ getDefaultTileGrid() {
        return this.defaultTileGrid_;
    }
    /**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */ setDefaultTileGrid(tileGrid) {
        this.defaultTileGrid_ = tileGrid;
    }
    /**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */ setExtent(extent) {
        this.extent_ = extent;
        this.canWrapX_ = !!(this.global_ && extent);
    }
    /**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */ setWorldExtent(worldExtent) {
        this.worldExtent_ = worldExtent;
    }
    /**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */ setGetPointResolution(func) {
        this.getPointResolutionFunc_ = func;
    }
    /**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */ getPointResolutionFunc() {
        return this.getPointResolutionFunc_;
    }
}
var $dedce5f77fa1cc84$export$2e2bcd8739ae039 = $dedce5f77fa1cc84$var$Projection;


const $e6bed287da12a40a$export$2d2c9be8b5b863f = 6378137;
const $e6bed287da12a40a$export$f3928063e5e96d35 = Math.PI * $e6bed287da12a40a$export$2d2c9be8b5b863f;
const $e6bed287da12a40a$export$21e6da8a7375dfe8 = [
    -$e6bed287da12a40a$export$f3928063e5e96d35,
    -$e6bed287da12a40a$export$f3928063e5e96d35,
    $e6bed287da12a40a$export$f3928063e5e96d35,
    $e6bed287da12a40a$export$f3928063e5e96d35
];
const $e6bed287da12a40a$export$ae9d6ed80df710e5 = [
    -180,
    -85,
    180,
    85
];
const $e6bed287da12a40a$export$d26945d1ad52feeb = $e6bed287da12a40a$export$2d2c9be8b5b863f * Math.log(Math.tan(Math.PI / 2));
/**
 * @classdesc
 * Projection object for web/spherical Mercator (EPSG:3857).
 */ class $e6bed287da12a40a$var$EPSG3857Projection extends (0, $dedce5f77fa1cc84$export$2e2bcd8739ae039) {
    /**
   * @param {string} code Code.
   */ constructor(code){
        super({
            code: code,
            units: "m",
            extent: $e6bed287da12a40a$export$21e6da8a7375dfe8,
            global: true,
            worldExtent: $e6bed287da12a40a$export$ae9d6ed80df710e5,
            getPointResolution: function(resolution, point) {
                return resolution / Math.cosh(point[1] / $e6bed287da12a40a$export$2d2c9be8b5b863f);
            }
        });
    }
}
const $e6bed287da12a40a$export$b508d7ad9a891c1b = [
    new $e6bed287da12a40a$var$EPSG3857Projection("EPSG:3857"),
    new $e6bed287da12a40a$var$EPSG3857Projection("EPSG:102100"),
    new $e6bed287da12a40a$var$EPSG3857Projection("EPSG:102113"),
    new $e6bed287da12a40a$var$EPSG3857Projection("EPSG:900913"),
    new $e6bed287da12a40a$var$EPSG3857Projection("http://www.opengis.net/def/crs/EPSG/0/3857"),
    new $e6bed287da12a40a$var$EPSG3857Projection("http://www.opengis.net/gml/srs/epsg.xml#3857")
];
function $e6bed287da12a40a$export$1ff8bb36c0983070(input, output, dimension) {
    const length = input.length;
    dimension = dimension > 1 ? dimension : 2;
    if (output === undefined) {
        if (dimension > 2) // preserve values beyond second dimension
        output = input.slice();
        else output = new Array(length);
    }
    for(let i = 0; i < length; i += dimension){
        output[i] = $e6bed287da12a40a$export$f3928063e5e96d35 * input[i] / 180;
        let y = $e6bed287da12a40a$export$2d2c9be8b5b863f * Math.log(Math.tan(Math.PI * (+input[i + 1] + 90) / 360));
        if (y > $e6bed287da12a40a$export$d26945d1ad52feeb) y = $e6bed287da12a40a$export$d26945d1ad52feeb;
        else if (y < -$e6bed287da12a40a$export$d26945d1ad52feeb) y = -$e6bed287da12a40a$export$d26945d1ad52feeb;
        output[i + 1] = y;
    }
    return output;
}
function $e6bed287da12a40a$export$8c71322ec28ed6b4(input, output, dimension) {
    const length = input.length;
    dimension = dimension > 1 ? dimension : 2;
    if (output === undefined) {
        if (dimension > 2) // preserve values beyond second dimension
        output = input.slice();
        else output = new Array(length);
    }
    for(let i = 0; i < length; i += dimension){
        output[i] = 180 * input[i] / $e6bed287da12a40a$export$f3928063e5e96d35;
        output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / $e6bed287da12a40a$export$2d2c9be8b5b863f)) / Math.PI - 90;
    }
    return output;
}


/**
 * @module ol/proj/epsg4326
 */ 
const $366cef9ace33c799$export$2d2c9be8b5b863f = 6378137;
const $366cef9ace33c799$export$21e6da8a7375dfe8 = [
    -180,
    -90,
    180,
    90
];
const $366cef9ace33c799$export$1482081eec883108 = Math.PI * $366cef9ace33c799$export$2d2c9be8b5b863f / 180;
/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 */ class $366cef9ace33c799$var$EPSG4326Projection extends (0, $dedce5f77fa1cc84$export$2e2bcd8739ae039) {
    /**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */ constructor(code, axisOrientation){
        super({
            code: code,
            units: "degrees",
            extent: $366cef9ace33c799$export$21e6da8a7375dfe8,
            axisOrientation: axisOrientation,
            global: true,
            metersPerUnit: $366cef9ace33c799$export$1482081eec883108,
            worldExtent: $366cef9ace33c799$export$21e6da8a7375dfe8
        });
    }
}
const $366cef9ace33c799$export$b508d7ad9a891c1b = [
    new $366cef9ace33c799$var$EPSG4326Projection("CRS:84"),
    new $366cef9ace33c799$var$EPSG4326Projection("EPSG:4326", "neu"),
    new $366cef9ace33c799$var$EPSG4326Projection("urn:ogc:def:crs:OGC:1.3:CRS84"),
    new $366cef9ace33c799$var$EPSG4326Projection("urn:ogc:def:crs:OGC:2:84"),
    new $366cef9ace33c799$var$EPSG4326Projection("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
    new $366cef9ace33c799$var$EPSG4326Projection("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
    new $366cef9ace33c799$var$EPSG4326Projection("http://www.opengis.net/def/crs/EPSG/0/4326", "neu")
];



/**
 * @module ol/proj/projections
 */ /**
 * @type {Object<string, import("./Projection.js").default>}
 */ let $685869700e166c3a$var$cache = {};
function $685869700e166c3a$export$42ffd38884aecdac() {
    $685869700e166c3a$var$cache = {};
}
function $685869700e166c3a$export$3988ae62b71be9a3(code) {
    return $685869700e166c3a$var$cache[code] || $685869700e166c3a$var$cache[code.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function $685869700e166c3a$export$e16d8520af44a096(code, projection) {
    $685869700e166c3a$var$cache[code] = projection;
}


/**
 * @module ol/proj/transforms
 */ 
/**
 * @private
 * @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
 */ let $00727a2fe5eeabf8$var$transforms = {};
function $00727a2fe5eeabf8$export$42ffd38884aecdac() {
    $00727a2fe5eeabf8$var$transforms = {};
}
function $00727a2fe5eeabf8$export$e16d8520af44a096(source, destination, transformFn) {
    const sourceCode = source.getCode();
    const destinationCode = destination.getCode();
    if (!(sourceCode in $00727a2fe5eeabf8$var$transforms)) $00727a2fe5eeabf8$var$transforms[sourceCode] = {};
    $00727a2fe5eeabf8$var$transforms[sourceCode][destinationCode] = transformFn;
}
function $00727a2fe5eeabf8$export$cd7f480d6b8286c3(source, destination) {
    const sourceCode = source.getCode();
    const destinationCode = destination.getCode();
    const transform = $00727a2fe5eeabf8$var$transforms[sourceCode][destinationCode];
    delete $00727a2fe5eeabf8$var$transforms[sourceCode][destinationCode];
    if ((0, $e2dfef87a88758ed$export$dd1bc94b04021eeb)($00727a2fe5eeabf8$var$transforms[sourceCode])) delete $00727a2fe5eeabf8$var$transforms[sourceCode];
    return transform;
}
function $00727a2fe5eeabf8$export$3988ae62b71be9a3(sourceCode, destinationCode) {
    let transform;
    if (sourceCode in $00727a2fe5eeabf8$var$transforms && destinationCode in $00727a2fe5eeabf8$var$transforms[sourceCode]) transform = $00727a2fe5eeabf8$var$transforms[sourceCode][destinationCode];
    return transform;
}


/**
 * @module ol/extent
 */ /**
 * @module ol/extent/Relationship
 */ /**
 * Relationship to an extent.
 * @enum {number}
 */ var $3b21d84e5edf3751$export$2e2bcd8739ae039 = {
    UNKNOWN: 0,
    INTERSECTING: 1,
    ABOVE: 2,
    RIGHT: 4,
    BELOW: 8,
    LEFT: 16
};



function $84be800ca44e672c$export$8aceca7c77505534(coordinates) {
    const extent = $84be800ca44e672c$export$fe201bb3bbe031e9();
    for(let i = 0, ii = coordinates.length; i < ii; ++i)$84be800ca44e672c$export$1f820e3920fa5715(extent, coordinates[i]);
    return extent;
}
/**
 * @param {Array<number>} xs Xs.
 * @param {Array<number>} ys Ys.
 * @param {Extent} [dest] Destination extent.
 * @private
 * @return {Extent} Extent.
 */ function $84be800ca44e672c$var$_boundingExtentXYs(xs, ys, dest) {
    const minX = Math.min.apply(null, xs);
    const minY = Math.min.apply(null, ys);
    const maxX = Math.max.apply(null, xs);
    const maxY = Math.max.apply(null, ys);
    return $84be800ca44e672c$export$958e3e1a02eac4b6(minX, minY, maxX, maxY, dest);
}
function $84be800ca44e672c$export$ab1029bcae9ddb4a(extent, value, dest) {
    if (dest) {
        dest[0] = extent[0] - value;
        dest[1] = extent[1] - value;
        dest[2] = extent[2] + value;
        dest[3] = extent[3] + value;
        return dest;
    }
    return [
        extent[0] - value,
        extent[1] - value,
        extent[2] + value,
        extent[3] + value
    ];
}
function $84be800ca44e672c$export$9cd59f9826255e47(extent, dest) {
    if (dest) {
        dest[0] = extent[0];
        dest[1] = extent[1];
        dest[2] = extent[2];
        dest[3] = extent[3];
        return dest;
    }
    return extent.slice();
}
function $84be800ca44e672c$export$cbe64c389534206f(extent, x, y) {
    let dx, dy;
    if (x < extent[0]) dx = extent[0] - x;
    else if (extent[2] < x) dx = x - extent[2];
    else dx = 0;
    if (y < extent[1]) dy = extent[1] - y;
    else if (extent[3] < y) dy = y - extent[3];
    else dy = 0;
    return dx * dx + dy * dy;
}
function $84be800ca44e672c$export$ac68c24d37ca240f(extent, coordinate) {
    return $84be800ca44e672c$export$805bdfd6d6690e97(extent, coordinate[0], coordinate[1]);
}
function $84be800ca44e672c$export$be866b1e0809b17e(extent1, extent2) {
    return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
function $84be800ca44e672c$export$805bdfd6d6690e97(extent, x, y) {
    return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
function $84be800ca44e672c$export$f97905ead28c61a8(extent, coordinate) {
    const minX = extent[0];
    const minY = extent[1];
    const maxX = extent[2];
    const maxY = extent[3];
    const x = coordinate[0];
    const y = coordinate[1];
    let relationship = (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).UNKNOWN;
    if (x < minX) relationship = relationship | (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).LEFT;
    else if (x > maxX) relationship = relationship | (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).RIGHT;
    if (y < minY) relationship = relationship | (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).BELOW;
    else if (y > maxY) relationship = relationship | (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).ABOVE;
    if (relationship === (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).UNKNOWN) relationship = (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).INTERSECTING;
    return relationship;
}
function $84be800ca44e672c$export$fe201bb3bbe031e9() {
    return [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
}
function $84be800ca44e672c$export$958e3e1a02eac4b6(minX, minY, maxX, maxY, dest) {
    if (dest) {
        dest[0] = minX;
        dest[1] = minY;
        dest[2] = maxX;
        dest[3] = maxY;
        return dest;
    }
    return [
        minX,
        minY,
        maxX,
        maxY
    ];
}
function $84be800ca44e672c$export$3e2152b047719fa1(dest) {
    return $84be800ca44e672c$export$958e3e1a02eac4b6(Infinity, Infinity, -Infinity, -Infinity, dest);
}
function $84be800ca44e672c$export$4838bf78d04a9440(coordinate, dest) {
    const x = coordinate[0];
    const y = coordinate[1];
    return $84be800ca44e672c$export$958e3e1a02eac4b6(x, y, x, y, dest);
}
function $84be800ca44e672c$export$29e3ad4dbd0cb863(coordinates, dest) {
    const extent = $84be800ca44e672c$export$3e2152b047719fa1(dest);
    return $84be800ca44e672c$export$795cd48be4d5f252(extent, coordinates);
}
function $84be800ca44e672c$export$be0ab0bf96ca59ca(flatCoordinates, offset, end, stride, dest) {
    const extent = $84be800ca44e672c$export$3e2152b047719fa1(dest);
    return $84be800ca44e672c$export$30570204156ffd18(extent, flatCoordinates, offset, end, stride);
}
function $84be800ca44e672c$export$73b4897e93bc5c83(rings, dest) {
    const extent = $84be800ca44e672c$export$3e2152b047719fa1(dest);
    return $84be800ca44e672c$export$9b319549574402d7(extent, rings);
}
function $84be800ca44e672c$export$e9bab7fafb253603(extent1, extent2) {
    return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
function $84be800ca44e672c$export$998afeab28643bd6(extent1, extent2, tolerance) {
    return Math.abs(extent1[0] - extent2[0]) < tolerance && Math.abs(extent1[2] - extent2[2]) < tolerance && Math.abs(extent1[1] - extent2[1]) < tolerance && Math.abs(extent1[3] - extent2[3]) < tolerance;
}
function $84be800ca44e672c$export$8b58be045bf06082(extent1, extent2) {
    if (extent2[0] < extent1[0]) extent1[0] = extent2[0];
    if (extent2[2] > extent1[2]) extent1[2] = extent2[2];
    if (extent2[1] < extent1[1]) extent1[1] = extent2[1];
    if (extent2[3] > extent1[3]) extent1[3] = extent2[3];
    return extent1;
}
function $84be800ca44e672c$export$1f820e3920fa5715(extent, coordinate) {
    if (coordinate[0] < extent[0]) extent[0] = coordinate[0];
    if (coordinate[0] > extent[2]) extent[2] = coordinate[0];
    if (coordinate[1] < extent[1]) extent[1] = coordinate[1];
    if (coordinate[1] > extent[3]) extent[3] = coordinate[1];
}
function $84be800ca44e672c$export$795cd48be4d5f252(extent, coordinates) {
    for(let i = 0, ii = coordinates.length; i < ii; ++i)$84be800ca44e672c$export$1f820e3920fa5715(extent, coordinates[i]);
    return extent;
}
function $84be800ca44e672c$export$30570204156ffd18(extent, flatCoordinates, offset, end, stride) {
    for(; offset < end; offset += stride)$84be800ca44e672c$export$f1dab130b92b85a9(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
    return extent;
}
function $84be800ca44e672c$export$9b319549574402d7(extent, rings) {
    for(let i = 0, ii = rings.length; i < ii; ++i)$84be800ca44e672c$export$795cd48be4d5f252(extent, rings[i]);
    return extent;
}
function $84be800ca44e672c$export$f1dab130b92b85a9(extent, x, y) {
    extent[0] = Math.min(extent[0], x);
    extent[1] = Math.min(extent[1], y);
    extent[2] = Math.max(extent[2], x);
    extent[3] = Math.max(extent[3], y);
}
function $84be800ca44e672c$export$f9ed8a3d123a08e2(extent, callback) {
    let val;
    val = callback($84be800ca44e672c$export$8d09f5e2e1bf560d(extent));
    if (val) return val;
    val = callback($84be800ca44e672c$export$e77c1cf70445e168(extent));
    if (val) return val;
    val = callback($84be800ca44e672c$export$b84fa077c8b05295(extent));
    if (val) return val;
    val = callback($84be800ca44e672c$export$cb1538b07e6964ff(extent));
    if (val) return val;
    return false;
}
function $84be800ca44e672c$export$520c40045967cb15(extent) {
    let area = 0;
    if (!$84be800ca44e672c$export$dd1bc94b04021eeb(extent)) area = $84be800ca44e672c$export$3c49c185de0c2bfc(extent) * $84be800ca44e672c$export$c08559766941f856(extent);
    return area;
}
function $84be800ca44e672c$export$8d09f5e2e1bf560d(extent) {
    return [
        extent[0],
        extent[1]
    ];
}
function $84be800ca44e672c$export$e77c1cf70445e168(extent) {
    return [
        extent[2],
        extent[1]
    ];
}
function $84be800ca44e672c$export$c91255cadecfe081(extent) {
    return [
        (extent[0] + extent[2]) / 2,
        (extent[1] + extent[3]) / 2
    ];
}
function $84be800ca44e672c$export$a1cfd206661d0801(extent, corner) {
    let coordinate;
    if (corner === "bottom-left") coordinate = $84be800ca44e672c$export$8d09f5e2e1bf560d(extent);
    else if (corner === "bottom-right") coordinate = $84be800ca44e672c$export$e77c1cf70445e168(extent);
    else if (corner === "top-left") coordinate = $84be800ca44e672c$export$cb1538b07e6964ff(extent);
    else if (corner === "top-right") coordinate = $84be800ca44e672c$export$b84fa077c8b05295(extent);
    else (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(false, 13); // Invalid corner
    return coordinate;
}
function $84be800ca44e672c$export$7d6fa884b32a3751(extent1, extent2) {
    const minX = Math.min(extent1[0], extent2[0]);
    const minY = Math.min(extent1[1], extent2[1]);
    const maxX = Math.max(extent1[2], extent2[2]);
    const maxY = Math.max(extent1[3], extent2[3]);
    return (maxX - minX) * (maxY - minY);
}
function $84be800ca44e672c$export$13ba650faf8308(center, resolution, rotation, size, dest) {
    const [x0, y0, x1, y1, x2, y2, x3, y3] = $84be800ca44e672c$export$4b7a6fb4002cd6ac(center, resolution, rotation, size);
    return $84be800ca44e672c$export$958e3e1a02eac4b6(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), dest);
}
function $84be800ca44e672c$export$4b7a6fb4002cd6ac(center, resolution, rotation, size) {
    const dx = resolution * size[0] / 2;
    const dy = resolution * size[1] / 2;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    const xCos = dx * cosRotation;
    const xSin = dx * sinRotation;
    const yCos = dy * cosRotation;
    const ySin = dy * sinRotation;
    const x = center[0];
    const y = center[1];
    return [
        x - xCos + ySin,
        y - xSin - yCos,
        x - xCos - ySin,
        y - xSin + yCos,
        x + xCos - ySin,
        y + xSin + yCos,
        x + xCos + ySin,
        y + xSin - yCos,
        x - xCos + ySin,
        y - xSin - yCos
    ];
}
function $84be800ca44e672c$export$c08559766941f856(extent) {
    return extent[3] - extent[1];
}
function $84be800ca44e672c$export$f3fe0e9a60cde324(extent1, extent2) {
    const intersection = $84be800ca44e672c$export$72209efa88586d42(extent1, extent2);
    return $84be800ca44e672c$export$520c40045967cb15(intersection);
}
function $84be800ca44e672c$export$72209efa88586d42(extent1, extent2, dest) {
    const intersection = dest ? dest : $84be800ca44e672c$export$fe201bb3bbe031e9();
    if ($84be800ca44e672c$export$7b0a31e10bbff018(extent1, extent2)) {
        if (extent1[0] > extent2[0]) intersection[0] = extent1[0];
        else intersection[0] = extent2[0];
        if (extent1[1] > extent2[1]) intersection[1] = extent1[1];
        else intersection[1] = extent2[1];
        if (extent1[2] < extent2[2]) intersection[2] = extent1[2];
        else intersection[2] = extent2[2];
        if (extent1[3] < extent2[3]) intersection[3] = extent1[3];
        else intersection[3] = extent2[3];
    } else $84be800ca44e672c$export$3e2152b047719fa1(intersection);
    return intersection;
}
function $84be800ca44e672c$export$1bc603050bd777b1(extent) {
    return $84be800ca44e672c$export$3c49c185de0c2bfc(extent) + $84be800ca44e672c$export$c08559766941f856(extent);
}
function $84be800ca44e672c$export$31b21d0167753bb4(extent) {
    return [
        extent[2] - extent[0],
        extent[3] - extent[1]
    ];
}
function $84be800ca44e672c$export$cb1538b07e6964ff(extent) {
    return [
        extent[0],
        extent[3]
    ];
}
function $84be800ca44e672c$export$b84fa077c8b05295(extent) {
    return [
        extent[2],
        extent[3]
    ];
}
function $84be800ca44e672c$export$3c49c185de0c2bfc(extent) {
    return extent[2] - extent[0];
}
function $84be800ca44e672c$export$7b0a31e10bbff018(extent1, extent2) {
    return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
function $84be800ca44e672c$export$dd1bc94b04021eeb(extent) {
    return extent[2] < extent[0] || extent[3] < extent[1];
}
function $84be800ca44e672c$export$6a4fe494c558c238(extent, dest) {
    if (dest) {
        dest[0] = extent[0];
        dest[1] = extent[1];
        dest[2] = extent[2];
        dest[3] = extent[3];
        return dest;
    }
    return extent;
}
function $84be800ca44e672c$export$80cbab86674143b6(extent, value) {
    const deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
    const deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
    extent[0] -= deltaX;
    extent[2] += deltaX;
    extent[1] -= deltaY;
    extent[3] += deltaY;
}
function $84be800ca44e672c$export$a6a5a7a461419425(extent, start, end) {
    let intersects = false;
    const startRel = $84be800ca44e672c$export$f97905ead28c61a8(extent, start);
    const endRel = $84be800ca44e672c$export$f97905ead28c61a8(extent, end);
    if (startRel === (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).INTERSECTING || endRel === (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).INTERSECTING) intersects = true;
    else {
        const minX = extent[0];
        const minY = extent[1];
        const maxX = extent[2];
        const maxY = extent[3];
        const startX = start[0];
        const startY = start[1];
        const endX = end[0];
        const endY = end[1];
        const slope = (endY - startY) / (endX - startX);
        let x, y;
        if (!!(endRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).ABOVE) && !(startRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).ABOVE)) {
            // potentially intersects top
            x = endX - (endY - maxY) / slope;
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects && !!(endRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).RIGHT) && !(startRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).RIGHT)) {
            // potentially intersects right
            y = endY - (endX - maxX) * slope;
            intersects = y >= minY && y <= maxY;
        }
        if (!intersects && !!(endRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).BELOW) && !(startRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).BELOW)) {
            // potentially intersects bottom
            x = endX - (endY - minY) / slope;
            intersects = x >= minX && x <= maxX;
        }
        if (!intersects && !!(endRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).LEFT) && !(startRel & (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).LEFT)) {
            // potentially intersects left
            y = endY - (endX - minX) * slope;
            intersects = y >= minY && y <= maxY;
        }
    }
    return intersects;
}
function $84be800ca44e672c$export$9f9dcb98c894b623(extent, transformFn, dest, stops) {
    if ($84be800ca44e672c$export$dd1bc94b04021eeb(extent)) return $84be800ca44e672c$export$3e2152b047719fa1(dest);
    let coordinates = [];
    if (stops > 1) {
        const width = extent[2] - extent[0];
        const height = extent[3] - extent[1];
        for(let i = 0; i < stops; ++i)coordinates.push(extent[0] + width * i / stops, extent[1], extent[2], extent[1] + height * i / stops, extent[2] - width * i / stops, extent[3], extent[0], extent[3] - height * i / stops);
    } else coordinates = [
        extent[0],
        extent[1],
        extent[2],
        extent[1],
        extent[2],
        extent[3],
        extent[0],
        extent[3]
    ];
    transformFn(coordinates, coordinates, 2);
    const xs = [];
    const ys = [];
    for(let i = 0, l = coordinates.length; i < l; i += 2){
        xs.push(coordinates[i]);
        ys.push(coordinates[i + 1]);
    }
    return $84be800ca44e672c$var$_boundingExtentXYs(xs, ys, dest);
}
function $84be800ca44e672c$export$39a9ce3624977b84(extent, projection) {
    const projectionExtent = projection.getExtent();
    const center = $84be800ca44e672c$export$c91255cadecfe081(extent);
    if (projection.canWrapX() && (center[0] < projectionExtent[0] || center[0] >= projectionExtent[2])) {
        const worldWidth = $84be800ca44e672c$export$3c49c185de0c2bfc(projectionExtent);
        const worldsAway = Math.floor((center[0] - projectionExtent[0]) / worldWidth);
        const offset = worldsAway * worldWidth;
        extent[0] -= offset;
        extent[2] -= offset;
    }
    return extent;
}
function $84be800ca44e672c$export$9031237f01de0947(extent, projection) {
    if (projection.canWrapX()) {
        const projectionExtent = projection.getExtent();
        if (!isFinite(extent[0]) || !isFinite(extent[2])) return [
            [
                projectionExtent[0],
                extent[1],
                projectionExtent[2],
                extent[3]
            ]
        ];
        $84be800ca44e672c$export$39a9ce3624977b84(extent, projection);
        const worldWidth = $84be800ca44e672c$export$3c49c185de0c2bfc(projectionExtent);
        if ($84be800ca44e672c$export$3c49c185de0c2bfc(extent) > worldWidth) // the extent wraps around on itself
        return [
            [
                projectionExtent[0],
                extent[1],
                projectionExtent[2],
                extent[3]
            ]
        ];
        if (extent[0] < projectionExtent[0]) // the extent crosses the anti meridian, so it needs to be sliced
        return [
            [
                extent[0] + worldWidth,
                extent[1],
                projectionExtent[2],
                extent[3]
            ],
            [
                projectionExtent[0],
                extent[1],
                extent[2],
                extent[3]
            ]
        ];
        if (extent[2] > projectionExtent[2]) // the extent crosses the anti meridian, so it needs to be sliced
        return [
            [
                extent[0],
                extent[1],
                projectionExtent[2],
                extent[3]
            ],
            [
                projectionExtent[0],
                extent[1],
                extent[2] - worldWidth,
                extent[3]
            ]
        ];
    }
    return [
        extent
    ];
}



/**
 * @module ol/coordinate
 */ 

/**
 * @module ol/string
 */ /**
 * @param {number} number Number to be formatted
 * @param {number} width The desired width
 * @param {number} [precision] Precision of the output string (i.e. number of decimal places)
 * @return {string} Formatted string
 */ function $104d4d01eb549908$export$24be126cb0a7bbeb(number, width, precision) {
    const numberString = precision !== undefined ? number.toFixed(precision) : "" + number;
    let decimal = numberString.indexOf(".");
    decimal = decimal === -1 ? numberString.length : decimal;
    return decimal > width ? numberString : new Array(1 + width - decimal).join("0") + numberString;
}
function $104d4d01eb549908$export$66e1c0999abad646(v1, v2) {
    const s1 = ("" + v1).split(".");
    const s2 = ("" + v2).split(".");
    for(let i = 0; i < Math.max(s1.length, s2.length); i++){
        const n1 = parseInt(s1[i] || "0", 10);
        const n2 = parseInt(s2[i] || "0", 10);
        if (n1 > n2) return 1;
        if (n2 > n1) return -1;
    }
    return 0;
}


function $c65bc16e55ef0e33$export$e16d8520af44a096(coordinate, delta) {
    coordinate[0] += +delta[0];
    coordinate[1] += +delta[1];
    return coordinate;
}
function $c65bc16e55ef0e33$export$cbe80a3fcd2b99b7(coordinate, circle) {
    const r = circle.getRadius();
    const center = circle.getCenter();
    const x0 = center[0];
    const y0 = center[1];
    const x1 = coordinate[0];
    const y1 = coordinate[1];
    let dx = x1 - x0;
    const dy = y1 - y0;
    if (dx === 0 && dy === 0) dx = 1;
    const d = Math.sqrt(dx * dx + dy * dy);
    const x = x0 + r * dx / d;
    const y = y0 + r * dy / d;
    return [
        x,
        y
    ];
}
function $c65bc16e55ef0e33$export$18cdd31d17f97131(coordinate, segment) {
    const x0 = coordinate[0];
    const y0 = coordinate[1];
    const start = segment[0];
    const end = segment[1];
    const x1 = start[0];
    const y1 = start[1];
    const x2 = end[0];
    const y2 = end[1];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const along = dx === 0 && dy === 0 ? 0 : (dx * (x0 - x1) + dy * (y0 - y1)) / (dx * dx + dy * dy || 0);
    let x, y;
    if (along <= 0) {
        x = x1;
        y = y1;
    } else if (along >= 1) {
        x = x2;
        y = y2;
    } else {
        x = x1 + along * dx;
        y = y1 + along * dy;
    }
    return [
        x,
        y
    ];
}
function $c65bc16e55ef0e33$export$35ad6765fe262b6(fractionDigits) {
    return(/**
     * @param {Coordinate} coordinate Coordinate.
     * @return {string} String XY.
     */ function(coordinate) {
        return $c65bc16e55ef0e33$export$9ff8f16060979e0a(coordinate, fractionDigits);
    });
}
function $c65bc16e55ef0e33$export$6eb0ac5f024d8590(hemispheres, degrees, fractionDigits) {
    const normalizedDegrees = (0, $57ec69d152197e1d$export$ba467bec01d66def)(degrees + 180, 360) - 180;
    const x = Math.abs(3600 * normalizedDegrees);
    const decimals = fractionDigits || 0;
    let deg = Math.floor(x / 3600);
    let min = Math.floor((x - deg * 3600) / 60);
    let sec = (0, $57ec69d152197e1d$export$a81f732198733497)(x - deg * 3600 - min * 60, decimals);
    if (sec >= 60) {
        sec = 0;
        min += 1;
    }
    if (min >= 60) {
        min = 0;
        deg += 1;
    }
    let hdms = deg + "\xb0";
    if (min !== 0 || sec !== 0) hdms += " " + (0, $104d4d01eb549908$export$24be126cb0a7bbeb)(min, 2) + "′";
    if (sec !== 0) hdms += " " + (0, $104d4d01eb549908$export$24be126cb0a7bbeb)(sec, 2, decimals) + "″";
    if (normalizedDegrees !== 0) hdms += " " + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
    return hdms;
}
function $c65bc16e55ef0e33$export$d9468344d3651243(coordinate, template, fractionDigits) {
    if (coordinate) return template.replace("{x}", coordinate[0].toFixed(fractionDigits)).replace("{y}", coordinate[1].toFixed(fractionDigits));
    return "";
}
function $c65bc16e55ef0e33$export$e9bab7fafb253603(coordinate1, coordinate2) {
    let equals = true;
    for(let i = coordinate1.length - 1; i >= 0; --i)if (coordinate1[i] != coordinate2[i]) {
        equals = false;
        break;
    }
    return equals;
}
function $c65bc16e55ef0e33$export$bb628a54ab399bc9(coordinate, angle) {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    const y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    coordinate[0] = x;
    coordinate[1] = y;
    return coordinate;
}
function $c65bc16e55ef0e33$export$dcdf75081b88279d(coordinate, scale) {
    coordinate[0] *= scale;
    coordinate[1] *= scale;
    return coordinate;
}
function $c65bc16e55ef0e33$export$88e6ebb4fe54f538(coord1, coord2) {
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    return dx * dx + dy * dy;
}
function $c65bc16e55ef0e33$export$9f17032d917177de(coord1, coord2) {
    return Math.sqrt($c65bc16e55ef0e33$export$88e6ebb4fe54f538(coord1, coord2));
}
function $c65bc16e55ef0e33$export$6985570514055196(coordinate, segment) {
    return $c65bc16e55ef0e33$export$88e6ebb4fe54f538(coordinate, $c65bc16e55ef0e33$export$18cdd31d17f97131(coordinate, segment));
}
function $c65bc16e55ef0e33$export$c883fd238161f841(coordinate, fractionDigits) {
    if (coordinate) return $c65bc16e55ef0e33$export$6eb0ac5f024d8590("NS", coordinate[1], fractionDigits) + " " + $c65bc16e55ef0e33$export$6eb0ac5f024d8590("EW", coordinate[0], fractionDigits);
    return "";
}
function $c65bc16e55ef0e33$export$9ff8f16060979e0a(coordinate, fractionDigits) {
    return $c65bc16e55ef0e33$export$d9468344d3651243(coordinate, "{x}, {y}", fractionDigits);
}
function $c65bc16e55ef0e33$export$39a9ce3624977b84(coordinate, projection) {
    if (projection.canWrapX()) {
        const worldWidth = (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(projection.getExtent());
        const worldsAway = $c65bc16e55ef0e33$export$24e2b27d1ff0c1d5(coordinate, projection, worldWidth);
        if (worldsAway) coordinate[0] -= worldsAway * worldWidth;
    }
    return coordinate;
}
function $c65bc16e55ef0e33$export$24e2b27d1ff0c1d5(coordinate, projection, sourceExtentWidth) {
    const projectionExtent = projection.getExtent();
    let worldsAway = 0;
    if (projection.canWrapX() && (coordinate[0] < projectionExtent[0] || coordinate[0] > projectionExtent[2])) {
        sourceExtentWidth = sourceExtentWidth || (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(projectionExtent);
        worldsAway = Math.floor((coordinate[0] - projectionExtent[0]) / sourceExtentWidth);
    }
    return worldsAway;
}


/**
 * @module ol/sphere
 */ 
const $d164a570a58ed2be$export$63f2df7bd7371262 = 6371008.8;
function $d164a570a58ed2be$export$79376507b09a66f(c1, c2, radius) {
    radius = radius || $d164a570a58ed2be$export$63f2df7bd7371262;
    const lat1 = (0, $57ec69d152197e1d$export$cba01ba138429a1d)(c1[1]);
    const lat2 = (0, $57ec69d152197e1d$export$cba01ba138429a1d)(c2[1]);
    const deltaLatBy2 = (lat2 - lat1) / 2;
    const deltaLonBy2 = (0, $57ec69d152197e1d$export$cba01ba138429a1d)(c2[0] - c1[0]) / 2;
    const a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
    return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/**
 * Get the cumulative great circle length of linestring coordinates (geographic).
 * @param {Array} coordinates Linestring coordinates.
 * @param {number} radius The sphere radius to use.
 * @return {number} The length (in meters).
 */ function $d164a570a58ed2be$var$getLengthInternal(coordinates, radius) {
    let length = 0;
    for(let i = 0, ii = coordinates.length; i < ii - 1; ++i)length += $d164a570a58ed2be$export$79376507b09a66f(coordinates[i], coordinates[i + 1], radius);
    return length;
}
function $d164a570a58ed2be$export$f0d11c074a923179(geometry, options) {
    options = options || {};
    const radius = options.radius || $d164a570a58ed2be$export$63f2df7bd7371262;
    const projection = options.projection || "EPSG:3857";
    const type = geometry.getType();
    if (type !== "GeometryCollection") geometry = geometry.clone().transform(projection, "EPSG:4326");
    let length = 0;
    let coordinates, coords, i, ii, j, jj;
    switch(type){
        case "Point":
        case "MultiPoint":
            break;
        case "LineString":
        case "LinearRing":
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ geometry.getCoordinates();
            length = $d164a570a58ed2be$var$getLengthInternal(coordinates, radius);
            break;
        case "MultiLineString":
        case "Polygon":
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ geometry.getCoordinates();
            for(i = 0, ii = coordinates.length; i < ii; ++i)length += $d164a570a58ed2be$var$getLengthInternal(coordinates[i], radius);
            break;
        case "MultiPolygon":
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ geometry.getCoordinates();
            for(i = 0, ii = coordinates.length; i < ii; ++i){
                coords = coordinates[i];
                for(j = 0, jj = coords.length; j < jj; ++j)length += $d164a570a58ed2be$var$getLengthInternal(coords[j], radius);
            }
            break;
        case "GeometryCollection":
            {
                const geometries = /** @type {import("./geom/GeometryCollection.js").default} */ geometry.getGeometries();
                for(i = 0, ii = geometries.length; i < ii; ++i)length += $d164a570a58ed2be$export$f0d11c074a923179(geometries[i], options);
                break;
            }
        default:
            throw new Error("Unsupported geometry type: " + type);
    }
    return length;
}
/**
 * Returns the spherical area for a list of coordinates.
 *
 * [Reference](https://trs.jpl.nasa.gov/handle/2014/40409)
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 * Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates List of coordinates of a linear
 * ring. If the ring is oriented clockwise, the area will be positive,
 * otherwise it will be negative.
 * @param {number} radius The sphere radius.
 * @return {number} Area (in square meters).
 */ function $d164a570a58ed2be$var$getAreaInternal(coordinates, radius) {
    let area = 0;
    const len = coordinates.length;
    let x1 = coordinates[len - 1][0];
    let y1 = coordinates[len - 1][1];
    for(let i = 0; i < len; i++){
        const x2 = coordinates[i][0];
        const y2 = coordinates[i][1];
        area += (0, $57ec69d152197e1d$export$cba01ba138429a1d)(x2 - x1) * (2 + Math.sin((0, $57ec69d152197e1d$export$cba01ba138429a1d)(y1)) + Math.sin((0, $57ec69d152197e1d$export$cba01ba138429a1d)(y2)));
        x1 = x2;
        y1 = y2;
    }
    return area * radius * radius / 2.0;
}
function $d164a570a58ed2be$export$520c40045967cb15(geometry, options) {
    options = options || {};
    const radius = options.radius || $d164a570a58ed2be$export$63f2df7bd7371262;
    const projection = options.projection || "EPSG:3857";
    const type = geometry.getType();
    if (type !== "GeometryCollection") geometry = geometry.clone().transform(projection, "EPSG:4326");
    let area = 0;
    let coordinates, coords, i, ii, j, jj;
    switch(type){
        case "Point":
        case "MultiPoint":
        case "LineString":
        case "MultiLineString":
        case "LinearRing":
            break;
        case "Polygon":
            coordinates = /** @type {import("./geom/Polygon.js").default} */ geometry.getCoordinates();
            area = Math.abs($d164a570a58ed2be$var$getAreaInternal(coordinates[0], radius));
            for(i = 1, ii = coordinates.length; i < ii; ++i)area -= Math.abs($d164a570a58ed2be$var$getAreaInternal(coordinates[i], radius));
            break;
        case "MultiPolygon":
            coordinates = /** @type {import("./geom/SimpleGeometry.js").default} */ geometry.getCoordinates();
            for(i = 0, ii = coordinates.length; i < ii; ++i){
                coords = coordinates[i];
                area += Math.abs($d164a570a58ed2be$var$getAreaInternal(coords[0], radius));
                for(j = 1, jj = coords.length; j < jj; ++j)area -= Math.abs($d164a570a58ed2be$var$getAreaInternal(coords[j], radius));
            }
            break;
        case "GeometryCollection":
            {
                const geometries = /** @type {import("./geom/GeometryCollection.js").default} */ geometry.getGeometries();
                for(i = 0, ii = geometries.length; i < ii; ++i)area += $d164a570a58ed2be$export$520c40045967cb15(geometries[i], options);
                break;
            }
        default:
            throw new Error("Unsupported geometry type: " + type);
    }
    return area;
}
function $d164a570a58ed2be$export$cc800923e997bb8(c1, distance, bearing, radius) {
    radius = radius || $d164a570a58ed2be$export$63f2df7bd7371262;
    const lat1 = (0, $57ec69d152197e1d$export$cba01ba138429a1d)(c1[1]);
    const lon1 = (0, $57ec69d152197e1d$export$cba01ba138429a1d)(c1[0]);
    const dByR = distance / radius;
    const lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
    const lon = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
    return [
        (0, $57ec69d152197e1d$export$56cb859c01fa134d)(lon),
        (0, $57ec69d152197e1d$export$56cb859c01fa134d)(lat)
    ];
}


/**
 * @module ol/console
 */ /**
 * @typedef {'info'|'warn'|'error'|'none'} Level
 */ /**
 * @type {Object<Level, number>}
 */ const $46b514704f775400$var$levels = {
    info: 1,
    warn: 2,
    error: 3,
    none: 4
};
/**
 * @type {number}
 */ let $46b514704f775400$var$level = $46b514704f775400$var$levels.info;
function $46b514704f775400$export$2c97a59140dbf245(l) {
    $46b514704f775400$var$level = $46b514704f775400$var$levels[l];
}
function $46b514704f775400$export$bef1f36f5486a6a3(...args) {
    if ($46b514704f775400$var$level > $46b514704f775400$var$levels.info) return;
    console.log(...args); // eslint-disable-line no-console
}
function $46b514704f775400$export$c106dd0671a0fc2d(...args) {
    if ($46b514704f775400$var$level > $46b514704f775400$var$levels.warn) return;
    console.warn(...args); // eslint-disable-line no-console
}
function $46b514704f775400$export$a3bc9b8ed74fc(...args) {
    if ($46b514704f775400$var$level > $46b514704f775400$var$levels.error) return;
    console.error(...args); // eslint-disable-line no-console
}


let $983289ae1d13cd2a$var$showCoordinateWarning = true;
function $983289ae1d13cd2a$export$ed949affbc7c4223(disable) {
    const hide = disable === undefined ? true : disable;
    $983289ae1d13cd2a$var$showCoordinateWarning = !hide;
}
function $983289ae1d13cd2a$export$dd516654c5f598fb(input, output) {
    if (output !== undefined) {
        for(let i = 0, ii = input.length; i < ii; ++i)output[i] = input[i];
        output;
    } else output = input.slice();
    return output;
}
function $983289ae1d13cd2a$export$83e8ab53904f8022(input, output) {
    if (output !== undefined && input !== output) {
        for(let i = 0, ii = input.length; i < ii; ++i)output[i] = input[i];
        input = output;
    }
    return input;
}
function $983289ae1d13cd2a$export$59ae956cd3e343f7(projection) {
    (0, $685869700e166c3a$export$e16d8520af44a096)(projection.getCode(), projection);
    (0, $00727a2fe5eeabf8$export$e16d8520af44a096)(projection, projection, $983289ae1d13cd2a$export$dd516654c5f598fb);
}
function $983289ae1d13cd2a$export$638ad73f7aafb913(projections) {
    projections.forEach($983289ae1d13cd2a$export$59ae956cd3e343f7);
}
function $983289ae1d13cd2a$export$3988ae62b71be9a3(projectionLike) {
    return typeof projectionLike === "string" ? (0, $685869700e166c3a$export$3988ae62b71be9a3)(/** @type {string} */ projectionLike) : /** @type {Projection} */ projectionLike || null;
}
function $983289ae1d13cd2a$export$2d8f7b4eec383d44(projection, resolution, point, units) {
    projection = $983289ae1d13cd2a$export$3988ae62b71be9a3(projection);
    let pointResolution;
    const getter = projection.getPointResolutionFunc();
    if (getter) {
        pointResolution = getter(resolution, point);
        if (units && units !== projection.getUnits()) {
            const metersPerUnit = projection.getMetersPerUnit();
            if (metersPerUnit) pointResolution = pointResolution * metersPerUnit / (0, $6a4fde186e5464e9$export$1482081eec883108)[units];
        }
    } else {
        const projUnits = projection.getUnits();
        if (projUnits == "degrees" && !units || units == "degrees") pointResolution = resolution;
        else {
            // Estimate point resolution by transforming the center pixel to EPSG:4326,
            // measuring its width and height on the normal sphere, and taking the
            // average of the width and height.
            const toEPSG4326 = $983289ae1d13cd2a$export$e3c4995a701c26a3(projection, $983289ae1d13cd2a$export$3988ae62b71be9a3("EPSG:4326"));
            if (toEPSG4326 === $983289ae1d13cd2a$export$83e8ab53904f8022 && projUnits !== "degrees") // no transform is available
            pointResolution = resolution * projection.getMetersPerUnit();
            else {
                let vertices = [
                    point[0] - resolution / 2,
                    point[1],
                    point[0] + resolution / 2,
                    point[1],
                    point[0],
                    point[1] - resolution / 2,
                    point[0],
                    point[1] + resolution / 2
                ];
                vertices = toEPSG4326(vertices, vertices, 2);
                const width = (0, $d164a570a58ed2be$export$79376507b09a66f)(vertices.slice(0, 2), vertices.slice(2, 4));
                const height = (0, $d164a570a58ed2be$export$79376507b09a66f)(vertices.slice(4, 6), vertices.slice(6, 8));
                pointResolution = (width + height) / 2;
            }
            const metersPerUnit = units ? (0, $6a4fde186e5464e9$export$1482081eec883108)[units] : projection.getMetersPerUnit();
            if (metersPerUnit !== undefined) pointResolution /= metersPerUnit;
        }
    }
    return pointResolution;
}
function $983289ae1d13cd2a$export$eeb8392580a05a37(projections) {
    $983289ae1d13cd2a$export$638ad73f7aafb913(projections);
    projections.forEach(function(source) {
        projections.forEach(function(destination) {
            if (source !== destination) (0, $00727a2fe5eeabf8$export$e16d8520af44a096)(source, destination, $983289ae1d13cd2a$export$dd516654c5f598fb);
        });
    });
}
function $983289ae1d13cd2a$export$4856f21c2f184f24(projections1, projections2, forwardTransform, inverseTransform) {
    projections1.forEach(function(projection1) {
        projections2.forEach(function(projection2) {
            (0, $00727a2fe5eeabf8$export$e16d8520af44a096)(projection1, projection2, forwardTransform);
            (0, $00727a2fe5eeabf8$export$e16d8520af44a096)(projection2, projection1, inverseTransform);
        });
    });
}
function $983289ae1d13cd2a$export$4860237d10380594() {
    (0, $685869700e166c3a$export$42ffd38884aecdac)();
    (0, $00727a2fe5eeabf8$export$42ffd38884aecdac)();
}
function $983289ae1d13cd2a$export$549167224996a0fb(projection, defaultCode) {
    if (!projection) return $983289ae1d13cd2a$export$3988ae62b71be9a3(defaultCode);
    if (typeof projection === "string") return $983289ae1d13cd2a$export$3988ae62b71be9a3(projection);
    return /** @type {Projection} */ projection;
}
function $983289ae1d13cd2a$export$6b4aafd331159e0d(coordTransform) {
    return(/**
     * @param {Array<number>} input Input.
     * @param {Array<number>} [output] Output.
     * @param {number} [dimension] Dimension.
     * @return {Array<number>} Output.
     */ function(input, output, dimension) {
        const length = input.length;
        dimension = dimension !== undefined ? dimension : 2;
        output = output !== undefined ? output : new Array(length);
        for(let i = 0; i < length; i += dimension){
            const point = coordTransform(input.slice(i, i + dimension));
            const pointLength = point.length;
            for(let j = 0, jj = dimension; j < jj; ++j)output[i + j] = j >= pointLength ? input[i + j] : point[j];
        }
        return output;
    });
}
function $983289ae1d13cd2a$export$6b1c2e6623f4f49d(source, destination, forward, inverse) {
    const sourceProj = $983289ae1d13cd2a$export$3988ae62b71be9a3(source);
    const destProj = $983289ae1d13cd2a$export$3988ae62b71be9a3(destination);
    (0, $00727a2fe5eeabf8$export$e16d8520af44a096)(sourceProj, destProj, $983289ae1d13cd2a$export$6b4aafd331159e0d(forward));
    (0, $00727a2fe5eeabf8$export$e16d8520af44a096)(destProj, sourceProj, $983289ae1d13cd2a$export$6b4aafd331159e0d(inverse));
}
function $983289ae1d13cd2a$export$b15d9668511529b9(coordinate, projection) {
    $983289ae1d13cd2a$export$ed949affbc7c4223();
    return $983289ae1d13cd2a$export$51186ad6e864892a(coordinate, "EPSG:4326", projection !== undefined ? projection : "EPSG:3857");
}
function $983289ae1d13cd2a$export$3fb495868742d370(coordinate, projection) {
    const lonLat = $983289ae1d13cd2a$export$51186ad6e864892a(coordinate, projection !== undefined ? projection : "EPSG:3857", "EPSG:4326");
    const lon = lonLat[0];
    if (lon < -180 || lon > 180) lonLat[0] = (0, $57ec69d152197e1d$export$ba467bec01d66def)(lon + 180, 360) - 180;
    return lonLat;
}
function $983289ae1d13cd2a$export$fe091d73a555748b(projection1, projection2) {
    if (projection1 === projection2) return true;
    const equalUnits = projection1.getUnits() === projection2.getUnits();
    if (projection1.getCode() === projection2.getCode()) return equalUnits;
    const transformFunc = $983289ae1d13cd2a$export$e3c4995a701c26a3(projection1, projection2);
    return transformFunc === $983289ae1d13cd2a$export$dd516654c5f598fb && equalUnits;
}
function $983289ae1d13cd2a$export$e3c4995a701c26a3(sourceProjection, destinationProjection) {
    const sourceCode = sourceProjection.getCode();
    const destinationCode = destinationProjection.getCode();
    let transformFunc = (0, $00727a2fe5eeabf8$export$3988ae62b71be9a3)(sourceCode, destinationCode);
    if (!transformFunc) transformFunc = $983289ae1d13cd2a$export$83e8ab53904f8022;
    return transformFunc;
}
function $983289ae1d13cd2a$export$fce0c6cfca85ed96(source, destination) {
    const sourceProjection = $983289ae1d13cd2a$export$3988ae62b71be9a3(source);
    const destinationProjection = $983289ae1d13cd2a$export$3988ae62b71be9a3(destination);
    return $983289ae1d13cd2a$export$e3c4995a701c26a3(sourceProjection, destinationProjection);
}
function $983289ae1d13cd2a$export$51186ad6e864892a(coordinate, source, destination) {
    const transformFunc = $983289ae1d13cd2a$export$fce0c6cfca85ed96(source, destination);
    return transformFunc(coordinate, undefined, coordinate.length);
}
function $983289ae1d13cd2a$export$751c68e0e0efff79(extent, source, destination, stops) {
    const transformFunc = $983289ae1d13cd2a$export$fce0c6cfca85ed96(source, destination);
    return (0, $84be800ca44e672c$export$9f9dcb98c894b623)(extent, transformFunc, undefined, stops);
}
function $983289ae1d13cd2a$export$affbde93b1db73f8(point, sourceProjection, destinationProjection) {
    const transformFunc = $983289ae1d13cd2a$export$e3c4995a701c26a3(sourceProjection, destinationProjection);
    return transformFunc(point);
}
/**
 * @type {Projection|null}
 */ let $983289ae1d13cd2a$var$userProjection = null;
function $983289ae1d13cd2a$export$d0aeadbeac54116e(projection) {
    $983289ae1d13cd2a$var$userProjection = $983289ae1d13cd2a$export$3988ae62b71be9a3(projection);
}
function $983289ae1d13cd2a$export$1ae11279759d4e8f() {
    $983289ae1d13cd2a$var$userProjection = null;
}
function $983289ae1d13cd2a$export$3973b77d5f6f2790() {
    return $983289ae1d13cd2a$var$userProjection;
}
function $983289ae1d13cd2a$export$aa7494edfbe36197() {
    $983289ae1d13cd2a$export$d0aeadbeac54116e("EPSG:4326");
}
function $983289ae1d13cd2a$export$698f563af1ba02a5(coordinate, sourceProjection) {
    if (!$983289ae1d13cd2a$var$userProjection) return coordinate;
    return $983289ae1d13cd2a$export$51186ad6e864892a(coordinate, sourceProjection, $983289ae1d13cd2a$var$userProjection);
}
function $983289ae1d13cd2a$export$d4b8ec0b96db1ee2(coordinate, destProjection) {
    if (!$983289ae1d13cd2a$var$userProjection) {
        if ($983289ae1d13cd2a$var$showCoordinateWarning && !(0, $c65bc16e55ef0e33$export$e9bab7fafb253603)(coordinate, [
            0,
            0
        ]) && coordinate[0] >= -180 && coordinate[0] <= 180 && coordinate[1] >= -90 && coordinate[1] <= 90) {
            $983289ae1d13cd2a$var$showCoordinateWarning = false;
            (0, $46b514704f775400$export$c106dd0671a0fc2d)("Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.");
        }
        return coordinate;
    }
    return $983289ae1d13cd2a$export$51186ad6e864892a(coordinate, $983289ae1d13cd2a$var$userProjection, destProjection);
}
function $983289ae1d13cd2a$export$96bfd09e2cffb006(extent, sourceProjection) {
    if (!$983289ae1d13cd2a$var$userProjection) return extent;
    return $983289ae1d13cd2a$export$751c68e0e0efff79(extent, sourceProjection, $983289ae1d13cd2a$var$userProjection);
}
function $983289ae1d13cd2a$export$494be3a3a25689ca(extent, destProjection) {
    if (!$983289ae1d13cd2a$var$userProjection) return extent;
    return $983289ae1d13cd2a$export$751c68e0e0efff79(extent, $983289ae1d13cd2a$var$userProjection, destProjection);
}
function $983289ae1d13cd2a$export$b56bb8ad8b3a00e9(resolution, sourceProjection) {
    if (!$983289ae1d13cd2a$var$userProjection) return resolution;
    const sourceUnits = $983289ae1d13cd2a$export$3988ae62b71be9a3(sourceProjection).getUnits();
    const userUnits = $983289ae1d13cd2a$var$userProjection.getUnits();
    return sourceUnits && userUnits ? resolution * (0, $6a4fde186e5464e9$export$1482081eec883108)[sourceUnits] / (0, $6a4fde186e5464e9$export$1482081eec883108)[userUnits] : resolution;
}
function $983289ae1d13cd2a$export$bd1cd3b88140b906(resolution, destProjection) {
    if (!$983289ae1d13cd2a$var$userProjection) return resolution;
    const sourceUnits = $983289ae1d13cd2a$export$3988ae62b71be9a3(destProjection).getUnits();
    const userUnits = $983289ae1d13cd2a$var$userProjection.getUnits();
    return sourceUnits && userUnits ? resolution * (0, $6a4fde186e5464e9$export$1482081eec883108)[userUnits] / (0, $6a4fde186e5464e9$export$1482081eec883108)[sourceUnits] : resolution;
}
function $983289ae1d13cd2a$export$1873f9cfeb8bd1d6(sourceProj, destProj, transform) {
    return function(coord) {
        let transformed, worldsAway;
        if (sourceProj.canWrapX()) {
            const sourceExtent = sourceProj.getExtent();
            const sourceExtentWidth = (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(sourceExtent);
            coord = coord.slice(0);
            worldsAway = (0, $c65bc16e55ef0e33$export$24e2b27d1ff0c1d5)(coord, sourceProj, sourceExtentWidth);
            if (worldsAway) // Move x to the real world
            coord[0] = coord[0] - worldsAway * sourceExtentWidth;
            coord[0] = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(coord[0], sourceExtent[0], sourceExtent[2]);
            coord[1] = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(coord[1], sourceExtent[1], sourceExtent[3]);
            transformed = transform(coord);
        } else transformed = transform(coord);
        if (worldsAway && destProj.canWrapX()) // Move transformed coordinate back to the offset world
        transformed[0] += worldsAway * (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(destProj.getExtent());
        return transformed;
    };
}
function $983289ae1d13cd2a$export$86eed449eb2dcac4() {
    // Add transformations that don't alter coordinates to convert within set of
    // projections with equal meaning.
    $983289ae1d13cd2a$export$eeb8392580a05a37((0, $e6bed287da12a40a$export$b508d7ad9a891c1b));
    $983289ae1d13cd2a$export$eeb8392580a05a37((0, $366cef9ace33c799$export$b508d7ad9a891c1b));
    // Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
    // coordinates and back.
    $983289ae1d13cd2a$export$4856f21c2f184f24((0, $366cef9ace33c799$export$b508d7ad9a891c1b), (0, $e6bed287da12a40a$export$b508d7ad9a891c1b), (0, $e6bed287da12a40a$export$1ff8bb36c0983070), (0, $e6bed287da12a40a$export$8c71322ec28ed6b4));
}
$983289ae1d13cd2a$export$86eed449eb2dcac4();





/**
 * @module ol/centerconstraint
 */ 
function $266312e45c8c12e4$export$c2f0af2c946f6897(extent, onlyCenter, smooth) {
    return(/**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */ function(center, resolution, size, isMoving, centerShift) {
        if (!center) return undefined;
        if (!resolution && !onlyCenter) return center;
        const viewWidth = onlyCenter ? 0 : size[0] * resolution;
        const viewHeight = onlyCenter ? 0 : size[1] * resolution;
        const shiftX = centerShift ? centerShift[0] : 0;
        const shiftY = centerShift ? centerShift[1] : 0;
        let minX = extent[0] + viewWidth / 2 + shiftX;
        let maxX = extent[2] - viewWidth / 2 + shiftX;
        let minY = extent[1] + viewHeight / 2 + shiftY;
        let maxY = extent[3] - viewHeight / 2 + shiftY;
        // note: when zooming out of bounds, min and max values for x and y may
        // end up inverted (min > max); this has to be accounted for
        if (minX > maxX) {
            minX = (maxX + minX) / 2;
            maxX = minX;
        }
        if (minY > maxY) {
            minY = (maxY + minY) / 2;
            maxY = minY;
        }
        let x = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(center[0], minX, maxX);
        let y = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(center[1], minY, maxY);
        // during an interaction, allow some overscroll
        if (isMoving && smooth && resolution) {
            const ratio = 30 * resolution;
            x += -ratio * Math.log(1 + Math.max(0, minX - center[0]) / ratio) + ratio * Math.log(1 + Math.max(0, center[0] - maxX) / ratio);
            y += -ratio * Math.log(1 + Math.max(0, minY - center[1]) / ratio) + ratio * Math.log(1 + Math.max(0, center[1] - maxY) / ratio);
        }
        return [
            x,
            y
        ];
    });
}
function $266312e45c8c12e4$export$f883a24d5edde77c(center) {
    return center;
}



/**
 * @module ol/resolutionconstraint
 */ 


/**
 * @typedef {function((number|undefined), number, import("./size.js").Size, boolean=): (number|undefined)} Type
 */ /**
 * Returns a modified resolution taking into account the viewport size and maximum
 * allowed extent.
 * @param {number} resolution Resolution
 * @param {import("./extent.js").Extent} maxExtent Maximum allowed extent.
 * @param {import("./size.js").Size} viewportSize Viewport size.
 * @param {boolean} showFullExtent Whether to show the full extent.
 * @return {number} Capped resolution.
 */ function $ba6928caf79ac783$var$getViewportClampedResolution(resolution, maxExtent, viewportSize, showFullExtent) {
    const xResolution = (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(maxExtent) / viewportSize[0];
    const yResolution = (0, $84be800ca44e672c$export$c08559766941f856)(maxExtent) / viewportSize[1];
    if (showFullExtent) return Math.min(resolution, Math.max(xResolution, yResolution));
    return Math.min(resolution, Math.min(xResolution, yResolution));
}
/**
 * Returns a modified resolution to be between maxResolution and minResolution while
 * still allowing the value to be slightly out of bounds.
 * Note: the computation is based on the logarithm function (ln):
 *  - at 1, ln(x) is 0
 *  - above 1, ln(x) keeps increasing but at a much slower pace than x
 * The final result is clamped to prevent getting too far away from bounds.
 * @param {number} resolution Resolution.
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @return {number} Smoothed resolution.
 */ function $ba6928caf79ac783$var$getSmoothClampedResolution(resolution, maxResolution, minResolution) {
    let result = Math.min(resolution, maxResolution);
    const ratio = 50;
    result *= Math.log(1 + ratio * Math.max(0, resolution / maxResolution - 1)) / ratio + 1;
    if (minResolution) {
        result = Math.max(result, minResolution);
        result /= Math.log(1 + ratio * Math.max(0, minResolution / resolution - 1)) / ratio + 1;
    }
    return (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(result, minResolution / 2, maxResolution * 2);
}
function $ba6928caf79ac783$export$d65a517690fc4385(resolutions, smooth, maxExtent, showFullExtent) {
    smooth = smooth !== undefined ? smooth : true;
    return(/**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */ function(resolution, direction, size, isMoving) {
        if (resolution !== undefined) {
            const maxResolution = resolutions[0];
            const minResolution = resolutions[resolutions.length - 1];
            const cappedMaxRes = maxExtent ? $ba6928caf79ac783$var$getViewportClampedResolution(maxResolution, maxExtent, size, showFullExtent) : maxResolution;
            // during interacting or animating, allow intermediary values
            if (isMoving) {
                if (!smooth) return (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(resolution, minResolution, cappedMaxRes);
                return $ba6928caf79ac783$var$getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
            }
            const capped = Math.min(cappedMaxRes, resolution);
            const z = Math.floor((0, $69c1cc8ae30f997f$export$8a3786cc03fdb777)(resolutions, capped, direction));
            if (resolutions[z] > cappedMaxRes && z < resolutions.length - 1) return resolutions[z + 1];
            return resolutions[z];
        }
        return undefined;
    });
}
function $ba6928caf79ac783$export$22ac0f6b219de91a(power, maxResolution, minResolution, smooth, maxExtent, showFullExtent) {
    smooth = smooth !== undefined ? smooth : true;
    minResolution = minResolution !== undefined ? minResolution : 0;
    return(/**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */ function(resolution, direction, size, isMoving) {
        if (resolution !== undefined) {
            const cappedMaxRes = maxExtent ? $ba6928caf79ac783$var$getViewportClampedResolution(maxResolution, maxExtent, size, showFullExtent) : maxResolution;
            // during interacting or animating, allow intermediary values
            if (isMoving) {
                if (!smooth) return (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(resolution, minResolution, cappedMaxRes);
                return $ba6928caf79ac783$var$getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
            }
            const tolerance = 1e-9;
            const minZoomLevel = Math.ceil(Math.log(maxResolution / cappedMaxRes) / Math.log(power) - tolerance);
            const offset = -direction * (0.5 - tolerance) + 0.5;
            const capped = Math.min(cappedMaxRes, resolution);
            const cappedZoomLevel = Math.floor(Math.log(maxResolution / capped) / Math.log(power) + offset);
            const zoomLevel = Math.max(minZoomLevel, cappedZoomLevel);
            const newResolution = maxResolution / Math.pow(power, zoomLevel);
            return (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(newResolution, minResolution, cappedMaxRes);
        }
        return undefined;
    });
}
function $ba6928caf79ac783$export$1c4e6da9b4b066fe(maxResolution, minResolution, smooth, maxExtent, showFullExtent) {
    smooth = smooth !== undefined ? smooth : true;
    return(/**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */ function(resolution, direction, size, isMoving) {
        if (resolution !== undefined) {
            const cappedMaxRes = maxExtent ? $ba6928caf79ac783$var$getViewportClampedResolution(maxResolution, maxExtent, size, showFullExtent) : maxResolution;
            if (!smooth || !isMoving) return (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(resolution, minResolution, cappedMaxRes);
            return $ba6928caf79ac783$var$getSmoothClampedResolution(resolution, cappedMaxRes, minResolution);
        }
        return undefined;
    });
}


/**
 * @module ol/rotationconstraint
 */ 
function $4412a0460d6cbb1d$export$e20fbacbb41798b(rotation) {
    if (rotation !== undefined) return 0;
    return undefined;
}
function $4412a0460d6cbb1d$export$f883a24d5edde77c(rotation) {
    if (rotation !== undefined) return rotation;
    return undefined;
}
function $4412a0460d6cbb1d$export$9ba78806de831083(n) {
    const theta = 2 * Math.PI / n;
    return(/**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */ function(rotation, isMoving) {
        if (isMoving) return rotation;
        if (rotation !== undefined) {
            rotation = Math.floor(rotation / theta + 0.5) * theta;
            return rotation;
        }
        return undefined;
    });
}
function $4412a0460d6cbb1d$export$17a6e6f3448b17e8(tolerance) {
    tolerance = tolerance || (0, $57ec69d152197e1d$export$cba01ba138429a1d)(5);
    return(/**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */ function(rotation, isMoving) {
        if (isMoving) return rotation;
        if (rotation !== undefined) {
            if (Math.abs(rotation) <= tolerance) return 0;
            return rotation;
        }
        return undefined;
    });
}


/**
 * @module ol/easing
 */ /**
 * Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */ function $b6cb732edc5512cf$export$929e5a82286172a6(t) {
    return Math.pow(t, 3);
}
function $b6cb732edc5512cf$export$57636bb43b1ccbb0(t) {
    return 1 - $b6cb732edc5512cf$export$929e5a82286172a6(1 - t);
}
function $b6cb732edc5512cf$export$9b47139b511b56e4(t) {
    return 3 * t * t - 2 * t * t * t;
}
function $b6cb732edc5512cf$export$45db2fc2f15997e7(t) {
    return t;
}
function $b6cb732edc5512cf$export$7f4472f6708afaf3(t) {
    if (t < 0.5) return $b6cb732edc5512cf$export$9b47139b511b56e4(2 * t);
    return 1 - $b6cb732edc5512cf$export$9b47139b511b56e4(2 * (t - 0.5));
}




/**
 * @module ol/geom/Polygon
 */ /**
 * @module ol/geom/LinearRing
 */ /**
 * @module ol/geom/SimpleGeometry
 */ /**
 * @module ol/geom/Geometry
 */ 

/**
 * @module ol/transform
 */ /**
 * @module ol/has
 */ const $253e11c6a01eb5bc$var$ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
const $253e11c6a01eb5bc$export$8442bdfd18b7b8a6 = $253e11c6a01eb5bc$var$ua.includes("firefox");
const $253e11c6a01eb5bc$export$3227bfbdaa9275de = $253e11c6a01eb5bc$var$ua.includes("safari") && !$253e11c6a01eb5bc$var$ua.includes("chrom");
const $253e11c6a01eb5bc$export$b23eed0e325a206a = $253e11c6a01eb5bc$export$3227bfbdaa9275de && ($253e11c6a01eb5bc$var$ua.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test($253e11c6a01eb5bc$var$ua));
const $253e11c6a01eb5bc$export$39dfd62a25e0fe93 = $253e11c6a01eb5bc$var$ua.includes("webkit") && !$253e11c6a01eb5bc$var$ua.includes("edge");
const $253e11c6a01eb5bc$export$76c0a3b101d93136 = $253e11c6a01eb5bc$var$ua.includes("macintosh");
const $253e11c6a01eb5bc$export$6b83a0446fc26f94 = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
const $253e11c6a01eb5bc$export$98fcef3dc9973292 = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope; //eslint-disable-line
const $253e11c6a01eb5bc$export$716f8695eedb9bad = typeof Image !== "undefined" && Image.prototype.decode;
const $253e11c6a01eb5bc$export$f751ce96c6c4e4fc = function() {
    let passive = false;
    try {
        const options = Object.defineProperty({}, "passive", {
            get: function() {
                passive = true;
            }
        });
        window.addEventListener("_", null, options);
        window.removeEventListener("_", null, options);
    } catch (error) {
    // passive not supported
    }
    return passive;
}();



/**
 * An array representing an affine 2d transformation for use with
 * {@link module:ol/transform} functions. The array has 6 elements.
 * @typedef {!Array<number>} Transform
 * @api
 */ /**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3×3 matrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */ /**
 * @private
 * @type {Transform}
 */ const $d59a735b25ae191a$var$tmp_ = new Array(6);
function $d59a735b25ae191a$export$185802fd694ee1f5() {
    return [
        1,
        0,
        0,
        1,
        0,
        0
    ];
}
function $d59a735b25ae191a$export$aad8462122ac592b(transform) {
    return $d59a735b25ae191a$export$adaa4cf7ef1b65be(transform, 1, 0, 0, 1, 0, 0);
}
function $d59a735b25ae191a$export$2060d2db72cce88f(transform1, transform2) {
    const a1 = transform1[0];
    const b1 = transform1[1];
    const c1 = transform1[2];
    const d1 = transform1[3];
    const e1 = transform1[4];
    const f1 = transform1[5];
    const a2 = transform2[0];
    const b2 = transform2[1];
    const c2 = transform2[2];
    const d2 = transform2[3];
    const e2 = transform2[4];
    const f2 = transform2[5];
    transform1[0] = a1 * a2 + c1 * b2;
    transform1[1] = b1 * a2 + d1 * b2;
    transform1[2] = a1 * c2 + c1 * d2;
    transform1[3] = b1 * c2 + d1 * d2;
    transform1[4] = a1 * e2 + c1 * f2 + e1;
    transform1[5] = b1 * e2 + d1 * f2 + f1;
    return transform1;
}
function $d59a735b25ae191a$export$adaa4cf7ef1b65be(transform, a, b, c, d, e, f) {
    transform[0] = a;
    transform[1] = b;
    transform[2] = c;
    transform[3] = d;
    transform[4] = e;
    transform[5] = f;
    return transform;
}
function $d59a735b25ae191a$export$42b4187a82d80ed0(transform1, transform2) {
    transform1[0] = transform2[0];
    transform1[1] = transform2[1];
    transform1[2] = transform2[2];
    transform1[3] = transform2[3];
    transform1[4] = transform2[4];
    transform1[5] = transform2[5];
    return transform1;
}
function $d59a735b25ae191a$export$5635d7ef4b8fee1c(transform, coordinate) {
    const x = coordinate[0];
    const y = coordinate[1];
    coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
    coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
    return coordinate;
}
function $d59a735b25ae191a$export$bb628a54ab399bc9(transform, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return $d59a735b25ae191a$export$2060d2db72cce88f(transform, $d59a735b25ae191a$export$adaa4cf7ef1b65be($d59a735b25ae191a$var$tmp_, cos, sin, -sin, cos, 0, 0));
}
function $d59a735b25ae191a$export$dcdf75081b88279d(transform, x, y) {
    return $d59a735b25ae191a$export$2060d2db72cce88f(transform, $d59a735b25ae191a$export$adaa4cf7ef1b65be($d59a735b25ae191a$var$tmp_, x, 0, 0, y, 0, 0));
}
function $d59a735b25ae191a$export$3e4e33ea14aeb531(target, x, y) {
    return $d59a735b25ae191a$export$adaa4cf7ef1b65be(target, x, 0, 0, y, 0, 0);
}
function $d59a735b25ae191a$export$d73ee8ef04f5226a(transform, dx, dy) {
    return $d59a735b25ae191a$export$2060d2db72cce88f(transform, $d59a735b25ae191a$export$adaa4cf7ef1b65be($d59a735b25ae191a$var$tmp_, 1, 0, 0, 1, dx, dy));
}
function $d59a735b25ae191a$export$f672e0b6f7222cd7(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    transform[0] = sx * cos;
    transform[1] = sy * sin;
    transform[2] = -sx * sin;
    transform[3] = sy * cos;
    transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
    transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
    return transform;
}
function $d59a735b25ae191a$export$12a96a1aaf5558e3(dx1, dy1, sx, sy, angle, dx2, dy2) {
    return $d59a735b25ae191a$export$f84e8e69fd4488a5($d59a735b25ae191a$export$f672e0b6f7222cd7($d59a735b25ae191a$export$185802fd694ee1f5(), dx1, dy1, sx, sy, angle, dx2, dy2));
}
function $d59a735b25ae191a$export$6897c284b6f9f4dc(source) {
    return $d59a735b25ae191a$export$bd70ea2a93c0fa4(source, source);
}
function $d59a735b25ae191a$export$bd70ea2a93c0fa4(target, source) {
    const det = $d59a735b25ae191a$export$a04698f914c55ed9(source);
    (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(det !== 0, 32); // Transformation matrix cannot be inverted
    const a = source[0];
    const b = source[1];
    const c = source[2];
    const d = source[3];
    const e = source[4];
    const f = source[5];
    target[0] = d / det;
    target[1] = -b / det;
    target[2] = -c / det;
    target[3] = a / det;
    target[4] = (c * f - d * e) / det;
    target[5] = -(a * f - b * e) / det;
    return target;
}
function $d59a735b25ae191a$export$a04698f914c55ed9(mat) {
    return mat[0] * mat[3] - mat[1] * mat[2];
}
/**
 * @type {HTMLElement}
 * @private
 */ let $d59a735b25ae191a$var$transformStringDiv;
function $d59a735b25ae191a$export$f84e8e69fd4488a5(mat) {
    const transformString = "matrix(" + mat.join(", ") + ")";
    if (0, $253e11c6a01eb5bc$export$98fcef3dc9973292) return transformString;
    const node = $d59a735b25ae191a$var$transformStringDiv || ($d59a735b25ae191a$var$transformStringDiv = document.createElement("div"));
    node.style.transform = transformString;
    return node.style.transform;
}





/**
 * @module ol/geom/flat/transform
 */ /**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>} [dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */ function $9a4105a6a338adf4$export$b92b2dedcfff79de(flatCoordinates, offset, end, stride, transform, dest) {
    dest = dest ? dest : [];
    let i = 0;
    for(let j = offset; j < end; j += stride){
        const x = flatCoordinates[j];
        const y = flatCoordinates[j + 1];
        dest[i++] = transform[0] * x + transform[2] * y + transform[4];
        dest[i++] = transform[1] * x + transform[3] * y + transform[5];
    }
    if (dest && dest.length != i) dest.length = i;
    return dest;
}
function $9a4105a6a338adf4$export$bb628a54ab399bc9(flatCoordinates, offset, end, stride, angle, anchor, dest) {
    dest = dest ? dest : [];
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const anchorX = anchor[0];
    const anchorY = anchor[1];
    let i = 0;
    for(let j = offset; j < end; j += stride){
        const deltaX = flatCoordinates[j] - anchorX;
        const deltaY = flatCoordinates[j + 1] - anchorY;
        dest[i++] = anchorX + deltaX * cos - deltaY * sin;
        dest[i++] = anchorY + deltaX * sin + deltaY * cos;
        for(let k = j + 2; k < j + stride; ++k)dest[i++] = flatCoordinates[k];
    }
    if (dest && dest.length != i) dest.length = i;
    return dest;
}
function $9a4105a6a338adf4$export$dcdf75081b88279d(flatCoordinates, offset, end, stride, sx, sy, anchor, dest) {
    dest = dest ? dest : [];
    const anchorX = anchor[0];
    const anchorY = anchor[1];
    let i = 0;
    for(let j = offset; j < end; j += stride){
        const deltaX = flatCoordinates[j] - anchorX;
        const deltaY = flatCoordinates[j + 1] - anchorY;
        dest[i++] = anchorX + sx * deltaX;
        dest[i++] = anchorY + sy * deltaY;
        for(let k = j + 2; k < j + stride; ++k)dest[i++] = flatCoordinates[k];
    }
    if (dest && dest.length != i) dest.length = i;
    return dest;
}
function $9a4105a6a338adf4$export$d73ee8ef04f5226a(flatCoordinates, offset, end, stride, deltaX, deltaY, dest) {
    dest = dest ? dest : [];
    let i = 0;
    for(let j = offset; j < end; j += stride){
        dest[i++] = flatCoordinates[j] + deltaX;
        dest[i++] = flatCoordinates[j + 1] + deltaY;
        for(let k = j + 2; k < j + stride; ++k)dest[i++] = flatCoordinates[k];
    }
    if (dest && dest.length != i) dest.length = i;
    return dest;
}


/**
 * @typedef {'XY' | 'XYZ' | 'XYM' | 'XYZM'} GeometryLayout
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available.
 */ /**
 * @typedef {'Point' | 'LineString' | 'LinearRing' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'} Type
 * The geometry type.  One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, or `'Circle'`.
 */ /**
 * @type {import("../transform.js").Transform}
 */ const $05f95d883ca13ae5$var$tmpTransform = (0, $d59a735b25ae191a$export$185802fd694ee1f5)();
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @abstract
 * @api
 */ class $05f95d883ca13ae5$var$Geometry extends (0, $d6cd7f1b627d5e92$export$2e2bcd8739ae039) {
    constructor(){
        super();
        /**
     * @private
     * @type {import("../extent.js").Extent}
     */ this.extent_ = (0, $84be800ca44e672c$export$fe201bb3bbe031e9)();
        /**
     * @private
     * @type {number}
     */ this.extentRevision_ = -1;
        /**
     * @protected
     * @type {number}
     */ this.simplifiedGeometryMaxMinSquaredTolerance = 0;
        /**
     * @protected
     * @type {number}
     */ this.simplifiedGeometryRevision = 0;
        /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} revision The geometry revision.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */ this.simplifyTransformedInternal = (0, $2c3aa3ce33eccc0f$export$ff83df6f9971435f)(function(revision, squaredTolerance, transform) {
            if (!transform) return this.getSimplifiedGeometry(squaredTolerance);
            const clone = this.clone();
            clone.applyTransform(transform);
            return clone.getSimplifiedGeometry(squaredTolerance);
        });
    }
    /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */ simplifyTransformed(squaredTolerance, transform) {
        return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, transform);
    }
    /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */ clone() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */ containsXY(x, y) {
        const coord = this.getClosestPoint([
            x,
            y
        ]);
        return coord[0] === x && coord[1] === y;
    }
    /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */ getClosestPoint(point, closestPoint) {
        closestPoint = closestPoint ? closestPoint : [
            NaN,
            NaN
        ];
        this.closestPointXY(point[0], point[1], closestPoint, Infinity);
        return closestPoint;
    }
    /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */ intersectsCoordinate(coordinate) {
        return this.containsXY(coordinate[0], coordinate[1]);
    }
    /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */ computeExtent(extent) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */ getExtent(extent) {
        if (this.extentRevision_ != this.getRevision()) {
            const extent = this.computeExtent(this.extent_);
            if (isNaN(extent[0]) || isNaN(extent[1])) (0, $84be800ca44e672c$export$3e2152b047719fa1)(extent);
            this.extentRevision_ = this.getRevision();
        }
        return (0, $84be800ca44e672c$export$6a4fe494c558c238)(this.extent_, extent);
    }
    /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */ rotate(angle, anchor) {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */ scale(sx, sy, anchor) {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */ simplify(tolerance) {
        return this.getSimplifiedGeometry(tolerance * tolerance);
    }
    /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */ getSimplifiedGeometry(squaredTolerance) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */ getType() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */ applyTransform(transformFn) {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */ intersectsExtent(extent) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */ translate(deltaX, deltaY) {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {Geometry} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */ transform(source, destination) {
        /** @type {import("../proj/Projection.js").default} */ const sourceProj = (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(source);
        const transformFn = sourceProj.getUnits() == "tile-pixels" ? function(inCoordinates, outCoordinates, stride) {
            const pixelExtent = sourceProj.getExtent();
            const projectedExtent = sourceProj.getWorldExtent();
            const scale = (0, $84be800ca44e672c$export$c08559766941f856)(projectedExtent) / (0, $84be800ca44e672c$export$c08559766941f856)(pixelExtent);
            (0, $d59a735b25ae191a$export$f672e0b6f7222cd7)($05f95d883ca13ae5$var$tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
            (0, $9a4105a6a338adf4$export$b92b2dedcfff79de)(inCoordinates, 0, inCoordinates.length, stride, $05f95d883ca13ae5$var$tmpTransform, outCoordinates);
            return (0, $983289ae1d13cd2a$export$fce0c6cfca85ed96)(sourceProj, destination)(inCoordinates, outCoordinates, stride);
        } : (0, $983289ae1d13cd2a$export$fce0c6cfca85ed96)(sourceProj, destination);
        this.applyTransform(transformFn);
        return this;
    }
}
var $05f95d883ca13ae5$export$2e2bcd8739ae039 = $05f95d883ca13ae5$var$Geometry;





/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */ class $ecdcc798f2987118$var$SimpleGeometry extends (0, $05f95d883ca13ae5$export$2e2bcd8739ae039) {
    constructor(){
        super();
        /**
     * @protected
     * @type {import("./Geometry.js").GeometryLayout}
     */ this.layout = "XY";
        /**
     * @protected
     * @type {number}
     */ this.stride = 2;
        /**
     * @protected
     * @type {Array<number>}
     */ this.flatCoordinates = null;
    }
    /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */ computeExtent(extent) {
        return (0, $84be800ca44e672c$export$be0ab0bf96ca59ca)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    }
    /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */ getCoordinates() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */ getFirstCoordinate() {
        return this.flatCoordinates.slice(0, this.stride);
    }
    /**
   * @return {Array<number>} Flat coordinates.
   */ getFlatCoordinates() {
        return this.flatCoordinates;
    }
    /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */ getLastCoordinate() {
        return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
    }
    /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */ getLayout() {
        return this.layout;
    }
    /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   */ getSimplifiedGeometry(squaredTolerance) {
        if (this.simplifiedGeometryRevision !== this.getRevision()) {
            this.simplifiedGeometryMaxMinSquaredTolerance = 0;
            this.simplifiedGeometryRevision = this.getRevision();
        }
        // If squaredTolerance is negative or if we know that simplification will not
        // have any effect then just return this.
        if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) return this;
        const simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
        const simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
        if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) return simplifiedGeometry;
        // Simplification did not actually remove any coordinates.  We now know
        // that any calls to getSimplifiedGeometry with a squaredTolerance less
        // than or equal to the current squaredTolerance will also not have any
        // effect.  This allows us to short circuit simplification (saving CPU
        // cycles) and prevents the cache of simplified geometries from filling
        // up with useless identical copies of this geometry (saving memory).
        this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
        return this;
    }
    /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */ getSimplifiedGeometryInternal(squaredTolerance) {
        return this;
    }
    /**
   * @return {number} Stride.
   */ getStride() {
        return this.stride;
    }
    /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */ setFlatCoordinates(layout, flatCoordinates) {
        this.stride = $ecdcc798f2987118$export$6af0c1b4a8549a43(layout);
        this.layout = layout;
        this.flatCoordinates = flatCoordinates;
    }
    /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */ setCoordinates(coordinates, layout) {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */ setLayout(layout, coordinates, nesting) {
        /** @type {number} */ let stride;
        if (layout) stride = $ecdcc798f2987118$export$6af0c1b4a8549a43(layout);
        else {
            for(let i = 0; i < nesting; ++i){
                if (coordinates.length === 0) {
                    this.layout = "XY";
                    this.stride = 2;
                    return;
                }
                coordinates = /** @type {Array} */ coordinates[0];
            }
            stride = coordinates.length;
            layout = $ecdcc798f2987118$var$getLayoutForStride(stride);
        }
        this.layout = layout;
        this.stride = stride;
    }
    /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */ applyTransform(transformFn) {
        if (this.flatCoordinates) {
            transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
            this.changed();
        }
    }
    /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */ rotate(angle, anchor) {
        const flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            const stride = this.getStride();
            (0, $9a4105a6a338adf4$export$bb628a54ab399bc9)(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
            this.changed();
        }
    }
    /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */ scale(sx, sy, anchor) {
        if (sy === undefined) sy = sx;
        if (!anchor) anchor = (0, $84be800ca44e672c$export$c91255cadecfe081)(this.getExtent());
        const flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            const stride = this.getStride();
            (0, $9a4105a6a338adf4$export$dcdf75081b88279d)(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
            this.changed();
        }
    }
    /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */ translate(deltaX, deltaY) {
        const flatCoordinates = this.getFlatCoordinates();
        if (flatCoordinates) {
            const stride = this.getStride();
            (0, $9a4105a6a338adf4$export$d73ee8ef04f5226a)(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
            this.changed();
        }
    }
}
/**
 * @param {number} stride Stride.
 * @return {import("./Geometry.js").GeometryLayout} layout Layout.
 */ function $ecdcc798f2987118$var$getLayoutForStride(stride) {
    let layout;
    if (stride == 2) layout = "XY";
    else if (stride == 3) layout = "XYZ";
    else if (stride == 4) layout = "XYZM";
    return /** @type {import("./Geometry.js").GeometryLayout} */ layout;
}
function $ecdcc798f2987118$export$6af0c1b4a8549a43(layout) {
    let stride;
    if (layout == "XY") stride = 2;
    else if (layout == "XYZ" || layout == "XYM") stride = 3;
    else if (layout == "XYZM") stride = 4;
    return /** @type {number} */ stride;
}
function $ecdcc798f2987118$export$a3767472617c7861(simpleGeometry, transform, dest) {
    const flatCoordinates = simpleGeometry.getFlatCoordinates();
    if (!flatCoordinates) return null;
    const stride = simpleGeometry.getStride();
    return (0, $9a4105a6a338adf4$export$b92b2dedcfff79de)(flatCoordinates, 0, flatCoordinates.length, stride, transform, dest);
}
var $ecdcc798f2987118$export$2e2bcd8739ae039 = $ecdcc798f2987118$var$SimpleGeometry;


/**
 * @module ol/geom/flat/closest
 */ 
/**
 * Returns the point on the 2D line segment flatCoordinates[offset1] to
 * flatCoordinates[offset2] that is closest to the point (x, y).  Extra
 * dimensions are linearly interpolated.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset1 Offset 1.
 * @param {number} offset2 Offset 2.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 */ function $cb3f29ffe7102d22$var$assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
    const x1 = flatCoordinates[offset1];
    const y1 = flatCoordinates[offset1 + 1];
    const dx = flatCoordinates[offset2] - x1;
    const dy = flatCoordinates[offset2 + 1] - y1;
    let offset;
    if (dx === 0 && dy === 0) offset = offset1;
    else {
        const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        if (t > 1) offset = offset2;
        else if (t > 0) {
            for(let i = 0; i < stride; ++i)closestPoint[i] = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
            closestPoint.length = stride;
            return;
        } else offset = offset1;
    }
    for(let i = 0; i < stride; ++i)closestPoint[i] = flatCoordinates[offset + i];
    closestPoint.length = stride;
}
function $cb3f29ffe7102d22$export$bc2eb611ddf80103(flatCoordinates, offset, end, stride, max) {
    let x1 = flatCoordinates[offset];
    let y1 = flatCoordinates[offset + 1];
    for(offset += stride; offset < end; offset += stride){
        const x2 = flatCoordinates[offset];
        const y2 = flatCoordinates[offset + 1];
        const squaredDelta = (0, $57ec69d152197e1d$export$88e6ebb4fe54f538)(x1, y1, x2, y2);
        if (squaredDelta > max) max = squaredDelta;
        x1 = x2;
        y1 = y2;
    }
    return max;
}
function $cb3f29ffe7102d22$export$fbf31c8f2668ed5a(flatCoordinates, offset, ends, stride, max) {
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        max = $cb3f29ffe7102d22$export$bc2eb611ddf80103(flatCoordinates, offset, end, stride, max);
        offset = end;
    }
    return max;
}
function $cb3f29ffe7102d22$export$37c18e6e7d50501a(flatCoordinates, offset, endss, stride, max) {
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        max = $cb3f29ffe7102d22$export$fbf31c8f2668ed5a(flatCoordinates, offset, ends, stride, max);
        offset = ends[ends.length - 1];
    }
    return max;
}
function $cb3f29ffe7102d22$export$4adc8e5135fb44c(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
    if (offset == end) return minSquaredDistance;
    let i, squaredDistance;
    if (maxDelta === 0) {
        // All points are identical, so just test the first point.
        squaredDistance = (0, $57ec69d152197e1d$export$88e6ebb4fe54f538)(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);
        if (squaredDistance < minSquaredDistance) {
            for(i = 0; i < stride; ++i)closestPoint[i] = flatCoordinates[offset + i];
            closestPoint.length = stride;
            return squaredDistance;
        }
        return minSquaredDistance;
    }
    tmpPoint = tmpPoint ? tmpPoint : [
        NaN,
        NaN
    ];
    let index = offset + stride;
    while(index < end){
        $cb3f29ffe7102d22$var$assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
        squaredDistance = (0, $57ec69d152197e1d$export$88e6ebb4fe54f538)(x, y, tmpPoint[0], tmpPoint[1]);
        if (squaredDistance < minSquaredDistance) {
            minSquaredDistance = squaredDistance;
            for(i = 0; i < stride; ++i)closestPoint[i] = tmpPoint[i];
            closestPoint.length = stride;
            index += stride;
        } else // Skip ahead multiple points, because we know that all the skipped
        // points cannot be any closer than the closest point we have found so
        // far.  We know this because we know how close the current point is, how
        // close the closest point we have found so far is, and the maximum
        // distance between consecutive points.  For example, if we're currently
        // at distance 10, the best we've found so far is 3, and that the maximum
        // distance between consecutive points is 2, then we'll need to skip at
        // least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
        // finding a closer point.  We use Math.max(..., 1) to ensure that we
        // always advance at least one point, to avoid an infinite loop.
        index += stride * Math.max((Math.sqrt(squaredDistance) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
    }
    if (isRing) {
        // Check the closing segment.
        $cb3f29ffe7102d22$var$assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
        squaredDistance = (0, $57ec69d152197e1d$export$88e6ebb4fe54f538)(x, y, tmpPoint[0], tmpPoint[1]);
        if (squaredDistance < minSquaredDistance) {
            minSquaredDistance = squaredDistance;
            for(i = 0; i < stride; ++i)closestPoint[i] = tmpPoint[i];
            closestPoint.length = stride;
        }
    }
    return minSquaredDistance;
}
function $cb3f29ffe7102d22$export$5a48a0eefcf14992(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
    tmpPoint = tmpPoint ? tmpPoint : [
        NaN,
        NaN
    ];
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        minSquaredDistance = $cb3f29ffe7102d22$export$4adc8e5135fb44c(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
        offset = end;
    }
    return minSquaredDistance;
}
function $cb3f29ffe7102d22$export$60e067685eb8f9c4(flatCoordinates, offset, endss, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint) {
    tmpPoint = tmpPoint ? tmpPoint : [
        NaN,
        NaN
    ];
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        minSquaredDistance = $cb3f29ffe7102d22$export$5a48a0eefcf14992(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
        offset = ends[ends.length - 1];
    }
    return minSquaredDistance;
}



/**
 * @module ol/geom/flat/deflate
 */ /**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */ function $e6d128aec3d5ac99$export$60815ead40ec79ab(flatCoordinates, offset, coordinate, stride) {
    for(let i = 0, ii = coordinate.length; i < ii; ++i)flatCoordinates[offset++] = coordinate[i];
    return offset;
}
function $e6d128aec3d5ac99$export$5c4daf67e03c190f(flatCoordinates, offset, coordinates, stride) {
    for(let i = 0, ii = coordinates.length; i < ii; ++i){
        const coordinate = coordinates[i];
        for(let j = 0; j < stride; ++j)flatCoordinates[offset++] = coordinate[j];
    }
    return offset;
}
function $e6d128aec3d5ac99$export$47c3746a74384d45(flatCoordinates, offset, coordinatess, stride, ends) {
    ends = ends ? ends : [];
    let i = 0;
    for(let j = 0, jj = coordinatess.length; j < jj; ++j){
        const end = $e6d128aec3d5ac99$export$5c4daf67e03c190f(flatCoordinates, offset, coordinatess[j], stride);
        ends[i++] = end;
        offset = end;
    }
    ends.length = i;
    return ends;
}
function $e6d128aec3d5ac99$export$f9f2bb59da4accd3(flatCoordinates, offset, coordinatesss, stride, endss) {
    endss = endss ? endss : [];
    let i = 0;
    for(let j = 0, jj = coordinatesss.length; j < jj; ++j){
        const ends = $e6d128aec3d5ac99$export$47c3746a74384d45(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
        if (ends.length === 0) ends[0] = offset;
        endss[i++] = ends;
        offset = ends[ends.length - 1];
    }
    endss.length = i;
    return endss;
}


/**
 * @module ol/geom/flat/simplify
 */ // Based on simplify-js https://github.com/mourner/simplify-js
// Copyright (c) 2012, Vladimir Agafonkin
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//    1. Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//
//    2. Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

function $116cc918e3d500bf$export$2cbbcce9030b8734(flatCoordinates, offset, end, stride, squaredTolerance, highQuality, simplifiedFlatCoordinates) {
    simplifiedFlatCoordinates = simplifiedFlatCoordinates !== undefined ? simplifiedFlatCoordinates : [];
    if (!highQuality) {
        end = $116cc918e3d500bf$export$46dba205a0107e9e(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
        flatCoordinates = simplifiedFlatCoordinates;
        offset = 0;
        stride = 2;
    }
    simplifiedFlatCoordinates.length = $116cc918e3d500bf$export$ef693d1572e64fb8(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return simplifiedFlatCoordinates;
}
function $116cc918e3d500bf$export$ef693d1572e64fb8(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    const n = (end - offset) / stride;
    if (n < 3) {
        for(; offset < end; offset += stride){
            simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
            simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
        }
        return simplifiedOffset;
    }
    /** @type {Array<number>} */ const markers = new Array(n);
    markers[0] = 1;
    markers[n - 1] = 1;
    /** @type {Array<number>} */ const stack = [
        offset,
        end - stride
    ];
    let index = 0;
    while(stack.length > 0){
        const last = stack.pop();
        const first = stack.pop();
        let maxSquaredDistance = 0;
        const x1 = flatCoordinates[first];
        const y1 = flatCoordinates[first + 1];
        const x2 = flatCoordinates[last];
        const y2 = flatCoordinates[last + 1];
        for(let i = first + stride; i < last; i += stride){
            const x = flatCoordinates[i];
            const y = flatCoordinates[i + 1];
            const squaredDistance = (0, $57ec69d152197e1d$export$251bb0a9cef172e6)(x, y, x1, y1, x2, y2);
            if (squaredDistance > maxSquaredDistance) {
                index = i;
                maxSquaredDistance = squaredDistance;
            }
        }
        if (maxSquaredDistance > squaredTolerance) {
            markers[(index - offset) / stride] = 1;
            if (first + stride < index) stack.push(first, index);
            if (index + stride < last) stack.push(index, last);
        }
    }
    for(let i = 0; i < n; ++i)if (markers[i]) {
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride];
        simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i * stride + 1];
    }
    return simplifiedOffset;
}
function $116cc918e3d500bf$export$cedb9900c0b225c2(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        simplifiedOffset = $116cc918e3d500bf$export$ef693d1572e64fb8(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset);
        simplifiedEnds.push(simplifiedOffset);
        offset = end;
    }
    return simplifiedOffset;
}
function $116cc918e3d500bf$export$5d74fb54bb752ea0(flatCoordinates, offset, endss, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        const simplifiedEnds = [];
        simplifiedOffset = $116cc918e3d500bf$export$cedb9900c0b225c2(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
        simplifiedEndss.push(simplifiedEnds);
        offset = ends[ends.length - 1];
    }
    return simplifiedOffset;
}
function $116cc918e3d500bf$export$46dba205a0107e9e(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    if (end <= offset + stride) {
        // zero or one point, no simplification possible, so copy and return
        for(; offset < end; offset += stride){
            simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
            simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
        }
        return simplifiedOffset;
    }
    let x1 = flatCoordinates[offset];
    let y1 = flatCoordinates[offset + 1];
    // copy first point
    simplifiedFlatCoordinates[simplifiedOffset++] = x1;
    simplifiedFlatCoordinates[simplifiedOffset++] = y1;
    let x2 = x1;
    let y2 = y1;
    for(offset += stride; offset < end; offset += stride){
        x2 = flatCoordinates[offset];
        y2 = flatCoordinates[offset + 1];
        if ((0, $57ec69d152197e1d$export$88e6ebb4fe54f538)(x1, y1, x2, y2) > squaredTolerance) {
            // copy point at offset
            simplifiedFlatCoordinates[simplifiedOffset++] = x2;
            simplifiedFlatCoordinates[simplifiedOffset++] = y2;
            x1 = x2;
            y1 = y2;
        }
    }
    if (x2 != x1 || y2 != y1) {
        // copy last point
        simplifiedFlatCoordinates[simplifiedOffset++] = x2;
        simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    }
    return simplifiedOffset;
}
function $116cc918e3d500bf$export$51a0620f7a28532b(value, tolerance) {
    return tolerance * Math.round(value / tolerance);
}
function $116cc918e3d500bf$export$b84e8d2c4920a0c6(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
    // do nothing if the line is empty
    if (offset == end) return simplifiedOffset;
    // snap the first coordinate (P1)
    let x1 = $116cc918e3d500bf$export$51a0620f7a28532b(flatCoordinates[offset], tolerance);
    let y1 = $116cc918e3d500bf$export$51a0620f7a28532b(flatCoordinates[offset + 1], tolerance);
    offset += stride;
    // add the first coordinate to the output
    simplifiedFlatCoordinates[simplifiedOffset++] = x1;
    simplifiedFlatCoordinates[simplifiedOffset++] = y1;
    // find the next coordinate that does not snap to the same value as the first
    // coordinate (P2)
    let x2, y2;
    do {
        x2 = $116cc918e3d500bf$export$51a0620f7a28532b(flatCoordinates[offset], tolerance);
        y2 = $116cc918e3d500bf$export$51a0620f7a28532b(flatCoordinates[offset + 1], tolerance);
        offset += stride;
        if (offset == end) {
            // all coordinates snap to the same value, the line collapses to a point
            // push the last snapped value anyway to ensure that the output contains
            // at least two points
            // FIXME should we really return at least two points anyway?
            simplifiedFlatCoordinates[simplifiedOffset++] = x2;
            simplifiedFlatCoordinates[simplifiedOffset++] = y2;
            return simplifiedOffset;
        }
    }while (x2 == x1 && y2 == y1);
    while(offset < end){
        // snap the next coordinate (P3)
        const x3 = $116cc918e3d500bf$export$51a0620f7a28532b(flatCoordinates[offset], tolerance);
        const y3 = $116cc918e3d500bf$export$51a0620f7a28532b(flatCoordinates[offset + 1], tolerance);
        offset += stride;
        // skip P3 if it is equal to P2
        if (x3 == x2 && y3 == y2) continue;
        // calculate the delta between P1 and P2
        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        // calculate the delta between P3 and P1
        const dx2 = x3 - x1;
        const dy2 = y3 - y1;
        // if P1, P2, and P3 are colinear and P3 is further from P1 than P2 is from
        // P1 in the same direction then P2 is on the straight line between P1 and
        // P3
        if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
            // discard P2 and set P2 = P3
            x2 = x3;
            y2 = y3;
            continue;
        }
        // either P1, P2, and P3 are not colinear, or they are colinear but P3 is
        // between P3 and P1 or on the opposite half of the line to P2.  add P2,
        // and continue with P1 = P2 and P2 = P3
        simplifiedFlatCoordinates[simplifiedOffset++] = x2;
        simplifiedFlatCoordinates[simplifiedOffset++] = y2;
        x1 = x2;
        y1 = y2;
        x2 = x3;
        y2 = y3;
    }
    // add the last point (P2)
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    return simplifiedOffset;
}
function $116cc918e3d500bf$export$60a9904b67f8d51b(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        simplifiedOffset = $116cc918e3d500bf$export$b84e8d2c4920a0c6(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
        simplifiedEnds.push(simplifiedOffset);
        offset = end;
    }
    return simplifiedOffset;
}
function $116cc918e3d500bf$export$b9acf67ef05cd17c(flatCoordinates, offset, endss, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        const simplifiedEnds = [];
        simplifiedOffset = $116cc918e3d500bf$export$60a9904b67f8d51b(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
        simplifiedEndss.push(simplifiedEnds);
        offset = ends[ends.length - 1];
    }
    return simplifiedOffset;
}


/**
 * @module ol/geom/flat/inflate
 */ /**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array<import("../../coordinate.js").Coordinate>} [coordinates] Coordinates.
 * @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
 */ function $26e6af5078c94bc3$export$9c0934e4e9c3f61e(flatCoordinates, offset, end, stride, coordinates) {
    coordinates = coordinates !== undefined ? coordinates : [];
    let i = 0;
    for(let j = offset; j < end; j += stride)coordinates[i++] = flatCoordinates.slice(j, j + stride);
    coordinates.length = i;
    return coordinates;
}
function $26e6af5078c94bc3$export$cbb9596fc0f40db2(flatCoordinates, offset, ends, stride, coordinatess) {
    coordinatess = coordinatess !== undefined ? coordinatess : [];
    let i = 0;
    for(let j = 0, jj = ends.length; j < jj; ++j){
        const end = ends[j];
        coordinatess[i++] = $26e6af5078c94bc3$export$9c0934e4e9c3f61e(flatCoordinates, offset, end, stride, coordinatess[i]);
        offset = end;
    }
    coordinatess.length = i;
    return coordinatess;
}
function $26e6af5078c94bc3$export$915c7058aeb4dfeb(flatCoordinates, offset, endss, stride, coordinatesss) {
    coordinatesss = coordinatesss !== undefined ? coordinatesss : [];
    let i = 0;
    for(let j = 0, jj = endss.length; j < jj; ++j){
        const ends = endss[j];
        coordinatesss[i++] = ends.length === 1 && ends[0] === offset ? [] : $26e6af5078c94bc3$export$cbb9596fc0f40db2(flatCoordinates, offset, ends, stride, coordinatesss[i]);
        offset = ends[ends.length - 1];
    }
    coordinatesss.length = i;
    return coordinatesss;
}


/**
 * @module ol/geom/flat/area
 */ /**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Area.
 */ function $808945bcd5aac66c$export$3c5e1905f889266e(flatCoordinates, offset, end, stride) {
    let twiceArea = 0;
    let x1 = flatCoordinates[end - stride];
    let y1 = flatCoordinates[end - stride + 1];
    for(; offset < end; offset += stride){
        const x2 = flatCoordinates[offset];
        const y2 = flatCoordinates[offset + 1];
        twiceArea += y1 * x2 - x1 * y2;
        x1 = x2;
        y1 = y2;
    }
    return twiceArea / 2;
}
function $808945bcd5aac66c$export$7a8ee541dfdf2ed5(flatCoordinates, offset, ends, stride) {
    let area = 0;
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        area += $808945bcd5aac66c$export$3c5e1905f889266e(flatCoordinates, offset, end, stride);
        offset = end;
    }
    return area;
}
function $808945bcd5aac66c$export$78e139679ca7205(flatCoordinates, offset, endss, stride) {
    let area = 0;
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        area += $808945bcd5aac66c$export$7a8ee541dfdf2ed5(flatCoordinates, offset, ends, stride);
        offset = ends[ends.length - 1];
    }
    return area;
}


/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */ class $10811f4228331a2d$var$LinearRing extends (0, $ecdcc798f2987118$export$2e2bcd8739ae039) {
    /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */ constructor(coordinates, layout){
        super();
        /**
     * @private
     * @type {number}
     */ this.maxDelta_ = -1;
        /**
     * @private
     * @type {number}
     */ this.maxDeltaRevision_ = -1;
        if (layout !== undefined && !Array.isArray(coordinates[0])) this.setFlatCoordinates(layout, /** @type {Array<number>} */ coordinates);
        else this.setCoordinates(/** @type {Array<import("../coordinate.js").Coordinate>} */ coordinates, layout);
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   */ clone() {
        return new $10811f4228331a2d$var$LinearRing(this.flatCoordinates.slice(), this.layout);
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < (0, $84be800ca44e672c$export$cbe64c389534206f)(this.getExtent(), x, y)) return minSquaredDistance;
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt((0, $cb3f29ffe7102d22$export$bc2eb611ddf80103)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return (0, $cb3f29ffe7102d22$export$4adc8e5135fb44c)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    }
    /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */ getArea() {
        return (0, $808945bcd5aac66c$export$3c5e1905f889266e)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    }
    /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */ getCoordinates() {
        return (0, $26e6af5078c94bc3$export$9c0934e4e9c3f61e)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    }
    /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   */ getSimplifiedGeometryInternal(squaredTolerance) {
        const simplifiedFlatCoordinates = [];
        simplifiedFlatCoordinates.length = (0, $116cc918e3d500bf$export$ef693d1572e64fb8)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
        return new $10811f4228331a2d$var$LinearRing(simplifiedFlatCoordinates, "XY");
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "LinearRing";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        return false;
    }
    /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */ setCoordinates(coordinates, layout) {
        this.setLayout(layout, coordinates, 1);
        if (!this.flatCoordinates) this.flatCoordinates = [];
        this.flatCoordinates.length = (0, $e6d128aec3d5ac99$export$5c4daf67e03c190f)(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    }
}
var $10811f4228331a2d$export$2e2bcd8739ae039 = $10811f4228331a2d$var$LinearRing;


/**
 * @module ol/geom/Point
 */ 



/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */ class $de620c8161ba008b$var$Point extends (0, $ecdcc798f2987118$export$2e2bcd8739ae039) {
    /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */ constructor(coordinates, layout){
        super();
        this.setCoordinates(coordinates, layout);
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   */ clone() {
        const point = new $de620c8161ba008b$var$Point(this.flatCoordinates.slice(), this.layout);
        point.applyProperties(this);
        return point;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        const flatCoordinates = this.flatCoordinates;
        const squaredDistance = (0, $57ec69d152197e1d$export$88e6ebb4fe54f538)(x, y, flatCoordinates[0], flatCoordinates[1]);
        if (squaredDistance < minSquaredDistance) {
            const stride = this.stride;
            for(let i = 0; i < stride; ++i)closestPoint[i] = flatCoordinates[i];
            closestPoint.length = stride;
            return squaredDistance;
        }
        return minSquaredDistance;
    }
    /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   */ getCoordinates() {
        return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
    }
    /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */ computeExtent(extent) {
        return (0, $84be800ca44e672c$export$4838bf78d04a9440)(this.flatCoordinates, extent);
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "Point";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        return (0, $84be800ca44e672c$export$805bdfd6d6690e97)(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
    }
    /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */ setCoordinates(coordinates, layout) {
        this.setLayout(layout, coordinates, 0);
        if (!this.flatCoordinates) this.flatCoordinates = [];
        this.flatCoordinates.length = (0, $e6d128aec3d5ac99$export$60815ead40ec79ab)(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    }
}
var $de620c8161ba008b$export$2e2bcd8739ae039 = $de620c8161ba008b$var$Point;







/**
 * @module ol/geom/flat/interiorpoint
 */ 
/**
 * @module ol/geom/flat/contains
 */ 
function $58f0282580b80064$export$cedabedc7ac0e138(flatCoordinates, offset, end, stride, extent) {
    const outside = (0, $84be800ca44e672c$export$f9ed8a3d123a08e2)(extent, /**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */ function(coordinate) {
        return !$58f0282580b80064$export$949a7a3a4b6f34fa(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
    });
    return !outside;
}
function $58f0282580b80064$export$949a7a3a4b6f34fa(flatCoordinates, offset, end, stride, x, y) {
    // https://geomalgorithms.com/a03-_inclusion.html
    // Copyright 2000 softSurfer, 2012 Dan Sunday
    // This code may be freely used and modified for any purpose
    // providing that this copyright notice is included with it.
    // SoftSurfer makes no warranty for this code, and cannot be held
    // liable for any real or imagined damage resulting from its use.
    // Users of this code must verify correctness for their application.
    let wn = 0;
    let x1 = flatCoordinates[end - stride];
    let y1 = flatCoordinates[end - stride + 1];
    for(; offset < end; offset += stride){
        const x2 = flatCoordinates[offset];
        const y2 = flatCoordinates[offset + 1];
        if (y1 <= y) {
            if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) wn++;
        } else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) wn--;
        x1 = x2;
        y1 = y2;
    }
    return wn !== 0;
}
function $58f0282580b80064$export$ae868c0f6acc3355(flatCoordinates, offset, ends, stride, x, y) {
    if (ends.length === 0) return false;
    if (!$58f0282580b80064$export$949a7a3a4b6f34fa(flatCoordinates, offset, ends[0], stride, x, y)) return false;
    for(let i = 1, ii = ends.length; i < ii; ++i){
        if ($58f0282580b80064$export$949a7a3a4b6f34fa(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) return false;
    }
    return true;
}
function $58f0282580b80064$export$c760d9d16cf92043(flatCoordinates, offset, endss, stride, x, y) {
    if (endss.length === 0) return false;
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        if ($58f0282580b80064$export$ae868c0f6acc3355(flatCoordinates, offset, ends, stride, x, y)) return true;
        offset = ends[ends.length - 1];
    }
    return false;
}


function $0fb8cd85c41caa22$export$50e3b25928a5e892(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, dest) {
    let i, ii, x, x1, x2, y1, y2;
    const y = flatCenters[flatCentersOffset + 1];
    /** @type {Array<number>} */ const intersections = [];
    // Calculate intersections with the horizontal line
    for(let r = 0, rr = ends.length; r < rr; ++r){
        const end = ends[r];
        x1 = flatCoordinates[end - stride];
        y1 = flatCoordinates[end - stride + 1];
        for(i = offset; i < end; i += stride){
            x2 = flatCoordinates[i];
            y2 = flatCoordinates[i + 1];
            if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
                x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
                intersections.push(x);
            }
            x1 = x2;
            y1 = y2;
        }
    }
    // Find the longest segment of the horizontal line that has its center point
    // inside the linear ring.
    let pointX = NaN;
    let maxSegmentLength = -Infinity;
    intersections.sort((0, $69c1cc8ae30f997f$export$fcb633242ef15540));
    x1 = intersections[0];
    for(i = 1, ii = intersections.length; i < ii; ++i){
        x2 = intersections[i];
        const segmentLength = Math.abs(x2 - x1);
        if (segmentLength > maxSegmentLength) {
            x = (x1 + x2) / 2;
            if ((0, $58f0282580b80064$export$ae868c0f6acc3355)(flatCoordinates, offset, ends, stride, x, y)) {
                pointX = x;
                maxSegmentLength = segmentLength;
            }
        }
        x1 = x2;
    }
    if (isNaN(pointX)) // There is no horizontal line that has its center point inside the linear
    // ring.  Use the center of the the linear ring's extent.
    pointX = flatCenters[flatCentersOffset];
    if (dest) {
        dest.push(pointX, y, maxSegmentLength);
        return dest;
    }
    return [
        pointX,
        y,
        maxSegmentLength
    ];
}
function $0fb8cd85c41caa22$export$11463803eda8a372(flatCoordinates, offset, endss, stride, flatCenters) {
    let interiorPoints = [];
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        interiorPoints = $0fb8cd85c41caa22$export$50e3b25928a5e892(flatCoordinates, offset, ends, stride, flatCenters, 2 * i, interiorPoints);
        offset = ends[ends.length - 1];
    }
    return interiorPoints;
}



/**
 * @module ol/geom/flat/intersectsextent
 */ 
/**
 * @module ol/geom/flat/segments
 */ /**
 * This function calls `callback` for each segment of the flat coordinates
 * array. If the callback returns a truthy value the function returns that
 * value immediately. Otherwise the function returns `false`.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
 *     called for each segment.
 * @return {T|boolean} Value.
 * @template T
 */ function $8d8f5846de6dbcc5$export$4b80e395e36b5a56(flatCoordinates, offset, end, stride, callback) {
    let ret;
    offset += stride;
    for(; offset < end; offset += stride){
        ret = callback(flatCoordinates.slice(offset - stride, offset), flatCoordinates.slice(offset, offset + stride));
        if (ret) return ret;
    }
    return false;
}



function $474e660540ba37db$export$40d8d71841a3d779(flatCoordinates, offset, end, stride, extent) {
    const coordinatesExtent = (0, $84be800ca44e672c$export$30570204156ffd18)((0, $84be800ca44e672c$export$fe201bb3bbe031e9)(), flatCoordinates, offset, end, stride);
    if (!(0, $84be800ca44e672c$export$7b0a31e10bbff018)(extent, coordinatesExtent)) return false;
    if ((0, $84be800ca44e672c$export$be866b1e0809b17e)(extent, coordinatesExtent)) return true;
    if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) return true;
    if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) return true;
    return (0, $8d8f5846de6dbcc5$export$4b80e395e36b5a56)(flatCoordinates, offset, end, stride, /**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */ function(point1, point2) {
        return (0, $84be800ca44e672c$export$a6a5a7a461419425)(extent, point1, point2);
    });
}
function $474e660540ba37db$export$fdb1d8e850bf7937(flatCoordinates, offset, ends, stride, extent) {
    for(let i = 0, ii = ends.length; i < ii; ++i){
        if ($474e660540ba37db$export$40d8d71841a3d779(flatCoordinates, offset, ends[i], stride, extent)) return true;
        offset = ends[i];
    }
    return false;
}
function $474e660540ba37db$export$830a0dafbb2ef1c5(flatCoordinates, offset, end, stride, extent) {
    if ($474e660540ba37db$export$40d8d71841a3d779(flatCoordinates, offset, end, stride, extent)) return true;
    if ((0, $58f0282580b80064$export$949a7a3a4b6f34fa)(flatCoordinates, offset, end, stride, extent[0], extent[1])) return true;
    if ((0, $58f0282580b80064$export$949a7a3a4b6f34fa)(flatCoordinates, offset, end, stride, extent[0], extent[3])) return true;
    if ((0, $58f0282580b80064$export$949a7a3a4b6f34fa)(flatCoordinates, offset, end, stride, extent[2], extent[1])) return true;
    if ((0, $58f0282580b80064$export$949a7a3a4b6f34fa)(flatCoordinates, offset, end, stride, extent[2], extent[3])) return true;
    return false;
}
function $474e660540ba37db$export$76dcd8f8f83b6ddb(flatCoordinates, offset, ends, stride, extent) {
    if (!$474e660540ba37db$export$830a0dafbb2ef1c5(flatCoordinates, offset, ends[0], stride, extent)) return false;
    if (ends.length === 1) return true;
    for(let i = 1, ii = ends.length; i < ii; ++i)if ((0, $58f0282580b80064$export$cedabedc7ac0e138)(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
        if (!$474e660540ba37db$export$40d8d71841a3d779(flatCoordinates, ends[i - 1], ends[i], stride, extent)) return false;
    }
    return true;
}
function $474e660540ba37db$export$77b72fa3792f5bf0(flatCoordinates, offset, endss, stride, extent) {
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        if ($474e660540ba37db$export$76dcd8f8f83b6ddb(flatCoordinates, offset, ends, stride, extent)) return true;
        offset = ends[ends.length - 1];
    }
    return false;
}


/**
 * @module ol/geom/flat/orient
 */ /**
 * @module ol/geom/flat/reverse
 */ /**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 */ function $23c47dde077ea5d7$export$741858880c96b18c(flatCoordinates, offset, end, stride) {
    while(offset < end - stride){
        for(let i = 0; i < stride; ++i){
            const tmp = flatCoordinates[offset + i];
            flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
            flatCoordinates[end - stride + i] = tmp;
        }
        offset += stride;
        end -= stride;
    }
}


function $3ab399f8a01aefd6$export$318f2842ed17e094(flatCoordinates, offset, end, stride) {
    // https://stackoverflow.com/q/1165647/clockwise-method#1165943
    // https://github.com/OSGeo/gdal/blob/master/gdal/ogr/ogrlinearring.cpp
    let edge = 0;
    let x1 = flatCoordinates[end - stride];
    let y1 = flatCoordinates[end - stride + 1];
    for(; offset < end; offset += stride){
        const x2 = flatCoordinates[offset];
        const y2 = flatCoordinates[offset + 1];
        edge += (x2 - x1) * (y2 + y1);
        x1 = x2;
        y1 = y2;
    }
    return edge === 0 ? undefined : edge > 0;
}
function $3ab399f8a01aefd6$export$f27cd06e85f4ba28(flatCoordinates, offset, ends, stride, right) {
    right = right !== undefined ? right : false;
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        const isClockwise = $3ab399f8a01aefd6$export$318f2842ed17e094(flatCoordinates, offset, end, stride);
        if (i === 0) {
            if (right && isClockwise || !right && !isClockwise) return false;
        } else {
            if (right && !isClockwise || !right && isClockwise) return false;
        }
        offset = end;
    }
    return true;
}
function $3ab399f8a01aefd6$export$a1d138f4bd85f4b4(flatCoordinates, offset, endss, stride, right) {
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        if (!$3ab399f8a01aefd6$export$f27cd06e85f4ba28(flatCoordinates, offset, ends, stride, right)) return false;
        if (ends.length) offset = ends[ends.length - 1];
    }
    return true;
}
function $3ab399f8a01aefd6$export$b71b604ddfc778c7(flatCoordinates, offset, ends, stride, right) {
    right = right !== undefined ? right : false;
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        const isClockwise = $3ab399f8a01aefd6$export$318f2842ed17e094(flatCoordinates, offset, end, stride);
        const reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;
        if (reverse) (0, $23c47dde077ea5d7$export$741858880c96b18c)(flatCoordinates, offset, end, stride);
        offset = end;
    }
    return offset;
}
function $3ab399f8a01aefd6$export$ea9ed55fc2a85010(flatCoordinates, offset, endss, stride, right) {
    for(let i = 0, ii = endss.length; i < ii; ++i)offset = $3ab399f8a01aefd6$export$b71b604ddfc778c7(flatCoordinates, offset, endss[i], stride, right);
    return offset;
}
function $3ab399f8a01aefd6$export$cb72ae403d6e78e6(flatCoordinates, ends) {
    const endss = [];
    let offset = 0;
    let prevEndIndex = 0;
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        // classifies an array of rings into polygons with outer rings and holes
        if (!$3ab399f8a01aefd6$export$318f2842ed17e094(flatCoordinates, offset, end, 2)) endss.push(ends.slice(prevEndIndex, i + 1));
        else {
            if (endss.length === 0) continue;
            endss[endss.length - 1].push(ends[prevEndIndex]);
        }
        prevEndIndex = i + 1;
        offset = end;
    }
    return endss;
}







/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */ class $8fedf7da5a76e7a9$var$Polygon extends (0, $ecdcc798f2987118$export$2e2bcd8739ae039) {
    /**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */ constructor(coordinates, layout, ends){
        super();
        /**
     * @type {Array<number>}
     * @private
     */ this.ends_ = [];
        /**
     * @private
     * @type {number}
     */ this.flatInteriorPointRevision_ = -1;
        /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */ this.flatInteriorPoint_ = null;
        /**
     * @private
     * @type {number}
     */ this.maxDelta_ = -1;
        /**
     * @private
     * @type {number}
     */ this.maxDeltaRevision_ = -1;
        /**
     * @private
     * @type {number}
     */ this.orientedRevision_ = -1;
        /**
     * @private
     * @type {Array<number>}
     */ this.orientedFlatCoordinates_ = null;
        if (layout !== undefined && ends) {
            this.setFlatCoordinates(layout, /** @type {Array<number>} */ coordinates);
            this.ends_ = ends;
        } else this.setCoordinates(/** @type {Array<Array<import("../coordinate.js").Coordinate>>} */ coordinates, layout);
    }
    /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */ appendLinearRing(linearRing) {
        if (!this.flatCoordinates) this.flatCoordinates = linearRing.getFlatCoordinates().slice();
        else (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(this.flatCoordinates, linearRing.getFlatCoordinates());
        this.ends_.push(this.flatCoordinates.length);
        this.changed();
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   */ clone() {
        const polygon = new $8fedf7da5a76e7a9$var$Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
        polygon.applyProperties(this);
        return polygon;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < (0, $84be800ca44e672c$export$cbe64c389534206f)(this.getExtent(), x, y)) return minSquaredDistance;
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt((0, $cb3f29ffe7102d22$export$fbf31c8f2668ed5a)(this.flatCoordinates, 0, this.ends_, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return (0, $cb3f29ffe7102d22$export$5a48a0eefcf14992)(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */ containsXY(x, y) {
        return (0, $58f0282580b80064$export$ae868c0f6acc3355)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
    }
    /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */ getArea() {
        return (0, $808945bcd5aac66c$export$7a8ee541dfdf2ed5)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
    }
    /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */ getCoordinates(right) {
        let flatCoordinates;
        if (right !== undefined) {
            flatCoordinates = this.getOrientedFlatCoordinates().slice();
            (0, $3ab399f8a01aefd6$export$b71b604ddfc778c7)(flatCoordinates, 0, this.ends_, this.stride, right);
        } else flatCoordinates = this.flatCoordinates;
        return (0, $26e6af5078c94bc3$export$cbb9596fc0f40db2)(flatCoordinates, 0, this.ends_, this.stride);
    }
    /**
   * @return {Array<number>} Ends.
   */ getEnds() {
        return this.ends_;
    }
    /**
   * @return {Array<number>} Interior point.
   */ getFlatInteriorPoint() {
        if (this.flatInteriorPointRevision_ != this.getRevision()) {
            const flatCenter = (0, $84be800ca44e672c$export$c91255cadecfe081)(this.getExtent());
            this.flatInteriorPoint_ = (0, $0fb8cd85c41caa22$export$50e3b25928a5e892)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
            this.flatInteriorPointRevision_ = this.getRevision();
        }
        return this.flatInteriorPoint_;
    }
    /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */ getInteriorPoint() {
        return new (0, $de620c8161ba008b$export$2e2bcd8739ae039)(this.getFlatInteriorPoint(), "XYM");
    }
    /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */ getLinearRingCount() {
        return this.ends_.length;
    }
    /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */ getLinearRing(index) {
        if (index < 0 || this.ends_.length <= index) return null;
        return new (0, $10811f4228331a2d$export$2e2bcd8739ae039)(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    }
    /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */ getLinearRings() {
        const layout = this.layout;
        const flatCoordinates = this.flatCoordinates;
        const ends = this.ends_;
        const linearRings = [];
        let offset = 0;
        for(let i = 0, ii = ends.length; i < ii; ++i){
            const end = ends[i];
            const linearRing = new (0, $10811f4228331a2d$export$2e2bcd8739ae039)(flatCoordinates.slice(offset, end), layout);
            linearRings.push(linearRing);
            offset = end;
        }
        return linearRings;
    }
    /**
   * @return {Array<number>} Oriented flat coordinates.
   */ getOrientedFlatCoordinates() {
        if (this.orientedRevision_ != this.getRevision()) {
            const flatCoordinates = this.flatCoordinates;
            if ((0, $3ab399f8a01aefd6$export$f27cd06e85f4ba28)(flatCoordinates, 0, this.ends_, this.stride)) this.orientedFlatCoordinates_ = flatCoordinates;
            else {
                this.orientedFlatCoordinates_ = flatCoordinates.slice();
                this.orientedFlatCoordinates_.length = (0, $3ab399f8a01aefd6$export$b71b604ddfc778c7)(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
            }
            this.orientedRevision_ = this.getRevision();
        }
        return this.orientedFlatCoordinates_;
    }
    /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   */ getSimplifiedGeometryInternal(squaredTolerance) {
        const simplifiedFlatCoordinates = [];
        const simplifiedEnds = [];
        simplifiedFlatCoordinates.length = (0, $116cc918e3d500bf$export$60a9904b67f8d51b)(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
        return new $8fedf7da5a76e7a9$var$Polygon(simplifiedFlatCoordinates, "XY", simplifiedEnds);
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "Polygon";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        return (0, $474e660540ba37db$export$76dcd8f8f83b6ddb)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
    }
    /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */ setCoordinates(coordinates, layout) {
        this.setLayout(layout, coordinates, 2);
        if (!this.flatCoordinates) this.flatCoordinates = [];
        const ends = (0, $e6d128aec3d5ac99$export$47c3746a74384d45)(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
        this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
        this.changed();
    }
}
var $8fedf7da5a76e7a9$export$2e2bcd8739ae039 = $8fedf7da5a76e7a9$var$Polygon;
function $8fedf7da5a76e7a9$export$f99d756c6d81ae3f(center, radius, n, sphereRadius) {
    n = n ? n : 32;
    /** @type {Array<number>} */ const flatCoordinates = [];
    for(let i = 0; i < n; ++i)(0, $69c1cc8ae30f997f$export$8b58be045bf06082)(flatCoordinates, (0, $d164a570a58ed2be$export$cc800923e997bb8)(center, radius, 2 * Math.PI * i / n, sphereRadius));
    flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
    return new $8fedf7da5a76e7a9$var$Polygon(flatCoordinates, "XY", [
        flatCoordinates.length
    ]);
}
function $8fedf7da5a76e7a9$export$c16b671815801c75(extent) {
    const minX = extent[0];
    const minY = extent[1];
    const maxX = extent[2];
    const maxY = extent[3];
    const flatCoordinates = [
        minX,
        minY,
        minX,
        maxY,
        maxX,
        maxY,
        maxX,
        minY,
        minX,
        minY
    ];
    return new $8fedf7da5a76e7a9$var$Polygon(flatCoordinates, "XY", [
        flatCoordinates.length
    ]);
}
function $8fedf7da5a76e7a9$export$2451009d645fb8c2(circle, sides, angle) {
    sides = sides ? sides : 32;
    const stride = circle.getStride();
    const layout = circle.getLayout();
    const center = circle.getCenter();
    const arrayLength = stride * (sides + 1);
    const flatCoordinates = new Array(arrayLength);
    for(let i = 0; i < arrayLength; i += stride){
        flatCoordinates[i] = 0;
        flatCoordinates[i + 1] = 0;
        for(let j = 2; j < stride; j++)flatCoordinates[i + j] = center[j];
    }
    const ends = [
        flatCoordinates.length
    ];
    const polygon = new $8fedf7da5a76e7a9$var$Polygon(flatCoordinates, layout, ends);
    $8fedf7da5a76e7a9$export$87d6a1539a56e47f(polygon, center, circle.getRadius(), angle);
    return polygon;
}
function $8fedf7da5a76e7a9$export$87d6a1539a56e47f(polygon, center, radius, angle) {
    const flatCoordinates = polygon.getFlatCoordinates();
    const stride = polygon.getStride();
    const sides = flatCoordinates.length / stride - 1;
    const startAngle = angle ? angle : 0;
    for(let i = 0; i <= sides; ++i){
        const offset = i * stride;
        const angle = startAngle + (0, $57ec69d152197e1d$export$ba467bec01d66def)(i, sides) * 2 * Math.PI / sides;
        flatCoordinates[offset] = center[0] + radius * Math.cos(angle);
        flatCoordinates[offset + 1] = center[1] + radius * Math.sin(angle);
    }
    polygon.changed();
}


/**
 * An animation configuration
 *
 * @typedef {Object} Animation
 * @property {import("./coordinate.js").Coordinate} [sourceCenter] Source center.
 * @property {import("./coordinate.js").Coordinate} [targetCenter] Target center.
 * @property {number} [sourceResolution] Source resolution.
 * @property {number} [targetResolution] Target resolution.
 * @property {number} [sourceRotation] Source rotation.
 * @property {number} [targetRotation] Target rotation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Anchor.
 * @property {number} start Start.
 * @property {number} duration Duration.
 * @property {boolean} complete Complete.
 * @property {function(number):number} easing Easing.
 * @property {function(boolean):void} callback Callback.
 */ /**
 * @typedef {Object} Constraints
 * @property {import("./centerconstraint.js").Type} center Center.
 * @property {import("./resolutionconstraint.js").Type} resolution Resolution.
 * @property {import("./rotationconstraint.js").Type} rotation Rotation.
 */ /**
 * @typedef {Object} FitOptions
 * @property {import("./size.js").Size} [size] The size in pixels of the box to fit
 * the extent into. Default is the current size of the first map in the DOM that
 * uses this view, or `[100, 100]` if no such map is found.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in pixels) to be
 * cleared inside the view. Values in the array are top, right, bottom and left
 * padding.
 * @property {boolean} [nearest=false] If the view `constrainResolution` option is `true`,
 * get the nearest extent instead of the closest that actually fits the view.
 * @property {number} [minResolution=0] Minimum resolution that we zoom to.
 * @property {number} [maxZoom] Maximum zoom level that we zoom to. If
 * `minResolution` is given, this property is ignored.
 * @property {number} [duration] The duration of the animation in milliseconds.
 * By default, there is no animation to the target extent.
 * @property {function(number):number} [easing] The easing function used during
 * the animation (defaults to {@link module:ol/easing.inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 * @property {function(boolean):void} [callback] Function called when the view is in
 * its final position. The callback will be called with `true` if the animation
 * series completed on its own or `false` if it was cancelled.
 */ /**
 * @typedef {Object} ViewOptions
 * @property {import("./coordinate.js").Coordinate} [center] The initial center for
 * the view. If a user projection is not set, the coordinate system for the center is
 * specified with the `projection` option. Layer sources will not be fetched if this
 * is not set, but the center can be set later with {@link #setCenter}.
 * @property {boolean|number} [constrainRotation=true] Rotation constraint.
 * `false` means no constraint. `true` means no constraint, but snap to zero
 * near zero. A number constrains the rotation to that number of values. For
 * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
 * @property {boolean} [enableRotation=true] Enable rotation.
 * If `false`, a rotation constraint that always sets the rotation to zero is
 * used. The `constrainRotation` option has no effect if `enableRotation` is
 * `false`.
 * @property {import("./extent.js").Extent} [extent] The extent that constrains the
 * view, in other words, nothing outside of this extent can be visible on the map.
 * @property {boolean} [constrainOnlyCenter=false] If true, the extent
 * constraint will only apply to the view center and not the whole extent.
 * @property {boolean} [smoothExtentConstraint=true] If true, the extent
 * constraint will be applied smoothly, i.e. allow the view to go slightly outside
 * of the given `extent`.
 * @property {number} [maxResolution] The maximum resolution used to determine
 * the resolution constraint. It is used together with `minResolution` (or
 * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
 * that the projection's validity extent fits in a 256x256 px tile. If the
 * projection is Spherical Mercator (the default) then `maxResolution` defaults
 * to `40075016.68557849 / 256 = 156543.03392804097`.
 * @property {number} [minResolution] The minimum resolution used to determine
 * the resolution constraint.  It is used together with `maxResolution` (or
 * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
 * zoom levels (with a factor of 2). If the projection is Spherical Mercator
 * (the default) then `minResolution` defaults to
 * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
 * @property {number} [maxZoom=28] The maximum zoom level used to determine the
 * resolution constraint. It is used together with `minZoom` (or
 * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
 * provided, it is given precedence over `maxZoom`.
 * @property {number} [minZoom=0] The minimum zoom level used to determine the
 * resolution constraint. It is used together with `maxZoom` (or
 * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
 * provided, it is given precedence over `minZoom`.
 * @property {boolean} [multiWorld=false] If `false` the view is constrained so
 * only one world is visible, and you cannot pan off the edge.  If `true` the map
 * may show multiple worlds at low zoom levels.  Only used if the `projection` is
 * global.  Note that if `extent` is also provided it is given precedence.
 * @property {boolean} [constrainResolution=false] If true, the view will always
 * animate to the closest zoom level after an interaction; false means
 * intermediary zoom levels are allowed.
 * @property {boolean} [smoothResolutionConstraint=true] If true, the resolution
 * min/max values will be applied smoothly, i. e. allow the view to exceed slightly
 * the given resolution or zoom bounds.
 * @property {boolean} [showFullExtent=false] Allow the view to be zoomed out to
 * show the full configured extent. By default, when a view is configured with an
 * extent, users will not be able to zoom out so the viewport exceeds the extent in
 * either dimension. This means the full extent may not be visible if the viewport
 * is taller or wider than the aspect ratio of the configured extent. If
 * showFullExtent is true, the user will be able to zoom out so that the viewport
 * exceeds the height or width of the configured extent, but not both, allowing the
 * full extent to be shown.
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857'] The
 * projection. The default is Spherical Mercator.
 * @property {number} [resolution] The initial resolution for the view. The
 * units are `projection` units per pixel (e.g. meters per pixel). An
 * alternative to setting this is to set `zoom`. Layer sources will not be
 * fetched if neither this nor `zoom` are defined, but they can be set later
 * with {@link #setZoom} or {@link #setResolution}.
 * @property {Array<number>} [resolutions] Resolutions that determine the
 * zoom levels if specified. The index in the array corresponds to the zoom level,
 * therefore the resolution values have to be in descending order. It also constrains
 * the resolution by the minimum and maximum value. If set the `maxResolution`,
 * `minResolution`, `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
 * @property {number} [rotation=0] The initial rotation for the view in radians
 * (positive rotation clockwise, 0 means North).
 * @property {number} [zoom] Only used if `resolution` is not defined. Zoom
 * level used to calculate the initial resolution for the view.
 * @property {number} [zoomFactor=2] The zoom factor used to compute the
 * corresponding resolution.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in css pixels).
 * If the map viewport is partially covered with other content (overlays) along
 * its edges, this setting allows to shift the center of the viewport away from
 * that content. The order of the values is top, right, bottom, left.
 */ /**
 * @typedef {Object} AnimationOptions
 * @property {import("./coordinate.js").Coordinate} [center] The center of the view at the end of
 * the animation.
 * @property {number} [zoom] The zoom level of the view at the end of the
 * animation. This takes precedence over `resolution`.
 * @property {number} [resolution] The resolution of the view at the end
 * of the animation.  If `zoom` is also provided, this option will be ignored.
 * @property {number} [rotation] The rotation of the view at the end of
 * the animation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Optional anchor to remain fixed
 * during a rotation or resolution animation.
 * @property {number} [duration=1000] The duration of the animation in milliseconds.
 * @property {function(number):number} [easing] The easing function used
 * during the animation (defaults to {@link module:ol/easing.inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 */ /**
 * @typedef {Object} State
 * @property {import("./coordinate.js").Coordinate} center Center (in view projection coordinates).
 * @property {import("./proj/Projection.js").default} projection Projection.
 * @property {number} resolution Resolution.
 * @property {import("./coordinate.js").Coordinate} [nextCenter] The next center during an animation series.
 * @property {number} [nextResolution] The next resolution during an animation series.
 * @property {number} [nextRotation] The next rotation during an animation series.
 * @property {number} rotation Rotation.
 * @property {number} zoom Zoom.
 */ /**
 * Like {@link import("./Map.js").FrameState}, but just `viewState` and `extent`.
 * @typedef {Object} ViewStateLayerStateExtent
 * @property {State} viewState View state.
 * @property {import("./extent.js").Extent} extent Extent (in user projection coordinates).
 * @property {Array<import("./layer/Layer.js").State>} [layerStatesArray] Layer states.
 */ /**
 * Default min zoom level for the map view.
 * @type {number}
 */ const $5c065e8fdff88e40$var$DEFAULT_MIN_ZOOM = 0;
/**
 * @typedef {import("./ObjectEventType").Types|'change:center'|'change:resolution'|'change:rotation'} ViewObjectEventTypes
 */ /***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<ViewObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|ViewObjectEventTypes, Return>} ViewOnSignature
 */ /**
 * @classdesc
 * A View object represents a simple 2D view of the map.
 *
 * This is the object to act upon to change the center, resolution,
 * and rotation of the map.
 *
 * A View has a `projection`. The projection determines the
 * coordinate system of the center, and its units determine the units of the
 * resolution (projection units per pixel). The default projection is
 * Web Mercator (EPSG:3857).
 *
 * ### The view states
 *
 * A View is determined by three states: `center`, `resolution`,
 * and `rotation`. Each state has a corresponding getter and setter, e.g.
 * `getCenter` and `setCenter` for the `center` state.
 *
 * The `zoom` state is actually not saved on the view: all computations
 * internally use the `resolution` state. Still, the `setZoom` and `getZoom`
 * methods are available, as well as `getResolutionForZoom` and
 * `getZoomForResolution` to switch from one system to the other.
 *
 * ### The constraints
 *
 * `setCenter`, `setResolution` and `setRotation` can be used to change the
 * states of the view, but any constraint defined in the constructor will
 * be applied along the way.
 *
 * A View object can have a *resolution constraint*, a *rotation constraint*
 * and a *center constraint*.
 *
 * The *resolution constraint* typically restricts min/max values and
 * snaps to specific resolutions. It is determined by the following
 * options: `resolutions`, `maxResolution`, `maxZoom` and `zoomFactor`.
 * If `resolutions` is set, the other three options are ignored. See
 * documentation for each option for more information. By default, the view
 * only has a min/max restriction and allow intermediary zoom levels when
 * pinch-zooming for example.
 *
 * The *rotation constraint* snaps to specific angles. It is determined
 * by the following options: `enableRotation` and `constrainRotation`.
 * By default rotation is allowed and its value is snapped to zero when approaching the
 * horizontal.
 *
 * The *center constraint* is determined by the `extent` option. By
 * default the view center is not constrained at all.
 *
 * ### Changing the view state
 *
 * It is important to note that `setZoom`, `setResolution`, `setCenter` and
 * `setRotation` are subject to the above mentioned constraints. As such, it
 * may sometimes not be possible to know in advance the resulting state of the
 * View. For example, calling `setResolution(10)` does not guarantee that
 * `getResolution()` will return `10`.
 *
 * A consequence of this is that, when applying a delta on the view state, one
 * should use `adjustCenter`, `adjustRotation`, `adjustZoom` and `adjustResolution`
 * rather than the corresponding setters. This will let view do its internal
 * computations. Besides, the `adjust*` methods also take an `anchor`
 * argument which allows specifying an origin for the transformation.
 *
 * ### Interacting with the view
 *
 * View constraints are usually only applied when the view is *at rest*, meaning that
 * no interaction or animation is ongoing. As such, if the user puts the view in a
 * state that is not equivalent to a constrained one (e.g. rotating the view when
 * the snap angle is 0), an animation will be triggered at the interaction end to
 * put back the view to a stable state;
 *
 * @api
 */ class $5c065e8fdff88e40$var$View extends (0, $d6cd7f1b627d5e92$export$2e2bcd8739ae039) {
    /**
   * @param {ViewOptions} [options] View options.
   */ constructor(options){
        super();
        /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */ this.on;
        /***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */ this.once;
        /***
     * @type {ViewOnSignature<void>}
     */ this.un;
        options = Object.assign({}, options);
        /**
     * @private
     * @type {Array<number>}
     */ this.hints_ = [
            0,
            0
        ];
        /**
     * @private
     * @type {Array<Array<Animation>>}
     */ this.animations_ = [];
        /**
     * @private
     * @type {number|undefined}
     */ this.updateAnimationKey_;
        /**
     * @private
     * @const
     * @type {import("./proj/Projection.js").default}
     */ this.projection_ = (0, $983289ae1d13cd2a$export$549167224996a0fb)(options.projection, "EPSG:3857");
        /**
     * @private
     * @type {import("./size.js").Size}
     */ this.viewportSize_ = [
            100,
            100
        ];
        /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */ this.targetCenter_ = null;
        /**
     * @private
     * @type {number|undefined}
     */ this.targetResolution_;
        /**
     * @private
     * @type {number|undefined}
     */ this.targetRotation_;
        /**
     * @private
     * @type {import("./coordinate.js").Coordinate}
     */ this.nextCenter_ = null;
        /**
     * @private
     * @type {number}
     */ this.nextResolution_;
        /**
     * @private
     * @type {number}
     */ this.nextRotation_;
        /**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */ this.cancelAnchor_ = undefined;
        if (options.projection) (0, $983289ae1d13cd2a$export$ed949affbc7c4223)();
        if (options.center) options.center = (0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(options.center, this.projection_);
        if (options.extent) options.extent = (0, $983289ae1d13cd2a$export$494be3a3a25689ca)(options.extent, this.projection_);
        this.applyOptions_(options);
    }
    /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */ applyOptions_(options) {
        const properties = Object.assign({}, options);
        for(const key in 0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039)delete properties[key];
        this.setProperties(properties, true);
        const resolutionConstraintInfo = $5c065e8fdff88e40$export$c68d65f9148da196(options);
        /**
     * @private
     * @type {number}
     */ this.maxResolution_ = resolutionConstraintInfo.maxResolution;
        /**
     * @private
     * @type {number}
     */ this.minResolution_ = resolutionConstraintInfo.minResolution;
        /**
     * @private
     * @type {number}
     */ this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
        /**
     * @private
     * @type {Array<number>|undefined}
     */ this.resolutions_ = options.resolutions;
        /**
     * @type {Array<number>|undefined}
     * @private
     */ this.padding_ = options.padding;
        /**
     * @private
     * @type {number}
     */ this.minZoom_ = resolutionConstraintInfo.minZoom;
        const centerConstraint = $5c065e8fdff88e40$export$964345001ee9ac52(options);
        const resolutionConstraint = resolutionConstraintInfo.constraint;
        const rotationConstraint = $5c065e8fdff88e40$export$4eeaa08dd550e3c0(options);
        /**
     * @private
     * @type {Constraints}
     */ this.constraints_ = {
            center: centerConstraint,
            resolution: resolutionConstraint,
            rotation: rotationConstraint
        };
        this.setRotation(options.rotation !== undefined ? options.rotation : 0);
        this.setCenterInternal(options.center !== undefined ? options.center : null);
        if (options.resolution !== undefined) this.setResolution(options.resolution);
        else if (options.zoom !== undefined) this.setZoom(options.zoom);
    }
    /**
   * Padding (in css pixels).
   * If the map viewport is partially covered with other content (overlays) along
   * its edges, this setting allows to shift the center of the viewport away from that
   * content. The order of the values in the array is top, right, bottom, left.
   * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
   * @type {Array<number>|undefined}
   * @api
   */ get padding() {
        return this.padding_;
    }
    set padding(padding) {
        let oldPadding = this.padding_;
        this.padding_ = padding;
        const center = this.getCenterInternal();
        if (center) {
            const newPadding = padding || [
                0,
                0,
                0,
                0
            ];
            oldPadding = oldPadding || [
                0,
                0,
                0,
                0
            ];
            const resolution = this.getResolution();
            const offsetX = resolution / 2 * (newPadding[3] - oldPadding[3] + oldPadding[1] - newPadding[1]);
            const offsetY = resolution / 2 * (newPadding[0] - oldPadding[0] + oldPadding[2] - newPadding[2]);
            this.setCenterInternal([
                center[0] + offsetX,
                center[1] - offsetY
            ]);
        }
    }
    /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */ getUpdatedOptions_(newOptions) {
        const options = this.getProperties();
        // preserve resolution (or zoom)
        if (options.resolution !== undefined) options.resolution = this.getResolution();
        else options.zoom = this.getZoom();
        // preserve center
        options.center = this.getCenterInternal();
        // preserve rotation
        options.rotation = this.getRotation();
        return Object.assign({}, options, newOptions);
    }
    /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */ animate(var_args) {
        if (this.isDef() && !this.getAnimating()) this.resolveConstraints(0);
        const args = new Array(arguments.length);
        for(let i = 0; i < args.length; ++i){
            let options = arguments[i];
            if (options.center) {
                options = Object.assign({}, options);
                options.center = (0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(options.center, this.getProjection());
            }
            if (options.anchor) {
                options = Object.assign({}, options);
                options.anchor = (0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(options.anchor, this.getProjection());
            }
            args[i] = options;
        }
        this.animateInternal.apply(this, args);
    }
    /**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */ animateInternal(var_args) {
        let animationCount = arguments.length;
        let callback;
        if (animationCount > 1 && typeof arguments[animationCount - 1] === "function") {
            callback = arguments[animationCount - 1];
            --animationCount;
        }
        let i = 0;
        for(; i < animationCount && !this.isDef(); ++i){
            // if view properties are not yet set, shortcut to the final state
            const state = arguments[i];
            if (state.center) this.setCenterInternal(state.center);
            if (state.zoom !== undefined) this.setZoom(state.zoom);
            else if (state.resolution) this.setResolution(state.resolution);
            if (state.rotation !== undefined) this.setRotation(state.rotation);
        }
        if (i === animationCount) {
            if (callback) $5c065e8fdff88e40$var$animationCallback(callback, true);
            return;
        }
        let start = Date.now();
        let center = this.targetCenter_.slice();
        let resolution = this.targetResolution_;
        let rotation = this.targetRotation_;
        const series = [];
        for(; i < animationCount; ++i){
            const options = /** @type {AnimationOptions} */ arguments[i];
            const animation = {
                start: start,
                complete: false,
                anchor: options.anchor,
                duration: options.duration !== undefined ? options.duration : 1000,
                easing: options.easing || (0, $b6cb732edc5512cf$export$9b47139b511b56e4),
                callback: callback
            };
            if (options.center) {
                animation.sourceCenter = center;
                animation.targetCenter = options.center.slice();
                center = animation.targetCenter;
            }
            if (options.zoom !== undefined) {
                animation.sourceResolution = resolution;
                animation.targetResolution = this.getResolutionForZoom(options.zoom);
                resolution = animation.targetResolution;
            } else if (options.resolution) {
                animation.sourceResolution = resolution;
                animation.targetResolution = options.resolution;
                resolution = animation.targetResolution;
            }
            if (options.rotation !== undefined) {
                animation.sourceRotation = rotation;
                const delta = (0, $57ec69d152197e1d$export$ba467bec01d66def)(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
                animation.targetRotation = rotation + delta;
                rotation = animation.targetRotation;
            }
            // check if animation is a no-op
            if ($5c065e8fdff88e40$export$ee75376562060184(animation)) animation.complete = true;
            else start += animation.duration;
            series.push(animation);
        }
        this.animations_.push(series);
        this.setHint((0, $da1f857e3747bc07$export$2e2bcd8739ae039).ANIMATING, 1);
        this.updateAnimations_();
    }
    /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */ getAnimating() {
        return this.hints_[(0, $da1f857e3747bc07$export$2e2bcd8739ae039).ANIMATING] > 0;
    }
    /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */ getInteracting() {
        return this.hints_[(0, $da1f857e3747bc07$export$2e2bcd8739ae039).INTERACTING] > 0;
    }
    /**
   * Cancel any ongoing animations.
   * @api
   */ cancelAnimations() {
        this.setHint((0, $da1f857e3747bc07$export$2e2bcd8739ae039).ANIMATING, -this.hints_[(0, $da1f857e3747bc07$export$2e2bcd8739ae039).ANIMATING]);
        let anchor;
        for(let i = 0, ii = this.animations_.length; i < ii; ++i){
            const series = this.animations_[i];
            if (series[0].callback) $5c065e8fdff88e40$var$animationCallback(series[0].callback, false);
            if (!anchor) for(let j = 0, jj = series.length; j < jj; ++j){
                const animation = series[j];
                if (!animation.complete) {
                    anchor = animation.anchor;
                    break;
                }
            }
        }
        this.animations_.length = 0;
        this.cancelAnchor_ = anchor;
        this.nextCenter_ = null;
        this.nextResolution_ = NaN;
        this.nextRotation_ = NaN;
    }
    /**
   * Update all animations.
   */ updateAnimations_() {
        if (this.updateAnimationKey_ !== undefined) {
            cancelAnimationFrame(this.updateAnimationKey_);
            this.updateAnimationKey_ = undefined;
        }
        if (!this.getAnimating()) return;
        const now = Date.now();
        let more = false;
        for(let i = this.animations_.length - 1; i >= 0; --i){
            const series = this.animations_[i];
            let seriesComplete = true;
            for(let j = 0, jj = series.length; j < jj; ++j){
                const animation = series[j];
                if (animation.complete) continue;
                const elapsed = now - animation.start;
                let fraction = animation.duration > 0 ? elapsed / animation.duration : 1;
                if (fraction >= 1) {
                    animation.complete = true;
                    fraction = 1;
                } else seriesComplete = false;
                const progress = animation.easing(fraction);
                if (animation.sourceCenter) {
                    const x0 = animation.sourceCenter[0];
                    const y0 = animation.sourceCenter[1];
                    const x1 = animation.targetCenter[0];
                    const y1 = animation.targetCenter[1];
                    this.nextCenter_ = animation.targetCenter;
                    const x = x0 + progress * (x1 - x0);
                    const y = y0 + progress * (y1 - y0);
                    this.targetCenter_ = [
                        x,
                        y
                    ];
                }
                if (animation.sourceResolution && animation.targetResolution) {
                    const resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);
                    if (animation.anchor) {
                        const size = this.getViewportSize_(this.getRotation());
                        const constrainedResolution = this.constraints_.resolution(resolution, 0, size, true);
                        this.targetCenter_ = this.calculateCenterZoom(constrainedResolution, animation.anchor);
                    }
                    this.nextResolution_ = animation.targetResolution;
                    this.targetResolution_ = resolution;
                    this.applyTargetState_(true);
                }
                if (animation.sourceRotation !== undefined && animation.targetRotation !== undefined) {
                    const rotation = progress === 1 ? (0, $57ec69d152197e1d$export$ba467bec01d66def)(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);
                    if (animation.anchor) {
                        const constrainedRotation = this.constraints_.rotation(rotation, true);
                        this.targetCenter_ = this.calculateCenterRotate(constrainedRotation, animation.anchor);
                    }
                    this.nextRotation_ = animation.targetRotation;
                    this.targetRotation_ = rotation;
                }
                this.applyTargetState_(true);
                more = true;
                if (!animation.complete) break;
            }
            if (seriesComplete) {
                this.animations_[i] = null;
                this.setHint((0, $da1f857e3747bc07$export$2e2bcd8739ae039).ANIMATING, -1);
                this.nextCenter_ = null;
                this.nextResolution_ = NaN;
                this.nextRotation_ = NaN;
                const callback = series[0].callback;
                if (callback) $5c065e8fdff88e40$var$animationCallback(callback, true);
            }
        }
        // prune completed series
        this.animations_ = this.animations_.filter(Boolean);
        if (more && this.updateAnimationKey_ === undefined) this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this));
    }
    /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */ calculateCenterRotate(rotation, anchor) {
        let center;
        const currentCenter = this.getCenterInternal();
        if (currentCenter !== undefined) {
            center = [
                currentCenter[0] - anchor[0],
                currentCenter[1] - anchor[1]
            ];
            (0, $c65bc16e55ef0e33$export$bb628a54ab399bc9)(center, rotation - this.getRotation());
            (0, $c65bc16e55ef0e33$export$e16d8520af44a096)(center, anchor);
        }
        return center;
    }
    /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */ calculateCenterZoom(resolution, anchor) {
        let center;
        const currentCenter = this.getCenterInternal();
        const currentResolution = this.getResolution();
        if (currentCenter !== undefined && currentResolution !== undefined) {
            const x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
            const y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
            center = [
                x,
                y
            ];
        }
        return center;
    }
    /**
   * Returns the current viewport size.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */ getViewportSize_(rotation) {
        const size = this.viewportSize_;
        if (rotation) {
            const w = size[0];
            const h = size[1];
            return [
                Math.abs(w * Math.cos(rotation)) + Math.abs(h * Math.sin(rotation)),
                Math.abs(w * Math.sin(rotation)) + Math.abs(h * Math.cos(rotation))
            ];
        }
        return size;
    }
    /**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
   */ setViewportSize(size) {
        this.viewportSize_ = Array.isArray(size) ? size.slice() : [
            100,
            100
        ];
        if (!this.getAnimating()) this.resolveConstraints(0);
    }
    /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */ getCenter() {
        const center = this.getCenterInternal();
        if (!center) return center;
        return (0, $983289ae1d13cd2a$export$698f563af1ba02a5)(center, this.getProjection());
    }
    /**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */ getCenterInternal() {
        return /** @type {import("./coordinate.js").Coordinate|undefined} */ this.get((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).CENTER);
    }
    /**
   * @return {Constraints} Constraints.
   */ getConstraints() {
        return this.constraints_;
    }
    /**
   * @return {boolean} Resolution constraint is set
   */ getConstrainResolution() {
        return this.get("constrainResolution");
    }
    /**
   * @param {Array<number>} [hints] Destination array.
   * @return {Array<number>} Hint.
   */ getHints(hints) {
        if (hints !== undefined) {
            hints[0] = this.hints_[0];
            hints[1] = this.hints_[1];
            return hints;
        }
        return this.hints_.slice();
    }
    /**
   * Calculate the extent for the current view state and the passed size.
   * The size is the pixel dimensions of the box into which the calculated extent
   * should fit. In most cases you want to get the extent of the entire map,
   * that is `map.getSize()`.
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided, the size
   * of the map that uses this view will be used.
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */ calculateExtent(size) {
        const extent = this.calculateExtentInternal(size);
        return (0, $983289ae1d13cd2a$export$96bfd09e2cffb006)(extent, this.getProjection());
    }
    /**
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */ calculateExtentInternal(size) {
        size = size || this.getViewportSizeMinusPadding_();
        const center = /** @type {!import("./coordinate.js").Coordinate} */ this.getCenterInternal();
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(center, 1); // The view center is not defined
        const resolution = /** @type {!number} */ this.getResolution();
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(resolution !== undefined, 2); // The view resolution is not defined
        const rotation = /** @type {!number} */ this.getRotation();
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(rotation !== undefined, 3); // The view rotation is not defined
        return (0, $84be800ca44e672c$export$13ba650faf8308)(center, resolution, rotation, size);
    }
    /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */ getMaxResolution() {
        return this.maxResolution_;
    }
    /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */ getMinResolution() {
        return this.minResolution_;
    }
    /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */ getMaxZoom() {
        return /** @type {number} */ this.getZoomForResolution(this.minResolution_);
    }
    /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */ setMaxZoom(zoom) {
        this.applyOptions_(this.getUpdatedOptions_({
            maxZoom: zoom
        }));
    }
    /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */ getMinZoom() {
        return /** @type {number} */ this.getZoomForResolution(this.maxResolution_);
    }
    /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */ setMinZoom(zoom) {
        this.applyOptions_(this.getUpdatedOptions_({
            minZoom: zoom
        }));
    }
    /**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */ setConstrainResolution(enabled) {
        this.applyOptions_(this.getUpdatedOptions_({
            constrainResolution: enabled
        }));
    }
    /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */ getProjection() {
        return this.projection_;
    }
    /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */ getResolution() {
        return /** @type {number|undefined} */ this.get((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).RESOLUTION);
    }
    /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */ getResolutions() {
        return this.resolutions_;
    }
    /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */ getResolutionForExtent(extent, size) {
        return this.getResolutionForExtentInternal((0, $983289ae1d13cd2a$export$494be3a3a25689ca)(extent, this.getProjection()), size);
    }
    /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */ getResolutionForExtentInternal(extent, size) {
        size = size || this.getViewportSizeMinusPadding_();
        const xResolution = (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(extent) / size[0];
        const yResolution = (0, $84be800ca44e672c$export$c08559766941f856)(extent) / size[1];
        return Math.max(xResolution, yResolution);
    }
    /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Resolution for value function.
   */ getResolutionForValueFunction(power) {
        power = power || 2;
        const maxResolution = this.getConstrainedResolution(this.maxResolution_);
        const minResolution = this.minResolution_;
        const max = Math.log(maxResolution / minResolution) / Math.log(power);
        return(/**
       * @param {number} value Value.
       * @return {number} Resolution.
       */ function(value) {
            const resolution = maxResolution / Math.pow(power, value * max);
            return resolution;
        });
    }
    /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */ getRotation() {
        return /** @type {number} */ this.get((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).ROTATION);
    }
    /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Value for resolution function.
   */ getValueForResolutionFunction(power) {
        const logPower = Math.log(power || 2);
        const maxResolution = this.getConstrainedResolution(this.maxResolution_);
        const minResolution = this.minResolution_;
        const max = Math.log(maxResolution / minResolution) / logPower;
        return(/**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */ function(resolution) {
            const value = Math.log(maxResolution / resolution) / logPower / max;
            return value;
        });
    }
    /**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */ getViewportSizeMinusPadding_(rotation) {
        let size = this.getViewportSize_(rotation);
        const padding = this.padding_;
        if (padding) size = [
            size[0] - padding[1] - padding[3],
            size[1] - padding[0] - padding[2]
        ];
        return size;
    }
    /**
   * @return {State} View state.
   */ getState() {
        const projection = this.getProjection();
        const resolution = this.getResolution();
        const rotation = this.getRotation();
        let center = /** @type {import("./coordinate.js").Coordinate} */ this.getCenterInternal();
        const padding = this.padding_;
        if (padding) {
            const reducedSize = this.getViewportSizeMinusPadding_();
            center = $5c065e8fdff88e40$var$calculateCenterOn(center, this.getViewportSize_(), [
                reducedSize[0] / 2 + padding[3],
                reducedSize[1] / 2 + padding[0]
            ], resolution, rotation);
        }
        return {
            center: center.slice(0),
            projection: projection !== undefined ? projection : null,
            resolution: resolution,
            nextCenter: this.nextCenter_,
            nextResolution: this.nextResolution_,
            nextRotation: this.nextRotation_,
            rotation: rotation,
            zoom: this.getZoom()
        };
    }
    /**
   * @return {ViewStateLayerStateExtent} Like `FrameState`, but just `viewState` and `extent`.
   */ getViewStateAndExtent() {
        return {
            viewState: this.getState(),
            extent: this.calculateExtent()
        };
    }
    /**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */ getZoom() {
        let zoom;
        const resolution = this.getResolution();
        if (resolution !== undefined) zoom = this.getZoomForResolution(resolution);
        return zoom;
    }
    /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */ getZoomForResolution(resolution) {
        let offset = this.minZoom_ || 0;
        let max, zoomFactor;
        if (this.resolutions_) {
            const nearest = (0, $69c1cc8ae30f997f$export$8a3786cc03fdb777)(this.resolutions_, resolution, 1);
            offset = nearest;
            max = this.resolutions_[nearest];
            if (nearest == this.resolutions_.length - 1) zoomFactor = 2;
            else zoomFactor = max / this.resolutions_[nearest + 1];
        } else {
            max = this.maxResolution_;
            zoomFactor = this.zoomFactor_;
        }
        return offset + Math.log(max / resolution) / Math.log(zoomFactor);
    }
    /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */ getResolutionForZoom(zoom) {
        if (this.resolutions_) {
            if (this.resolutions_.length <= 1) return 0;
            const baseLevel = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(Math.floor(zoom), 0, this.resolutions_.length - 2);
            const zoomFactor = this.resolutions_[baseLevel] / this.resolutions_[baseLevel + 1];
            return this.resolutions_[baseLevel] / Math.pow(zoomFactor, (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(zoom - baseLevel, 0, 1));
        }
        return this.maxResolution_ / Math.pow(this.zoomFactor_, zoom - this.minZoom_);
    }
    /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [options] Options.
   * @api
   */ fit(geometryOrExtent, options) {
        /** @type {import("./geom/SimpleGeometry.js").default} */ let geometry;
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(Array.isArray(geometryOrExtent) || typeof /** @type {?} */ geometryOrExtent.getSimplifiedGeometry === "function", 24); // Invalid extent or geometry provided as `geometry`
        if (Array.isArray(geometryOrExtent)) {
            (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(!(0, $84be800ca44e672c$export$dd1bc94b04021eeb)(geometryOrExtent), 25); // Cannot fit empty extent provided as `geometry`
            const extent = (0, $983289ae1d13cd2a$export$494be3a3a25689ca)(geometryOrExtent, this.getProjection());
            geometry = (0, $8fedf7da5a76e7a9$export$c16b671815801c75)(extent);
        } else if (geometryOrExtent.getType() === "Circle") {
            const extent = (0, $983289ae1d13cd2a$export$494be3a3a25689ca)(geometryOrExtent.getExtent(), this.getProjection());
            geometry = (0, $8fedf7da5a76e7a9$export$c16b671815801c75)(extent);
            geometry.rotate(this.getRotation(), (0, $84be800ca44e672c$export$c91255cadecfe081)(extent));
        } else {
            const userProjection = (0, $983289ae1d13cd2a$export$3973b77d5f6f2790)();
            if (userProjection) geometry = /** @type {import("./geom/SimpleGeometry.js").default} */ geometryOrExtent.clone().transform(userProjection, this.getProjection());
            else geometry = geometryOrExtent;
        }
        this.fitInternal(geometry, options);
    }
    /**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */ rotatedExtentForGeometry(geometry) {
        const rotation = this.getRotation();
        const cosAngle = Math.cos(rotation);
        const sinAngle = Math.sin(-rotation);
        const coords = geometry.getFlatCoordinates();
        const stride = geometry.getStride();
        let minRotX = Infinity;
        let minRotY = Infinity;
        let maxRotX = -Infinity;
        let maxRotY = -Infinity;
        for(let i = 0, ii = coords.length; i < ii; i += stride){
            const rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
            const rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
            minRotX = Math.min(minRotX, rotX);
            minRotY = Math.min(minRotY, rotY);
            maxRotX = Math.max(maxRotX, rotX);
            maxRotY = Math.max(maxRotY, rotY);
        }
        return [
            minRotX,
            minRotY,
            maxRotX,
            maxRotY
        ];
    }
    /**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [options] Options.
   */ fitInternal(geometry, options) {
        options = options || {};
        let size = options.size;
        if (!size) size = this.getViewportSizeMinusPadding_();
        const padding = options.padding !== undefined ? options.padding : [
            0,
            0,
            0,
            0
        ];
        const nearest = options.nearest !== undefined ? options.nearest : false;
        let minResolution;
        if (options.minResolution !== undefined) minResolution = options.minResolution;
        else if (options.maxZoom !== undefined) minResolution = this.getResolutionForZoom(options.maxZoom);
        else minResolution = 0;
        const rotatedExtent = this.rotatedExtentForGeometry(geometry);
        // calculate resolution
        let resolution = this.getResolutionForExtentInternal(rotatedExtent, [
            size[0] - padding[1] - padding[3],
            size[1] - padding[0] - padding[2]
        ]);
        resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);
        resolution = this.getConstrainedResolution(resolution, nearest ? 0 : 1);
        // calculate center
        const rotation = this.getRotation();
        const sinAngle = Math.sin(rotation);
        const cosAngle = Math.cos(rotation);
        const centerRot = (0, $84be800ca44e672c$export$c91255cadecfe081)(rotatedExtent);
        centerRot[0] += (padding[1] - padding[3]) / 2 * resolution;
        centerRot[1] += (padding[0] - padding[2]) / 2 * resolution;
        const centerX = centerRot[0] * cosAngle - centerRot[1] * sinAngle;
        const centerY = centerRot[1] * cosAngle + centerRot[0] * sinAngle;
        const center = this.getConstrainedCenter([
            centerX,
            centerY
        ], resolution);
        const callback = options.callback ? options.callback : (0, $2c3aa3ce33eccc0f$export$1cd1943b3a73bbe8);
        if (options.duration !== undefined) this.animateInternal({
            resolution: resolution,
            center: center,
            duration: options.duration,
            easing: options.easing
        }, callback);
        else {
            this.targetResolution_ = resolution;
            this.targetCenter_ = center;
            this.applyTargetState_(false, true);
            $5c065e8fdff88e40$var$animationCallback(callback, true);
        }
    }
    /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */ centerOn(coordinate, size, position) {
        this.centerOnInternal((0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(coordinate, this.getProjection()), size, position);
    }
    /**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */ centerOnInternal(coordinate, size, position) {
        this.setCenterInternal($5c065e8fdff88e40$var$calculateCenterOn(coordinate, size, position, this.getResolution(), this.getRotation()));
    }
    /**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */ calculateCenterShift(center, resolution, rotation, size) {
        let centerShift;
        const padding = this.padding_;
        if (padding && center) {
            const reducedSize = this.getViewportSizeMinusPadding_(-rotation);
            const shiftedCenter = $5c065e8fdff88e40$var$calculateCenterOn(center, size, [
                reducedSize[0] / 2 + padding[3],
                reducedSize[1] / 2 + padding[0]
            ], resolution, rotation);
            centerShift = [
                center[0] - shiftedCenter[0],
                center[1] - shiftedCenter[1]
            ];
        }
        return centerShift;
    }
    /**
   * @return {boolean} Is defined.
   */ isDef() {
        return !!this.getCenterInternal() && this.getResolution() !== undefined;
    }
    /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */ adjustCenter(deltaCoordinates) {
        const center = (0, $983289ae1d13cd2a$export$698f563af1ba02a5)(this.targetCenter_, this.getProjection());
        this.setCenter([
            center[0] + deltaCoordinates[0],
            center[1] + deltaCoordinates[1]
        ]);
    }
    /**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */ adjustCenterInternal(deltaCoordinates) {
        const center = this.targetCenter_;
        this.setCenterInternal([
            center[0] + deltaCoordinates[0],
            center[1] + deltaCoordinates[1]
        ]);
    }
    /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */ adjustResolution(ratio, anchor) {
        anchor = anchor && (0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(anchor, this.getProjection());
        this.adjustResolutionInternal(ratio, anchor);
    }
    /**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */ adjustResolutionInternal(ratio, anchor) {
        const isMoving = this.getAnimating() || this.getInteracting();
        const size = this.getViewportSize_(this.getRotation());
        const newResolution = this.constraints_.resolution(this.targetResolution_ * ratio, 0, size, isMoving);
        if (anchor) this.targetCenter_ = this.calculateCenterZoom(newResolution, anchor);
        this.targetResolution_ *= ratio;
        this.applyTargetState_();
    }
    /**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */ adjustZoom(delta, anchor) {
        this.adjustResolution(Math.pow(this.zoomFactor_, -delta), anchor);
    }
    /**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   * @api
   */ adjustRotation(delta, anchor) {
        if (anchor) anchor = (0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(anchor, this.getProjection());
        this.adjustRotationInternal(delta, anchor);
    }
    /**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   */ adjustRotationInternal(delta, anchor) {
        const isMoving = this.getAnimating() || this.getInteracting();
        const newRotation = this.constraints_.rotation(this.targetRotation_ + delta, isMoving);
        if (anchor) this.targetCenter_ = this.calculateCenterRotate(newRotation, anchor);
        this.targetRotation_ += delta;
        this.applyTargetState_();
    }
    /**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */ setCenter(center) {
        this.setCenterInternal(center ? (0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(center, this.getProjection()) : center);
    }
    /**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */ setCenterInternal(center) {
        this.targetCenter_ = center;
        this.applyTargetState_();
    }
    /**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */ setHint(hint, delta) {
        this.hints_[hint] += delta;
        this.changed();
        return this.hints_[hint];
    }
    /**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */ setResolution(resolution) {
        this.targetResolution_ = resolution;
        this.applyTargetState_();
    }
    /**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */ setRotation(rotation) {
        this.targetRotation_ = rotation;
        this.applyTargetState_();
    }
    /**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */ setZoom(zoom) {
        this.setResolution(this.getResolutionForZoom(zoom));
    }
    /**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [forceMoving] Apply constraints as if the view is moving.
   * @private
   */ applyTargetState_(doNotCancelAnims, forceMoving) {
        const isMoving = this.getAnimating() || this.getInteracting() || forceMoving;
        // compute rotation
        const newRotation = this.constraints_.rotation(this.targetRotation_, isMoving);
        const size = this.getViewportSize_(newRotation);
        const newResolution = this.constraints_.resolution(this.targetResolution_, 0, size, isMoving);
        const newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, isMoving, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
        if (this.get((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).ROTATION) !== newRotation) this.set((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).ROTATION, newRotation);
        if (this.get((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).RESOLUTION) !== newResolution) {
            this.set((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).RESOLUTION, newResolution);
            this.set("zoom", this.getZoom(), true);
        }
        if (!newCenter || !this.get((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).CENTER) || !(0, $c65bc16e55ef0e33$export$e9bab7fafb253603)(this.get((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).CENTER), newCenter)) this.set((0, $6221a0fc70b5fd5c$export$2e2bcd8739ae039).CENTER, newCenter);
        if (this.getAnimating() && !doNotCancelAnims) this.cancelAnimations();
        this.cancelAnchor_ = undefined;
    }
    /**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [duration] The animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */ resolveConstraints(duration, resolutionDirection, anchor) {
        duration = duration !== undefined ? duration : 200;
        const direction = resolutionDirection || 0;
        const newRotation = this.constraints_.rotation(this.targetRotation_);
        const size = this.getViewportSize_(newRotation);
        const newResolution = this.constraints_.resolution(this.targetResolution_, direction, size);
        const newCenter = this.constraints_.center(this.targetCenter_, newResolution, size, false, this.calculateCenterShift(this.targetCenter_, newResolution, newRotation, size));
        if (duration === 0 && !this.cancelAnchor_) {
            this.targetResolution_ = newResolution;
            this.targetRotation_ = newRotation;
            this.targetCenter_ = newCenter;
            this.applyTargetState_();
            return;
        }
        anchor = anchor || (duration === 0 ? this.cancelAnchor_ : undefined);
        this.cancelAnchor_ = undefined;
        if (this.getResolution() !== newResolution || this.getRotation() !== newRotation || !this.getCenterInternal() || !(0, $c65bc16e55ef0e33$export$e9bab7fafb253603)(this.getCenterInternal(), newCenter)) {
            if (this.getAnimating()) this.cancelAnimations();
            this.animateInternal({
                rotation: newRotation,
                center: newCenter,
                resolution: newResolution,
                duration: duration,
                easing: (0, $b6cb732edc5512cf$export$57636bb43b1ccbb0),
                anchor: anchor
            });
        }
    }
    /**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */ beginInteraction() {
        this.resolveConstraints(0);
        this.setHint((0, $da1f857e3747bc07$export$2e2bcd8739ae039).INTERACTING, 1);
    }
    /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */ endInteraction(duration, resolutionDirection, anchor) {
        anchor = anchor && (0, $983289ae1d13cd2a$export$d4b8ec0b96db1ee2)(anchor, this.getProjection());
        this.endInteractionInternal(duration, resolutionDirection, anchor);
    }
    /**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */ endInteractionInternal(duration, resolutionDirection, anchor) {
        if (!this.getInteracting()) return;
        this.setHint((0, $da1f857e3747bc07$export$2e2bcd8739ae039).INTERACTING, -1);
        this.resolveConstraints(duration, resolutionDirection, anchor);
    }
    /**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */ getConstrainedCenter(targetCenter, targetResolution) {
        const size = this.getViewportSize_(this.getRotation());
        return this.constraints_.center(targetCenter, targetResolution || this.getResolution(), size);
    }
    /**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */ getConstrainedZoom(targetZoom, direction) {
        const targetRes = this.getResolutionForZoom(targetZoom);
        return this.getZoomForResolution(this.getConstrainedResolution(targetRes, direction));
    }
    /**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */ getConstrainedResolution(targetResolution, direction) {
        direction = direction || 0;
        const size = this.getViewportSize_(this.getRotation());
        return this.constraints_.resolution(targetResolution, direction, size);
    }
}
/**
 * @param {Function} callback Callback.
 * @param {*} returnValue Return value.
 */ function $5c065e8fdff88e40$var$animationCallback(callback, returnValue) {
    setTimeout(function() {
        callback(returnValue);
    }, 0);
}
function $5c065e8fdff88e40$export$964345001ee9ac52(options) {
    if (options.extent !== undefined) {
        const smooth = options.smoothExtentConstraint !== undefined ? options.smoothExtentConstraint : true;
        return (0, $266312e45c8c12e4$export$c2f0af2c946f6897)(options.extent, options.constrainOnlyCenter, smooth);
    }
    const projection = (0, $983289ae1d13cd2a$export$549167224996a0fb)(options.projection, "EPSG:3857");
    if (options.multiWorld !== true && projection.isGlobal()) {
        const extent = projection.getExtent().slice();
        extent[0] = -Infinity;
        extent[2] = Infinity;
        return (0, $266312e45c8c12e4$export$c2f0af2c946f6897)(extent, false, false);
    }
    return 0, $266312e45c8c12e4$export$f883a24d5edde77c;
}
function $5c065e8fdff88e40$export$c68d65f9148da196(options) {
    let resolutionConstraint;
    let maxResolution;
    let minResolution;
    // TODO: move these to be ol constants
    // see https://github.com/openlayers/openlayers/issues/2076
    const defaultMaxZoom = 28;
    const defaultZoomFactor = 2;
    let minZoom = options.minZoom !== undefined ? options.minZoom : $5c065e8fdff88e40$var$DEFAULT_MIN_ZOOM;
    let maxZoom = options.maxZoom !== undefined ? options.maxZoom : defaultMaxZoom;
    const zoomFactor = options.zoomFactor !== undefined ? options.zoomFactor : defaultZoomFactor;
    const multiWorld = options.multiWorld !== undefined ? options.multiWorld : false;
    const smooth = options.smoothResolutionConstraint !== undefined ? options.smoothResolutionConstraint : true;
    const showFullExtent = options.showFullExtent !== undefined ? options.showFullExtent : false;
    const projection = (0, $983289ae1d13cd2a$export$549167224996a0fb)(options.projection, "EPSG:3857");
    const projExtent = projection.getExtent();
    let constrainOnlyCenter = options.constrainOnlyCenter;
    let extent = options.extent;
    if (!multiWorld && !extent && projection.isGlobal()) {
        constrainOnlyCenter = false;
        extent = projExtent;
    }
    if (options.resolutions !== undefined) {
        const resolutions = options.resolutions;
        maxResolution = resolutions[minZoom];
        minResolution = resolutions[maxZoom] !== undefined ? resolutions[maxZoom] : resolutions[resolutions.length - 1];
        if (options.constrainResolution) resolutionConstraint = (0, $ba6928caf79ac783$export$d65a517690fc4385)(resolutions, smooth, !constrainOnlyCenter && extent, showFullExtent);
        else resolutionConstraint = (0, $ba6928caf79ac783$export$1c4e6da9b4b066fe)(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    } else {
        // calculate the default min and max resolution
        const size = !projExtent ? 360 * (0, $6a4fde186e5464e9$export$1482081eec883108).degrees / projection.getMetersPerUnit() : Math.max((0, $84be800ca44e672c$export$3c49c185de0c2bfc)(projExtent), (0, $84be800ca44e672c$export$c08559766941f856)(projExtent));
        const defaultMaxResolution = size / (0, $a96901ad7de10b0c$export$6b8cb5cd370bd90c) / Math.pow(defaultZoomFactor, $5c065e8fdff88e40$var$DEFAULT_MIN_ZOOM);
        const defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - $5c065e8fdff88e40$var$DEFAULT_MIN_ZOOM);
        // user provided maxResolution takes precedence
        maxResolution = options.maxResolution;
        if (maxResolution !== undefined) minZoom = 0;
        else maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
        // user provided minResolution takes precedence
        minResolution = options.minResolution;
        if (minResolution === undefined) {
            if (options.maxZoom !== undefined) {
                if (options.maxResolution !== undefined) minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
                else minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
            } else minResolution = defaultMinResolution;
        }
        // given discrete zoom levels, minResolution may be different than provided
        maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
        minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
        if (options.constrainResolution) resolutionConstraint = (0, $ba6928caf79ac783$export$22ac0f6b219de91a)(zoomFactor, maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
        else resolutionConstraint = (0, $ba6928caf79ac783$export$1c4e6da9b4b066fe)(maxResolution, minResolution, smooth, !constrainOnlyCenter && extent, showFullExtent);
    }
    return {
        constraint: resolutionConstraint,
        maxResolution: maxResolution,
        minResolution: minResolution,
        minZoom: minZoom,
        zoomFactor: zoomFactor
    };
}
function $5c065e8fdff88e40$export$4eeaa08dd550e3c0(options) {
    const enableRotation = options.enableRotation !== undefined ? options.enableRotation : true;
    if (enableRotation) {
        const constrainRotation = options.constrainRotation;
        if (constrainRotation === undefined || constrainRotation === true) return (0, $4412a0460d6cbb1d$export$17a6e6f3448b17e8)();
        if (constrainRotation === false) return 0, $4412a0460d6cbb1d$export$f883a24d5edde77c;
        if (typeof constrainRotation === "number") return (0, $4412a0460d6cbb1d$export$9ba78806de831083)(constrainRotation);
        return 0, $4412a0460d6cbb1d$export$f883a24d5edde77c;
    }
    return 0, $4412a0460d6cbb1d$export$e20fbacbb41798b;
}
function $5c065e8fdff88e40$export$ee75376562060184(animation) {
    if (animation.sourceCenter && animation.targetCenter) {
        if (!(0, $c65bc16e55ef0e33$export$e9bab7fafb253603)(animation.sourceCenter, animation.targetCenter)) return false;
    }
    if (animation.sourceResolution !== animation.targetResolution) return false;
    if (animation.sourceRotation !== animation.targetRotation) return false;
    return true;
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {import("./size.js").Size} size Box pixel size.
 * @param {import("./pixel.js").Pixel} position Position on the view to center on.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @return {import("./coordinate.js").Coordinate} Shifted center.
 */ function $5c065e8fdff88e40$var$calculateCenterOn(coordinate, size, position, resolution, rotation) {
    // calculate rotated position
    const cosAngle = Math.cos(-rotation);
    let sinAngle = Math.sin(-rotation);
    let rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    let rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    rotX += (size[0] / 2 - position[0]) * resolution;
    rotY += (position[1] - size[1] / 2) * resolution;
    // go back to original angle
    sinAngle = -sinAngle; // go back to original rotation
    const centerX = rotX * cosAngle - rotY * sinAngle;
    const centerY = rotY * cosAngle + rotX * sinAngle;
    return [
        centerX,
        centerY
    ];
}
var $5c065e8fdff88e40$export$2e2bcd8739ae039 = $5c065e8fdff88e40$var$View;





/**
 * @typedef {function(import("../Map.js").FrameState):HTMLElement} RenderFunction
 */ /**
 * @typedef {'sourceready'|'change:source'} LayerEventType
 */ /***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     LayerEventType, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|LayerEventType|
 *     import("../render/EventType").LayerRenderEventTypes, Return>} LayerOnSignature
 */ /**
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {SourceType} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer~Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../Map.js").default|null} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */ /**
 * @typedef {Object} State
 * @property {import("./Layer.js").default} layer Layer.
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {boolean} visible Visible.
 * @property {boolean} managed Managed.
 * @property {import("../extent.js").Extent} [extent] Extent.
 * @property {number} zIndex ZIndex.
 * @property {number} maxResolution Maximum resolution.
 * @property {number} minResolution Minimum resolution.
 * @property {number} minZoom Minimum zoom.
 * @property {number} maxZoom Maximum zoom.
 */ /**
 * @classdesc
 * Base class from which all layer types are derived. This should only be instantiated
 * in the case where a custom layer is added to the map with a custom `render` function.
 * Such a function can be specified in the `options` object, and is expected to return an HTML element.
 *
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with [map.addLayer()]{@link import("../Map.js").default#addLayer}.
 * Components like {@link module:ol/interaction/Draw~Draw} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * [layer.setMap()]{@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 * A `sourceready` event is fired when the layer's source is ready.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 * @fires import("../events/Event.js").BaseEvent#sourceready
 *
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
 * @template {import("../renderer/Layer.js").default} [RendererType=import("../renderer/Layer.js").default]
 * @api
 */ class $14019fcc7ba24fd5$var$Layer extends (0, $caae539137eb9fda$export$2e2bcd8739ae039) {
    /**
   * @param {Options<SourceType>} options Layer options.
   */ constructor(options){
        const baseOptions = Object.assign({}, options);
        delete baseOptions.source;
        super(baseOptions);
        /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */ this.on;
        /***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */ this.once;
        /***
     * @type {LayerOnSignature<void>}
     */ this.un;
        /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */ this.mapPrecomposeKey_ = null;
        /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */ this.mapRenderKey_ = null;
        /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */ this.sourceChangeKey_ = null;
        /**
     * @private
     * @type {RendererType}
     */ this.renderer_ = null;
        /**
     * @private
     * @type {boolean}
     */ this.sourceReady_ = false;
        /**
     * @protected
     * @type {boolean}
     */ this.rendered = false;
        // Overwrite default render method with a custom one
        if (options.render) this.render = options.render;
        if (options.map) this.setMap(options.map);
        this.addChangeListener((0, $e777f004feefd0c5$export$2e2bcd8739ae039).SOURCE, this.handleSourcePropertyChange_);
        const source = options.source ? /** @type {SourceType} */ options.source : null;
        this.setSource(source);
    }
    /**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */ getLayersArray(array) {
        array = array ? array : [];
        array.push(this);
        return array;
    }
    /**
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */ getLayerStatesArray(states) {
        states = states ? states : [];
        states.push(this.getLayerState());
        return states;
    }
    /**
   * Get the layer source.
   * @return {SourceType|null} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */ getSource() {
        return /** @type {SourceType} */ this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).SOURCE) || null;
    }
    /**
   * @return {SourceType|null} The source being rendered.
   */ getRenderSource() {
        return this.getSource();
    }
    /**
   * @return {import("../source/Source.js").State} Source state.
   */ getSourceState() {
        const source = this.getSource();
        return !source ? "undefined" : source.getState();
    }
    /**
   * @private
   */ handleSourceChange_() {
        this.changed();
        if (this.sourceReady_ || this.getSource().getState() !== "ready") return;
        this.sourceReady_ = true;
        this.dispatchEvent("sourceready");
    }
    /**
   * @private
   */ handleSourcePropertyChange_() {
        if (this.sourceChangeKey_) {
            (0, $776f68d2a754760b$export$b0a21c8b3c1c921)(this.sourceChangeKey_);
            this.sourceChangeKey_ = null;
        }
        this.sourceReady_ = false;
        const source = this.getSource();
        if (source) {
            this.sourceChangeKey_ = (0, $776f68d2a754760b$export$63174c828edd6ff8)(source, (0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, this.handleSourceChange_, this);
            if (source.getState() === "ready") {
                this.sourceReady_ = true;
                setTimeout(()=>{
                    this.dispatchEvent("sourceready");
                }, 0);
            }
        }
        this.changed();
    }
    /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */ getFeatures(pixel) {
        if (!this.renderer_) return Promise.resolve([]);
        return this.renderer_.getFeatures(pixel);
    }
    /**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */ getData(pixel) {
        if (!this.renderer_ || !this.rendered) return null;
        return this.renderer_.getData(pixel);
    }
    /**
   * The layer is visible on the map view, i.e. within its min/max resolution or zoom and
   * extent, not set to `visible: false`, and not inside a layer group that is set
   * to `visible: false`.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {boolean} The layer is visible in the map view.
   * @api
   */ isVisible(view) {
        let frameState;
        const map = this.getMapInternal();
        if (!view && map) view = map.getView();
        if (view instanceof (0, $5c065e8fdff88e40$export$2e2bcd8739ae039)) frameState = {
            viewState: view.getState(),
            extent: view.calculateExtent()
        };
        else frameState = view;
        if (!frameState.layerStatesArray && map) frameState.layerStatesArray = map.getLayerGroup().getLayerStatesArray();
        let layerState;
        if (frameState.layerStatesArray) layerState = frameState.layerStatesArray.find((layerState)=>layerState.layer === this);
        else layerState = this.getLayerState();
        const layerExtent = this.getExtent();
        return $14019fcc7ba24fd5$export$acb1e9cb9ce4ca56(layerState, frameState.viewState) && (!layerExtent || (0, $84be800ca44e672c$export$7b0a31e10bbff018)(layerExtent, frameState.extent));
    }
    /**
   * Get the attributions of the source of this layer for the given view.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {Array<string>} Attributions for this layer at the given view.
   * @api
   */ getAttributions(view) {
        if (!this.isVisible(view)) return [];
        let getAttributions;
        const source = this.getSource();
        if (source) getAttributions = source.getAttributions();
        if (!getAttributions) return [];
        const frameState = view instanceof (0, $5c065e8fdff88e40$export$2e2bcd8739ae039) ? view.getViewStateAndExtent() : view;
        let attributions = getAttributions(frameState);
        if (!Array.isArray(attributions)) attributions = [
            attributions
        ];
        return attributions;
    }
    /**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement|null} The rendered element.
   */ render(frameState, target) {
        const layerRenderer = this.getRenderer();
        if (layerRenderer.prepareFrame(frameState)) {
            this.rendered = true;
            return layerRenderer.renderFrame(frameState, target);
        }
        return null;
    }
    /**
   * Called when a layer is not visible during a map render.
   */ unrender() {
        this.rendered = false;
    }
    /**
   * For use inside the library only.
   * @param {import("../Map.js").default|null} map Map.
   */ setMapInternal(map) {
        if (!map) this.unrender();
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAP, map);
    }
    /**
   * For use inside the library only.
   * @return {import("../Map.js").default|null} Map.
   */ getMapInternal() {
        return this.get((0, $e777f004feefd0c5$export$2e2bcd8739ae039).MAP);
    }
    /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */ setMap(map) {
        if (this.mapPrecomposeKey_) {
            (0, $776f68d2a754760b$export$b0a21c8b3c1c921)(this.mapPrecomposeKey_);
            this.mapPrecomposeKey_ = null;
        }
        if (!map) this.changed();
        if (this.mapRenderKey_) {
            (0, $776f68d2a754760b$export$b0a21c8b3c1c921)(this.mapRenderKey_);
            this.mapRenderKey_ = null;
        }
        if (map) {
            this.mapPrecomposeKey_ = (0, $776f68d2a754760b$export$63174c828edd6ff8)(map, (0, $4585eb82aab12670$export$2e2bcd8739ae039).PRECOMPOSE, function(evt) {
                const renderEvent = /** @type {import("../render/Event.js").default} */ evt;
                const layerStatesArray = renderEvent.frameState.layerStatesArray;
                const layerState = this.getLayerState(false);
                // A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both.
                (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(!layerStatesArray.some(function(arrayLayerState) {
                    return arrayLayerState.layer === layerState.layer;
                }), 67);
                layerStatesArray.push(layerState);
            }, this);
            this.mapRenderKey_ = (0, $776f68d2a754760b$export$63174c828edd6ff8)(this, (0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, map.render, map);
            this.changed();
        }
    }
    /**
   * Set the layer source.
   * @param {SourceType|null} source The layer source.
   * @observable
   * @api
   */ setSource(source) {
        this.set((0, $e777f004feefd0c5$export$2e2bcd8739ae039).SOURCE, source);
    }
    /**
   * Get the renderer for this layer.
   * @return {RendererType|null} The layer renderer.
   */ getRenderer() {
        if (!this.renderer_) this.renderer_ = this.createRenderer();
        return this.renderer_;
    }
    /**
   * @return {boolean} The layer has a renderer.
   */ hasRenderer() {
        return !!this.renderer_;
    }
    /**
   * Create a renderer for this layer.
   * @return {RendererType} A layer renderer.
   * @protected
   */ createRenderer() {
        return null;
    }
    /**
   * Clean up.
   */ disposeInternal() {
        if (this.renderer_) {
            this.renderer_.dispose();
            delete this.renderer_;
        }
        this.setSource(null);
        super.disposeInternal();
    }
}
function $14019fcc7ba24fd5$export$acb1e9cb9ce4ca56(layerState, viewState) {
    if (!layerState.visible) return false;
    const resolution = viewState.resolution;
    if (resolution < layerState.minResolution || resolution >= layerState.maxResolution) return false;
    const zoom = viewState.zoom;
    return zoom > layerState.minZoom && zoom <= layerState.maxZoom;
}
var $14019fcc7ba24fd5$export$2e2bcd8739ae039 = $14019fcc7ba24fd5$var$Layer;


var $878c4f61c06eb00a$exports = {};
!function(t, i) {
    $878c4f61c06eb00a$exports = i();
}($878c4f61c06eb00a$exports, function() {
    "use strict";
    function t(t, r, e, a, h) {
        !function t(n, r, e, a, h) {
            for(; a > e;){
                if (a - e > 600) {
                    var o = a - e + 1, s = r - e + 1, l = Math.log(o), f = .5 * Math.exp(2 * l / 3), u = .5 * Math.sqrt(l * f * (o - f) / o) * (s - o / 2 < 0 ? -1 : 1), m = Math.max(e, Math.floor(r - s * f / o + u)), c = Math.min(a, Math.floor(r + (o - s) * f / o + u));
                    t(n, r, m, c, h);
                }
                var p = n[r], d = e, x = a;
                for(i(n, e, r), h(n[a], p) > 0 && i(n, e, a); d < x;){
                    for(i(n, d, x), d++, x--; h(n[d], p) < 0;)d++;
                    for(; h(n[x], p) > 0;)x--;
                }
                0 === h(n[e], p) ? i(n, e, x) : i(n, ++x, a), x <= r && (e = x + 1), r <= x && (a = x - 1);
            }
        }(t, r, e || 0, a || t.length - 1, h || n);
    }
    function i(t, i, n) {
        var r = t[i];
        t[i] = t[n], t[n] = r;
    }
    function n(t, i) {
        return t < i ? -1 : t > i ? 1 : 0;
    }
    var r = function(t) {
        void 0 === t && (t = 9), this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), this.clear();
    };
    function e(t, i, n) {
        if (!n) return i.indexOf(t);
        for(var r = 0; r < i.length; r++)if (n(t, i[r])) return r;
        return -1;
    }
    function a(t, i) {
        h(t, 0, t.children.length, i, t);
    }
    function h(t, i, n, r, e) {
        e || (e = p(null)), e.minX = 1 / 0, e.minY = 1 / 0, e.maxX = -1 / 0, e.maxY = -1 / 0;
        for(var a = i; a < n; a++){
            var h = t.children[a];
            o(e, t.leaf ? r(h) : h);
        }
        return e;
    }
    function o(t, i) {
        return t.minX = Math.min(t.minX, i.minX), t.minY = Math.min(t.minY, i.minY), t.maxX = Math.max(t.maxX, i.maxX), t.maxY = Math.max(t.maxY, i.maxY), t;
    }
    function s(t, i) {
        return t.minX - i.minX;
    }
    function l(t, i) {
        return t.minY - i.minY;
    }
    function f(t) {
        return (t.maxX - t.minX) * (t.maxY - t.minY);
    }
    function u(t) {
        return t.maxX - t.minX + (t.maxY - t.minY);
    }
    function m(t, i) {
        return t.minX <= i.minX && t.minY <= i.minY && i.maxX <= t.maxX && i.maxY <= t.maxY;
    }
    function c(t, i) {
        return i.minX <= t.maxX && i.minY <= t.maxY && i.maxX >= t.minX && i.maxY >= t.minY;
    }
    function p(t) {
        return {
            children: t,
            height: 1,
            leaf: !0,
            minX: 1 / 0,
            minY: 1 / 0,
            maxX: -1 / 0,
            maxY: -1 / 0
        };
    }
    function d(i, n, r, e, a) {
        for(var h = [
            n,
            r
        ]; h.length;)if (!((r = h.pop()) - (n = h.pop()) <= e)) {
            var o = n + Math.ceil((r - n) / e / 2) * e;
            t(i, o, n, r, a), h.push(n, o, o, r);
        }
    }
    return r.prototype.all = function() {
        return this._all(this.data, []);
    }, r.prototype.search = function(t) {
        var i = this.data, n = [];
        if (!c(t, i)) return n;
        for(var r = this.toBBox, e = []; i;){
            for(var a = 0; a < i.children.length; a++){
                var h = i.children[a], o = i.leaf ? r(h) : h;
                c(t, o) && (i.leaf ? n.push(h) : m(t, o) ? this._all(h, n) : e.push(h));
            }
            i = e.pop();
        }
        return n;
    }, r.prototype.collides = function(t) {
        var i = this.data;
        if (!c(t, i)) return !1;
        for(var n = []; i;){
            for(var r = 0; r < i.children.length; r++){
                var e = i.children[r], a = i.leaf ? this.toBBox(e) : e;
                if (c(t, a)) {
                    if (i.leaf || m(t, a)) return !0;
                    n.push(e);
                }
            }
            i = n.pop();
        }
        return !1;
    }, r.prototype.load = function(t) {
        if (!t || !t.length) return this;
        if (t.length < this._minEntries) {
            for(var i = 0; i < t.length; i++)this.insert(t[i]);
            return this;
        }
        var n = this._build(t.slice(), 0, t.length - 1, 0);
        if (this.data.children.length) {
            if (this.data.height === n.height) this._splitRoot(this.data, n);
            else {
                if (this.data.height < n.height) {
                    var r = this.data;
                    this.data = n, n = r;
                }
                this._insert(n, this.data.height - n.height - 1, !0);
            }
        } else this.data = n;
        return this;
    }, r.prototype.insert = function(t) {
        return t && this._insert(t, this.data.height - 1), this;
    }, r.prototype.clear = function() {
        return this.data = p([]), this;
    }, r.prototype.remove = function(t, i) {
        if (!t) return this;
        for(var n, r, a, h = this.data, o = this.toBBox(t), s = [], l = []; h || s.length;){
            if (h || (h = s.pop(), r = s[s.length - 1], n = l.pop(), a = !0), h.leaf) {
                var f = e(t, h.children, i);
                if (-1 !== f) return h.children.splice(f, 1), s.push(h), this._condense(s), this;
            }
            a || h.leaf || !m(h, o) ? r ? (n++, h = r.children[n], a = !1) : h = null : (s.push(h), l.push(n), n = 0, r = h, h = h.children[0]);
        }
        return this;
    }, r.prototype.toBBox = function(t) {
        return t;
    }, r.prototype.compareMinX = function(t, i) {
        return t.minX - i.minX;
    }, r.prototype.compareMinY = function(t, i) {
        return t.minY - i.minY;
    }, r.prototype.toJSON = function() {
        return this.data;
    }, r.prototype.fromJSON = function(t) {
        return this.data = t, this;
    }, r.prototype._all = function(t, i) {
        for(var n = []; t;)t.leaf ? i.push.apply(i, t.children) : n.push.apply(n, t.children), t = n.pop();
        return i;
    }, r.prototype._build = function(t, i, n, r) {
        var e, h = n - i + 1, o = this._maxEntries;
        if (h <= o) return a(e = p(t.slice(i, n + 1)), this.toBBox), e;
        r || (r = Math.ceil(Math.log(h) / Math.log(o)), o = Math.ceil(h / Math.pow(o, r - 1))), (e = p([])).leaf = !1, e.height = r;
        var s = Math.ceil(h / o), l = s * Math.ceil(Math.sqrt(o));
        d(t, i, n, l, this.compareMinX);
        for(var f = i; f <= n; f += l){
            var u = Math.min(f + l - 1, n);
            d(t, f, u, s, this.compareMinY);
            for(var m = f; m <= u; m += s){
                var c = Math.min(m + s - 1, u);
                e.children.push(this._build(t, m, c, r - 1));
            }
        }
        return a(e, this.toBBox), e;
    }, r.prototype._chooseSubtree = function(t, i, n, r) {
        for(; r.push(i), !i.leaf && r.length - 1 !== n;){
            for(var e = 1 / 0, a = 1 / 0, h = void 0, o = 0; o < i.children.length; o++){
                var s = i.children[o], l = f(s), u = (m = t, c = s, (Math.max(c.maxX, m.maxX) - Math.min(c.minX, m.minX)) * (Math.max(c.maxY, m.maxY) - Math.min(c.minY, m.minY)) - l);
                u < a ? (a = u, e = l < e ? l : e, h = s) : u === a && l < e && (e = l, h = s);
            }
            i = h || i.children[0];
        }
        var m, c;
        return i;
    }, r.prototype._insert = function(t, i, n) {
        var r = n ? t : this.toBBox(t), e = [], a = this._chooseSubtree(r, this.data, i, e);
        for(a.children.push(t), o(a, r); i >= 0 && e[i].children.length > this._maxEntries;)this._split(e, i), i--;
        this._adjustParentBBoxes(r, e, i);
    }, r.prototype._split = function(t, i) {
        var n = t[i], r = n.children.length, e = this._minEntries;
        this._chooseSplitAxis(n, e, r);
        var h = this._chooseSplitIndex(n, e, r), o = p(n.children.splice(h, n.children.length - h));
        o.height = n.height, o.leaf = n.leaf, a(n, this.toBBox), a(o, this.toBBox), i ? t[i - 1].children.push(o) : this._splitRoot(n, o);
    }, r.prototype._splitRoot = function(t, i) {
        this.data = p([
            t,
            i
        ]), this.data.height = t.height + 1, this.data.leaf = !1, a(this.data, this.toBBox);
    }, r.prototype._chooseSplitIndex = function(t, i, n) {
        for(var r, e, a, o, s, l, u, m = 1 / 0, c = 1 / 0, p = i; p <= n - i; p++){
            var d = h(t, 0, p, this.toBBox), x = h(t, p, n, this.toBBox), v = (e = d, a = x, o = void 0, s = void 0, l = void 0, u = void 0, o = Math.max(e.minX, a.minX), s = Math.max(e.minY, a.minY), l = Math.min(e.maxX, a.maxX), u = Math.min(e.maxY, a.maxY), Math.max(0, l - o) * Math.max(0, u - s)), M = f(d) + f(x);
            v < m ? (m = v, r = p, c = M < c ? M : c) : v === m && M < c && (c = M, r = p);
        }
        return r || n - i;
    }, r.prototype._chooseSplitAxis = function(t, i, n) {
        var r = t.leaf ? this.compareMinX : s, e = t.leaf ? this.compareMinY : l;
        this._allDistMargin(t, i, n, r) < this._allDistMargin(t, i, n, e) && t.children.sort(r);
    }, r.prototype._allDistMargin = function(t, i, n, r) {
        t.children.sort(r);
        for(var e = this.toBBox, a = h(t, 0, i, e), s = h(t, n - i, n, e), l = u(a) + u(s), f = i; f < n - i; f++){
            var m = t.children[f];
            o(a, t.leaf ? e(m) : m), l += u(a);
        }
        for(var c = n - i - 1; c >= i; c--){
            var p = t.children[c];
            o(s, t.leaf ? e(p) : p), l += u(s);
        }
        return l;
    }, r.prototype._adjustParentBBoxes = function(t, i, n) {
        for(var r = n; r >= 0; r--)o(i[r], t);
    }, r.prototype._condense = function(t) {
        for(var i = t.length - 1, n = void 0; i >= 0; i--)0 === t[i].children.length ? i > 0 ? (n = t[i - 1].children).splice(n.indexOf(t[i]), 1) : this.clear() : a(t[i], this.toBBox);
    }, r;
});


/**
 * @module ol/style/Style
 */ /**
 * @module ol/style/Circle
 */ /**
 * @module ol/style/RegularShape
 */ /**
 * @module ol/ImageState
 */ /**
 * @enum {number}
 */ var $d5d27ccbbbef5bf5$export$2e2bcd8739ae039 = {
    IDLE: 0,
    LOADING: 1,
    LOADED: 2,
    ERROR: 3,
    EMPTY: 4
};


/**
 * @module ol/style/Image
 */ 
/**
 * @module ol/size
 */ /**
 * An array of numbers representing a size: `[width, height]`.
 * @typedef {Array<number>} Size
 * @api
 */ /**
 * Returns a buffered size.
 * @param {Size} size Size.
 * @param {number} num The amount by which to buffer.
 * @param {Size} [dest] Optional reusable size array.
 * @return {Size} The buffered size.
 */ function $3db00eb0a4716cab$export$ab1029bcae9ddb4a(size, num, dest) {
    if (dest === undefined) dest = [
        0,
        0
    ];
    dest[0] = size[0] + 2 * num;
    dest[1] = size[1] + 2 * num;
    return dest;
}
function $3db00eb0a4716cab$export$622c471beb1693c7(size) {
    return size[0] > 0 && size[1] > 0;
}
function $3db00eb0a4716cab$export$dcdf75081b88279d(size, ratio, dest) {
    if (dest === undefined) dest = [
        0,
        0
    ];
    dest[0] = size[0] * ratio + 0.5 | 0;
    dest[1] = size[1] * ratio + 0.5 | 0;
    return dest;
}
function $3db00eb0a4716cab$export$a71a825ff42fb8e1(size, dest) {
    if (Array.isArray(size)) return size;
    if (dest === undefined) dest = [
        size,
        size
    ];
    else {
        dest[0] = size;
        dest[1] = size;
    }
    return dest;
}


/**
 * @typedef {Object} Options
 * @property {number} opacity Opacity.
 * @property {boolean} rotateWithView If the image should get rotated with the view.
 * @property {number} rotation Rotation.
 * @property {number|import("../size.js").Size} scale Scale.
 * @property {Array<number>} displacement Displacement.
 * @property {"declutter"|"obstacle"|"none"|undefined} declutterMode Declutter mode: `declutter`, `obstacle`, 'none */ /**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @abstract
 * @api
 */ class $86ef58b83c2a6f52$var$ImageStyle {
    /**
   * @param {Options} options Options.
   */ constructor(options){
        /**
     * @private
     * @type {number}
     */ this.opacity_ = options.opacity;
        /**
     * @private
     * @type {boolean}
     */ this.rotateWithView_ = options.rotateWithView;
        /**
     * @private
     * @type {number}
     */ this.rotation_ = options.rotation;
        /**
     * @private
     * @type {number|import("../size.js").Size}
     */ this.scale_ = options.scale;
        /**
     * @private
     * @type {import("../size.js").Size}
     */ this.scaleArray_ = (0, $3db00eb0a4716cab$export$a71a825ff42fb8e1)(options.scale);
        /**
     * @private
     * @type {Array<number>}
     */ this.displacement_ = options.displacement;
        /**
     * @private
     * @type {"declutter"|"obstacle"|"none"|undefined}
     */ this.declutterMode_ = options.declutterMode;
    }
    /**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */ clone() {
        const scale = this.getScale();
        return new $86ef58b83c2a6f52$var$ImageStyle({
            opacity: this.getOpacity(),
            scale: Array.isArray(scale) ? scale.slice() : scale,
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView(),
            displacement: this.getDisplacement().slice(),
            declutterMode: this.getDeclutterMode()
        });
    }
    /**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */ getOpacity() {
        return this.opacity_;
    }
    /**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */ getRotateWithView() {
        return this.rotateWithView_;
    }
    /**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */ getRotation() {
        return this.rotation_;
    }
    /**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */ getScale() {
        return this.scale_;
    }
    /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */ getScaleArray() {
        return this.scaleArray_;
    }
    /**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */ getDisplacement() {
        return this.displacement_;
    }
    /**
   * Get the declutter mode of the shape
   * @return {"declutter"|"obstacle"|"none"|undefined} Shape's declutter mode
   * @api
   */ getDeclutterMode() {
        return this.declutterMode_;
    }
    /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */ getAnchor() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
   */ getImage(pixelRatio) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} Image element.
   */ getHitDetectionImage() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */ getPixelRatio(pixelRatio) {
        return 1;
    }
    /**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */ getImageState() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */ getImageSize() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */ getOrigin() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */ getSize() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Set the displacement.
   *
   * @param {Array<number>} displacement Displacement.
   * @api
   */ setDisplacement(displacement) {
        this.displacement_ = displacement;
    }
    /**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */ setOpacity(opacity) {
        this.opacity_ = opacity;
    }
    /**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */ setRotateWithView(rotateWithView) {
        this.rotateWithView_ = rotateWithView;
    }
    /**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */ setRotation(rotation) {
        this.rotation_ = rotation;
    }
    /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */ setScale(scale) {
        this.scale_ = scale;
        this.scaleArray_ = (0, $3db00eb0a4716cab$export$a71a825ff42fb8e1)(scale);
    }
    /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */ listenImageChange(listener) {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Load not yet loaded URI.
   * @abstract
   */ load() {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */ unlistenImageChange(listener) {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
}
var $86ef58b83c2a6f52$export$2e2bcd8739ae039 = $86ef58b83c2a6f52$var$ImageStyle;


/**
 * @module ol/color
 */ 

/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 * @typedef {Array<number>} Color
 * @api
 */ /**
 * This RegExp matches # followed by 3, 4, 6, or 8 hex digits.
 * @const
 * @type {RegExp}
 * @private
 */ const $d32b89243a698e8b$var$HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;
/**
 * Regular expression for matching potential named color style strings.
 * @const
 * @type {RegExp}
 * @private
 */ const $d32b89243a698e8b$var$NAMED_COLOR_RE_ = /^([a-z]*)$|^hsla?\(.*\)$/i;
function $d32b89243a698e8b$export$590567be997858b6(color) {
    if (typeof color === "string") return color;
    return $d32b89243a698e8b$export$f84e8e69fd4488a5(color);
}
/**
 * Return named color as an rgba string.
 * @param {string} color Named color.
 * @return {string} Rgb string.
 */ function $d32b89243a698e8b$var$fromNamed(color) {
    const el = document.createElement("div");
    el.style.color = color;
    if (el.style.color !== "") {
        document.body.appendChild(el);
        const rgb = getComputedStyle(el).color;
        document.body.removeChild(el);
        return rgb;
    }
    return "";
}
const $d32b89243a698e8b$export$3004f64547af360e = function() {
    // We maintain a small cache of parsed strings.  To provide cheap LRU-like
    // semantics, whenever the cache grows too large we simply delete an
    // arbitrary 25% of the entries.
    /**
   * @const
   * @type {number}
   */ const MAX_CACHE_SIZE = 1024;
    /**
   * @type {Object<string, Color>}
   */ const cache = {};
    /**
   * @type {number}
   */ let cacheSize = 0;
    return(/**
     * @param {string} s String.
     * @return {Color} Color.
     */ function(s) {
        let color;
        if (cache.hasOwnProperty(s)) color = cache[s];
        else {
            if (cacheSize >= MAX_CACHE_SIZE) {
                let i = 0;
                for(const key in cache)if ((i++ & 3) === 0) {
                    delete cache[key];
                    --cacheSize;
                }
            }
            color = $d32b89243a698e8b$var$fromStringInternal_(s);
            cache[s] = color;
            ++cacheSize;
        }
        return color;
    });
}();
function $d32b89243a698e8b$export$75093a47a9fa838d(color) {
    if (Array.isArray(color)) return color;
    return $d32b89243a698e8b$export$3004f64547af360e(color);
}
/**
 * @param {string} s String.
 * @private
 * @return {Color} Color.
 */ function $d32b89243a698e8b$var$fromStringInternal_(s) {
    let r, g, b, a, color;
    if ($d32b89243a698e8b$var$NAMED_COLOR_RE_.exec(s)) s = $d32b89243a698e8b$var$fromNamed(s);
    if ($d32b89243a698e8b$var$HEX_COLOR_RE_.exec(s)) {
        // hex
        const n = s.length - 1; // number of hex digits
        let d; // number of digits per channel
        if (n <= 4) d = 1;
        else d = 2;
        const hasAlpha = n === 4 || n === 8;
        r = parseInt(s.substr(1 + 0 * d, d), 16);
        g = parseInt(s.substr(1 + 1 * d, d), 16);
        b = parseInt(s.substr(1 + 2 * d, d), 16);
        if (hasAlpha) a = parseInt(s.substr(1 + 3 * d, d), 16);
        else a = 255;
        if (d == 1) {
            r = (r << 4) + r;
            g = (g << 4) + g;
            b = (b << 4) + b;
            if (hasAlpha) a = (a << 4) + a;
        }
        color = [
            r,
            g,
            b,
            a / 255
        ];
    } else if (s.startsWith("rgba(")) {
        // rgba()
        color = s.slice(5, -1).split(",").map(Number);
        $d32b89243a698e8b$export$a3295358bff77e(color);
    } else if (s.startsWith("rgb(")) {
        // rgb()
        color = s.slice(4, -1).split(",").map(Number);
        color.push(1);
        $d32b89243a698e8b$export$a3295358bff77e(color);
    } else (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(false, 14); // Invalid color
    return color;
}
function $d32b89243a698e8b$export$a3295358bff77e(color) {
    color[0] = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(color[0] + 0.5 | 0, 0, 255);
    color[1] = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(color[1] + 0.5 | 0, 0, 255);
    color[2] = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(color[2] + 0.5 | 0, 0, 255);
    color[3] = (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(color[3], 0, 1);
    return color;
}
function $d32b89243a698e8b$export$f84e8e69fd4488a5(color) {
    let r = color[0];
    if (r != (r | 0)) r = r + 0.5 | 0;
    let g = color[1];
    if (g != (g | 0)) g = g + 0.5 | 0;
    let b = color[2];
    if (b != (b | 0)) b = b + 0.5 | 0;
    const a = color[3] === undefined ? 1 : Math.round(color[3] * 100) / 100;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}
function $d32b89243a698e8b$export$40dd713d7775a0b1(s) {
    if ($d32b89243a698e8b$var$NAMED_COLOR_RE_.test(s)) s = $d32b89243a698e8b$var$fromNamed(s);
    return $d32b89243a698e8b$var$HEX_COLOR_RE_.test(s) || s.startsWith("rgba(") || s.startsWith("rgb(");
}


/**
 * @module ol/colorlike
 */ 
function $172307d3521121a6$export$dc5b1400ac3a10a8(color) {
    if (Array.isArray(color)) return (0, $d32b89243a698e8b$export$f84e8e69fd4488a5)(color);
    return color;
}



function $1d92219e1eaa7bd2$export$9e05d10eae75c464(width, height, canvasPool, settings) {
    /** @type {HTMLCanvasElement|OffscreenCanvas} */ let canvas;
    if (canvasPool && canvasPool.length) canvas = canvasPool.shift();
    else if (0, $253e11c6a01eb5bc$export$98fcef3dc9973292) canvas = new OffscreenCanvas(width || 300, height || 300);
    else canvas = document.createElement("canvas");
    if (width) canvas.width = width;
    if (height) canvas.height = height;
    //FIXME Allow OffscreenCanvasRenderingContext2D as return type
    return /** @type {CanvasRenderingContext2D} */ canvas.getContext("2d", settings);
}
function $1d92219e1eaa7bd2$export$e918ac6a1026a12a(context) {
    const canvas = context.canvas;
    canvas.width = 1;
    canvas.height = 1;
    context.clearRect(0, 0, 1, 1);
}
function $1d92219e1eaa7bd2$export$e823f88e4111159a(element) {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);
    width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    return width;
}
function $1d92219e1eaa7bd2$export$fc5b8aac72846d1e(element) {
    let height = element.offsetHeight;
    const style = getComputedStyle(element);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
}
function $1d92219e1eaa7bd2$export$5542201de9311ab2(newNode, oldNode) {
    const parent = oldNode.parentNode;
    if (parent) parent.replaceChild(newNode, oldNode);
}
function $1d92219e1eaa7bd2$export$1d0aa160432dfea5(node) {
    return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
function $1d92219e1eaa7bd2$export$1e1c9bf5a4ffe0d1(node) {
    while(node.lastChild)node.removeChild(node.lastChild);
}
function $1d92219e1eaa7bd2$export$caeacfe04f52533a(node, children) {
    const oldChildren = node.childNodes;
    for(let i = 0;; ++i){
        const oldChild = oldChildren[i];
        const newChild = children[i];
        // check if our work is done
        if (!oldChild && !newChild) break;
        // check if children match
        if (oldChild === newChild) continue;
        // check if a new child needs to be added
        if (!oldChild) {
            node.appendChild(newChild);
            continue;
        }
        // check if an old child needs to be removed
        if (!newChild) {
            node.removeChild(oldChild);
            --i;
            continue;
        }
        // reorder
        node.insertBefore(newChild, oldChild);
    }
}


/**
 * @module ol/render/canvas
 */ 



/**
 * @module ol/css
 */ /**
 * @typedef {Object} FontParameters
 * @property {string} style Style.
 * @property {string} variant Variant.
 * @property {string} weight Weight.
 * @property {string} size Size.
 * @property {string} lineHeight LineHeight.
 * @property {string} family Family.
 * @property {Array<string>} families Families.
 */ /**
 * The CSS class for hidden feature.
 *
 * @const
 * @type {string}
 */ const $7309508e6173a6a6$export$981241db82723ce2 = "ol-hidden";
const $7309508e6173a6a6$export$99b49471b0394319 = "ol-selectable";
const $7309508e6173a6a6$export$1afde3d6e16a7b29 = "ol-unselectable";
const $7309508e6173a6a6$export$68eede0dd8c6c1da = "ol-unsupported";
const $7309508e6173a6a6$export$4d4f8be70b656192 = "ol-control";
const $7309508e6173a6a6$export$e16017ac68d14492 = "ol-collapsed";
/**
 * From https://stackoverflow.com/questions/10135697/regex-to-parse-any-css-font
 * @type {RegExp}
 */ const $7309508e6173a6a6$var$fontRegEx = new RegExp([
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    "?\\s*([-,\\\"\\'\\sa-z]+?)\\s*$"
].join(""), "i");
const $7309508e6173a6a6$var$fontRegExMatchIndex = [
    "style",
    "variant",
    "weight",
    "size",
    "lineHeight",
    "family"
];
const $7309508e6173a6a6$export$5abde8a6aec4a131 = function(fontSpec) {
    const match = fontSpec.match($7309508e6173a6a6$var$fontRegEx);
    if (!match) return null;
    const style = /** @type {FontParameters} */ {
        lineHeight: "normal",
        size: "1.2em",
        style: "normal",
        weight: "normal",
        variant: "normal"
    };
    for(let i = 0, ii = $7309508e6173a6a6$var$fontRegExMatchIndex.length; i < ii; ++i){
        const value = match[i + 1];
        if (value !== undefined) style[$7309508e6173a6a6$var$fontRegExMatchIndex[i]] = value;
    }
    style.families = style.family.split(/,\s?/);
    return style;
};


const $ba06fcc662408736$export$3847dfea4f8d4dfa = "10px sans-serif";
const $ba06fcc662408736$export$c495d52ee3fd74b2 = "#000";
const $ba06fcc662408736$export$17bd0c38d6ae694e = "round";
const $ba06fcc662408736$export$e21b4112fdc612fc = [];
const $ba06fcc662408736$export$e06efc2409049f76 = 0;
const $ba06fcc662408736$export$365eb9648cf19bd0 = "round";
const $ba06fcc662408736$export$80c1c01844597b7b = 10;
const $ba06fcc662408736$export$1eb2eaecacf2031e = "#000";
const $ba06fcc662408736$export$94d53b95641b5766 = "center";
const $ba06fcc662408736$export$cf2279a1bff62eb = "middle";
const $ba06fcc662408736$export$40a9eeef55665a40 = [
    0,
    0,
    0,
    0
];
const $ba06fcc662408736$export$79661f132c62010e = 1;
const $ba06fcc662408736$export$1d36981fcadac93b = new (0, $d6cd7f1b627d5e92$export$2e2bcd8739ae039)();
/**
 * @type {CanvasRenderingContext2D}
 */ let $ba06fcc662408736$var$measureContext = null;
/**
 * @type {string}
 */ let $ba06fcc662408736$var$measureFont;
const $ba06fcc662408736$export$7fdcec604f0b1fa7 = {};
const $ba06fcc662408736$export$a534074a28fa87ff = function() {
    const retries = 100;
    const size = "32px ";
    const referenceFonts = [
        "monospace",
        "serif"
    ];
    const len = referenceFonts.length;
    const text = "wmytzilWMYTZIL@#/&?$%10";
    let interval, referenceWidth;
    /**
   * @param {string} fontStyle Css font-style
   * @param {string} fontWeight Css font-weight
   * @param {*} fontFamily Css font-family
   * @return {boolean} Font with style and weight is available
   */ function isAvailable(fontStyle, fontWeight, fontFamily) {
        let available = true;
        for(let i = 0; i < len; ++i){
            const referenceFont = referenceFonts[i];
            referenceWidth = $ba06fcc662408736$export$4ea92329b673abd1(fontStyle + " " + fontWeight + " " + size + referenceFont, text);
            if (fontFamily != referenceFont) {
                const width = $ba06fcc662408736$export$4ea92329b673abd1(fontStyle + " " + fontWeight + " " + size + fontFamily + "," + referenceFont, text);
                // If width and referenceWidth are the same, then the fallback was used
                // instead of the font we wanted, so the font is not available.
                available = available && width != referenceWidth;
            }
        }
        if (available) return true;
        return false;
    }
    function check() {
        let done = true;
        const fonts = $ba06fcc662408736$export$1d36981fcadac93b.getKeys();
        for(let i = 0, ii = fonts.length; i < ii; ++i){
            const font = fonts[i];
            if ($ba06fcc662408736$export$1d36981fcadac93b.get(font) < retries) {
                if (isAvailable.apply(this, font.split("\n"))) {
                    (0, $e2dfef87a88758ed$export$42ffd38884aecdac)($ba06fcc662408736$export$7fdcec604f0b1fa7);
                    // Make sure that loaded fonts are picked up by Safari
                    $ba06fcc662408736$var$measureContext = null;
                    $ba06fcc662408736$var$measureFont = undefined;
                    $ba06fcc662408736$export$1d36981fcadac93b.set(font, retries);
                } else {
                    $ba06fcc662408736$export$1d36981fcadac93b.set(font, $ba06fcc662408736$export$1d36981fcadac93b.get(font) + 1, true);
                    done = false;
                }
            }
        }
        if (done) {
            clearInterval(interval);
            interval = undefined;
        }
    }
    return function(fontSpec) {
        const font = (0, $7309508e6173a6a6$export$5abde8a6aec4a131)(fontSpec);
        if (!font) return;
        const families = font.families;
        for(let i = 0, ii = families.length; i < ii; ++i){
            const family = families[i];
            const key = font.style + "\n" + font.weight + "\n" + family;
            if ($ba06fcc662408736$export$1d36981fcadac93b.get(key) === undefined) {
                $ba06fcc662408736$export$1d36981fcadac93b.set(key, retries, true);
                if (!isAvailable(font.style, font.weight, family)) {
                    $ba06fcc662408736$export$1d36981fcadac93b.set(key, 0, true);
                    if (interval === undefined) interval = setInterval(check, 32);
                }
            }
        }
    };
}();
const $ba06fcc662408736$export$4feaf6852ff92513 = function() {
    /**
   * @type {HTMLDivElement}
   */ let measureElement;
    return function(fontSpec) {
        let height = $ba06fcc662408736$export$7fdcec604f0b1fa7[fontSpec];
        if (height == undefined) {
            if (0, $253e11c6a01eb5bc$export$98fcef3dc9973292) {
                const font = (0, $7309508e6173a6a6$export$5abde8a6aec4a131)(fontSpec);
                const metrics = $ba06fcc662408736$var$measureText(fontSpec, "Žg");
                const lineHeight = isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight);
                height = lineHeight * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
            } else {
                if (!measureElement) {
                    measureElement = document.createElement("div");
                    measureElement.innerHTML = "M";
                    measureElement.style.minHeight = "0";
                    measureElement.style.maxHeight = "none";
                    measureElement.style.height = "auto";
                    measureElement.style.padding = "0";
                    measureElement.style.border = "none";
                    measureElement.style.position = "absolute";
                    measureElement.style.display = "block";
                    measureElement.style.left = "-99999px";
                }
                measureElement.style.font = fontSpec;
                document.body.appendChild(measureElement);
                height = measureElement.offsetHeight;
                document.body.removeChild(measureElement);
            }
            $ba06fcc662408736$export$7fdcec604f0b1fa7[fontSpec] = height;
        }
        return height;
    };
}();
/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {TextMetrics} Text metrics.
 */ function $ba06fcc662408736$var$measureText(font, text) {
    if (!$ba06fcc662408736$var$measureContext) $ba06fcc662408736$var$measureContext = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(1, 1);
    if (font != $ba06fcc662408736$var$measureFont) {
        $ba06fcc662408736$var$measureContext.font = font;
        $ba06fcc662408736$var$measureFont = $ba06fcc662408736$var$measureContext.font;
    }
    return $ba06fcc662408736$var$measureContext.measureText(text);
}
function $ba06fcc662408736$export$4ea92329b673abd1(font, text) {
    return $ba06fcc662408736$var$measureText(font, text).width;
}
function $ba06fcc662408736$export$915c7ba51467308f(font, text, cache) {
    if (text in cache) return cache[text];
    const width = text.split("\n").reduce((prev, curr)=>Math.max(prev, $ba06fcc662408736$export$4ea92329b673abd1(font, curr)), 0);
    cache[text] = width;
    return width;
}
function $ba06fcc662408736$export$7d7c13020df1e791(baseStyle, chunks) {
    const widths = [];
    const heights = [];
    const lineWidths = [];
    let width = 0;
    let lineWidth = 0;
    let height = 0;
    let lineHeight = 0;
    for(let i = 0, ii = chunks.length; i <= ii; i += 2){
        const text = chunks[i];
        if (text === "\n" || i === ii) {
            width = Math.max(width, lineWidth);
            lineWidths.push(lineWidth);
            lineWidth = 0;
            height += lineHeight;
            continue;
        }
        const font = chunks[i + 1] || baseStyle.font;
        const currentWidth = $ba06fcc662408736$export$4ea92329b673abd1(font, text);
        widths.push(currentWidth);
        lineWidth += currentWidth;
        const currentHeight = $ba06fcc662408736$export$4feaf6852ff92513(font);
        heights.push(currentHeight);
        lineHeight = Math.max(lineHeight, currentHeight);
    }
    return {
        width: width,
        height: height,
        widths: widths,
        heights: heights,
        lineWidths: lineWidths
    };
}
function $ba06fcc662408736$export$8ac4d72be78047e6(context, rotation, offsetX, offsetY) {
    if (rotation !== 0) {
        context.translate(offsetX, offsetY);
        context.rotate(rotation);
        context.translate(-offsetX, -offsetY);
    }
}
function $ba06fcc662408736$export$3cb6f3a6e49cc0ee(context, transform, opacity, labelOrImage, originX, originY, w, h, x, y, scale) {
    context.save();
    if (opacity !== 1) context.globalAlpha *= opacity;
    if (transform) context.setTransform.apply(context, transform);
    if (/** @type {*} */ labelOrImage.contextInstructions) {
        // label
        context.translate(x, y);
        context.scale(scale[0], scale[1]);
        $ba06fcc662408736$var$executeLabelInstructions(/** @type {Label} */ labelOrImage, context);
    } else if (scale[0] < 0 || scale[1] < 0) {
        // flipped image
        context.translate(x, y);
        context.scale(scale[0], scale[1]);
        context.drawImage(/** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */ labelOrImage, originX, originY, w, h, 0, 0, w, h);
    } else // if image not flipped translate and scale can be avoided
    context.drawImage(/** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */ labelOrImage, originX, originY, w, h, x, y, w * scale[0], h * scale[1]);
    context.restore();
}
/**
 * @param {Label} label Label.
 * @param {CanvasRenderingContext2D} context Context.
 */ function $ba06fcc662408736$var$executeLabelInstructions(label, context) {
    const contextInstructions = label.contextInstructions;
    for(let i = 0, ii = contextInstructions.length; i < ii; i += 2)if (Array.isArray(contextInstructions[i + 1])) context[contextInstructions[i]].apply(context, contextInstructions[i + 1]);
    else context[contextInstructions[i]] = contextInstructions[i + 1];
}


/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] First radius of a star. Ignored if radius is set.
 * @property {number} [radius2] Second radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's points facing up.
 * @property {Array<number>} [displacement=[0, 0]] Displacement of the shape in pixels.
 * Positive values will shift the shape right and up.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 * @property {number|import("../size.js").Size} [scale=1] Scale. Unless two dimensional scaling is required a better
 * result may be obtained with appropriate settings for `radius`, `radius1` and `radius2`.
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode.
 */ /**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
 * @property {number} strokeWidth StrokeWidth.
 * @property {number} size Size.
 * @property {Array<number>|null} lineDash LineDash.
 * @property {number} lineDashOffset LineDashOffset.
 * @property {CanvasLineJoin} lineJoin LineJoin.
 * @property {number} miterLimit MiterLimit.
 */ /**
 * @classdesc
 * Set regular shape style for vector features. The resulting shape will be
 * a regular polygon when `radius` is provided, or a star when `radius1` and
 * `radius2` are provided.
 * @api
 */ class $839f5b0b6dbb6b4a$var$RegularShape extends (0, $86ef58b83c2a6f52$export$2e2bcd8739ae039) {
    /**
   * @param {Options} options Options.
   */ constructor(options){
        /**
     * @type {boolean}
     */ const rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
        super({
            opacity: 1,
            rotateWithView: rotateWithView,
            rotation: options.rotation !== undefined ? options.rotation : 0,
            scale: options.scale !== undefined ? options.scale : 1,
            displacement: options.displacement !== undefined ? options.displacement : [
                0,
                0
            ],
            declutterMode: options.declutterMode
        });
        /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */ this.canvas_ = undefined;
        /**
     * @private
     * @type {HTMLCanvasElement}
     */ this.hitDetectionCanvas_ = null;
        /**
     * @private
     * @type {import("./Fill.js").default}
     */ this.fill_ = options.fill !== undefined ? options.fill : null;
        /**
     * @private
     * @type {Array<number>}
     */ this.origin_ = [
            0,
            0
        ];
        /**
     * @private
     * @type {number}
     */ this.points_ = options.points;
        /**
     * @protected
     * @type {number}
     */ this.radius_ = options.radius !== undefined ? options.radius : options.radius1;
        /**
     * @private
     * @type {number|undefined}
     */ this.radius2_ = options.radius2;
        /**
     * @private
     * @type {number}
     */ this.angle_ = options.angle !== undefined ? options.angle : 0;
        /**
     * @private
     * @type {import("./Stroke.js").default}
     */ this.stroke_ = options.stroke !== undefined ? options.stroke : null;
        /**
     * @private
     * @type {import("../size.js").Size}
     */ this.size_ = null;
        /**
     * @private
     * @type {RenderOptions}
     */ this.renderOptions_ = null;
        this.render();
    }
    /**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   */ clone() {
        const scale = this.getScale();
        const style = new $839f5b0b6dbb6b4a$var$RegularShape({
            fill: this.getFill() ? this.getFill().clone() : undefined,
            points: this.getPoints(),
            radius: this.getRadius(),
            radius2: this.getRadius2(),
            angle: this.getAngle(),
            stroke: this.getStroke() ? this.getStroke().clone() : undefined,
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView(),
            scale: Array.isArray(scale) ? scale.slice() : scale,
            displacement: this.getDisplacement().slice(),
            declutterMode: this.getDeclutterMode()
        });
        style.setOpacity(this.getOpacity());
        return style;
    }
    /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */ getAnchor() {
        const size = this.size_;
        if (!size) return null;
        const displacement = this.getDisplacement();
        const scale = this.getScaleArray();
        // anchor is scaled by renderer but displacement should not be scaled
        // so divide by scale here
        return [
            size[0] / 2 - displacement[0] / scale[0],
            size[1] / 2 + displacement[1] / scale[1]
        ];
    }
    /**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */ getAngle() {
        return this.angle_;
    }
    /**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */ getFill() {
        return this.fill_;
    }
    /**
   * Set the fill style.
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */ setFill(fill) {
        this.fill_ = fill;
        this.render();
    }
    /**
   * @return {HTMLCanvasElement} Image element.
   */ getHitDetectionImage() {
        if (!this.hitDetectionCanvas_) this.createHitDetectionCanvas_(this.renderOptions_);
        return this.hitDetectionCanvas_;
    }
    /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   */ getImage(pixelRatio) {
        let image = this.canvas_[pixelRatio];
        if (!image) {
            const renderOptions = this.renderOptions_;
            const context = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(renderOptions.size * pixelRatio, renderOptions.size * pixelRatio);
            this.draw_(renderOptions, context, pixelRatio);
            image = context.canvas;
            this.canvas_[pixelRatio] = image;
        }
        return image;
    }
    /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */ getPixelRatio(pixelRatio) {
        return pixelRatio;
    }
    /**
   * @return {import("../size.js").Size} Image size.
   */ getImageSize() {
        return this.size_;
    }
    /**
   * @return {import("../ImageState.js").default} Image state.
   */ getImageState() {
        return (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED;
    }
    /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */ getOrigin() {
        return this.origin_;
    }
    /**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */ getPoints() {
        return this.points_;
    }
    /**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */ getRadius() {
        return this.radius_;
    }
    /**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */ getRadius2() {
        return this.radius2_;
    }
    /**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   */ getSize() {
        return this.size_;
    }
    /**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */ getStroke() {
        return this.stroke_;
    }
    /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */ setStroke(stroke) {
        this.stroke_ = stroke;
        this.render();
    }
    /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */ listenImageChange(listener) {}
    /**
   * Load not yet loaded URI.
   */ load() {}
    /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */ unlistenImageChange(listener) {}
    /**
   * Calculate additional canvas size needed for the miter.
   * @param {string} lineJoin Line join
   * @param {number} strokeWidth Stroke width
   * @param {number} miterLimit Miter limit
   * @return {number} Additional canvas size needed
   * @private
   */ calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit) {
        if (strokeWidth === 0 || this.points_ === Infinity || lineJoin !== "bevel" && lineJoin !== "miter") return strokeWidth;
        // m  | ^
        // i  | |\                  .
        // t >|  #\
        // e  | |\ \              .
        // r      \s\
        //      |  \t\          .                 .
        //          \r\                      .   .
        //      |    \o\      .          .  . . .
        //          e \k\            .  .    . .
        //      |      \e\  .    .  .       . .
        //       d      \ \  .  .          . .
        //      | _ _a_ _\#  .            . .
        //   r1          / `             . .
        //      |                       . .
        //       b     /               . .
        //      |                     . .
        //           / r2            . .
        //      |                        .   .
        //         /                           .   .
        //      |α                                   .   .
        //       /                                         .   .
        //      ° center
        let r1 = this.radius_;
        let r2 = this.radius2_ === undefined ? r1 : this.radius2_;
        if (r1 < r2) {
            const tmp = r1;
            r1 = r2;
            r2 = tmp;
        }
        const points = this.radius2_ === undefined ? this.points_ : this.points_ * 2;
        const alpha = 2 * Math.PI / points;
        const a = r2 * Math.sin(alpha);
        const b = Math.sqrt(r2 * r2 - a * a);
        const d = r1 - b;
        const e = Math.sqrt(a * a + d * d);
        const miterRatio = e / a;
        if (lineJoin === "miter" && miterRatio <= miterLimit) return miterRatio * strokeWidth;
        // Calculate the distance from center to the stroke corner where
        // it was cut short because of the miter limit.
        //              l
        //        ----+---- <= distance from center to here is maxr
        //       /####|k ##\
        //      /#####^#####\
        //     /#### /+\# s #\
        //    /### h/+++\# t #\
        //   /### t/+++++\# r #\
        //  /### a/+++++++\# o #\
        // /### p/++ fill +\# k #\
        ///#### /+++++^+++++\# e #\
        //#####/+++++/+\+++++\#####\
        const k = strokeWidth / 2 / miterRatio;
        const l = strokeWidth / 2 * (d / e);
        const maxr = Math.sqrt((r1 + k) * (r1 + k) + l * l);
        const bevelAdd = maxr - r1;
        if (this.radius2_ === undefined || lineJoin === "bevel") return bevelAdd * 2;
        // If outer miter is over the miter limit the inner miter may reach through the
        // center and be longer than the bevel, same calculation as above but swap r1 / r2.
        const aa = r1 * Math.sin(alpha);
        const bb = Math.sqrt(r1 * r1 - aa * aa);
        const dd = r2 - bb;
        const ee = Math.sqrt(aa * aa + dd * dd);
        const innerMiterRatio = ee / aa;
        if (innerMiterRatio <= miterLimit) {
            const innerLength = innerMiterRatio * strokeWidth / 2 - r2 - r1;
            return 2 * Math.max(bevelAdd, innerLength);
        }
        return bevelAdd * 2;
    }
    /**
   * @return {RenderOptions}  The render options
   * @protected
   */ createRenderOptions() {
        let lineJoin = (0, $ba06fcc662408736$export$365eb9648cf19bd0);
        let miterLimit = 0;
        let lineDash = null;
        let lineDashOffset = 0;
        let strokeStyle;
        let strokeWidth = 0;
        if (this.stroke_) {
            strokeStyle = this.stroke_.getColor();
            if (strokeStyle === null) strokeStyle = (0, $ba06fcc662408736$export$1eb2eaecacf2031e);
            strokeStyle = (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(strokeStyle);
            strokeWidth = this.stroke_.getWidth();
            if (strokeWidth === undefined) strokeWidth = (0, $ba06fcc662408736$export$79661f132c62010e);
            lineDash = this.stroke_.getLineDash();
            lineDashOffset = this.stroke_.getLineDashOffset();
            lineJoin = this.stroke_.getLineJoin();
            if (lineJoin === undefined) lineJoin = (0, $ba06fcc662408736$export$365eb9648cf19bd0);
            miterLimit = this.stroke_.getMiterLimit();
            if (miterLimit === undefined) miterLimit = (0, $ba06fcc662408736$export$80c1c01844597b7b);
        }
        const add = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
        const maxRadius = Math.max(this.radius_, this.radius2_ || 0);
        const size = Math.ceil(2 * maxRadius + add);
        return {
            strokeStyle: strokeStyle,
            strokeWidth: strokeWidth,
            size: size,
            lineDash: lineDash,
            lineDashOffset: lineDashOffset,
            lineJoin: lineJoin,
            miterLimit: miterLimit
        };
    }
    /**
   * @protected
   */ render() {
        this.renderOptions_ = this.createRenderOptions();
        const size = this.renderOptions_.size;
        this.canvas_ = {};
        this.size_ = [
            size,
            size
        ];
    }
    /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} pixelRatio The pixel ratio.
   */ draw_(renderOptions, context, pixelRatio) {
        context.scale(pixelRatio, pixelRatio);
        // set origin to canvas center
        context.translate(renderOptions.size / 2, renderOptions.size / 2);
        this.createPath_(context);
        if (this.fill_) {
            let color = this.fill_.getColor();
            if (color === null) color = (0, $ba06fcc662408736$export$c495d52ee3fd74b2);
            context.fillStyle = (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(color);
            context.fill();
        }
        if (this.stroke_) {
            context.strokeStyle = renderOptions.strokeStyle;
            context.lineWidth = renderOptions.strokeWidth;
            if (renderOptions.lineDash) {
                context.setLineDash(renderOptions.lineDash);
                context.lineDashOffset = renderOptions.lineDashOffset;
            }
            context.lineJoin = renderOptions.lineJoin;
            context.miterLimit = renderOptions.miterLimit;
            context.stroke();
        }
    }
    /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   */ createHitDetectionCanvas_(renderOptions) {
        if (this.fill_) {
            let color = this.fill_.getColor();
            // determine if fill is transparent (or pattern or gradient)
            let opacity = 0;
            if (typeof color === "string") color = (0, $d32b89243a698e8b$export$75093a47a9fa838d)(color);
            if (color === null) opacity = 1;
            else if (Array.isArray(color)) opacity = color.length === 4 ? color[3] : 1;
            if (opacity === 0) {
                // if a transparent fill style is set, create an extra hit-detection image
                // with a default fill style
                const context = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(renderOptions.size, renderOptions.size);
                this.hitDetectionCanvas_ = context.canvas;
                this.drawHitDetectionCanvas_(renderOptions, context);
            }
        }
        if (!this.hitDetectionCanvas_) this.hitDetectionCanvas_ = this.getImage(1);
    }
    /**
   * @private
   * @param {CanvasRenderingContext2D} context The context to draw in.
   */ createPath_(context) {
        let points = this.points_;
        const radius = this.radius_;
        if (points === Infinity) context.arc(0, 0, radius, 0, 2 * Math.PI);
        else {
            const radius2 = this.radius2_ === undefined ? radius : this.radius2_;
            if (this.radius2_ !== undefined) points *= 2;
            const startAngle = this.angle_ - Math.PI / 2;
            const step = 2 * Math.PI / points;
            for(let i = 0; i < points; i++){
                const angle0 = startAngle + i * step;
                const radiusC = i % 2 === 0 ? radius : radius2;
                context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
            }
            context.closePath();
        }
    }
    /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   */ drawHitDetectionCanvas_(renderOptions, context) {
        // set origin to canvas center
        context.translate(renderOptions.size / 2, renderOptions.size / 2);
        this.createPath_(context);
        context.fillStyle = (0, $ba06fcc662408736$export$c495d52ee3fd74b2);
        context.fill();
        if (this.stroke_) {
            context.strokeStyle = renderOptions.strokeStyle;
            context.lineWidth = renderOptions.strokeWidth;
            if (renderOptions.lineDash) {
                context.setLineDash(renderOptions.lineDash);
                context.lineDashOffset = renderOptions.lineDashOffset;
            }
            context.lineJoin = renderOptions.lineJoin;
            context.miterLimit = renderOptions.miterLimit;
            context.stroke();
        }
    }
}
var $839f5b0b6dbb6b4a$export$2e2bcd8739ae039 = $839f5b0b6dbb6b4a$var$RegularShape;


/**
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {Array<number>} [displacement=[0,0]] displacement
 * @property {number|import("../size.js").Size} [scale=1] Scale. A two dimensional scale will produce an ellipse.
 * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `radius`.
 * @property {number} [rotation=0] Rotation in radians
 * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view
 * (meaningful only when used in conjunction with a two dimensional scale).
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode
 */ /**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */ class $4702fef2bdf52596$var$CircleStyle extends (0, $839f5b0b6dbb6b4a$export$2e2bcd8739ae039) {
    /**
   * @param {Options} [options] Options.
   */ constructor(options){
        options = options ? options : {
            radius: 5
        };
        super({
            points: Infinity,
            fill: options.fill,
            radius: options.radius,
            stroke: options.stroke,
            scale: options.scale !== undefined ? options.scale : 1,
            rotation: options.rotation !== undefined ? options.rotation : 0,
            rotateWithView: options.rotateWithView !== undefined ? options.rotateWithView : false,
            displacement: options.displacement !== undefined ? options.displacement : [
                0,
                0
            ],
            declutterMode: options.declutterMode
        });
    }
    /**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   */ clone() {
        const scale = this.getScale();
        const style = new $4702fef2bdf52596$var$CircleStyle({
            fill: this.getFill() ? this.getFill().clone() : undefined,
            stroke: this.getStroke() ? this.getStroke().clone() : undefined,
            radius: this.getRadius(),
            scale: Array.isArray(scale) ? scale.slice() : scale,
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView(),
            displacement: this.getDisplacement().slice(),
            declutterMode: this.getDeclutterMode()
        });
        style.setOpacity(this.getOpacity());
        return style;
    }
    /**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */ setRadius(radius) {
        this.radius_ = radius;
        this.render();
    }
}
var $4702fef2bdf52596$export$2e2bcd8739ae039 = $4702fef2bdf52596$var$CircleStyle;


/**
 * @module ol/style/Fill
 */ /**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike|null} [color=null] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 */ /**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */ class $1646510b52ef7eda$var$Fill {
    /**
   * @param {Options} [options] Options.
   */ constructor(options){
        options = options || {};
        /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike|null}
     */ this.color_ = options.color !== undefined ? options.color : null;
    }
    /**
   * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */ clone() {
        const color = this.getColor();
        return new $1646510b52ef7eda$var$Fill({
            color: Array.isArray(color) ? color.slice() : color || undefined
        });
    }
    /**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike|null} Color.
   * @api
   */ getColor() {
        return this.color_;
    }
    /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike|null} color Color.
   * @api
   */ setColor(color) {
        this.color_ = color;
    }
}
var $1646510b52ef7eda$export$2e2bcd8739ae039 = $1646510b52ef7eda$var$Fill;


/**
 * @module ol/style/Stroke
 */ /**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 * @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [lineDash] Line dash pattern. Default is `null` (no dash).
 * @property {number} [lineDashOffset=0] Line dash offset.
 * @property {number} [miterLimit=10] Miter limit.
 * @property {number} [width] Width.
 */ /**
 * @classdesc
 * Set stroke style for vector features.
 * Note that the defaults given are the Canvas defaults, which will be used if
 * option is not defined. The `get` functions return whatever was entered in
 * the options; they will not return the default.
 * @api
 */ class $5bb5a6da769d8762$var$Stroke {
    /**
   * @param {Options} [options] Options.
   */ constructor(options){
        options = options || {};
        /**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
     */ this.color_ = options.color !== undefined ? options.color : null;
        /**
     * @private
     * @type {CanvasLineCap|undefined}
     */ this.lineCap_ = options.lineCap;
        /**
     * @private
     * @type {Array<number>|null}
     */ this.lineDash_ = options.lineDash !== undefined ? options.lineDash : null;
        /**
     * @private
     * @type {number|undefined}
     */ this.lineDashOffset_ = options.lineDashOffset;
        /**
     * @private
     * @type {CanvasLineJoin|undefined}
     */ this.lineJoin_ = options.lineJoin;
        /**
     * @private
     * @type {number|undefined}
     */ this.miterLimit_ = options.miterLimit;
        /**
     * @private
     * @type {number|undefined}
     */ this.width_ = options.width;
    }
    /**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */ clone() {
        const color = this.getColor();
        return new $5bb5a6da769d8762$var$Stroke({
            color: Array.isArray(color) ? color.slice() : color || undefined,
            lineCap: this.getLineCap(),
            lineDash: this.getLineDash() ? this.getLineDash().slice() : undefined,
            lineDashOffset: this.getLineDashOffset(),
            lineJoin: this.getLineJoin(),
            miterLimit: this.getMiterLimit(),
            width: this.getWidth()
        });
    }
    /**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */ getColor() {
        return this.color_;
    }
    /**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */ getLineCap() {
        return this.lineCap_;
    }
    /**
   * Get the line dash style for the stroke.
   * @return {Array<number>|null} Line dash.
   * @api
   */ getLineDash() {
        return this.lineDash_;
    }
    /**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */ getLineDashOffset() {
        return this.lineDashOffset_;
    }
    /**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */ getLineJoin() {
        return this.lineJoin_;
    }
    /**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */ getMiterLimit() {
        return this.miterLimit_;
    }
    /**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */ getWidth() {
        return this.width_;
    }
    /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */ setColor(color) {
        this.color_ = color;
    }
    /**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */ setLineCap(lineCap) {
        this.lineCap_ = lineCap;
    }
    /**
   * Set the line dash.
   *
   * @param {Array<number>|null} lineDash Line dash.
   * @api
   */ setLineDash(lineDash) {
        this.lineDash_ = lineDash;
    }
    /**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */ setLineDashOffset(lineDashOffset) {
        this.lineDashOffset_ = lineDashOffset;
    }
    /**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */ setLineJoin(lineJoin) {
        this.lineJoin_ = lineJoin;
    }
    /**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */ setMiterLimit(miterLimit) {
        this.miterLimit_ = miterLimit;
    }
    /**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */ setWidth(width) {
        this.width_ = width;
    }
}
var $5bb5a6da769d8762$export$2e2bcd8739ae039 = $5bb5a6da769d8762$var$Stroke;



/**
 * A function that takes an {@link module:ol/Feature~Feature} and a `{number}`
 * representing the view's resolution. The function should return a
 * {@link module:ol/style/Style~Style} or an array of them. This way e.g. a
 * vector layer can be styled. If the function returns `undefined`, the
 * feature will not be rendered.
 *
 * @typedef {function(import("../Feature.js").FeatureLike, number):(Style|Array<Style>|void)} StyleFunction
 */ /**
 * A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
 * @typedef {Style|Array<Style>|StyleFunction} StyleLike
 */ /**
 * A function that takes an {@link module:ol/Feature~Feature} as argument and returns an
 * {@link module:ol/geom/Geometry~Geometry} that will be rendered and styled for the feature.
 *
 * @typedef {function(import("../Feature.js").FeatureLike):
 *     (import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined)} GeometryFunction
 */ /**
 * Custom renderer function. Takes two arguments:
 *
 * 1. The pixel coordinates of the geometry in GeoJSON notation.
 * 2. The {@link module:ol/render~State} of the layer renderer.
 *
 * @typedef {function((import("../coordinate.js").Coordinate|Array<import("../coordinate.js").Coordinate>|Array<Array<import("../coordinate.js").Coordinate>>),import("../render.js").State): void} RenderFunction
 */ /**
 * @typedef {Object} Options
 * @property {string|import("../geom/Geometry.js").default|GeometryFunction} [geometry] Feature property or geometry
 * or function returning a geometry to render for this style.
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {import("./Image.js").default} [image] Image style.
 * @property {RenderFunction} [renderer] Custom renderer. When configured, `fill`, `stroke` and `image` will be
 * ignored, and the provided function will be called with each render frame for each geometry.
 * @property {RenderFunction} [hitDetectionRenderer] Custom renderer for hit detection. If provided will be used
 * in hit detection rendering.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Text.js").default} [text] Text style.
 * @property {number} [zIndex] Z index.
 */ /**
 * @classdesc
 * Container for vector feature rendering styles. Any changes made to the style
 * or its children through `set*()` methods will not take effect until the
 * feature or layer that uses the style is re-rendered.
 *
 * ## Feature styles
 *
 * If no style is defined, the following default style is used:
 * ```js
 *  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
 *
 *  const fill = new Fill({
 *    color: 'rgba(255,255,255,0.4)',
 *  });
 *  const stroke = new Stroke({
 *    color: '#3399CC',
 *    width: 1.25,
 *  });
 *  const styles = [
 *    new Style({
 *      image: new Circle({
 *        fill: fill,
 *        stroke: stroke,
 *        radius: 5,
 *      }),
 *      fill: fill,
 *      stroke: stroke,
 *    }),
 *  ];
 * ```
 *
 * A separate editing style has the following defaults:
 * ```js
 *  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
 *
 *  const styles = {};
 *  const white = [255, 255, 255, 1];
 *  const blue = [0, 153, 255, 1];
 *  const width = 3;
 *  styles['Polygon'] = [
 *    new Style({
 *      fill: new Fill({
 *        color: [255, 255, 255, 0.5],
 *      }),
 *    }),
 *  ];
 *  styles['MultiPolygon'] =
 *      styles['Polygon'];
 *  styles['LineString'] = [
 *    new Style({
 *      stroke: new Stroke({
 *        color: white,
 *        width: width + 2,
 *      }),
 *    }),
 *    new Style({
 *      stroke: new Stroke({
 *        color: blue,
 *        width: width,
 *      }),
 *    }),
 *  ];
 *  styles['MultiLineString'] = styles['LineString'];
 *
 *  styles['Circle'] = styles['Polygon'].concat(
 *    styles['LineString']
 *  );
 *
 *  styles['Point'] = [
 *    new Style({
 *      image: new Circle({
 *        radius: width * 2,
 *        fill: new Fill({
 *          color: blue,
 *        }),
 *        stroke: new Stroke({
 *          color: white,
 *          width: width / 2,
 *        }),
 *      }),
 *      zIndex: Infinity,
 *    }),
 *  ];
 *  styles['MultiPoint'] =
 *      styles['Point'];
 *  styles['GeometryCollection'] =
 *      styles['Polygon'].concat(
 *          styles['LineString'],
 *          styles['Point']
 *      );
 * ```
 *
 * @api
 */ class $0e8e066c6965c811$var$Style {
    /**
   * @param {Options} [options] Style options.
   */ constructor(options){
        options = options || {};
        /**
     * @private
     * @type {string|import("../geom/Geometry.js").default|GeometryFunction}
     */ this.geometry_ = null;
        /**
     * @private
     * @type {!GeometryFunction}
     */ this.geometryFunction_ = $0e8e066c6965c811$var$defaultGeometryFunction;
        if (options.geometry !== undefined) this.setGeometry(options.geometry);
        /**
     * @private
     * @type {import("./Fill.js").default}
     */ this.fill_ = options.fill !== undefined ? options.fill : null;
        /**
     * @private
     * @type {import("./Image.js").default}
     */ this.image_ = options.image !== undefined ? options.image : null;
        /**
     * @private
     * @type {RenderFunction|null}
     */ this.renderer_ = options.renderer !== undefined ? options.renderer : null;
        /**
     * @private
     * @type {RenderFunction|null}
     */ this.hitDetectionRenderer_ = options.hitDetectionRenderer !== undefined ? options.hitDetectionRenderer : null;
        /**
     * @private
     * @type {import("./Stroke.js").default}
     */ this.stroke_ = options.stroke !== undefined ? options.stroke : null;
        /**
     * @private
     * @type {import("./Text.js").default}
     */ this.text_ = options.text !== undefined ? options.text : null;
        /**
     * @private
     * @type {number|undefined}
     */ this.zIndex_ = options.zIndex;
    }
    /**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */ clone() {
        let geometry = this.getGeometry();
        if (geometry && typeof geometry === "object") geometry = /** @type {import("../geom/Geometry.js").default} */ geometry.clone();
        return new $0e8e066c6965c811$var$Style({
            geometry: geometry,
            fill: this.getFill() ? this.getFill().clone() : undefined,
            image: this.getImage() ? this.getImage().clone() : undefined,
            renderer: this.getRenderer(),
            stroke: this.getStroke() ? this.getStroke().clone() : undefined,
            text: this.getText() ? this.getText().clone() : undefined,
            zIndex: this.getZIndex()
        });
    }
    /**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */ getRenderer() {
        return this.renderer_;
    }
    /**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */ setRenderer(renderer) {
        this.renderer_ = renderer;
    }
    /**
   * Sets a custom renderer function for this style used
   * in hit detection.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */ setHitDetectionRenderer(renderer) {
        this.hitDetectionRenderer_ = renderer;
    }
    /**
   * Get the custom renderer function that was configured with
   * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */ getHitDetectionRenderer() {
        return this.hitDetectionRenderer_;
    }
    /**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */ getGeometry() {
        return this.geometry_;
    }
    /**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */ getGeometryFunction() {
        return this.geometryFunction_;
    }
    /**
   * Get the fill style.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */ getFill() {
        return this.fill_;
    }
    /**
   * Set the fill style.
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */ setFill(fill) {
        this.fill_ = fill;
    }
    /**
   * Get the image style.
   * @return {import("./Image.js").default} Image style.
   * @api
   */ getImage() {
        return this.image_;
    }
    /**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */ setImage(image) {
        this.image_ = image;
    }
    /**
   * Get the stroke style.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */ getStroke() {
        return this.stroke_;
    }
    /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */ setStroke(stroke) {
        this.stroke_ = stroke;
    }
    /**
   * Get the text style.
   * @return {import("./Text.js").default} Text style.
   * @api
   */ getText() {
        return this.text_;
    }
    /**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */ setText(text) {
        this.text_ = text;
    }
    /**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */ getZIndex() {
        return this.zIndex_;
    }
    /**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */ setGeometry(geometry) {
        if (typeof geometry === "function") this.geometryFunction_ = geometry;
        else if (typeof geometry === "string") this.geometryFunction_ = function(feature) {
            return /** @type {import("../geom/Geometry.js").default} */ feature.get(geometry);
        };
        else if (!geometry) this.geometryFunction_ = $0e8e066c6965c811$var$defaultGeometryFunction;
        else if (geometry !== undefined) this.geometryFunction_ = function() {
            return /** @type {import("../geom/Geometry.js").default} */ geometry;
        };
        this.geometry_ = geometry;
    }
    /**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */ setZIndex(zIndex) {
        this.zIndex_ = zIndex;
    }
}
function $0e8e066c6965c811$export$c314ea3f6b164147(obj) {
    let styleFunction;
    if (typeof obj === "function") styleFunction = obj;
    else {
        /**
     * @type {Array<Style>}
     */ let styles;
        if (Array.isArray(obj)) styles = obj;
        else {
            (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(typeof /** @type {?} */ obj.getZIndex === "function", 41); // Expected an `Style` or an array of `Style`
            const style = /** @type {Style} */ obj;
            styles = [
                style
            ];
        }
        styleFunction = function() {
            return styles;
        };
    }
    return styleFunction;
}
/**
 * @type {Array<Style>|null}
 */ let $0e8e066c6965c811$var$defaultStyles = null;
function $0e8e066c6965c811$export$6865c5ac2f5ce8b6(feature, resolution) {
    // We don't use an immediately-invoked function
    // and a closure so we don't get an error at script evaluation time in
    // browsers that do not support Canvas. (import("./Circle.js").CircleStyle does
    // canvas.getContext('2d') at construction time, which will cause an.error
    // in such browsers.)
    if (!$0e8e066c6965c811$var$defaultStyles) {
        const fill = new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
            color: "rgba(255,255,255,0.4)"
        });
        const stroke = new (0, $5bb5a6da769d8762$export$2e2bcd8739ae039)({
            color: "#3399CC",
            width: 1.25
        });
        $0e8e066c6965c811$var$defaultStyles = [
            new $0e8e066c6965c811$var$Style({
                image: new (0, $4702fef2bdf52596$export$2e2bcd8739ae039)({
                    fill: fill,
                    stroke: stroke,
                    radius: 5
                }),
                fill: fill,
                stroke: stroke
            })
        ];
    }
    return $0e8e066c6965c811$var$defaultStyles;
}
function $0e8e066c6965c811$export$ed1eaede5d0e77ac() {
    /** @type {Object<import("../geom/Geometry.js").Type, Array<Style>>} */ const styles = {};
    const white = [
        255,
        255,
        255,
        1
    ];
    const blue = [
        0,
        153,
        255,
        1
    ];
    const width = 3;
    styles["Polygon"] = [
        new $0e8e066c6965c811$var$Style({
            fill: new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
                color: [
                    255,
                    255,
                    255,
                    0.5
                ]
            })
        })
    ];
    styles["MultiPolygon"] = styles["Polygon"];
    styles["LineString"] = [
        new $0e8e066c6965c811$var$Style({
            stroke: new (0, $5bb5a6da769d8762$export$2e2bcd8739ae039)({
                color: white,
                width: width + 2
            })
        }),
        new $0e8e066c6965c811$var$Style({
            stroke: new (0, $5bb5a6da769d8762$export$2e2bcd8739ae039)({
                color: blue,
                width: width
            })
        })
    ];
    styles["MultiLineString"] = styles["LineString"];
    styles["Circle"] = styles["Polygon"].concat(styles["LineString"]);
    styles["Point"] = [
        new $0e8e066c6965c811$var$Style({
            image: new (0, $4702fef2bdf52596$export$2e2bcd8739ae039)({
                radius: width * 2,
                fill: new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
                    color: blue
                }),
                stroke: new (0, $5bb5a6da769d8762$export$2e2bcd8739ae039)({
                    color: white,
                    width: width / 2
                })
            }),
            zIndex: Infinity
        })
    ];
    styles["MultiPoint"] = styles["Point"];
    styles["GeometryCollection"] = styles["Polygon"].concat(styles["LineString"], styles["Point"]);
    return styles;
}
/**
 * Function that is called with a feature and returns its default geometry.
 * @param {import("../Feature.js").FeatureLike} feature Feature to get the geometry for.
 * @return {import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined} Geometry to render.
 */ function $0e8e066c6965c811$var$defaultGeometryFunction(feature) {
    return feature.getGeometry();
}
var $0e8e066c6965c811$export$2e2bcd8739ae039 = $0e8e066c6965c811$var$Style;


/**
 * @module ol/style/flat
 */ 

/**
 * @module ol/style/Icon
 */ 




/**
 * @module ol/style/IconImage
 */ 




/**
 * @module ol/style/IconImageCache
 */ 
/**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache.shared}.
 */ class $82136d2ec01af9ba$var$IconImageCache {
    constructor(){
        /**
     * @type {!Object<string, import("./IconImage.js").default>}
     * @private
     */ this.cache_ = {};
        /**
     * @type {number}
     * @private
     */ this.cacheSize_ = 0;
        /**
     * @type {number}
     * @private
     */ this.maxCacheSize_ = 32;
    }
    /**
   * FIXME empty description for jsdoc
   */ clear() {
        this.cache_ = {};
        this.cacheSize_ = 0;
    }
    /**
   * @return {boolean} Can expire cache.
   */ canExpireCache() {
        return this.cacheSize_ > this.maxCacheSize_;
    }
    /**
   * FIXME empty description for jsdoc
   */ expire() {
        if (this.canExpireCache()) {
            let i = 0;
            for(const key in this.cache_){
                const iconImage = this.cache_[key];
                if ((i++ & 3) === 0 && !iconImage.hasListener()) {
                    delete this.cache_[key];
                    --this.cacheSize_;
                }
            }
        }
    }
    /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */ get(src, crossOrigin, color) {
        const key = $82136d2ec01af9ba$var$getKey(src, crossOrigin, color);
        return key in this.cache_ ? this.cache_[key] : null;
    }
    /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @param {import("./IconImage.js").default} iconImage Icon image.
   */ set(src, crossOrigin, color, iconImage) {
        const key = $82136d2ec01af9ba$var$getKey(src, crossOrigin, color);
        this.cache_[key] = iconImage;
        ++this.cacheSize_;
    }
    /**
   * Set the cache size of the icon cache. Default is `32`. Change this value when
   * your map uses more than 32 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */ setSize(maxCacheSize) {
        this.maxCacheSize_ = maxCacheSize;
        this.expire();
    }
}
/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../color.js").Color} color Color.
 * @return {string} Cache key.
 */ function $82136d2ec01af9ba$var$getKey(src, crossOrigin, color) {
    const colorString = color ? (0, $d32b89243a698e8b$export$590567be997858b6)(color) : "null";
    return crossOrigin + ":" + src + ":" + colorString;
}
var $82136d2ec01af9ba$export$2e2bcd8739ae039 = $82136d2ec01af9ba$var$IconImageCache;
const $82136d2ec01af9ba$export$747ccdf771a87ab8 = new $82136d2ec01af9ba$var$IconImageCache();


/**
 * @module ol/Image
 */ 
/**
 * @module ol/ImageBase
 */ 


/**
 * @abstract
 */ class $bfae3f7ef12e7a3a$var$ImageBase extends (0, $fd4e3201ad7386dc$export$2e2bcd8739ae039) {
    /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("./ImageState.js").default} state State.
   */ constructor(extent, resolution, pixelRatio, state){
        super();
        /**
     * @protected
     * @type {import("./extent.js").Extent}
     */ this.extent = extent;
        /**
     * @private
     * @type {number}
     */ this.pixelRatio_ = pixelRatio;
        /**
     * @protected
     * @type {number|undefined}
     */ this.resolution = resolution;
        /**
     * @protected
     * @type {import("./ImageState.js").default}
     */ this.state = state;
    }
    /**
   * @protected
   */ changed() {
        this.dispatchEvent((0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE);
    }
    /**
   * @return {import("./extent.js").Extent} Extent.
   */ getExtent() {
        return this.extent;
    }
    /**
   * @abstract
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   */ getImage() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @return {number} PixelRatio.
   */ getPixelRatio() {
        return this.pixelRatio_;
    }
    /**
   * @return {number} Resolution.
   */ getResolution() {
        return /** @type {number} */ this.resolution;
    }
    /**
   * @return {import("./ImageState.js").default} State.
   */ getState() {
        return this.state;
    }
    /**
   * Load not yet loaded URI.
   * @abstract
   */ load() {
        (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
}
var $bfae3f7ef12e7a3a$export$2e2bcd8739ae039 = $bfae3f7ef12e7a3a$var$ImageBase;






/**
 * A function that takes an {@link module:ol/Image~ImageWrapper} for the image and a
 * `{string}` for the src as arguments. It is supposed to make it so the
 * underlying image {@link module:ol/Image~ImageWrapper#getImage} is assigned the
 * content specified by the src. If not specified, the default is
 *
 *     function(image, src) {
 *       image.getImage().src = src;
 *     }
 *
 * Providing a custom `imageLoadFunction` can be useful to load images with
 * post requests or - in general - through XHR requests, where the src of the
 * image element would be set to a data URI when the content is loaded.
 *
 * @typedef {function(ImageWrapper, string): void} LoadFunction
 * @api
 */ class $752084c7f6d5daf1$var$ImageWrapper extends (0, $bfae3f7ef12e7a3a$export$2e2bcd8739ae039) {
    /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|undefined} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {LoadFunction} imageLoadFunction Image load function.
   * @param {CanvasRenderingContext2D} [context] Canvas context. When provided, the image will be
   *    drawn into the context's canvas, and `getImage()` will return the canvas once the image
   *    has finished loading.
   */ constructor(extent, resolution, pixelRatio, src, crossOrigin, imageLoadFunction, context){
        super(extent, resolution, pixelRatio, (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).IDLE);
        /**
     * @private
     * @type {string}
     */ this.src_ = src;
        /**
     * @private
     * @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
     */ this.image_ = new Image();
        if (crossOrigin !== null) this.image_.crossOrigin = crossOrigin;
        /**
     * @private
     * @type {CanvasRenderingContext2D}
     */ this.context_ = context;
        /**
     * @private
     * @type {?function():void}
     */ this.unlisten_ = null;
        /**
     * @protected
     * @type {import("./ImageState.js").default}
     */ this.state = (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).IDLE;
        /**
     * @private
     * @type {LoadFunction}
     */ this.imageLoadFunction_ = imageLoadFunction;
    }
    /**
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */ getImage() {
        if (this.state == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED && this.context_ && !(this.image_ instanceof HTMLCanvasElement)) {
            const canvas = this.context_.canvas;
            canvas.width = this.image_.width;
            canvas.height = this.image_.height;
            this.context_.drawImage(this.image_, 0, 0);
            this.image_ = this.context_.canvas;
        }
        return this.image_;
    }
    /**
   * Tracks loading or read errors.
   *
   * @private
   */ handleImageError_() {
        this.state = (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).ERROR;
        this.unlistenImage_();
        this.changed();
    }
    /**
   * Tracks successful image load.
   *
   * @private
   */ handleImageLoad_() {
        if (this.resolution === undefined) this.resolution = (0, $84be800ca44e672c$export$c08559766941f856)(this.extent) / this.image_.height;
        this.state = (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED;
        this.unlistenImage_();
        this.changed();
    }
    /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @api
   */ load() {
        if (this.state == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).IDLE || this.state == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).ERROR) {
            this.state = (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADING;
            this.changed();
            this.imageLoadFunction_(this, this.src_);
            this.unlisten_ = $752084c7f6d5daf1$export$bc96ecc7c2a50764(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
        }
    }
    /**
   * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
   */ setImage(image) {
        this.image_ = image;
        this.resolution = (0, $84be800ca44e672c$export$c08559766941f856)(this.extent) / this.image_.height;
    }
    /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */ unlistenImage_() {
        if (this.unlisten_) {
            this.unlisten_();
            this.unlisten_ = null;
        }
    }
}
function $752084c7f6d5daf1$export$bc96ecc7c2a50764(image, loadHandler, errorHandler) {
    const img = /** @type {HTMLImageElement} */ image;
    let listening = true;
    let decoding = false;
    let loaded = false;
    const listenerKeys = [
        (0, $776f68d2a754760b$export$8d2a95bc11b44725)(img, (0, $f13d17e3c190470c$export$2e2bcd8739ae039).LOAD, function() {
            loaded = true;
            if (!decoding) loadHandler();
        })
    ];
    if (img.src && (0, $253e11c6a01eb5bc$export$716f8695eedb9bad)) {
        decoding = true;
        img.decode().then(function() {
            if (listening) loadHandler();
        }).catch(function(error) {
            if (listening) {
                if (loaded) loadHandler();
                else errorHandler();
            }
        });
    } else listenerKeys.push((0, $776f68d2a754760b$export$8d2a95bc11b44725)(img, (0, $f13d17e3c190470c$export$2e2bcd8739ae039).ERROR, errorHandler));
    return function unlisten() {
        listening = false;
        listenerKeys.forEach((0, $776f68d2a754760b$export$b0a21c8b3c1c921));
    };
}
var $752084c7f6d5daf1$export$2e2bcd8739ae039 = $752084c7f6d5daf1$var$ImageWrapper;


/**
 * @type {CanvasRenderingContext2D}
 */ let $064229adb158691e$var$taintedTestContext = null;
class $064229adb158691e$var$IconImage extends (0, $fd4e3201ad7386dc$export$2e2bcd8739ae039) {
    /**
   * @param {HTMLImageElement|HTMLCanvasElement} image Image.
   * @param {string|undefined} src Src.
   * @param {import("../size.js").Size} size Size.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default} imageState Image state.
   * @param {import("../color.js").Color} color Color.
   */ constructor(image, src, size, crossOrigin, imageState, color){
        super();
        /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */ this.hitDetectionImage_ = null;
        /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */ this.image_ = image;
        /**
     * @private
     * @type {string|null}
     */ this.crossOrigin_ = crossOrigin;
        /**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */ this.canvas_ = {};
        /**
     * @private
     * @type {import("../color.js").Color}
     */ this.color_ = color;
        /**
     * @private
     * @type {?function():void}
     */ this.unlisten_ = null;
        /**
     * @private
     * @type {import("../ImageState.js").default}
     */ this.imageState_ = imageState;
        /**
     * @private
     * @type {import("../size.js").Size}
     */ this.size_ = size;
        /**
     * @private
     * @type {string|undefined}
     */ this.src_ = src;
        /**
     * @private
     */ this.tainted_;
    }
    /**
   * @private
   */ initializeImage_() {
        this.image_ = new Image();
        if (this.crossOrigin_ !== null) this.image_.crossOrigin = this.crossOrigin_;
    }
    /**
   * @private
   * @return {boolean} The image canvas is tainted.
   */ isTainted_() {
        if (this.tainted_ === undefined && this.imageState_ === (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED) {
            if (!$064229adb158691e$var$taintedTestContext) $064229adb158691e$var$taintedTestContext = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(1, 1, undefined, {
                willReadFrequently: true
            });
            $064229adb158691e$var$taintedTestContext.drawImage(this.image_, 0, 0);
            try {
                $064229adb158691e$var$taintedTestContext.getImageData(0, 0, 1, 1);
                this.tainted_ = false;
            } catch (e) {
                $064229adb158691e$var$taintedTestContext = null;
                this.tainted_ = true;
            }
        }
        return this.tainted_ === true;
    }
    /**
   * @private
   */ dispatchChangeEvent_() {
        this.dispatchEvent((0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE);
    }
    /**
   * @private
   */ handleImageError_() {
        this.imageState_ = (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).ERROR;
        this.unlistenImage_();
        this.dispatchChangeEvent_();
    }
    /**
   * @private
   */ handleImageLoad_() {
        this.imageState_ = (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED;
        if (this.size_) {
            this.image_.width = this.size_[0];
            this.image_.height = this.size_[1];
        } else this.size_ = [
            this.image_.width,
            this.image_.height
        ];
        this.unlistenImage_();
        this.dispatchChangeEvent_();
    }
    /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   */ getImage(pixelRatio) {
        if (!this.image_) this.initializeImage_();
        this.replaceColor_(pixelRatio);
        return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
    }
    /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */ getPixelRatio(pixelRatio) {
        this.replaceColor_(pixelRatio);
        return this.canvas_[pixelRatio] ? pixelRatio : 1;
    }
    /**
   * @return {import("../ImageState.js").default} Image state.
   */ getImageState() {
        return this.imageState_;
    }
    /**
   * @return {HTMLImageElement|HTMLCanvasElement} Image element.
   */ getHitDetectionImage() {
        if (!this.image_) this.initializeImage_();
        if (!this.hitDetectionImage_) {
            if (this.isTainted_()) {
                const width = this.size_[0];
                const height = this.size_[1];
                const context = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(width, height);
                context.fillRect(0, 0, width, height);
                this.hitDetectionImage_ = context.canvas;
            } else this.hitDetectionImage_ = this.image_;
        }
        return this.hitDetectionImage_;
    }
    /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */ getSize() {
        return this.size_;
    }
    /**
   * @return {string|undefined} Image src.
   */ getSrc() {
        return this.src_;
    }
    /**
   * Load not yet loaded URI.
   */ load() {
        if (this.imageState_ !== (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).IDLE) return;
        if (!this.image_) this.initializeImage_();
        this.imageState_ = (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADING;
        try {
            /** @type {HTMLImageElement} */ this.image_.src = this.src_;
        } catch (e) {
            this.handleImageError_();
        }
        this.unlisten_ = (0, $752084c7f6d5daf1$export$bc96ecc7c2a50764)(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
    /**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */ replaceColor_(pixelRatio) {
        if (!this.color_ || this.canvas_[pixelRatio] || this.imageState_ !== (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED) return;
        const image = this.image_;
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(image.width * pixelRatio);
        canvas.height = Math.ceil(image.height * pixelRatio);
        const ctx = canvas.getContext("2d");
        ctx.scale(pixelRatio, pixelRatio);
        ctx.drawImage(image, 0, 0);
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = (0, $d32b89243a698e8b$export$590567be997858b6)(this.color_);
        ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(image, 0, 0);
        this.canvas_[pixelRatio] = canvas;
    }
    /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */ unlistenImage_() {
        if (this.unlisten_) {
            this.unlisten_();
            this.unlisten_ = null;
        }
    }
}
function $064229adb158691e$export$3988ae62b71be9a3(image, src, size, crossOrigin, imageState, color) {
    let iconImage = (0, $82136d2ec01af9ba$export$747ccdf771a87ab8).get(src, crossOrigin, color);
    if (!iconImage) {
        iconImage = new $064229adb158691e$var$IconImage(image, src, size, crossOrigin, imageState, color);
        (0, $82136d2ec01af9ba$export$747ccdf771a87ab8).set(src, crossOrigin, color, iconImage);
    }
    return iconImage;
}
var $064229adb158691e$export$2e2bcd8739ae039 = $064229adb158691e$var$IconImage;



/**
 * @typedef {'fraction' | 'pixels'} IconAnchorUnits
 * Anchor unit can be either a fraction of the icon size or in pixels.
 */ /**
 * @typedef {'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'} IconOrigin
 * Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
 */ /**
 * @typedef {Object} Options
 * @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {IconOrigin} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {IconAnchorUnits} [anchorXUnits='fraction'] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels.
 * @property {IconAnchorUnits} [anchorYUnits='fraction'] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels.
 * @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {HTMLImageElement|HTMLCanvasElement} [img] Image object for the icon. If the `src` option is not provided then the
 * provided image must already be loaded. And in that case, it is required
 * to provide the size of the image, with the `imgSize` option.
 * @property {import("../size.js").Size} [imgSize] Image size in pixels. Only required if `img` is set and `src` is not.
 * The provided `imgSize` needs to match the actual size of the image.
 * @property {Array<number>} [displacement=[0, 0]] Displacement of the icon in pixels.
 * Positive values will shift the icon right and up.
 * @property {number} [opacity=1] Opacity of the icon.
 * @property {number} [width] The width of the icon in pixels. This can't be used together with `scale`.
 * @property {number} [height] The height of the icon in pixels. This can't be used together with `scale`.
 * @property {number|import("../size.js").Size} [scale=1] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {Array<number>} [offset=[0, 0]] Offset which, together with `size` and `offsetOrigin`, defines the
 * sub-rectangle to use from the original (sprite) image.
 * @property {IconOrigin} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {import("../size.js").Size} [size] Icon size in pixels. Used together with `offset` to define the
 * sub-rectangle to use from the original (sprite) image.
 * @property {string} [src] Image source URI.
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode.
 */ /**
 * @param {number} width The width.
 * @param {number} height The height.
 * @param {number|undefined} wantedWidth The wanted width.
 * @param {number|undefined} wantedHeight The wanted height.
 * @return {number|Array<number>} The scale.
 */ function $4dd3b6f7e2acb5b2$var$calculateScale(width, height, wantedWidth, wantedHeight) {
    if (wantedWidth !== undefined && wantedHeight !== undefined) return [
        wantedWidth / width,
        wantedHeight / height
    ];
    if (wantedWidth !== undefined) return wantedWidth / width;
    if (wantedHeight !== undefined) return wantedHeight / height;
    return 1;
}
/**
 * @classdesc
 * Set icon style for vector features.
 * @api
 */ class $4dd3b6f7e2acb5b2$var$Icon extends (0, $86ef58b83c2a6f52$export$2e2bcd8739ae039) {
    /**
   * @param {Options} [options] Options.
   */ constructor(options){
        options = options || {};
        /**
     * @type {number}
     */ const opacity = options.opacity !== undefined ? options.opacity : 1;
        /**
     * @type {number}
     */ const rotation = options.rotation !== undefined ? options.rotation : 0;
        /**
     * @type {number|import("../size.js").Size}
     */ const scale = options.scale !== undefined ? options.scale : 1;
        /**
     * @type {boolean}
     */ const rotateWithView = options.rotateWithView !== undefined ? options.rotateWithView : false;
        super({
            opacity: opacity,
            rotation: rotation,
            scale: scale,
            displacement: options.displacement !== undefined ? options.displacement : [
                0,
                0
            ],
            rotateWithView: rotateWithView,
            declutterMode: options.declutterMode
        });
        /**
     * @private
     * @type {Array<number>}
     */ this.anchor_ = options.anchor !== undefined ? options.anchor : [
            0.5,
            0.5
        ];
        /**
     * @private
     * @type {Array<number>}
     */ this.normalizedAnchor_ = null;
        /**
     * @private
     * @type {IconOrigin}
     */ this.anchorOrigin_ = options.anchorOrigin !== undefined ? options.anchorOrigin : "top-left";
        /**
     * @private
     * @type {IconAnchorUnits}
     */ this.anchorXUnits_ = options.anchorXUnits !== undefined ? options.anchorXUnits : "fraction";
        /**
     * @private
     * @type {IconAnchorUnits}
     */ this.anchorYUnits_ = options.anchorYUnits !== undefined ? options.anchorYUnits : "fraction";
        /**
     * @private
     * @type {?string}
     */ this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;
        /**
     * @type {HTMLImageElement|HTMLCanvasElement}
     */ const image = options.img !== undefined ? options.img : null;
        /**
     * @private
     * @type {import("../size.js").Size|undefined}
     */ this.imgSize_ = options.imgSize;
        /**
     * @type {string|undefined}
     */ let src = options.src;
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(!(src !== undefined && image), 4); // `image` and `src` cannot be provided at the same time
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(!image || image && this.imgSize_, 5); // `imgSize` must be set when `image` is provided
        if ((src === undefined || src.length === 0) && image) src = /** @type {HTMLImageElement} */ image.src || (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(image);
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(src !== undefined && src.length > 0, 6); // A defined and non-empty `src` or `image` must be provided
        // `width` or `height` cannot be provided together with `scale`
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(!((options.width !== undefined || options.height !== undefined) && options.scale !== undefined), 69);
        /**
     * @type {import("../ImageState.js").default}
     */ const imageState = options.src !== undefined ? (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).IDLE : (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED;
        /**
     * @private
     * @type {import("../color.js").Color}
     */ this.color_ = options.color !== undefined ? (0, $d32b89243a698e8b$export$75093a47a9fa838d)(options.color) : null;
        /**
     * @private
     * @type {import("./IconImage.js").default}
     */ this.iconImage_ = (0, $064229adb158691e$export$3988ae62b71be9a3)(image, /** @type {string} */ src, this.imgSize_ !== undefined ? this.imgSize_ : null, this.crossOrigin_, imageState, this.color_);
        /**
     * @private
     * @type {Array<number>}
     */ this.offset_ = options.offset !== undefined ? options.offset : [
            0,
            0
        ];
        /**
     * @private
     * @type {IconOrigin}
     */ this.offsetOrigin_ = options.offsetOrigin !== undefined ? options.offsetOrigin : "top-left";
        /**
     * @private
     * @type {Array<number>}
     */ this.origin_ = null;
        /**
     * @private
     * @type {import("../size.js").Size}
     */ this.size_ = options.size !== undefined ? options.size : null;
        /**
     * Calculate the scale if width or height were given.
     */ if (options.width !== undefined || options.height !== undefined) {
            let width, height;
            if (options.size) [width, height] = options.size;
            else {
                const image = this.getImage(1);
                if (image instanceof HTMLCanvasElement || image.src && image.complete) {
                    width = image.width;
                    height = image.height;
                } else {
                    this.initialOptions_ = options;
                    const onload = ()=>{
                        this.unlistenImageChange(onload);
                        if (!this.initialOptions_) return;
                        const imageSize = this.iconImage_.getSize();
                        this.setScale($4dd3b6f7e2acb5b2$var$calculateScale(imageSize[0], imageSize[1], options.width, options.height));
                    };
                    this.listenImageChange(onload);
                    return;
                }
            }
            if (width !== undefined) this.setScale($4dd3b6f7e2acb5b2$var$calculateScale(width, height, options.width, options.height));
        }
    }
    /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   */ clone() {
        let scale, width, height;
        if (this.initialOptions_) {
            width = this.initialOptions_.width;
            height = this.initialOptions_.height;
        } else {
            scale = this.getScale();
            scale = Array.isArray(scale) ? scale.slice() : scale;
        }
        const clone = new $4dd3b6f7e2acb5b2$var$Icon({
            anchor: this.anchor_.slice(),
            anchorOrigin: this.anchorOrigin_,
            anchorXUnits: this.anchorXUnits_,
            anchorYUnits: this.anchorYUnits_,
            color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || undefined,
            crossOrigin: this.crossOrigin_,
            imgSize: this.imgSize_,
            offset: this.offset_.slice(),
            offsetOrigin: this.offsetOrigin_,
            opacity: this.getOpacity(),
            rotateWithView: this.getRotateWithView(),
            rotation: this.getRotation(),
            scale: scale,
            width: width,
            height: height,
            size: this.size_ !== null ? this.size_.slice() : undefined,
            src: this.getSrc(),
            displacement: this.getDisplacement().slice(),
            declutterMode: this.getDeclutterMode()
        });
        return clone;
    }
    /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */ getAnchor() {
        let anchor = this.normalizedAnchor_;
        if (!anchor) {
            anchor = this.anchor_;
            const size = this.getSize();
            if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
                if (!size) return null;
                anchor = this.anchor_.slice();
                if (this.anchorXUnits_ == "fraction") anchor[0] *= size[0];
                if (this.anchorYUnits_ == "fraction") anchor[1] *= size[1];
            }
            if (this.anchorOrigin_ != "top-left") {
                if (!size) return null;
                if (anchor === this.anchor_) anchor = this.anchor_.slice();
                if (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") anchor[0] = -anchor[0] + size[0];
                if (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") anchor[1] = -anchor[1] + size[1];
            }
            this.normalizedAnchor_ = anchor;
        }
        const displacement = this.getDisplacement();
        const scale = this.getScaleArray();
        // anchor is scaled by renderer but displacement should not be scaled
        // so divide by scale here
        return [
            anchor[0] - displacement[0] / scale[0],
            anchor[1] + displacement[1] / scale[1]
        ];
    }
    /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */ setAnchor(anchor) {
        this.anchor_ = anchor;
        this.normalizedAnchor_ = null;
    }
    /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */ getColor() {
        return this.color_;
    }
    /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement} Image or Canvas element.
   * @api
   */ getImage(pixelRatio) {
        return this.iconImage_.getImage(pixelRatio);
    }
    /**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ratio of the image.
   * @api
   */ getPixelRatio(pixelRatio) {
        return this.iconImage_.getPixelRatio(pixelRatio);
    }
    /**
   * @return {import("../size.js").Size} Image size.
   */ getImageSize() {
        return this.iconImage_.getSize();
    }
    /**
   * @return {import("../ImageState.js").default} Image state.
   */ getImageState() {
        return this.iconImage_.getImageState();
    }
    /**
   * @return {HTMLImageElement|HTMLCanvasElement} Image element.
   */ getHitDetectionImage() {
        return this.iconImage_.getHitDetectionImage();
    }
    /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */ getOrigin() {
        if (this.origin_) return this.origin_;
        let offset = this.offset_;
        if (this.offsetOrigin_ != "top-left") {
            const size = this.getSize();
            const iconImageSize = this.iconImage_.getSize();
            if (!size || !iconImageSize) return null;
            offset = offset.slice();
            if (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") offset[0] = iconImageSize[0] - size[0] - offset[0];
            if (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") offset[1] = iconImageSize[1] - size[1] - offset[1];
        }
        this.origin_ = offset;
        return this.origin_;
    }
    /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */ getSrc() {
        return this.iconImage_.getSrc();
    }
    /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   */ getSize() {
        return !this.size_ ? this.iconImage_.getSize() : this.size_;
    }
    /**
   * Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon width (in pixels).
   * @api
   */ getWidth() {
        const scale = this.getScaleArray();
        if (this.size_) return this.size_[0] * scale[0];
        if (this.iconImage_.getImageState() == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED) return this.iconImage_.getSize()[0] * scale[0];
        return undefined;
    }
    /**
   * Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon height (in pixels).
   * @api
   */ getHeight() {
        const scale = this.getScaleArray();
        if (this.size_) return this.size_[1] * scale[1];
        if (this.iconImage_.getImageState() == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED) return this.iconImage_.getSize()[1] * scale[1];
        return undefined;
    }
    /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */ setScale(scale) {
        delete this.initialOptions_;
        super.setScale(scale);
    }
    /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */ listenImageChange(listener) {
        this.iconImage_.addEventListener((0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, listener);
    }
    /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   */ load() {
        this.iconImage_.load();
    }
    /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */ unlistenImageChange(listener) {
        this.iconImage_.removeEventListener((0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, listener);
    }
}
var $4dd3b6f7e2acb5b2$export$2e2bcd8739ae039 = $4dd3b6f7e2acb5b2$var$Icon;





/**
 * @module ol/style/Text
 */ 

/**
 * @typedef {'point' | 'line'} TextPlacement
 * Default text placement is `'point'`. Note that
 * `'line'` requires the underlying geometry to be a {@link module:ol/geom/LineString~LineString},
 * {@link module:ol/geom/Polygon~Polygon}, {@link module:ol/geom/MultiLineString~MultiLineString} or
 * {@link module:ol/geom/MultiPolygon~MultiPolygon}.
 */ /**
 * @typedef {'left' | 'center' | 'right'} TextJustify
 */ /**
 * The default fill color to use if no fill was set at construction time; a
 * blackish `#333`.
 *
 * @const {string}
 */ const $546674d0724a0df5$var$DEFAULT_FILL_COLOR = "#333";
/**
 * @typedef {Object} Options
 * @property {string} [font] Font style as CSS `font` value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
 * @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {TextPlacement} [placement='point'] Text placement.
 * @property {number} [repeat] Repeat interval. When set, the text will be repeated at this interval, which specifies
 * the distance between two text anchors in pixels. Only available when `placement` is set to `'line'`. Overrides 'textAlign'.
 * @property {number|import("../size.js").Size} [scale] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {string|Array<string>} [text] Text content or rich text content. For plain text provide a string, which can
 * contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
 * render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
 * **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
 * **Note:** Rich text is not supported for the immediate rendering API.
 * @property {CanvasTextAlign} [textAlign] Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
 * Default is `'center'` for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
 * placement where `maxAngle` is not exceeded.
 * @property {TextJustify} [justify] Text justification within the text box.
 * If not set, text is justified towards the `textAlign` anchor.
 * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
 * **Note:** `justify` is ignored for immediate rendering and also for `placement: 'line'`.
 * @property {CanvasTextBaseline} [textBaseline='middle'] Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
 * `'hanging'`, `'ideographic'`.
 * @property {import("./Fill.js").default} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333).
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
 * `'point'`. Default is no fill.
 * @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
 * is `'point'`. Default is no stroke.
 * @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 */ /**
 * @classdesc
 * Set text style for vector features.
 * @api
 */ class $546674d0724a0df5$var$Text {
    /**
   * @param {Options} [options] Options.
   */ constructor(options){
        options = options || {};
        /**
     * @private
     * @type {string|undefined}
     */ this.font_ = options.font;
        /**
     * @private
     * @type {number|undefined}
     */ this.rotation_ = options.rotation;
        /**
     * @private
     * @type {boolean|undefined}
     */ this.rotateWithView_ = options.rotateWithView;
        /**
     * @private
     * @type {number|import("../size.js").Size|undefined}
     */ this.scale_ = options.scale;
        /**
     * @private
     * @type {import("../size.js").Size}
     */ this.scaleArray_ = (0, $3db00eb0a4716cab$export$a71a825ff42fb8e1)(options.scale !== undefined ? options.scale : 1);
        /**
     * @private
     * @type {string|Array<string>|undefined}
     */ this.text_ = options.text;
        /**
     * @private
     * @type {CanvasTextAlign|undefined}
     */ this.textAlign_ = options.textAlign;
        /**
     * @private
     * @type {TextJustify|undefined}
     */ this.justify_ = options.justify;
        /**
     * @private
     * @type {number|undefined}
     */ this.repeat_ = options.repeat;
        /**
     * @private
     * @type {CanvasTextBaseline|undefined}
     */ this.textBaseline_ = options.textBaseline;
        /**
     * @private
     * @type {import("./Fill.js").default}
     */ this.fill_ = options.fill !== undefined ? options.fill : new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
            color: $546674d0724a0df5$var$DEFAULT_FILL_COLOR
        });
        /**
     * @private
     * @type {number}
     */ this.maxAngle_ = options.maxAngle !== undefined ? options.maxAngle : Math.PI / 4;
        /**
     * @private
     * @type {TextPlacement}
     */ this.placement_ = options.placement !== undefined ? options.placement : "point";
        /**
     * @private
     * @type {boolean}
     */ this.overflow_ = !!options.overflow;
        /**
     * @private
     * @type {import("./Stroke.js").default}
     */ this.stroke_ = options.stroke !== undefined ? options.stroke : null;
        /**
     * @private
     * @type {number}
     */ this.offsetX_ = options.offsetX !== undefined ? options.offsetX : 0;
        /**
     * @private
     * @type {number}
     */ this.offsetY_ = options.offsetY !== undefined ? options.offsetY : 0;
        /**
     * @private
     * @type {import("./Fill.js").default}
     */ this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
        /**
     * @private
     * @type {import("./Stroke.js").default}
     */ this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
        /**
     * @private
     * @type {Array<number>|null}
     */ this.padding_ = options.padding === undefined ? null : options.padding;
    }
    /**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */ clone() {
        const scale = this.getScale();
        return new $546674d0724a0df5$var$Text({
            font: this.getFont(),
            placement: this.getPlacement(),
            repeat: this.getRepeat(),
            maxAngle: this.getMaxAngle(),
            overflow: this.getOverflow(),
            rotation: this.getRotation(),
            rotateWithView: this.getRotateWithView(),
            scale: Array.isArray(scale) ? scale.slice() : scale,
            text: this.getText(),
            textAlign: this.getTextAlign(),
            justify: this.getJustify(),
            textBaseline: this.getTextBaseline(),
            fill: this.getFill() ? this.getFill().clone() : undefined,
            stroke: this.getStroke() ? this.getStroke().clone() : undefined,
            offsetX: this.getOffsetX(),
            offsetY: this.getOffsetY(),
            backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : undefined,
            backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : undefined,
            padding: this.getPadding() || undefined
        });
    }
    /**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */ getOverflow() {
        return this.overflow_;
    }
    /**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */ getFont() {
        return this.font_;
    }
    /**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */ getMaxAngle() {
        return this.maxAngle_;
    }
    /**
   * Get the label placement.
   * @return {TextPlacement} Text placement.
   * @api
   */ getPlacement() {
        return this.placement_;
    }
    /**
   * Get the repeat interval of the text.
   * @return {number|undefined} Repeat interval in pixels.
   * @api
   */ getRepeat() {
        return this.repeat_;
    }
    /**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */ getOffsetX() {
        return this.offsetX_;
    }
    /**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */ getOffsetY() {
        return this.offsetY_;
    }
    /**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */ getFill() {
        return this.fill_;
    }
    /**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */ getRotateWithView() {
        return this.rotateWithView_;
    }
    /**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */ getRotation() {
        return this.rotation_;
    }
    /**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */ getScale() {
        return this.scale_;
    }
    /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */ getScaleArray() {
        return this.scaleArray_;
    }
    /**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */ getStroke() {
        return this.stroke_;
    }
    /**
   * Get the text to be rendered.
   * @return {string|Array<string>|undefined} Text.
   * @api
   */ getText() {
        return this.text_;
    }
    /**
   * Get the text alignment.
   * @return {CanvasTextAlign|undefined} Text align.
   * @api
   */ getTextAlign() {
        return this.textAlign_;
    }
    /**
   * Get the justification.
   * @return {TextJustify|undefined} Justification.
   * @api
   */ getJustify() {
        return this.justify_;
    }
    /**
   * Get the text baseline.
   * @return {CanvasTextBaseline|undefined} Text baseline.
   * @api
   */ getTextBaseline() {
        return this.textBaseline_;
    }
    /**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */ getBackgroundFill() {
        return this.backgroundFill_;
    }
    /**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */ getBackgroundStroke() {
        return this.backgroundStroke_;
    }
    /**
   * Get the padding for the text.
   * @return {Array<number>|null} Padding.
   * @api
   */ getPadding() {
        return this.padding_;
    }
    /**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */ setOverflow(overflow) {
        this.overflow_ = overflow;
    }
    /**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */ setFont(font) {
        this.font_ = font;
    }
    /**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */ setMaxAngle(maxAngle) {
        this.maxAngle_ = maxAngle;
    }
    /**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */ setOffsetX(offsetX) {
        this.offsetX_ = offsetX;
    }
    /**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */ setOffsetY(offsetY) {
        this.offsetY_ = offsetY;
    }
    /**
   * Set the text placement.
   *
   * @param {TextPlacement} placement Placement.
   * @api
   */ setPlacement(placement) {
        this.placement_ = placement;
    }
    /**
   * Set the repeat interval of the text.
   * @param {number|undefined} [repeat] Repeat interval in pixels.
   * @api
   */ setRepeat(repeat) {
        this.repeat_ = repeat;
    }
    /**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */ setRotateWithView(rotateWithView) {
        this.rotateWithView_ = rotateWithView;
    }
    /**
   * Set the fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */ setFill(fill) {
        this.fill_ = fill;
    }
    /**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */ setRotation(rotation) {
        this.rotation_ = rotation;
    }
    /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */ setScale(scale) {
        this.scale_ = scale;
        this.scaleArray_ = (0, $3db00eb0a4716cab$export$a71a825ff42fb8e1)(scale !== undefined ? scale : 1);
    }
    /**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */ setStroke(stroke) {
        this.stroke_ = stroke;
    }
    /**
   * Set the text.
   *
   * @param {string|Array<string>|undefined} text Text.
   * @api
   */ setText(text) {
        this.text_ = text;
    }
    /**
   * Set the text alignment.
   *
   * @param {CanvasTextAlign|undefined} textAlign Text align.
   * @api
   */ setTextAlign(textAlign) {
        this.textAlign_ = textAlign;
    }
    /**
   * Set the justification.
   *
   * @param {TextJustify|undefined} justify Justification.
   * @api
   */ setJustify(justify) {
        this.justify_ = justify;
    }
    /**
   * Set the text baseline.
   *
   * @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
   * @api
   */ setTextBaseline(textBaseline) {
        this.textBaseline_ = textBaseline;
    }
    /**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */ setBackgroundFill(fill) {
        this.backgroundFill_ = fill;
    }
    /**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */ setBackgroundStroke(stroke) {
        this.backgroundStroke_ = stroke;
    }
    /**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {Array<number>|null} padding Padding.
   * @api
   */ setPadding(padding) {
        this.padding_ = padding;
    }
}
var $546674d0724a0df5$export$2e2bcd8739ae039 = $546674d0724a0df5$var$Text;


function $b0dc507c91f0d524$export$b7b312ddf6b38c9f(flatStyle) {
    const style = new (0, $0e8e066c6965c811$export$2e2bcd8739ae039)({
        fill: $b0dc507c91f0d524$var$getFill(flatStyle, ""),
        stroke: $b0dc507c91f0d524$var$getStroke(flatStyle, ""),
        text: $b0dc507c91f0d524$var$getText(flatStyle),
        image: $b0dc507c91f0d524$var$getImage(flatStyle)
    });
    return style;
}
/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} prefix The property prefix.
 * @return {Fill|undefined} The fill (if any).
 */ function $b0dc507c91f0d524$var$getFill(flatStyle, prefix) {
    const color = flatStyle[prefix + "fill-color"];
    if (!color) return;
    return new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
        color: color
    });
}
/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} prefix The property prefix.
 * @return {Stroke|undefined} The stroke (if any).
 */ function $b0dc507c91f0d524$var$getStroke(flatStyle, prefix) {
    const width = flatStyle[prefix + "stroke-width"];
    const color = flatStyle[prefix + "stroke-color"];
    if (!width && !color) return;
    return new (0, $5bb5a6da769d8762$export$2e2bcd8739ae039)({
        width: width,
        color: color,
        lineCap: flatStyle[prefix + "stroke-line-cap"],
        lineJoin: flatStyle[prefix + "stroke-line-join"],
        lineDash: flatStyle[prefix + "stroke-line-dash"],
        lineDashOffset: flatStyle[prefix + "stroke-line-dash-offset"],
        miterLimit: flatStyle[prefix + "stroke-miter-limit"]
    });
}
/**
 * @param {FlatStyle} flatStyle The flat style.
 * @return {Text|undefined} The text (if any).
 */ function $b0dc507c91f0d524$var$getText(flatStyle) {
    const value = flatStyle["text-value"];
    if (!value) return;
    const text = new (0, $546674d0724a0df5$export$2e2bcd8739ae039)({
        text: value,
        font: flatStyle["text-font"],
        maxAngle: flatStyle["text-max-angle"],
        offsetX: flatStyle["text-offset-x"],
        offsetY: flatStyle["text-offset-y"],
        overflow: flatStyle["text-overflow"],
        placement: flatStyle["text-placement"],
        repeat: flatStyle["text-repeat"],
        scale: flatStyle["text-scale"],
        rotateWithView: flatStyle["text-rotate-with-view"],
        rotation: flatStyle["text-rotation"],
        textAlign: flatStyle["text-align"],
        justify: flatStyle["text-justify"],
        textBaseline: flatStyle["text-baseline"],
        padding: flatStyle["text-padding"],
        fill: $b0dc507c91f0d524$var$getFill(flatStyle, "text-"),
        backgroundFill: $b0dc507c91f0d524$var$getFill(flatStyle, "text-background-"),
        stroke: $b0dc507c91f0d524$var$getStroke(flatStyle, "text-"),
        backgroundStroke: $b0dc507c91f0d524$var$getStroke(flatStyle, "text-background-")
    });
    return text;
}
/**
 * @param {FlatStyle} flatStyle The flat style.
 * @return {import("./Image.js").default|undefined} The image (if any).
 */ function $b0dc507c91f0d524$var$getImage(flatStyle) {
    const iconSrc = flatStyle["icon-src"];
    const iconImg = flatStyle["icon-img"];
    if (iconSrc || iconImg) {
        const icon = new (0, $4dd3b6f7e2acb5b2$export$2e2bcd8739ae039)({
            src: iconSrc,
            img: iconImg,
            imgSize: flatStyle["icon-img-size"],
            anchor: flatStyle["icon-anchor"],
            anchorOrigin: flatStyle["icon-anchor-origin"],
            anchorXUnits: flatStyle["icon-anchor-x-units"],
            anchorYUnits: flatStyle["icon-anchor-y-units"],
            color: flatStyle["icon-color"],
            crossOrigin: flatStyle["icon-cross-origin"],
            offset: flatStyle["icon-offset"],
            displacement: flatStyle["icon-displacement"],
            opacity: flatStyle["icon-opacity"],
            scale: flatStyle["icon-scale"],
            width: flatStyle["icon-width"],
            height: flatStyle["icon-height"],
            rotation: flatStyle["icon-rotation"],
            rotateWithView: flatStyle["icon-rotate-with-view"],
            size: flatStyle["icon-size"],
            declutterMode: flatStyle["icon-declutter-mode"]
        });
        return icon;
    }
    const shapePoints = flatStyle["shape-points"];
    if (shapePoints) {
        const prefix = "shape-";
        const shape = new (0, $839f5b0b6dbb6b4a$export$2e2bcd8739ae039)({
            points: shapePoints,
            fill: $b0dc507c91f0d524$var$getFill(flatStyle, prefix),
            stroke: $b0dc507c91f0d524$var$getStroke(flatStyle, prefix),
            radius: flatStyle["shape-radius"],
            radius1: flatStyle["shape-radius1"],
            radius2: flatStyle["shape-radius2"],
            angle: flatStyle["shape-angle"],
            displacement: flatStyle["shape-displacement"],
            rotation: flatStyle["shape-rotation"],
            rotateWithView: flatStyle["shape-rotate-with-view"],
            scale: flatStyle["shape-scale"],
            declutterMode: flatStyle["shape-declutter-mode"]
        });
        return shape;
    }
    const circleRadius = flatStyle["circle-radius"];
    if (circleRadius) {
        const prefix = "circle-";
        const circle = new (0, $4702fef2bdf52596$export$2e2bcd8739ae039)({
            radius: circleRadius,
            fill: $b0dc507c91f0d524$var$getFill(flatStyle, prefix),
            stroke: $b0dc507c91f0d524$var$getStroke(flatStyle, prefix),
            displacement: flatStyle["circle-displacement"],
            scale: flatStyle["circle-scale"],
            rotation: flatStyle["circle-rotation"],
            rotateWithView: flatStyle["circle-rotate-with-view"],
            declutterMode: flatStyle["circle-declutter-mode"]
        });
        return circle;
    }
    return;
}


/**
 * @template {import("../source/Vector.js").default|import("../source/VectorTile.js").default} VectorSourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the viewport extent used by the
 * renderer when getting features from the vector source for the rendering or hit-detection.
 * Recommended value: the size of the largest symbol, line width or label.
 * @property {VectorSourceType} [source] Source.
 * @property {import("../Map.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use [map.addLayer()]{@link import("../Map.js").default#addLayer}.
 * @property {boolean} [declutter=false] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 *
 * As an optimization decluttered features from layers with the same `className` are rendered above
 * the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
 * behavior and place declutterd features with their own layer configure the layer with a `className`
 * other than `ol-layer`.
 * @property {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style. When set to `null`, only
 * features that have their own style will be rendered. See {@link module:ol/style/Style~Style} for the default style
 * which will be used if this is not set.
 * @property {import("./Base.js").BackgroundColor} [background] Background color for the layer. If not specified, no background
 * will be rendered.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will
 * be recreated during animations. This means that no vectors will be shown clipped, but the
 * setting will have a performance impact for large amounts of vector data. When set to `false`,
 * batches will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will
 * be recreated during interactions. See also `updateWhileAnimating`.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */ /**
 * @enum {string}
 * @private
 */ const $d0e9dd5889579bca$var$Property = {
    RENDER_ORDER: "renderOrder"
};
/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default|import("../source/VectorTile.js").default} VectorSourceType
 * @template {import("../renderer/canvas/VectorLayer.js").default|import("../renderer/canvas/VectorTileLayer.js").default|import("../renderer/canvas/VectorImageLayer.js").default|import("../renderer/webgl/PointsLayer.js").default} RendererType
 * @extends {Layer<VectorSourceType, RendererType>}
 * @api
 */ class $d0e9dd5889579bca$var$BaseVectorLayer extends (0, $14019fcc7ba24fd5$export$2e2bcd8739ae039) {
    /**
   * @param {Options<VectorSourceType>} [options] Options.
   */ constructor(options){
        options = options ? options : {};
        const baseOptions = Object.assign({}, options);
        delete baseOptions.style;
        delete baseOptions.renderBuffer;
        delete baseOptions.updateWhileAnimating;
        delete baseOptions.updateWhileInteracting;
        super(baseOptions);
        /**
     * @private
     * @type {boolean}
     */ this.declutter_ = options.declutter !== undefined ? options.declutter : false;
        /**
     * @type {number}
     * @private
     */ this.renderBuffer_ = options.renderBuffer !== undefined ? options.renderBuffer : 100;
        /**
     * User provided style.
     * @type {import("../style/Style.js").StyleLike}
     * @private
     */ this.style_ = null;
        /**
     * Style function for use within the library.
     * @type {import("../style/Style.js").StyleFunction|undefined}
     * @private
     */ this.styleFunction_ = undefined;
        this.setStyle(options.style);
        /**
     * @type {boolean}
     * @private
     */ this.updateWhileAnimating_ = options.updateWhileAnimating !== undefined ? options.updateWhileAnimating : false;
        /**
     * @type {boolean}
     * @private
     */ this.updateWhileInteracting_ = options.updateWhileInteracting !== undefined ? options.updateWhileInteracting : false;
    }
    /**
   * @return {boolean} Declutter.
   */ getDeclutter() {
        return this.declutter_;
    }
    /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
   * Text is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with an array of features.
   * @api
   */ getFeatures(pixel) {
        return super.getFeatures(pixel);
    }
    /**
   * @return {number|undefined} Render buffer.
   */ getRenderBuffer() {
        return this.renderBuffer_;
    }
    /**
   * @return {function(import("../Feature.js").default, import("../Feature.js").default): number|null|undefined} Render
   *     order.
   */ getRenderOrder() {
        return /** @type {import("../render.js").OrderFunction|null|undefined} */ this.get($d0e9dd5889579bca$var$Property.RENDER_ORDER);
    }
    /**
   * Get the style for features.  This returns whatever was passed to the `style`
   * option at construction or to the `setStyle` method.
   * @return {import("../style/Style.js").StyleLike|null|undefined} Layer style.
   * @api
   */ getStyle() {
        return this.style_;
    }
    /**
   * Get the style function.
   * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
   * @api
   */ getStyleFunction() {
        return this.styleFunction_;
    }
    /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     animating.
   */ getUpdateWhileAnimating() {
        return this.updateWhileAnimating_;
    }
    /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     interacting.
   */ getUpdateWhileInteracting() {
        return this.updateWhileInteracting_;
    }
    /**
   * Render declutter items for this layer
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */ renderDeclutter(frameState) {
        if (!frameState.declutterTree) frameState.declutterTree = new (0, (/*@__PURE__*/$parcel$interopDefault($878c4f61c06eb00a$exports)))(9);
        /** @type {*} */ this.getRenderer().renderDeclutter(frameState);
    }
    /**
   * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
   *     Render order.
   */ setRenderOrder(renderOrder) {
        this.set($d0e9dd5889579bca$var$Property.RENDER_ORDER, renderOrder);
    }
    /**
   * Set the style for features.  This can be a single style object, an array
   * of styles, or a function that takes a feature and resolution and returns
   * an array of styles. If set to `null`, the layer has no style (a `null` style),
   * so only features that have their own styles will be rendered in the layer. Call
   * `setStyle()` without arguments to reset to the default style. See
   * [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
   *
   * If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
   * literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
   * ```js
   * vectorLayer.setStyle({
   *   "fill-color": "yellow",
   *   "stroke-color": "black",
   *   "stroke-width": 4
   * })
   * ```
   *
   * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
   * @api
   */ setStyle(style) {
        /**
     * @type {import("../style/Style.js").StyleLike|null}
     */ let styleLike;
        if (style === undefined) styleLike = (0, $0e8e066c6965c811$export$6865c5ac2f5ce8b6);
        else if (style === null) styleLike = null;
        else if (typeof style === "function") styleLike = style;
        else if (style instanceof (0, $0e8e066c6965c811$export$2e2bcd8739ae039)) styleLike = style;
        else if (Array.isArray(style)) {
            const len = style.length;
            /**
       * @type {Array<Style>}
       */ const styles = new Array(len);
            for(let i = 0; i < len; ++i){
                const s = style[i];
                if (s instanceof (0, $0e8e066c6965c811$export$2e2bcd8739ae039)) styles[i] = s;
                else styles[i] = (0, $b0dc507c91f0d524$export$b7b312ddf6b38c9f)(s);
            }
            styleLike = styles;
        } else styleLike = (0, $b0dc507c91f0d524$export$b7b312ddf6b38c9f)(style);
        this.style_ = styleLike;
        this.styleFunction_ = style === null ? undefined : (0, $0e8e066c6965c811$export$c314ea3f6b164147)(this.style_);
        this.changed();
    }
}
var $d0e9dd5889579bca$export$2e2bcd8739ae039 = $d0e9dd5889579bca$var$BaseVectorLayer;


/**
 * @module ol/renderer/canvas/VectorLayer
 */ /**
 * @module ol/render/canvas/BuilderGroup
 */ /**
 * @module ol/render/canvas/Builder
 */ /**
 * @module ol/render/canvas/Instruction
 */ /**
 * @enum {number}
 */ const $3740963e6530651e$var$Instruction = {
    BEGIN_GEOMETRY: 0,
    BEGIN_PATH: 1,
    CIRCLE: 2,
    CLOSE_PATH: 3,
    CUSTOM: 4,
    DRAW_CHARS: 5,
    DRAW_IMAGE: 6,
    END_GEOMETRY: 7,
    FILL: 8,
    MOVE_TO_LINE_TO: 9,
    SET_FILL_STYLE: 10,
    SET_STROKE_STYLE: 11,
    STROKE: 12
};
const $3740963e6530651e$export$f21891651e408226 = [
    $3740963e6530651e$var$Instruction.FILL
];
const $3740963e6530651e$export$7a98aa5364d62ba8 = [
    $3740963e6530651e$var$Instruction.STROKE
];
const $3740963e6530651e$export$9f746cc58a899a00 = [
    $3740963e6530651e$var$Instruction.BEGIN_PATH
];
const $3740963e6530651e$export$89b10f327e413e71 = [
    $3740963e6530651e$var$Instruction.CLOSE_PATH
];
var $3740963e6530651e$export$2e2bcd8739ae039 = $3740963e6530651e$var$Instruction;



/**
 * @module ol/render/VectorContext
 */ /**
 * @classdesc
 * Context for drawing geometries.  A vector context is available on render
 * events and does not need to be constructed directly.
 * @api
 */ class $f58af45c89f48916$var$VectorContext {
    /**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */ drawCustom(geometry, feature, renderer, hitDetectionRenderer) {}
    /**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */ drawGeometry(geometry) {}
    /**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */ setStyle(style) {}
    /**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   */ drawCircle(circleGeometry, feature) {}
    /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   */ drawFeature(feature, style) {}
    /**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   */ drawGeometryCollection(geometryCollectionGeometry, feature) {}
    /**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */ drawLineString(lineStringGeometry, feature) {}
    /**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */ drawMultiLineString(multiLineStringGeometry, feature) {}
    /**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */ drawMultiPoint(multiPointGeometry, feature) {}
    /**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */ drawMultiPolygon(multiPolygonGeometry, feature) {}
    /**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */ drawPoint(pointGeometry, feature) {}
    /**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */ drawPolygon(polygonGeometry, feature) {}
    /**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */ drawText(geometry, feature) {}
    /**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */ setFillStrokeStyle(fillStyle, strokeStyle) {}
    /**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with a text style.
   */ setImageStyle(imageStyle, declutterImageWithText) {}
    /**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with an image style.
   */ setTextStyle(textStyle, declutterImageWithText) {}
}
var $f58af45c89f48916$export$2e2bcd8739ae039 = $f58af45c89f48916$var$VectorContext;







class $4a55c8b0b7396ae3$var$CanvasBuilder extends (0, $f58af45c89f48916$export$2e2bcd8739ae039) {
    /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */ constructor(tolerance, maxExtent, resolution, pixelRatio){
        super();
        /**
     * @protected
     * @type {number}
     */ this.tolerance = tolerance;
        /**
     * @protected
     * @const
     * @type {import("../../extent.js").Extent}
     */ this.maxExtent = maxExtent;
        /**
     * @protected
     * @type {number}
     */ this.pixelRatio = pixelRatio;
        /**
     * @protected
     * @type {number}
     */ this.maxLineWidth = 0;
        /**
     * @protected
     * @const
     * @type {number}
     */ this.resolution = resolution;
        /**
     * @private
     * @type {Array<*>}
     */ this.beginGeometryInstruction1_ = null;
        /**
     * @private
     * @type {Array<*>}
     */ this.beginGeometryInstruction2_ = null;
        /**
     * @private
     * @type {import("../../extent.js").Extent}
     */ this.bufferedMaxExtent_ = null;
        /**
     * @protected
     * @type {Array<*>}
     */ this.instructions = [];
        /**
     * @protected
     * @type {Array<number>}
     */ this.coordinates = [];
        /**
     * @private
     * @type {import("../../coordinate.js").Coordinate}
     */ this.tmpCoordinate_ = [];
        /**
     * @protected
     * @type {Array<*>}
     */ this.hitDetectionInstructions = [];
        /**
     * @protected
     * @type {import("../canvas.js").FillStrokeState}
     */ this.state = /** @type {import("../canvas.js").FillStrokeState} */ {};
    }
    /**
   * @protected
   * @param {Array<number>} dashArray Dash array.
   * @return {Array<number>} Dash array with pixel ratio applied
   */ applyPixelRatio(dashArray) {
        const pixelRatio = this.pixelRatio;
        return pixelRatio == 1 ? dashArray : dashArray.map(function(dash) {
            return dash * pixelRatio;
        });
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @protected
   * @return {number} My end
   */ appendFlatPointCoordinates(flatCoordinates, stride) {
        const extent = this.getBufferedMaxExtent();
        const tmpCoord = this.tmpCoordinate_;
        const coordinates = this.coordinates;
        let myEnd = coordinates.length;
        for(let i = 0, ii = flatCoordinates.length; i < ii; i += stride){
            tmpCoord[0] = flatCoordinates[i];
            tmpCoord[1] = flatCoordinates[i + 1];
            if ((0, $84be800ca44e672c$export$ac68c24d37ca240f)(extent, tmpCoord)) {
                coordinates[myEnd++] = tmpCoord[0];
                coordinates[myEnd++] = tmpCoord[1];
            }
        }
        return myEnd;
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} closed Last input coordinate equals first.
   * @param {boolean} skipFirst Skip first coordinate.
   * @protected
   * @return {number} My end.
   */ appendFlatLineCoordinates(flatCoordinates, offset, end, stride, closed, skipFirst) {
        const coordinates = this.coordinates;
        let myEnd = coordinates.length;
        const extent = this.getBufferedMaxExtent();
        if (skipFirst) offset += stride;
        let lastXCoord = flatCoordinates[offset];
        let lastYCoord = flatCoordinates[offset + 1];
        const nextCoord = this.tmpCoordinate_;
        let skipped = true;
        let i, lastRel, nextRel;
        for(i = offset + stride; i < end; i += stride){
            nextCoord[0] = flatCoordinates[i];
            nextCoord[1] = flatCoordinates[i + 1];
            nextRel = (0, $84be800ca44e672c$export$f97905ead28c61a8)(extent, nextCoord);
            if (nextRel !== lastRel) {
                if (skipped) {
                    coordinates[myEnd++] = lastXCoord;
                    coordinates[myEnd++] = lastYCoord;
                    skipped = false;
                }
                coordinates[myEnd++] = nextCoord[0];
                coordinates[myEnd++] = nextCoord[1];
            } else if (nextRel === (0, $3b21d84e5edf3751$export$2e2bcd8739ae039).INTERSECTING) {
                coordinates[myEnd++] = nextCoord[0];
                coordinates[myEnd++] = nextCoord[1];
                skipped = false;
            } else skipped = true;
            lastXCoord = nextCoord[0];
            lastYCoord = nextCoord[1];
            lastRel = nextRel;
        }
        // Last coordinate equals first or only one point to append:
        if (closed && skipped || i === offset + stride) {
            coordinates[myEnd++] = lastXCoord;
            coordinates[myEnd++] = lastYCoord;
        }
        return myEnd;
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Array<number>} builderEnds Builder ends.
   * @return {number} Offset.
   */ drawCustomCoordinates_(flatCoordinates, offset, ends, stride, builderEnds) {
        for(let i = 0, ii = ends.length; i < ii; ++i){
            const end = ends[i];
            const builderEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
            builderEnds.push(builderEnd);
            offset = end;
        }
        return offset;
    }
    /**
   * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */ drawCustom(geometry, feature, renderer, hitDetectionRenderer) {
        this.beginGeometry(geometry, feature);
        const type = geometry.getType();
        const stride = geometry.getStride();
        const builderBegin = this.coordinates.length;
        let flatCoordinates, builderEnd, builderEnds, builderEndss;
        let offset;
        switch(type){
            case "MultiPolygon":
                flatCoordinates = /** @type {import("../../geom/MultiPolygon.js").default} */ geometry.getOrientedFlatCoordinates();
                builderEndss = [];
                const endss = /** @type {import("../../geom/MultiPolygon.js").default} */ geometry.getEndss();
                offset = 0;
                for(let i = 0, ii = endss.length; i < ii; ++i){
                    const myEnds = [];
                    offset = this.drawCustomCoordinates_(flatCoordinates, offset, endss[i], stride, myEnds);
                    builderEndss.push(myEnds);
                }
                this.instructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEndss,
                    geometry,
                    renderer,
                    (0, $26e6af5078c94bc3$export$915c7058aeb4dfeb)
                ]);
                this.hitDetectionInstructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEndss,
                    geometry,
                    hitDetectionRenderer || renderer,
                    (0, $26e6af5078c94bc3$export$915c7058aeb4dfeb)
                ]);
                break;
            case "Polygon":
            case "MultiLineString":
                builderEnds = [];
                flatCoordinates = type == "Polygon" ? /** @type {import("../../geom/Polygon.js").default} */ geometry.getOrientedFlatCoordinates() : geometry.getFlatCoordinates();
                offset = this.drawCustomCoordinates_(flatCoordinates, 0, /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */ geometry.getEnds(), stride, builderEnds);
                this.instructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEnds,
                    geometry,
                    renderer,
                    (0, $26e6af5078c94bc3$export$cbb9596fc0f40db2)
                ]);
                this.hitDetectionInstructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEnds,
                    geometry,
                    hitDetectionRenderer || renderer,
                    (0, $26e6af5078c94bc3$export$cbb9596fc0f40db2)
                ]);
                break;
            case "LineString":
            case "Circle":
                flatCoordinates = geometry.getFlatCoordinates();
                builderEnd = this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
                this.instructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    renderer,
                    (0, $26e6af5078c94bc3$export$9c0934e4e9c3f61e)
                ]);
                this.hitDetectionInstructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    hitDetectionRenderer || renderer,
                    (0, $26e6af5078c94bc3$export$9c0934e4e9c3f61e)
                ]);
                break;
            case "MultiPoint":
                flatCoordinates = geometry.getFlatCoordinates();
                builderEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
                if (builderEnd > builderBegin) {
                    this.instructions.push([
                        (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                        builderBegin,
                        builderEnd,
                        geometry,
                        renderer,
                        (0, $26e6af5078c94bc3$export$9c0934e4e9c3f61e)
                    ]);
                    this.hitDetectionInstructions.push([
                        (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                        builderBegin,
                        builderEnd,
                        geometry,
                        hitDetectionRenderer || renderer,
                        (0, $26e6af5078c94bc3$export$9c0934e4e9c3f61e)
                    ]);
                }
                break;
            case "Point":
                flatCoordinates = geometry.getFlatCoordinates();
                this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
                builderEnd = this.coordinates.length;
                this.instructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    renderer
                ]);
                this.hitDetectionInstructions.push([
                    (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM,
                    builderBegin,
                    builderEnd,
                    geometry,
                    hitDetectionRenderer || renderer
                ]);
                break;
            default:
        }
        this.endGeometry(feature);
    }
    /**
   * @protected
   * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ beginGeometry(geometry, feature) {
        this.beginGeometryInstruction1_ = [
            (0, $3740963e6530651e$export$2e2bcd8739ae039).BEGIN_GEOMETRY,
            feature,
            0,
            geometry
        ];
        this.instructions.push(this.beginGeometryInstruction1_);
        this.beginGeometryInstruction2_ = [
            (0, $3740963e6530651e$export$2e2bcd8739ae039).BEGIN_GEOMETRY,
            feature,
            0,
            geometry
        ];
        this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
    }
    /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */ finish() {
        return {
            instructions: this.instructions,
            hitDetectionInstructions: this.hitDetectionInstructions,
            coordinates: this.coordinates
        };
    }
    /**
   * Reverse the hit detection instructions.
   */ reverseHitDetectionInstructions() {
        const hitDetectionInstructions = this.hitDetectionInstructions;
        // step 1 - reverse array
        hitDetectionInstructions.reverse();
        // step 2 - reverse instructions within geometry blocks
        let i;
        const n = hitDetectionInstructions.length;
        let instruction;
        let type;
        let begin = -1;
        for(i = 0; i < n; ++i){
            instruction = hitDetectionInstructions[i];
            type = /** @type {import("./Instruction.js").default} */ instruction[0];
            if (type == (0, $3740963e6530651e$export$2e2bcd8739ae039).END_GEOMETRY) begin = i;
            else if (type == (0, $3740963e6530651e$export$2e2bcd8739ae039).BEGIN_GEOMETRY) {
                instruction[2] = i;
                (0, $69c1cc8ae30f997f$export$292cfa960964f0e0)(this.hitDetectionInstructions, begin, i);
                begin = -1;
            }
        }
    }
    /**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */ setFillStrokeStyle(fillStyle, strokeStyle) {
        const state = this.state;
        if (fillStyle) {
            const fillStyleColor = fillStyle.getColor();
            state.fillStyle = (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(fillStyleColor ? fillStyleColor : (0, $ba06fcc662408736$export$c495d52ee3fd74b2));
        } else state.fillStyle = undefined;
        if (strokeStyle) {
            const strokeStyleColor = strokeStyle.getColor();
            state.strokeStyle = (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(strokeStyleColor ? strokeStyleColor : (0, $ba06fcc662408736$export$1eb2eaecacf2031e));
            const strokeStyleLineCap = strokeStyle.getLineCap();
            state.lineCap = strokeStyleLineCap !== undefined ? strokeStyleLineCap : (0, $ba06fcc662408736$export$17bd0c38d6ae694e);
            const strokeStyleLineDash = strokeStyle.getLineDash();
            state.lineDash = strokeStyleLineDash ? strokeStyleLineDash.slice() : (0, $ba06fcc662408736$export$e21b4112fdc612fc);
            const strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
            state.lineDashOffset = strokeStyleLineDashOffset ? strokeStyleLineDashOffset : (0, $ba06fcc662408736$export$e06efc2409049f76);
            const strokeStyleLineJoin = strokeStyle.getLineJoin();
            state.lineJoin = strokeStyleLineJoin !== undefined ? strokeStyleLineJoin : (0, $ba06fcc662408736$export$365eb9648cf19bd0);
            const strokeStyleWidth = strokeStyle.getWidth();
            state.lineWidth = strokeStyleWidth !== undefined ? strokeStyleWidth : (0, $ba06fcc662408736$export$79661f132c62010e);
            const strokeStyleMiterLimit = strokeStyle.getMiterLimit();
            state.miterLimit = strokeStyleMiterLimit !== undefined ? strokeStyleMiterLimit : (0, $ba06fcc662408736$export$80c1c01844597b7b);
            if (state.lineWidth > this.maxLineWidth) {
                this.maxLineWidth = state.lineWidth;
                // invalidate the buffered max extent cache
                this.bufferedMaxExtent_ = null;
            }
        } else {
            state.strokeStyle = undefined;
            state.lineCap = undefined;
            state.lineDash = null;
            state.lineDashOffset = undefined;
            state.lineJoin = undefined;
            state.lineWidth = undefined;
            state.miterLimit = undefined;
        }
    }
    /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Fill instruction.
   */ createFill(state) {
        const fillStyle = state.fillStyle;
        /** @type {Array<*>} */ const fillInstruction = [
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_FILL_STYLE,
            fillStyle
        ];
        if (typeof fillStyle !== "string") // Fill is a pattern or gradient - align it!
        fillInstruction.push(true);
        return fillInstruction;
    }
    /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */ applyStroke(state) {
        this.instructions.push(this.createStroke(state));
    }
    /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Stroke instruction.
   */ createStroke(state) {
        return [
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth * this.pixelRatio,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            this.applyPixelRatio(state.lineDash),
            state.lineDashOffset * this.pixelRatio
        ];
    }
    /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
   */ updateFillStyle(state, createFill) {
        const fillStyle = state.fillStyle;
        if (typeof fillStyle !== "string" || state.currentFillStyle != fillStyle) {
            if (fillStyle !== undefined) this.instructions.push(createFill.call(this, state));
            state.currentFillStyle = fillStyle;
        }
    }
    /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
   */ updateStrokeStyle(state, applyStroke) {
        const strokeStyle = state.strokeStyle;
        const lineCap = state.lineCap;
        const lineDash = state.lineDash;
        const lineDashOffset = state.lineDashOffset;
        const lineJoin = state.lineJoin;
        const lineWidth = state.lineWidth;
        const miterLimit = state.miterLimit;
        if (state.currentStrokeStyle != strokeStyle || state.currentLineCap != lineCap || lineDash != state.currentLineDash && !(0, $69c1cc8ae30f997f$export$e9bab7fafb253603)(state.currentLineDash, lineDash) || state.currentLineDashOffset != lineDashOffset || state.currentLineJoin != lineJoin || state.currentLineWidth != lineWidth || state.currentMiterLimit != miterLimit) {
            if (strokeStyle !== undefined) applyStroke.call(this, state);
            state.currentStrokeStyle = strokeStyle;
            state.currentLineCap = lineCap;
            state.currentLineDash = lineDash;
            state.currentLineDashOffset = lineDashOffset;
            state.currentLineJoin = lineJoin;
            state.currentLineWidth = lineWidth;
            state.currentMiterLimit = miterLimit;
        }
    }
    /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ endGeometry(feature) {
        this.beginGeometryInstruction1_[2] = this.instructions.length;
        this.beginGeometryInstruction1_ = null;
        this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length;
        this.beginGeometryInstruction2_ = null;
        const endGeometryInstruction = [
            (0, $3740963e6530651e$export$2e2bcd8739ae039).END_GEOMETRY,
            feature
        ];
        this.instructions.push(endGeometryInstruction);
        this.hitDetectionInstructions.push(endGeometryInstruction);
    }
    /**
   * Get the buffered rendering extent.  Rendering will be clipped to the extent
   * provided to the constructor.  To account for symbolizers that may intersect
   * this extent, we calculate a buffered extent (e.g. based on stroke width).
   * @return {import("../../extent.js").Extent} The buffered rendering extent.
   * @protected
   */ getBufferedMaxExtent() {
        if (!this.bufferedMaxExtent_) {
            this.bufferedMaxExtent_ = (0, $84be800ca44e672c$export$9cd59f9826255e47)(this.maxExtent);
            if (this.maxLineWidth > 0) {
                const width = this.resolution * (this.maxLineWidth + 1) / 2;
                (0, $84be800ca44e672c$export$ab1029bcae9ddb4a)(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
            }
        }
        return this.bufferedMaxExtent_;
    }
}
var $4a55c8b0b7396ae3$export$2e2bcd8739ae039 = $4a55c8b0b7396ae3$var$CanvasBuilder;


/**
 * @module ol/render/canvas/ImageBuilder
 */ 

class $a65436dbf9f74536$var$CanvasImageBuilder extends (0, $4a55c8b0b7396ae3$export$2e2bcd8739ae039) {
    /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */ constructor(tolerance, maxExtent, resolution, pixelRatio){
        super(tolerance, maxExtent, resolution, pixelRatio);
        /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */ this.hitDetectionImage_ = null;
        /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */ this.image_ = null;
        /**
     * @private
     * @type {number|undefined}
     */ this.imagePixelRatio_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.anchorX_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.anchorY_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.height_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.opacity_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.originX_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.originY_ = undefined;
        /**
     * @private
     * @type {boolean|undefined}
     */ this.rotateWithView_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.rotation_ = undefined;
        /**
     * @private
     * @type {import("../../size.js").Size|undefined}
     */ this.scale_ = undefined;
        /**
     * @private
     * @type {number|undefined}
     */ this.width_ = undefined;
        /**
     * @private
     * @type {"declutter"|"obstacle"|"none"|undefined}
     */ this.declutterMode_ = undefined;
        /**
     * Data shared with a text builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */ this.declutterImageWithText_ = undefined;
    }
    /**
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} pointGeometry Point geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ drawPoint(pointGeometry, feature) {
        if (!this.image_) return;
        this.beginGeometry(pointGeometry, feature);
        const flatCoordinates = pointGeometry.getFlatCoordinates();
        const stride = pointGeometry.getStride();
        const myBegin = this.coordinates.length;
        const myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
        this.instructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_IMAGE,
            myBegin,
            myEnd,
            this.image_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_ * this.imagePixelRatio_,
            this.anchorY_ * this.imagePixelRatio_,
            Math.ceil(this.height_ * this.imagePixelRatio_),
            this.opacity_,
            this.originX_ * this.imagePixelRatio_,
            this.originY_ * this.imagePixelRatio_,
            this.rotateWithView_,
            this.rotation_,
            [
                this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
                this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
            ],
            Math.ceil(this.width_ * this.imagePixelRatio_),
            this.declutterMode_,
            this.declutterImageWithText_
        ]);
        this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_IMAGE,
            myBegin,
            myEnd,
            this.hitDetectionImage_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_,
            this.anchorY_,
            this.height_,
            this.opacity_,
            this.originX_,
            this.originY_,
            this.rotateWithView_,
            this.rotation_,
            this.scale_,
            this.width_,
            this.declutterMode_,
            this.declutterImageWithText_
        ]);
        this.endGeometry(feature);
    }
    /**
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ drawMultiPoint(multiPointGeometry, feature) {
        if (!this.image_) return;
        this.beginGeometry(multiPointGeometry, feature);
        const flatCoordinates = multiPointGeometry.getFlatCoordinates();
        const stride = multiPointGeometry.getStride();
        const myBegin = this.coordinates.length;
        const myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
        this.instructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_IMAGE,
            myBegin,
            myEnd,
            this.image_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_ * this.imagePixelRatio_,
            this.anchorY_ * this.imagePixelRatio_,
            Math.ceil(this.height_ * this.imagePixelRatio_),
            this.opacity_,
            this.originX_ * this.imagePixelRatio_,
            this.originY_ * this.imagePixelRatio_,
            this.rotateWithView_,
            this.rotation_,
            [
                this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
                this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
            ],
            Math.ceil(this.width_ * this.imagePixelRatio_),
            this.declutterMode_,
            this.declutterImageWithText_
        ]);
        this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_IMAGE,
            myBegin,
            myEnd,
            this.hitDetectionImage_,
            // Remaining arguments to DRAW_IMAGE are in alphabetical order
            this.anchorX_,
            this.anchorY_,
            this.height_,
            this.opacity_,
            this.originX_,
            this.originY_,
            this.rotateWithView_,
            this.rotation_,
            this.scale_,
            this.width_,
            this.declutterMode_,
            this.declutterImageWithText_
        ]);
        this.endGeometry(feature);
    }
    /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */ finish() {
        this.reverseHitDetectionInstructions();
        // FIXME this doesn't really protect us against further calls to draw*Geometry
        this.anchorX_ = undefined;
        this.anchorY_ = undefined;
        this.hitDetectionImage_ = null;
        this.image_ = null;
        this.imagePixelRatio_ = undefined;
        this.height_ = undefined;
        this.scale_ = undefined;
        this.opacity_ = undefined;
        this.originX_ = undefined;
        this.originY_ = undefined;
        this.rotateWithView_ = undefined;
        this.rotation_ = undefined;
        this.width_ = undefined;
        return super.finish();
    }
    /**
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @param {Object} [sharedData] Shared data.
   */ setImageStyle(imageStyle, sharedData) {
        const anchor = imageStyle.getAnchor();
        const size = imageStyle.getSize();
        const origin = imageStyle.getOrigin();
        this.imagePixelRatio_ = imageStyle.getPixelRatio(this.pixelRatio);
        this.anchorX_ = anchor[0];
        this.anchorY_ = anchor[1];
        this.hitDetectionImage_ = imageStyle.getHitDetectionImage();
        this.image_ = imageStyle.getImage(this.pixelRatio);
        this.height_ = size[1];
        this.opacity_ = imageStyle.getOpacity();
        this.originX_ = origin[0];
        this.originY_ = origin[1];
        this.rotateWithView_ = imageStyle.getRotateWithView();
        this.rotation_ = imageStyle.getRotation();
        this.scale_ = imageStyle.getScaleArray();
        this.width_ = size[0];
        this.declutterMode_ = imageStyle.getDeclutterMode();
        this.declutterImageWithText_ = sharedData;
    }
}
var $a65436dbf9f74536$export$2e2bcd8739ae039 = $a65436dbf9f74536$var$CanvasImageBuilder;


/**
 * @module ol/render/canvas/LineStringBuilder
 */ 


class $4422479217846b91$var$CanvasLineStringBuilder extends (0, $4a55c8b0b7396ae3$export$2e2bcd8739ae039) {
    /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */ constructor(tolerance, maxExtent, resolution, pixelRatio){
        super(tolerance, maxExtent, resolution, pixelRatio);
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} end.
   */ drawFlatCoordinates_(flatCoordinates, offset, end, stride) {
        const myBegin = this.coordinates.length;
        const myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, false, false);
        const moveToLineToInstruction = [
            (0, $3740963e6530651e$export$2e2bcd8739ae039).MOVE_TO_LINE_TO,
            myBegin,
            myEnd
        ];
        this.instructions.push(moveToLineToInstruction);
        this.hitDetectionInstructions.push(moveToLineToInstruction);
        return end;
    }
    /**
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ drawLineString(lineStringGeometry, feature) {
        const state = this.state;
        const strokeStyle = state.strokeStyle;
        const lineWidth = state.lineWidth;
        if (strokeStyle === undefined || lineWidth === undefined) return;
        this.updateStrokeStyle(state, this.applyStroke);
        this.beginGeometry(lineStringGeometry, feature);
        this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            (0, $ba06fcc662408736$export$e21b4112fdc612fc),
            (0, $ba06fcc662408736$export$e06efc2409049f76)
        ], (0, $3740963e6530651e$export$9f746cc58a899a00));
        const flatCoordinates = lineStringGeometry.getFlatCoordinates();
        const stride = lineStringGeometry.getStride();
        this.drawFlatCoordinates_(flatCoordinates, 0, flatCoordinates.length, stride);
        this.hitDetectionInstructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
        this.endGeometry(feature);
    }
    /**
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ drawMultiLineString(multiLineStringGeometry, feature) {
        const state = this.state;
        const strokeStyle = state.strokeStyle;
        const lineWidth = state.lineWidth;
        if (strokeStyle === undefined || lineWidth === undefined) return;
        this.updateStrokeStyle(state, this.applyStroke);
        this.beginGeometry(multiLineStringGeometry, feature);
        this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            state.lineDash,
            state.lineDashOffset
        ], (0, $3740963e6530651e$export$9f746cc58a899a00));
        const ends = multiLineStringGeometry.getEnds();
        const flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
        const stride = multiLineStringGeometry.getStride();
        let offset = 0;
        for(let i = 0, ii = ends.length; i < ii; ++i)offset = this.drawFlatCoordinates_(flatCoordinates, offset, /** @type {number} */ ends[i], stride);
        this.hitDetectionInstructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
        this.endGeometry(feature);
    }
    /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */ finish() {
        const state = this.state;
        if (state.lastStroke != undefined && state.lastStroke != this.coordinates.length) this.instructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
        this.reverseHitDetectionInstructions();
        this.state = null;
        return super.finish();
    }
    /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */ applyStroke(state) {
        if (state.lastStroke != undefined && state.lastStroke != this.coordinates.length) {
            this.instructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
            state.lastStroke = this.coordinates.length;
        }
        state.lastStroke = 0;
        super.applyStroke(state);
        this.instructions.push((0, $3740963e6530651e$export$9f746cc58a899a00));
    }
}
var $4422479217846b91$export$2e2bcd8739ae039 = $4422479217846b91$var$CanvasLineStringBuilder;


/**
 * @module ol/render/canvas/PolygonBuilder
 */ 



class $27e367cd1ce66907$var$CanvasPolygonBuilder extends (0, $4a55c8b0b7396ae3$export$2e2bcd8739ae039) {
    /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */ constructor(tolerance, maxExtent, resolution, pixelRatio){
        super(tolerance, maxExtent, resolution, pixelRatio);
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */ drawFlatCoordinatess_(flatCoordinates, offset, ends, stride) {
        const state = this.state;
        const fill = state.fillStyle !== undefined;
        const stroke = state.strokeStyle !== undefined;
        const numEnds = ends.length;
        this.instructions.push((0, $3740963e6530651e$export$9f746cc58a899a00));
        this.hitDetectionInstructions.push((0, $3740963e6530651e$export$9f746cc58a899a00));
        for(let i = 0; i < numEnds; ++i){
            const end = ends[i];
            const myBegin = this.coordinates.length;
            const myEnd = this.appendFlatLineCoordinates(flatCoordinates, offset, end, stride, true, !stroke);
            const moveToLineToInstruction = [
                (0, $3740963e6530651e$export$2e2bcd8739ae039).MOVE_TO_LINE_TO,
                myBegin,
                myEnd
            ];
            this.instructions.push(moveToLineToInstruction);
            this.hitDetectionInstructions.push(moveToLineToInstruction);
            if (stroke) {
                // Performance optimization: only call closePath() when we have a stroke.
                // Otherwise the ring is closed already (see appendFlatLineCoordinates above).
                this.instructions.push((0, $3740963e6530651e$export$89b10f327e413e71));
                this.hitDetectionInstructions.push((0, $3740963e6530651e$export$89b10f327e413e71));
            }
            offset = end;
        }
        if (fill) {
            this.instructions.push((0, $3740963e6530651e$export$f21891651e408226));
            this.hitDetectionInstructions.push((0, $3740963e6530651e$export$f21891651e408226));
        }
        if (stroke) {
            this.instructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
            this.hitDetectionInstructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
        }
        return offset;
    }
    /**
   * @param {import("../../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../../Feature.js").default} feature Feature.
   */ drawCircle(circleGeometry, feature) {
        const state = this.state;
        const fillStyle = state.fillStyle;
        const strokeStyle = state.strokeStyle;
        if (fillStyle === undefined && strokeStyle === undefined) return;
        this.setFillStrokeStyles_();
        this.beginGeometry(circleGeometry, feature);
        if (state.fillStyle !== undefined) this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_FILL_STYLE,
            (0, $ba06fcc662408736$export$c495d52ee3fd74b2)
        ]);
        if (state.strokeStyle !== undefined) this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            state.lineDash,
            state.lineDashOffset
        ]);
        const flatCoordinates = circleGeometry.getFlatCoordinates();
        const stride = circleGeometry.getStride();
        const myBegin = this.coordinates.length;
        this.appendFlatLineCoordinates(flatCoordinates, 0, flatCoordinates.length, stride, false, false);
        const circleInstruction = [
            (0, $3740963e6530651e$export$2e2bcd8739ae039).CIRCLE,
            myBegin
        ];
        this.instructions.push((0, $3740963e6530651e$export$9f746cc58a899a00), circleInstruction);
        this.hitDetectionInstructions.push((0, $3740963e6530651e$export$9f746cc58a899a00), circleInstruction);
        if (state.fillStyle !== undefined) {
            this.instructions.push((0, $3740963e6530651e$export$f21891651e408226));
            this.hitDetectionInstructions.push((0, $3740963e6530651e$export$f21891651e408226));
        }
        if (state.strokeStyle !== undefined) {
            this.instructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
            this.hitDetectionInstructions.push((0, $3740963e6530651e$export$7a98aa5364d62ba8));
        }
        this.endGeometry(feature);
    }
    /**
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ drawPolygon(polygonGeometry, feature) {
        const state = this.state;
        const fillStyle = state.fillStyle;
        const strokeStyle = state.strokeStyle;
        if (fillStyle === undefined && strokeStyle === undefined) return;
        this.setFillStrokeStyles_();
        this.beginGeometry(polygonGeometry, feature);
        if (state.fillStyle !== undefined) this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_FILL_STYLE,
            (0, $ba06fcc662408736$export$c495d52ee3fd74b2)
        ]);
        if (state.strokeStyle !== undefined) this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            state.lineDash,
            state.lineDashOffset
        ]);
        const ends = polygonGeometry.getEnds();
        const flatCoordinates = polygonGeometry.getOrientedFlatCoordinates();
        const stride = polygonGeometry.getStride();
        this.drawFlatCoordinatess_(flatCoordinates, 0, /** @type {Array<number>} */ ends, stride);
        this.endGeometry(feature);
    }
    /**
   * @param {import("../../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ drawMultiPolygon(multiPolygonGeometry, feature) {
        const state = this.state;
        const fillStyle = state.fillStyle;
        const strokeStyle = state.strokeStyle;
        if (fillStyle === undefined && strokeStyle === undefined) return;
        this.setFillStrokeStyles_();
        this.beginGeometry(multiPolygonGeometry, feature);
        if (state.fillStyle !== undefined) this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_FILL_STYLE,
            (0, $ba06fcc662408736$export$c495d52ee3fd74b2)
        ]);
        if (state.strokeStyle !== undefined) this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_STROKE_STYLE,
            state.strokeStyle,
            state.lineWidth,
            state.lineCap,
            state.lineJoin,
            state.miterLimit,
            state.lineDash,
            state.lineDashOffset
        ]);
        const endss = multiPolygonGeometry.getEndss();
        const flatCoordinates = multiPolygonGeometry.getOrientedFlatCoordinates();
        const stride = multiPolygonGeometry.getStride();
        let offset = 0;
        for(let i = 0, ii = endss.length; i < ii; ++i)offset = this.drawFlatCoordinatess_(flatCoordinates, offset, endss[i], stride);
        this.endGeometry(feature);
    }
    /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */ finish() {
        this.reverseHitDetectionInstructions();
        this.state = null;
        // We want to preserve topology when drawing polygons.  Polygons are
        // simplified using quantization and point elimination. However, we might
        // have received a mix of quantized and non-quantized geometries, so ensure
        // that all are quantized by quantizing all coordinates in the batch.
        const tolerance = this.tolerance;
        if (tolerance !== 0) {
            const coordinates = this.coordinates;
            for(let i = 0, ii = coordinates.length; i < ii; ++i)coordinates[i] = (0, $116cc918e3d500bf$export$51a0620f7a28532b)(coordinates[i], tolerance);
        }
        return super.finish();
    }
    /**
   * @private
   */ setFillStrokeStyles_() {
        const state = this.state;
        const fillStyle = state.fillStyle;
        if (fillStyle !== undefined) this.updateFillStyle(state, this.createFill);
        if (state.strokeStyle !== undefined) this.updateStrokeStyle(state, this.applyStroke);
    }
}
var $27e367cd1ce66907$export$2e2bcd8739ae039 = $27e367cd1ce66907$var$CanvasPolygonBuilder;


/**
 * @module ol/render/canvas/TextBuilder
 */ 






function $d571e35aa85e575b$export$f08272c6ff321e57(chunkLength, flatCoordinates, offset, end, stride) {
    const chunks = [];
    let cursor = offset;
    let chunkM = 0;
    let currentChunk = flatCoordinates.slice(offset, 2);
    while(chunkM < chunkLength && cursor + stride < end){
        const [x1, y1] = currentChunk.slice(-2);
        const x2 = flatCoordinates[cursor + stride];
        const y2 = flatCoordinates[cursor + stride + 1];
        const segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        chunkM += segmentLength;
        if (chunkM >= chunkLength) {
            const m = (chunkLength - chunkM + segmentLength) / segmentLength;
            const x = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(x1, x2, m);
            const y = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(y1, y2, m);
            currentChunk.push(x, y);
            chunks.push(currentChunk);
            currentChunk = [
                x,
                y
            ];
            if (chunkM == chunkLength) cursor += stride;
            chunkM = 0;
        } else if (chunkM < chunkLength) {
            currentChunk.push(flatCoordinates[cursor + stride], flatCoordinates[cursor + stride + 1]);
            cursor += stride;
        } else {
            const missing = segmentLength - chunkM;
            const x = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(x1, x2, missing / segmentLength);
            const y = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(y1, y2, missing / segmentLength);
            currentChunk.push(x, y);
            chunks.push(currentChunk);
            currentChunk = [
                x,
                y
            ];
            chunkM = 0;
            cursor += stride;
        }
    }
    if (chunkM > 0) chunks.push(currentChunk);
    return chunks;
}


/**
 * @module ol/geom/flat/straightchunk
 */ /**
 * @param {number} maxAngle Maximum acceptable angle delta between segments.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Array<number>} Start and end of the first suitable chunk of the
 * given `flatCoordinates`.
 */ function $c436695d76065293$export$ed6c897eea07a254(maxAngle, flatCoordinates, offset, end, stride) {
    let chunkStart = offset;
    let chunkEnd = offset;
    let chunkM = 0;
    let m = 0;
    let start = offset;
    let acos, i, m12, m23, x1, y1, x12, y12, x23, y23;
    for(i = offset; i < end; i += stride){
        const x2 = flatCoordinates[i];
        const y2 = flatCoordinates[i + 1];
        if (x1 !== undefined) {
            x23 = x2 - x1;
            y23 = y2 - y1;
            m23 = Math.sqrt(x23 * x23 + y23 * y23);
            if (x12 !== undefined) {
                m += m12;
                acos = Math.acos((x12 * x23 + y12 * y23) / (m12 * m23));
                if (acos > maxAngle) {
                    if (m > chunkM) {
                        chunkM = m;
                        chunkStart = start;
                        chunkEnd = i;
                    }
                    m = 0;
                    start = i - stride;
                }
            }
            m12 = m23;
            x12 = x23;
            y12 = y23;
        }
        x1 = x2;
        y1 = y2;
    }
    m += m23;
    return m > chunkM ? [
        start,
        i
    ] : [
        chunkStart,
        chunkEnd
    ];
}


const $72bb44c946c0e2ac$export$91a016276e4aee96 = {
    "left": 0,
    "end": 0,
    "center": 0.5,
    "right": 1,
    "start": 1,
    "top": 0,
    "middle": 0.5,
    "hanging": 0.2,
    "alphabetic": 0.8,
    "ideographic": 0.8,
    "bottom": 1
};
class $72bb44c946c0e2ac$var$CanvasTextBuilder extends (0, $4a55c8b0b7396ae3$export$2e2bcd8739ae039) {
    /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */ constructor(tolerance, maxExtent, resolution, pixelRatio){
        super(tolerance, maxExtent, resolution, pixelRatio);
        /**
     * @private
     * @type {Array<HTMLCanvasElement>}
     */ this.labels_ = null;
        /**
     * @private
     * @type {string|Array<string>}
     */ this.text_ = "";
        /**
     * @private
     * @type {number}
     */ this.textOffsetX_ = 0;
        /**
     * @private
     * @type {number}
     */ this.textOffsetY_ = 0;
        /**
     * @private
     * @type {boolean|undefined}
     */ this.textRotateWithView_ = undefined;
        /**
     * @private
     * @type {number}
     */ this.textRotation_ = 0;
        /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */ this.textFillState_ = null;
        /**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */ this.fillStates = {};
        /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */ this.textStrokeState_ = null;
        /**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */ this.strokeStates = {};
        /**
     * @private
     * @type {import("../canvas.js").TextState}
     */ this.textState_ = /** @type {import("../canvas.js").TextState} */ {};
        /**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */ this.textStates = {};
        /**
     * @private
     * @type {string}
     */ this.textKey_ = "";
        /**
     * @private
     * @type {string}
     */ this.fillKey_ = "";
        /**
     * @private
     * @type {string}
     */ this.strokeKey_ = "";
        /**
     * Data shared with an image builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */ this.declutterImageWithText_ = undefined;
    }
    /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */ finish() {
        const instructions = super.finish();
        instructions.textStates = this.textStates;
        instructions.fillStates = this.fillStates;
        instructions.strokeStates = this.strokeStates;
        return instructions;
    }
    /**
   * @param {import("../../geom/SimpleGeometry.js").default|import("../Feature.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */ drawText(geometry, feature) {
        const fillState = this.textFillState_;
        const strokeState = this.textStrokeState_;
        const textState = this.textState_;
        if (this.text_ === "" || !textState || !fillState && !strokeState) return;
        const coordinates = this.coordinates;
        let begin = coordinates.length;
        const geometryType = geometry.getType();
        let flatCoordinates = null;
        let stride = geometry.getStride();
        if (textState.placement === "line" && (geometryType == "LineString" || geometryType == "MultiLineString" || geometryType == "Polygon" || geometryType == "MultiPolygon")) {
            if (!(0, $84be800ca44e672c$export$7b0a31e10bbff018)(this.getBufferedMaxExtent(), geometry.getExtent())) return;
            let ends;
            flatCoordinates = geometry.getFlatCoordinates();
            if (geometryType == "LineString") ends = [
                flatCoordinates.length
            ];
            else if (geometryType == "MultiLineString") ends = /** @type {import("../../geom/MultiLineString.js").default} */ geometry.getEnds();
            else if (geometryType == "Polygon") ends = /** @type {import("../../geom/Polygon.js").default} */ geometry.getEnds().slice(0, 1);
            else if (geometryType == "MultiPolygon") {
                const endss = /** @type {import("../../geom/MultiPolygon.js").default} */ geometry.getEndss();
                ends = [];
                for(let i = 0, ii = endss.length; i < ii; ++i)ends.push(endss[i][0]);
            }
            this.beginGeometry(geometry, feature);
            const repeat = textState.repeat;
            const textAlign = repeat ? undefined : textState.textAlign;
            // No `justify` support for line placement.
            let flatOffset = 0;
            for(let o = 0, oo = ends.length; o < oo; ++o){
                let chunks;
                if (repeat) chunks = (0, $d571e35aa85e575b$export$f08272c6ff321e57)(repeat * this.resolution, flatCoordinates, flatOffset, ends[o], stride);
                else chunks = [
                    flatCoordinates.slice(flatOffset, ends[o])
                ];
                for(let c = 0, cc = chunks.length; c < cc; ++c){
                    const chunk = chunks[c];
                    let chunkBegin = 0;
                    let chunkEnd = chunk.length;
                    if (textAlign == undefined) {
                        const range = (0, $c436695d76065293$export$ed6c897eea07a254)(textState.maxAngle, chunk, 0, chunk.length, 2);
                        chunkBegin = range[0];
                        chunkEnd = range[1];
                    }
                    for(let i = chunkBegin; i < chunkEnd; i += stride)coordinates.push(chunk[i], chunk[i + 1]);
                    const end = coordinates.length;
                    flatOffset = ends[o];
                    this.drawChars_(begin, end);
                    begin = end;
                }
            }
            this.endGeometry(feature);
        } else {
            let geometryWidths = textState.overflow ? null : [];
            switch(geometryType){
                case "Point":
                case "MultiPoint":
                    flatCoordinates = /** @type {import("../../geom/MultiPoint.js").default} */ geometry.getFlatCoordinates();
                    break;
                case "LineString":
                    flatCoordinates = /** @type {import("../../geom/LineString.js").default} */ geometry.getFlatMidpoint();
                    break;
                case "Circle":
                    flatCoordinates = /** @type {import("../../geom/Circle.js").default} */ geometry.getCenter();
                    break;
                case "MultiLineString":
                    flatCoordinates = /** @type {import("../../geom/MultiLineString.js").default} */ geometry.getFlatMidpoints();
                    stride = 2;
                    break;
                case "Polygon":
                    flatCoordinates = /** @type {import("../../geom/Polygon.js").default} */ geometry.getFlatInteriorPoint();
                    if (!textState.overflow) geometryWidths.push(flatCoordinates[2] / this.resolution);
                    stride = 3;
                    break;
                case "MultiPolygon":
                    const interiorPoints = /** @type {import("../../geom/MultiPolygon.js").default} */ geometry.getFlatInteriorPoints();
                    flatCoordinates = [];
                    for(let i = 0, ii = interiorPoints.length; i < ii; i += 3){
                        if (!textState.overflow) geometryWidths.push(interiorPoints[i + 2] / this.resolution);
                        flatCoordinates.push(interiorPoints[i], interiorPoints[i + 1]);
                    }
                    if (flatCoordinates.length === 0) return;
                    stride = 2;
                    break;
                default:
            }
            const end = this.appendFlatPointCoordinates(flatCoordinates, stride);
            if (end === begin) return;
            if (geometryWidths && (end - begin) / 2 !== flatCoordinates.length / stride) {
                let beg = begin / 2;
                geometryWidths = geometryWidths.filter((w, i)=>{
                    const keep = coordinates[(beg + i) * 2] === flatCoordinates[i * stride] && coordinates[(beg + i) * 2 + 1] === flatCoordinates[i * stride + 1];
                    if (!keep) --beg;
                    return keep;
                });
            }
            this.saveTextStates_();
            if (textState.backgroundFill || textState.backgroundStroke) {
                this.setFillStrokeStyle(textState.backgroundFill, textState.backgroundStroke);
                if (textState.backgroundFill) {
                    this.updateFillStyle(this.state, this.createFill);
                    this.hitDetectionInstructions.push(this.createFill(this.state));
                }
                if (textState.backgroundStroke) {
                    this.updateStrokeStyle(this.state, this.applyStroke);
                    this.hitDetectionInstructions.push(this.createStroke(this.state));
                }
            }
            this.beginGeometry(geometry, feature);
            // adjust padding for negative scale
            let padding = textState.padding;
            if (padding != (0, $ba06fcc662408736$export$40a9eeef55665a40) && (textState.scale[0] < 0 || textState.scale[1] < 0)) {
                let p0 = textState.padding[0];
                let p1 = textState.padding[1];
                let p2 = textState.padding[2];
                let p3 = textState.padding[3];
                if (textState.scale[0] < 0) {
                    p1 = -p1;
                    p3 = -p3;
                }
                if (textState.scale[1] < 0) {
                    p0 = -p0;
                    p2 = -p2;
                }
                padding = [
                    p0,
                    p1,
                    p2,
                    p3
                ];
            }
            // The image is unknown at this stage so we pass null; it will be computed at render time.
            // For clarity, we pass NaN for offsetX, offsetY, width and height, which will be computed at
            // render time.
            const pixelRatio = this.pixelRatio;
            this.instructions.push([
                (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_IMAGE,
                begin,
                end,
                null,
                NaN,
                NaN,
                NaN,
                1,
                0,
                0,
                this.textRotateWithView_,
                this.textRotation_,
                [
                    1,
                    1
                ],
                NaN,
                undefined,
                this.declutterImageWithText_,
                padding == (0, $ba06fcc662408736$export$40a9eeef55665a40) ? (0, $ba06fcc662408736$export$40a9eeef55665a40) : padding.map(function(p) {
                    return p * pixelRatio;
                }),
                !!textState.backgroundFill,
                !!textState.backgroundStroke,
                this.text_,
                this.textKey_,
                this.strokeKey_,
                this.fillKey_,
                this.textOffsetX_,
                this.textOffsetY_,
                geometryWidths
            ]);
            const scale = 1 / pixelRatio;
            this.hitDetectionInstructions.push([
                (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_IMAGE,
                begin,
                end,
                null,
                NaN,
                NaN,
                NaN,
                1,
                0,
                0,
                this.textRotateWithView_,
                this.textRotation_,
                [
                    scale,
                    scale
                ],
                NaN,
                undefined,
                this.declutterImageWithText_,
                padding,
                !!textState.backgroundFill,
                !!textState.backgroundStroke,
                this.text_,
                this.textKey_,
                this.strokeKey_,
                this.fillKey_,
                this.textOffsetX_,
                this.textOffsetY_,
                geometryWidths
            ]);
            this.endGeometry(feature);
        }
    }
    /**
   * @private
   */ saveTextStates_() {
        const strokeState = this.textStrokeState_;
        const textState = this.textState_;
        const fillState = this.textFillState_;
        const strokeKey = this.strokeKey_;
        if (strokeState) {
            if (!(strokeKey in this.strokeStates)) this.strokeStates[strokeKey] = {
                strokeStyle: strokeState.strokeStyle,
                lineCap: strokeState.lineCap,
                lineDashOffset: strokeState.lineDashOffset,
                lineWidth: strokeState.lineWidth,
                lineJoin: strokeState.lineJoin,
                miterLimit: strokeState.miterLimit,
                lineDash: strokeState.lineDash
            };
        }
        const textKey = this.textKey_;
        if (!(textKey in this.textStates)) this.textStates[textKey] = {
            font: textState.font,
            textAlign: textState.textAlign || (0, $ba06fcc662408736$export$94d53b95641b5766),
            justify: textState.justify,
            textBaseline: textState.textBaseline || (0, $ba06fcc662408736$export$cf2279a1bff62eb),
            scale: textState.scale
        };
        const fillKey = this.fillKey_;
        if (fillState) {
            if (!(fillKey in this.fillStates)) this.fillStates[fillKey] = {
                fillStyle: fillState.fillStyle
            };
        }
    }
    /**
   * @private
   * @param {number} begin Begin.
   * @param {number} end End.
   */ drawChars_(begin, end) {
        const strokeState = this.textStrokeState_;
        const textState = this.textState_;
        const strokeKey = this.strokeKey_;
        const textKey = this.textKey_;
        const fillKey = this.fillKey_;
        this.saveTextStates_();
        const pixelRatio = this.pixelRatio;
        const baseline = $72bb44c946c0e2ac$export$91a016276e4aee96[textState.textBaseline];
        const offsetY = this.textOffsetY_ * pixelRatio;
        const text = this.text_;
        const strokeWidth = strokeState ? strokeState.lineWidth * Math.abs(textState.scale[0]) / 2 : 0;
        this.instructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_CHARS,
            begin,
            end,
            baseline,
            textState.overflow,
            fillKey,
            textState.maxAngle,
            pixelRatio,
            offsetY,
            strokeKey,
            strokeWidth * pixelRatio,
            text,
            textKey,
            1
        ]);
        this.hitDetectionInstructions.push([
            (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_CHARS,
            begin,
            end,
            baseline,
            textState.overflow,
            fillKey,
            textState.maxAngle,
            1,
            offsetY,
            strokeKey,
            strokeWidth,
            text,
            textKey,
            1 / pixelRatio
        ]);
    }
    /**
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @param {Object} [sharedData] Shared data.
   */ setTextStyle(textStyle, sharedData) {
        let textState, fillState, strokeState;
        if (!textStyle) this.text_ = "";
        else {
            const textFillStyle = textStyle.getFill();
            if (!textFillStyle) {
                fillState = null;
                this.textFillState_ = fillState;
            } else {
                fillState = this.textFillState_;
                if (!fillState) {
                    fillState = /** @type {import("../canvas.js").FillState} */ {};
                    this.textFillState_ = fillState;
                }
                fillState.fillStyle = (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(textFillStyle.getColor() || (0, $ba06fcc662408736$export$c495d52ee3fd74b2));
            }
            const textStrokeStyle = textStyle.getStroke();
            if (!textStrokeStyle) {
                strokeState = null;
                this.textStrokeState_ = strokeState;
            } else {
                strokeState = this.textStrokeState_;
                if (!strokeState) {
                    strokeState = /** @type {import("../canvas.js").StrokeState} */ {};
                    this.textStrokeState_ = strokeState;
                }
                const lineDash = textStrokeStyle.getLineDash();
                const lineDashOffset = textStrokeStyle.getLineDashOffset();
                const lineWidth = textStrokeStyle.getWidth();
                const miterLimit = textStrokeStyle.getMiterLimit();
                strokeState.lineCap = textStrokeStyle.getLineCap() || (0, $ba06fcc662408736$export$17bd0c38d6ae694e);
                strokeState.lineDash = lineDash ? lineDash.slice() : (0, $ba06fcc662408736$export$e21b4112fdc612fc);
                strokeState.lineDashOffset = lineDashOffset === undefined ? (0, $ba06fcc662408736$export$e06efc2409049f76) : lineDashOffset;
                strokeState.lineJoin = textStrokeStyle.getLineJoin() || (0, $ba06fcc662408736$export$365eb9648cf19bd0);
                strokeState.lineWidth = lineWidth === undefined ? (0, $ba06fcc662408736$export$79661f132c62010e) : lineWidth;
                strokeState.miterLimit = miterLimit === undefined ? (0, $ba06fcc662408736$export$80c1c01844597b7b) : miterLimit;
                strokeState.strokeStyle = (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(textStrokeStyle.getColor() || (0, $ba06fcc662408736$export$1eb2eaecacf2031e));
            }
            textState = this.textState_;
            const font = textStyle.getFont() || (0, $ba06fcc662408736$export$3847dfea4f8d4dfa);
            (0, $ba06fcc662408736$export$a534074a28fa87ff)(font);
            const textScale = textStyle.getScaleArray();
            textState.overflow = textStyle.getOverflow();
            textState.font = font;
            textState.maxAngle = textStyle.getMaxAngle();
            textState.placement = textStyle.getPlacement();
            textState.textAlign = textStyle.getTextAlign();
            textState.repeat = textStyle.getRepeat();
            textState.justify = textStyle.getJustify();
            textState.textBaseline = textStyle.getTextBaseline() || (0, $ba06fcc662408736$export$cf2279a1bff62eb);
            textState.backgroundFill = textStyle.getBackgroundFill();
            textState.backgroundStroke = textStyle.getBackgroundStroke();
            textState.padding = textStyle.getPadding() || (0, $ba06fcc662408736$export$40a9eeef55665a40);
            textState.scale = textScale === undefined ? [
                1,
                1
            ] : textScale;
            const textOffsetX = textStyle.getOffsetX();
            const textOffsetY = textStyle.getOffsetY();
            const textRotateWithView = textStyle.getRotateWithView();
            const textRotation = textStyle.getRotation();
            this.text_ = textStyle.getText() || "";
            this.textOffsetX_ = textOffsetX === undefined ? 0 : textOffsetX;
            this.textOffsetY_ = textOffsetY === undefined ? 0 : textOffsetY;
            this.textRotateWithView_ = textRotateWithView === undefined ? false : textRotateWithView;
            this.textRotation_ = textRotation === undefined ? 0 : textRotation;
            this.strokeKey_ = strokeState ? (typeof strokeState.strokeStyle == "string" ? strokeState.strokeStyle : (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(strokeState.strokeStyle)) + strokeState.lineCap + strokeState.lineDashOffset + "|" + strokeState.lineWidth + strokeState.lineJoin + strokeState.miterLimit + "[" + strokeState.lineDash.join() + "]" : "";
            this.textKey_ = textState.font + textState.scale + (textState.textAlign || "?") + (textState.repeat || "?") + (textState.justify || "?") + (textState.textBaseline || "?");
            this.fillKey_ = fillState ? typeof fillState.fillStyle == "string" ? fillState.fillStyle : "|" + (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(fillState.fillStyle) : "";
        }
        this.declutterImageWithText_ = sharedData;
    }
}
var $72bb44c946c0e2ac$export$2e2bcd8739ae039 = $72bb44c946c0e2ac$var$CanvasTextBuilder;


/**
 * @type {Object<import("../canvas.js").BuilderType, typeof Builder>}
 */ const $0b299ddc8624c50d$var$BATCH_CONSTRUCTORS = {
    "Circle": (0, $27e367cd1ce66907$export$2e2bcd8739ae039),
    "Default": (0, $4a55c8b0b7396ae3$export$2e2bcd8739ae039),
    "Image": (0, $a65436dbf9f74536$export$2e2bcd8739ae039),
    "LineString": (0, $4422479217846b91$export$2e2bcd8739ae039),
    "Polygon": (0, $27e367cd1ce66907$export$2e2bcd8739ae039),
    "Text": (0, $72bb44c946c0e2ac$export$2e2bcd8739ae039)
};
class $0b299ddc8624c50d$var$BuilderGroup {
    /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Max extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */ constructor(tolerance, maxExtent, resolution, pixelRatio){
        /**
     * @private
     * @type {number}
     */ this.tolerance_ = tolerance;
        /**
     * @private
     * @type {import("../../extent.js").Extent}
     */ this.maxExtent_ = maxExtent;
        /**
     * @private
     * @type {number}
     */ this.pixelRatio_ = pixelRatio;
        /**
     * @private
     * @type {number}
     */ this.resolution_ = resolution;
        /**
     * @private
     * @type {!Object<string, !Object<import("../canvas.js").BuilderType, Builder>>}
     */ this.buildersByZIndex_ = {};
    }
    /**
   * @return {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Builder.js").SerializableInstructions>>} The serializable instructions
   */ finish() {
        const builderInstructions = {};
        for(const zKey in this.buildersByZIndex_){
            builderInstructions[zKey] = builderInstructions[zKey] || {};
            const builders = this.buildersByZIndex_[zKey];
            for(const builderKey in builders){
                const builderInstruction = builders[builderKey].finish();
                builderInstructions[zKey][builderKey] = builderInstruction;
            }
        }
        return builderInstructions;
    }
    /**
   * @param {number|undefined} zIndex Z index.
   * @param {import("../canvas.js").BuilderType} builderType Replay type.
   * @return {import("../VectorContext.js").default} Replay.
   */ getBuilder(zIndex, builderType) {
        const zIndexKey = zIndex !== undefined ? zIndex.toString() : "0";
        let replays = this.buildersByZIndex_[zIndexKey];
        if (replays === undefined) {
            replays = {};
            this.buildersByZIndex_[zIndexKey] = replays;
        }
        let replay = replays[builderType];
        if (replay === undefined) {
            const Constructor = $0b299ddc8624c50d$var$BATCH_CONSTRUCTORS[builderType];
            replay = new Constructor(this.tolerance_, this.maxExtent_, this.resolution_, this.pixelRatio_);
            replays[builderType] = replay;
        }
        return replay;
    }
}
var $0b299ddc8624c50d$export$2e2bcd8739ae039 = $0b299ddc8624c50d$var$BuilderGroup;


/**
 * @module ol/renderer/canvas/Layer
 */ /**
 * @module ol/renderer/Layer
 */ 



/**
 * @template {import("../layer/Layer.js").default} LayerType
 */ class $c9deccad5a9c4bd6$var$LayerRenderer extends (0, $0a5ecae53e50aa57$export$2e2bcd8739ae039) {
    /**
   * @param {LayerType} layer Layer.
   */ constructor(layer){
        super();
        /**
     * The renderer is initialized and ready to render.
     * @type {boolean}
     */ this.ready = true;
        /** @private */ this.boundHandleImageChange_ = this.handleImageChange_.bind(this);
        /**
     * @protected
     * @type {LayerType}
     */ this.layer_ = layer;
        /**
     * @type {import("../render/canvas/ExecutorGroup").default}
     */ this.declutterExecutorGroup = null;
    }
    /**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */ getFeatures(pixel) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */ getData(pixel) {
        return null;
    }
    /**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */ prepareFrame(frameState) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Render the layer.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */ renderFrame(frameState, target) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */ loadedTileCallback(tiles, zoom, tile) {
        if (!tiles[zoom]) tiles[zoom] = {};
        tiles[zoom][tile.tileCoord.toString()] = tile;
        return undefined;
    }
    /**
   * Create a function that adds loaded tiles to the tile lookup.
   * @param {import("../source/Tile.js").default} source Tile source.
   * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
   *     called with a zoom level and a tile range to add loaded tiles to the lookup.
   * @protected
   */ createLoadedTileFinder(source, projection, tiles) {
        return(/**
       * @param {number} zoom Zoom level.
       * @param {import("../TileRange.js").default} tileRange Tile range.
       * @return {boolean} The tile range is fully loaded.
       */ (zoom, tileRange)=>{
            const callback = this.loadedTileCallback.bind(this, tiles, zoom);
            return source.forEachLoadedTile(projection, zoom, tileRange, callback);
        });
    }
    /**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */ forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
        return undefined;
    }
    /**
   * @return {LayerType} Layer.
   */ getLayer() {
        return this.layer_;
    }
    /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */ handleFontsChanged() {}
    /**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */ handleImageChange_(event) {
        const image = /** @type {import("../Image.js").default} */ event.target;
        if (image.getState() === (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED) this.renderIfReadyAndVisible();
    }
    /**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../ImageBase.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */ loadImage(image) {
        let imageState = image.getState();
        if (imageState != (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED && imageState != (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).ERROR) image.addEventListener((0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, this.boundHandleImageChange_);
        if (imageState == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).IDLE) {
            image.load();
            imageState = image.getState();
        }
        return imageState == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED;
    }
    /**
   * @protected
   */ renderIfReadyAndVisible() {
        const layer = this.getLayer();
        if (layer && layer.getVisible() && layer.getSourceState() === "ready") layer.changed();
    }
    /**
   * Clean up.
   */ disposeInternal() {
        delete this.layer_;
        super.disposeInternal();
    }
}
var $c9deccad5a9c4bd6$export$2e2bcd8739ae039 = $c9deccad5a9c4bd6$var$LayerRenderer;


/**
 * @module ol/render/Event
 */ 
class $b9deb9d8bf8584f6$var$RenderEvent extends (0, $f22c10e3757627da$export$2e2bcd8739ae039) {
    /**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../Map.js").FrameState} [frameState] Frame state.
   * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
   */ constructor(type, inversePixelTransform, frameState, context){
        super(type);
        /**
     * Transform from CSS pixels (relative to the top-left corner of the map viewport)
     * to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
     * @type {import("../transform.js").Transform|undefined}
     * @api
     */ this.inversePixelTransform = inversePixelTransform;
        /**
     * An object representing the current render frame state.
     * @type {import("../Map.js").FrameState|undefined}
     * @api
     */ this.frameState = frameState;
        /**
     * Canvas context. Not available when the event is dispatched by the map. For Canvas 2D layers,
     * the context will be the 2D rendering context.  For WebGL layers, the context will be the WebGL
     * context.
     * @type {CanvasRenderingContext2D|WebGLRenderingContext|undefined}
     * @api
     */ this.context = context;
    }
}
var $b9deb9d8bf8584f6$export$2e2bcd8739ae039 = $b9deb9d8bf8584f6$var$RenderEvent;








const $df04b1ef9f892809$export$a166f0857c555517 = [];
/**
 * @type {CanvasRenderingContext2D}
 */ let $df04b1ef9f892809$var$pixelContext = null;
function $df04b1ef9f892809$var$createPixelContext() {
    $df04b1ef9f892809$var$pixelContext = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(1, 1, undefined, {
        willReadFrequently: true
    });
}
/**
 * @abstract
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */ class $df04b1ef9f892809$var$CanvasLayerRenderer extends (0, $c9deccad5a9c4bd6$export$2e2bcd8739ae039) {
    /**
   * @param {LayerType} layer Layer.
   */ constructor(layer){
        super(layer);
        /**
     * @protected
     * @type {HTMLElement}
     */ this.container = null;
        /**
     * @protected
     * @type {number}
     */ this.renderedResolution;
        /**
     * A temporary transform.  The values in this transform should only be used in a
     * function that sets the values.
     * @protected
     * @type {import("../../transform.js").Transform}
     */ this.tempTransform = (0, $d59a735b25ae191a$export$185802fd694ee1f5)();
        /**
     * The transform for rendered pixels to viewport CSS pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */ this.pixelTransform = (0, $d59a735b25ae191a$export$185802fd694ee1f5)();
        /**
     * The transform for viewport CSS pixels to rendered pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */ this.inversePixelTransform = (0, $d59a735b25ae191a$export$185802fd694ee1f5)();
        /**
     * @type {CanvasRenderingContext2D}
     */ this.context = null;
        /**
     * @type {boolean}
     */ this.containerReused = false;
        /**
     * @private
     * @type {CanvasRenderingContext2D}
     */ this.pixelContext_ = null;
        /**
     * @protected
     * @type {import("../../Map.js").FrameState|null}
     */ this.frameState = null;
    }
    /**
   * @param {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} image Image.
   * @param {number} col The column index.
   * @param {number} row The row index.
   * @return {Uint8ClampedArray|null} The image data.
   */ getImageData(image, col, row) {
        if (!$df04b1ef9f892809$var$pixelContext) $df04b1ef9f892809$var$createPixelContext();
        $df04b1ef9f892809$var$pixelContext.clearRect(0, 0, 1, 1);
        let data;
        try {
            $df04b1ef9f892809$var$pixelContext.drawImage(image, col, row, 1, 1, 0, 0, 1, 1);
            data = $df04b1ef9f892809$var$pixelContext.getImageData(0, 0, 1, 1).data;
        } catch (err) {
            $df04b1ef9f892809$var$pixelContext = null;
            return null;
        }
        return data;
    }
    /**
   * @param {import('../../Map.js').FrameState} frameState Frame state.
   * @return {string} Background color.
   */ getBackground(frameState) {
        const layer = this.getLayer();
        let background = layer.getBackground();
        if (typeof background === "function") background = background(frameState.viewState.resolution);
        return background || undefined;
    }
    /**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {string} [backgroundColor] Background color.
   */ useContainer(target, transform, backgroundColor) {
        const layerClassName = this.getLayer().getClassName();
        let container, context;
        if (target && target.className === layerClassName && (!backgroundColor || target && target.style.backgroundColor && (0, $69c1cc8ae30f997f$export$e9bab7fafb253603)((0, $d32b89243a698e8b$export$75093a47a9fa838d)(target.style.backgroundColor), (0, $d32b89243a698e8b$export$75093a47a9fa838d)(backgroundColor)))) {
            const canvas = target.firstElementChild;
            if (canvas instanceof HTMLCanvasElement) context = canvas.getContext("2d");
        }
        if (context && context.canvas.style.transform === transform) {
            // Container of the previous layer renderer can be used.
            this.container = target;
            this.context = context;
            this.containerReused = true;
        } else if (this.containerReused) {
            // Previously reused container cannot be used any more.
            this.container = null;
            this.context = null;
            this.containerReused = false;
        }
        if (!this.container) {
            container = document.createElement("div");
            container.className = layerClassName;
            let style = container.style;
            style.position = "absolute";
            style.width = "100%";
            style.height = "100%";
            context = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)();
            const canvas = context.canvas;
            container.appendChild(canvas);
            style = canvas.style;
            style.position = "absolute";
            style.left = "0";
            style.transformOrigin = "top left";
            this.container = container;
            this.context = context;
        }
        if (!this.containerReused && backgroundColor && !this.container.style.backgroundColor) this.container.style.backgroundColor = backgroundColor;
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */ clipUnrotated(context, frameState, extent) {
        const topLeft = (0, $84be800ca44e672c$export$cb1538b07e6964ff)(extent);
        const topRight = (0, $84be800ca44e672c$export$b84fa077c8b05295)(extent);
        const bottomRight = (0, $84be800ca44e672c$export$e77c1cf70445e168)(extent);
        const bottomLeft = (0, $84be800ca44e672c$export$8d09f5e2e1bf560d)(extent);
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(frameState.coordinateToPixelTransform, topLeft);
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(frameState.coordinateToPixelTransform, topRight);
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(frameState.coordinateToPixelTransform, bottomRight);
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(frameState.coordinateToPixelTransform, bottomLeft);
        const inverted = this.inversePixelTransform;
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(inverted, topLeft);
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(inverted, topRight);
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(inverted, bottomRight);
        (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(inverted, bottomLeft);
        context.save();
        context.beginPath();
        context.moveTo(Math.round(topLeft[0]), Math.round(topLeft[1]));
        context.lineTo(Math.round(topRight[0]), Math.round(topRight[1]));
        context.lineTo(Math.round(bottomRight[0]), Math.round(bottomRight[1]));
        context.lineTo(Math.round(bottomLeft[0]), Math.round(bottomLeft[1]));
        context.clip();
    }
    /**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @private
   */ dispatchRenderEvent_(type, context, frameState) {
        const layer = this.getLayer();
        if (layer.hasListener(type)) {
            const event = new (0, $b9deb9d8bf8584f6$export$2e2bcd8739ae039)(type, this.inversePixelTransform, frameState, context);
            layer.dispatchEvent(event);
        }
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */ preRender(context, frameState) {
        this.frameState = frameState;
        this.dispatchRenderEvent_((0, $4585eb82aab12670$export$2e2bcd8739ae039).PRERENDER, context, frameState);
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */ postRender(context, frameState) {
        this.dispatchRenderEvent_((0, $4585eb82aab12670$export$2e2bcd8739ae039).POSTRENDER, context, frameState);
    }
    /**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */ getRenderTransform(center, resolution, rotation, pixelRatio, width, height, offsetX) {
        const dx1 = width / 2;
        const dy1 = height / 2;
        const sx = pixelRatio / resolution;
        const sy = -sx;
        const dx2 = -center[0] + offsetX;
        const dy2 = -center[1];
        return (0, $d59a735b25ae191a$export$f672e0b6f7222cd7)(this.tempTransform, dx1, dy1, sx, sy, -rotation, dx2, dy2);
    }
    /**
   * Clean up.
   */ disposeInternal() {
        delete this.frameState;
        super.disposeInternal();
    }
}
var $df04b1ef9f892809$export$2e2bcd8739ae039 = $df04b1ef9f892809$var$CanvasLayerRenderer;


/**
 * @module ol/render/canvas/ExecutorGroup
 */ /**
 * @module ol/render/canvas/Executor
 */ 




/**
 * @module ol/geom/flat/textpath
 */ 

function $6a798d3c1cf17469$export$153a9a17ab3e949f(flatCoordinates, offset, end, stride, text, startM, maxAngle, scale, measureAndCacheTextWidth, font, cache, rotation) {
    let x2 = flatCoordinates[offset];
    let y2 = flatCoordinates[offset + 1];
    let x1 = 0;
    let y1 = 0;
    let segmentLength = 0;
    let segmentM = 0;
    function advance() {
        x1 = x2;
        y1 = y2;
        offset += stride;
        x2 = flatCoordinates[offset];
        y2 = flatCoordinates[offset + 1];
        segmentM += segmentLength;
        segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    do advance();
    while (offset < end - stride && segmentM + segmentLength < startM);
    let interpolate = segmentLength === 0 ? 0 : (startM - segmentM) / segmentLength;
    const beginX = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(x1, x2, interpolate);
    const beginY = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(y1, y2, interpolate);
    const startOffset = offset - stride;
    const startLength = segmentM;
    const endM = startM + scale * measureAndCacheTextWidth(font, text, cache);
    while(offset < end - stride && segmentM + segmentLength < endM)advance();
    interpolate = segmentLength === 0 ? 0 : (endM - segmentM) / segmentLength;
    const endX = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(x1, x2, interpolate);
    const endY = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(y1, y2, interpolate);
    // Keep text upright
    let reverse;
    if (rotation) {
        const flat = [
            beginX,
            beginY,
            endX,
            endY
        ];
        (0, $9a4105a6a338adf4$export$bb628a54ab399bc9)(flat, 0, 4, 2, rotation, flat, flat);
        reverse = flat[0] > flat[2];
    } else reverse = beginX > endX;
    const PI = Math.PI;
    const result = [];
    const singleSegment = startOffset + stride === offset;
    offset = startOffset;
    segmentLength = 0;
    segmentM = startLength;
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];
    let previousAngle;
    // All on the same segment
    if (singleSegment) {
        advance();
        previousAngle = Math.atan2(y2 - y1, x2 - x1);
        if (reverse) previousAngle += previousAngle > 0 ? -PI : PI;
        const x = (endX + beginX) / 2;
        const y = (endY + beginY) / 2;
        result[0] = [
            x,
            y,
            (endM - startM) / 2,
            previousAngle,
            text
        ];
        return result;
    }
    // rendering across line segments
    text = text.replace(/\n/g, " "); // ensure rendering in single-line as all calculations below don't handle multi-lines
    for(let i = 0, ii = text.length; i < ii;){
        advance();
        let angle = Math.atan2(y2 - y1, x2 - x1);
        if (reverse) angle += angle > 0 ? -PI : PI;
        if (previousAngle !== undefined) {
            let delta = angle - previousAngle;
            delta += delta > PI ? -2 * PI : delta < -PI ? 2 * PI : 0;
            if (Math.abs(delta) > maxAngle) return null;
        }
        previousAngle = angle;
        const iStart = i;
        let charLength = 0;
        for(; i < ii; ++i){
            const index = reverse ? ii - i - 1 : i;
            const len = scale * measureAndCacheTextWidth(font, text[index], cache);
            if (offset + stride < end && segmentM + segmentLength < startM + charLength + len / 2) break;
            charLength += len;
        }
        if (i === iStart) continue;
        const chars = reverse ? text.substring(ii - iStart, ii - i) : text.substring(iStart, i);
        interpolate = segmentLength === 0 ? 0 : (startM + charLength / 2 - segmentM) / segmentLength;
        const x = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(x1, x2, interpolate);
        const y = (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(y1, y2, interpolate);
        result.push([
            x,
            y,
            charLength / 2,
            angle,
            chars
        ]);
        startM += charLength;
    }
    return result;
}



/**
 * @module ol/geom/flat/length
 */ /**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Length.
 */ function $9d37b56b1e11868f$export$153f8c6b4d8caebc(flatCoordinates, offset, end, stride) {
    let x1 = flatCoordinates[offset];
    let y1 = flatCoordinates[offset + 1];
    let length = 0;
    for(let i = offset + stride; i < end; i += stride){
        const x2 = flatCoordinates[i];
        const y2 = flatCoordinates[i + 1];
        length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        x1 = x2;
        y1 = y2;
    }
    return length;
}
function $9d37b56b1e11868f$export$2bbb4f6f727a75c2(flatCoordinates, offset, end, stride) {
    let perimeter = $9d37b56b1e11868f$export$153f8c6b4d8caebc(flatCoordinates, offset, end, stride);
    const dx = flatCoordinates[end - stride] - flatCoordinates[offset];
    const dy = flatCoordinates[end - stride + 1] - flatCoordinates[offset + 1];
    perimeter += Math.sqrt(dx * dx + dy * dy);
    return perimeter;
}



/**
 * @typedef {Object} BBox
 * @property {number} minX Minimal x.
 * @property {number} minY Minimal y.
 * @property {number} maxX Maximal x.
 * @property {number} maxY Maximal y
 * @property {*} value Value.
 */ /**
 * @typedef {Object} ImageOrLabelDimensions
 * @property {number} drawImageX DrawImageX.
 * @property {number} drawImageY DrawImageY.
 * @property {number} drawImageW DrawImageW.
 * @property {number} drawImageH DrawImageH.
 * @property {number} originX OriginX.
 * @property {number} originY OriginY.
 * @property {Array<number>} scale Scale.
 * @property {BBox} declutterBox DeclutterBox.
 * @property {import("../../transform.js").Transform} canvasTransform CanvasTransform.
 */ /**
 * @typedef {{0: CanvasRenderingContext2D, 1: number, 2: import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, 3: ImageOrLabelDimensions, 4: number, 5: Array<*>, 6: Array<*>}} ReplayImageOrLabelArgs
 */ /**
 * @template T
 * @typedef {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default): T} FeatureCallback
 */ /**
 * @type {import("../../extent.js").Extent}
 */ const $ea2d067b3235e95b$var$tmpExtent = (0, $84be800ca44e672c$export$fe201bb3bbe031e9)();
/** @type {import("../../coordinate.js").Coordinate} */ const $ea2d067b3235e95b$var$p1 = [];
/** @type {import("../../coordinate.js").Coordinate} */ const $ea2d067b3235e95b$var$p2 = [];
/** @type {import("../../coordinate.js").Coordinate} */ const $ea2d067b3235e95b$var$p3 = [];
/** @type {import("../../coordinate.js").Coordinate} */ const $ea2d067b3235e95b$var$p4 = [];
/**
 * @param {ReplayImageOrLabelArgs} replayImageOrLabelArgs Arguments to replayImageOrLabel
 * @return {BBox} Declutter bbox.
 */ function $ea2d067b3235e95b$var$getDeclutterBox(replayImageOrLabelArgs) {
    return replayImageOrLabelArgs[3].declutterBox;
}
const $ea2d067b3235e95b$var$rtlRegEx = new RegExp(/* eslint-disable prettier/prettier */ "[" + String.fromCharCode(0x00591) + "-" + String.fromCharCode(0x008ff) + String.fromCharCode(0x0fb1d) + "-" + String.fromCharCode(0x0fdff) + String.fromCharCode(0x0fe70) + "-" + String.fromCharCode(0x0fefc) + String.fromCharCode(0x10800) + "-" + String.fromCharCode(0x10fff) + String.fromCharCode(0x1e800) + "-" + String.fromCharCode(0x1efff) + "]");
/**
 * @param {string} text Text.
 * @param {CanvasTextAlign} align Alignment.
 * @return {number} Text alignment.
 */ function $ea2d067b3235e95b$var$horizontalTextAlign(text, align) {
    if ((align === "start" || align === "end") && !$ea2d067b3235e95b$var$rtlRegEx.test(text)) align = align === "start" ? "left" : "right";
    return (0, $72bb44c946c0e2ac$export$91a016276e4aee96)[align];
}
/**
 * @param {Array<string>} acc Accumulator.
 * @param {string} line Line of text.
 * @param {number} i Index
 * @return {Array<string>} Accumulator.
 */ function $ea2d067b3235e95b$var$createTextChunks(acc, line, i) {
    if (i > 0) acc.push("\n", "");
    acc.push(line, "");
    return acc;
}
class $ea2d067b3235e95b$var$Executor {
    /**
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The replay can have overlapping geometries.
   * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions
   */ constructor(resolution, pixelRatio, overlaps, instructions){
        /**
     * @protected
     * @type {boolean}
     */ this.overlaps = overlaps;
        /**
     * @protected
     * @type {number}
     */ this.pixelRatio = pixelRatio;
        /**
     * @protected
     * @const
     * @type {number}
     */ this.resolution = resolution;
        /**
     * @private
     * @type {boolean}
     */ this.alignFill_;
        /**
     * @protected
     * @type {Array<*>}
     */ this.instructions = instructions.instructions;
        /**
     * @protected
     * @type {Array<number>}
     */ this.coordinates = instructions.coordinates;
        /**
     * @private
     * @type {!Object<number,import("../../coordinate.js").Coordinate|Array<import("../../coordinate.js").Coordinate>|Array<Array<import("../../coordinate.js").Coordinate>>>}
     */ this.coordinateCache_ = {};
        /**
     * @private
     * @type {!import("../../transform.js").Transform}
     */ this.renderedTransform_ = (0, $d59a735b25ae191a$export$185802fd694ee1f5)();
        /**
     * @protected
     * @type {Array<*>}
     */ this.hitDetectionInstructions = instructions.hitDetectionInstructions;
        /**
     * @private
     * @type {Array<number>}
     */ this.pixelCoordinates_ = null;
        /**
     * @private
     * @type {number}
     */ this.viewRotation_ = 0;
        /**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */ this.fillStates = instructions.fillStates || {};
        /**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */ this.strokeStates = instructions.strokeStates || {};
        /**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */ this.textStates = instructions.textStates || {};
        /**
     * @private
     * @type {Object<string, Object<string, number>>}
     */ this.widths_ = {};
        /**
     * @private
     * @type {Object<string, import("../canvas.js").Label>}
     */ this.labels_ = {};
    }
    /**
   * @param {string|Array<string>} text Text.
   * @param {string} textKey Text style key.
   * @param {string} fillKey Fill style key.
   * @param {string} strokeKey Stroke style key.
   * @return {import("../canvas.js").Label} Label.
   */ createLabel(text, textKey, fillKey, strokeKey) {
        const key = text + textKey + fillKey + strokeKey;
        if (this.labels_[key]) return this.labels_[key];
        const strokeState = strokeKey ? this.strokeStates[strokeKey] : null;
        const fillState = fillKey ? this.fillStates[fillKey] : null;
        const textState = this.textStates[textKey];
        const pixelRatio = this.pixelRatio;
        const scale = [
            textState.scale[0] * pixelRatio,
            textState.scale[1] * pixelRatio
        ];
        const textIsArray = Array.isArray(text);
        const align = textState.justify ? (0, $72bb44c946c0e2ac$export$91a016276e4aee96)[textState.justify] : $ea2d067b3235e95b$var$horizontalTextAlign(Array.isArray(text) ? text[0] : text, textState.textAlign || (0, $ba06fcc662408736$export$94d53b95641b5766));
        const strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
        const chunks = textIsArray ? text : text.split("\n").reduce($ea2d067b3235e95b$var$createTextChunks, []);
        const { width: width , height: height , widths: widths , heights: heights , lineWidths: lineWidths  } = (0, $ba06fcc662408736$export$7d7c13020df1e791)(textState, chunks);
        const renderWidth = width + strokeWidth;
        const contextInstructions = [];
        // make canvas 2 pixels wider to account for italic text width measurement errors
        const w = (renderWidth + 2) * scale[0];
        const h = (height + strokeWidth) * scale[1];
        /** @type {import("../canvas.js").Label} */ const label = {
            width: w < 0 ? Math.floor(w) : Math.ceil(w),
            height: h < 0 ? Math.floor(h) : Math.ceil(h),
            contextInstructions: contextInstructions
        };
        if (scale[0] != 1 || scale[1] != 1) contextInstructions.push("scale", scale);
        if (strokeKey) {
            contextInstructions.push("strokeStyle", strokeState.strokeStyle);
            contextInstructions.push("lineWidth", strokeWidth);
            contextInstructions.push("lineCap", strokeState.lineCap);
            contextInstructions.push("lineJoin", strokeState.lineJoin);
            contextInstructions.push("miterLimit", strokeState.miterLimit);
            contextInstructions.push("setLineDash", [
                strokeState.lineDash
            ]);
            contextInstructions.push("lineDashOffset", strokeState.lineDashOffset);
        }
        if (fillKey) contextInstructions.push("fillStyle", fillState.fillStyle);
        contextInstructions.push("textBaseline", "middle");
        contextInstructions.push("textAlign", "center");
        const leftRight = 0.5 - align;
        let x = align * renderWidth + leftRight * strokeWidth;
        const strokeInstructions = [];
        const fillInstructions = [];
        let lineHeight = 0;
        let lineOffset = 0;
        let widthHeightIndex = 0;
        let lineWidthIndex = 0;
        let previousFont;
        for(let i = 0, ii = chunks.length; i < ii; i += 2){
            const text = chunks[i];
            if (text === "\n") {
                lineOffset += lineHeight;
                lineHeight = 0;
                x = align * renderWidth + leftRight * strokeWidth;
                ++lineWidthIndex;
                continue;
            }
            const font = chunks[i + 1] || textState.font;
            if (font !== previousFont) {
                if (strokeKey) strokeInstructions.push("font", font);
                if (fillKey) fillInstructions.push("font", font);
                previousFont = font;
            }
            lineHeight = Math.max(lineHeight, heights[widthHeightIndex]);
            const fillStrokeArgs = [
                text,
                x + leftRight * widths[widthHeightIndex] + align * (widths[widthHeightIndex] - lineWidths[lineWidthIndex]),
                0.5 * (strokeWidth + lineHeight) + lineOffset
            ];
            x += widths[widthHeightIndex];
            if (strokeKey) strokeInstructions.push("strokeText", fillStrokeArgs);
            if (fillKey) fillInstructions.push("fillText", fillStrokeArgs);
            ++widthHeightIndex;
        }
        Array.prototype.push.apply(contextInstructions, strokeInstructions);
        Array.prototype.push.apply(contextInstructions, fillInstructions);
        this.labels_[key] = label;
        return label;
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   */ replayTextBackground_(context, p1, p2, p3, p4, fillInstruction, strokeInstruction) {
        context.beginPath();
        context.moveTo.apply(context, p1);
        context.lineTo.apply(context, p2);
        context.lineTo.apply(context, p3);
        context.lineTo.apply(context, p4);
        context.lineTo.apply(context, p1);
        if (fillInstruction) {
            this.alignFill_ = /** @type {boolean} */ fillInstruction[2];
            this.fill_(context);
        }
        if (strokeInstruction) {
            this.setStrokeStyle_(context, /** @type {Array<*>} */ strokeInstruction);
            context.stroke();
        }
    }
    /**
   * @private
   * @param {number} sheetWidth Width of the sprite sheet.
   * @param {number} sheetHeight Height of the sprite sheet.
   * @param {number} centerX X.
   * @param {number} centerY Y.
   * @param {number} width Width.
   * @param {number} height Height.
   * @param {number} anchorX Anchor X.
   * @param {number} anchorY Anchor Y.
   * @param {number} originX Origin X.
   * @param {number} originY Origin Y.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} scale Scale.
   * @param {boolean} snapToPixel Snap to pixel.
   * @param {Array<number>} padding Padding.
   * @param {boolean} fillStroke Background fill or stroke.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
   */ calculateImageOrLabelDimensions_(sheetWidth, sheetHeight, centerX, centerY, width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, fillStroke, feature) {
        anchorX *= scale[0];
        anchorY *= scale[1];
        let x = centerX - anchorX;
        let y = centerY - anchorY;
        const w = width + originX > sheetWidth ? sheetWidth - originX : width;
        const h = height + originY > sheetHeight ? sheetHeight - originY : height;
        const boxW = padding[3] + w * scale[0] + padding[1];
        const boxH = padding[0] + h * scale[1] + padding[2];
        const boxX = x - padding[3];
        const boxY = y - padding[0];
        if (fillStroke || rotation !== 0) {
            $ea2d067b3235e95b$var$p1[0] = boxX;
            $ea2d067b3235e95b$var$p4[0] = boxX;
            $ea2d067b3235e95b$var$p1[1] = boxY;
            $ea2d067b3235e95b$var$p2[1] = boxY;
            $ea2d067b3235e95b$var$p2[0] = boxX + boxW;
            $ea2d067b3235e95b$var$p3[0] = $ea2d067b3235e95b$var$p2[0];
            $ea2d067b3235e95b$var$p3[1] = boxY + boxH;
            $ea2d067b3235e95b$var$p4[1] = $ea2d067b3235e95b$var$p3[1];
        }
        let transform;
        if (rotation !== 0) {
            transform = (0, $d59a735b25ae191a$export$f672e0b6f7222cd7)((0, $d59a735b25ae191a$export$185802fd694ee1f5)(), centerX, centerY, 1, 1, rotation, -centerX, -centerY);
            (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(transform, $ea2d067b3235e95b$var$p1);
            (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(transform, $ea2d067b3235e95b$var$p2);
            (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(transform, $ea2d067b3235e95b$var$p3);
            (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(transform, $ea2d067b3235e95b$var$p4);
            (0, $84be800ca44e672c$export$958e3e1a02eac4b6)(Math.min($ea2d067b3235e95b$var$p1[0], $ea2d067b3235e95b$var$p2[0], $ea2d067b3235e95b$var$p3[0], $ea2d067b3235e95b$var$p4[0]), Math.min($ea2d067b3235e95b$var$p1[1], $ea2d067b3235e95b$var$p2[1], $ea2d067b3235e95b$var$p3[1], $ea2d067b3235e95b$var$p4[1]), Math.max($ea2d067b3235e95b$var$p1[0], $ea2d067b3235e95b$var$p2[0], $ea2d067b3235e95b$var$p3[0], $ea2d067b3235e95b$var$p4[0]), Math.max($ea2d067b3235e95b$var$p1[1], $ea2d067b3235e95b$var$p2[1], $ea2d067b3235e95b$var$p3[1], $ea2d067b3235e95b$var$p4[1]), $ea2d067b3235e95b$var$tmpExtent);
        } else (0, $84be800ca44e672c$export$958e3e1a02eac4b6)(Math.min(boxX, boxX + boxW), Math.min(boxY, boxY + boxH), Math.max(boxX, boxX + boxW), Math.max(boxY, boxY + boxH), $ea2d067b3235e95b$var$tmpExtent);
        if (snapToPixel) {
            x = Math.round(x);
            y = Math.round(y);
        }
        return {
            drawImageX: x,
            drawImageY: y,
            drawImageW: w,
            drawImageH: h,
            originX: originX,
            originY: originY,
            declutterBox: {
                minX: $ea2d067b3235e95b$var$tmpExtent[0],
                minY: $ea2d067b3235e95b$var$tmpExtent[1],
                maxX: $ea2d067b3235e95b$var$tmpExtent[2],
                maxY: $ea2d067b3235e95b$var$tmpExtent[3],
                value: feature
            },
            canvasTransform: transform,
            scale: scale
        };
    }
    /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
   * @param {ImageOrLabelDimensions} dimensions Dimensions.
   * @param {number} opacity Opacity.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   * @return {boolean} The image or label was rendered.
   */ replayImageOrLabel_(context, contextScale, imageOrLabel, dimensions, opacity, fillInstruction, strokeInstruction) {
        const fillStroke = !!(fillInstruction || strokeInstruction);
        const box = dimensions.declutterBox;
        const canvas = context.canvas;
        const strokePadding = strokeInstruction ? strokeInstruction[2] * dimensions.scale[0] / 2 : 0;
        const intersects = box.minX - strokePadding <= canvas.width / contextScale && box.maxX + strokePadding >= 0 && box.minY - strokePadding <= canvas.height / contextScale && box.maxY + strokePadding >= 0;
        if (intersects) {
            if (fillStroke) this.replayTextBackground_(context, $ea2d067b3235e95b$var$p1, $ea2d067b3235e95b$var$p2, $ea2d067b3235e95b$var$p3, $ea2d067b3235e95b$var$p4, /** @type {Array<*>} */ fillInstruction, /** @type {Array<*>} */ strokeInstruction);
            (0, $ba06fcc662408736$export$3cb6f3a6e49cc0ee)(context, dimensions.canvasTransform, opacity, imageOrLabel, dimensions.originX, dimensions.originY, dimensions.drawImageW, dimensions.drawImageH, dimensions.drawImageX, dimensions.drawImageY, dimensions.scale);
        }
        return true;
    }
    /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   */ fill_(context) {
        if (this.alignFill_) {
            const origin = (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(this.renderedTransform_, [
                0,
                0
            ]);
            const repeatSize = 512 * this.pixelRatio;
            context.save();
            context.translate(origin[0] % repeatSize, origin[1] % repeatSize);
            context.rotate(this.viewRotation_);
        }
        context.fill();
        if (this.alignFill_) context.restore();
    }
    /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {Array<*>} instruction Instruction.
   */ setStrokeStyle_(context, instruction) {
        context["strokeStyle"] = /** @type {import("../../colorlike.js").ColorLike} */ instruction[1];
        context.lineWidth = /** @type {number} */ instruction[2];
        context.lineCap = /** @type {CanvasLineCap} */ instruction[3];
        context.lineJoin = /** @type {CanvasLineJoin} */ instruction[4];
        context.miterLimit = /** @type {number} */ instruction[5];
        context.lineDashOffset = /** @type {number} */ instruction[7];
        context.setLineDash(/** @type {Array<number>} */ instruction[6]);
    }
    /**
   * @private
   * @param {string|Array<string>} text The text to draw.
   * @param {string} textKey The key of the text state.
   * @param {string} strokeKey The key for the stroke state.
   * @param {string} fillKey The key for the fill state.
   * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
   */ drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey) {
        const textState = this.textStates[textKey];
        const label = this.createLabel(text, textKey, fillKey, strokeKey);
        const strokeState = this.strokeStates[strokeKey];
        const pixelRatio = this.pixelRatio;
        const align = $ea2d067b3235e95b$var$horizontalTextAlign(Array.isArray(text) ? text[0] : text, textState.textAlign || (0, $ba06fcc662408736$export$94d53b95641b5766));
        const baseline = (0, $72bb44c946c0e2ac$export$91a016276e4aee96)[textState.textBaseline || (0, $ba06fcc662408736$export$cf2279a1bff62eb)];
        const strokeWidth = strokeState && strokeState.lineWidth ? strokeState.lineWidth : 0;
        // Remove the 2 pixels we added in createLabel() for the anchor
        const width = label.width / pixelRatio - 2 * textState.scale[0];
        const anchorX = align * width + 2 * (0.5 - align) * strokeWidth;
        const anchorY = baseline * label.height / pixelRatio + 2 * (0.5 - baseline) * strokeWidth;
        return {
            label: label,
            anchorX: anchorX,
            anchorY: anchorY
        };
    }
    /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {Array<*>} instructions Instructions array.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   * @return {T|undefined} Callback result.
   * @template T
   */ execute_(context, contextScale, transform, instructions, snapToPixel, featureCallback, hitExtent, declutterTree) {
        /** @type {Array<number>} */ let pixelCoordinates;
        if (this.pixelCoordinates_ && (0, $69c1cc8ae30f997f$export$e9bab7fafb253603)(transform, this.renderedTransform_)) pixelCoordinates = this.pixelCoordinates_;
        else {
            if (!this.pixelCoordinates_) this.pixelCoordinates_ = [];
            pixelCoordinates = (0, $9a4105a6a338adf4$export$b92b2dedcfff79de)(this.coordinates, 0, this.coordinates.length, 2, transform, this.pixelCoordinates_);
            (0, $d59a735b25ae191a$export$42b4187a82d80ed0)(this.renderedTransform_, transform);
        }
        let i = 0; // instruction index
        const ii = instructions.length; // end of instructions
        let d = 0; // data index
        let dd; // end of per-instruction data
        let anchorX, anchorY, prevX, prevY, roundX, roundY, image, text, textKey, strokeKey, fillKey;
        let pendingFill = 0;
        let pendingStroke = 0;
        let lastFillInstruction = null;
        let lastStrokeInstruction = null;
        const coordinateCache = this.coordinateCache_;
        const viewRotation = this.viewRotation_;
        const viewRotationFromTransform = Math.round(Math.atan2(-transform[1], transform[0]) * 1e12) / 1e12;
        const state = /** @type {import("../../render.js").State} */ {
            context: context,
            pixelRatio: this.pixelRatio,
            resolution: this.resolution,
            rotation: viewRotation
        };
        // When the batch size gets too big, performance decreases. 200 is a good
        // balance between batch size and number of fill/stroke instructions.
        const batchSize = this.instructions != instructions || this.overlaps ? 0 : 200;
        let /** @type {import("../../Feature.js").FeatureLike} */ feature;
        let x, y, currentGeometry;
        while(i < ii){
            const instruction = instructions[i];
            const type = /** @type {import("./Instruction.js").default} */ instruction[0];
            switch(type){
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).BEGIN_GEOMETRY:
                    feature = /** @type {import("../../Feature.js").FeatureLike} */ instruction[1];
                    currentGeometry = instruction[3];
                    if (!feature.getGeometry()) i = /** @type {number} */ instruction[2];
                    else if (hitExtent !== undefined && !(0, $84be800ca44e672c$export$7b0a31e10bbff018)(hitExtent, currentGeometry.getExtent())) i = /** @type {number} */ instruction[2] + 1;
                    else ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).BEGIN_PATH:
                    if (pendingFill > batchSize) {
                        this.fill_(context);
                        pendingFill = 0;
                    }
                    if (pendingStroke > batchSize) {
                        context.stroke();
                        pendingStroke = 0;
                    }
                    if (!pendingFill && !pendingStroke) {
                        context.beginPath();
                        prevX = NaN;
                        prevY = NaN;
                    }
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).CIRCLE:
                    d = /** @type {number} */ instruction[1];
                    const x1 = pixelCoordinates[d];
                    const y1 = pixelCoordinates[d + 1];
                    const x2 = pixelCoordinates[d + 2];
                    const y2 = pixelCoordinates[d + 3];
                    const dx = x2 - x1;
                    const dy = y2 - y1;
                    const r = Math.sqrt(dx * dx + dy * dy);
                    context.moveTo(x1 + r, y1);
                    context.arc(x1, y1, r, 0, 2 * Math.PI, true);
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).CLOSE_PATH:
                    context.closePath();
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).CUSTOM:
                    d = /** @type {number} */ instruction[1];
                    dd = instruction[2];
                    const geometry = /** @type {import("../../geom/SimpleGeometry.js").default} */ instruction[3];
                    const renderer = instruction[4];
                    const fn = instruction.length == 6 ? instruction[5] : undefined;
                    state.geometry = geometry;
                    state.feature = feature;
                    if (!(i in coordinateCache)) coordinateCache[i] = [];
                    const coords = coordinateCache[i];
                    if (fn) fn(pixelCoordinates, d, dd, 2, coords);
                    else {
                        coords[0] = pixelCoordinates[d];
                        coords[1] = pixelCoordinates[d + 1];
                        coords.length = 2;
                    }
                    renderer(coords, state);
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_IMAGE:
                    d = /** @type {number} */ instruction[1];
                    dd = /** @type {number} */ instruction[2];
                    image = /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */ instruction[3];
                    // Remaining arguments in DRAW_IMAGE are in alphabetical order
                    anchorX = /** @type {number} */ instruction[4];
                    anchorY = /** @type {number} */ instruction[5];
                    let height = /** @type {number} */ instruction[6];
                    const opacity = /** @type {number} */ instruction[7];
                    const originX = /** @type {number} */ instruction[8];
                    const originY = /** @type {number} */ instruction[9];
                    const rotateWithView = /** @type {boolean} */ instruction[10];
                    let rotation = /** @type {number} */ instruction[11];
                    const scale = /** @type {import("../../size.js").Size} */ instruction[12];
                    let width = /** @type {number} */ instruction[13];
                    const declutterMode = /** @type {"declutter"|"obstacle"|"none"|undefined} */ instruction[14];
                    const declutterImageWithText = /** @type {import("../canvas.js").DeclutterImageWithText} */ instruction[15];
                    if (!image && instruction.length >= 20) {
                        // create label images
                        text = /** @type {string} */ instruction[19];
                        textKey = /** @type {string} */ instruction[20];
                        strokeKey = /** @type {string} */ instruction[21];
                        fillKey = /** @type {string} */ instruction[22];
                        const labelWithAnchor = this.drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey);
                        image = labelWithAnchor.label;
                        instruction[3] = image;
                        const textOffsetX = /** @type {number} */ instruction[23];
                        anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
                        instruction[4] = anchorX;
                        const textOffsetY = /** @type {number} */ instruction[24];
                        anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
                        instruction[5] = anchorY;
                        height = image.height;
                        instruction[6] = height;
                        width = image.width;
                        instruction[13] = width;
                    }
                    let geometryWidths;
                    if (instruction.length > 25) geometryWidths = /** @type {number} */ instruction[25];
                    let padding, backgroundFill, backgroundStroke;
                    if (instruction.length > 17) {
                        padding = /** @type {Array<number>} */ instruction[16];
                        backgroundFill = /** @type {boolean} */ instruction[17];
                        backgroundStroke = /** @type {boolean} */ instruction[18];
                    } else {
                        padding = (0, $ba06fcc662408736$export$40a9eeef55665a40);
                        backgroundFill = false;
                        backgroundStroke = false;
                    }
                    if (rotateWithView && viewRotationFromTransform) // Canvas is expected to be rotated to reverse view rotation.
                    rotation += viewRotation;
                    else if (!rotateWithView && !viewRotationFromTransform) // Canvas is not rotated, images need to be rotated back to be north-up.
                    rotation -= viewRotation;
                    let widthIndex = 0;
                    for(; d < dd; d += 2){
                        if (geometryWidths && geometryWidths[widthIndex++] < width / this.pixelRatio) continue;
                        const dimensions = this.calculateImageOrLabelDimensions_(image.width, image.height, pixelCoordinates[d], pixelCoordinates[d + 1], width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, backgroundFill || backgroundStroke, feature);
                        /** @type {ReplayImageOrLabelArgs} */ const args = [
                            context,
                            contextScale,
                            image,
                            dimensions,
                            opacity,
                            backgroundFill ? /** @type {Array<*>} */ lastFillInstruction : null,
                            backgroundStroke ? /** @type {Array<*>} */ lastStrokeInstruction : null
                        ];
                        if (declutterTree) {
                            if (declutterMode === "none") continue;
                            else if (declutterMode === "obstacle") {
                                // will always be drawn, thus no collision detection, but insert as obstacle
                                declutterTree.insert(dimensions.declutterBox);
                                continue;
                            } else {
                                let imageArgs;
                                let imageDeclutterBox;
                                if (declutterImageWithText) {
                                    const index = dd - d;
                                    if (!declutterImageWithText[index]) {
                                        // We now have the image for an image+text combination.
                                        declutterImageWithText[index] = args;
                                        continue;
                                    }
                                    imageArgs = declutterImageWithText[index];
                                    delete declutterImageWithText[index];
                                    imageDeclutterBox = $ea2d067b3235e95b$var$getDeclutterBox(imageArgs);
                                    if (declutterTree.collides(imageDeclutterBox)) continue;
                                }
                                if (declutterTree.collides(dimensions.declutterBox)) continue;
                                if (imageArgs) {
                                    // We now have image and text for an image+text combination.
                                    declutterTree.insert(imageDeclutterBox);
                                    // Render the image before we render the text.
                                    this.replayImageOrLabel_.apply(this, imageArgs);
                                }
                                declutterTree.insert(dimensions.declutterBox);
                            }
                        }
                        this.replayImageOrLabel_.apply(this, args);
                    }
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).DRAW_CHARS:
                    const begin = /** @type {number} */ instruction[1];
                    const end = /** @type {number} */ instruction[2];
                    const baseline = /** @type {number} */ instruction[3];
                    const overflow = /** @type {number} */ instruction[4];
                    fillKey = /** @type {string} */ instruction[5];
                    const maxAngle = /** @type {number} */ instruction[6];
                    const measurePixelRatio = /** @type {number} */ instruction[7];
                    const offsetY = /** @type {number} */ instruction[8];
                    strokeKey = /** @type {string} */ instruction[9];
                    const strokeWidth = /** @type {number} */ instruction[10];
                    text = /** @type {string} */ instruction[11];
                    textKey = /** @type {string} */ instruction[12];
                    const pixelRatioScale = [
                        /** @type {number} */ instruction[13],
                        /** @type {number} */ instruction[13]
                    ];
                    const textState = this.textStates[textKey];
                    const font = textState.font;
                    const textScale = [
                        textState.scale[0] * measurePixelRatio,
                        textState.scale[1] * measurePixelRatio
                    ];
                    let cachedWidths;
                    if (font in this.widths_) cachedWidths = this.widths_[font];
                    else {
                        cachedWidths = {};
                        this.widths_[font] = cachedWidths;
                    }
                    const pathLength = (0, $9d37b56b1e11868f$export$153f8c6b4d8caebc)(pixelCoordinates, begin, end, 2);
                    const textLength = Math.abs(textScale[0]) * (0, $ba06fcc662408736$export$915c7ba51467308f)(font, text, cachedWidths);
                    if (overflow || textLength <= pathLength) {
                        const textAlign = this.textStates[textKey].textAlign;
                        const startM = (pathLength - textLength) * (0, $72bb44c946c0e2ac$export$91a016276e4aee96)[textAlign];
                        const parts = (0, $6a798d3c1cf17469$export$153a9a17ab3e949f)(pixelCoordinates, begin, end, 2, text, startM, maxAngle, Math.abs(textScale[0]), (0, $ba06fcc662408736$export$915c7ba51467308f), font, cachedWidths, viewRotationFromTransform ? 0 : this.viewRotation_);
                        drawChars: if (parts) {
                            /** @type {Array<ReplayImageOrLabelArgs>} */ const replayImageOrLabelArgs = [];
                            let c, cc, chars, label, part;
                            if (strokeKey) for(c = 0, cc = parts.length; c < cc; ++c){
                                part = parts[c]; // x, y, anchorX, rotation, chunk
                                chars = /** @type {string} */ part[4];
                                label = this.createLabel(chars, textKey, "", strokeKey);
                                anchorX = /** @type {number} */ part[2] + (textScale[0] < 0 ? -strokeWidth : strokeWidth);
                                anchorY = baseline * label.height + (0.5 - baseline) * 2 * strokeWidth * textScale[1] / textScale[0] - offsetY;
                                const dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, (0, $ba06fcc662408736$export$40a9eeef55665a40), false, feature);
                                if (declutterTree && declutterTree.collides(dimensions.declutterBox)) break drawChars;
                                replayImageOrLabelArgs.push([
                                    context,
                                    contextScale,
                                    label,
                                    dimensions,
                                    1,
                                    null,
                                    null
                                ]);
                            }
                            if (fillKey) for(c = 0, cc = parts.length; c < cc; ++c){
                                part = parts[c]; // x, y, anchorX, rotation, chunk
                                chars = /** @type {string} */ part[4];
                                label = this.createLabel(chars, textKey, fillKey, "");
                                anchorX = /** @type {number} */ part[2];
                                anchorY = baseline * label.height - offsetY;
                                const dimensions = this.calculateImageOrLabelDimensions_(label.width, label.height, part[0], part[1], label.width, label.height, anchorX, anchorY, 0, 0, part[3], pixelRatioScale, false, (0, $ba06fcc662408736$export$40a9eeef55665a40), false, feature);
                                if (declutterTree && declutterTree.collides(dimensions.declutterBox)) break drawChars;
                                replayImageOrLabelArgs.push([
                                    context,
                                    contextScale,
                                    label,
                                    dimensions,
                                    1,
                                    null,
                                    null
                                ]);
                            }
                            if (declutterTree) declutterTree.load(replayImageOrLabelArgs.map($ea2d067b3235e95b$var$getDeclutterBox));
                            for(let i = 0, ii = replayImageOrLabelArgs.length; i < ii; ++i)this.replayImageOrLabel_.apply(this, replayImageOrLabelArgs[i]);
                        }
                    }
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).END_GEOMETRY:
                    if (featureCallback !== undefined) {
                        feature = /** @type {import("../../Feature.js").FeatureLike} */ instruction[1];
                        const result = featureCallback(feature, currentGeometry);
                        if (result) return result;
                    }
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).FILL:
                    if (batchSize) pendingFill++;
                    else this.fill_(context);
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).MOVE_TO_LINE_TO:
                    d = /** @type {number} */ instruction[1];
                    dd = /** @type {number} */ instruction[2];
                    x = pixelCoordinates[d];
                    y = pixelCoordinates[d + 1];
                    roundX = x + 0.5 | 0;
                    roundY = y + 0.5 | 0;
                    if (roundX !== prevX || roundY !== prevY) {
                        context.moveTo(x, y);
                        prevX = roundX;
                        prevY = roundY;
                    }
                    for(d += 2; d < dd; d += 2){
                        x = pixelCoordinates[d];
                        y = pixelCoordinates[d + 1];
                        roundX = x + 0.5 | 0;
                        roundY = y + 0.5 | 0;
                        if (d == dd - 2 || roundX !== prevX || roundY !== prevY) {
                            context.lineTo(x, y);
                            prevX = roundX;
                            prevY = roundY;
                        }
                    }
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_FILL_STYLE:
                    lastFillInstruction = instruction;
                    this.alignFill_ = instruction[2];
                    if (pendingFill) {
                        this.fill_(context);
                        pendingFill = 0;
                        if (pendingStroke) {
                            context.stroke();
                            pendingStroke = 0;
                        }
                    }
                    context.fillStyle = /** @type {import("../../colorlike.js").ColorLike} */ instruction[1];
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).SET_STROKE_STYLE:
                    lastStrokeInstruction = instruction;
                    if (pendingStroke) {
                        context.stroke();
                        pendingStroke = 0;
                    }
                    this.setStrokeStyle_(context, /** @type {Array<*>} */ instruction);
                    ++i;
                    break;
                case (0, $3740963e6530651e$export$2e2bcd8739ae039).STROKE:
                    if (batchSize) pendingStroke++;
                    else context.stroke();
                    ++i;
                    break;
                default:
                    ++i;
                    break;
            }
        }
        if (pendingFill) this.fill_(context);
        if (pendingStroke) context.stroke();
        return undefined;
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */ execute(context, contextScale, transform, viewRotation, snapToPixel, declutterTree) {
        this.viewRotation_ = viewRotation;
        this.execute_(context, contextScale, transform, this.instructions, snapToPixel, undefined, undefined, declutterTree);
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @return {T|undefined} Callback result.
   * @template T
   */ executeHitDetection(context, transform, viewRotation, featureCallback, hitExtent) {
        this.viewRotation_ = viewRotation;
        return this.execute_(context, 1, transform, this.hitDetectionInstructions, true, featureCallback, hitExtent);
    }
}
var $ea2d067b3235e95b$export$2e2bcd8739ae039 = $ea2d067b3235e95b$var$Executor;








/**
 * @const
 * @type {Array<import("../canvas.js").BuilderType>}
 */ const $9ab3bb4278f389ba$var$ORDER = [
    "Polygon",
    "Circle",
    "LineString",
    "Image",
    "Text",
    "Default"
];
class $9ab3bb4278f389ba$var$ExecutorGroup {
    /**
   * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
   * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
   * should be set here, unless the target context does not exceed that extent (which
   * can be the case when rendering to tiles).
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The executor group can have overlapping geometries.
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions
   * The serializable instructions.
   * @param {number} [renderBuffer] Optional rendering buffer.
   */ constructor(maxExtent, resolution, pixelRatio, overlaps, allInstructions, renderBuffer){
        /**
     * @private
     * @type {import("../../extent.js").Extent}
     */ this.maxExtent_ = maxExtent;
        /**
     * @private
     * @type {boolean}
     */ this.overlaps_ = overlaps;
        /**
     * @private
     * @type {number}
     */ this.pixelRatio_ = pixelRatio;
        /**
     * @private
     * @type {number}
     */ this.resolution_ = resolution;
        /**
     * @private
     * @type {number|undefined}
     */ this.renderBuffer_ = renderBuffer;
        /**
     * @private
     * @type {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Executor").default>>}
     */ this.executorsByZIndex_ = {};
        /**
     * @private
     * @type {CanvasRenderingContext2D}
     */ this.hitDetectionContext_ = null;
        /**
     * @private
     * @type {import("../../transform.js").Transform}
     */ this.hitDetectionTransform_ = (0, $d59a735b25ae191a$export$185802fd694ee1f5)();
        this.createExecutors_(allInstructions);
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */ clip(context, transform) {
        const flatClipCoords = this.getClipCoords(transform);
        context.beginPath();
        context.moveTo(flatClipCoords[0], flatClipCoords[1]);
        context.lineTo(flatClipCoords[2], flatClipCoords[3]);
        context.lineTo(flatClipCoords[4], flatClipCoords[5]);
        context.lineTo(flatClipCoords[6], flatClipCoords[7]);
        context.clip();
    }
    /**
   * Create executors and populate them using the provided instructions.
   * @private
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
   */ createExecutors_(allInstructions) {
        for(const zIndex in allInstructions){
            let executors = this.executorsByZIndex_[zIndex];
            if (executors === undefined) {
                executors = {};
                this.executorsByZIndex_[zIndex] = executors;
            }
            const instructionByZindex = allInstructions[zIndex];
            for(const builderType in instructionByZindex){
                const instructions = instructionByZindex[builderType];
                executors[builderType] = new (0, $ea2d067b3235e95b$export$2e2bcd8739ae039)(this.resolution_, this.pixelRatio_, this.overlaps_, instructions);
            }
        }
    }
    /**
   * @param {Array<import("../canvas.js").BuilderType>} executors Executors.
   * @return {boolean} Has executors of the provided types.
   */ hasExecutors(executors) {
        for(const zIndex in this.executorsByZIndex_){
            const candidates = this.executorsByZIndex_[zIndex];
            for(let i = 0, ii = executors.length; i < ii; ++i){
                if (executors[i] in candidates) return true;
            }
        }
        return false;
    }
    /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
   * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
   * @return {T|undefined} Callback result.
   * @template T
   */ forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, callback, declutteredFeatures) {
        hitTolerance = Math.round(hitTolerance);
        const contextSize = hitTolerance * 2 + 1;
        const transform = (0, $d59a735b25ae191a$export$f672e0b6f7222cd7)(this.hitDetectionTransform_, hitTolerance + 0.5, hitTolerance + 0.5, 1 / resolution, -1 / resolution, -rotation, -coordinate[0], -coordinate[1]);
        const newContext = !this.hitDetectionContext_;
        if (newContext) this.hitDetectionContext_ = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(contextSize, contextSize, undefined, {
            willReadFrequently: true
        });
        const context = this.hitDetectionContext_;
        if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
            context.canvas.width = contextSize;
            context.canvas.height = contextSize;
        } else if (!newContext) context.clearRect(0, 0, contextSize, contextSize);
        /**
     * @type {import("../../extent.js").Extent}
     */ let hitExtent;
        if (this.renderBuffer_ !== undefined) {
            hitExtent = (0, $84be800ca44e672c$export$fe201bb3bbe031e9)();
            (0, $84be800ca44e672c$export$1f820e3920fa5715)(hitExtent, coordinate);
            (0, $84be800ca44e672c$export$ab1029bcae9ddb4a)(hitExtent, resolution * (this.renderBuffer_ + hitTolerance), hitExtent);
        }
        const indexes = $9ab3bb4278f389ba$export$96fc84ea21b8269f(hitTolerance);
        let builderType;
        /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
     * @return {T|undefined} Callback result.
     */ function featureCallback(feature, geometry) {
            const imageData = context.getImageData(0, 0, contextSize, contextSize).data;
            for(let i = 0, ii = indexes.length; i < ii; i++)if (imageData[indexes[i]] > 0) {
                if (!declutteredFeatures || builderType !== "Image" && builderType !== "Text" || declutteredFeatures.includes(feature)) {
                    const idx = (indexes[i] - 3) / 4;
                    const x = hitTolerance - idx % contextSize;
                    const y = hitTolerance - (idx / contextSize | 0);
                    const result = callback(feature, geometry, x * x + y * y);
                    if (result) return result;
                }
                context.clearRect(0, 0, contextSize, contextSize);
                break;
            }
            return undefined;
        }
        /** @type {Array<number>} */ const zs = Object.keys(this.executorsByZIndex_).map(Number);
        zs.sort((0, $69c1cc8ae30f997f$export$fcb633242ef15540));
        let i, j, executors, executor, result;
        for(i = zs.length - 1; i >= 0; --i){
            const zIndexKey = zs[i].toString();
            executors = this.executorsByZIndex_[zIndexKey];
            for(j = $9ab3bb4278f389ba$var$ORDER.length - 1; j >= 0; --j){
                builderType = $9ab3bb4278f389ba$var$ORDER[j];
                executor = executors[builderType];
                if (executor !== undefined) {
                    result = executor.executeHitDetection(context, transform, rotation, featureCallback, hitExtent);
                    if (result) return result;
                }
            }
        }
        return undefined;
    }
    /**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>|null} Clip coordinates.
   */ getClipCoords(transform) {
        const maxExtent = this.maxExtent_;
        if (!maxExtent) return null;
        const minX = maxExtent[0];
        const minY = maxExtent[1];
        const maxX = maxExtent[2];
        const maxY = maxExtent[3];
        const flatClipCoords = [
            minX,
            minY,
            minX,
            maxY,
            maxX,
            maxY,
            maxX,
            minY
        ];
        (0, $9a4105a6a338adf4$export$b92b2dedcfff79de)(flatClipCoords, 0, 8, 2, transform, flatClipCoords);
        return flatClipCoords;
    }
    /**
   * @return {boolean} Is empty.
   */ isEmpty() {
        return (0, $e2dfef87a88758ed$export$dd1bc94b04021eeb)(this.executorsByZIndex_);
    }
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<import("../canvas.js").BuilderType>} [builderTypes] Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ORDER}
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */ execute(context, contextScale, transform, viewRotation, snapToPixel, builderTypes, declutterTree) {
        /** @type {Array<number>} */ const zs = Object.keys(this.executorsByZIndex_).map(Number);
        zs.sort((0, $69c1cc8ae30f997f$export$fcb633242ef15540));
        // setup clipping so that the parts of over-simplified geometries are not
        // visible outside the current extent when panning
        if (this.maxExtent_) {
            context.save();
            this.clip(context, transform);
        }
        builderTypes = builderTypes ? builderTypes : $9ab3bb4278f389ba$var$ORDER;
        let i, ii, j, jj, replays, replay;
        if (declutterTree) zs.reverse();
        for(i = 0, ii = zs.length; i < ii; ++i){
            const zIndexKey = zs[i].toString();
            replays = this.executorsByZIndex_[zIndexKey];
            for(j = 0, jj = builderTypes.length; j < jj; ++j){
                const builderType = builderTypes[j];
                replay = replays[builderType];
                if (replay !== undefined) replay.execute(context, contextScale, transform, viewRotation, snapToPixel, declutterTree);
            }
        }
        if (this.maxExtent_) context.restore();
    }
}
/**
 * This cache is used to store arrays of indexes for calculated pixel circles
 * to increase performance.
 * It is a static property to allow each Replaygroup to access it.
 * @type {Object<number, Array<number>>}
 */ const $9ab3bb4278f389ba$var$circlePixelIndexArrayCache = {};
function $9ab3bb4278f389ba$export$96fc84ea21b8269f(radius) {
    if ($9ab3bb4278f389ba$var$circlePixelIndexArrayCache[radius] !== undefined) return $9ab3bb4278f389ba$var$circlePixelIndexArrayCache[radius];
    const size = radius * 2 + 1;
    const maxDistanceSq = radius * radius;
    const distances = new Array(maxDistanceSq + 1);
    for(let i = 0; i <= radius; ++i)for(let j = 0; j <= radius; ++j){
        const distanceSq = i * i + j * j;
        if (distanceSq > maxDistanceSq) break;
        let distance = distances[distanceSq];
        if (!distance) {
            distance = [];
            distances[distanceSq] = distance;
        }
        distance.push(((radius + i) * size + (radius + j)) * 4 + 3);
        if (i > 0) distance.push(((radius - i) * size + (radius + j)) * 4 + 3);
        if (j > 0) {
            distance.push(((radius + i) * size + (radius - j)) * 4 + 3);
            if (i > 0) distance.push(((radius - i) * size + (radius - j)) * 4 + 3);
        }
    }
    const pixelIndex = [];
    for(let i = 0, ii = distances.length; i < ii; ++i)if (distances[i]) pixelIndex.push(...distances[i]);
    $9ab3bb4278f389ba$var$circlePixelIndexArrayCache[radius] = pixelIndex;
    return pixelIndex;
}
var $9ab3bb4278f389ba$export$2e2bcd8739ae039 = $9ab3bb4278f389ba$var$ExecutorGroup;



/**
 * @module ol/render/canvas/hitdetect
 */ /**
 * @module ol/render/canvas/Immediate
 */ // FIXME test, especially polygons with holes and multipolygons
// FIXME need to handle large thick features (where pixel size matters)
// FIXME add offset and end to ol/geom/flat/transform~transform2D?









/**
 * @classdesc
 * A concrete subclass of {@link module:ol/render/VectorContext~VectorContext} that implements
 * direct rendering of features and geometries to an HTML5 Canvas context.
 * Instances of this class are created internally by the library and
 * provided to application code as vectorContext member of the
 * {@link module:ol/render/Event~RenderEvent} object associated with postcompose, precompose and
 * render events emitted by layers and maps.
 */ class $213b0117674a3f96$var$CanvasImmediateRenderer extends (0, $f58af45c89f48916$export$2e2bcd8739ae039) {
    /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
   */ constructor(context, pixelRatio, extent, transform, viewRotation, squaredTolerance, userTransform){
        super();
        /**
     * @private
     * @type {CanvasRenderingContext2D}
     */ this.context_ = context;
        /**
     * @private
     * @type {number}
     */ this.pixelRatio_ = pixelRatio;
        /**
     * @private
     * @type {import("../../extent.js").Extent}
     */ this.extent_ = extent;
        /**
     * @private
     * @type {import("../../transform.js").Transform}
     */ this.transform_ = transform;
        /**
     * @private
     * @type {number}
     */ this.transformRotation_ = transform ? (0, $57ec69d152197e1d$export$a81f732198733497)(Math.atan2(transform[1], transform[0]), 10) : 0;
        /**
     * @private
     * @type {number}
     */ this.viewRotation_ = viewRotation;
        /**
     * @private
     * @type {number}
     */ this.squaredTolerance_ = squaredTolerance;
        /**
     * @private
     * @type {import("../../proj.js").TransformFunction}
     */ this.userTransform_ = userTransform;
        /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */ this.contextFillState_ = null;
        /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */ this.contextStrokeState_ = null;
        /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */ this.contextTextState_ = null;
        /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */ this.fillState_ = null;
        /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */ this.strokeState_ = null;
        /**
     * @private
     * @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement}
     */ this.image_ = null;
        /**
     * @private
     * @type {number}
     */ this.imageAnchorX_ = 0;
        /**
     * @private
     * @type {number}
     */ this.imageAnchorY_ = 0;
        /**
     * @private
     * @type {number}
     */ this.imageHeight_ = 0;
        /**
     * @private
     * @type {number}
     */ this.imageOpacity_ = 0;
        /**
     * @private
     * @type {number}
     */ this.imageOriginX_ = 0;
        /**
     * @private
     * @type {number}
     */ this.imageOriginY_ = 0;
        /**
     * @private
     * @type {boolean}
     */ this.imageRotateWithView_ = false;
        /**
     * @private
     * @type {number}
     */ this.imageRotation_ = 0;
        /**
     * @private
     * @type {import("../../size.js").Size}
     */ this.imageScale_ = [
            0,
            0
        ];
        /**
     * @private
     * @type {number}
     */ this.imageWidth_ = 0;
        /**
     * @private
     * @type {string}
     */ this.text_ = "";
        /**
     * @private
     * @type {number}
     */ this.textOffsetX_ = 0;
        /**
     * @private
     * @type {number}
     */ this.textOffsetY_ = 0;
        /**
     * @private
     * @type {boolean}
     */ this.textRotateWithView_ = false;
        /**
     * @private
     * @type {number}
     */ this.textRotation_ = 0;
        /**
     * @private
     * @type {import("../../size.js").Size}
     */ this.textScale_ = [
            0,
            0
        ];
        /**
     * @private
     * @type {?import("../canvas.js").FillState}
     */ this.textFillState_ = null;
        /**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */ this.textStrokeState_ = null;
        /**
     * @private
     * @type {?import("../canvas.js").TextState}
     */ this.textState_ = null;
        /**
     * @private
     * @type {Array<number>}
     */ this.pixelCoordinates_ = [];
        /**
     * @private
     * @type {import("../../transform.js").Transform}
     */ this.tmpLocalTransform_ = (0, $d59a735b25ae191a$export$185802fd694ee1f5)();
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */ drawImages_(flatCoordinates, offset, end, stride) {
        if (!this.image_) return;
        const pixelCoordinates = (0, $9a4105a6a338adf4$export$b92b2dedcfff79de)(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
        const context = this.context_;
        const localTransform = this.tmpLocalTransform_;
        const alpha = context.globalAlpha;
        if (this.imageOpacity_ != 1) context.globalAlpha = alpha * this.imageOpacity_;
        let rotation = this.imageRotation_;
        if (this.transformRotation_ === 0) rotation -= this.viewRotation_;
        if (this.imageRotateWithView_) rotation += this.viewRotation_;
        for(let i = 0, ii = pixelCoordinates.length; i < ii; i += 2){
            const x = pixelCoordinates[i] - this.imageAnchorX_;
            const y = pixelCoordinates[i + 1] - this.imageAnchorY_;
            if (rotation !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
                const centerX = x + this.imageAnchorX_;
                const centerY = y + this.imageAnchorY_;
                (0, $d59a735b25ae191a$export$f672e0b6f7222cd7)(localTransform, centerX, centerY, 1, 1, rotation, -centerX, -centerY);
                context.setTransform.apply(context, localTransform);
                context.translate(centerX, centerY);
                context.scale(this.imageScale_[0], this.imageScale_[1]);
                context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, -this.imageAnchorX_, -this.imageAnchorY_, this.imageWidth_, this.imageHeight_);
                context.setTransform(1, 0, 0, 1, 0, 0);
            } else context.drawImage(this.image_, this.imageOriginX_, this.imageOriginY_, this.imageWidth_, this.imageHeight_, x, y, this.imageWidth_, this.imageHeight_);
        }
        if (this.imageOpacity_ != 1) context.globalAlpha = alpha;
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */ drawText_(flatCoordinates, offset, end, stride) {
        if (!this.textState_ || this.text_ === "") return;
        if (this.textFillState_) this.setContextFillState_(this.textFillState_);
        if (this.textStrokeState_) this.setContextStrokeState_(this.textStrokeState_);
        this.setContextTextState_(this.textState_);
        const pixelCoordinates = (0, $9a4105a6a338adf4$export$b92b2dedcfff79de)(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
        const context = this.context_;
        let rotation = this.textRotation_;
        if (this.transformRotation_ === 0) rotation -= this.viewRotation_;
        if (this.textRotateWithView_) rotation += this.viewRotation_;
        for(; offset < end; offset += stride){
            const x = pixelCoordinates[offset] + this.textOffsetX_;
            const y = pixelCoordinates[offset + 1] + this.textOffsetY_;
            if (rotation !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1) {
                context.translate(x - this.textOffsetX_, y - this.textOffsetY_);
                context.rotate(rotation);
                context.translate(this.textOffsetX_, this.textOffsetY_);
                context.scale(this.textScale_[0], this.textScale_[1]);
                if (this.textStrokeState_) context.strokeText(this.text_, 0, 0);
                if (this.textFillState_) context.fillText(this.text_, 0, 0);
                context.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                if (this.textStrokeState_) context.strokeText(this.text_, x, y);
                if (this.textFillState_) context.fillText(this.text_, x, y);
            }
        }
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */ moveToLineTo_(flatCoordinates, offset, end, stride, close) {
        const context = this.context_;
        const pixelCoordinates = (0, $9a4105a6a338adf4$export$b92b2dedcfff79de)(flatCoordinates, offset, end, stride, this.transform_, this.pixelCoordinates_);
        context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
        let length = pixelCoordinates.length;
        if (close) length -= 2;
        for(let i = 2; i < length; i += 2)context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
        if (close) context.closePath();
        return end;
    }
    /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */ drawRings_(flatCoordinates, offset, ends, stride) {
        for(let i = 0, ii = ends.length; i < ii; ++i)offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, true);
        return offset;
    }
    /**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   */ drawCircle(geometry) {
        if (this.squaredTolerance_) geometry = /** @type {import("../../geom/Circle.js").default} */ geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
        if (!(0, $84be800ca44e672c$export$7b0a31e10bbff018)(this.extent_, geometry.getExtent())) return;
        if (this.fillState_ || this.strokeState_) {
            if (this.fillState_) this.setContextFillState_(this.fillState_);
            if (this.strokeState_) this.setContextStrokeState_(this.strokeState_);
            const pixelCoordinates = (0, $ecdcc798f2987118$export$a3767472617c7861)(geometry, this.transform_, this.pixelCoordinates_);
            const dx = pixelCoordinates[2] - pixelCoordinates[0];
            const dy = pixelCoordinates[3] - pixelCoordinates[1];
            const radius = Math.sqrt(dx * dx + dy * dy);
            const context = this.context_;
            context.beginPath();
            context.arc(pixelCoordinates[0], pixelCoordinates[1], radius, 0, 2 * Math.PI);
            if (this.fillState_) context.fill();
            if (this.strokeState_) context.stroke();
        }
        if (this.text_ !== "") this.drawText_(geometry.getCenter(), 0, 2, 2);
    }
    /**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   */ setStyle(style) {
        this.setFillStrokeStyle(style.getFill(), style.getStroke());
        this.setImageStyle(style.getImage());
        this.setTextStyle(style.getText());
    }
    /**
   * @param {import("../../transform.js").Transform} transform Transform.
   */ setTransform(transform) {
        this.transform_ = transform;
    }
    /**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   */ drawGeometry(geometry) {
        const type = geometry.getType();
        switch(type){
            case "Point":
                this.drawPoint(/** @type {import("../../geom/Point.js").default} */ geometry);
                break;
            case "LineString":
                this.drawLineString(/** @type {import("../../geom/LineString.js").default} */ geometry);
                break;
            case "Polygon":
                this.drawPolygon(/** @type {import("../../geom/Polygon.js").default} */ geometry);
                break;
            case "MultiPoint":
                this.drawMultiPoint(/** @type {import("../../geom/MultiPoint.js").default} */ geometry);
                break;
            case "MultiLineString":
                this.drawMultiLineString(/** @type {import("../../geom/MultiLineString.js").default} */ geometry);
                break;
            case "MultiPolygon":
                this.drawMultiPolygon(/** @type {import("../../geom/MultiPolygon.js").default} */ geometry);
                break;
            case "GeometryCollection":
                this.drawGeometryCollection(/** @type {import("../../geom/GeometryCollection.js").default} */ geometry);
                break;
            case "Circle":
                this.drawCircle(/** @type {import("../../geom/Circle.js").default} */ geometry);
                break;
            default:
        }
    }
    /**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   */ drawFeature(feature, style) {
        const geometry = style.getGeometryFunction()(feature);
        if (!geometry) return;
        this.setStyle(style);
        this.drawGeometry(geometry);
    }
    /**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   */ drawGeometryCollection(geometry) {
        const geometries = geometry.getGeometriesArray();
        for(let i = 0, ii = geometries.length; i < ii; ++i)this.drawGeometry(geometries[i]);
    }
    /**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   */ drawPoint(geometry) {
        if (this.squaredTolerance_) geometry = /** @type {import("../../geom/Point.js").default} */ geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
        const flatCoordinates = geometry.getFlatCoordinates();
        const stride = geometry.getStride();
        if (this.image_) this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
        if (this.text_ !== "") this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    /**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   */ drawMultiPoint(geometry) {
        if (this.squaredTolerance_) geometry = /** @type {import("../../geom/MultiPoint.js").default} */ geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
        const flatCoordinates = geometry.getFlatCoordinates();
        const stride = geometry.getStride();
        if (this.image_) this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
        if (this.text_ !== "") this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    /**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   */ drawLineString(geometry) {
        if (this.squaredTolerance_) geometry = /** @type {import("../../geom/LineString.js").default} */ geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
        if (!(0, $84be800ca44e672c$export$7b0a31e10bbff018)(this.extent_, geometry.getExtent())) return;
        if (this.strokeState_) {
            this.setContextStrokeState_(this.strokeState_);
            const context = this.context_;
            const flatCoordinates = geometry.getFlatCoordinates();
            context.beginPath();
            this.moveToLineTo_(flatCoordinates, 0, flatCoordinates.length, geometry.getStride(), false);
            context.stroke();
        }
        if (this.text_ !== "") {
            const flatMidpoint = geometry.getFlatMidpoint();
            this.drawText_(flatMidpoint, 0, 2, 2);
        }
    }
    /**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   */ drawMultiLineString(geometry) {
        if (this.squaredTolerance_) geometry = /** @type {import("../../geom/MultiLineString.js").default} */ geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
        const geometryExtent = geometry.getExtent();
        if (!(0, $84be800ca44e672c$export$7b0a31e10bbff018)(this.extent_, geometryExtent)) return;
        if (this.strokeState_) {
            this.setContextStrokeState_(this.strokeState_);
            const context = this.context_;
            const flatCoordinates = geometry.getFlatCoordinates();
            let offset = 0;
            const ends = /** @type {Array<number>} */ geometry.getEnds();
            const stride = geometry.getStride();
            context.beginPath();
            for(let i = 0, ii = ends.length; i < ii; ++i)offset = this.moveToLineTo_(flatCoordinates, offset, ends[i], stride, false);
            context.stroke();
        }
        if (this.text_ !== "") {
            const flatMidpoints = geometry.getFlatMidpoints();
            this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
        }
    }
    /**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   */ drawPolygon(geometry) {
        if (this.squaredTolerance_) geometry = /** @type {import("../../geom/Polygon.js").default} */ geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
        if (!(0, $84be800ca44e672c$export$7b0a31e10bbff018)(this.extent_, geometry.getExtent())) return;
        if (this.strokeState_ || this.fillState_) {
            if (this.fillState_) this.setContextFillState_(this.fillState_);
            if (this.strokeState_) this.setContextStrokeState_(this.strokeState_);
            const context = this.context_;
            context.beginPath();
            this.drawRings_(geometry.getOrientedFlatCoordinates(), 0, /** @type {Array<number>} */ geometry.getEnds(), geometry.getStride());
            if (this.fillState_) context.fill();
            if (this.strokeState_) context.stroke();
        }
        if (this.text_ !== "") {
            const flatInteriorPoint = geometry.getFlatInteriorPoint();
            this.drawText_(flatInteriorPoint, 0, 2, 2);
        }
    }
    /**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   */ drawMultiPolygon(geometry) {
        if (this.squaredTolerance_) geometry = /** @type {import("../../geom/MultiPolygon.js").default} */ geometry.simplifyTransformed(this.squaredTolerance_, this.userTransform_);
        if (!(0, $84be800ca44e672c$export$7b0a31e10bbff018)(this.extent_, geometry.getExtent())) return;
        if (this.strokeState_ || this.fillState_) {
            if (this.fillState_) this.setContextFillState_(this.fillState_);
            if (this.strokeState_) this.setContextStrokeState_(this.strokeState_);
            const context = this.context_;
            const flatCoordinates = geometry.getOrientedFlatCoordinates();
            let offset = 0;
            const endss = geometry.getEndss();
            const stride = geometry.getStride();
            context.beginPath();
            for(let i = 0, ii = endss.length; i < ii; ++i){
                const ends = endss[i];
                offset = this.drawRings_(flatCoordinates, offset, ends, stride);
            }
            if (this.fillState_) context.fill();
            if (this.strokeState_) context.stroke();
        }
        if (this.text_ !== "") {
            const flatInteriorPoints = geometry.getFlatInteriorPoints();
            this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
        }
    }
    /**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */ setContextFillState_(fillState) {
        const context = this.context_;
        const contextFillState = this.contextFillState_;
        if (!contextFillState) {
            context.fillStyle = fillState.fillStyle;
            this.contextFillState_ = {
                fillStyle: fillState.fillStyle
            };
        } else if (contextFillState.fillStyle != fillState.fillStyle) {
            contextFillState.fillStyle = fillState.fillStyle;
            context.fillStyle = fillState.fillStyle;
        }
    }
    /**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */ setContextStrokeState_(strokeState) {
        const context = this.context_;
        const contextStrokeState = this.contextStrokeState_;
        if (!contextStrokeState) {
            context.lineCap = strokeState.lineCap;
            context.setLineDash(strokeState.lineDash);
            context.lineDashOffset = strokeState.lineDashOffset;
            context.lineJoin = strokeState.lineJoin;
            context.lineWidth = strokeState.lineWidth;
            context.miterLimit = strokeState.miterLimit;
            context.strokeStyle = strokeState.strokeStyle;
            this.contextStrokeState_ = {
                lineCap: strokeState.lineCap,
                lineDash: strokeState.lineDash,
                lineDashOffset: strokeState.lineDashOffset,
                lineJoin: strokeState.lineJoin,
                lineWidth: strokeState.lineWidth,
                miterLimit: strokeState.miterLimit,
                strokeStyle: strokeState.strokeStyle
            };
        } else {
            if (contextStrokeState.lineCap != strokeState.lineCap) {
                contextStrokeState.lineCap = strokeState.lineCap;
                context.lineCap = strokeState.lineCap;
            }
            if (!(0, $69c1cc8ae30f997f$export$e9bab7fafb253603)(contextStrokeState.lineDash, strokeState.lineDash)) context.setLineDash(contextStrokeState.lineDash = strokeState.lineDash);
            if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
                contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
                context.lineDashOffset = strokeState.lineDashOffset;
            }
            if (contextStrokeState.lineJoin != strokeState.lineJoin) {
                contextStrokeState.lineJoin = strokeState.lineJoin;
                context.lineJoin = strokeState.lineJoin;
            }
            if (contextStrokeState.lineWidth != strokeState.lineWidth) {
                contextStrokeState.lineWidth = strokeState.lineWidth;
                context.lineWidth = strokeState.lineWidth;
            }
            if (contextStrokeState.miterLimit != strokeState.miterLimit) {
                contextStrokeState.miterLimit = strokeState.miterLimit;
                context.miterLimit = strokeState.miterLimit;
            }
            if (contextStrokeState.strokeStyle != strokeState.strokeStyle) {
                contextStrokeState.strokeStyle = strokeState.strokeStyle;
                context.strokeStyle = strokeState.strokeStyle;
            }
        }
    }
    /**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */ setContextTextState_(textState) {
        const context = this.context_;
        const contextTextState = this.contextTextState_;
        const textAlign = textState.textAlign ? textState.textAlign : (0, $ba06fcc662408736$export$94d53b95641b5766);
        if (!contextTextState) {
            context.font = textState.font;
            context.textAlign = textAlign;
            context.textBaseline = textState.textBaseline;
            this.contextTextState_ = {
                font: textState.font,
                textAlign: textAlign,
                textBaseline: textState.textBaseline
            };
        } else {
            if (contextTextState.font != textState.font) {
                contextTextState.font = textState.font;
                context.font = textState.font;
            }
            if (contextTextState.textAlign != textAlign) {
                contextTextState.textAlign = textAlign;
                context.textAlign = textAlign;
            }
            if (contextTextState.textBaseline != textState.textBaseline) {
                contextTextState.textBaseline = textState.textBaseline;
                context.textBaseline = textState.textBaseline;
            }
        }
    }
    /**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */ setFillStrokeStyle(fillStyle, strokeStyle) {
        if (!fillStyle) this.fillState_ = null;
        else {
            const fillStyleColor = fillStyle.getColor();
            this.fillState_ = {
                fillStyle: (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(fillStyleColor ? fillStyleColor : (0, $ba06fcc662408736$export$c495d52ee3fd74b2))
            };
        }
        if (!strokeStyle) this.strokeState_ = null;
        else {
            const strokeStyleColor = strokeStyle.getColor();
            const strokeStyleLineCap = strokeStyle.getLineCap();
            const strokeStyleLineDash = strokeStyle.getLineDash();
            const strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
            const strokeStyleLineJoin = strokeStyle.getLineJoin();
            const strokeStyleWidth = strokeStyle.getWidth();
            const strokeStyleMiterLimit = strokeStyle.getMiterLimit();
            const lineDash = strokeStyleLineDash ? strokeStyleLineDash : (0, $ba06fcc662408736$export$e21b4112fdc612fc);
            this.strokeState_ = {
                lineCap: strokeStyleLineCap !== undefined ? strokeStyleLineCap : (0, $ba06fcc662408736$export$17bd0c38d6ae694e),
                lineDash: this.pixelRatio_ === 1 ? lineDash : lineDash.map((n)=>n * this.pixelRatio_),
                lineDashOffset: (strokeStyleLineDashOffset ? strokeStyleLineDashOffset : (0, $ba06fcc662408736$export$e06efc2409049f76)) * this.pixelRatio_,
                lineJoin: strokeStyleLineJoin !== undefined ? strokeStyleLineJoin : (0, $ba06fcc662408736$export$365eb9648cf19bd0),
                lineWidth: (strokeStyleWidth !== undefined ? strokeStyleWidth : (0, $ba06fcc662408736$export$79661f132c62010e)) * this.pixelRatio_,
                miterLimit: strokeStyleMiterLimit !== undefined ? strokeStyleMiterLimit : (0, $ba06fcc662408736$export$80c1c01844597b7b),
                strokeStyle: (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(strokeStyleColor ? strokeStyleColor : (0, $ba06fcc662408736$export$1eb2eaecacf2031e))
            };
        }
    }
    /**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   */ setImageStyle(imageStyle) {
        let imageSize;
        if (!imageStyle || !(imageSize = imageStyle.getSize())) {
            this.image_ = null;
            return;
        }
        const imagePixelRatio = imageStyle.getPixelRatio(this.pixelRatio_);
        const imageAnchor = imageStyle.getAnchor();
        const imageOrigin = imageStyle.getOrigin();
        this.image_ = imageStyle.getImage(this.pixelRatio_);
        this.imageAnchorX_ = imageAnchor[0] * imagePixelRatio;
        this.imageAnchorY_ = imageAnchor[1] * imagePixelRatio;
        this.imageHeight_ = imageSize[1] * imagePixelRatio;
        this.imageOpacity_ = imageStyle.getOpacity();
        this.imageOriginX_ = imageOrigin[0];
        this.imageOriginY_ = imageOrigin[1];
        this.imageRotateWithView_ = imageStyle.getRotateWithView();
        this.imageRotation_ = imageStyle.getRotation();
        const imageScale = imageStyle.getScaleArray();
        this.imageScale_ = [
            imageScale[0] * this.pixelRatio_ / imagePixelRatio,
            imageScale[1] * this.pixelRatio_ / imagePixelRatio
        ];
        this.imageWidth_ = imageSize[0] * imagePixelRatio;
    }
    /**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   */ setTextStyle(textStyle) {
        if (!textStyle) this.text_ = "";
        else {
            const textFillStyle = textStyle.getFill();
            if (!textFillStyle) this.textFillState_ = null;
            else {
                const textFillStyleColor = textFillStyle.getColor();
                this.textFillState_ = {
                    fillStyle: (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(textFillStyleColor ? textFillStyleColor : (0, $ba06fcc662408736$export$c495d52ee3fd74b2))
                };
            }
            const textStrokeStyle = textStyle.getStroke();
            if (!textStrokeStyle) this.textStrokeState_ = null;
            else {
                const textStrokeStyleColor = textStrokeStyle.getColor();
                const textStrokeStyleLineCap = textStrokeStyle.getLineCap();
                const textStrokeStyleLineDash = textStrokeStyle.getLineDash();
                const textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
                const textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
                const textStrokeStyleWidth = textStrokeStyle.getWidth();
                const textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
                this.textStrokeState_ = {
                    lineCap: textStrokeStyleLineCap !== undefined ? textStrokeStyleLineCap : (0, $ba06fcc662408736$export$17bd0c38d6ae694e),
                    lineDash: textStrokeStyleLineDash ? textStrokeStyleLineDash : (0, $ba06fcc662408736$export$e21b4112fdc612fc),
                    lineDashOffset: textStrokeStyleLineDashOffset ? textStrokeStyleLineDashOffset : (0, $ba06fcc662408736$export$e06efc2409049f76),
                    lineJoin: textStrokeStyleLineJoin !== undefined ? textStrokeStyleLineJoin : (0, $ba06fcc662408736$export$365eb9648cf19bd0),
                    lineWidth: textStrokeStyleWidth !== undefined ? textStrokeStyleWidth : (0, $ba06fcc662408736$export$79661f132c62010e),
                    miterLimit: textStrokeStyleMiterLimit !== undefined ? textStrokeStyleMiterLimit : (0, $ba06fcc662408736$export$80c1c01844597b7b),
                    strokeStyle: (0, $172307d3521121a6$export$dc5b1400ac3a10a8)(textStrokeStyleColor ? textStrokeStyleColor : (0, $ba06fcc662408736$export$1eb2eaecacf2031e))
                };
            }
            const textFont = textStyle.getFont();
            const textOffsetX = textStyle.getOffsetX();
            const textOffsetY = textStyle.getOffsetY();
            const textRotateWithView = textStyle.getRotateWithView();
            const textRotation = textStyle.getRotation();
            const textScale = textStyle.getScaleArray();
            const textText = textStyle.getText();
            const textTextAlign = textStyle.getTextAlign();
            const textTextBaseline = textStyle.getTextBaseline();
            this.textState_ = {
                font: textFont !== undefined ? textFont : (0, $ba06fcc662408736$export$3847dfea4f8d4dfa),
                textAlign: textTextAlign !== undefined ? textTextAlign : (0, $ba06fcc662408736$export$94d53b95641b5766),
                textBaseline: textTextBaseline !== undefined ? textTextBaseline : (0, $ba06fcc662408736$export$cf2279a1bff62eb)
            };
            this.text_ = textText !== undefined ? Array.isArray(textText) ? textText.reduce((acc, t, i)=>acc += i % 2 ? " " : t, "") : textText : "";
            this.textOffsetX_ = textOffsetX !== undefined ? this.pixelRatio_ * textOffsetX : 0;
            this.textOffsetY_ = textOffsetY !== undefined ? this.pixelRatio_ * textOffsetY : 0;
            this.textRotateWithView_ = textRotateWithView !== undefined ? textRotateWithView : false;
            this.textRotation_ = textRotation !== undefined ? textRotation : 0;
            this.textScale_ = [
                this.pixelRatio_ * textScale[0],
                this.pixelRatio_ * textScale[1]
            ];
        }
    }
}
var $213b0117674a3f96$export$2e2bcd8739ae039 = $213b0117674a3f96$var$CanvasImmediateRenderer;







const $027b7b106c5e63cc$export$ab51038298418f25 = 0.5;
function $027b7b106c5e63cc$export$bd05e394339d469(size, transforms, features, styleFunction, extent, resolution, rotation) {
    const width = size[0] * $027b7b106c5e63cc$export$ab51038298418f25;
    const height = size[1] * $027b7b106c5e63cc$export$ab51038298418f25;
    const context = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(width, height);
    context.imageSmoothingEnabled = false;
    const canvas = context.canvas;
    const renderer = new (0, $213b0117674a3f96$export$2e2bcd8739ae039)(context, $027b7b106c5e63cc$export$ab51038298418f25, extent, null, rotation);
    const featureCount = features.length;
    // Stretch hit detection index to use the whole available color range
    const indexFactor = Math.floor(16777215 / featureCount);
    const featuresByZIndex = {};
    for(let i = 1; i <= featureCount; ++i){
        const feature = features[i - 1];
        const featureStyleFunction = feature.getStyleFunction() || styleFunction;
        if (!styleFunction) continue;
        let styles = featureStyleFunction(feature, resolution);
        if (!styles) continue;
        if (!Array.isArray(styles)) styles = [
            styles
        ];
        const index = i * indexFactor;
        const color = index.toString(16).padStart(7, "#00000");
        for(let j = 0, jj = styles.length; j < jj; ++j){
            const originalStyle = styles[j];
            const geometry = originalStyle.getGeometryFunction()(feature);
            if (!geometry || !(0, $84be800ca44e672c$export$7b0a31e10bbff018)(extent, geometry.getExtent())) continue;
            const style = originalStyle.clone();
            const fill = style.getFill();
            if (fill) fill.setColor(color);
            const stroke = style.getStroke();
            if (stroke) {
                stroke.setColor(color);
                stroke.setLineDash(null);
            }
            style.setText(undefined);
            const image = originalStyle.getImage();
            if (image && image.getOpacity() !== 0) {
                const imgSize = image.getImageSize();
                if (!imgSize) continue;
                const imgContext = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(imgSize[0], imgSize[1], undefined, {
                    alpha: false
                });
                const img = imgContext.canvas;
                imgContext.fillStyle = color;
                imgContext.fillRect(0, 0, img.width, img.height);
                style.setImage(new (0, $4dd3b6f7e2acb5b2$export$2e2bcd8739ae039)({
                    img: img,
                    imgSize: imgSize,
                    anchor: image.getAnchor(),
                    anchorXUnits: "pixels",
                    anchorYUnits: "pixels",
                    offset: image.getOrigin(),
                    opacity: 1,
                    size: image.getSize(),
                    scale: image.getScale(),
                    rotation: image.getRotation(),
                    rotateWithView: image.getRotateWithView()
                }));
            }
            const zIndex = style.getZIndex() || 0;
            let byGeometryType = featuresByZIndex[zIndex];
            if (!byGeometryType) {
                byGeometryType = {};
                featuresByZIndex[zIndex] = byGeometryType;
                byGeometryType["Polygon"] = [];
                byGeometryType["Circle"] = [];
                byGeometryType["LineString"] = [];
                byGeometryType["Point"] = [];
            }
            const type = geometry.getType();
            if (type === "GeometryCollection") {
                const geometries = /** @type {import("../../geom/GeometryCollection.js").default} */ geometry.getGeometriesArrayRecursive();
                for(let i = 0, ii = geometries.length; i < ii; ++i){
                    const geometry = geometries[i];
                    byGeometryType[geometry.getType().replace("Multi", "")].push(geometry, style);
                }
            } else byGeometryType[type.replace("Multi", "")].push(geometry, style);
        }
    }
    const zIndexKeys = Object.keys(featuresByZIndex).map(Number).sort((0, $69c1cc8ae30f997f$export$fcb633242ef15540));
    for(let i = 0, ii = zIndexKeys.length; i < ii; ++i){
        const byGeometryType = featuresByZIndex[zIndexKeys[i]];
        for(const type in byGeometryType){
            const geomAndStyle = byGeometryType[type];
            for(let j = 0, jj = geomAndStyle.length; j < jj; j += 2){
                renderer.setStyle(geomAndStyle[j + 1]);
                for(let k = 0, kk = transforms.length; k < kk; ++k){
                    renderer.setTransform(transforms[k]);
                    renderer.drawGeometry(geomAndStyle[j]);
                }
            }
        }
    }
    return context.getImageData(0, 0, canvas.width, canvas.height);
}
function $027b7b106c5e63cc$export$6d4d555ddbfffa32(pixel, features, imageData) {
    const resultFeatures = [];
    if (imageData) {
        const x = Math.floor(Math.round(pixel[0]) * $027b7b106c5e63cc$export$ab51038298418f25);
        const y = Math.floor(Math.round(pixel[1]) * $027b7b106c5e63cc$export$ab51038298418f25);
        // The pixel coordinate is clamped down to the hit-detect canvas' size to account
        // for browsers returning coordinates slightly larger than the actual canvas size
        // due to a non-integer pixel ratio.
        const index = ((0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(x, 0, imageData.width - 1) + (0, $57ec69d152197e1d$export$7d15b64cf5a3a4c4)(y, 0, imageData.height - 1) * imageData.width) * 4;
        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];
        const i = b + 256 * (g + 256 * r);
        const indexFactor = Math.floor(16777215 / features.length);
        if (i && i % indexFactor === 0) resultFeatures.push(features[i / indexFactor - 1]);
    }
    // @ts-ignore Features are copied from `features` to `resultFeatures` so the type should be the same
    return resultFeatures;
}





/**
 * @module ol/renderer/vector
 */ 

/**
 * Feature callback. The callback will be called with three arguments. The first
 * argument is one {@link module:ol/Feature~Feature feature} or {@link module:ol/render/Feature~RenderFeature render feature}
 * at the pixel, the second is the {@link module:ol/layer/Layer~Layer layer} of the feature and will be null for
 * unmanaged layers. The third is the {@link module:ol/geom/SimpleGeometry~SimpleGeometry} of the feature. For features
 * with a GeometryCollection geometry, it will be the first detected geometry from the collection.
 * @template T
 * @typedef {function(import("../Feature.js").FeatureLike, import("../layer/Layer.js").default<import("../source/Source").default>, import("../geom/SimpleGeometry.js").default): T} FeatureCallback
 */ /**
 * Tolerance for geometry simplification in device pixels.
 * @type {number}
 */ const $0441c6c4e8d0ef48$var$SIMPLIFY_TOLERANCE = 0.5;
/**
 * @const
 * @type {Object<import("../geom/Geometry.js").Type,
 *                function(import("../render/canvas/BuilderGroup.js").default, import("../geom/Geometry.js").default,
 *                         import("../style/Style.js").default, Object): void>}
 */ const $0441c6c4e8d0ef48$var$GEOMETRY_RENDERERS = {
    "Point": $0441c6c4e8d0ef48$var$renderPointGeometry,
    "LineString": $0441c6c4e8d0ef48$var$renderLineStringGeometry,
    "Polygon": $0441c6c4e8d0ef48$var$renderPolygonGeometry,
    "MultiPoint": $0441c6c4e8d0ef48$var$renderMultiPointGeometry,
    "MultiLineString": $0441c6c4e8d0ef48$var$renderMultiLineStringGeometry,
    "MultiPolygon": $0441c6c4e8d0ef48$var$renderMultiPolygonGeometry,
    "GeometryCollection": $0441c6c4e8d0ef48$var$renderGeometryCollectionGeometry,
    "Circle": $0441c6c4e8d0ef48$var$renderCircleGeometry
};
function $0441c6c4e8d0ef48$export$531ddd8416d52dfc(feature1, feature2) {
    return parseInt((0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature1), 10) - parseInt((0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature2), 10);
}
function $0441c6c4e8d0ef48$export$75084a70d324c1e6(resolution, pixelRatio) {
    const tolerance = $0441c6c4e8d0ef48$export$bdacc5b475012edb(resolution, pixelRatio);
    return tolerance * tolerance;
}
function $0441c6c4e8d0ef48$export$bdacc5b475012edb(resolution, pixelRatio) {
    return $0441c6c4e8d0ef48$var$SIMPLIFY_TOLERANCE * resolution / pixelRatio;
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
 * @param {import("../geom/Circle.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderCircleGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
    const fillStyle = style.getFill();
    const strokeStyle = style.getStroke();
    if (fillStyle || strokeStyle) {
        const circleReplay = builderGroup.getBuilder(style.getZIndex(), "Circle");
        circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
        circleReplay.drawCircle(geometry, feature);
    }
    const textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), "Text");
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
function $0441c6c4e8d0ef48$export$36f470a33a42f413(replayGroup, feature, style, squaredTolerance, listener, transform, declutterBuilderGroup) {
    let loading = false;
    const imageStyle = style.getImage();
    if (imageStyle) {
        const imageState = imageStyle.getImageState();
        if (imageState == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED || imageState == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).ERROR) imageStyle.unlistenImageChange(listener);
        else {
            if (imageState == (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).IDLE) imageStyle.load();
            imageStyle.listenImageChange(listener);
            loading = true;
        }
    }
    $0441c6c4e8d0ef48$var$renderFeatureInternal(replayGroup, feature, style, squaredTolerance, transform, declutterBuilderGroup);
    return loading;
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../style/Style.js").default} style Style.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderFeatureInternal(replayGroup, feature, style, squaredTolerance, transform, declutterBuilderGroup) {
    const geometry = style.getGeometryFunction()(feature);
    if (!geometry) return;
    const simplifiedGeometry = geometry.simplifyTransformed(squaredTolerance, transform);
    const renderer = style.getRenderer();
    if (renderer) $0441c6c4e8d0ef48$var$renderGeometry(replayGroup, simplifiedGeometry, style, feature);
    else {
        const geometryRenderer = $0441c6c4e8d0ef48$var$GEOMETRY_RENDERERS[simplifiedGeometry.getType()];
        geometryRenderer(replayGroup, simplifiedGeometry, style, feature, declutterBuilderGroup);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/Geometry.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 */ function $0441c6c4e8d0ef48$var$renderGeometry(replayGroup, geometry, style, feature) {
    if (geometry.getType() == "GeometryCollection") {
        const geometries = /** @type {import("../geom/GeometryCollection.js").default} */ geometry.getGeometries();
        for(let i = 0, ii = geometries.length; i < ii; ++i)$0441c6c4e8d0ef48$var$renderGeometry(replayGroup, geometries[i], style, feature);
        return;
    }
    const replay = replayGroup.getBuilder(style.getZIndex(), "Default");
    replay.drawCustom(/** @type {import("../geom/SimpleGeometry.js").default} */ geometry, feature, style.getRenderer(), style.getHitDetectionRenderer());
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderGeometryCollectionGeometry(replayGroup, geometry, style, feature, declutterBuilderGroup) {
    const geometries = geometry.getGeometriesArray();
    let i, ii;
    for(i = 0, ii = geometries.length; i < ii; ++i){
        const geometryRenderer = $0441c6c4e8d0ef48$var$GEOMETRY_RENDERERS[geometries[i].getType()];
        geometryRenderer(replayGroup, geometries[i], style, feature, declutterBuilderGroup);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/LineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderLineStringGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
    const strokeStyle = style.getStroke();
    if (strokeStyle) {
        const lineStringReplay = builderGroup.getBuilder(style.getZIndex(), "LineString");
        lineStringReplay.setFillStrokeStyle(null, strokeStyle);
        lineStringReplay.drawLineString(geometry, feature);
    }
    const textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), "Text");
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiLineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderMultiLineStringGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
    const strokeStyle = style.getStroke();
    if (strokeStyle) {
        const lineStringReplay = builderGroup.getBuilder(style.getZIndex(), "LineString");
        lineStringReplay.setFillStrokeStyle(null, strokeStyle);
        lineStringReplay.drawMultiLineString(geometry, feature);
    }
    const textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), "Text");
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderMultiPolygonGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
    const fillStyle = style.getFill();
    const strokeStyle = style.getStroke();
    if (strokeStyle || fillStyle) {
        const polygonReplay = builderGroup.getBuilder(style.getZIndex(), "Polygon");
        polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
        polygonReplay.drawMultiPolygon(geometry, feature);
    }
    const textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), "Text");
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Point.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderPointGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
    const imageStyle = style.getImage();
    const textStyle = style.getText();
    /** @type {import("../render/canvas.js").DeclutterImageWithText} */ let declutterImageWithText;
    if (imageStyle) {
        if (imageStyle.getImageState() != (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED) return;
        let imageBuilderGroup = builderGroup;
        if (declutterBuilderGroup) {
            const declutterMode = imageStyle.getDeclutterMode();
            if (declutterMode !== "none") {
                imageBuilderGroup = declutterBuilderGroup;
                if (declutterMode === "obstacle") {
                    // draw in non-declutter group:
                    const imageReplay = builderGroup.getBuilder(style.getZIndex(), "Image");
                    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
                    imageReplay.drawPoint(geometry, feature);
                } else if (textStyle && textStyle.getText()) declutterImageWithText = {};
            }
        }
        const imageReplay = imageBuilderGroup.getBuilder(style.getZIndex(), "Image");
        imageReplay.setImageStyle(imageStyle, declutterImageWithText);
        imageReplay.drawPoint(geometry, feature);
    }
    if (textStyle && textStyle.getText()) {
        let textBuilderGroup = builderGroup;
        if (declutterBuilderGroup) textBuilderGroup = declutterBuilderGroup;
        const textReplay = textBuilderGroup.getBuilder(style.getZIndex(), "Text");
        textReplay.setTextStyle(textStyle, declutterImageWithText);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPoint.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderMultiPointGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
    const imageStyle = style.getImage();
    const textStyle = style.getText();
    /** @type {import("../render/canvas.js").DeclutterImageWithText} */ let declutterImageWithText;
    if (imageStyle) {
        if (imageStyle.getImageState() != (0, $d5d27ccbbbef5bf5$export$2e2bcd8739ae039).LOADED) return;
        let imageBuilderGroup = builderGroup;
        if (declutterBuilderGroup) {
            const declutterMode = imageStyle.getDeclutterMode();
            if (declutterMode !== "none") {
                imageBuilderGroup = declutterBuilderGroup;
                if (declutterMode === "obstacle") {
                    // draw in non-declutter group:
                    const imageReplay = builderGroup.getBuilder(style.getZIndex(), "Image");
                    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
                    imageReplay.drawMultiPoint(geometry, feature);
                } else if (textStyle && textStyle.getText()) declutterImageWithText = {};
            }
        }
        const imageReplay = imageBuilderGroup.getBuilder(style.getZIndex(), "Image");
        imageReplay.setImageStyle(imageStyle, declutterImageWithText);
        imageReplay.drawMultiPoint(geometry, feature);
    }
    if (textStyle && textStyle.getText()) {
        let textBuilderGroup = builderGroup;
        if (declutterBuilderGroup) textBuilderGroup = declutterBuilderGroup;
        const textReplay = textBuilderGroup.getBuilder(style.getZIndex(), "Text");
        textReplay.setTextStyle(textStyle, declutterImageWithText);
        textReplay.drawText(geometry, feature);
    }
}
/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Polygon.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */ function $0441c6c4e8d0ef48$var$renderPolygonGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
    const fillStyle = style.getFill();
    const strokeStyle = style.getStroke();
    if (fillStyle || strokeStyle) {
        const polygonReplay = builderGroup.getBuilder(style.getZIndex(), "Polygon");
        polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
        polygonReplay.drawPolygon(geometry, feature);
    }
    const textStyle = style.getText();
    if (textStyle && textStyle.getText()) {
        const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(style.getZIndex(), "Text");
        textReplay.setTextStyle(textStyle);
        textReplay.drawText(geometry, feature);
    }
}






/**
 * @classdesc
 * Canvas renderer for vector layers.
 * @api
 */ class $75d0d33f029e4c07$var$CanvasVectorLayerRenderer extends (0, $df04b1ef9f892809$export$2e2bcd8739ae039) {
    /**
   * @param {import("../../layer/BaseVector.js").default} vectorLayer Vector layer.
   */ constructor(vectorLayer){
        super(vectorLayer);
        /** @private */ this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this);
        /**
     * @type {boolean}
     */ this.animatingOrInteracting_;
        /**
     * @type {ImageData|null}
     */ this.hitDetectionImageData_ = null;
        /**
     * @type {Array<import("../../Feature.js").default>}
     */ this.renderedFeatures_ = null;
        /**
     * @private
     * @type {number}
     */ this.renderedRevision_ = -1;
        /**
     * @private
     * @type {number}
     */ this.renderedResolution_ = NaN;
        /**
     * @private
     * @type {import("../../extent.js").Extent}
     */ this.renderedExtent_ = (0, $84be800ca44e672c$export$fe201bb3bbe031e9)();
        /**
     * @private
     * @type {import("../../extent.js").Extent}
     */ this.wrappedRenderedExtent_ = (0, $84be800ca44e672c$export$fe201bb3bbe031e9)();
        /**
     * @private
     * @type {number}
     */ this.renderedRotation_;
        /**
     * @private
     * @type {import("../../coordinate").Coordinate}
     */ this.renderedCenter_ = null;
        /**
     * @private
     * @type {import("../../proj/Projection").default}
     */ this.renderedProjection_ = null;
        /**
     * @private
     * @type {function(import("../../Feature.js").default, import("../../Feature.js").default): number|null}
     */ this.renderedRenderOrder_ = null;
        /**
     * @private
     * @type {import("../../render/canvas/ExecutorGroup").default}
     */ this.replayGroup_ = null;
        /**
     * A new replay group had to be created by `prepareFrame()`
     * @type {boolean}
     */ this.replayGroupChanged = true;
        /**
     * @type {import("../../render/canvas/ExecutorGroup").default}
     */ this.declutterExecutorGroup = null;
        /**
     * Clipping to be performed by `renderFrame()`
     * @type {boolean}
     */ this.clipping = true;
        /**
     * @private
     * @type {CanvasRenderingContext2D}
     */ this.compositionContext_ = null;
        /**
     * @private
     * @type {number}
     */ this.opacity_ = 1;
    }
    /**
   * @param {ExecutorGroup} executorGroup Executor group.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */ renderWorlds(executorGroup, frameState, declutterTree) {
        const extent = frameState.extent;
        const viewState = frameState.viewState;
        const center = viewState.center;
        const resolution = viewState.resolution;
        const projection = viewState.projection;
        const rotation = viewState.rotation;
        const projectionExtent = projection.getExtent();
        const vectorSource = this.getLayer().getSource();
        const pixelRatio = frameState.pixelRatio;
        const viewHints = frameState.viewHints;
        const snapToPixel = !(viewHints[(0, $da1f857e3747bc07$export$2e2bcd8739ae039).ANIMATING] || viewHints[(0, $da1f857e3747bc07$export$2e2bcd8739ae039).INTERACTING]);
        const context = this.compositionContext_;
        const width = Math.round(frameState.size[0] * pixelRatio);
        const height = Math.round(frameState.size[1] * pixelRatio);
        const multiWorld = vectorSource.getWrapX() && projection.canWrapX();
        const worldWidth = multiWorld ? (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(projectionExtent) : null;
        const endWorld = multiWorld ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1 : 1;
        let world = multiWorld ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth) : 0;
        do {
            const transform = this.getRenderTransform(center, resolution, rotation, pixelRatio, width, height, world * worldWidth);
            executorGroup.execute(context, 1, transform, rotation, snapToPixel, undefined, declutterTree);
        }while (++world < endWorld);
    }
    setupCompositionContext_() {
        if (this.opacity_ !== 1) {
            const compositionContext = (0, $1d92219e1eaa7bd2$export$9e05d10eae75c464)(this.context.canvas.width, this.context.canvas.height, (0, $df04b1ef9f892809$export$a166f0857c555517));
            this.compositionContext_ = compositionContext;
        } else this.compositionContext_ = this.context;
    }
    releaseCompositionContext_() {
        if (this.opacity_ !== 1) {
            const alpha = this.context.globalAlpha;
            this.context.globalAlpha = this.opacity_;
            this.context.drawImage(this.compositionContext_.canvas, 0, 0);
            this.context.globalAlpha = alpha;
            (0, $1d92219e1eaa7bd2$export$e918ac6a1026a12a)(this.compositionContext_);
            (0, $df04b1ef9f892809$export$a166f0857c555517).push(this.compositionContext_.canvas);
            this.compositionContext_ = null;
        }
    }
    /**
   * Render declutter items for this layer
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */ renderDeclutter(frameState) {
        if (this.declutterExecutorGroup) {
            this.setupCompositionContext_();
            this.renderWorlds(this.declutterExecutorGroup, frameState, frameState.declutterTree);
            this.releaseCompositionContext_();
        }
    }
    /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */ renderFrame(frameState, target) {
        const pixelRatio = frameState.pixelRatio;
        const layerState = frameState.layerStatesArray[frameState.layerIndex];
        // set forward and inverse pixel transforms
        (0, $d59a735b25ae191a$export$3e4e33ea14aeb531)(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
        (0, $d59a735b25ae191a$export$bd70ea2a93c0fa4)(this.inversePixelTransform, this.pixelTransform);
        const canvasTransform = (0, $d59a735b25ae191a$export$f84e8e69fd4488a5)(this.pixelTransform);
        this.useContainer(target, canvasTransform, this.getBackground(frameState));
        const context = this.context;
        const canvas = context.canvas;
        const replayGroup = this.replayGroup_;
        const declutterExecutorGroup = this.declutterExecutorGroup;
        if ((!replayGroup || replayGroup.isEmpty()) && (!declutterExecutorGroup || declutterExecutorGroup.isEmpty())) return null;
        // resize and clear
        const width = Math.round(frameState.size[0] * pixelRatio);
        const height = Math.round(frameState.size[1] * pixelRatio);
        if (canvas.width != width || canvas.height != height) {
            canvas.width = width;
            canvas.height = height;
            if (canvas.style.transform !== canvasTransform) canvas.style.transform = canvasTransform;
        } else if (!this.containerReused) context.clearRect(0, 0, width, height);
        this.preRender(context, frameState);
        const viewState = frameState.viewState;
        const projection = viewState.projection;
        this.opacity_ = layerState.opacity;
        this.setupCompositionContext_();
        // clipped rendering if layer extent is set
        let clipped = false;
        let render = true;
        if (layerState.extent && this.clipping) {
            const layerExtent = (0, $983289ae1d13cd2a$export$494be3a3a25689ca)(layerState.extent, projection);
            render = (0, $84be800ca44e672c$export$7b0a31e10bbff018)(layerExtent, frameState.extent);
            clipped = render && !(0, $84be800ca44e672c$export$be866b1e0809b17e)(layerExtent, frameState.extent);
            if (clipped) this.clipUnrotated(this.compositionContext_, frameState, layerExtent);
        }
        if (render) this.renderWorlds(replayGroup, frameState);
        if (clipped) this.compositionContext_.restore();
        this.releaseCompositionContext_();
        this.postRender(context, frameState);
        if (this.renderedRotation_ !== viewState.rotation) {
            this.renderedRotation_ = viewState.rotation;
            this.hitDetectionImageData_ = null;
        }
        return this.container;
    }
    /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise
   * that resolves with an array of features.
   */ getFeatures(pixel) {
        return new Promise((resolve)=>{
            if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
                const size = [
                    this.context.canvas.width,
                    this.context.canvas.height
                ];
                (0, $d59a735b25ae191a$export$5635d7ef4b8fee1c)(this.pixelTransform, size);
                const center = this.renderedCenter_;
                const resolution = this.renderedResolution_;
                const rotation = this.renderedRotation_;
                const projection = this.renderedProjection_;
                const extent = this.wrappedRenderedExtent_;
                const layer = this.getLayer();
                const transforms = [];
                const width = size[0] * (0, $027b7b106c5e63cc$export$ab51038298418f25);
                const height = size[1] * (0, $027b7b106c5e63cc$export$ab51038298418f25);
                transforms.push(this.getRenderTransform(center, resolution, rotation, (0, $027b7b106c5e63cc$export$ab51038298418f25), width, height, 0).slice());
                const source = layer.getSource();
                const projectionExtent = projection.getExtent();
                if (source.getWrapX() && projection.canWrapX() && !(0, $84be800ca44e672c$export$be866b1e0809b17e)(projectionExtent, extent)) {
                    let startX = extent[0];
                    const worldWidth = (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(projectionExtent);
                    let world = 0;
                    let offsetX;
                    while(startX < projectionExtent[0]){
                        --world;
                        offsetX = worldWidth * world;
                        transforms.push(this.getRenderTransform(center, resolution, rotation, (0, $027b7b106c5e63cc$export$ab51038298418f25), width, height, offsetX).slice());
                        startX += worldWidth;
                    }
                    world = 0;
                    startX = extent[2];
                    while(startX > projectionExtent[2]){
                        ++world;
                        offsetX = worldWidth * world;
                        transforms.push(this.getRenderTransform(center, resolution, rotation, (0, $027b7b106c5e63cc$export$ab51038298418f25), width, height, offsetX).slice());
                        startX -= worldWidth;
                    }
                }
                this.hitDetectionImageData_ = (0, $027b7b106c5e63cc$export$bd05e394339d469)(size, transforms, this.renderedFeatures_, layer.getStyleFunction(), extent, resolution, rotation);
            }
            resolve((0, $027b7b106c5e63cc$export$6d4d555ddbfffa32)(pixel, this.renderedFeatures_, this.hitDetectionImageData_));
        });
    }
    /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */ forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
        if (!this.replayGroup_) return undefined;
        const resolution = frameState.viewState.resolution;
        const rotation = frameState.viewState.rotation;
        const layer = this.getLayer();
        /** @type {!Object<string, import("../Map.js").HitMatch<T>|true>} */ const features = {};
        /**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
     * @param {number} distanceSq The squared distance to the click position
     * @return {T|undefined} Callback result.
     */ const featureCallback = function(feature, geometry, distanceSq) {
            const key = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature);
            const match = features[key];
            if (!match) {
                if (distanceSq === 0) {
                    features[key] = true;
                    return callback(feature, layer, geometry);
                }
                matches.push(features[key] = {
                    feature: feature,
                    layer: layer,
                    geometry: geometry,
                    distanceSq: distanceSq,
                    callback: callback
                });
            } else if (match !== true && distanceSq < match.distanceSq) {
                if (distanceSq === 0) {
                    features[key] = true;
                    matches.splice(matches.lastIndexOf(match), 1);
                    return callback(feature, layer, geometry);
                }
                match.geometry = geometry;
                match.distanceSq = distanceSq;
            }
            return undefined;
        };
        let result;
        const executorGroups = [
            this.replayGroup_
        ];
        if (this.declutterExecutorGroup) executorGroups.push(this.declutterExecutorGroup);
        executorGroups.some((executorGroup)=>{
            return result = executorGroup.forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, featureCallback, executorGroup === this.declutterExecutorGroup && frameState.declutterTree ? frameState.declutterTree.all().map((item)=>item.value) : null);
        });
        return result;
    }
    /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   */ handleFontsChanged() {
        const layer = this.getLayer();
        if (layer.getVisible() && this.replayGroup_) layer.changed();
    }
    /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */ handleStyleImageChange_(event) {
        this.renderIfReadyAndVisible();
    }
    /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */ prepareFrame(frameState) {
        const vectorLayer = this.getLayer();
        const vectorSource = vectorLayer.getSource();
        if (!vectorSource) return false;
        const animating = frameState.viewHints[(0, $da1f857e3747bc07$export$2e2bcd8739ae039).ANIMATING];
        const interacting = frameState.viewHints[(0, $da1f857e3747bc07$export$2e2bcd8739ae039).INTERACTING];
        const updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
        const updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();
        if (this.ready && !updateWhileAnimating && animating || !updateWhileInteracting && interacting) {
            this.animatingOrInteracting_ = true;
            return true;
        }
        this.animatingOrInteracting_ = false;
        const frameStateExtent = frameState.extent;
        const viewState = frameState.viewState;
        const projection = viewState.projection;
        const resolution = viewState.resolution;
        const pixelRatio = frameState.pixelRatio;
        const vectorLayerRevision = vectorLayer.getRevision();
        const vectorLayerRenderBuffer = vectorLayer.getRenderBuffer();
        let vectorLayerRenderOrder = vectorLayer.getRenderOrder();
        if (vectorLayerRenderOrder === undefined) vectorLayerRenderOrder = (0, $0441c6c4e8d0ef48$export$531ddd8416d52dfc);
        const center = viewState.center.slice();
        const extent = (0, $84be800ca44e672c$export$ab1029bcae9ddb4a)(frameStateExtent, vectorLayerRenderBuffer * resolution);
        const renderedExtent = extent.slice();
        const loadExtents = [
            extent.slice()
        ];
        const projectionExtent = projection.getExtent();
        if (vectorSource.getWrapX() && projection.canWrapX() && !(0, $84be800ca44e672c$export$be866b1e0809b17e)(projectionExtent, frameState.extent)) {
            // For the replay group, we need an extent that intersects the real world
            // (-180° to +180°). To support geometries in a coordinate range from -540°
            // to +540°, we add at least 1 world width on each side of the projection
            // extent. If the viewport is wider than the world, we need to add half of
            // the viewport width to make sure we cover the whole viewport.
            const worldWidth = (0, $84be800ca44e672c$export$3c49c185de0c2bfc)(projectionExtent);
            const gutter = Math.max((0, $84be800ca44e672c$export$3c49c185de0c2bfc)(extent) / 2, worldWidth);
            extent[0] = projectionExtent[0] - gutter;
            extent[2] = projectionExtent[2] + gutter;
            (0, $c65bc16e55ef0e33$export$39a9ce3624977b84)(center, projection);
            const loadExtent = (0, $84be800ca44e672c$export$39a9ce3624977b84)(loadExtents[0], projection);
            // If the extent crosses the date line, we load data for both edges of the worlds
            if (loadExtent[0] < projectionExtent[0] && loadExtent[2] < projectionExtent[2]) loadExtents.push([
                loadExtent[0] + worldWidth,
                loadExtent[1],
                loadExtent[2] + worldWidth,
                loadExtent[3]
            ]);
            else if (loadExtent[0] > projectionExtent[0] && loadExtent[2] > projectionExtent[2]) loadExtents.push([
                loadExtent[0] - worldWidth,
                loadExtent[1],
                loadExtent[2] - worldWidth,
                loadExtent[3]
            ]);
        }
        if (this.ready && this.renderedResolution_ == resolution && this.renderedRevision_ == vectorLayerRevision && this.renderedRenderOrder_ == vectorLayerRenderOrder && (0, $84be800ca44e672c$export$be866b1e0809b17e)(this.wrappedRenderedExtent_, extent)) {
            if (!(0, $69c1cc8ae30f997f$export$e9bab7fafb253603)(this.renderedExtent_, renderedExtent)) {
                this.hitDetectionImageData_ = null;
                this.renderedExtent_ = renderedExtent;
            }
            this.renderedCenter_ = center;
            this.replayGroupChanged = false;
            return true;
        }
        this.replayGroup_ = null;
        const replayGroup = new (0, $0b299ddc8624c50d$export$2e2bcd8739ae039)((0, $0441c6c4e8d0ef48$export$bdacc5b475012edb)(resolution, pixelRatio), extent, resolution, pixelRatio);
        let declutterBuilderGroup;
        if (this.getLayer().getDeclutter()) declutterBuilderGroup = new (0, $0b299ddc8624c50d$export$2e2bcd8739ae039)((0, $0441c6c4e8d0ef48$export$bdacc5b475012edb)(resolution, pixelRatio), extent, resolution, pixelRatio);
        const userProjection = (0, $983289ae1d13cd2a$export$3973b77d5f6f2790)();
        let userTransform;
        if (userProjection) {
            for(let i = 0, ii = loadExtents.length; i < ii; ++i){
                const extent = loadExtents[i];
                const userExtent = (0, $983289ae1d13cd2a$export$96bfd09e2cffb006)(extent, projection);
                vectorSource.loadFeatures(userExtent, (0, $983289ae1d13cd2a$export$b56bb8ad8b3a00e9)(resolution, projection), userProjection);
            }
            userTransform = (0, $983289ae1d13cd2a$export$e3c4995a701c26a3)(userProjection, projection);
        } else for(let i = 0, ii = loadExtents.length; i < ii; ++i)vectorSource.loadFeatures(loadExtents[i], resolution, projection);
        const squaredTolerance = (0, $0441c6c4e8d0ef48$export$75084a70d324c1e6)(resolution, pixelRatio);
        let ready = true;
        const render = /**
       * @param {import("../../Feature.js").default} feature Feature.
       */ (feature)=>{
            let styles;
            const styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
            if (styleFunction) styles = styleFunction(feature, resolution);
            if (styles) {
                const dirty = this.renderFeature(feature, squaredTolerance, styles, replayGroup, userTransform, declutterBuilderGroup);
                ready = ready && !dirty;
            }
        };
        const userExtent = (0, $983289ae1d13cd2a$export$96bfd09e2cffb006)(extent, projection);
        /** @type {Array<import("../../Feature.js").default>} */ const features = vectorSource.getFeaturesInExtent(userExtent);
        if (vectorLayerRenderOrder) features.sort(vectorLayerRenderOrder);
        for(let i = 0, ii = features.length; i < ii; ++i)render(features[i]);
        this.renderedFeatures_ = features;
        this.ready = ready;
        const replayGroupInstructions = replayGroup.finish();
        const executorGroup = new (0, $9ab3bb4278f389ba$export$2e2bcd8739ae039)(extent, resolution, pixelRatio, vectorSource.getOverlaps(), replayGroupInstructions, vectorLayer.getRenderBuffer());
        if (declutterBuilderGroup) this.declutterExecutorGroup = new (0, $9ab3bb4278f389ba$export$2e2bcd8739ae039)(extent, resolution, pixelRatio, vectorSource.getOverlaps(), declutterBuilderGroup.finish(), vectorLayer.getRenderBuffer());
        this.renderedResolution_ = resolution;
        this.renderedRevision_ = vectorLayerRevision;
        this.renderedRenderOrder_ = vectorLayerRenderOrder;
        this.renderedExtent_ = renderedExtent;
        this.wrappedRenderedExtent_ = extent;
        this.renderedCenter_ = center;
        this.renderedProjection_ = projection;
        this.replayGroup_ = executorGroup;
        this.hitDetectionImageData_ = null;
        this.replayGroupChanged = true;
        return true;
    }
    /**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} squaredTolerance Squared render tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
   * @param {import("../../proj.js").TransformFunction} [transform] Transform from user to view projection.
   * @param {import("../../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
   * @return {boolean} `true` if an image is loading.
   */ renderFeature(feature, squaredTolerance, styles, builderGroup, transform, declutterBuilderGroup) {
        if (!styles) return false;
        let loading = false;
        if (Array.isArray(styles)) for(let i = 0, ii = styles.length; i < ii; ++i)loading = (0, $0441c6c4e8d0ef48$export$36f470a33a42f413)(builderGroup, feature, styles[i], squaredTolerance, this.boundHandleStyleImageChange_, transform, declutterBuilderGroup) || loading;
        else loading = (0, $0441c6c4e8d0ef48$export$36f470a33a42f413)(builderGroup, feature, styles, squaredTolerance, this.boundHandleStyleImageChange_, transform, declutterBuilderGroup);
        return loading;
    }
}
var $75d0d33f029e4c07$export$2e2bcd8739ae039 = $75d0d33f029e4c07$var$CanvasVectorLayerRenderer;


/**
 * @classdesc
 * Vector data is rendered client-side, as vectors. This layer type provides most accurate rendering
 * even during animations. Points and labels stay upright on rotated views. For very large
 * amounts of vector data, performance may suffer during pan and zoom animations. In this case,
 * try {@link module:ol/layer/VectorImage~VectorImageLayer}.
 *
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default} VectorSourceType
 * @extends {BaseVectorLayer<VectorSourceType, CanvasVectorLayerRenderer>}
 * @api
 */ class $fef14e10fb9831ec$var$VectorLayer extends (0, $d0e9dd5889579bca$export$2e2bcd8739ae039) {
    /**
   * @param {import("./BaseVector.js").Options<VectorSourceType>} [options] Options.
   */ constructor(options){
        super(options);
    }
    createRenderer() {
        return new (0, $75d0d33f029e4c07$export$2e2bcd8739ae039)(this);
    }
}
var $fef14e10fb9831ec$export$2e2bcd8739ae039 = $fef14e10fb9831ec$var$VectorLayer;


/**
 * @module ol/source/Vector
 */ /**
 * @module ol/Collection
 */ 

/**
 * @module ol/CollectionEventType
 */ /**
 * @enum {string}
 */ var $df86962829eabf3c$export$2e2bcd8739ae039 = {
    /**
   * Triggered when an item is added to the collection.
   * @event module:ol/Collection.CollectionEvent#add
   * @api
   */ ADD: "add",
    /**
   * Triggered when an item is removed from the collection.
   * @event module:ol/Collection.CollectionEvent#remove
   * @api
   */ REMOVE: "remove"
};



/**
 * @enum {string}
 * @private
 */ const $6ba3969272323605$var$Property = {
    LENGTH: "length"
};
class $6ba3969272323605$export$a87ae6eb2761ec6d extends (0, $f22c10e3757627da$export$2e2bcd8739ae039) {
    /**
   * @param {import("./CollectionEventType.js").default} type Type.
   * @param {T} element Element.
   * @param {number} index The index of the added or removed element.
   */ constructor(type, element, index){
        super(type);
        /**
     * The element that is added to or removed from the collection.
     * @type {T}
     * @api
     */ this.element = element;
        /**
     * The index of the added or removed element.
     * @type {number}
     * @api
     */ this.index = index;
    }
}
/***
 * @template T
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:length', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").OnSignature<'add'|'remove', CollectionEvent<T>, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types|
 *     'change:length'|'add'|'remove',Return>} CollectionOnSignature
 */ /**
 * @typedef {Object} Options
 * @property {boolean} [unique=false] Disallow the same item from being added to
 * the collection twice.
 */ /**
 * @classdesc
 * An expanded version of standard JS Array, adding convenience methods for
 * manipulation. Add and remove changes to the Collection trigger a Collection
 * event. Note that this does not cover changes to the objects _within_ the
 * Collection; they trigger events on the appropriate object, not on the
 * Collection as a whole.
 *
 * @fires CollectionEvent
 *
 * @template T
 * @api
 */ class $6ba3969272323605$var$Collection extends (0, $d6cd7f1b627d5e92$export$2e2bcd8739ae039) {
    /**
   * @param {Array<T>} [array] Array.
   * @param {Options} [options] Collection options.
   */ constructor(array, options){
        super();
        /***
     * @type {CollectionOnSignature<T, import("./events").EventsKey>}
     */ this.on;
        /***
     * @type {CollectionOnSignature<T, import("./events").EventsKey>}
     */ this.once;
        /***
     * @type {CollectionOnSignature<T, void>}
     */ this.un;
        options = options || {};
        /**
     * @private
     * @type {boolean}
     */ this.unique_ = !!options.unique;
        /**
     * @private
     * @type {!Array<T>}
     */ this.array_ = array ? array : [];
        if (this.unique_) for(let i = 0, ii = this.array_.length; i < ii; ++i)this.assertUnique_(this.array_[i], i);
        this.updateLength_();
    }
    /**
   * Remove all elements from the collection.
   * @api
   */ clear() {
        while(this.getLength() > 0)this.pop();
    }
    /**
   * Add elements to the collection.  This pushes each item in the provided array
   * to the end of the collection.
   * @param {!Array<T>} arr Array.
   * @return {Collection<T>} This collection.
   * @api
   */ extend(arr) {
        for(let i = 0, ii = arr.length; i < ii; ++i)this.push(arr[i]);
        return this;
    }
    /**
   * Iterate over each element, calling the provided callback.
   * @param {function(T, number, Array<T>): *} f The function to call
   *     for every element. This function takes 3 arguments (the element, the
   *     index and the array). The return value is ignored.
   * @api
   */ forEach(f) {
        const array = this.array_;
        for(let i = 0, ii = array.length; i < ii; ++i)f(array[i], i, array);
    }
    /**
   * Get a reference to the underlying Array object. Warning: if the array
   * is mutated, no events will be dispatched by the collection, and the
   * collection's "length" property won't be in sync with the actual length
   * of the array.
   * @return {!Array<T>} Array.
   * @api
   */ getArray() {
        return this.array_;
    }
    /**
   * Get the element at the provided index.
   * @param {number} index Index.
   * @return {T} Element.
   * @api
   */ item(index) {
        return this.array_[index];
    }
    /**
   * Get the length of this collection.
   * @return {number} The length of the array.
   * @observable
   * @api
   */ getLength() {
        return this.get($6ba3969272323605$var$Property.LENGTH);
    }
    /**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */ insertAt(index, elem) {
        if (index < 0 || index > this.getLength()) throw new Error("Index out of bounds: " + index);
        if (this.unique_) this.assertUnique_(elem);
        this.array_.splice(index, 0, elem);
        this.updateLength_();
        this.dispatchEvent(new $6ba3969272323605$export$a87ae6eb2761ec6d((0, $df86962829eabf3c$export$2e2bcd8739ae039).ADD, elem, index));
    }
    /**
   * Remove the last element of the collection and return it.
   * Return `undefined` if the collection is empty.
   * @return {T|undefined} Element.
   * @api
   */ pop() {
        return this.removeAt(this.getLength() - 1);
    }
    /**
   * Insert the provided element at the end of the collection.
   * @param {T} elem Element.
   * @return {number} New length of the collection.
   * @api
   */ push(elem) {
        if (this.unique_) this.assertUnique_(elem);
        const n = this.getLength();
        this.insertAt(n, elem);
        return this.getLength();
    }
    /**
   * Remove the first occurrence of an element from the collection.
   * @param {T} elem Element.
   * @return {T|undefined} The removed element or undefined if none found.
   * @api
   */ remove(elem) {
        const arr = this.array_;
        for(let i = 0, ii = arr.length; i < ii; ++i){
            if (arr[i] === elem) return this.removeAt(i);
        }
        return undefined;
    }
    /**
   * Remove the element at the provided index and return it.
   * Return `undefined` if the collection does not contain this index.
   * @param {number} index Index.
   * @return {T|undefined} Value.
   * @api
   */ removeAt(index) {
        if (index < 0 || index >= this.getLength()) return undefined;
        const prev = this.array_[index];
        this.array_.splice(index, 1);
        this.updateLength_();
        this.dispatchEvent(/** @type {CollectionEvent<T>} */ new $6ba3969272323605$export$a87ae6eb2761ec6d((0, $df86962829eabf3c$export$2e2bcd8739ae039).REMOVE, prev, index));
        return prev;
    }
    /**
   * Set the element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */ setAt(index, elem) {
        const n = this.getLength();
        if (index >= n) {
            this.insertAt(index, elem);
            return;
        }
        if (index < 0) throw new Error("Index out of bounds: " + index);
        if (this.unique_) this.assertUnique_(elem, index);
        const prev = this.array_[index];
        this.array_[index] = elem;
        this.dispatchEvent(/** @type {CollectionEvent<T>} */ new $6ba3969272323605$export$a87ae6eb2761ec6d((0, $df86962829eabf3c$export$2e2bcd8739ae039).REMOVE, prev, index));
        this.dispatchEvent(/** @type {CollectionEvent<T>} */ new $6ba3969272323605$export$a87ae6eb2761ec6d((0, $df86962829eabf3c$export$2e2bcd8739ae039).ADD, elem, index));
    }
    /**
   * @private
   */ updateLength_() {
        this.set($6ba3969272323605$var$Property.LENGTH, this.array_.length);
    }
    /**
   * @private
   * @param {T} elem Element.
   * @param {number} [except] Optional index to ignore.
   */ assertUnique_(elem, except) {
        for(let i = 0, ii = this.array_.length; i < ii; ++i){
            if (this.array_[i] === elem && i !== except) throw new (0, $fc1e13bda45b0626$export$2e2bcd8739ae039)(58);
        }
    }
}
var $6ba3969272323605$export$2e2bcd8739ae039 = $6ba3969272323605$var$Collection;






/**
 * @module ol/structs/RBush
 */ 



/**
 * @typedef {Object} Entry
 * @property {number} minX MinX.
 * @property {number} minY MinY.
 * @property {number} maxX MaxX.
 * @property {number} maxY MaxY.
 * @property {Object} [value] Value.
 */ /**
 * @classdesc
 * Wrapper around the RBush by Vladimir Agafonkin.
 * See https://github.com/mourner/rbush.
 *
 * @template T
 */ class $15b6a1746ef633ad$var$RBush {
    /**
   * @param {number} [maxEntries] Max entries.
   */ constructor(maxEntries){
        /**
     * @private
     */ this.rbush_ = new (0, (/*@__PURE__*/$parcel$interopDefault($878c4f61c06eb00a$exports)))(maxEntries);
        /**
     * A mapping between the objects added to this rbush wrapper
     * and the objects that are actually added to the internal rbush.
     * @private
     * @type {Object<string, Entry>}
     */ this.items_ = {};
    }
    /**
   * Insert a value into the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */ insert(extent, value) {
        /** @type {Entry} */ const item = {
            minX: extent[0],
            minY: extent[1],
            maxX: extent[2],
            maxY: extent[3],
            value: value
        };
        this.rbush_.insert(item);
        this.items_[(0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(value)] = item;
    }
    /**
   * Bulk-insert values into the RBush.
   * @param {Array<import("../extent.js").Extent>} extents Extents.
   * @param {Array<T>} values Values.
   */ load(extents, values) {
        const items = new Array(values.length);
        for(let i = 0, l = values.length; i < l; i++){
            const extent = extents[i];
            const value = values[i];
            /** @type {Entry} */ const item = {
                minX: extent[0],
                minY: extent[1],
                maxX: extent[2],
                maxY: extent[3],
                value: value
            };
            items[i] = item;
            this.items_[(0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(value)] = item;
        }
        this.rbush_.load(items);
    }
    /**
   * Remove a value from the RBush.
   * @param {T} value Value.
   * @return {boolean} Removed.
   */ remove(value) {
        const uid = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(value);
        // get the object in which the value was wrapped when adding to the
        // internal rbush. then use that object to do the removal.
        const item = this.items_[uid];
        delete this.items_[uid];
        return this.rbush_.remove(item) !== null;
    }
    /**
   * Update the extent of a value in the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */ update(extent, value) {
        const item = this.items_[(0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(value)];
        const bbox = [
            item.minX,
            item.minY,
            item.maxX,
            item.maxY
        ];
        if (!(0, $84be800ca44e672c$export$e9bab7fafb253603)(bbox, extent)) {
            this.remove(value);
            this.insert(extent, value);
        }
    }
    /**
   * Return all values in the RBush.
   * @return {Array<T>} All.
   */ getAll() {
        const items = this.rbush_.all();
        return items.map(function(item) {
            return item.value;
        });
    }
    /**
   * Return all values in the given extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<T>} All in extent.
   */ getInExtent(extent) {
        /** @type {Entry} */ const bbox = {
            minX: extent[0],
            minY: extent[1],
            maxX: extent[2],
            maxY: extent[3]
        };
        const items = this.rbush_.search(bbox);
        return items.map(function(item) {
            return item.value;
        });
    }
    /**
   * Calls a callback function with each value in the tree.
   * If the callback returns a truthy value, this value is returned without
   * checking the rest of the tree.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */ forEach(callback) {
        return this.forEach_(this.getAll(), callback);
    }
    /**
   * Calls a callback function with each value in the provided extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */ forEachInExtent(extent, callback) {
        return this.forEach_(this.getInExtent(extent), callback);
    }
    /**
   * @param {Array<T>} values Values.
   * @param {function(T): *} callback Callback.
   * @private
   * @return {*} Callback return value.
   */ forEach_(values, callback) {
        let result;
        for(let i = 0, l = values.length; i < l; i++){
            result = callback(values[i]);
            if (result) return result;
        }
        return result;
    }
    /**
   * @return {boolean} Is empty.
   */ isEmpty() {
        return (0, $e2dfef87a88758ed$export$dd1bc94b04021eeb)(this.items_);
    }
    /**
   * Remove all values from the RBush.
   */ clear() {
        this.rbush_.clear();
        this.items_ = {};
    }
    /**
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} Extent.
   */ getExtent(extent) {
        const data = this.rbush_.toJSON();
        return (0, $84be800ca44e672c$export$958e3e1a02eac4b6)(data.minX, data.minY, data.maxX, data.maxY, extent);
    }
    /**
   * @param {RBush} rbush R-Tree.
   */ concat(rbush) {
        this.rbush_.load(rbush.rbush_.all());
        for(const i in rbush.items_)this.items_[i] = rbush.items_[i];
    }
}
var $15b6a1746ef633ad$export$2e2bcd8739ae039 = $15b6a1746ef633ad$var$RBush;


/**
 * @module ol/source/Source
 */ 

/**
 * @typedef {'undefined' | 'loading' | 'ready' | 'error'} State
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */ /**
 * A function that takes a {@link import("../View.js").ViewStateLayerStateExtent} and returns a string or
 * an array of strings representing source attributions.
 *
 * @typedef {function(import("../View.js").ViewStateLayerStateExtent): (string|Array<string>)} Attribution
 */ /**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 */ /**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("./Source.js").State} [state='ready'] State.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */ /**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */ class $3a045db4be96b02c$var$Source extends (0, $d6cd7f1b627d5e92$export$2e2bcd8739ae039) {
    /**
   * @param {Options} options Source options.
   */ constructor(options){
        super();
        /**
     * @protected
     * @type {import("../proj/Projection.js").default|null}
     */ this.projection = (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.projection);
        /**
     * @private
     * @type {?Attribution}
     */ this.attributions_ = $3a045db4be96b02c$var$adaptAttributions(options.attributions);
        /**
     * @private
     * @type {boolean}
     */ this.attributionsCollapsible_ = options.attributionsCollapsible !== undefined ? options.attributionsCollapsible : true;
        /**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */ this.loading = false;
        /**
     * @private
     * @type {import("./Source.js").State}
     */ this.state_ = options.state !== undefined ? options.state : "ready";
        /**
     * @private
     * @type {boolean}
     */ this.wrapX_ = options.wrapX !== undefined ? options.wrapX : false;
        /**
     * @private
     * @type {boolean}
     */ this.interpolate_ = !!options.interpolate;
        /**
     * @protected
     * @type {function(import("../View.js").ViewOptions):void}
     */ this.viewResolver = null;
        /**
     * @protected
     * @type {function(Error):void}
     */ this.viewRejector = null;
        const self = this;
        /**
     * @private
     * @type {Promise<import("../View.js").ViewOptions>}
     */ this.viewPromise_ = new Promise(function(resolve, reject) {
            self.viewResolver = resolve;
            self.viewRejector = reject;
        });
    }
    /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */ getAttributions() {
        return this.attributions_;
    }
    /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */ getAttributionsCollapsible() {
        return this.attributionsCollapsible_;
    }
    /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */ getProjection() {
        return this.projection;
    }
    /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */ getResolutions(projection) {
        return null;
    }
    /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */ getView() {
        return this.viewPromise_;
    }
    /**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */ getState() {
        return this.state_;
    }
    /**
   * @return {boolean|undefined} Wrap X.
   */ getWrapX() {
        return this.wrapX_;
    }
    /**
   * @return {boolean} Use linear interpolation when resampling.
   */ getInterpolate() {
        return this.interpolate_;
    }
    /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */ refresh() {
        this.changed();
    }
    /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */ setAttributions(attributions) {
        this.attributions_ = $3a045db4be96b02c$var$adaptAttributions(attributions);
        this.changed();
    }
    /**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */ setState(state) {
        this.state_ = state;
        this.changed();
    }
}
/**
 * Turns the attributions option into an attributions function.
 * @param {AttributionLike|undefined} attributionLike The attribution option.
 * @return {Attribution|null} An attribution function (or null).
 */ function $3a045db4be96b02c$var$adaptAttributions(attributionLike) {
    if (!attributionLike) return null;
    if (Array.isArray(attributionLike)) return function(frameState) {
        return attributionLike;
    };
    if (typeof attributionLike === "function") return attributionLike;
    return function(frameState) {
        return [
            attributionLike
        ];
    };
}
var $3a045db4be96b02c$export$2e2bcd8739ae039 = $3a045db4be96b02c$var$Source;


/**
 * @module ol/source/VectorEventType
 */ /**
 * @enum {string}
 */ var $9fd34b6c79aa89b0$export$2e2bcd8739ae039 /**
 * @typedef {'addfeature'|'changefeature'|'clear'|'removefeature'|'featuresloadstart'|'featuresloadend'|'featuresloaderror'} VectorSourceEventTypes
 */  = {
    /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */ ADDFEATURE: "addfeature",
    /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */ CHANGEFEATURE: "changefeature",
    /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */ CLEAR: "clear",
    /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */ REMOVEFEATURE: "removefeature",
    /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */ FEATURESLOADSTART: "featuresloadstart",
    /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */ FEATURESLOADEND: "featuresloadend",
    /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */ FEATURESLOADERROR: "featuresloaderror"
};



/**
 * @module ol/loadingstrategy
 */ 
function $efc4a0254bd212ee$export$84bf76cd7afc7469(extent, resolution) {
    return [
        [
            -Infinity,
            -Infinity,
            Infinity,
            Infinity
        ]
    ];
}
function $efc4a0254bd212ee$export$bf67010aacbe66fa(extent, resolution) {
    return [
        extent
    ];
}
function $efc4a0254bd212ee$export$3c17558da18e4d75(tileGrid) {
    return(/**
     * @param {import("./extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {import("./proj.js").Projection} projection Projection.
     * @return {Array<import("./extent.js").Extent>} Extents.
     */ function(extent, resolution, projection) {
        const z = tileGrid.getZForResolution((0, $983289ae1d13cd2a$export$bd1cd3b88140b906)(resolution, projection));
        const tileRange = tileGrid.getTileRangeForExtentAndZ((0, $983289ae1d13cd2a$export$494be3a3a25689ca)(extent, projection), z);
        /** @type {Array<import("./extent.js").Extent>} */ const extents = [];
        /** @type {import("./tilecoord.js").TileCoord} */ const tileCoord = [
            z,
            0,
            0
        ];
        for(tileCoord[1] = tileRange.minX; tileCoord[1] <= tileRange.maxX; ++tileCoord[1])for(tileCoord[2] = tileRange.minY; tileCoord[2] <= tileRange.maxY; ++tileCoord[2])extents.push((0, $983289ae1d13cd2a$export$96bfd09e2cffb006)(tileGrid.getTileCoordExtent(tileCoord), projection));
        return extents;
    });
}








/**
 * @module ol/featureloader
 */ 
/**
 *
 * @type {boolean}
 * @private
 */ let $8b4a0712f48d5df6$var$withCredentials = false;
function $8b4a0712f48d5df6$export$441d7b57adab24d0(url, format, extent, resolution, projection, success, failure) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", typeof url === "function" ? url(extent, resolution, projection) : url, true);
    if (format.getType() == "arraybuffer") xhr.responseType = "arraybuffer";
    xhr.withCredentials = $8b4a0712f48d5df6$var$withCredentials;
    /**
   * @param {Event} event Event.
   * @private
   */ xhr.onload = function(event) {
        // status will be 0 for file:// urls
        if (!xhr.status || xhr.status >= 200 && xhr.status < 300) {
            const type = format.getType();
            /** @type {Document|Node|Object|string|undefined} */ let source;
            if (type == "json" || type == "text") source = xhr.responseText;
            else if (type == "xml") {
                source = xhr.responseXML;
                if (!source) source = new DOMParser().parseFromString(xhr.responseText, "application/xml");
            } else if (type == "arraybuffer") source = /** @type {ArrayBuffer} */ xhr.response;
            if (source) success(/** @type {Array<import("./Feature.js").default>} */ format.readFeatures(source, {
                extent: extent,
                featureProjection: projection
            }), format.readProjection(source));
            else failure();
        } else failure();
    };
    /**
   * @private
   */ xhr.onerror = failure;
    xhr.send();
}
function $8b4a0712f48d5df6$export$14cc81df70b6707e(url, format) {
    /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("./proj/Projection.js").default} projection Projection.
   * @param {function(Array<import("./Feature.js").default>): void} [success] Success
   *      Function called when loading succeeded.
   * @param {function(): void} [failure] Failure
   *      Function called when loading failed.
   */ return function(extent, resolution, projection, success, failure) {
        const source = /** @type {import("./source/Vector").default} */ this;
        $8b4a0712f48d5df6$export$441d7b57adab24d0(url, format, extent, resolution, projection, /**
       * @param {Array<import("./Feature.js").default>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */ function(features, dataProjection) {
            source.addFeatures(features);
            if (success !== undefined) success(features);
        }, /* FIXME handle error */ failure ? failure : (0, $2c3aa3ce33eccc0f$export$1cd1943b3a73bbe8));
    };
}
function $8b4a0712f48d5df6$export$36fa6977a6d0d8fe(xhrWithCredentials) {
    $8b4a0712f48d5df6$var$withCredentials = xhrWithCredentials;
}


class $3b942f73954bd0a6$export$d402fd02dc2b661c extends (0, $f22c10e3757627da$export$2e2bcd8739ae039) {
    /**
   * @param {string} type Type.
   * @param {import("../Feature.js").default<Geometry>} [feature] Feature.
   * @param {Array<import("../Feature.js").default<Geometry>>} [features] Features.
   */ constructor(type, feature, features){
        super(type);
        /**
     * The added or removed feature for the `ADDFEATURE` and `REMOVEFEATURE` events, `undefined` otherwise.
     * @type {import("../Feature.js").default<Geometry>|undefined}
     * @api
     */ this.feature = feature;
        /**
     * The loaded features for the `FEATURESLOADED` event, `undefined` otherwise.
     * @type {Array<import("../Feature.js").default<Geometry>>|undefined}
     * @api
     */ this.features = features;
    }
}
/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./VectorEventType").VectorSourceEventTypes, VectorSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./VectorEventType").VectorSourceEventTypes, Return>} VectorSourceOnSignature
 */ /**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {Array<import("../Feature.js").default<Geometry>>|Collection<import("../Feature.js").default<Geometry>>} [features]
 * Features. If provided as {@link module:ol/Collection~Collection}, the features in the source
 * and the collection will stay in sync.
 * @property {import("../format/Feature.js").default} [format] The feature format used by the XHR
 * feature loader when `url` is set. Required if `url` is set, otherwise ignored.
 * @property {import("../featureloader.js").FeatureLoader} [loader]
 * The loader function used to load features, from a remote source for example.
 * If this is not set and `url` is set, the source will create and use an XHR
 * feature loader. The `'featuresloadend'` and `'featuresloaderror'` events
 * will only fire if the `success` and `failure` callbacks are used.
 *
 * Example:
 *
 * ```js
 * import Vector from 'ol/source/Vector.js';
 * import GeoJSON from 'ol/format/GeoJSON.js';
 * import {bbox} from 'ol/loadingstrategy.js';
 *
 * const vectorSource = new Vector({
 *   format: new GeoJSON(),
 *   loader: function(extent, resolution, projection, success, failure) {
 *      const proj = projection.getCode();
 *      const url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
 *          'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
 *          'outputFormat=application/json&srsname=' + proj + '&' +
 *          'bbox=' + extent.join(',') + ',' + proj;
 *      const xhr = new XMLHttpRequest();
 *      xhr.open('GET', url);
 *      const onError = function() {
 *        vectorSource.removeLoadedExtent(extent);
 *        failure();
 *      }
 *      xhr.onerror = onError;
 *      xhr.onload = function() {
 *        if (xhr.status == 200) {
 *          const features = vectorSource.getFormat().readFeatures(xhr.responseText);
 *          vectorSource.addFeatures(features);
 *          success(features);
 *        } else {
 *          onError();
 *        }
 *      }
 *      xhr.send();
 *    },
 *    strategy: bbox,
 *  });
 * ```
 * @property {boolean} [overlaps=true] This source may have overlapping geometries.
 * Setting this to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {LoadingStrategy} [strategy] The loading strategy to use.
 * By default an {@link module:ol/loadingstrategy.all}
 * strategy is used, a one-off strategy which loads all features at once.
 * @property {string|import("../featureloader.js").FeatureUrlFunction} [url]
 * Setting this option instructs the source to load features using an XHR loader
 * (see {@link module:ol/featureloader.xhr}). Use a `string` and an
 * {@link module:ol/loadingstrategy.all} for a one-off download of all features from
 * the given URL. Use a {@link module:ol/featureloader~FeatureUrlFunction} to generate the url with
 * other loading strategies.
 * Requires `format` to be set as well.
 * When default XHR feature loader is provided, the features will
 * be transformed from the data projection to the view projection
 * during parsing. If your remote data source does not advertise its projection
 * properly, this transformation will be incorrect. For some formats, the
 * default projection (usually EPSG:4326) can be overridden by setting the
 * dataProjection constructor option on the format.
 * Note that if a source contains non-feature data, such as a GeoJSON geometry
 * or a KML NetworkLink, these will be ignored. Use a custom loader to load these.
 * @property {boolean} [useSpatialIndex=true]
 * By default, an RTree is used as spatial index. When features are removed and
 * added frequently, and the total number of features is low, setting this to
 * `false` may improve performance.
 *
 * Note that
 * {@link module:ol/source/Vector~VectorSource#getFeaturesInExtent},
 * {@link module:ol/source/Vector~VectorSource#getClosestFeatureToCoordinate} and
 * {@link module:ol/source/Vector~VectorSource#getExtent} cannot be used when `useSpatialIndex` is
 * set to `false`, and {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent} will loop
 * through all features.
 *
 * When set to `false`, the features will be maintained in an
 * {@link module:ol/Collection~Collection}, which can be retrieved through
 * {@link module:ol/source/Vector~VectorSource#getFeaturesCollection}.
 * @property {boolean} [wrapX=true] Wrap the world horizontally. For vector editing across the
 * -180° and 180° meridians to work properly, this should be set to `false`. The
 * resulting geometry coordinates will then exceed the world bounds.
 * @template {import("../geom/Geometry.js").default} [Geometry=import("../geom/Geometry.js").default]
 */ /**
 * @classdesc
 * Provides a source of features for vector layers. Vector features provided
 * by this source are suitable for editing. See {@link module:ol/source/VectorTile~VectorTile} for
 * vector data that is optimized for rendering.
 *
 * @fires VectorSourceEvent
 * @api
 * @template {import("../geom/Geometry.js").default} [Geometry=import("../geom/Geometry.js").default]
 */ class $3b942f73954bd0a6$var$VectorSource extends (0, $3a045db4be96b02c$export$2e2bcd8739ae039) {
    /**
   * @param {Options<Geometry>} [options] Vector source options.
   */ constructor(options){
        options = options || {};
        super({
            attributions: options.attributions,
            interpolate: true,
            projection: undefined,
            state: "ready",
            wrapX: options.wrapX !== undefined ? options.wrapX : true
        });
        /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */ this.on;
        /***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */ this.once;
        /***
     * @type {VectorSourceOnSignature<void>}
     */ this.un;
        /**
     * @private
     * @type {import("../featureloader.js").FeatureLoader}
     */ this.loader_ = (0, $2c3aa3ce33eccc0f$export$1cd1943b3a73bbe8);
        /**
     * @private
     * @type {import("../format/Feature.js").default|undefined}
     */ this.format_ = options.format;
        /**
     * @private
     * @type {boolean}
     */ this.overlaps_ = options.overlaps === undefined ? true : options.overlaps;
        /**
     * @private
     * @type {string|import("../featureloader.js").FeatureUrlFunction|undefined}
     */ this.url_ = options.url;
        if (options.loader !== undefined) this.loader_ = options.loader;
        else if (this.url_ !== undefined) {
            (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(this.format_, 7); // `format` must be set when `url` is set
            // create a XHR feature loader for "url" and "format"
            this.loader_ = (0, $8b4a0712f48d5df6$export$14cc81df70b6707e)(this.url_, /** @type {import("../format/Feature.js").default} */ this.format_);
        }
        /**
     * @private
     * @type {LoadingStrategy}
     */ this.strategy_ = options.strategy !== undefined ? options.strategy : (0, $efc4a0254bd212ee$export$84bf76cd7afc7469);
        const useSpatialIndex = options.useSpatialIndex !== undefined ? options.useSpatialIndex : true;
        /**
     * @private
     * @type {RBush<import("../Feature.js").default<Geometry>>}
     */ this.featuresRtree_ = useSpatialIndex ? new (0, $15b6a1746ef633ad$export$2e2bcd8739ae039)() : null;
        /**
     * @private
     * @type {RBush<{extent: import("../extent.js").Extent}>}
     */ this.loadedExtentsRtree_ = new (0, $15b6a1746ef633ad$export$2e2bcd8739ae039)();
        /**
     * @type {number}
     * @private
     */ this.loadingExtentsCount_ = 0;
        /**
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */ this.nullGeometryFeatures_ = {};
        /**
     * A lookup of features by id (the return from feature.getId()).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */ this.idIndex_ = {};
        /**
     * A lookup of features by uid (using getUid(feature)).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */ this.uidIndex_ = {};
        /**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */ this.featureChangeKeys_ = {};
        /**
     * @private
     * @type {Collection<import("../Feature.js").default<Geometry>>|null}
     */ this.featuresCollection_ = null;
        /** @type {Collection<import("../Feature.js").default<Geometry>>} */ let collection;
        /** @type {Array<import("../Feature.js").default<Geometry>>} */ let features;
        if (Array.isArray(options.features)) features = options.features;
        else if (options.features) {
            collection = options.features;
            features = collection.getArray();
        }
        if (!useSpatialIndex && collection === undefined) collection = new (0, $6ba3969272323605$export$2e2bcd8739ae039)(features);
        if (features !== undefined) this.addFeaturesInternal(features);
        if (collection !== undefined) this.bindFeaturesCollection_(collection);
    }
    /**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if an {@link module:ol/Collection~Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {import("../Feature.js").default<Geometry>} feature Feature to add.
   * @api
   */ addFeature(feature) {
        this.addFeatureInternal(feature);
        this.changed();
    }
    /**
   * Add a feature without firing a `change` event.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @protected
   */ addFeatureInternal(feature) {
        const featureKey = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature);
        if (!this.addToIndex_(featureKey, feature)) {
            if (this.featuresCollection_) this.featuresCollection_.remove(feature);
            return;
        }
        this.setupChangeEvents_(featureKey, feature);
        const geometry = feature.getGeometry();
        if (geometry) {
            const extent = geometry.getExtent();
            if (this.featuresRtree_) this.featuresRtree_.insert(extent, feature);
        } else this.nullGeometryFeatures_[featureKey] = feature;
        this.dispatchEvent(new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).ADDFEATURE, feature));
    }
    /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @private
   */ setupChangeEvents_(featureKey, feature) {
        this.featureChangeKeys_[featureKey] = [
            (0, $776f68d2a754760b$export$63174c828edd6ff8)(feature, (0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, this.handleFeatureChange_, this),
            (0, $776f68d2a754760b$export$63174c828edd6ff8)(feature, (0, $a6660a6615220f8c$export$2e2bcd8739ae039).PROPERTYCHANGE, this.handleFeatureChange_, this)
        ];
    }
    /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */ addToIndex_(featureKey, feature) {
        let valid = true;
        const id = feature.getId();
        if (id !== undefined) {
            if (!(id.toString() in this.idIndex_)) this.idIndex_[id.toString()] = feature;
            else valid = false;
        }
        if (valid) {
            (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(!(featureKey in this.uidIndex_), 30); // The passed `feature` was already added to the source
            this.uidIndex_[featureKey] = feature;
        }
        return valid;
    }
    /**
   * Add a batch of features to the source.
   * @param {Array<import("../Feature.js").default<Geometry>>} features Features to add.
   * @api
   */ addFeatures(features) {
        this.addFeaturesInternal(features);
        this.changed();
    }
    /**
   * Add features without firing a `change` event.
   * @param {Array<import("../Feature.js").default<Geometry>>} features Features.
   * @protected
   */ addFeaturesInternal(features) {
        const extents = [];
        const newFeatures = [];
        const geometryFeatures = [];
        for(let i = 0, length = features.length; i < length; i++){
            const feature = features[i];
            const featureKey = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature);
            if (this.addToIndex_(featureKey, feature)) newFeatures.push(feature);
        }
        for(let i = 0, length = newFeatures.length; i < length; i++){
            const feature = newFeatures[i];
            const featureKey = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature);
            this.setupChangeEvents_(featureKey, feature);
            const geometry = feature.getGeometry();
            if (geometry) {
                const extent = geometry.getExtent();
                extents.push(extent);
                geometryFeatures.push(feature);
            } else this.nullGeometryFeatures_[featureKey] = feature;
        }
        if (this.featuresRtree_) this.featuresRtree_.load(extents, geometryFeatures);
        if (this.hasListener((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).ADDFEATURE)) for(let i = 0, length = newFeatures.length; i < length; i++)this.dispatchEvent(new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).ADDFEATURE, newFeatures[i]));
    }
    /**
   * @param {!Collection<import("../Feature.js").default<Geometry>>} collection Collection.
   * @private
   */ bindFeaturesCollection_(collection) {
        let modifyingCollection = false;
        this.addEventListener((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).ADDFEATURE, /**
       * @param {VectorSourceEvent<Geometry>} evt The vector source event
       */ function(evt) {
            if (!modifyingCollection) {
                modifyingCollection = true;
                collection.push(evt.feature);
                modifyingCollection = false;
            }
        });
        this.addEventListener((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).REMOVEFEATURE, /**
       * @param {VectorSourceEvent<Geometry>} evt The vector source event
       */ function(evt) {
            if (!modifyingCollection) {
                modifyingCollection = true;
                collection.remove(evt.feature);
                modifyingCollection = false;
            }
        });
        collection.addEventListener((0, $df86962829eabf3c$export$2e2bcd8739ae039).ADD, /**
       * @param {import("../Collection.js").CollectionEvent<import("../Feature.js").default<Geometry>>} evt The collection event
       */ (evt)=>{
            if (!modifyingCollection) {
                modifyingCollection = true;
                this.addFeature(evt.element);
                modifyingCollection = false;
            }
        });
        collection.addEventListener((0, $df86962829eabf3c$export$2e2bcd8739ae039).REMOVE, /**
       * @param {import("../Collection.js").CollectionEvent<import("../Feature.js").default<Geometry>>} evt The collection event
       */ (evt)=>{
            if (!modifyingCollection) {
                modifyingCollection = true;
                this.removeFeature(evt.element);
                modifyingCollection = false;
            }
        });
        this.featuresCollection_ = collection;
    }
    /**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature} events.
   * @api
   */ clear(fast) {
        if (fast) {
            for(const featureId in this.featureChangeKeys_){
                const keys = this.featureChangeKeys_[featureId];
                keys.forEach((0, $776f68d2a754760b$export$b0a21c8b3c1c921));
            }
            if (!this.featuresCollection_) {
                this.featureChangeKeys_ = {};
                this.idIndex_ = {};
                this.uidIndex_ = {};
            }
        } else if (this.featuresRtree_) {
            const removeAndIgnoreReturn = (feature)=>{
                this.removeFeatureInternal(feature);
            };
            this.featuresRtree_.forEach(removeAndIgnoreReturn);
            for(const id in this.nullGeometryFeatures_)this.removeFeatureInternal(this.nullGeometryFeatures_[id]);
        }
        if (this.featuresCollection_) this.featuresCollection_.clear();
        if (this.featuresRtree_) this.featuresRtree_.clear();
        this.nullGeometryFeatures_ = {};
        const clearEvent = new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).CLEAR);
        this.dispatchEvent(clearEvent);
        this.changed();
    }
    /**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */ forEachFeature(callback) {
        if (this.featuresRtree_) return this.featuresRtree_.forEach(callback);
        if (this.featuresCollection_) this.featuresCollection_.forEach(callback);
    }
    /**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */ forEachFeatureAtCoordinateDirect(coordinate, callback) {
        const extent = [
            coordinate[0],
            coordinate[1],
            coordinate[0],
            coordinate[1]
        ];
        return this.forEachFeatureInExtent(extent, function(feature) {
            const geometry = feature.getGeometry();
            if (geometry.intersectsCoordinate(coordinate)) return callback(feature);
            return undefined;
        });
    }
    /**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */ forEachFeatureInExtent(extent, callback) {
        if (this.featuresRtree_) return this.featuresRtree_.forEachInExtent(extent, callback);
        if (this.featuresCollection_) this.featuresCollection_.forEach(callback);
    }
    /**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */ forEachFeatureIntersectingExtent(extent, callback) {
        return this.forEachFeatureInExtent(extent, /**
       * @param {import("../Feature.js").default<Geometry>} feature Feature.
       * @return {T|undefined} The return value from the last call to the callback.
       */ function(feature) {
            const geometry = feature.getGeometry();
            if (geometry.intersectsExtent(extent)) {
                const result = callback(feature);
                if (result) return result;
            }
        });
    }
    /**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with an {@link module:ol/Collection~Collection} as `features`.
   * @return {Collection<import("../Feature.js").default<Geometry>>|null} The collection of features.
   * @api
   */ getFeaturesCollection() {
        return this.featuresCollection_;
    }
    /**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */ getFeatures() {
        let features;
        if (this.featuresCollection_) features = this.featuresCollection_.getArray().slice(0);
        else if (this.featuresRtree_) {
            features = this.featuresRtree_.getAll();
            if (!(0, $e2dfef87a88758ed$export$dd1bc94b04021eeb)(this.nullGeometryFeatures_)) (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(features, Object.values(this.nullGeometryFeatures_));
        }
        return /** @type {Array<import("../Feature.js").default<Geometry>>} */ features;
    }
    /**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */ getFeaturesAtCoordinate(coordinate) {
        const features = [];
        this.forEachFeatureAtCoordinateDirect(coordinate, function(feature) {
            features.push(feature);
        });
        return features;
    }
    /**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../proj/Projection.js").default} [projection] Include features
   * where `extent` exceeds the x-axis bounds of `projection` and wraps around the world.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */ getFeaturesInExtent(extent, projection) {
        if (this.featuresRtree_) {
            const multiWorld = projection && projection.canWrapX() && this.getWrapX();
            if (!multiWorld) return this.featuresRtree_.getInExtent(extent);
            const extents = (0, $84be800ca44e672c$export$9031237f01de0947)(extent, projection);
            return [].concat(...extents.map((anExtent)=>this.featuresRtree_.getInExtent(anExtent)));
        }
        if (this.featuresCollection_) return this.featuresCollection_.getArray().slice(0);
        return [];
    }
    /**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(import("../Feature.js").default<Geometry>):boolean} [filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature~Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {import("../Feature.js").default<Geometry>} Closest feature.
   * @api
   */ getClosestFeatureToCoordinate(coordinate, filter) {
        // Find the closest feature using branch and bound.  We start searching an
        // infinite extent, and find the distance from the first feature found.  This
        // becomes the closest feature.  We then compute a smaller extent which any
        // closer feature must intersect.  We continue searching with this smaller
        // extent, trying to find a closer feature.  Every time we find a closer
        // feature, we update the extent being searched so that any even closer
        // feature must intersect it.  We continue until we run out of features.
        const x = coordinate[0];
        const y = coordinate[1];
        let closestFeature = null;
        const closestPoint = [
            NaN,
            NaN
        ];
        let minSquaredDistance = Infinity;
        const extent = [
            -Infinity,
            -Infinity,
            Infinity,
            Infinity
        ];
        filter = filter ? filter : (0, $2c3aa3ce33eccc0f$export$22e23a2304399231);
        this.featuresRtree_.forEachInExtent(extent, /**
       * @param {import("../Feature.js").default<Geometry>} feature Feature.
       */ function(feature) {
            if (filter(feature)) {
                const geometry = feature.getGeometry();
                const previousMinSquaredDistance = minSquaredDistance;
                minSquaredDistance = geometry.closestPointXY(x, y, closestPoint, minSquaredDistance);
                if (minSquaredDistance < previousMinSquaredDistance) {
                    closestFeature = feature;
                    // This is sneaky.  Reduce the extent that it is currently being
                    // searched while the R-Tree traversal using this same extent object
                    // is still in progress.  This is safe because the new extent is
                    // strictly contained by the old extent.
                    const minDistance = Math.sqrt(minSquaredDistance);
                    extent[0] = x - minDistance;
                    extent[1] = y - minDistance;
                    extent[2] = x + minDistance;
                    extent[3] = y + minDistance;
                }
            }
        });
        return closestFeature;
    }
    /**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */ getExtent(extent) {
        return this.featuresRtree_.getExtent(extent);
    }
    /**
   * Get a feature by its identifier (the value returned by feature.getId()).
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {import("../Feature.js").default<Geometry>|null} The feature (or `null` if not found).
   * @api
   */ getFeatureById(id) {
        const feature = this.idIndex_[id.toString()];
        return feature !== undefined ? feature : null;
    }
    /**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {import("../Feature.js").default<Geometry>|null} The feature (or `null` if not found).
   */ getFeatureByUid(uid) {
        const feature = this.uidIndex_[uid];
        return feature !== undefined ? feature : null;
    }
    /**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default|undefined} The feature format.
   * @api
   */ getFormat() {
        return this.format_;
    }
    /**
   * @return {boolean} The source can have overlapping geometries.
   */ getOverlaps() {
        return this.overlaps_;
    }
    /**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */ getUrl() {
        return this.url_;
    }
    /**
   * @param {Event} event Event.
   * @private
   */ handleFeatureChange_(event) {
        const feature = /** @type {import("../Feature.js").default<Geometry>} */ event.target;
        const featureKey = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature);
        const geometry = feature.getGeometry();
        if (!geometry) {
            if (!(featureKey in this.nullGeometryFeatures_)) {
                if (this.featuresRtree_) this.featuresRtree_.remove(feature);
                this.nullGeometryFeatures_[featureKey] = feature;
            }
        } else {
            const extent = geometry.getExtent();
            if (featureKey in this.nullGeometryFeatures_) {
                delete this.nullGeometryFeatures_[featureKey];
                if (this.featuresRtree_) this.featuresRtree_.insert(extent, feature);
            } else if (this.featuresRtree_) this.featuresRtree_.update(extent, feature);
        }
        const id = feature.getId();
        if (id !== undefined) {
            const sid = id.toString();
            if (this.idIndex_[sid] !== feature) {
                this.removeFromIdIndex_(feature);
                this.idIndex_[sid] = feature;
            }
        } else {
            this.removeFromIdIndex_(feature);
            this.uidIndex_[featureKey] = feature;
        }
        this.changed();
        this.dispatchEvent(new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).CHANGEFEATURE, feature));
    }
    /**
   * Returns true if the feature is contained within the source.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */ hasFeature(feature) {
        const id = feature.getId();
        if (id !== undefined) return id in this.idIndex_;
        return (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature) in this.uidIndex_;
    }
    /**
   * @return {boolean} Is empty.
   */ isEmpty() {
        if (this.featuresRtree_) return this.featuresRtree_.isEmpty() && (0, $e2dfef87a88758ed$export$dd1bc94b04021eeb)(this.nullGeometryFeatures_);
        if (this.featuresCollection_) return this.featuresCollection_.getLength() === 0;
        return true;
    }
    /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */ loadFeatures(extent, resolution, projection) {
        const loadedExtentsRtree = this.loadedExtentsRtree_;
        const extentsToLoad = this.strategy_(extent, resolution, projection);
        for(let i = 0, ii = extentsToLoad.length; i < ii; ++i){
            const extentToLoad = extentsToLoad[i];
            const alreadyLoaded = loadedExtentsRtree.forEachInExtent(extentToLoad, /**
         * @param {{extent: import("../extent.js").Extent}} object Object.
         * @return {boolean} Contains.
         */ function(object) {
                return (0, $84be800ca44e672c$export$be866b1e0809b17e)(object.extent, extentToLoad);
            });
            if (!alreadyLoaded) {
                ++this.loadingExtentsCount_;
                this.dispatchEvent(new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).FEATURESLOADSTART));
                this.loader_.call(this, extentToLoad, resolution, projection, (features)=>{
                    --this.loadingExtentsCount_;
                    this.dispatchEvent(new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).FEATURESLOADEND, undefined, features));
                }, ()=>{
                    --this.loadingExtentsCount_;
                    this.dispatchEvent(new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).FEATURESLOADERROR));
                });
                loadedExtentsRtree.insert(extentToLoad, {
                    extent: extentToLoad.slice()
                });
            }
        }
        this.loading = this.loader_.length < 4 ? false : this.loadingExtentsCount_ > 0;
    }
    refresh() {
        this.clear(true);
        this.loadedExtentsRtree_.clear();
        super.refresh();
    }
    /**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */ removeLoadedExtent(extent) {
        const loadedExtentsRtree = this.loadedExtentsRtree_;
        let obj;
        loadedExtentsRtree.forEachInExtent(extent, function(object) {
            if ((0, $84be800ca44e672c$export$e9bab7fafb253603)(object.extent, extent)) {
                obj = object;
                return true;
            }
        });
        if (obj) loadedExtentsRtree.remove(obj);
    }
    /**
   * Remove a single feature from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {import("../Feature.js").default<Geometry>} feature Feature to remove.
   * @api
   */ removeFeature(feature) {
        if (!feature) return;
        const featureKey = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature);
        if (featureKey in this.nullGeometryFeatures_) delete this.nullGeometryFeatures_[featureKey];
        else if (this.featuresRtree_) this.featuresRtree_.remove(feature);
        const result = this.removeFeatureInternal(feature);
        if (result) this.changed();
    }
    /**
   * Remove feature without firing a `change` event.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @return {import("../Feature.js").default<Geometry>|undefined} The removed feature
   *     (or undefined if the feature was not found).
   * @protected
   */ removeFeatureInternal(feature) {
        const featureKey = (0, $ae7eaaa2c9c1e05d$export$5e82334337e0f204)(feature);
        const featureChangeKeys = this.featureChangeKeys_[featureKey];
        if (!featureChangeKeys) return;
        featureChangeKeys.forEach((0, $776f68d2a754760b$export$b0a21c8b3c1c921));
        delete this.featureChangeKeys_[featureKey];
        const id = feature.getId();
        if (id !== undefined) delete this.idIndex_[id.toString()];
        delete this.uidIndex_[featureKey];
        this.dispatchEvent(new $3b942f73954bd0a6$export$d402fd02dc2b661c((0, $9fd34b6c79aa89b0$export$2e2bcd8739ae039).REMOVEFEATURE, feature));
        return feature;
    }
    /**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @return {boolean} Removed the feature from the index.
   * @private
   */ removeFromIdIndex_(feature) {
        let removed = false;
        for(const id in this.idIndex_)if (this.idIndex_[id] === feature) {
            delete this.idIndex_[id];
            removed = true;
            break;
        }
        return removed;
    }
    /**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
   * @api
   */ setLoader(loader) {
        this.loader_ = loader;
    }
    /**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */ setUrl(url) {
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(this.format_, 7); // `format` must be set when `url` is set
        this.url_ = url;
        this.setLoader((0, $8b4a0712f48d5df6$export$14cc81df70b6707e)(url, this.format_));
    }
}
var $3b942f73954bd0a6$export$2e2bcd8739ae039 = $3b942f73954bd0a6$var$VectorSource;



/**
 * @module ol/format/GeoJSON
 */ /**
 * @module ol/Feature
 */ 



/**
 * @typedef {typeof Feature|typeof import("./render/Feature.js").default} FeatureClass
 */ /**
 * @typedef {Feature|import("./render/Feature.js").default} FeatureLike
 */ /***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:geometry', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types
 *     |'change:geometry', Return>} FeatureOnSignature
 */ /***
 * @template Geometry
 * @typedef {Object<string, *> & { geometry?: Geometry }} ObjectWithGeometry
 */ /**
 * @classdesc
 * A vector object for geographic features with a geometry and other
 * attribute properties, similar to the features in vector file formats like
 * GeoJSON.
 *
 * Features can be styled individually with `setStyle`; otherwise they use the
 * style of their vector layer.
 *
 * Note that attribute properties are set as {@link module:ol/Object~BaseObject} properties on
 * the feature object, so they are observable, and have get/set accessors.
 *
 * Typically, a feature has a single geometry property. You can set the
 * geometry using the `setGeometry` method and get it with `getGeometry`.
 * It is possible to store more than one geometry on a feature using attribute
 * properties. By default, the geometry used for rendering is identified by
 * the property name `geometry`. If you want to use another geometry property
 * for rendering, use the `setGeometryName` method to change the attribute
 * property associated with the geometry for the feature.  For example:
 *
 * ```js
 *
 * import Feature from 'ol/Feature.js';
 * import Polygon from 'ol/geom/Polygon.js';
 * import Point from 'ol/geom/Point.js';
 *
 * const feature = new Feature({
 *   geometry: new Polygon(polyCoords),
 *   labelPoint: new Point(labelCoords),
 *   name: 'My Polygon',
 * });
 *
 * // get the polygon geometry
 * const poly = feature.getGeometry();
 *
 * // Render the feature as a point using the coordinates from labelPoint
 * feature.setGeometryName('labelPoint');
 *
 * // get the point geometry
 * const point = feature.getGeometry();
 * ```
 *
 * @api
 * @template {import("./geom/Geometry.js").default} [Geometry=import("./geom/Geometry.js").default]
 */ class $488541e07685eb37$var$Feature extends (0, $d6cd7f1b627d5e92$export$2e2bcd8739ae039) {
    /**
   * @param {Geometry|ObjectWithGeometry<Geometry>} [geometryOrProperties]
   *     You may pass a Geometry object directly, or an object literal containing
   *     properties. If you pass an object literal, you may include a Geometry
   *     associated with a `geometry` key.
   */ constructor(geometryOrProperties){
        super();
        /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */ this.on;
        /***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */ this.once;
        /***
     * @type {FeatureOnSignature<void>}
     */ this.un;
        /**
     * @private
     * @type {number|string|undefined}
     */ this.id_ = undefined;
        /**
     * @type {string}
     * @private
     */ this.geometryName_ = "geometry";
        /**
     * User provided style.
     * @private
     * @type {import("./style/Style.js").StyleLike}
     */ this.style_ = null;
        /**
     * @private
     * @type {import("./style/Style.js").StyleFunction|undefined}
     */ this.styleFunction_ = undefined;
        /**
     * @private
     * @type {?import("./events.js").EventsKey}
     */ this.geometryChangeKey_ = null;
        this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
        if (geometryOrProperties) {
            if (typeof /** @type {?} */ geometryOrProperties.getSimplifiedGeometry === "function") {
                const geometry = /** @type {Geometry} */ geometryOrProperties;
                this.setGeometry(geometry);
            } else {
                /** @type {Object<string, *>} */ const properties = geometryOrProperties;
                this.setProperties(properties);
            }
        }
    }
    /**
   * Clone this feature. If the original feature has a geometry it
   * is also cloned. The feature id is not set in the clone.
   * @return {Feature<Geometry>} The clone.
   * @api
   */ clone() {
        const clone = /** @type {Feature<Geometry>} */ new $488541e07685eb37$var$Feature(this.hasProperties() ? this.getProperties() : null);
        clone.setGeometryName(this.getGeometryName());
        const geometry = this.getGeometry();
        if (geometry) clone.setGeometry(/** @type {Geometry} */ geometry.clone());
        const style = this.getStyle();
        if (style) clone.setStyle(style);
        return clone;
    }
    /**
   * Get the feature's default geometry.  A feature may have any number of named
   * geometries.  The "default" geometry (the one that is rendered by default) is
   * set when calling {@link module:ol/Feature~Feature#setGeometry}.
   * @return {Geometry|undefined} The default geometry for the feature.
   * @api
   * @observable
   */ getGeometry() {
        return /** @type {Geometry|undefined} */ this.get(this.geometryName_);
    }
    /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is either set when reading data from a remote source or set explicitly by
   * calling {@link module:ol/Feature~Feature#setId}.
   * @return {number|string|undefined} Id.
   * @api
   */ getId() {
        return this.id_;
    }
    /**
   * Get the name of the feature's default geometry.  By default, the default
   * geometry is named `geometry`.
   * @return {string} Get the property name associated with the default geometry
   *     for this feature.
   * @api
   */ getGeometryName() {
        return this.geometryName_;
    }
    /**
   * Get the feature's style. Will return what was provided to the
   * {@link module:ol/Feature~Feature#setStyle} method.
   * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
   * @api
   */ getStyle() {
        return this.style_;
    }
    /**
   * Get the feature's style function.
   * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
   * representing the current style of this feature.
   * @api
   */ getStyleFunction() {
        return this.styleFunction_;
    }
    /**
   * @private
   */ handleGeometryChange_() {
        this.changed();
    }
    /**
   * @private
   */ handleGeometryChanged_() {
        if (this.geometryChangeKey_) {
            (0, $776f68d2a754760b$export$b0a21c8b3c1c921)(this.geometryChangeKey_);
            this.geometryChangeKey_ = null;
        }
        const geometry = this.getGeometry();
        if (geometry) this.geometryChangeKey_ = (0, $776f68d2a754760b$export$63174c828edd6ff8)(geometry, (0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, this.handleGeometryChange_, this);
        this.changed();
    }
    /**
   * Set the default geometry for the feature.  This will update the property
   * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
   * @param {Geometry|undefined} geometry The new geometry.
   * @api
   * @observable
   */ setGeometry(geometry) {
        this.set(this.geometryName_, geometry);
    }
    /**
   * Set the style for the feature to override the layer style.  This can be a
   * single style object, an array of styles, or a function that takes a
   * resolution and returns an array of styles. To unset the feature style, call
   * `setStyle()` without arguments or a falsey value.
   * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */ setStyle(style) {
        this.style_ = style;
        this.styleFunction_ = !style ? undefined : $488541e07685eb37$export$bb06ddfd5d66e02e(style);
        this.changed();
    }
    /**
   * Set the feature id.  The feature id is considered stable and may be used when
   * requesting features or comparing identifiers returned from a remote source.
   * The feature id can be used with the
   * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
   * @param {number|string|undefined} id The feature id.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */ setId(id) {
        this.id_ = id;
        this.changed();
    }
    /**
   * Set the property name to be used when getting the feature's default geometry.
   * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
   * this name will be returned.
   * @param {string} name The property name of the default geometry.
   * @api
   */ setGeometryName(name) {
        this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_);
        this.geometryName_ = name;
        this.addChangeListener(this.geometryName_, this.handleGeometryChanged_);
        this.handleGeometryChanged_();
    }
}
function $488541e07685eb37$export$bb06ddfd5d66e02e(obj) {
    if (typeof obj === "function") return obj;
    /**
   * @type {Array<import("./style/Style.js").default>}
   */ let styles;
    if (Array.isArray(obj)) styles = obj;
    else {
        (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(typeof /** @type {?} */ obj.getZIndex === "function", 41); // Expected an `import("./style/Style.js").Style` or an array of `import("./style/Style.js").Style`
        const style = /** @type {import("./style/Style.js").default} */ obj;
        styles = [
            style
        ];
    }
    return function() {
        return styles;
    };
}
var $488541e07685eb37$export$2e2bcd8739ae039 = $488541e07685eb37$var$Feature;


/**
 * @module ol/geom/GeometryCollection
 */ 



/**
 * @classdesc
 * An array of {@link module:ol/geom/Geometry~Geometry} objects.
 *
 * @api
 */ class $4cd72e2ccfc56a15$var$GeometryCollection extends (0, $05f95d883ca13ae5$export$2e2bcd8739ae039) {
    /**
   * @param {Array<Geometry>} [geometries] Geometries.
   */ constructor(geometries){
        super();
        /**
     * @private
     * @type {Array<Geometry>}
     */ this.geometries_ = geometries ? geometries : null;
        /**
     * @type {Array<import("../events.js").EventsKey>}
     */ this.changeEventsKeys_ = [];
        this.listenGeometriesChange_();
    }
    /**
   * @private
   */ unlistenGeometriesChange_() {
        this.changeEventsKeys_.forEach((0, $776f68d2a754760b$export$b0a21c8b3c1c921));
        this.changeEventsKeys_.length = 0;
    }
    /**
   * @private
   */ listenGeometriesChange_() {
        if (!this.geometries_) return;
        for(let i = 0, ii = this.geometries_.length; i < ii; ++i)this.changeEventsKeys_.push((0, $776f68d2a754760b$export$63174c828edd6ff8)(this.geometries_[i], (0, $f13d17e3c190470c$export$2e2bcd8739ae039).CHANGE, this.changed, this));
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!GeometryCollection} Clone.
   * @api
   */ clone() {
        const geometryCollection = new $4cd72e2ccfc56a15$var$GeometryCollection(null);
        geometryCollection.setGeometries(this.geometries_);
        geometryCollection.applyProperties(this);
        return geometryCollection;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < (0, $84be800ca44e672c$export$cbe64c389534206f)(this.getExtent(), x, y)) return minSquaredDistance;
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i)minSquaredDistance = geometries[i].closestPointXY(x, y, closestPoint, minSquaredDistance);
        return minSquaredDistance;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */ containsXY(x, y) {
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i){
            if (geometries[i].containsXY(x, y)) return true;
        }
        return false;
    }
    /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */ computeExtent(extent) {
        (0, $84be800ca44e672c$export$3e2152b047719fa1)(extent);
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i)(0, $84be800ca44e672c$export$8b58be045bf06082)(extent, geometries[i].getExtent());
        return extent;
    }
    /**
   * Return the geometries that make up this geometry collection.
   * @return {Array<Geometry>} Geometries.
   * @api
   */ getGeometries() {
        return $4cd72e2ccfc56a15$var$cloneGeometries(this.geometries_);
    }
    /**
   * @return {Array<Geometry>} Geometries.
   */ getGeometriesArray() {
        return this.geometries_;
    }
    /**
   * @return {Array<Geometry>} Geometries.
   */ getGeometriesArrayRecursive() {
        /** @type {Array<Geometry>} */ let geometriesArray = [];
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i)if (geometries[i].getType() === this.getType()) geometriesArray = geometriesArray.concat(/** @type {GeometryCollection} */ geometries[i].getGeometriesArrayRecursive());
        else geometriesArray.push(geometries[i]);
        return geometriesArray;
    }
    /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {GeometryCollection} Simplified GeometryCollection.
   */ getSimplifiedGeometry(squaredTolerance) {
        if (this.simplifiedGeometryRevision !== this.getRevision()) {
            this.simplifiedGeometryMaxMinSquaredTolerance = 0;
            this.simplifiedGeometryRevision = this.getRevision();
        }
        if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance < this.simplifiedGeometryMaxMinSquaredTolerance) return this;
        const simplifiedGeometries = [];
        const geometries = this.geometries_;
        let simplified = false;
        for(let i = 0, ii = geometries.length; i < ii; ++i){
            const geometry = geometries[i];
            const simplifiedGeometry = geometry.getSimplifiedGeometry(squaredTolerance);
            simplifiedGeometries.push(simplifiedGeometry);
            if (simplifiedGeometry !== geometry) simplified = true;
        }
        if (simplified) {
            const simplifiedGeometryCollection = new $4cd72e2ccfc56a15$var$GeometryCollection(null);
            simplifiedGeometryCollection.setGeometriesArray(simplifiedGeometries);
            return simplifiedGeometryCollection;
        }
        this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
        return this;
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "GeometryCollection";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i){
            if (geometries[i].intersectsExtent(extent)) return true;
        }
        return false;
    }
    /**
   * @return {boolean} Is empty.
   */ isEmpty() {
        return this.geometries_.length === 0;
    }
    /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */ rotate(angle, anchor) {
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i)geometries[i].rotate(angle, anchor);
        this.changed();
    }
    /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */ scale(sx, sy, anchor) {
        if (!anchor) anchor = (0, $84be800ca44e672c$export$c91255cadecfe081)(this.getExtent());
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i)geometries[i].scale(sx, sy, anchor);
        this.changed();
    }
    /**
   * Set the geometries that make up this geometry collection.
   * @param {Array<Geometry>} geometries Geometries.
   * @api
   */ setGeometries(geometries) {
        this.setGeometriesArray($4cd72e2ccfc56a15$var$cloneGeometries(geometries));
    }
    /**
   * @param {Array<Geometry>} geometries Geometries.
   */ setGeometriesArray(geometries) {
        this.unlistenGeometriesChange_();
        this.geometries_ = geometries;
        this.listenGeometriesChange_();
        this.changed();
    }
    /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */ applyTransform(transformFn) {
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i)geometries[i].applyTransform(transformFn);
        this.changed();
    }
    /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */ translate(deltaX, deltaY) {
        const geometries = this.geometries_;
        for(let i = 0, ii = geometries.length; i < ii; ++i)geometries[i].translate(deltaX, deltaY);
        this.changed();
    }
    /**
   * Clean up.
   */ disposeInternal() {
        this.unlistenGeometriesChange_();
        super.disposeInternal();
    }
}
/**
 * @param {Array<Geometry>} geometries Geometries.
 * @return {Array<Geometry>} Cloned geometries.
 */ function $4cd72e2ccfc56a15$var$cloneGeometries(geometries) {
    const clonedGeometries = [];
    for(let i = 0, ii = geometries.length; i < ii; ++i)clonedGeometries.push(geometries[i].clone());
    return clonedGeometries;
}
var $4cd72e2ccfc56a15$export$2e2bcd8739ae039 = $4cd72e2ccfc56a15$var$GeometryCollection;


/**
 * @module ol/format/JSONFeature
 */ /**
 * @module ol/format/Feature
 */ 

/**
 * @typedef {Object} ReadOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are reading.
 * If not provided, the projection will be derived from the data (where possible) or
 * the `dataProjection` of the format is assigned (where set). If the projection
 * can not be derived from the data and if no `dataProjection` is set for a format,
 * the features will not be reprojected.
 * @property {import("../extent.js").Extent} [extent] Tile extent in map units of the tile being read.
 * This is only required when reading data with tile pixels as geometry units. When configured,
 * a `dataProjection` with `TILE_PIXELS` as `units` and the tile's pixel extent as `extent` needs to be
 * provided.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * created by the format reader. If not provided, features will be returned in the
 * `dataProjection`.
 */ /**
 * @typedef {Object} WriteOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are writing.
 * If not provided, the `dataProjection` of the format is assigned (where set).
 * If no `dataProjection` is set for a format, the features will be returned
 * in the `featureProjection`.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * that will be serialized by the format writer. If not provided, geometries are assumed
 * to be in the `dataProjection` if that is set; in other words, they are not transformed.
 * @property {boolean} [rightHanded] When writing geometries, follow the right-hand
 * rule for linear ring orientation.  This means that polygons will have counter-clockwise
 * exterior rings and clockwise interior rings.  By default, coordinates are serialized
 * as they are provided at construction.  If `true`, the right-hand rule will
 * be applied.  If `false`, the left-hand rule will be applied (clockwise for
 * exterior and counter-clockwise for interior rings).  Note that not all
 * formats support this.  The GeoJSON format does use this property when writing
 * geometries.
 * @property {number} [decimals] Maximum number of decimal places for coordinates.
 * Coordinates are stored internally as floats, but floating-point arithmetic can create
 * coordinates with a large number of decimal places, not generally wanted on output.
 * Set a number here to round coordinates. Can also be used to ensure that
 * coordinates read in can be written back out with the same number of decimals.
 * Default is no rounding.
 */ /**
 * @typedef {'arraybuffer' | 'json' | 'text' | 'xml'} Type
 */ /**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for feature formats.
 * {@link module:ol/format/Feature~FeatureFormat} subclasses provide the ability to decode and encode
 * {@link module:ol/Feature~Feature} objects from a variety of commonly used geospatial
 * file formats.  See the documentation for each format for more details.
 *
 * @abstract
 * @api
 */ class $8d80c6b1ee03d123$var$FeatureFormat {
    constructor(){
        /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */ this.dataProjection = undefined;
        /**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */ this.defaultFeatureProjection = undefined;
        /**
     * A list media types supported by the format in descending order of preference.
     * @type {Array<string>}
     */ this.supportedMediaTypes = null;
    }
    /**
   * Adds the data projection to the read options.
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Options.
   * @return {ReadOptions|undefined} Options.
   * @protected
   */ getReadOptions(source, options) {
        if (options) {
            let dataProjection = options.dataProjection ? (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.dataProjection) : this.readProjection(source);
            if (options.extent && dataProjection && dataProjection.getUnits() === "tile-pixels") {
                dataProjection = (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(dataProjection);
                dataProjection.setWorldExtent(options.extent);
            }
            options = {
                dataProjection: dataProjection,
                featureProjection: options.featureProjection
            };
        }
        return this.adaptOptions(options);
    }
    /**
   * Sets the `dataProjection` on the options, if no `dataProjection`
   * is set.
   * @param {WriteOptions|ReadOptions|undefined} options
   *     Options.
   * @protected
   * @return {WriteOptions|ReadOptions|undefined}
   *     Updated options.
   */ adaptOptions(options) {
        return Object.assign({
            dataProjection: this.dataProjection,
            featureProjection: this.defaultFeatureProjection
        }, options);
    }
    /**
   * @abstract
   * @return {Type} The format type.
   */ getType() {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Read a single feature from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {import("../Feature.js").FeatureLike} Feature.
   */ readFeature(source, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Read all features from a source.
   *
   * @abstract
   * @param {Document|Element|ArrayBuffer|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {Array<import("../Feature.js").FeatureLike>} Features.
   */ readFeatures(source, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Read a single geometry from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   */ readGeometry(source, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Read the projection from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default|undefined} Projection.
   */ readProjection(source) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Encode a feature in this format.
   *
   * @abstract
   * @param {import("../Feature.js").default} feature Feature.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */ writeFeature(feature, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Encode an array of features in this format.
   *
   * @abstract
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */ writeFeatures(features, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Write a single geometry in this format.
   *
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */ writeGeometry(geometry, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
}
var $8d80c6b1ee03d123$export$2e2bcd8739ae039 = $8d80c6b1ee03d123$var$FeatureFormat;
function $8d80c6b1ee03d123$export$7beeea566b560d4(geometry, write, options) {
    const featureProjection = options ? (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.featureProjection) : null;
    const dataProjection = options ? (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.dataProjection) : null;
    let transformed;
    if (featureProjection && dataProjection && !(0, $983289ae1d13cd2a$export$fe091d73a555748b)(featureProjection, dataProjection)) transformed = (write ? geometry.clone() : geometry).transform(write ? featureProjection : dataProjection, write ? dataProjection : featureProjection);
    else transformed = geometry;
    if (write && options && /** @type {WriteOptions} */ options.decimals !== undefined) {
        const power = Math.pow(10, /** @type {WriteOptions} */ options.decimals);
        // if decimals option on write, round each coordinate appropriately
        /**
     * @param {Array<number>} coordinates Coordinates.
     * @return {Array<number>} Transformed coordinates.
     */ const transform = function(coordinates) {
            for(let i = 0, ii = coordinates.length; i < ii; ++i)coordinates[i] = Math.round(coordinates[i] * power) / power;
            return coordinates;
        };
        if (transformed === geometry) transformed = geometry.clone();
        transformed.applyTransform(transform);
    }
    return transformed;
}
function $8d80c6b1ee03d123$export$d3e9e4b1c7f2405c(extent, options) {
    const featureProjection = options ? (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.featureProjection) : null;
    const dataProjection = options ? (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.dataProjection) : null;
    if (featureProjection && dataProjection && !(0, $983289ae1d13cd2a$export$fe091d73a555748b)(featureProjection, dataProjection)) return (0, $983289ae1d13cd2a$export$751c68e0e0efff79)(extent, dataProjection, featureProjection);
    return extent;
}



/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @abstract
 */ class $f791690b01dc2280$var$JSONFeature extends (0, $8d80c6b1ee03d123$export$2e2bcd8739ae039) {
    constructor(){
        super();
    }
    /**
   * @return {import("./Feature.js").Type} Format.
   */ getType() {
        return "json";
    }
    /**
   * Read a feature.  Only works for a single feature. Use `readFeatures` to
   * read a feature collection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {import("../Feature.js").default} Feature.
   * @api
   */ readFeature(source, options) {
        return this.readFeatureFromObject($f791690b01dc2280$var$getObject(source), this.getReadOptions(source, options));
    }
    /**
   * Read all features.  Works with both a single feature and a feature
   * collection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {Array<import("../Feature.js").default>} Features.
   * @api
   */ readFeatures(source, options) {
        return this.readFeaturesFromObject($f791690b01dc2280$var$getObject(source), this.getReadOptions(source, options));
    }
    /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {import("../Feature.js").default} Feature.
   */ readFeatureFromObject(object, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {Array<import("../Feature.js").default>} Features.
   */ readFeaturesFromObject(object, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Read a geometry.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   * @api
   */ readGeometry(source, options) {
        return this.readGeometryFromObject($f791690b01dc2280$var$getObject(source), this.getReadOptions(source, options));
    }
    /**
   * @abstract
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */ readGeometryFromObject(object, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Read the projection.
   *
   * @param {ArrayBuffer|Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */ readProjection(source) {
        return this.readProjectionFromObject($f791690b01dc2280$var$getObject(source));
    }
    /**
   * @abstract
   * @param {Object} object Object.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */ readProjectionFromObject(object) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Encode a feature as string.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded feature.
   * @api
   */ writeFeature(feature, options) {
        return JSON.stringify(this.writeFeatureObject(feature, options));
    }
    /**
   * @abstract
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {Object} Object.
   */ writeFeatureObject(feature, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Encode an array of features as string.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded features.
   * @api
   */ writeFeatures(features, options) {
        return JSON.stringify(this.writeFeaturesObject(features, options));
    }
    /**
   * @abstract
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {Object} Object.
   */ writeFeaturesObject(features, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
    /**
   * Encode a geometry as string.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded geometry.
   * @api
   */ writeGeometry(geometry, options) {
        return JSON.stringify(this.writeGeometryObject(geometry, options));
    }
    /**
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {Object} Object.
   */ writeGeometryObject(geometry, options) {
        return (0, $ae7eaaa2c9c1e05d$export$817eb92a8194bab0)();
    }
}
/**
 * @param {Document|Element|Object|string} source Source.
 * @return {Object} Object.
 */ function $f791690b01dc2280$var$getObject(source) {
    if (typeof source === "string") {
        const object = JSON.parse(source);
        return object ? /** @type {Object} */ object : null;
    }
    if (source !== null) return source;
    return null;
}
var $f791690b01dc2280$export$2e2bcd8739ae039 = $f791690b01dc2280$var$JSONFeature;


/**
 * @module ol/geom/LineString
 */ 







/**
 * @module ol/geom/flat/interpolate
 */ 

function $9add6a1a9444b11b$export$687ff82efd78795b(flatCoordinates, offset, end, stride, fraction, dest, dimension) {
    let o, t;
    const n = (end - offset) / stride;
    if (n === 1) o = offset;
    else if (n === 2) {
        o = offset;
        t = fraction;
    } else if (n !== 0) {
        let x1 = flatCoordinates[offset];
        let y1 = flatCoordinates[offset + 1];
        let length = 0;
        const cumulativeLengths = [
            0
        ];
        for(let i = offset + stride; i < end; i += stride){
            const x2 = flatCoordinates[i];
            const y2 = flatCoordinates[i + 1];
            length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            cumulativeLengths.push(length);
            x1 = x2;
            y1 = y2;
        }
        const target = fraction * length;
        const index = (0, $69c1cc8ae30f997f$export$2e0ae67339d5f1ac)(cumulativeLengths, target);
        if (index < 0) {
            t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
            o = offset + (-index - 2) * stride;
        } else o = offset + index * stride;
    }
    dimension = dimension > 1 ? dimension : 2;
    dest = dest ? dest : new Array(dimension);
    for(let i = 0; i < dimension; ++i)dest[i] = o === undefined ? NaN : t === undefined ? flatCoordinates[o + i] : (0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(flatCoordinates[o + i], flatCoordinates[o + stride + i], t);
    return dest;
}
function $9add6a1a9444b11b$export$8f44c3c220ef6f09(flatCoordinates, offset, end, stride, m, extrapolate) {
    if (end == offset) return null;
    let coordinate;
    if (m < flatCoordinates[offset + stride - 1]) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(offset, offset + stride);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        return null;
    }
    if (flatCoordinates[end - 1] < m) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(end - stride, end);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        return null;
    }
    // FIXME use O(1) search
    if (m == flatCoordinates[offset + stride - 1]) return flatCoordinates.slice(offset, offset + stride);
    let lo = offset / stride;
    let hi = end / stride;
    while(lo < hi){
        const mid = lo + hi >> 1;
        if (m < flatCoordinates[(mid + 1) * stride - 1]) hi = mid;
        else lo = mid + 1;
    }
    const m0 = flatCoordinates[lo * stride - 1];
    if (m == m0) return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
    const m1 = flatCoordinates[(lo + 1) * stride - 1];
    const t = (m - m0) / (m1 - m0);
    coordinate = [];
    for(let i = 0; i < stride - 1; ++i)coordinate.push((0, $57ec69d152197e1d$export$3a89f8d6f6bf6c9f)(flatCoordinates[(lo - 1) * stride + i], flatCoordinates[lo * stride + i], t));
    coordinate.push(m);
    return coordinate;
}
function $9add6a1a9444b11b$export$6a3300857e9ef453(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
    if (interpolate) return $9add6a1a9444b11b$export$8f44c3c220ef6f09(flatCoordinates, offset, ends[ends.length - 1], stride, m, extrapolate);
    let coordinate;
    if (m < flatCoordinates[stride - 1]) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(0, stride);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        return null;
    }
    if (flatCoordinates[flatCoordinates.length - 1] < m) {
        if (extrapolate) {
            coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
            coordinate[stride - 1] = m;
            return coordinate;
        }
        return null;
    }
    for(let i = 0, ii = ends.length; i < ii; ++i){
        const end = ends[i];
        if (offset == end) continue;
        if (m < flatCoordinates[offset + stride - 1]) return null;
        if (m <= flatCoordinates[end - 1]) return $9add6a1a9444b11b$export$8f44c3c220ef6f09(flatCoordinates, offset, end, stride, m, false);
        offset = end;
    }
    return null;
}




/**
 * @classdesc
 * Linestring geometry.
 *
 * @api
 */ class $d7f9a2d51be44999$var$LineString extends (0, $ecdcc798f2987118$export$2e2bcd8739ae039) {
    /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */ constructor(coordinates, layout){
        super();
        /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */ this.flatMidpoint_ = null;
        /**
     * @private
     * @type {number}
     */ this.flatMidpointRevision_ = -1;
        /**
     * @private
     * @type {number}
     */ this.maxDelta_ = -1;
        /**
     * @private
     * @type {number}
     */ this.maxDeltaRevision_ = -1;
        if (layout !== undefined && !Array.isArray(coordinates[0])) this.setFlatCoordinates(layout, /** @type {Array<number>} */ coordinates);
        else this.setCoordinates(/** @type {Array<import("../coordinate.js").Coordinate>} */ coordinates, layout);
    }
    /**
   * Append the passed coordinate to the coordinates of the linestring.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @api
   */ appendCoordinate(coordinate) {
        if (!this.flatCoordinates) this.flatCoordinates = coordinate.slice();
        else (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(this.flatCoordinates, coordinate);
        this.changed();
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!LineString} Clone.
   * @api
   */ clone() {
        const lineString = new $d7f9a2d51be44999$var$LineString(this.flatCoordinates.slice(), this.layout);
        lineString.applyProperties(this);
        return lineString;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < (0, $84be800ca44e672c$export$cbe64c389534206f)(this.getExtent(), x, y)) return minSquaredDistance;
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt((0, $cb3f29ffe7102d22$export$bc2eb611ddf80103)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return (0, $cb3f29ffe7102d22$export$4adc8e5135fb44c)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
    }
    /**
   * Iterate over each segment, calling the provided callback.
   * If the callback returns a truthy value the function returns that
   * value immediately. Otherwise the function returns `false`.
   *
   * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
   *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
   * @return {T|boolean} Value.
   * @template T,S
   * @api
   */ forEachSegment(callback) {
        return (0, $8d8f5846de6dbcc5$export$4b80e395e36b5a56)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, callback);
    }
    /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */ getCoordinateAtM(m, extrapolate) {
        if (this.layout != "XYM" && this.layout != "XYZM") return null;
        extrapolate = extrapolate !== undefined ? extrapolate : false;
        return (0, $9add6a1a9444b11b$export$8f44c3c220ef6f09)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, m, extrapolate);
    }
    /**
   * Return the coordinates of the linestring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */ getCoordinates() {
        return (0, $26e6af5078c94bc3$export$9c0934e4e9c3f61e)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    }
    /**
   * Return the coordinate at the provided fraction along the linestring.
   * The `fraction` is a number between 0 and 1, where 0 is the start of the
   * linestring and 1 is the end.
   * @param {number} fraction Fraction.
   * @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
   *     be modified. If not provided, a new coordinate will be returned.
   * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
   * @api
   */ getCoordinateAt(fraction, dest) {
        return (0, $9add6a1a9444b11b$export$687ff82efd78795b)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, fraction, dest, this.stride);
    }
    /**
   * Return the length of the linestring on projected plane.
   * @return {number} Length (on projected plane).
   * @api
   */ getLength() {
        return (0, $9d37b56b1e11868f$export$153f8c6b4d8caebc)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    }
    /**
   * @return {Array<number>} Flat midpoint.
   */ getFlatMidpoint() {
        if (this.flatMidpointRevision_ != this.getRevision()) {
            this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_);
            this.flatMidpointRevision_ = this.getRevision();
        }
        return this.flatMidpoint_;
    }
    /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} Simplified LineString.
   * @protected
   */ getSimplifiedGeometryInternal(squaredTolerance) {
        const simplifiedFlatCoordinates = [];
        simplifiedFlatCoordinates.length = (0, $116cc918e3d500bf$export$ef693d1572e64fb8)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
        return new $d7f9a2d51be44999$var$LineString(simplifiedFlatCoordinates, "XY");
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "LineString";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        return (0, $474e660540ba37db$export$40d8d71841a3d779)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
    }
    /**
   * Set the coordinates of the linestring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */ setCoordinates(coordinates, layout) {
        this.setLayout(layout, coordinates, 1);
        if (!this.flatCoordinates) this.flatCoordinates = [];
        this.flatCoordinates.length = (0, $e6d128aec3d5ac99$export$5c4daf67e03c190f)(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    }
}
var $d7f9a2d51be44999$export$2e2bcd8739ae039 = $d7f9a2d51be44999$var$LineString;


/**
 * @module ol/geom/MultiLineString
 */ 









/**
 * @classdesc
 * Multi-linestring geometry.
 *
 * @api
 */ class $6dfe53a6bc4fc624$var$MultiLineString extends (0, $ecdcc798f2987118$export$2e2bcd8739ae039) {
    /**
   * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
   *     Coordinates or LineString geometries. (For internal use, flat coordinates in
   *     combination with `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Flat coordinate ends for internal use.
   */ constructor(coordinates, layout, ends){
        super();
        /**
     * @type {Array<number>}
     * @private
     */ this.ends_ = [];
        /**
     * @private
     * @type {number}
     */ this.maxDelta_ = -1;
        /**
     * @private
     * @type {number}
     */ this.maxDeltaRevision_ = -1;
        if (Array.isArray(coordinates[0])) this.setCoordinates(/** @type {Array<Array<import("../coordinate.js").Coordinate>>} */ coordinates, layout);
        else if (layout !== undefined && ends) {
            this.setFlatCoordinates(layout, /** @type {Array<number>} */ coordinates);
            this.ends_ = ends;
        } else {
            let layout = this.getLayout();
            const lineStrings = /** @type {Array<LineString>} */ coordinates;
            const flatCoordinates = [];
            const ends = [];
            for(let i = 0, ii = lineStrings.length; i < ii; ++i){
                const lineString = lineStrings[i];
                if (i === 0) layout = lineString.getLayout();
                (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(flatCoordinates, lineString.getFlatCoordinates());
                ends.push(flatCoordinates.length);
            }
            this.setFlatCoordinates(layout, flatCoordinates);
            this.ends_ = ends;
        }
    }
    /**
   * Append the passed linestring to the multilinestring.
   * @param {LineString} lineString LineString.
   * @api
   */ appendLineString(lineString) {
        if (!this.flatCoordinates) this.flatCoordinates = lineString.getFlatCoordinates().slice();
        else (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(this.flatCoordinates, lineString.getFlatCoordinates().slice());
        this.ends_.push(this.flatCoordinates.length);
        this.changed();
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!MultiLineString} Clone.
   * @api
   */ clone() {
        const multiLineString = new $6dfe53a6bc4fc624$var$MultiLineString(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
        multiLineString.applyProperties(this);
        return multiLineString;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < (0, $84be800ca44e672c$export$cbe64c389534206f)(this.getExtent(), x, y)) return minSquaredDistance;
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt((0, $cb3f29ffe7102d22$export$fbf31c8f2668ed5a)(this.flatCoordinates, 0, this.ends_, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return (0, $cb3f29ffe7102d22$export$5a48a0eefcf14992)(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
    }
    /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * `interpolate` controls interpolation between consecutive LineStrings
   * within the MultiLineString. If `interpolate` is `true` the coordinates
   * will be linearly interpolated between the last coordinate of one LineString
   * and the first coordinate of the next LineString.  If `interpolate` is
   * `false` then the function will return `null` for Ms falling between
   * LineStrings.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @param {boolean} [interpolate] Interpolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */ getCoordinateAtM(m, extrapolate, interpolate) {
        if (this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0) return null;
        extrapolate = extrapolate !== undefined ? extrapolate : false;
        interpolate = interpolate !== undefined ? interpolate : false;
        return (0, $9add6a1a9444b11b$export$6a3300857e9ef453)(this.flatCoordinates, 0, this.ends_, this.stride, m, extrapolate, interpolate);
    }
    /**
   * Return the coordinates of the multilinestring.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */ getCoordinates() {
        return (0, $26e6af5078c94bc3$export$cbb9596fc0f40db2)(this.flatCoordinates, 0, this.ends_, this.stride);
    }
    /**
   * @return {Array<number>} Ends.
   */ getEnds() {
        return this.ends_;
    }
    /**
   * Return the linestring at the specified index.
   * @param {number} index Index.
   * @return {LineString} LineString.
   * @api
   */ getLineString(index) {
        if (index < 0 || this.ends_.length <= index) return null;
        return new (0, $d7f9a2d51be44999$export$2e2bcd8739ae039)(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
    }
    /**
   * Return the linestrings of this multilinestring.
   * @return {Array<LineString>} LineStrings.
   * @api
   */ getLineStrings() {
        const flatCoordinates = this.flatCoordinates;
        const ends = this.ends_;
        const layout = this.layout;
        /** @type {Array<LineString>} */ const lineStrings = [];
        let offset = 0;
        for(let i = 0, ii = ends.length; i < ii; ++i){
            const end = ends[i];
            const lineString = new (0, $d7f9a2d51be44999$export$2e2bcd8739ae039)(flatCoordinates.slice(offset, end), layout);
            lineStrings.push(lineString);
            offset = end;
        }
        return lineStrings;
    }
    /**
   * @return {Array<number>} Flat midpoints.
   */ getFlatMidpoints() {
        const midpoints = [];
        const flatCoordinates = this.flatCoordinates;
        let offset = 0;
        const ends = this.ends_;
        const stride = this.stride;
        for(let i = 0, ii = ends.length; i < ii; ++i){
            const end = ends[i];
            const midpoint = (0, $9add6a1a9444b11b$export$687ff82efd78795b)(flatCoordinates, offset, end, stride, 0.5);
            (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(midpoints, midpoint);
            offset = end;
        }
        return midpoints;
    }
    /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiLineString} Simplified MultiLineString.
   * @protected
   */ getSimplifiedGeometryInternal(squaredTolerance) {
        const simplifiedFlatCoordinates = [];
        const simplifiedEnds = [];
        simplifiedFlatCoordinates.length = (0, $116cc918e3d500bf$export$cedb9900c0b225c2)(this.flatCoordinates, 0, this.ends_, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
        return new $6dfe53a6bc4fc624$var$MultiLineString(simplifiedFlatCoordinates, "XY", simplifiedEnds);
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "MultiLineString";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        return (0, $474e660540ba37db$export$fdb1d8e850bf7937)(this.flatCoordinates, 0, this.ends_, this.stride, extent);
    }
    /**
   * Set the coordinates of the multilinestring.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */ setCoordinates(coordinates, layout) {
        this.setLayout(layout, coordinates, 2);
        if (!this.flatCoordinates) this.flatCoordinates = [];
        const ends = (0, $e6d128aec3d5ac99$export$47c3746a74384d45)(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
        this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
        this.changed();
    }
}
var $6dfe53a6bc4fc624$export$2e2bcd8739ae039 = $6dfe53a6bc4fc624$var$MultiLineString;


/**
 * @module ol/geom/MultiPoint
 */ 






/**
 * @classdesc
 * Multi-point geometry.
 *
 * @api
 */ class $ef0ee165718e6356$var$MultiPoint extends (0, $ecdcc798f2987118$export$2e2bcd8739ae039) {
    /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */ constructor(coordinates, layout){
        super();
        if (layout && !Array.isArray(coordinates[0])) this.setFlatCoordinates(layout, /** @type {Array<number>} */ coordinates);
        else this.setCoordinates(/** @type {Array<import("../coordinate.js").Coordinate>} */ coordinates, layout);
    }
    /**
   * Append the passed point to this multipoint.
   * @param {Point} point Point.
   * @api
   */ appendPoint(point) {
        if (!this.flatCoordinates) this.flatCoordinates = point.getFlatCoordinates().slice();
        else (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(this.flatCoordinates, point.getFlatCoordinates());
        this.changed();
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!MultiPoint} Clone.
   * @api
   */ clone() {
        const multiPoint = new $ef0ee165718e6356$var$MultiPoint(this.flatCoordinates.slice(), this.layout);
        multiPoint.applyProperties(this);
        return multiPoint;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < (0, $84be800ca44e672c$export$cbe64c389534206f)(this.getExtent(), x, y)) return minSquaredDistance;
        const flatCoordinates = this.flatCoordinates;
        const stride = this.stride;
        for(let i = 0, ii = flatCoordinates.length; i < ii; i += stride){
            const squaredDistance = (0, $57ec69d152197e1d$export$88e6ebb4fe54f538)(x, y, flatCoordinates[i], flatCoordinates[i + 1]);
            if (squaredDistance < minSquaredDistance) {
                minSquaredDistance = squaredDistance;
                for(let j = 0; j < stride; ++j)closestPoint[j] = flatCoordinates[i + j];
                closestPoint.length = stride;
            }
        }
        return minSquaredDistance;
    }
    /**
   * Return the coordinates of the multipoint.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */ getCoordinates() {
        return (0, $26e6af5078c94bc3$export$9c0934e4e9c3f61e)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
    }
    /**
   * Return the point at the specified index.
   * @param {number} index Index.
   * @return {Point} Point.
   * @api
   */ getPoint(index) {
        const n = !this.flatCoordinates ? 0 : this.flatCoordinates.length / this.stride;
        if (index < 0 || n <= index) return null;
        return new (0, $de620c8161ba008b$export$2e2bcd8739ae039)(this.flatCoordinates.slice(index * this.stride, (index + 1) * this.stride), this.layout);
    }
    /**
   * Return the points of this multipoint.
   * @return {Array<Point>} Points.
   * @api
   */ getPoints() {
        const flatCoordinates = this.flatCoordinates;
        const layout = this.layout;
        const stride = this.stride;
        /** @type {Array<Point>} */ const points = [];
        for(let i = 0, ii = flatCoordinates.length; i < ii; i += stride){
            const point = new (0, $de620c8161ba008b$export$2e2bcd8739ae039)(flatCoordinates.slice(i, i + stride), layout);
            points.push(point);
        }
        return points;
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "MultiPoint";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        const flatCoordinates = this.flatCoordinates;
        const stride = this.stride;
        for(let i = 0, ii = flatCoordinates.length; i < ii; i += stride){
            const x = flatCoordinates[i];
            const y = flatCoordinates[i + 1];
            if ((0, $84be800ca44e672c$export$805bdfd6d6690e97)(extent, x, y)) return true;
        }
        return false;
    }
    /**
   * Set the coordinates of the multipoint.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */ setCoordinates(coordinates, layout) {
        this.setLayout(layout, coordinates, 1);
        if (!this.flatCoordinates) this.flatCoordinates = [];
        this.flatCoordinates.length = (0, $e6d128aec3d5ac99$export$5c4daf67e03c190f)(this.flatCoordinates, 0, coordinates, this.stride);
        this.changed();
    }
}
var $ef0ee165718e6356$export$2e2bcd8739ae039 = $ef0ee165718e6356$var$MultiPoint;


/**
 * @module ol/geom/MultiPolygon
 */ 











/**
 * @module ol/geom/flat/center
 */ 
function $691d38622fef0d7f$export$78e139679ca7205(flatCoordinates, offset, endss, stride) {
    const flatCenters = [];
    let extent = (0, $84be800ca44e672c$export$fe201bb3bbe031e9)();
    for(let i = 0, ii = endss.length; i < ii; ++i){
        const ends = endss[i];
        extent = (0, $84be800ca44e672c$export$be0ab0bf96ca59ca)(flatCoordinates, offset, ends[0], stride);
        flatCenters.push((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2);
        offset = ends[ends.length - 1];
    }
    return flatCenters;
}




/**
 * @classdesc
 * Multi-polygon geometry.
 *
 * @api
 */ class $1bfd9186d927da9f$var$MultiPolygon extends (0, $ecdcc798f2987118$export$2e2bcd8739ae039) {
    /**
   * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
   */ constructor(coordinates, layout, endss){
        super();
        /**
     * @type {Array<Array<number>>}
     * @private
     */ this.endss_ = [];
        /**
     * @private
     * @type {number}
     */ this.flatInteriorPointsRevision_ = -1;
        /**
     * @private
     * @type {Array<number>}
     */ this.flatInteriorPoints_ = null;
        /**
     * @private
     * @type {number}
     */ this.maxDelta_ = -1;
        /**
     * @private
     * @type {number}
     */ this.maxDeltaRevision_ = -1;
        /**
     * @private
     * @type {number}
     */ this.orientedRevision_ = -1;
        /**
     * @private
     * @type {Array<number>}
     */ this.orientedFlatCoordinates_ = null;
        if (!endss && !Array.isArray(coordinates[0])) {
            let thisLayout = this.getLayout();
            const polygons = /** @type {Array<Polygon>} */ coordinates;
            const flatCoordinates = [];
            const thisEndss = [];
            for(let i = 0, ii = polygons.length; i < ii; ++i){
                const polygon = polygons[i];
                if (i === 0) thisLayout = polygon.getLayout();
                const offset = flatCoordinates.length;
                const ends = polygon.getEnds();
                for(let j = 0, jj = ends.length; j < jj; ++j)ends[j] += offset;
                (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(flatCoordinates, polygon.getFlatCoordinates());
                thisEndss.push(ends);
            }
            layout = thisLayout;
            coordinates = flatCoordinates;
            endss = thisEndss;
        }
        if (layout !== undefined && endss) {
            this.setFlatCoordinates(layout, /** @type {Array<number>} */ coordinates);
            this.endss_ = endss;
        } else this.setCoordinates(/** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */ coordinates, layout);
    }
    /**
   * Append the passed polygon to this multipolygon.
   * @param {Polygon} polygon Polygon.
   * @api
   */ appendPolygon(polygon) {
        /** @type {Array<number>} */ let ends;
        if (!this.flatCoordinates) {
            this.flatCoordinates = polygon.getFlatCoordinates().slice();
            ends = polygon.getEnds().slice();
            this.endss_.push();
        } else {
            const offset = this.flatCoordinates.length;
            (0, $69c1cc8ae30f997f$export$8b58be045bf06082)(this.flatCoordinates, polygon.getFlatCoordinates());
            ends = polygon.getEnds().slice();
            for(let i = 0, ii = ends.length; i < ii; ++i)ends[i] += offset;
        }
        this.endss_.push(ends);
        this.changed();
    }
    /**
   * Make a complete copy of the geometry.
   * @return {!MultiPolygon} Clone.
   * @api
   */ clone() {
        const len = this.endss_.length;
        const newEndss = new Array(len);
        for(let i = 0; i < len; ++i)newEndss[i] = this.endss_[i].slice();
        const multiPolygon = new $1bfd9186d927da9f$var$MultiPolygon(this.flatCoordinates.slice(), this.layout, newEndss);
        multiPolygon.applyProperties(this);
        return multiPolygon;
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */ closestPointXY(x, y, closestPoint, minSquaredDistance) {
        if (minSquaredDistance < (0, $84be800ca44e672c$export$cbe64c389534206f)(this.getExtent(), x, y)) return minSquaredDistance;
        if (this.maxDeltaRevision_ != this.getRevision()) {
            this.maxDelta_ = Math.sqrt((0, $cb3f29ffe7102d22$export$37c18e6e7d50501a)(this.flatCoordinates, 0, this.endss_, this.stride, 0));
            this.maxDeltaRevision_ = this.getRevision();
        }
        return (0, $cb3f29ffe7102d22$export$60e067685eb8f9c4)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
    }
    /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */ containsXY(x, y) {
        return (0, $58f0282580b80064$export$c760d9d16cf92043)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, x, y);
    }
    /**
   * Return the area of the multipolygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */ getArea() {
        return (0, $808945bcd5aac66c$export$78e139679ca7205)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
    }
    /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for multi-polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
   * @api
   */ getCoordinates(right) {
        let flatCoordinates;
        if (right !== undefined) {
            flatCoordinates = this.getOrientedFlatCoordinates().slice();
            (0, $3ab399f8a01aefd6$export$ea9ed55fc2a85010)(flatCoordinates, 0, this.endss_, this.stride, right);
        } else flatCoordinates = this.flatCoordinates;
        return (0, $26e6af5078c94bc3$export$915c7058aeb4dfeb)(flatCoordinates, 0, this.endss_, this.stride);
    }
    /**
   * @return {Array<Array<number>>} Endss.
   */ getEndss() {
        return this.endss_;
    }
    /**
   * @return {Array<number>} Flat interior points.
   */ getFlatInteriorPoints() {
        if (this.flatInteriorPointsRevision_ != this.getRevision()) {
            const flatCenters = (0, $691d38622fef0d7f$export$78e139679ca7205)(this.flatCoordinates, 0, this.endss_, this.stride);
            this.flatInteriorPoints_ = (0, $0fb8cd85c41caa22$export$11463803eda8a372)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, flatCenters);
            this.flatInteriorPointsRevision_ = this.getRevision();
        }
        return this.flatInteriorPoints_;
    }
    /**
   * Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
   * @return {MultiPoint} Interior points as XYM coordinates, where M is
   * the length of the horizontal intersection that the point belongs to.
   * @api
   */ getInteriorPoints() {
        return new (0, $ef0ee165718e6356$export$2e2bcd8739ae039)(this.getFlatInteriorPoints().slice(), "XYM");
    }
    /**
   * @return {Array<number>} Oriented flat coordinates.
   */ getOrientedFlatCoordinates() {
        if (this.orientedRevision_ != this.getRevision()) {
            const flatCoordinates = this.flatCoordinates;
            if ((0, $3ab399f8a01aefd6$export$a1d138f4bd85f4b4)(flatCoordinates, 0, this.endss_, this.stride)) this.orientedFlatCoordinates_ = flatCoordinates;
            else {
                this.orientedFlatCoordinates_ = flatCoordinates.slice();
                this.orientedFlatCoordinates_.length = (0, $3ab399f8a01aefd6$export$ea9ed55fc2a85010)(this.orientedFlatCoordinates_, 0, this.endss_, this.stride);
            }
            this.orientedRevision_ = this.getRevision();
        }
        return this.orientedFlatCoordinates_;
    }
    /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiPolygon} Simplified MultiPolygon.
   * @protected
   */ getSimplifiedGeometryInternal(squaredTolerance) {
        const simplifiedFlatCoordinates = [];
        const simplifiedEndss = [];
        simplifiedFlatCoordinates.length = (0, $116cc918e3d500bf$export$b9acf67ef05cd17c)(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEndss);
        return new $1bfd9186d927da9f$var$MultiPolygon(simplifiedFlatCoordinates, "XY", simplifiedEndss);
    }
    /**
   * Return the polygon at the specified index.
   * @param {number} index Index.
   * @return {Polygon} Polygon.
   * @api
   */ getPolygon(index) {
        if (index < 0 || this.endss_.length <= index) return null;
        let offset;
        if (index === 0) offset = 0;
        else {
            const prevEnds = this.endss_[index - 1];
            offset = prevEnds[prevEnds.length - 1];
        }
        const ends = this.endss_[index].slice();
        const end = ends[ends.length - 1];
        if (offset !== 0) for(let i = 0, ii = ends.length; i < ii; ++i)ends[i] -= offset;
        return new (0, $8fedf7da5a76e7a9$export$2e2bcd8739ae039)(this.flatCoordinates.slice(offset, end), this.layout, ends);
    }
    /**
   * Return the polygons of this multipolygon.
   * @return {Array<Polygon>} Polygons.
   * @api
   */ getPolygons() {
        const layout = this.layout;
        const flatCoordinates = this.flatCoordinates;
        const endss = this.endss_;
        const polygons = [];
        let offset = 0;
        for(let i = 0, ii = endss.length; i < ii; ++i){
            const ends = endss[i].slice();
            const end = ends[ends.length - 1];
            if (offset !== 0) for(let j = 0, jj = ends.length; j < jj; ++j)ends[j] -= offset;
            const polygon = new (0, $8fedf7da5a76e7a9$export$2e2bcd8739ae039)(flatCoordinates.slice(offset, end), layout, ends);
            polygons.push(polygon);
            offset = end;
        }
        return polygons;
    }
    /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */ getType() {
        return "MultiPolygon";
    }
    /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */ intersectsExtent(extent) {
        return (0, $474e660540ba37db$export$77b72fa3792f5bf0)(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, extent);
    }
    /**
   * Set the coordinates of the multipolygon.
   * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */ setCoordinates(coordinates, layout) {
        this.setLayout(layout, coordinates, 3);
        if (!this.flatCoordinates) this.flatCoordinates = [];
        const endss = (0, $e6d128aec3d5ac99$export$f9f2bb59da4accd3)(this.flatCoordinates, 0, coordinates, this.stride, this.endss_);
        if (endss.length === 0) this.flatCoordinates.length = 0;
        else {
            const lastEnds = endss[endss.length - 1];
            this.flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
        }
        this.changed();
    }
}
var $1bfd9186d927da9f$export$2e2bcd8739ae039 = $1bfd9186d927da9f$var$MultiPolygon;








/**
 * @typedef {import("geojson").GeoJSON} GeoJSONObject
 * @typedef {import("geojson").Feature} GeoJSONFeature
 * @typedef {import("geojson").FeatureCollection} GeoJSONFeatureCollection
 * @typedef {import("geojson").Geometry} GeoJSONGeometry
 * @typedef {import("geojson").Point} GeoJSONPoint
 * @typedef {import("geojson").LineString} GeoJSONLineString
 * @typedef {import("geojson").Polygon} GeoJSONPolygon
 * @typedef {import("geojson").MultiPoint} GeoJSONMultiPoint
 * @typedef {import("geojson").MultiLineString} GeoJSONMultiLineString
 * @typedef {import("geojson").MultiPolygon} GeoJSONMultiPolygon
 * @typedef {import("geojson").GeometryCollection} GeoJSONGeometryCollection
 */ /**
 * @typedef {Object} Options
 * @property {import("../proj.js").ProjectionLike} [dataProjection='EPSG:4326'] Default data projection.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection for features read or
 * written by the format.  Options passed to read or write methods will take precedence.
 * @property {string} [geometryName] Geometry name to use when creating features.
 * @property {boolean} [extractGeometryName=false] Certain GeoJSON providers include
 * the geometry_name field in the feature GeoJSON. If set to `true` the GeoJSON reader
 * will look for that field to set the geometry name. If both this field is set to `true`
 * and a `geometryName` is provided, the `geometryName` will take precedence.
 */ /**
 * @classdesc
 * Feature format for reading and writing data in the GeoJSON format.
 *
 * @api
 */ class $c572408571109165$var$GeoJSON extends (0, $f791690b01dc2280$export$2e2bcd8739ae039) {
    /**
   * @param {Options} [options] Options.
   */ constructor(options){
        options = options ? options : {};
        super();
        /**
     * @type {import("../proj/Projection.js").default}
     */ this.dataProjection = (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.dataProjection ? options.dataProjection : "EPSG:4326");
        if (options.featureProjection) /**
       * @type {import("../proj/Projection.js").default}
       */ this.defaultFeatureProjection = (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(options.featureProjection);
        /**
     * Name of the geometry attribute for features.
     * @type {string|undefined}
     * @private
     */ this.geometryName_ = options.geometryName;
        /**
     * Look for the geometry name in the feature GeoJSON
     * @type {boolean|undefined}
     * @private
     */ this.extractGeometryName_ = options.extractGeometryName;
        this.supportedMediaTypes = [
            "application/geo+json",
            "application/vnd.geo+json"
        ];
    }
    /**
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {import("../Feature.js").default} Feature.
   */ readFeatureFromObject(object, options) {
        /**
     * @type {GeoJSONFeature}
     */ let geoJSONFeature = null;
        if (object["type"] === "Feature") geoJSONFeature = /** @type {GeoJSONFeature} */ object;
        else geoJSONFeature = {
            "type": "Feature",
            "geometry": /** @type {GeoJSONGeometry} */ object,
            "properties": null
        };
        const geometry = $c572408571109165$var$readGeometry(geoJSONFeature["geometry"], options);
        const feature = new (0, $488541e07685eb37$export$2e2bcd8739ae039)();
        if (this.geometryName_) feature.setGeometryName(this.geometryName_);
        else if (this.extractGeometryName_ && true) feature.setGeometryName(geoJSONFeature["geometry_name"]);
        feature.setGeometry(geometry);
        if ("id" in geoJSONFeature) feature.setId(geoJSONFeature["id"]);
        if (geoJSONFeature["properties"]) feature.setProperties(geoJSONFeature["properties"], true);
        return feature;
    }
    /**
   * @param {Object} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {Array<Feature>} Features.
   */ readFeaturesFromObject(object, options) {
        const geoJSONObject = /** @type {GeoJSONObject} */ object;
        /** @type {Array<import("../Feature.js").default>} */ let features = null;
        if (geoJSONObject["type"] === "FeatureCollection") {
            const geoJSONFeatureCollection = /** @type {GeoJSONFeatureCollection} */ object;
            features = [];
            const geoJSONFeatures = geoJSONFeatureCollection["features"];
            for(let i = 0, ii = geoJSONFeatures.length; i < ii; ++i)features.push(this.readFeatureFromObject(geoJSONFeatures[i], options));
        } else features = [
            this.readFeatureFromObject(object, options)
        ];
        return features;
    }
    /**
   * @param {GeoJSONGeometry} object Object.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */ readGeometryFromObject(object, options) {
        return $c572408571109165$var$readGeometry(object, options);
    }
    /**
   * @param {Object} object Object.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */ readProjectionFromObject(object) {
        const crs = object["crs"];
        let projection;
        if (crs) {
            if (crs["type"] == "name") projection = (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)(crs["properties"]["name"]);
            else if (crs["type"] === "EPSG") projection = (0, $983289ae1d13cd2a$export$3988ae62b71be9a3)("EPSG:" + crs["properties"]["code"]);
            else (0, $1e19c69d18d8b77c$export$a7a9523472993e97)(false, 36); // Unknown SRS type
        } else projection = this.dataProjection;
        return /** @type {import("../proj/Projection.js").default} */ projection;
    }
    /**
   * Encode a feature as a GeoJSON Feature object.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {GeoJSONFeature} Object.
   * @api
   */ writeFeatureObject(feature, options) {
        options = this.adaptOptions(options);
        /** @type {GeoJSONFeature} */ const object = {
            "type": "Feature",
            geometry: null,
            properties: null
        };
        const id = feature.getId();
        if (id !== undefined) object.id = id;
        if (!feature.hasProperties()) return object;
        const properties = feature.getProperties();
        const geometry = feature.getGeometry();
        if (geometry) {
            object.geometry = $c572408571109165$var$writeGeometry(geometry, options);
            delete properties[feature.getGeometryName()];
        }
        if (!(0, $e2dfef87a88758ed$export$dd1bc94b04021eeb)(properties)) object.properties = properties;
        return object;
    }
    /**
   * Encode an array of features as a GeoJSON object.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {GeoJSONFeatureCollection} GeoJSON Object.
   * @api
   */ writeFeaturesObject(features, options) {
        options = this.adaptOptions(options);
        const objects = [];
        for(let i = 0, ii = features.length; i < ii; ++i)objects.push(this.writeFeatureObject(features[i], options));
        return {
            type: "FeatureCollection",
            features: objects
        };
    }
    /**
   * Encode a geometry as a GeoJSON object.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {GeoJSONGeometry|GeoJSONGeometryCollection} Object.
   * @api
   */ writeGeometryObject(geometry, options) {
        return $c572408571109165$var$writeGeometry(geometry, this.adaptOptions(options));
    }
}
/**
 * @param {GeoJSONGeometry|GeoJSONGeometryCollection} object Object.
 * @param {import("./Feature.js").ReadOptions} [options] Read options.
 * @return {import("../geom/Geometry.js").default} Geometry.
 */ function $c572408571109165$var$readGeometry(object, options) {
    if (!object) return null;
    /**
   * @type {import("../geom/Geometry.js").default}
   */ let geometry;
    switch(object["type"]){
        case "Point":
            geometry = $c572408571109165$var$readPointGeometry(/** @type {GeoJSONPoint} */ object);
            break;
        case "LineString":
            geometry = $c572408571109165$var$readLineStringGeometry(/** @type {GeoJSONLineString} */ object);
            break;
        case "Polygon":
            geometry = $c572408571109165$var$readPolygonGeometry(/** @type {GeoJSONPolygon} */ object);
            break;
        case "MultiPoint":
            geometry = $c572408571109165$var$readMultiPointGeometry(/** @type {GeoJSONMultiPoint} */ object);
            break;
        case "MultiLineString":
            geometry = $c572408571109165$var$readMultiLineStringGeometry(/** @type {GeoJSONMultiLineString} */ object);
            break;
        case "MultiPolygon":
            geometry = $c572408571109165$var$readMultiPolygonGeometry(/** @type {GeoJSONMultiPolygon} */ object);
            break;
        case "GeometryCollection":
            geometry = $c572408571109165$var$readGeometryCollectionGeometry(/** @type {GeoJSONGeometryCollection} */ object);
            break;
        default:
            throw new Error("Unsupported GeoJSON type: " + object["type"]);
    }
    return (0, $8d80c6b1ee03d123$export$7beeea566b560d4)(geometry, false, options);
}
/**
 * @param {GeoJSONGeometryCollection} object Object.
 * @param {import("./Feature.js").ReadOptions} [options] Read options.
 * @return {GeometryCollection} Geometry collection.
 */ function $c572408571109165$var$readGeometryCollectionGeometry(object, options) {
    const geometries = object["geometries"].map(/**
     * @param {GeoJSONGeometry} geometry Geometry.
     * @return {import("../geom/Geometry.js").default} geometry Geometry.
     */ function(geometry) {
        return $c572408571109165$var$readGeometry(geometry, options);
    });
    return new (0, $4cd72e2ccfc56a15$export$2e2bcd8739ae039)(geometries);
}
/**
 * @param {GeoJSONPoint} object Object.
 * @return {Point} Point.
 */ function $c572408571109165$var$readPointGeometry(object) {
    return new (0, $de620c8161ba008b$export$2e2bcd8739ae039)(object["coordinates"]);
}
/**
 * @param {GeoJSONLineString} object Object.
 * @return {LineString} LineString.
 */ function $c572408571109165$var$readLineStringGeometry(object) {
    return new (0, $d7f9a2d51be44999$export$2e2bcd8739ae039)(object["coordinates"]);
}
/**
 * @param {GeoJSONMultiLineString} object Object.
 * @return {MultiLineString} MultiLineString.
 */ function $c572408571109165$var$readMultiLineStringGeometry(object) {
    return new (0, $6dfe53a6bc4fc624$export$2e2bcd8739ae039)(object["coordinates"]);
}
/**
 * @param {GeoJSONMultiPoint} object Object.
 * @return {MultiPoint} MultiPoint.
 */ function $c572408571109165$var$readMultiPointGeometry(object) {
    return new (0, $ef0ee165718e6356$export$2e2bcd8739ae039)(object["coordinates"]);
}
/**
 * @param {GeoJSONMultiPolygon} object Object.
 * @return {MultiPolygon} MultiPolygon.
 */ function $c572408571109165$var$readMultiPolygonGeometry(object) {
    return new (0, $1bfd9186d927da9f$export$2e2bcd8739ae039)(object["coordinates"]);
}
/**
 * @param {GeoJSONPolygon} object Object.
 * @return {Polygon} Polygon.
 */ function $c572408571109165$var$readPolygonGeometry(object) {
    return new (0, $8fedf7da5a76e7a9$export$2e2bcd8739ae039)(object["coordinates"]);
}
/**
 * @param {import("../geom/Geometry.js").default} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */ function $c572408571109165$var$writeGeometry(geometry, options) {
    geometry = (0, $8d80c6b1ee03d123$export$7beeea566b560d4)(geometry, true, options);
    const type = geometry.getType();
    /** @type {GeoJSONGeometry} */ let geoJSON;
    switch(type){
        case "Point":
            geoJSON = $c572408571109165$var$writePointGeometry(/** @type {Point} */ geometry, options);
            break;
        case "LineString":
            geoJSON = $c572408571109165$var$writeLineStringGeometry(/** @type {LineString} */ geometry, options);
            break;
        case "Polygon":
            geoJSON = $c572408571109165$var$writePolygonGeometry(/** @type {Polygon} */ geometry, options);
            break;
        case "MultiPoint":
            geoJSON = $c572408571109165$var$writeMultiPointGeometry(/** @type {MultiPoint} */ geometry, options);
            break;
        case "MultiLineString":
            geoJSON = $c572408571109165$var$writeMultiLineStringGeometry(/** @type {MultiLineString} */ geometry, options);
            break;
        case "MultiPolygon":
            geoJSON = $c572408571109165$var$writeMultiPolygonGeometry(/** @type {MultiPolygon} */ geometry, options);
            break;
        case "GeometryCollection":
            geoJSON = $c572408571109165$var$writeGeometryCollectionGeometry(/** @type {GeometryCollection} */ geometry, options);
            break;
        case "Circle":
            geoJSON = {
                type: "GeometryCollection",
                geometries: []
            };
            break;
        default:
            throw new Error("Unsupported geometry type: " + type);
    }
    return geoJSON;
}
/**
 * @param {GeometryCollection} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometryCollection} GeoJSON geometry collection.
 */ function $c572408571109165$var$writeGeometryCollectionGeometry(geometry, options) {
    options = Object.assign({}, options);
    delete options.featureProjection;
    const geometries = geometry.getGeometriesArray().map(function(geometry) {
        return $c572408571109165$var$writeGeometry(geometry, options);
    });
    return {
        type: "GeometryCollection",
        geometries: geometries
    };
}
/**
 * @param {LineString} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */ function $c572408571109165$var$writeLineStringGeometry(geometry, options) {
    return {
        type: "LineString",
        coordinates: geometry.getCoordinates()
    };
}
/**
 * @param {MultiLineString} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */ function $c572408571109165$var$writeMultiLineStringGeometry(geometry, options) {
    return {
        type: "MultiLineString",
        coordinates: geometry.getCoordinates()
    };
}
/**
 * @param {MultiPoint} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */ function $c572408571109165$var$writeMultiPointGeometry(geometry, options) {
    return {
        type: "MultiPoint",
        coordinates: geometry.getCoordinates()
    };
}
/**
 * @param {MultiPolygon} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */ function $c572408571109165$var$writeMultiPolygonGeometry(geometry, options) {
    let right;
    if (options) right = options.rightHanded;
    return {
        type: "MultiPolygon",
        coordinates: geometry.getCoordinates(right)
    };
}
/**
 * @param {Point} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */ function $c572408571109165$var$writePointGeometry(geometry, options) {
    return {
        type: "Point",
        coordinates: geometry.getCoordinates()
    };
}
/**
 * @param {Polygon} geometry Geometry.
 * @param {import("./Feature.js").WriteOptions} [options] Write options.
 * @return {GeoJSONGeometry} GeoJSON geometry.
 */ function $c572408571109165$var$writePolygonGeometry(geometry, options) {
    let right;
    if (options) right = options.rightHanded;
    return {
        type: "Polygon",
        coordinates: geometry.getCoordinates(right)
    };
}
var $c572408571109165$export$2e2bcd8739ae039 = $c572408571109165$var$GeoJSON;




class $2bda5b0f3abd2a22$export$e7e1d3d8299bc13e extends (0, $3e2183be5df4d9a4$export$a09c19a7c4419c1) {
    constructor(map, apiUrl, markerFolderPath, settings){
        super(map, apiUrl, markerFolderPath, settings);
        this.currentZoom = this.getZoom();
    }
    removeArea() {
        if (this.map.hasOwnProperty("areaLayer")) this.map.areaLayer.getSource().clear();
    }
    getAreaStyle(feature, resolution) {
        const style = new (0, $0e8e066c6965c811$export$2e2bcd8739ae039)({
            stroke: new (0, $5bb5a6da769d8762$export$2e2bcd8739ae039)({
                color: "rgba(255, 0, 0, 1)",
                width: 2
            }),
            fill: new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
                color: "rgba(255, 0, 0, .3)"
            })
        });
        return style;
    }
    addArea(geojson) {
        if (!this.map.hasOwnProperty("areaLayer")) this.createAreaLayer();
        const features = new (0, $c572408571109165$export$2e2bcd8739ae039)({
            featureProjection: "EPSG:3857"
        }).readFeatures(geojson);
        this.map.areaLayer.getSource().addFeatures(features);
    }
    createClusterLayers() {
        const gridClusterLayer = new (0, $fef14e10fb9831ec$export$2e2bcd8739ae039)({
            source: new (0, $3b942f73954bd0a6$export$2e2bcd8739ae039)(),
            style: this.getCellStyle.bind(this)
        });
        this.map.addLayer(gridClusterLayer);
        this.map.gridClusterLayer = gridClusterLayer;
        const kmeansLayer = new (0, $fef14e10fb9831ec$export$2e2bcd8739ae039)({
            source: new (0, $3b942f73954bd0a6$export$2e2bcd8739ae039)()
        });
        this.map.addLayer(kmeansLayer);
        this.map.kmeansLayer = kmeansLayer;
        this.map.on("click", (event)=>{
            let hit = false;
            this.map.forEachFeatureAtPixel(event.pixel, (feature)=>{
                if (hit == false) {
                    if (feature.clustertype == "cell" || feature.clustertype == "marker") {
                        hit = true;
                        let zoom = this.getZoom();
                        if (zoom >= this.maxZoom || feature.count == 1) this.onMarkerFinalClick(feature);
                        else this.markerClickFunction(feature.x, feature.y);
                    }
                }
            });
        });
        this.map.on("pointermove", (event)=>{
            let pixel = this.map.getEventPixel(event.originalEvent);
            let hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getViewport().style.cursor = hit ? "pointer" : "";
        });
    }
    createAreaLayer() {
        const areaLayer = new (0, $fef14e10fb9831ec$export$2e2bcd8739ae039)({
            source: new (0, $3b942f73954bd0a6$export$2e2bcd8739ae039)(),
            style: this.getAreaStyle.bind(this)
        });
        const layers = this.map.getLayers();
        layers.insertAt(2, areaLayer);
        //this.map.addLayer(areaLayer);
        this.map.areaLayer = areaLayer;
    }
    getMarkerIcon(cluster) {
        const piniconObj = this.selectPinIcon(cluster);
        const icon = new (0, $4dd3b6f7e2acb5b2$export$2e2bcd8739ae039)({
            anchor: piniconObj.relativeAnchor,
            crossOrigin: "anonymous",
            src: piniconObj.url,
            imgSize: piniconObj.size,
            size: piniconObj.size
        });
        const styleOptions = {
            image: icon
        };
        if (this.iconType === (0, $aca83a355307fe8a$export$13ff1290a9e22e77).exact && cluster.count > 1) styleOptions.text = new (0, $546674d0724a0df5$export$2e2bcd8739ae039)({
            text: cluster.count.toString(),
            font: "bold 14px sans-serif",
            fill: new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
                color: "#FFF"
            }),
            justify: "center",
            textBaseline: "middle",
            offsetY: 1,
            padding: [
                0,
                0,
                0,
                0
            ]
        });
        const style = new (0, $0e8e066c6965c811$export$2e2bcd8739ae039)(styleOptions);
        return style;
    }
    _getMarkerFeature(cluster) {
        const style = this.getMarkerIcon(cluster);
        const point = new (0, $de620c8161ba008b$export$2e2bcd8739ae039)([
            cluster.center.x,
            cluster.center.y
        ]);
        let marker = new (0, $488541e07685eb37$export$2e2bcd8739ae039)(point);
        marker.setStyle(style);
        return marker;
    }
    _drawSingleMarker(extendedMarker) {
        extendedMarker.clustertype = "marker";
        this.map.kmeansLayer.getSource().addFeature(extendedMarker);
        this.markerList.push(extendedMarker);
    }
    drawKmeansMarker(cluster) {
        let marker = this._getMarkerFeature(cluster);
        let extendedMarker = this.setMarkerProps(marker, cluster);
        this._drawSingleMarker(extendedMarker);
    }
    drawGridMarker(cluster) {
        let marker = this._getMarkerFeature(cluster);
        let extendedMarker = this.setCellProps(marker, cluster);
        this._drawSingleMarker(extendedMarker);
    }
    getCellStyle(feature, resolution) {
        const roundedCount = this.roundMarkerCount(feature.count);
        const fillColor = this.gridFillColors[roundedCount];
        const strokeColor = this.gridStrokeColors[roundedCount];
        const strokeWeight = 2;
        const style = new (0, $0e8e066c6965c811$export$2e2bcd8739ae039)({
            stroke: new (0, $5bb5a6da769d8762$export$2e2bcd8739ae039)({
                color: strokeColor,
                width: strokeWeight
            }),
            fill: new (0, $1646510b52ef7eda$export$2e2bcd8739ae039)({
                color: fillColor
            })
        });
        return style;
    }
    drawCell(cluster) {
        const count = cluster.count;
        if (count == 1) this.drawGridMarker(cluster);
        else {
            const geojson = {
                "type": "Feature",
                "geometry": cluster.geojson
            };
            let feature = new (0, $c572408571109165$export$2e2bcd8739ae039)().readFeature(geojson);
            let extendedFeature = this.setCellProps(feature, cluster);
            extendedFeature.clustertype = "cell";
            this.map.gridClusterLayer.getSource().addFeature(extendedFeature);
        }
    }
    removeAllMarkers() {
        this.map.kmeansLayer.getSource().clear();
        if (this.map.hasOwnProperty("gridClusterLayer")) this.map.gridClusterLayer.getSource().clear();
        this.markerList.length = 0;
    }
    addMapEventListeners() {
        // unfortunately fires after loadend
        this.map.addEventListener("moveend", (event)=>{
            let newZoom = this.getZoom();
            if (newZoom != this.currentZoom) {
                this.removeAllMarkers();
                this.currentZoom = newZoom;
            }
            if (this.isStartup === false) this.getClusters();
        });
    }
    // Openlayers accumulates coordinates when panning across world borders
    putXCoordinateIntoWorldBounds(XCoordinate) {
        let bounds = (0, $5660b38ff962cbfe$export$6db2f048e15a981e);
        if (this.srid === (0, $aca83a355307fe8a$export$55fee9ea2526ad0d).EPSG4326) bounds = (0, $5660b38ff962cbfe$export$2104d4dd9d4984b2);
        const worldWidth = bounds.maxX - bounds.minX;
        const worldCount = Math.floor(Math.abs(XCoordinate) / worldWidth) + 1;
        const vector = worldWidth * worldCount;
        if (XCoordinate < bounds.minX) // user panned to the right, map moved leftwards over the border
        XCoordinate = XCoordinate + vector;
        else if (XCoordinate > bounds.maxX) // user panned to the left, map moved rightwards over the border
        XCoordinate = XCoordinate - vector;
        return XCoordinate;
    }
    getViewport() {
        const view = this.map.getView();
        const extent = view.calculateExtent(this.map.getSize());
        const left = extent[0];
        const bottom = extent[1];
        const right = extent[2];
        const top = extent[3];
        const viewportJSON = {
            "left": this.putXCoordinateIntoWorldBounds(left),
            "top": top,
            "right": this.putXCoordinateIntoWorldBounds(right),
            "bottom": bottom
        };
        return viewportJSON;
    }
    getZoom() {
        const view = this.map.getView();
        return view.getZoom();
    }
    setZoom(zoom) {
        this.map.setZoom(zoom);
    }
    setMap(x, y, zoom) {
        const view = this.map.getView();
        view.animate({
            zoom: zoom,
            center: [
                x,
                y
            ],
            duration: 500
        });
    }
}




export {$aca83a355307fe8a$export$ae91e066970d978a as ClusterMethod, $2bda5b0f3abd2a22$export$e7e1d3d8299bc13e as AnyclusterOpenLayers};
//# sourceMappingURL=anycluster-openlayers.js.map
