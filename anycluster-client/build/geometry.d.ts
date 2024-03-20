export declare class Point {
    x: Number;
    y: Number;
    constructor(x: Number, y: Number);
}
export interface Viewport {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export type Coordinates = number[][];
export interface Geometry {
    type: string;
    coordinates: Coordinates[];
}
export interface CRSProperties {
    name: string;
}
export interface CRS {
    type: string;
    properties: CRSProperties;
}
export interface GeoJSON {
    type: string;
    geometry: Geometry;
    crs: CRS;
}
export interface Marker {
    id: number;
    x: number;
    y: number;
    count: number;
    ids?: number[];
    pinimg?: string;
    geojson?: Geometry;
}
/**
 * A Cluster as returned from anycluster api, kmeans or grid
 */
export interface Cluster {
    id: number;
    center: {
        x: number;
        y: number;
    };
    count: number;
    ids?: number[];
    geojson?: Geometry;
    pinimg?: string;
}
