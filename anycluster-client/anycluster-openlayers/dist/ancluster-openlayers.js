import {IconType as $hgUW1$IconType, Bounds3857 as $hgUW1$Bounds3857, SRIDS as $hgUW1$SRIDS, Bounds4326 as $hgUW1$Bounds4326, AnyclusterClient as $hgUW1$AnyclusterClient, ClusterMethod as $899780519fbdbc61$re_export$ClusterMethod} from "anycluster-client";
import $hgUW1$ollayerVector from "ol/layer/Vector";
import $hgUW1$olsourceVector from "ol/source/Vector";
import {Style as $hgUW1$Style, Stroke as $hgUW1$Stroke, Fill as $hgUW1$Fill, Icon as $hgUW1$Icon, Text as $hgUW1$Text} from "ol/style";
import $hgUW1$olformatGeoJSON from "ol/format/GeoJSON";
import $hgUW1$olFeature from "ol/Feature";
import $hgUW1$olgeomPoint from "ol/geom/Point";








class $899780519fbdbc61$export$e7e1d3d8299bc13e extends (0, $hgUW1$AnyclusterClient) {
    constructor(map, apiUrl, markerFolderPath, settings){
        super(map, apiUrl, markerFolderPath, settings);
        this.currentZoom = this.getZoom();
    }
    removeArea() {
        if (this.map.hasOwnProperty("areaLayer")) this.map.areaLayer.getSource().clear();
    }
    getAreaStyle(feature, resolution) {
        const style = new (0, $hgUW1$Style)({
            stroke: new (0, $hgUW1$Stroke)({
                color: "rgba(255, 0, 0, 1)",
                width: 2
            }),
            fill: new (0, $hgUW1$Fill)({
                color: "rgba(255, 0, 0, .3)"
            })
        });
        return style;
    }
    addArea(geojson) {
        if (!this.map.hasOwnProperty("areaLayer")) this.createAreaLayer();
        const features = new (0, $hgUW1$olformatGeoJSON)({
            featureProjection: "EPSG:3857"
        }).readFeatures(geojson);
        this.map.areaLayer.getSource().addFeatures(features);
    }
    createClusterLayers() {
        const gridClusterLayer = new (0, $hgUW1$ollayerVector)({
            source: new (0, $hgUW1$olsourceVector)(),
            style: this.getCellStyle.bind(this)
        });
        this.map.addLayer(gridClusterLayer);
        this.map.gridClusterLayer = gridClusterLayer;
        const kmeansLayer = new (0, $hgUW1$ollayerVector)({
            source: new (0, $hgUW1$olsourceVector)()
        });
        this.map.addLayer(kmeansLayer);
        this.map.kmeansLayer = kmeansLayer;
        this.map.on("click", (event)=>{
            let hit = false;
            this.map.forEachFeatureAtPixel(event.pixel, (feature)=>{
                if (hit == false) {
                    if (feature.clustertype == "cell" || feature.clustertype == "marker") {
                        hit = true;
                        let zoom = this.getZoom();
                        if (zoom >= this.maxZoom || feature.count == 1) this.onMarkerFinalClick(feature);
                        else this.markerClickFunction(feature.x, feature.y);
                    }
                }
            });
        });
        this.map.on("pointermove", (event)=>{
            let pixel = this.map.getEventPixel(event.originalEvent);
            let hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getViewport().style.cursor = hit ? "pointer" : "";
        });
    }
    createAreaLayer() {
        const areaLayer = new (0, $hgUW1$ollayerVector)({
            source: new (0, $hgUW1$olsourceVector)(),
            style: this.getAreaStyle.bind(this)
        });
        const layers = this.map.getLayers();
        layers.insertAt(2, areaLayer);
        //this.map.addLayer(areaLayer);
        this.map.areaLayer = areaLayer;
    }
    getMarkerIcon(cluster) {
        const piniconObj = this.selectPinIcon(cluster);
        const icon = new (0, $hgUW1$Icon)({
            anchor: piniconObj.relativeAnchor,
            crossOrigin: "anonymous",
            src: piniconObj.url,
            imgSize: piniconObj.size,
            size: piniconObj.size
        });
        const styleOptions = {
            image: icon
        };
        if (this.iconType === (0, $hgUW1$IconType).exact && cluster.count > 1) styleOptions.text = new (0, $hgUW1$Text)({
            text: cluster.count.toString(),
            font: "bold 14px sans-serif",
            fill: new (0, $hgUW1$Fill)({
                color: "#FFF"
            }),
            justify: "center",
            textBaseline: "middle",
            offsetY: 1,
            padding: [
                0,
                0,
                0,
                0
            ]
        });
        const style = new (0, $hgUW1$Style)(styleOptions);
        return style;
    }
    _getMarkerFeature(cluster) {
        const style = this.getMarkerIcon(cluster);
        const point = new (0, $hgUW1$olgeomPoint)([
            cluster.center.x,
            cluster.center.y
        ]);
        let marker = new (0, $hgUW1$olFeature)(point);
        marker.setStyle(style);
        return marker;
    }
    _drawSingleMarker(extendedMarker) {
        extendedMarker.clustertype = "marker";
        this.map.kmeansLayer.getSource().addFeature(extendedMarker);
        this.markerList.push(extendedMarker);
    }
    drawKmeansMarker(cluster) {
        let marker = this._getMarkerFeature(cluster);
        let extendedMarker = this.setMarkerProps(marker, cluster);
        this._drawSingleMarker(extendedMarker);
    }
    drawGridMarker(cluster) {
        let marker = this._getMarkerFeature(cluster);
        let extendedMarker = this.setCellProps(marker, cluster);
        this._drawSingleMarker(extendedMarker);
    }
    getCellStyle(feature, resolution) {
        const roundedCount = this.roundMarkerCount(feature.count);
        const fillColor = this.gridFillColors[roundedCount];
        const strokeColor = this.gridStrokeColors[roundedCount];
        const strokeWeight = 2;
        const style = new (0, $hgUW1$Style)({
            stroke: new (0, $hgUW1$Stroke)({
                color: strokeColor,
                width: strokeWeight
            }),
            fill: new (0, $hgUW1$Fill)({
                color: fillColor
            })
        });
        return style;
    }
    drawCell(cluster) {
        const count = cluster.count;
        if (count == 1) this.drawGridMarker(cluster);
        else {
            const geojson = {
                "type": "Feature",
                "geometry": cluster.geojson
            };
            let feature = new (0, $hgUW1$olformatGeoJSON)().readFeature(geojson);
            let extendedFeature = this.setCellProps(feature, cluster);
            extendedFeature.clustertype = "cell";
            this.map.gridClusterLayer.getSource().addFeature(extendedFeature);
        }
    }
    removeAllMarkers() {
        this.map.kmeansLayer.getSource().clear();
        if (this.map.hasOwnProperty("gridClusterLayer")) this.map.gridClusterLayer.getSource().clear();
        this.markerList.length = 0;
    }
    addMapEventListeners() {
        // unfortunately fires after loadend
        this.map.addEventListener("moveend", (event)=>{
            let newZoom = this.getZoom();
            if (newZoom != this.currentZoom) {
                this.removeAllMarkers();
                this.currentZoom = newZoom;
            }
            if (this.isStartup === false) this.getClusters();
        });
    }
    // Openlayers accumulates coordinates when panning across world borders
    putXCoordinateIntoWorldBounds(XCoordinate) {
        let bounds = (0, $hgUW1$Bounds3857);
        if (this.srid === (0, $hgUW1$SRIDS).EPSG4326) bounds = (0, $hgUW1$Bounds4326);
        const worldWidth = bounds.maxX - bounds.minX;
        const worldCount = Math.floor(Math.abs(XCoordinate) / worldWidth) + 1;
        const vector = worldWidth * worldCount;
        if (XCoordinate < bounds.minX) // user panned to the right, map moved leftwards over the border
        XCoordinate = XCoordinate + vector;
        else if (XCoordinate > bounds.maxX) // user panned to the left, map moved rightwards over the border
        XCoordinate = XCoordinate - vector;
        return XCoordinate;
    }
    getViewport() {
        const view = this.map.getView();
        const extent = view.calculateExtent(this.map.getSize());
        const left = extent[0];
        const bottom = extent[1];
        const right = extent[2];
        const top = extent[3];
        const viewportJSON = {
            "left": this.putXCoordinateIntoWorldBounds(left),
            "top": top,
            "right": this.putXCoordinateIntoWorldBounds(right),
            "bottom": bottom
        };
        return viewportJSON;
    }
    getZoom() {
        const view = this.map.getView();
        return view.getZoom();
    }
    setZoom(zoom) {
        this.map.setZoom(zoom);
    }
    setMap(x, y, zoom) {
        const view = this.map.getView();
        view.animate({
            zoom: zoom,
            center: [
                x,
                y
            ],
            duration: 500
        });
    }
}




export {$899780519fbdbc61$re_export$ClusterMethod as ClusterMethod, $899780519fbdbc61$export$e7e1d3d8299bc13e as AnyclusterOpenLayers};
//# sourceMappingURL=ancluster-openlayers.js.map
