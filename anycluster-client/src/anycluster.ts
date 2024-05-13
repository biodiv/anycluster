import { SRIDS, MaxBounds, ClusterMethod, GeometryType, Operators, LogicalOperators } from "./consts";
import { Point, GeoJSON, Coordinates, Viewport } from "./geometry";
import type { KmeansClusterResponse } from "./types";

export const Bounds4326: MaxBounds = Object.freeze({
    minX: -179,
    maxX: 179,
    minY: -89,
    maxY: 89
});


export const Bounds3857: MaxBounds = Object.freeze({
    minX: -20037500, //-20037508.34
    maxX: 20037500, // 20037508.34
    minY: -20048960, // -20048966.1
    maxY: 20048960 //  20048966.1
});

export interface Filter {
    column: string
    value: string | number | boolean
    operator: Operators
    logicalOperator?: LogicalOperators
}

export interface NestedFilter {
    filters : Filter[]
    logicalOperator?: LogicalOperators
}

export type FilterOrNestedFilter = Filter | NestedFilter;

export interface ClusterRequestData {
    output_srid: SRIDS
    geometry_type: GeometryType
    geojson: GeoJSON
    clear_cache: boolean
    filters: FilterOrNestedFilter[]
}

export type FilterList = Filter[];

export type FilterOrNestedFilterList = FilterOrNestedFilter[];

export interface GetKmeansClusterContentRequestData {
    geometry_type: GeometryType
    geojson?: GeoJSON
    input_srid: SRIDS
    x: number
    y: number
    ids: number[]
}

export interface Modulations {
    [name:string] : FilterOrNestedFilter | FilterOrNestedFilterList
}

export interface MapContentCountRequestData extends ClusterRequestData {
    modulations?: Modulations
}

export interface AreaContentRequestData extends ClusterRequestData {
    limit?: number
    offset?: number
    order_by?: string
}

export interface GroupedMapContentRequestData extends ClusterRequestData {
    group_by: string
}

export class Anycluster {

    maxBounds: MaxBounds

    constructor(private apiUrl: string, public gridSize: number, public srid: SRIDS) {

        if (this.srid == SRIDS.EPSG4326) {
            this.maxBounds = Bounds4326;
        }
        else if (this.srid == SRIDS.EPSG3857) {
            this.maxBounds = Bounds3857;
        }
        else {
            throw new Error(`invalid srid given: ${this.srid} `);
        }

    }

    validateZoom(zoom: number) {
        if (!Number.isInteger(zoom)) {
            throw new Error(`[anycluster] non-integer zoom: ${zoom}`);
        }
    }

    async getGridCluster(zoom: number, data: ClusterRequestData) {

        this.validateZoom(zoom);

        const url = `${this.apiUrl}grid/${zoom}/${this.gridSize}/`;
        const clusters = await this.post(url, data);
        return clusters;
    }

    async getKmeansCluster(zoom: number, data: ClusterRequestData): Promise<KmeansClusterResponse> {

        this.validateZoom(zoom);

        const url = `${this.apiUrl}kmeans/${zoom}/${this.gridSize}/`;
        const clusters = await this.post(url, data);
        return clusters;
    }

    async getKmeansClusterContent(zoom: number, data: GetKmeansClusterContentRequestData) {

        this.validateZoom(zoom);

        const url = `${this.apiUrl}get-kmeans-cluster-content/${zoom}/${this.gridSize}/`;

        const clusterContent = await this.post(url, data);

        return clusterContent;
    }

    async getDatasetContent(zoom: number, datasetId: number) {

        this.validateZoom(zoom);

        const url = `${this.apiUrl}get-dataset-content/${zoom}/${this.gridSize}/${datasetId}/`;

        const clusterContent = await this.get(url);

        return clusterContent;
    }

    async getMapContentCount(zoom: number, data: MapContentCountRequestData) {

        this.validateZoom(zoom);

        const url = `${this.apiUrl}get-map-content-count/${zoom}/${this.gridSize}/`;

        const mapContentCount = await this.post(url, data)

        return mapContentCount;
    }

    async getGroupedMapContents(zoom: number, data: GroupedMapContentRequestData) {

        this.validateZoom(zoom);

        const url = `${this.apiUrl}get-grouped-map-contents/${zoom}/${this.gridSize}/`;

        const groupedMapContents = await this.post(url, data);

        return groupedMapContents;

    }

    async getAreaContent(zoom:number, data: AreaContentRequestData) {

        this.validateZoom(zoom);

        const url = `${this.apiUrl}get-area-content/${zoom}/${this.gridSize}/`;

        const areaContent = await this.post(url, data);

        return areaContent;
    }

    viewportToGeoJSON(viewport: Viewport) {

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

    async post(url: string, postData: object) {

        const encodedUrl = encodeURI(url);

        const options = {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors' as 'cors',
            credentials: 'include' as 'include'
        }

        const response = await fetch(encodedUrl, options);
        const responseData = await response.json();

        if (response.ok) {
            return responseData
        }
        else {
            throw new Error(JSON.stringify(responseData));
        }

    }

    async get(url: string) {
        const encodedUrl = encodeURI(url);

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors' as 'cors',
            credentials: 'include' as 'include'
        }

        const response = await fetch(encodedUrl, options);
        const responseData = await response.json();

        if (response.ok) {
            return responseData
        }
        else {
            throw new Error(JSON.stringify(responseData));
        }
    }
}