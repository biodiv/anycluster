export class Point {

    x: Number
    y: Number

    constructor (x: Number, y: Number){
        this.x = x;
        this.y = y;
    }
}


export interface Viewport {
    left: number
    top: number
    right: number
    bottom: number
}

export type Coordinates = number[][];

export interface Geometry {
    type: string
    coordinates: Coordinates[]
}


export interface CRSProperties {
    name: string
}

export interface CRS {
    type: string
    properties: CRSProperties
}

export interface GeoJSON {
    type: string
    geometry: Geometry
    crs: CRS
}

export interface Marker {
    id: number
    x: number
    y: number
    count: number
    ids?: number[]
    pinimg?: string
    geojson?: Geometry
}