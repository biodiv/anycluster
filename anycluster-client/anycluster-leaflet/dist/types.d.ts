import { AnyclusterClient, AnyclusterClientSettings, Viewport, KmeansCluster, GridCluster, ClusterMethod, GeoJSON } from "anycluster-client";
export { ClusterMethod };
export class AnyclusterLeaflet extends AnyclusterClient {
    currentZoom: number;
    constructor(map: any, apiUrl: string, markerFolderPath: string, settings: AnyclusterClientSettings);
    removeArea(): void;
    addArea(geojson: GeoJSON): void;
    createClusterLayers(): void;
    createAreaLayer(): void;
    getMarkerIcon(cluster: KmeansCluster | GridCluster): any;
    _getLMarker(cluster: KmeansCluster | GridCluster): any;
    _drawLMarker(marker: any): void;
    drawKmeansMarker(cluster: KmeansCluster): void;
    drawGridMarker(cluster: GridCluster): void;
    drawCell(cluster: GridCluster): void;
    removeAllMarkers(): void;
    addMapEventListeners(): void;
    getViewport(): Viewport;
    getZoom(): number;
    setZoom(zoom: number): void;
    setMap(x: number, y: number, zoom: number): void;
    addMarkerClickListener(marker: any): void;
}

//# sourceMappingURL=types.d.ts.map
