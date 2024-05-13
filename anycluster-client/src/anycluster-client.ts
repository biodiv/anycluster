
import { ClusterMethod, GeometryType, IconType, SRIDS, DefaultGridSizes, DefaultMarkerImageSizes, DefaultMaxZoom } from "./consts";
import type { GeoJSON, Marker, Viewport } from "./geometry";
import type { GridCluster, KmeansCluster } from "./types";
import {
  Anycluster,
  GetKmeansClusterContentRequestData,
  ClusterRequestData,
  MapContentCountRequestData,
  GroupedMapContentRequestData,
  AreaContentRequestData,
  Filter,
  FilterList,
  NestedFilter,
  FilterOrNestedFilter,
  FilterOrNestedFilterList,
  Modulations,
} from "./anycluster";

const defaultGridFillColors = {
  5: "rgba(255, 192, 203, .5)",
  10: "rgba(240, 128, 128, .5)",
  50: "rgba(255, 127, 80, .5)",
  100: "rgba(255, 165, 0, .5)",
  1000: "rgba(255, 69, 0, .5)",
  10000: "rgba(255, 0 , 0, .5)",
};

const defaultGridStrokeColors = {
  5: "pink",
  10: "lightcoral",
  50: "coral",
  100: "orange",
  1000: "orangered",
  10000: "red",
};

export interface AnyclusterClientSettings {
  srid?: SRIDS // srid of the map
  kmeansGridSize?: number
  gridGridSize?: number
  clusterMethod?: ClusterMethod
  geometryType?: GeometryType
  area?: any
  iconType?: IconType
  maxZoom?: number,
  onFinalClick?: Function
  singlePinImages?: Record<string, string>
  getSinglePinImageURL?: Function
  markerImageSizes?: Record<string, number[]>
  gridFillColors?: Record<number, string>
  gridStrokeColors?: Record<number, string>
  onGotClusters?: () => void
  startClustering?: boolean
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
  maxZoom: number
  onFinalClick: Function
  onGotClusters: Function
  singlePinImages?: Record<string, string>
  getSinglePinImageURL: Function

  markerImageSizes: Record<string, number[]>

  gridFillColors: Record<number, string>
  gridStrokeColors: Record<number, string>

  filters: FilterOrNestedFilterList = []

  isStartup: boolean = false // openlayers fires moveend after loadend. This triggers two clustering requests of which the latter has to be dismissed
  latestFilterChangeTimestamp: number | null = null

