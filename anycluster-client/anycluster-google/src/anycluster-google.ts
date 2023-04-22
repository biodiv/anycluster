import {
    AnyclusterClient,
    AnyclusterClientSettings,
    Viewport,
    Cluster,
    ClusterMethod,
    GeoJSON as IGeoJSON,
} from 'anycluster-client';

import { Loader } from '@googlemaps/js-api-loader';

export {
    ClusterMethod
};

export class AnyclusterGoogle extends AnyclusterClient {

    currentZoom: number

    google: any

    constructor(apiKey: string, map: any, apiUrl: string, markerFolderPath: string, settings: AnyclusterClientSettings) {

        const loader = new Loader({
            apiKey: apiKey,
            version: "monthly",
            libraries: ["marker", "drawing"]
        });

        loader.load().then((google) => {
            this.google = google;
        })
            .catch(e => {
                // do something
            });

        super(map, apiUrl, markerFolderPath, settings);

        this.currentZoom = this.getZoom();

    }


    removeArea() {
        this.map.data.forEach((feature) => {
            this.map.data.remove(feature);
        });
    }

    addArea(geojson: IGeoJSON) {

        this.map.data.addGeoJson(
            geojson
        );

    }

    createClusterLayers() {

        this.map.data.setStyle((feature) => {

            if (feature.getProperty("clustertype") == "cell"){

                const roundedCount = this.roundMarkerCount(feature.getProperty("count"));

                const fillColor = this.gridStrokeColors[roundedCount];
                const strokeColor = this.gridStrokeColors[roundedCount];
                const strokeWeight = 1;

                const style = {
                    "fillColor": fillColor,
                    //"fillOpacity": .5,
                    "strokeWeight": strokeWeight,
                    "strokeColor": strokeColor,
                    //"strokeOpacity": .8
                };

                return style;
            }

        });

        this.map.data.addListener("click", (event: any) => {
            const feature = event.feature;

            if (feature.clustertype == "cell" || feature.clustertype == "marker"){

                let zoom = this.getZoom();

                if (zoom >= 13 || feature.count == 1) {
                    this.onMarkerFinalClick(feature);
                }

                else {
                    this.markerClickFunction(feature.x, feature.y);
                }
            }
        });
    }

    createAreaLayer() {
    }

    getMarkerIcon(cluster: Cluster) {
        // get the correct icon
        const piniconObj = this.selectPinIcon(cluster);

        const iconSize = new this.google.maps.Size(piniconObj.size[0], piniconObj.size[1]);
        const anchor = new this.google.maps.Point(piniconObj.anchor[0], piniconObj.anchor[1]);

        const markerIcon = {
            "url": piniconObj.url,
            "size": iconSize,
            "anchor": anchor,
        };

        return markerIcon;
    }

    drawMarker(cluster: Cluster) {

        const markerIcon = this.getMarkerIcon(cluster);

        const markerOptions = {
            "map": this.map,
            "position": {
                "lat": cluster.center.y,
                "lng": cluster.center.x
            },
            "icon": markerIcon,
        };

        let marker = new this.google.maps.Marker(markerOptions);

        marker = this.setMarkerProps(marker, cluster);

        this.addMarkerClickListener(marker);

        this.markerList.push(marker);
    }

    drawCell(cluster: Cluster) {
        const count = cluster.count;

        if (count == 1) {
            this.drawMarker(cluster);
        }

        else {

            const geojson = {
                "type": "Feature",
                "geometry": cluster.geojson,
                "properties": {
                    "clustertype" : "cell",
                    "x": cluster.center.x,
                    "y": cluster.center.y,
                    "count": count,
                    "geojson": cluster.geojson,
                }
            };

            const cell = this.map.data.addGeoJson(geojson)[0];

            cell.x = cluster.center.x;
            cell.y = cluster.center.y;
            cell.count = count;
            cell.geojson = geojson;
            cell.clustertype = "cell";

        }
    }

    removeAllMarkers() {

        for (let i = 0; i < this.markerList.length; i++) {
            this.markerList[i].setMap(null);
        }

        this.map.data.forEach((feature) => {
            if (feature.clustertype == "cell"){
                this.map.data.remove(feature);
            }
        });

        this.markerList.length = 0;
    }

    addMapEventListeners() {
        this.map.addListener("dragend", () => this.getClusters());
        this.map.addListener("zoom_changed", () => {
            this.removeAllMarkers();
            this.getClusters();
        });
    }


    getViewport(): Viewport {

        const latLngBounds = this.map.getBounds();
        const northEast = latLngBounds.getNorthEast();
        const southWest = latLngBounds.getSouthWest();

        const viewport = {
            "left": southWest.lng(),
            "right": northEast.lng(),
            "top": northEast.lat(),
            "bottom": southWest.lat(),
        };

        return viewport;
    }

    getZoom(): number {
        return this.map.getZoom();
    }

    setZoom(zoom: number): void {
        this.map.setZoom(zoom);
    }


    setMap(x: number, y: number, zoom: number): void {

        const mapOptions = {
            "center": {
                lat: y,
                lng: x
            },
            "zoom": zoom,
        };

        this.map.setOptions(mapOptions);
    }

    addMarkerClickListener(marker) {

        const zoom = this.getZoom();

        if (zoom >= 13 || marker.count == 1) {
            marker.addListener("click", (event) => {
                this.onMarkerFinalClick(marker);
            });
        }

        else {
            marker.addListener("click", (event) => {
                this.markerClickFunction(marker.x, marker.y);
            });
        }
    }

}