"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anycluster = exports.Bounds3857 = exports.Bounds4326 = void 0;
const consts_1 = require("./consts");
exports.Bounds4326 = Object.freeze({
    minX: -179,
    maxX: 179,
    minY: -89,
    maxY: 89
});
exports.Bounds3857 = Object.freeze({
    minX: -20037500,
    maxX: 20037500,
    minY: -20048960,
    maxY: 20048960 //  20048966.1
});
class Anycluster {
    constructor(apiUrl, gridSize, srid) {
        this.apiUrl = apiUrl;
        this.gridSize = gridSize;
        this.srid = srid;
        if (this.srid == consts_1.SRIDS.EPSG4326) {
            this.maxBounds = exports.Bounds4326;
        }
        else if (this.srid == consts_1.SRIDS.EPSG3857) {
            this.maxBounds = exports.Bounds3857;
        }
        else {
            throw new Error(`invalid srid given: ${this.srid} `);
        }
    }
    async getGridCluster(zoom, data) {
        const url = `${this.apiUrl}grid/${zoom}/${this.gridSize}/`;
        const clusters = await this.post(url, data);
        return clusters;
    }
    async getKmeansCluster(zoom, data) {
        const url = `${this.apiUrl}kmeans/${zoom}/${this.gridSize}/`;
        const clusters = await this.post(url, data);
        return clusters;
    }
    async getKmeansClusterContent(zoom, data) {
        const url = `${this.apiUrl}get-kmeans-cluster-content/${zoom}/${this.gridSize}/`;
        const clusterContent = await this.post(url, data);
        return clusterContent;
    }
    async getDatasetContent(zoom, datasetId) {
        const url = `${this.apiUrl}get-dataset-content/${zoom}/${this.gridSize}/${datasetId}/`;
        const clusterContent = await this.get(url);
        return clusterContent;
    }
    async getMapContentCount(zoom, data) {
        const url = `${this.apiUrl}get-map-content-count/${zoom}/${this.gridSize}/`;
        const mapContentCount = await this.post(url, data);
        return mapContentCount;
    }
    async getGroupedMapContents(zoom, data) {
        const url = `${this.apiUrl}get-grouped-map-contents/${zoom}/${this.gridSize}/`;
        const groupedMapContents = await this.post(url, data);
        return groupedMapContents;
    }
    async getAreaContent(zoom, data) {
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
        const coordinates = [[
                [left, top],
                [right, top],
                [right, bottom],
                [left, bottom],
                [left, top]
            ]];
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
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        };
        const response = await fetch(encodedUrl, options);
        const responseData = await response.json();
        if (response.ok) {
            return responseData;
        }
        else {
            throw new Error(JSON.stringify(responseData));
        }
    }
    async get(url) {
        const encodedUrl = encodeURI(url);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'include'
        };
        const response = await fetch(encodedUrl, options);
        const responseData = await response.json();
        if (response.ok) {
            return responseData;
        }
        else {
            throw new Error(JSON.stringify(responseData));
        }
    }
}
exports.Anycluster = Anycluster;
