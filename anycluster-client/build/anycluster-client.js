"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyclusterClient = void 0;
const consts_1 = require("./consts");
const anycluster_1 = require("./anycluster");
const defaultGridFillColors = {
    5: "rgba(255, 192, 203, .5)",
    10: "rgba(240, 128, 128, .5)",
    50: "rgba(255, 127, 80, .5)",
    100: "rgba(255, 165, 0, .5)",
    1000: "rgba(255, 69, 0, .5)",
    10000: "rgba(255, 0 , 0, .5)",
};
const defaultGridStrokeColors = {
    5: "pink",
    10: "lightcoral",
    50: "coral",
    100: "orange",
    1000: "orangered",
    10000: "red",
};
class AnyclusterClient {
    constructor(map, apiUrl, markerFolderPath, settings) {
        this.map = map;
        this.apiUrl = apiUrl;
        this.markerFolderPath = markerFolderPath;
        this.filters = [];
        this.latestClusterRequestTimestamp = null;
        this.map = map;
        this.apiUrl = apiUrl;
        this.markerFolderPath = markerFolderPath;
        settings = settings || {};
        // settings
        this.srid = settings.srid ? settings.srid : consts_1.SRIDS.EPSG4326;
        this.kmeansGridSize = settings.gridGridSize ? settings.gridGridSize : consts_1.DefaultGridSizes.kmeans;
        this.gridGridSize = settings.gridGridSize ? settings.gridGridSize : consts_1.DefaultGridSizes.grid;
        this.clusterMethod = settings.clusterMethod ? settings.clusterMethod : consts_1.ClusterMethod.kmeans;
        this.geometryType = settings.geometryType ? settings.geometryType : consts_1.GeometryType.viewport;
        this.area = settings.area ? settings.area : null;
        this.iconType = settings.iconType ? settings.iconType : consts_1.IconType.rounded;
        this.singlePinImages = settings.singlePinImages ? settings.singlePinImages : {};
        this.getSinglePinImageURL = settings.getSinglePinImageURL ? settings.getSinglePinImageURL : this._getSinglePinImageURL;
        this.markerImageSizes = settings.markerImageSizes ? settings.markerImageSizes : consts_1.DefaultMarkerImageSizes;
        this.gridFillColors = settings.gridFillColors ? settings.gridFillColors : defaultGridFillColors;
        this.gridStrokeColors = settings.gridStrokeColors ? settings.gridStrokeColors : defaultGridStrokeColors;
        this.maxZoom = settings.maxZoom ? settings.maxZoom : consts_1.DefaultMaxZoom;
        // hooks
        this.onGotClusters = settings.onGotClusters ? settings.onGotClusters : this._onGotClusters;
        this.onFinalClick = settings.onFinalClick ? settings.onFinalClick : this._onFinalClick;
        if (this.area) {
            this.setArea(this.area);
        }
        const gridSize = this.getGridSize();
        this.anycluster = new anycluster_1.Anycluster(this.apiUrl, gridSize, this.srid);
        this.createClusterLayers();
        this.markerList = [];
        const startClustering = settings.startClustering === false ? settings.startClustering : true;
        if (startClustering === true) {
            this.startClustering();
        }
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
    drawMarker(cluster) {
        throw new Error("NotImplementedError: drawMarker");
    }
    drawCell(cluster) {
        throw new Error("NotImplementedError: drawCell");
    }
    getGridSize() {
        if (this.clusterMethod == consts_1.ClusterMethod.grid) {
            return this.gridGridSize;
        }
        return this.kmeansGridSize;
    }
    setClusterMethod(clusterMethod) {
        if (clusterMethod == consts_1.ClusterMethod.grid) {
            this.area = null;
            this.geometryType = consts_1.GeometryType.viewport;
            this.removeArea();
        }
        this.removeAllMarkers();
        this.clusterMethod = clusterMethod;
        const gridSize = this.getGridSize();
        this.anycluster = new anycluster_1.Anycluster(this.apiUrl, gridSize, this.srid);
        this.markerList = [];
        this.getClusters(true);
    }
    setArea(geojson) {
        this.area = geojson;
        this.removeArea();
        if (geojson == null) {
            this.geometryType = consts_1.GeometryType.viewport;
            this.setClusterMethod(consts_1.ClusterMethod.kmeans);
        }
        else {
            this.addArea(geojson);
            this.geometryType = consts_1.GeometryType.area;
            this.setClusterMethod(consts_1.ClusterMethod.kmeans);
        }
    }
    _getSinglePinImageURL(cluster) {
        const pinimg = cluster.pinimg;
        let url = `${this.markerFolderPath}pin_unknown.png`;
        if (this.singlePinImages && pinimg && pinimg in this.singlePinImages) {
            url = this.singlePinImages[pinimg];
        }
        return url;
    }
    selectPinIcon(cluster) {
        const count = cluster.count;
        let markerImageUrl = this.getSinglePinImageURL(cluster);
        let pinicon = "1";
        if (count > 10000) {
            pinicon = "10000";
        }
        else if (count > 1000) {
            pinicon = "1000";
        }
        else if (count > 100) {
            pinicon = "100";
        }
        else if (count > 50) {
            pinicon = "50";
        }
        else if (count > 10) {
            pinicon = "10";
        }
        else if (count > 1) {
            pinicon = "5";
        }
        if (count > 1) {
            if (this.iconType == consts_1.IconType.exact) {
                markerImageUrl = `${this.markerFolderPath}${pinicon}_empty.png`;
            }
            else {
                markerImageUrl = `${this.markerFolderPath}${pinicon}.png`;
            }
        }
        const size = this.markerImageSizes[pinicon];
        let anchor = [Math.round(size[0] / 2), size[1] - 1];
        let relativeAnchor = [0.5, 1];
        if (count > 1) {
            anchor = [Math.round((size[0] / 2)), Math.round(size[1] / 2)];
            relativeAnchor = [0.5, 0.5];
        }
        const imgObj = {
            url: markerImageUrl,
            size: size,
            anchor: anchor,
            relativeAnchor: relativeAnchor,
            popupAnchor: [0, -Math.round(size[1]) + 8]
        };
        return imgObj;
    }
    // marker can be an openlayers Feature or a L.marker
    setMarkerProps(marker, cluster) {
        // add properties required by anycluster
        marker.x = cluster.center.x;
        marker.y = cluster.center.y;
        marker.count = cluster.count;
        if (cluster.hasOwnProperty("ids")) {
            marker.ids = cluster.ids;
        }
        if (cluster.hasOwnProperty("id")) {
            marker.id = cluster.id;
        }
        if (cluster.hasOwnProperty("geojson")) {
            /*const geojson = {
                "type": "Feature",
                "count": cluster.count,
                "geometry": cluster.geojson,
                "properties": {
                    "count": cluster.count
                },
                "crs" : {
                    "type" : "name",
                    "properties" : {
                        "name" : this.srid
                    }
                }
            };*/
            marker.geojson = cluster.geojson;
        }
        return marker;
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
        const ids = marker.ids;
        if (this.clusterMethod == consts_1.ClusterMethod.kmeans) {
            const postData = {
                "geometry_type": this.geometryType,
                "input_srid": this.srid,
                "x": x,
                "y": y,
                "ids": ids,
                "filters": this.filters
            };
            const data = await this.anycluster.getKmeansClusterContent(zoom, postData);
            this.onFinalClick(marker, data);
        }
        else if (this.clusterMethod = consts_1.ClusterMethod.grid) {
            if (marker.count == 1) {
                const data = await this.anycluster.getDatasetContent(zoom, marker.id);
                this.onFinalClick(marker, data);
            }
            else {
                const geojson = marker["geojson"];
                const zoom = this.getZoom();
                const data = await this.anycluster.getAreaContent(zoom, geojson);
                this.onFinalClick(marker, data);
            }
        }
    }
    roundMarkerCount(count) {
        if (count == 1) {
            count = 1;
        }
        else if (count <= 5) {
            count = 5;
        }
        else if (count <= 10) {
            count = 10;
        }
        else if (count <= 50) {
            count = 50;
        }
        else if (count <= 100) {
            count = 100;
        }
        else if (count <= 1000) {
            count = 1000;
        }
        else {
            count = 10000;
        }
        return count;
    }
    getClusterGeometry() {
        let geoJSON;
        if (this.geometryType == consts_1.GeometryType.viewport) {
            const viewport = this.getViewport();
            geoJSON = this.anycluster.viewportToGeoJSON(viewport);
        }
        else if (this.geometryType == consts_1.GeometryType.area && this.area) {
            geoJSON = this.area;
        }
        else {
            throw new Error('No cluster geometry found');
        }
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
        const requestTimestamp = new Date().getTime();
        this.latestClusterRequestTimestamp = requestTimestamp;
        console.log(`Timestamp: ${requestTimestamp}`);
        if (this.clusterMethod == consts_1.ClusterMethod.kmeans) {
            const clusters = await this.anycluster.getKmeansCluster(zoom, postData);
            if (clusters.length > 0 && requestTimestamp === this.latestClusterRequestTimestamp) {
                clusters.forEach(cluster => {
                    this.drawMarker(cluster);
                });
            }
        }
        else if (this.clusterMethod == consts_1.ClusterMethod.grid) {
            const clusters = await this.anycluster.getGridCluster(zoom, postData);
            if (clusters.length > 0 && requestTimestamp === this.latestClusterRequestTimestamp) {
                clusters.forEach(cluster => {
                    this.drawCell(cluster);
                });
            }
        }
        else {
            throw new Error(`Invalid clusterMethod: ${this.clusterMethod}`);
        }
        this.onGotClusters();
    }
    startClustering() {
        this.getClusters(true);
        this.addMapEventListeners();
    }
    filtersAreEqual(filter1, filter2) {
        if ('column' in filter1 && 'column' in filter2) {
            if (filter1.column == filter2.column && filter1.value == filter2.value && filter1.operator == filter2.operator) {
                return true;
            }
        }
        // testing with json.stringify is not ideal because {"a":1,"b":2} === {"b":2,"a":1} returns false
        else if (JSON.stringify(filter1) === JSON.stringify(filter2)) {
            return true;
        }
        return false;
    }
    // filtering
    filter(filter, reloadMarkers) {
        if (Array.isArray(filter)) {
            this.filters = filter;
        }
        else {
            this.filters = [filter];
        }
        this.postFilterChange(reloadMarkers);
    }
    addFilter(filter, reloadMarkers) {
        let filterExists = false;
        for (let f = 0; f < this.filters.length; f++) {
            let existingFilter = this.filters[f];
            if (this.filtersAreEqual(filter, existingFilter)) {
                filterExists = true;
                break;
            }
        }
        if (!filterExists) {
            this.filters.push(filter);
        }
        this.postFilterChange(reloadMarkers);
    }
    addFilters(filtersToAdd, reloadMarkers) {
        for (let fa = 0; fa < filtersToAdd.length; fa++) {
            let filter = filtersToAdd[fa];
            this.addFilter(filter, false);
        }
        this.postFilterChange(reloadMarkers);
    }
    removeFilter(filter, reloadMarkers) {
        for (let f = 0; f < this.filters.length; f++) {
            let existingFilter = this.filters[f];
            if (this.filtersAreEqual(filter, existingFilter)) {
                this.filters.splice(f, 1);
                break;
            }
        }
        this.postFilterChange(reloadMarkers);
    }
    removeFilters(filtersToRemove, reloadMarkers) {
        for (let fr = 0; fr < filtersToRemove.length; fr++) {
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
        if (reloadMarkers != false) {
            reloadMarkers = true;
        }
        if (reloadMarkers == true) {
            this.removeAllMarkers();
            this.getClusters(true);
        }
    }
    /**
     * method for getting the unaggregated, paginated content of the map
     */
    async getMapContents(limit, offset, orderBy) {
        const geoJSON = this.getClusterGeometry();
        const zoom = this.getZoom();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": consts_1.GeometryType.area,
            "geojson": geoJSON,
            "clear_cache": false,
            "filters": this.filters,
            "limit": limit,
            "offset": offset,
            "order_by": orderBy,
        };
        const data = this.anycluster.getAreaContent(zoom, postData);
        return data;
    }
    /**
     * methods for getting counts of objects on the current map / geometry
     */
    async getMapContentCount(modulations) {
        const geoJSON = this.getClusterGeometry();
        const postData = {
            "output_srid": this.srid,
            "geometry_type": this.geometryType,
            "geojson": geoJSON,
            "clear_cache": true,
            "filters": this.filters,
            "modulations": modulations,
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
            "modulations": modulations,
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
            "group_by": groupBy,
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
            "group_by": groupBy,
        };
        const zoom = this.getZoom();
        const data = await this.anycluster.getGroupedMapContents(zoom, postData);
        return data;
    }
    // hooks
    _onFinalClick(marker, data) {
        alert(JSON.stringify(data));
    }
    _onGotClusters() { }
}
exports.AnyclusterClient = AnyclusterClient;
