import { AnyclusterClient, AnyclusterClientSettings, Viewport, Cluster, ClusterMethod, GeoJSON } from "anycluster-client";
export { ClusterMethod };
export class AnyclusterLeaflet extends AnyclusterClient {
    currentZoom: number;
    gridFillColors: Record<number, string>;
    gridStrokeColors: Record<number, string>;
    constructor(map: any, apiUrl: string, markerFolderPath: string, settings: AnyclusterClientSettings);
    removeArea(): void;
    addArea(geojson: GeoJSON): void;
    createClusterLayers(): void;
    createAreaLayer(): void;
    getMarkerIcon(cluster: Cluster): any;
    drawMarker(cluster: Cluster): void;
    drawCell(cluster: Cluster): void;
    removeAllMarkers(): void;
    addMapEventListeners(): void;
    getViewport(): Viewport;
    getZoom(): number;
    setZoom(zoom: number): void;
    setMap(x: number, y: number, zoom: number): void;
    addMarkerClickListener(marker: any): void;
}

//# sourceMappingURL=types.d.ts.map
