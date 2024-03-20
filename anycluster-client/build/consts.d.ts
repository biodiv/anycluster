export interface MaxBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}
export declare enum SRIDS {
    EPSG4326 = "EPSG:4326",
    EPSG3857 = "EPSG:3857"
}
export declare enum ClusterMethod {
    kmeans = "kmeans",
    grid = "grid"
}
export declare enum GeometryType {
    viewport = "viewport",
    area = "area"
}
export declare enum IconType {
    exact = "exact",
    rounded = "rounded"
}
export declare enum DefaultGridSizes {
    grid = 64,
    kmeans = 150
}
export declare const DefaultMarkerImageSizes: {
    1: number[];
    5: number[];
    10: number[];
    50: number[];
    100: number[];
    1000: number[];
    10000: number[];
};
export declare enum Operators {
    in = "in",
    notIn = "not in",
    equals = "=",
    unEquals = "!=",
    largerThan = ">=",
    smallerThan = "<=",
    startswith = "startswith",
    contains = "contains"
}
export declare enum LogicalOperators {
    AND = "AND",
    OR = "OR"
}
export declare const DefaultMaxZoom = 13;
