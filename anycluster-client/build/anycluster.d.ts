import { SRIDS, MaxBounds, GeometryType, Operators, LogicalOperators } from "./consts";
import { GeoJSON, Viewport } from "./geometry";
export declare const Bounds4326: MaxBounds;
export declare const Bounds3857: MaxBounds;
export interface Filter {
    column: string;
    value: string | number | boolean;
    operator: Operators;
    logicalOperator?: LogicalOperators;
}
export interface NestedFilter {
    filters: Filter[];
    logicalOperator?: LogicalOperators;
}
export type FilterOrNestedFilter = Filter | NestedFilter;
export interface ClusterRequestData {
    output_srid: SRIDS;
    geometry_type: GeometryType;
    geojson: GeoJSON;
    clear_cache: boolean;
    filters: FilterOrNestedFilter[];
}
export type FilterList = Filter[];
export type FilterOrNestedFilterList = FilterOrNestedFilter[];
export interface GetKmeansClusterContentRequestData {
    geometry_type: GeometryType;
    input_srid: SRIDS;
    x: number;
    y: number;
    ids: number[];
}
export interface Modulations {
    [name: string]: FilterOrNestedFilter | FilterOrNestedFilterList;
}
export interface MapContentCountRequestData extends ClusterRequestData {
    modulations?: Modulations;
}
export interface AreaContentRequestData extends ClusterRequestData {
    limit?: number;
    offset?: number;
    order_by?: string;
}
export interface GroupedMapContentRequestData extends ClusterRequestData {
    group_by: string;
}
export declare class Anycluster {
    private apiUrl;
    gridSize: number;
    srid: SRIDS;
    maxBounds: MaxBounds;
    constructor(apiUrl: string, gridSize: number, srid: SRIDS);
    getGridCluster(zoom: number, data: ClusterRequestData): Promise<any>;
    getKmeansCluster(zoom: number, data: ClusterRequestData): Promise<any>;
    getKmeansClusterContent(zoom: number, data: GetKmeansClusterContentRequestData): Promise<any>;
    getDatasetContent(zoom: number, datasetId: number): Promise<any>;
    getMapContentCount(zoom: number, data: MapContentCountRequestData): Promise<any>;
    getGroupedMapContents(zoom: number, data: GroupedMapContentRequestData): Promise<any>;
    getAreaContent(zoom: number, data: AreaContentRequestData): Promise<any>;
    viewportToGeoJSON(viewport: Viewport): {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][];
            crs: {
                type: string;
                properties: {
                    name: SRIDS;
                };
            };
        };
    };
    post(url: string, postData: object): Promise<any>;
    get(url: string): Promise<any>;
}
