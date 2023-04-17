
import { ClusterMethod, GeometryType, IconType, SRIDS, DefaultGridSizes, DefaultMarkerImageSizes } from "./consts";
import { GeoJSON, Marker, Cluster, Viewport } from "./geometry";
import { Anycluster, GetKmeansClusterContentRequestData, ClusterRequestData } from "./anycluster";


export interface AnyclusterClientSettings {
    srid?: SRIDS // srid of the map
    kmeansGridSize?: number
    gridGridSize?: number
    clusterMethod?: ClusterMethod
    geometryType?: GeometryType
    area?: any
    iconType?: IconType
    onFinalClick?: Function
    singlePinImages?: Record<string, string>
    markerImageSizes?: Record<string, number[]>
    gridFillColors?: Record<number, string>
    gridStrokeColors?: Record<number, string>
}

export class AnyclusterClient {

    srid: SRIDS
    kmeansGridSize: number
    gridGridSize: number
    clusterMethod: ClusterMethod
    geometryType: GeometryType

    area: GeoJSON | null
    iconType: IconType

    anycluster: Anycluster
    markerList: any[]
    onFinalClick: Function
    singlePinImages?: Record<string, string>

    markerImageSizes: Record<string, number[]>

    filters: any[] = []


    constructor(public map: any, public apiUrl: string, public markerFolderPath: string, settings: AnyclusterClientSettings) {

        this.map = map;
        this.apiUrl = apiUrl;
        this.markerFolderPath = markerFolderPath;

        settings = settings || {};


        // settings
        this.srid = settings.srid ? settings.srid : SRIDS.EPSG4326;
        this.kmeansGridSize = settings.gridGridSize ? settings.gridGridSize: DefaultGridSizes.kmeans;
        this.gridGridSize = settings.gridGridSize ? settings.gridGridSize: DefaultGridSizes.grid;

        this.clusterMethod = settings.clusterMethod ? settings.clusterMethod : ClusterMethod.kmeans;
        this.geometryType = settings.geometryType ? settings.geometryType : GeometryType.viewport;

        this.area = settings.area ? settings.area : null;
        this.iconType = settings.iconType ? settings.iconType : IconType.rounded;

        this.onFinalClick = settings.onFinalClick ? settings.onFinalClick : this._onFinalClick;

        this.singlePinImages = settings.singlePinImages ? settings.singlePinImages : {};

        this.markerImageSizes = settings.markerImageSizes ? settings.markerImageSizes : DefaultMarkerImageSizes;
        

        if (this.area) {
            this.setArea(this.area);
        }

        const gridSize = this.getGridSize();
        this.anycluster = new Anycluster(this.apiUrl, gridSize, this.srid);

        this.createClusterLayers();
        this.markerList = [];

        this.startClustering();
    }

    createClusterLayers(): void {
        throw new Error("NotImplementedError: createClusterLayers");
    }

    addArea(geojson: object): void {
        throw new Error("NotImplementedError: addArea");
    }

    removeArea(): void {
        throw new Error("NotImplementedError: removeArea");
    }

    removeAllMarkers(): void {
        throw new Error("NotImplementedError: removeAllMarkers");
    }

    getZoom(): number {
        throw new Error("NotImplementedError: getZoom");
    }

    setMap(x: number, y: number, zoom: number): void {
        throw new Error("NotImplementedError: setMap");
    }

    getViewport(): Viewport {
        throw new Error("NotImplementedError: setMap");
    }

    addMapEventListeners(): void {
        throw new Error("NotImplementedError: addMapEventListeners");
    }

    drawMarker(cluster: Cluster): void {
        throw new Error("NotImplementedError: drawMarker");
    }

    drawCell(cluster: Cluster): void {
        throw new Error("NotImplementedError: drawCell");
    }

    getAreaContent(geojson: GeoJSON): void {
        throw new Error("NotImplementedError: getAreaContent");
    }


    getGridSize(): number {
        if (this.clusterMethod == ClusterMethod.grid) {
            return this.gridGridSize;
        }

        return this.kmeansGridSize;
    }

    setClusterMethod(clusterMethod: ClusterMethod) {

        if (clusterMethod == ClusterMethod.grid) {
            this.area = null;
            this.geometryType = GeometryType.viewport;
            this.removeArea();
        }

        this.removeAllMarkers();
        this.clusterMethod = clusterMethod;
        const gridSize = this.getGridSize();
        this.anycluster = new Anycluster(this.apiUrl, gridSize, this.srid);
        this.markerList = [];
        this.getClusters(true);
    }

    setArea(geojson: GeoJSON) {

        this.area = geojson;

        this.removeArea();

        if (geojson == null) {
            this.geometryType = GeometryType.viewport;
            this.setClusterMethod(ClusterMethod.kmeans);
        }
        else {

            this.addArea(geojson);

            this.geometryType = GeometryType.area;

            this.setClusterMethod(ClusterMethod.kmeans);
        }
    }

    getSinglePinImageURL(cluster: Cluster) {

        const pinimg = cluster.pinimg;

        let url = `${this.markerFolderPath}pin_unknown.png`;

        if (this.singlePinImages && pinimg && pinimg in this.singlePinImages) {
            url = this.singlePinImages[pinimg];
        }

        return url

    }

