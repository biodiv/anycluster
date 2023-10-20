import { AnyclusterClient, AnyclusterClientSettings, Viewport, Cluster, ClusterMethod, GeoJSON } from "anycluster-client";
import { Style } from "ol/style";
import Feature from "ol/Feature";
export { ClusterMethod };
interface ExtendedFeature extends Feature {
    x: number;
    y: number;
    count: number;
    clustertype: string;
}
export class AnyclusterOpenLayers extends AnyclusterClient {
    currentZoom: number;
    constructor(map: any, apiUrl: string, markerFolderPath: string, settings: AnyclusterClientSettings);
    removeArea(): void;
    getAreaStyle(feature: Feature, resolution: number): Style;
    addArea(geojson: GeoJSON): void;
    createClusterLayers(): void;
    createAreaLayer(): void;
    getMarkerIcon(cluster: Cluster): Style;
    drawMarker(cluster: Cluster): void;
    getCellStyle(feature: ExtendedFeature, resolution: number): Style;
    drawCell(cluster: Cluster): void;
    removeAllMarkers(): void;
    addMapEventListeners(): void;
    putXCoordinateIntoWorldBounds(XCoordinate: number): number;
    getViewport(): Viewport;
    getZoom(): number;
    setZoom(zoom: number): void;
    setMap(x: number, y: number, zoom: number): void;
}

//# sourceMappingURL=types.d.ts.map
