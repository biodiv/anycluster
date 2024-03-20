import { ClusterMethod, GeometryType, IconType, SRIDS } from "./consts";
import { GeoJSON, Marker, Cluster, Viewport } from "./geometry";
import { Anycluster, Filter, FilterList, NestedFilter, FilterOrNestedFilter, FilterOrNestedFilterList, Modulations } from "./anycluster";
export interface AnyclusterClientSettings {
    srid?: SRIDS;
    kmeansGridSize?: number;
    gridGridSize?: number;
    clusterMethod?: ClusterMethod;
    geometryType?: GeometryType;
    area?: any;
    iconType?: IconType;
    maxZoom?: number;
    onFinalClick?: Function;
    singlePinImages?: Record<string, string>;
    getSinglePinImageURL?: Function;
    markerImageSizes?: Record<string, number[]>;
    gridFillColors?: Record<number, string>;
    gridStrokeColors?: Record<number, string>;
    onGotClusters?: () => void;
    startClustering?: boolean;
}
export declare class AnyclusterClient {
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
    maxZoom: number;
    onFinalClick: Function;
    onGotClusters: Function;
    singlePinImages?: Record<string, string>;
    getSinglePinImageURL: Function;
    markerImageSizes: Record<string, number[]>;
    gridFillColors: Record<number, string>;
    gridStrokeColors: Record<number, string>;
    filters: FilterOrNestedFilterList;
    latestClusterRequestTimestamp: number | null;
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
    _getSinglePinImageURL(cluster: Cluster): string;
    selectPinIcon(cluster: Cluster): {
        url: any;
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
    getMapContents(limit?: number, offset?: number, orderBy?: string): Promise<any>;
    /**
     * methods for getting counts of objects on the current map / geometry
     */
    getMapContentCount(modulations?: Modulations): Promise<any>;
    getFilteredMapContentCount(filters?: FilterOrNestedFilterList, modulations?: Modulations): Promise<any>;
    getGroupedMapContents(groupBy: string): Promise<any>;
    getFilteredGroupedMapContents(filters: FilterOrNestedFilterList, groupBy: string): Promise<any>;
    _onFinalClick(marker: Marker, data: any): void;
    _onGotClusters(): void;
}
