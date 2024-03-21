import type { Geometry } from "./geometry";

export type KmeansCluster = {
    ids: number[],
    count: number,
    center: {
        x: number,
        y: number
    },
    pinimg: string,
}

export type KmeansClusterResponse = KmeansCluster[];


export type GridCluster =  {
    id: number,
    center : {
        x: number,
        y: number,
    },
    count: number,
    geojson: Geometry,
    pinimg: null | string,
}