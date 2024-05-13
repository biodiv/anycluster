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




/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function $1f59b796f8d974c5$var$__awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
// do not edit .js files directly - edit src/index.jst
var $1f59b796f8d974c5$var$fastDeepEqual = function equal(a, b) {
    if (a === b) return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
            length = a.length;
            if (length != b.length) return false;
            for(i = length; i-- !== 0;)if (!equal(a[i], b[i])) return false;
            return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for(i = length; i-- !== 0;)if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for(i = length; i-- !== 0;){
            var key = keys[i];
            if (!equal(a[key], b[key])) return false;
        }
        return true;
    }
    // true if both NaN, false otherwise
    return a !== a && b !== b;
};
/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const $1f59b796f8d974c5$export$19fc78b4b5aa5d0d = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */ var $1f59b796f8d974c5$export$406cfe323c8bb8e4;
(function(LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})($1f59b796f8d974c5$export$406cfe323c8bb8e4 || ($1f59b796f8d974c5$export$406cfe323c8bb8e4 = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */ class $1f59b796f8d974c5$export$3b0d6d7590275603 {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */ constructor({ apiKey: apiKey , authReferrerPolicy: authReferrerPolicy , channel: channel , client: client , id: id = $1f59b796f8d974c5$export$19fc78b4b5aa5d0d , language: language , libraries: libraries = [] , mapIds: mapIds , nonce: nonce , region: region , retries: retries = 3 , url: url = "https://maps.googleapis.com/maps/api/js" , version: version  }){
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || $1f59b796f8d974c5$export$19fc78b4b5aa5d0d; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if ($1f59b796f8d974c5$export$3b0d6d7590275603.instance) {
            if (!$1f59b796f8d974c5$var$fastDeepEqual(this.options, $1f59b796f8d974c5$export$3b0d6d7590275603.instance.options)) throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify($1f59b796f8d974c5$export$3b0d6d7590275603.instance.options)}`);
            return $1f59b796f8d974c5$export$3b0d6d7590275603.instance;
        }
        $1f59b796f8d974c5$export$3b0d6d7590275603.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
            authReferrerPolicy: this.authReferrerPolicy
        };
    }
    get status() {
        if (this.errors.length) return $1f59b796f8d974c5$export$406cfe323c8bb8e4.FAILURE;
        if (this.done) return $1f59b796f8d974c5$export$406cfe323c8bb8e4.SUCCESS;
        if (this.loading) return $1f59b796f8d974c5$export$406cfe323c8bb8e4.LOADING;
        return $1f59b796f8d974c5$export$406cfe323c8bb8e4.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     * @deprecated
     */ createUrl() {
        let url = this.url;
        url += `?callback=__googleMapsCallback`;
        if (this.apiKey) url += `&key=${this.apiKey}`;
        if (this.channel) url += `&channel=${this.channel}`;
        if (this.client) url += `&client=${this.client}`;
        if (this.libraries.length > 0) url += `&libraries=${this.libraries.join(",")}`;
        if (this.language) url += `&language=${this.language}`;
        if (this.region) url += `&region=${this.region}`;
        if (this.version) url += `&v=${this.version}`;
        if (this.mapIds) url += `&map_ids=${this.mapIds.join(",")}`;
        if (this.authReferrerPolicy) url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) script.remove();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     * @deprecated, use importLibrary() instead.
     */ load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     * @deprecated, use importLibrary() instead.
     */ loadPromise() {
        return new Promise((resolve, reject)=>{
            this.loadCallback((err)=>{
                if (!err) resolve(window.google);
                else reject(err.error);
            });
        });
    }
    importLibrary(name) {
        this.execute();
        return google.maps.importLibrary(name);
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     * @deprecated, use importLibrary() instead.
     */ loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */ setScript() {
        var _a, _b;
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const params = {
            key: this.apiKey,
            channel: this.channel,
            client: this.client,
            libraries: this.libraries,
            v: this.version,
            mapIds: this.mapIds,
            language: this.language,
            region: this.region,
            authReferrerPolicy: this.authReferrerPolicy
        };
        // keep the URL minimal:
        Object.keys(params).forEach(// eslint-disable-next-line @typescript-eslint/no-explicit-any
        (key)=>!params[key] && delete params[key]);
        if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) // tweaked copy of https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
        // which also sets the url, the id, and the nonce
        /* eslint-disable */ ((g)=>{
            // @ts-ignore
            let h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
            // @ts-ignore
            b = b[c] || (b[c] = {});
            // @ts-ignore
            const d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = ()=>// @ts-ignore
                h || (h = new Promise((f, n)=>$1f59b796f8d974c5$var$__awaiter(this, void 0, void 0, function*() {
                        var _a;
                        yield a = m.createElement("script");
                        a.id = this.id;
                        e.set("libraries", [
                            ...r
                        ] + "");
                        // @ts-ignore
                        for(k in g)e.set(k.replace(/[A-Z]/g, (t)=>"_" + t[0].toLowerCase()), g[k]);
                        e.set("callback", c + ".maps." + q);
                        a.src = this.url + `?` + e;
                        d[q] = f;
                        a.onerror = ()=>h = n(Error(p + " could not load."));
                        // @ts-ignore
                        a.nonce = this.nonce || ((_a = m.querySelector("script[nonce]")) === null || _a === void 0 ? void 0 : _a.nonce) || "";
                        m.head.append(a);
                    })));
            // @ts-ignore
            d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n)=>r.add(f) && u().then(()=>d[l](f, ...n));
        })(params);
        this.importLibrary("core").then(()=>this.callback(), (error)=>{
            const event = new ErrorEvent("error", {
                error: error
            }); // for backwards compat
            this.loadErrorCallback(event);
        });
    }
    /**
     * Reset the loader state.
     */ reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) this.reset();
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(()=>{
                this.deleteScript();
                this.setScript();
            }, delay);
        } else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb)=>{
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) this.callback();
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setScript();
            }
        }
    }
}


class $5083483fb1ab9858$export$bdd7c550c60f19cc extends (0, $3e2183be5df4d9a4$export$a09c19a7c4419c1) {
    constructor(apiKey, map, apiUrl, markerFolderPath, settings){
        const loader = new (0, $1f59b796f8d974c5$export$3b0d6d7590275603)({
            apiKey: apiKey,
            version: "monthly",
            libraries: [
                "marker",
                "drawing"
            ]
        });
        loader.load().then((google)=>{
            this.google = google;
        }).catch((e)=>{
        // do something
        });
        super(map, apiUrl, markerFolderPath, settings);
        this.currentZoom = this.getZoom();
    }
    removeArea() {
        this.map.data.forEach((feature)=>{
            this.map.data.remove(feature);
        });
    }
    addArea(geojson) {
        this.map.data.addGeoJson(geojson);
    }
    createClusterLayers() {
        this.map.data.setStyle((feature)=>{
            if (feature.getProperty("clustertype") == "cell") {
                const roundedCount = this.roundMarkerCount(feature.getProperty("count"));
                const fillColor = this.gridStrokeColors[roundedCount];
                const strokeColor = this.gridStrokeColors[roundedCount];
                const strokeWeight = 1;
                const style = {
                    "fillColor": fillColor,
                    //"fillOpacity": .5,
                    "strokeWeight": strokeWeight,
                    "strokeColor": strokeColor
                };
                return style;
            }
        });
        this.map.data.addListener("click", (event)=>{
            const feature = event.feature;
            if (feature.clustertype == "cell" || feature.clustertype == "marker") {
                let zoom = this.getZoom();
                if (zoom >= this.maxZoom || feature.count == 1) this.onMarkerFinalClick(feature);
                else this.markerClickFunction(feature.x, feature.y);
            }
        });
    }
    createAreaLayer() {}
    getMarkerIcon(cluster) {
        // get the correct icon
        const piniconObj = this.selectPinIcon(cluster);
        const iconSize = new this.google.maps.Size(piniconObj.size[0], piniconObj.size[1]);
        const anchor = new this.google.maps.Point(piniconObj.anchor[0], piniconObj.anchor[1]);
        const markerIcon = {
            "url": piniconObj.url,
            "size": iconSize,
            "anchor": anchor
        };
        return markerIcon;
    }
    _getSingleMarker(cluster) {
        const markerIcon = this.getMarkerIcon(cluster);
        const markerOptions = {
            "map": this.map,
            "position": {
                "lat": cluster.center.y,
                "lng": cluster.center.x
            },
            "icon": markerIcon
        };
        if (this.iconType === (0, $aca83a355307fe8a$export$13ff1290a9e22e77).exact && cluster.count > 1) markerOptions.label = {
            text: cluster.count.toString(),
            color: "#FFF",
            fontWeight: "bold"
        };
        const marker = new this.google.maps.Marker(markerOptions);
        return marker;
    }
    _drawSingleMarker(marker) {
        this.addMarkerClickListener(marker);
        this.markerList.push(marker);
    }
    drawKmeansMarker(cluster) {
        let marker = this._getSingleMarker(cluster);
        marker = this.setMarkerProps(marker, cluster);
        this._drawSingleMarker(marker);
    }
    drawGridMakrer(cluster) {
        let marker = this._getSingleMarker(cluster);
        marker = this.setCellProps(marker, cluster);
        this._drawSingleMarker(marker);
    }
    drawCell(cluster) {
        const count = cluster.count;
        if (count == 1) this.drawGridMarker(cluster);
        else {
            const geojson = {
                "type": "Feature",
                "geometry": cluster.geojson,
                "properties": {
                    "clustertype": "cell",
                    "x": cluster.center.x,
                    "y": cluster.center.y,
                    "count": count,
                    "geojson": cluster.geojson
                }
            };
            const cell = this.map.data.addGeoJson(geojson)[0];
            cell.x = cluster.center.x;
            cell.y = cluster.center.y;
            cell.count = count;
            cell.geojson = geojson;
            cell.clustertype = "cell";
        }
    }
    removeAllMarkers() {
        for(let i = 0; i < this.markerList.length; i++)this.markerList[i].setMap(null);
        this.map.data.forEach((feature)=>{
            if (feature.clustertype == "cell") this.map.data.remove(feature);
        });
        this.markerList.length = 0;
    }
    addMapEventListeners() {
        this.map.addListener("tilesloaded", ()=>this.getClusters());
        this.map.addListener("zoom_changed", ()=>{
            this.removeAllMarkers();
            this.getClusters();
        });
    }
    getViewport() {
        const latLngBounds = this.map.getBounds();
        const northEast = latLngBounds.getNorthEast();
        const southWest = latLngBounds.getSouthWest();
        const viewport = {
            "left": southWest.lng(),
            "right": northEast.lng(),
            "top": northEast.lat(),
            "bottom": southWest.lat()
        };
        return viewport;
    }
    getZoom() {
        return this.map.getZoom();
    }
    setZoom(zoom) {
        this.map.setZoom(zoom);
    }
    setMap(x, y, zoom) {
        const mapOptions = {
            "center": {
                lat: y,
                lng: x
            },
            "zoom": zoom
        };
        this.map.setOptions(mapOptions);
    }
    addMarkerClickListener(marker) {
        const zoom = this.getZoom();
        if (zoom >= 13 || marker.count == 1) marker.addListener("click", (event)=>{
            this.onMarkerFinalClick(marker);
        });
        else marker.addListener("click", (event)=>{
            this.markerClickFunction(marker.x, marker.y);
        });
    }
}




export {$aca83a355307fe8a$export$ae91e066970d978a as ClusterMethod, $5083483fb1ab9858$export$bdd7c550c60f19cc as AnyclusterGoogle};
//# sourceMappingURL=anycluster-google.js.map
