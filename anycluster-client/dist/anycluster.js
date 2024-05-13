var $b4f6019a3c0f60c0$export$55fee9ea2526ad0d;
(function(SRIDS) {
    SRIDS["EPSG4326"] = "EPSG:4326";
    SRIDS["EPSG3857"] = "EPSG:3857";
})($b4f6019a3c0f60c0$export$55fee9ea2526ad0d || ($b4f6019a3c0f60c0$export$55fee9ea2526ad0d = {}));
var $b4f6019a3c0f60c0$export$ae91e066970d978a;
(function(ClusterMethod) {
    ClusterMethod["kmeans"] = "kmeans";
    ClusterMethod["grid"] = "grid";
})($b4f6019a3c0f60c0$export$ae91e066970d978a || ($b4f6019a3c0f60c0$export$ae91e066970d978a = {}));
var $b4f6019a3c0f60c0$export$8f4397a63c3cef66;
(function(GeometryType) {
    GeometryType["viewport"] = "viewport";
    GeometryType["area"] = "area";
})($b4f6019a3c0f60c0$export$8f4397a63c3cef66 || ($b4f6019a3c0f60c0$export$8f4397a63c3cef66 = {}));
var $b4f6019a3c0f60c0$export$13ff1290a9e22e77;
(function(IconType) {
    IconType["exact"] = "exact";
    IconType["rounded"] = "rounded";
})($b4f6019a3c0f60c0$export$13ff1290a9e22e77 || ($b4f6019a3c0f60c0$export$13ff1290a9e22e77 = {}));
var $b4f6019a3c0f60c0$export$9c3a9f8fbf06a34;
(function(DefaultGridSizes) {
    DefaultGridSizes[DefaultGridSizes["grid"] = 64] = "grid";
    DefaultGridSizes[DefaultGridSizes["kmeans"] = 150] = "kmeans";
})($b4f6019a3c0f60c0$export$9c3a9f8fbf06a34 || ($b4f6019a3c0f60c0$export$9c3a9f8fbf06a34 = {}));
const $b4f6019a3c0f60c0$export$96b1907ff7fa3578 = {
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
var $b4f6019a3c0f60c0$export$7fa100a28fbb5fe2;
(function(Operators) {
    Operators["in"] = "in";
    Operators["notIn"] = "not in";
    Operators["equals"] = "=";
    Operators["unEquals"] = "!=";
    Operators["largerThan"] = ">=";
    Operators["smallerThan"] = "<=";
    Operators["startswith"] = "startswith";
    Operators["contains"] = "contains";
})($b4f6019a3c0f60c0$export$7fa100a28fbb5fe2 || ($b4f6019a3c0f60c0$export$7fa100a28fbb5fe2 = {}));
var $b4f6019a3c0f60c0$export$9a28c02ac0f6fc9d;
(function(LogicalOperators) {
    LogicalOperators["AND"] = "AND";
    LogicalOperators["OR"] = "OR";
})($b4f6019a3c0f60c0$export$9a28c02ac0f6fc9d || ($b4f6019a3c0f60c0$export$9a28c02ac0f6fc9d = {}));
const $b4f6019a3c0f60c0$export$aa170efeb32c8cf9 = 13;



const $9ef97b21dccf4ee3$export$2104d4dd9d4984b2 = Object.freeze({
    minX: -179,
    maxX: 179,
    minY: -89,
    maxY: 89
});
const $9ef97b21dccf4ee3$export$6db2f048e15a981e = Object.freeze({
    minX: -20037500,
    maxX: 20037500,
    minY: -20048960,
    maxY: 20048960 //  20048966.1
});
class $9ef97b21dccf4ee3$export$5e01b9ff483562af {
    constructor(apiUrl, gridSize, srid){
        this.apiUrl = apiUrl;
        this.gridSize = gridSize;
        this.srid = srid;
        if (this.srid == (0, $b4f6019a3c0f60c0$export$55fee9ea2526ad0d).EPSG4326) this.maxBounds = $9ef97b21dccf4ee3$export$2104d4dd9d4984b2;
        else if (this.srid == (0, $b4f6019a3c0f60c0$export$55fee9ea2526ad0d).EPSG3857) this.maxBounds = $9ef97b21dccf4ee3$export$6db2f048e15a981e;
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




const $2a18f65d622cfe30$var$defaultGridFillColors = {
    5: "rgba(255, 192, 203, .5)",
    10: "rgba(240, 128, 128, .5)",
    50: "rgba(255, 127, 80, .5)",
    100: "rgba(255, 165, 0, .5)",
    1000: "rgba(255, 69, 0, .5)",
    10000: "rgba(255, 0 , 0, .5)"
};
const $2a18f65d622cfe30$var$defaultGridStrokeColors = {
    5: "pink",
    10: "lightcoral",
    50: "coral",
    100: "orange",
    1000: "orangered",
    10000: "red"
};
class $2a18f65d622cfe30$export$a09c19a7c4419c1 {
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
        this.srid = settings.srid ? settings.srid : (0, $b4f6019a3c0f60c0$export$55fee9ea2526ad0d).EPSG4326;
        this.kmeansGridSize = settings.gridGridSize ? settings.gridGridSize : (0, $b4f6019a3c0f60c0$export$9c3a9f8fbf06a34).kmeans;
        this.gridGridSize = settings.gridGridSize ? settings.gridGridSize : (0, $b4f6019a3c0f60c0$export$9c3a9f8fbf06a34).grid;
        this.clusterMethod = settings.clusterMethod ? settings.clusterMethod : (0, $b4f6019a3c0f60c0$export$ae91e066970d978a).kmeans;
        this.geometryType = settings.geometryType ? settings.geometryType : (0, $b4f6019a3c0f60c0$export$8f4397a63c3cef66).viewport;
        this.area = settings.area ? settings.area : null;
        this.iconType = settings.iconType ? settings.iconType : (0, $b4f6019a3c0f60c0$export$13ff1290a9e22e77).rounded;
        this.singlePinImages = settings.singlePinImages ? settings.singlePinImages : {};
        this.getSinglePinImageURL = settings.getSinglePinImageURL ? settings.getSinglePinImageURL : this._getSinglePinImageURL;
        this.markerImageSizes = settings.markerImageSizes ? settings.markerImageSizes : (0, $b4f6019a3c0f60c0$export$96b1907ff7fa3578);
        this.gridFillColors = settings.gridFillColors ? settings.gridFillColors : $2a18f65d622cfe30$var$defaultGridFillColors;
        this.gridStrokeColors = settings.gridStrokeColors ? settings.gridStrokeColors : $2a18f65d622cfe30$var$defaultGridStrokeColors;
        this.maxZoom = settings.maxZoom ? settings.maxZoom : (0, $b4f6019a3c0f60c0$export$aa170efeb32c8cf9);
        // hooks
        this.onGotClusters = settings.onGotClusters ? settings.onGotClusters : this._onGotClusters;
        this.onFinalClick = settings.onFinalClick ? settings.onFinalClick : this._onFinalClick;
        if (this.area) this.setArea(this.area);
        const gridSize = this.getGridSize();
        this.anycluster = new (0, $9ef97b21dccf4ee3$export$5e01b9ff483562af)(this.apiUrl, gridSize, this.srid);
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
        if (this.clusterMethod == (0, $b4f6019a3c0f60c0$export$ae91e066970d978a).grid) return this.gridGridSize;
        return this.kmeansGridSize;
    }
    setClusterMethod(clusterMethod) {
        if (clusterMethod == (0, $b4f6019a3c0f60c0$export$ae91e066970d978a).grid) {
            this.area = null;
            this.geometryType = (0, $b4f6019a3c0f60c0$export$8f4397a63c3cef66).viewport;
            this.removeArea();
        }
        this.removeAllMarkers();
        this.clusterMethod = clusterMethod;
        const gridSize = this.getGridSize();
        this.anycluster = new (0, $9ef97b21dccf4ee3$export$5e01b9ff483562af)(this.apiUrl, gridSize, this.srid);
        this.markerList = [];
        this.getClusters(true);
    }
    setArea(geojson) {
        this.area = geojson;
        this.removeArea();
        if (geojson == null) {
            this.geometryType = (0, $b4f6019a3c0f60c0$export$8f4397a63c3cef66).viewport;
            this.setClusterMethod((0, $b4f6019a3c0f60c0$export$ae91e066970d978a).kmeans);
        } else {
            this.addArea(geojson);
            this.geometryType = (0, $b4f6019a3c0f60c0$export$8f4397a63c3cef66).area;
            this.setClusterMethod((0, $b4f6019a3c0f60c0$export$ae91e066970d978a).kmeans);
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
            if (this.iconType == (0, $b4f6019a3c0f60c0$export$13ff1290a9e22e77).exact) markerImageUrl = `${this.markerFolderPath}${pinicon}_empty.png`;
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
        if (this.clusterMethod == (0, $b4f6019a3c0f60c0$export$ae91e066970d978a).kmeans) {
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
        } else if (this.clusterMethod = (0, $b4f6019a3c0f60c0$export$ae91e066970d978a).grid) {
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
        if (this.geometryType == (0, $b4f6019a3c0f60c0$export$8f4397a63c3cef66).viewport) {
            const viewport = this.getViewport();
            geoJSON = this.anycluster.viewportToGeoJSON(viewport);
        } else if (this.geometryType == (0, $b4f6019a3c0f60c0$export$8f4397a63c3cef66).area && this.area) geoJSON = this.area;
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
        if (this.clusterMethod == (0, $b4f6019a3c0f60c0$export$ae91e066970d978a).kmeans) {
            const clusters = await this.anycluster.getKmeansCluster(zoom, postData);
            const postResponseZoom = this.getZoom();
            // only draw markers/cells if the user did not zoom or change filters during the wait for the response
            if (clusters.length > 0 && filterTimestamp === this.latestFilterChangeTimestamp && zoom === postResponseZoom) {
                clusters.forEach((cluster)=>{
                    this.drawKmeansMarker(cluster);
                });
                this.onGotClusters();
            } else console.log(`[anycluster]: not drawing markers because of outdated response`);
        } else if (this.clusterMethod == (0, $b4f6019a3c0f60c0$export$ae91e066970d978a).grid) {
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
            "geometry_type": (0, $b4f6019a3c0f60c0$export$8f4397a63c3cef66).area,
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




export {$b4f6019a3c0f60c0$export$ae91e066970d978a as ClusterMethod, $b4f6019a3c0f60c0$export$8f4397a63c3cef66 as GeometryType, $b4f6019a3c0f60c0$export$13ff1290a9e22e77 as IconType, $b4f6019a3c0f60c0$export$55fee9ea2526ad0d as SRIDS, $b4f6019a3c0f60c0$export$7fa100a28fbb5fe2 as Operators, $b4f6019a3c0f60c0$export$9a28c02ac0f6fc9d as LogicalOperators, $9ef97b21dccf4ee3$export$5e01b9ff483562af as Anycluster, $9ef97b21dccf4ee3$export$6db2f048e15a981e as Bounds3857, $9ef97b21dccf4ee3$export$2104d4dd9d4984b2 as Bounds4326, $2a18f65d622cfe30$export$a09c19a7c4419c1 as AnyclusterClient};
//# sourceMappingURL=anycluster.js.map
