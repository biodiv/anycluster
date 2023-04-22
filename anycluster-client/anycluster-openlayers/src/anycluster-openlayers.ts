import {
    AnyclusterClient,
    AnyclusterClientSettings,
    Viewport,
    Cluster,
    ClusterMethod,
    GeoJSON as IGeoJSON,
} from 'anycluster-client';

export {
    ClusterMethod
};

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Stroke, Style, Fill } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

interface ExtendedFeature extends Feature {
    x: number
    y: number
    count: number
    clustertype: string
}

export class AnyclusterOpenLayers extends AnyclusterClient {

    currentZoom: number

    constructor(map: any, apiUrl: string, markerFolderPath: string, settings: AnyclusterClientSettings) {
        super(map, apiUrl, markerFolderPath, settings);
        this.currentZoom = this.getZoom();
    }


    removeArea() {
        if (this.map.hasOwnProperty("areaLayer")) {
            this.map.areaLayer.getSource().clear();
        }
    }

    getAreaStyle(feature: Feature, resolution: number): Style {

        const style = new Style({
            stroke: new Stroke({
                color: "rgba(255, 0, 0, 1)",
                width: 2,
            }),
            fill: new Fill({
                color: "rgba(255, 0, 0, .3)",
            }),
        });

        return style;
    }

    addArea(geojson: IGeoJSON) {
        if (!this.map.hasOwnProperty("areaLayer")) {
            this.createAreaLayer();
        }

        const features = new GeoJSON({
            featureProjection: "EPSG:3857"
        }).readFeatures(geojson);

        
        this.map.areaLayer.getSource().addFeatures(features);

    }

    createClusterLayers() {

        const gridClusterLayer = new VectorLayer({
            source: new VectorSource(),
            style: this.getCellStyle.bind(this) as any,
        });

        this.map.addLayer(gridClusterLayer);
        this.map.gridClusterLayer = gridClusterLayer;

        const kmeansLayer = new VectorLayer({
            source: new VectorSource()
        });

        this.map.addLayer(kmeansLayer);
        this.map.kmeansLayer = kmeansLayer;

        this.map.on("click", (event: any) => {

            let hit = false;

            this.map.forEachFeatureAtPixel(event.pixel, (feature: ExtendedFeature) => {

                if (hit == false){

                    if (feature.clustertype == "cell" || feature.clustertype == "marker"){
                        hit = true;
                        let zoom = this.getZoom();

                        if (zoom >= 13 || feature.count == 1) {
                            this.onMarkerFinalClick(feature);
                        }

                        else {
                            this.markerClickFunction(feature.x, feature.y);
                        }
                    }
                }
            });
        });

        this.map.on("pointermove", (event: any) => {
            let pixel = this.map.getEventPixel(event.originalEvent);
            let hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getViewport().style.cursor = hit ? 'pointer' : '';
        });
    }

    createAreaLayer() {

        const areaLayer = new VectorLayer({
            source: new VectorSource(),
            style: this.getAreaStyle.bind(this) as any,
        });

        const layers = this.map.getLayers();
        layers.insertAt(2, areaLayer);
        //this.map.addLayer(areaLayer);
        this.map.areaLayer = areaLayer;
    }

    getMarkerIcon(cluster: Cluster) {

        const piniconObj = this.selectPinIcon(cluster);

        const icon = new Icon({
            anchor: piniconObj.relativeAnchor,
            crossOrigin: "anonymous",
            src: piniconObj.url,
            imgSize: piniconObj.size,
            size: piniconObj.size
        });

        const style = new Style({
            image: icon
        });

        return style;
          
    }

    drawMarker(cluster: Cluster) {

        const style = this.getMarkerIcon(cluster);
        const point = new Point([cluster.center.x, cluster.center.y])

        let marker = new Feature(point);

        marker.setStyle(style);

        let extendedMarker: ExtendedFeature = this.setMarkerProps(marker, cluster);
        extendedMarker.clustertype = "marker";

        this.map.kmeansLayer.getSource().addFeature(extendedMarker)

        this.markerList.push(extendedMarker);
    }

    getCellStyle(feature: ExtendedFeature, resolution: number): Style {

        const roundedCount = this.roundMarkerCount(feature.count);
        const fillColor = this.gridFillColors[roundedCount];
        const strokeColor = this.gridStrokeColors[roundedCount];
        const strokeWeight = 2;

        const style = new Style({
            stroke: new Stroke({
                color: strokeColor,
                width: strokeWeight,
            }),
            fill: new Fill({
                color: fillColor,
            }),
        });

        return style;
    }

    drawCell(cluster: Cluster) {

        const count = cluster.count;

        if (count == 1) {
            this.drawMarker(cluster)
        }
        else {

            const geojson = {
                "type": "Feature",
                "geometry": cluster.geojson,
            };

            let feature = new GeoJSON().readFeature(geojson);

            let extendedFeature: ExtendedFeature = this.setMarkerProps(feature, cluster);
            extendedFeature.clustertype = "cell";

            this.map.gridClusterLayer.getSource().addFeature(extendedFeature)

        }

    }

    removeAllMarkers() {

        
        this.map.kmeansLayer.getSource().clear();

        if (this.map.hasOwnProperty("gridClusterLayer")) {
            this.map.gridClusterLayer.getSource().clear();
        }

        this.markerList.length = 0;

    }

    addMapEventListeners () {
        // unfortunately fires after loadend
        this.map.addEventListener("moveend", (event: any) => {

            let newZoom = this.getZoom();
            if (newZoom != this.currentZoom){
                this.removeAllMarkers();
                this.currentZoom = newZoom;
            }
            this.getClusters();
        });
    }


    getViewport(): Viewport {

        const view = this.map.getView();

        const extent = view.calculateExtent(this.map.getSize());

        const left = extent[0];
        const bottom = extent[1];
        const right = extent[2];
        const top = extent[3];

        const viewportJSON = {
            "left": left,
            "top": top,
            "right": right,
            "bottom": bottom
        };

        return viewportJSON;
        
    }

    getZoom(): number {
        const view = this.map.getView();
        return view.getZoom();
    }

    setZoom(zoom: number): void {
        this.map.setZoom(zoom);
    }


    setMap(x: number, y: number, zoom: number): void {
        const view = this.map.getView();
        view.animate({
            zoom: zoom,
            center: [x, y],
            duration: 500,
        });
    }

}