    selectPinIcon(cluster: Cluster) {

        const count = cluster.count;

        let markerImageUrl = this.getSinglePinImageURL(cluster);
        let pinicon = "1";

        if (count > 10000) {
            pinicon = "10000";
        }

        else if (count > 1000) {
            pinicon = "1000";
        }

        else if (count > 100) {
            pinicon = "100";
        }

        else if (count > 50) {
            pinicon = "50";
        }

        else if (count > 10) {
            pinicon = "10";
        }

        else if (count > 1) {
            pinicon = "5";
        }

        if (count > 1) {
            if (this.iconType == IconType.exact) {
                markerImageUrl = `${this.markerFolderPath}${pinicon}_empty.png`;
            }
            else {
                markerImageUrl = `${this.markerFolderPath}${pinicon}.png`;
            }
        }

        const size = this.markerImageSizes[pinicon];
        let anchor = [Math.round(size[0] / 2), size[1] - 1];
        let relativeAnchor = [0.5, 1];

        if (count > 1) {
            anchor = [Math.round((size[0] / 2)), Math.round(size[1] / 2)];
            relativeAnchor = [0.5, 0.5];
        }

        const imgObj = {
            url: markerImageUrl,
            size: size,
            anchor: anchor,
            relativeAnchor: relativeAnchor,
            popupAnchor: [0, -Math.round(size[1]) + 8]
        }

        return imgObj;

    }

    // marker can be an openlayers Feature or a L.marker
    setMarkerProps(marker: any, cluster: Cluster) {

        // add properties required by anycluster
        marker.x = cluster.center.x;
        marker.y = cluster.center.y;
        marker.count = cluster.count;

        if (cluster.hasOwnProperty("ids")) {
            marker.ids = cluster.ids;
        }

        if (cluster.hasOwnProperty("id")) {
            marker.id = cluster.id;
        }

        if (cluster.hasOwnProperty("geojson")) {
            
            /*const geojson = {
                "type": "Feature",
                "count": cluster.count,
                "geometry": cluster.geojson,
                "properties": {
                    "count": cluster.count
                },
                "crs" : {
                    "type" : "name",
                    "properties" : {
                        "name" : this.srid
                    }
                }
            };*/

            marker.geojson = cluster.geojson;
        }

        return marker;

    }

    markerClickFunction(x: number, y: number) {
        this.removeAllMarkers();
        let zoom = this.getZoom();
        zoom = zoom + 3;
        this.setMap(x, y, zoom);
    }

    async onMarkerFinalClick(marker: any) {

        const zoom = this.getZoom();
        const x = marker.x;
        const y = marker.y;
        const ids = marker.ids;

        if (this.clusterMethod == ClusterMethod.kmeans) {

            const postData = {
                "geometry_type": this.geometryType,
                "input_srid": this.srid,
                "x": x,
                "y": y,
                "ids": ids,
                "filters": this.filters
            } as GetKmeansClusterContentRequestData;

            const data = await this.anycluster.getKmeansClusterContent(zoom, postData);

            this.onFinalClick(marker, data);

        }
        else if (this.clusterMethod = ClusterMethod.grid) {

            if (marker.count == 1) {
                const data = await this.anycluster.getDatasetContent(zoom, marker.id);
                this.onFinalClick(marker, data);
            }
            else {
                const geojson = marker["geojson"];
                const data = await this.getAreaContent(geojson);

                this.onFinalClick(marker, data);
            }

        }
    }

    roundMarkerCount(count: number): number {

        if (count == 1) {
            count = 1;
        }
        else if (count <= 5) {
            count = 5;
        }
        else if (count <= 10) {
            count = 10;
        }
        else if (count <= 50) {
            count = 50;
        }
        else if (count <= 100) {
            count = 100;
        }
        else if (count <= 1000) {
            count = 1000;
        }
        else {
            count = 10000;
        }

        return count;
    }

    getClusterGeometry() {
        let geoJSON;

        if (this.geometryType == GeometryType.viewport) {
            const viewport = this.getViewport();
            geoJSON = this.anycluster.viewportToGeoJSON(viewport);
        }
        else if (this.geometryType == GeometryType.area && this.area) {
            geoJSON = this.area;
        }
        else {
            throw new Error('No cluster geometry found');
        }

        return geoJSON;

    }

    async getClusters(clearCache = false) {

        const geoJSON = this.getClusterGeometry()

        const postData = {
            "output_srid": this.srid,
            "geometry_type": this.geometryType,
            "geojson": geoJSON,
            "clear_cache": clearCache
        } as ClusterRequestData;

        const zoom = this.getZoom();

        if (this.clusterMethod == ClusterMethod.kmeans) {


            const clusters: Cluster[] = await this.anycluster.getKmeansCluster(zoom, postData);

            if (clusters.length > 0) {
                clusters.forEach(cluster => {
                    this.drawMarker(cluster);
                });
            }
        }
        else if (this.clusterMethod == ClusterMethod.grid) {
            const clusters: Cluster[] = await this.anycluster.getGridCluster(zoom, postData);

            if (clusters.length > 0) {
                clusters.forEach(cluster => {
                    this.drawCell(cluster);
                });
            }
        }
        else {
            throw new Error(`Invalid clusterMethod: ${this.clusterMethod}`);
        }
    }

    startClustering() {
        this.getClusters(true);
        this.addMapEventListeners();
    }

    _onFinalClick(marker: Marker, data: any) {
        alert(JSON.stringify(data));
    }

}