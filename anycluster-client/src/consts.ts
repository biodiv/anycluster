
export interface MaxBounds {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
}

export enum SRIDS {
    EPSG4326 = 'EPSG:4326',
    EPSG3857 = 'EPSG:3857'
}

export enum ClusterMethod {
    kmeans = 'kmeans',
    grid = 'grid'
}


export enum GeometryType {
    viewport = 'viewport',
    area = 'area'
}

export enum IconType {
    exact = 'exact',
    rounded = 'rounded'
}

export enum DefaultGridSizes {
    grid = 64,
    kmeans = 150
}

export const DefaultMarkerImageSizes = {
    1: [24, 39],
    5: [30, 30],
    10: [30, 30],
    50: [40, 40],
    100: [40, 40],
    1000: [50, 50],
    10000: [60, 60]
}

export enum Operators {
    in = 'in',
    notIn = 'not in',
    equals = '=',
    unEquals = '!=',
    largerThan = '>=',
    smallerThan = '<=',
    startswith = 'startswith',
    contains = 'contains',
}

export enum LogicalOperators {
    AND = 'AND',
    OR = 'OR',
}

export const DefaultMaxZoom = 13;