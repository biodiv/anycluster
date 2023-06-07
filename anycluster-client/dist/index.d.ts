interface MaxBounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}
export enum SRIDS {
    EPSG4326 = "EPSG:4326",
    EPSG3857 = "EPSG:3857"
}
export enum ClusterMethod {
    kmeans = "kmeans",
    grid = "grid"
}
export enum GeometryType {
    viewport = "viewport",
    area = "area"
}
export enum IconType {
    exact = "exact",
    rounded = "rounded"
}
export enum Operators {
    in = "in",
    notIn = "not in",
    equals = "=",
    unEquals = "!=",
    largerThan = ">=",
    smallerThan = "<=",
    startswith = "startswith",
    contains = "contains"
}
export enum LogicalOperators {
    AND = "AND",
    OR = "OR"
}
interface Viewport {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
type Coordinates = number[][];
interface Geometry {
    type: string;
    coordinates: Coordinates[];
}
interface CRSProperties {
    name: string;
}
interface CRS {
    type: string;
    properties: CRSProperties;
}
interface GeoJSON {
    type: string;
    geometry: Geometry;
    crs: CRS;
}
interface Marker {
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
interface Cluster {
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
interface Filter {
    column: string;
    value: string | number | boolean;
    operator: Operators;
    logicalOperator?: LogicalOperators;
}
interface NestedFilter {
    filters: Filter[];
    logicalOperator?: LogicalOperators;
}
type FilterOrNestedFilter = Filter | NestedFilter;
interface ClusterRequestData {
    output_srid: SRIDS;
    geometry_type: GeometryType;
    geojson: GeoJSON;
    clear_cache: boolean;
    filters: FilterOrNestedFilter[];
}
type FilterList = Filter[];
type FilterOrNestedFilterList = FilterOrNestedFilter[];
interface GetKmeansClusterContentRequestData {
    geometry_type: GeometryType;
    input_srid: SRIDS;
    x: number;
    y: number;
    ids: number[];
}
interface Modulations {
    [name: string]: Filter | NestedFilter;
}
interface MapContentCountRequestData extends ClusterRequestData {
    modulations?: Modulations;
}
interface AreaContentRequestData extends ClusterRequestData {
    limit?: number;
    offset?: number;
}
interface GroupedMapContentRequestData extends ClusterRequestData {
    group_by: string;
}
export class Anycluster {
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
interface AnyclusterClientSettings {
    srid?: SRIDS;
    kmeansGridSize?: number;
    gridGridSize?: number;
    clusterMethod?: ClusterMethod;
    geometryType?: GeometryType;
    area?: any;
    iconType?: IconType;
    onFinalClick?: Function;
    singlePinImages?: Record<string, string>;
    markerImageSizes?: Record<string, number[]>;
    gridFillColors?: Record<number, string>;
    gridStrokeColors?: Record<number, string>;
    onGotClusters?: () => void;
}
export class AnyclusterClient {
    map: any;
    apiUrl: string;
    markerFolderPath: string;
    srid: SRIDS;
    kmeansGridSize: number;
    gridGridSize: number;
    clusterMethod: ClusterMethod;
    geometryType: GeometryType;
    area: GeoJSON | null;
    iconType: IconType;
    anycluster: Anycluster;
    markerList: any[];
    onFinalClick: Function;
    onGotClusters: Function;
    singlePinImages?: Record<string, string>;
    markerImageSizes: Record<string, number[]>;
    gridFillColors: Record<number, string>;
    gridStrokeColors: Record<number, string>;
    filters: FilterOrNestedFilterList;
    constructor(map: any, apiUrl: string, markerFolderPath: string, settings: AnyclusterClientSettings);
    createClusterLayers(): void;
    addArea(geojson: object): void;
    removeArea(): void;
    removeAllMarkers(): void;
    getZoom(): number;
    setMap(x: number, y: number, zoom: number): void;
    getViewport(): Viewport;
    addMapEventListeners(): void;
    drawMarker(cluster: Cluster): void;
    drawCell(cluster: Cluster): void;
    getGridSize(): number;
    setClusterMethod(clusterMethod: ClusterMethod): void;
    setArea(geojson: GeoJSON): void;
    getSinglePinImageURL(cluster: Cluster): string;
    selectPinIcon(cluster: Cluster): {
        url: string;
        size: number[];
        anchor: number[];
        relativeAnchor: number[];
        popupAnchor: number[];
    };
    setMarkerProps(marker: any, cluster: Cluster): any;
    markerClickFunction(x: number, y: number): void;
    onMarkerFinalClick(marker: any): Promise<void>;
    roundMarkerCount(count: number): number;
    getClusterGeometry(): GeoJSON | {
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
    getClusters(clearCache?: boolean): Promise<void>;
    startClustering(): void;
    filtersAreEqual(filter1: FilterOrNestedFilter, filter2: FilterOrNestedFilter): boolean;
    filter(filter: Filter | NestedFilter | FilterOrNestedFilter[], reloadMarkers?: boolean): void;
    addFilter(filter: Filter, reloadMarkers?: boolean): void;
    addFilters(filtersToAdd: FilterList, reloadMarkers?: boolean): void;
    removeFilter(filter: Filter, reloadMarkers?: boolean): void;
    removeFilters(filtersToRemove: FilterList, reloadMarkers?: boolean): void;
    resetFilters(reloadMarkers?: boolean): void;
    postFilterChange(reloadMarkers?: boolean): void;
    /**
     * method for getting the unaggregated, paginated content of the map
     */
    getMapContents(limit?: number, offset?: number): Promise<any>;
    /**
     * methods for getting counts of objects on the current map / geometry
     */
    getMapContentCount(modulations?: Modulations): Promise<any>;
    getGroupedMapContents(groupBy: string): Promise<any>;
    _onFinalClick(marker: Marker, data: any): void;
    _onGotClusters(): void;
}

//# sourceMappingURL=index.d.ts.map