  constructor(public map: any, public apiUrl: string, public markerFolderPath: string, settings: AnyclusterClientSettings) {

    this.map = map;
    this.apiUrl = apiUrl;
    this.markerFolderPath = markerFolderPath;

    settings = settings || {};


    // settings
    this.srid = settings.srid ? settings.srid : SRIDS.EPSG4326;
    this.kmeansGridSize = settings.gridGridSize ? settings.gridGridSize : DefaultGridSizes.kmeans;
    this.gridGridSize = settings.gridGridSize ? settings.gridGridSize : DefaultGridSizes.grid;

    this.clusterMethod = settings.clusterMethod ? settings.clusterMethod : ClusterMethod.kmeans;
    this.geometryType = settings.geometryType ? settings.geometryType : GeometryType.viewport;

    this.area = settings.area ? settings.area : null;
    this.iconType = settings.iconType ? settings.iconType : IconType.rounded;

    this.singlePinImages = settings.singlePinImages ? settings.singlePinImages : {};
    this.getSinglePinImageURL = settings.getSinglePinImageURL ? settings.getSinglePinImageURL : this._getSinglePinImageURL;

    this.markerImageSizes = settings.markerImageSizes ? settings.markerImageSizes : DefaultMarkerImageSizes;

    this.gridFillColors = settings.gridFillColors ? settings.gridFillColors : defaultGridFillColors;
    this.gridStrokeColors = settings.gridStrokeColors ? settings.gridStrokeColors : defaultGridStrokeColors;

    this.maxZoom = settings.maxZoom ? settings.maxZoom : DefaultMaxZoom;
    // hooks
    this.onGotClusters = settings.onGotClusters ? settings.onGotClusters : this._onGotClusters;
    this.onFinalClick = settings.onFinalClick ? settings.onFinalClick : this._onFinalClick;


    if (this.area) {
      this.setArea(this.area);
    }

    const gridSize = this.getGridSize();
    this.anycluster = new Anycluster(this.apiUrl, gridSize, this.srid);

    this.createClusterLayers();
    this.markerList = [];

    const startClustering = settings.startClustering === false ? settings.startClustering : true;

    if (startClustering === true) {
      this.startClustering();
    }
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

  drawKmeansMarker(cluster: KmeansCluster): void {
    throw new Error("NotImplementedError: drawKmeansMarker");
  }

  drawCell(cluster: GridCluster): void {
    throw new Error("NotImplementedError: drawCell");
  }

  drawGridMarker(cluster: GridCluster): void {
    throw new Error("NotImplementedError: drawGridMarker");
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

  _getSinglePinImageURL(cluster: KmeansCluster | GridCluster) {

    const pinimg = cluster.pinimg;

    let url = `${this.markerFolderPath}pin_unknown.png`;

    if (this.singlePinImages && pinimg && pinimg in this.singlePinImages) {
      url = this.singlePinImages[pinimg];
    }

    return url

  }

  selectPinIcon(cluster: KmeansCluster | GridCluster) {

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
  setMarkerProps(marker: any, cluster: KmeansCluster) {

    // add properties required by anycluster
    marker.x = cluster.center.x;
    marker.y = cluster.center.y;
    marker.count = cluster.count;
    marker.ids = cluster.ids;

    return marker;

  }

  setCellProps(cell: any, cluster: GridCluster) {
    cell.x = cluster.center.x;
    cell.y = cluster.center.y;
    cell.count = cluster.count;
    cell.id = cluster.id;
    cell.geojson = cluster.geojson;

    return cell;
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

    const geoJSON = this.getClusterGeometry();

    if (this.clusterMethod == ClusterMethod.kmeans) {

      const ids = marker.ids;
      
      const postData = {
        "geometry_type": this.geometryType,
        "geojson": geoJSON,
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
        const zoom = this.getZoom();
        const data = await this.anycluster.getAreaContent(zoom, geojson);

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

    const geoJSON = this.getClusterGeometry();

    const postData = {
      "output_srid": this.srid,
      "geometry_type": this.geometryType,
      "geojson": geoJSON,
      "clear_cache": clearCache,
      "filters": this.filters
    } as ClusterRequestData;

    const zoom = this.getZoom();
    const filterTimestamp = this.latestFilterChangeTimestamp;

    if (this.clusterMethod == ClusterMethod.kmeans) {
      const clusters: KmeansCluster[] = await this.anycluster.getKmeansCluster(zoom, postData);
      const postResponseZoom = this.getZoom();
      // only draw markers/cells if the user did not zoom or change filters during the wait for the response
      if (clusters.length > 0 && filterTimestamp === this.latestFilterChangeTimestamp && zoom === postResponseZoom) {
        clusters.forEach(cluster => {
          this.drawKmeansMarker(cluster);
        });

        this.onGotClusters();
      } else {
        console.log(`[anycluster]: not drawing markers because of outdated response`);
      }

    } else if (this.clusterMethod == ClusterMethod.grid ) {
      const clusters: GridCluster[] = await this.anycluster.getGridCluster(zoom, postData);
      const postResponseZoom = this.getZoom();

      // only draw markers/cells if the user did not zoom or change filters during the wait for the response
      if (clusters.length > 0 && filterTimestamp === this.latestFilterChangeTimestamp && zoom === postResponseZoom) {
        clusters.forEach(cluster => {
            this.drawCell(cluster);
        });

        this.onGotClusters();
      } else {
        console.log(`[anycluster]: not drawing markers because of outdated response`);
      }
    } else {
      throw new Error(`Invalid clusterMethod: ${this.clusterMethod}`);
    }
  }

  async startClustering() {
    this.isStartup = true;
    await this.getClusters(true);
    this.addMapEventListeners();
    this.isStartup = false;
  }

  filtersAreEqual(filter1: FilterOrNestedFilter, filter2: FilterOrNestedFilter): boolean {
    if ('column' in filter1 && 'column' in filter2) {
      if (filter1.column == filter2.column && filter1.value == filter2.value && filter1.operator == filter2.operator) {
        return true;
      }
    }
    // testing with json.stringify is not ideal because {"a":1,"b":2} === {"b":2,"a":1} returns false
    else if (JSON.stringify(filter1) === JSON.stringify(filter2)) {
      return true;
    }

    return false;
  }

  // filtering
  filter(filter: Filter | NestedFilter | FilterOrNestedFilter[], reloadMarkers?: boolean) {

    if (Array.isArray(filter)) {
      this.filters = filter;
    }
    else {
      this.filters = [filter];
    }
    this.postFilterChange(reloadMarkers);
  }

  addFilter(filter: Filter, reloadMarkers?: boolean) {

    let filterExists = false;

    for (let f = 0; f < this.filters.length; f++) {
      let existingFilter: FilterOrNestedFilter = this.filters[f];

      if (this.filtersAreEqual(filter, existingFilter)) {
        filterExists = true;
        break;
      }

    }

    if (!filterExists) {
      this.filters.push(filter);
    }

    this.postFilterChange(reloadMarkers);
  }

  addFilters(filtersToAdd: FilterList, reloadMarkers?: boolean) {

    for (let fa = 0; fa < filtersToAdd.length; fa++) {
      let filter = filtersToAdd[fa];
      this.addFilter(filter, false);
    }
    this.postFilterChange(reloadMarkers);
  }

  removeFilter(filter: Filter, reloadMarkers?: boolean) {

    for (let f = 0; f < this.filters.length; f++) {
      let existingFilter: FilterOrNestedFilter = this.filters[f];

      if (this.filtersAreEqual(filter, existingFilter)) {
        this.filters.splice(f, 1);
        break;
      }
    }
    this.postFilterChange(reloadMarkers);
  }

  removeFilters(filtersToRemove: FilterList, reloadMarkers?: boolean) {

    for (let fr = 0; fr < filtersToRemove.length; fr++) {

      let filter = filtersToRemove[fr];

      this.removeFilter(filter, false);
    }

    this.postFilterChange(reloadMarkers);
  }

  resetFilters(reloadMarkers?: boolean) {
    this.filters = [];
    this.postFilterChange(reloadMarkers);
  }

  postFilterChange(reloadMarkers?: boolean) {

    this.latestFilterChangeTimestamp = new Date().getTime();

    if (reloadMarkers != false) {
      reloadMarkers = true;
    }
    if (reloadMarkers == true) {
      this.removeAllMarkers();
      this.getClusters(true);
    }
  }


  /**
   * method for getting the unaggregated, paginated content of the map
   */
  async getMapContents(limit?: number, offset?: number, orderBy?: string) {
    const geoJSON = this.getClusterGeometry();
    const zoom = this.getZoom();

    const postData = {
      "output_srid": this.srid,
      "geometry_type": GeometryType.area,
      "geojson": geoJSON,
      "clear_cache": false,
      "filters": this.filters,
      "limit": limit,
      "offset": offset,
      "order_by": orderBy,
    } as AreaContentRequestData;

    const data = this.anycluster.getAreaContent(zoom, postData);

    return data;
  }

  /**
   * methods for getting counts of objects on the current map / geometry
   */

  async getMapContentCount(modulations?: Modulations) {

    const geoJSON = this.getClusterGeometry()

    const postData = {
      "output_srid": this.srid,
      "geometry_type": this.geometryType,
      "geojson": geoJSON,
      "clear_cache": true,
      "filters": this.filters,
      "modulations": modulations,
    } as MapContentCountRequestData;

    const zoom = this.getZoom();

    const data = await this.anycluster.getMapContentCount(zoom, postData);

    return data;
  }

  async getFilteredMapContentCount(filters?: FilterOrNestedFilterList, modulations?: Modulations) {
    const geoJSON = this.getClusterGeometry()

    const postData = {
      "output_srid": this.srid,
      "geometry_type": this.geometryType,
      "geojson": geoJSON,
      "clear_cache": true,
      "filters": filters,
      "modulations": modulations,
    } as MapContentCountRequestData;

    const zoom = this.getZoom();

    const data = await this.anycluster.getMapContentCount(zoom, postData);

    return data;
  }

  async getGroupedMapContents(groupBy: string) {
    const geoJSON = this.getClusterGeometry()

    const postData = {
      "output_srid": this.srid,
      "geometry_type": this.geometryType,
      "geojson": geoJSON,
      "clear_cache": true,
      "filters": this.filters,
      "group_by": groupBy,
    } as GroupedMapContentRequestData;

    const zoom = this.getZoom();

    const data = await this.anycluster.getGroupedMapContents(zoom, postData);

    return data;

  }

  async getFilteredGroupedMapContents(filters: FilterOrNestedFilterList, groupBy: string) {
    const geoJSON = this.getClusterGeometry()

    const postData = {
      "output_srid": this.srid,
      "geometry_type": this.geometryType,
      "geojson": geoJSON,
      "clear_cache": true,
      "filters": filters,
      "group_by": groupBy,
    } as GroupedMapContentRequestData;

    const zoom = this.getZoom();

    const data = await this.anycluster.getGroupedMapContents(zoom, postData);

    return data;
  }

  // hooks
  _onFinalClick(marker: Marker, data: any) {
    alert(JSON.stringify(data));
  }

  _onGotClusters() { }

}