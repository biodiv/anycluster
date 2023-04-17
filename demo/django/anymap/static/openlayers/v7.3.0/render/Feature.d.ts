/**
 * Create a geometry from an `ol/render/Feature`
 * @param {RenderFeature} renderFeature
 * Render Feature
 * @return {Point|MultiPoint|LineString|MultiLineString|Polygon|MultiPolygon}
 * New geometry instance.
 * @api
 */
export function toGeometry(renderFeature: RenderFeature): Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
/**
 * Create an `ol/Feature` from an `ol/render/Feature`
 * @param {RenderFeature} renderFeature RenderFeature
 * @param {string} [geometryName='geometry'] Geometry name to use
 * when creating the Feature.
 * @return {Feature} Newly constructed `ol/Feature` with properties,
 * geometry, and id copied over.
 * @api
 */
export function toFeature(renderFeature: RenderFeature, geometryName?: string | undefined): Feature;
export default RenderFeature;
/**
 * Lightweight, read-only, {@link module:ol/Feature~Feature} and {@link module:ol/geom/Geometry~Geometry} like
 * structure, optimized for vector tile rendering and styling. Geometry access
 * through the API is limited to getting the type and extent of the geometry.
 */
declare class RenderFeature {
    /**
     * @param {import("../geom/Geometry.js").Type} type Geometry type.
     * @param {Array<number>} flatCoordinates Flat coordinates. These always need
     *     to be right-handed for polygons.
     * @param {Array<number>|Array<Array<number>>} ends Ends or Endss.
     * @param {Object<string, *>} properties Properties.
     * @param {number|string|undefined} id Feature id.
     */
    constructor(type: import("../geom/Geometry.js").Type, flatCoordinates: Array<number>, ends: Array<number> | Array<Array<number>>, properties: {
        [x: string]: any;
    }, id: number | string | undefined);
    /**
     * @type {import("../style/Style.js").StyleFunction|undefined}
     */
    styleFunction: import("../style/Style.js").StyleFunction | undefined;
    /**
     * @private
     * @type {import("../extent.js").Extent|undefined}
     */
    private extent_;
    /**
     * @private
     * @type {number|string|undefined}
     */
    private id_;
    /**
     * @private
     * @type {import("../geom/Geometry.js").Type}
     */
    private type_;
    /**
     * @private
     * @type {Array<number>}
     */
    private flatCoordinates_;
    /**
     * @private
     * @type {Array<number>}
     */
    private flatInteriorPoints_;
    /**
     * @private
     * @type {Array<number>}
     */
    private flatMidpoints_;
    /**
     * @private
     * @type {Array<number>|Array<Array<number>>}
     */
    private ends_;
    /**
     * @private
     * @type {Object<string, *>}
     */
    private properties_;
    /**
     * Get a feature property by its key.
     * @param {string} key Key
     * @return {*} Value for the requested key.
     * @api
     */
    get(key: string): any;
    /**
     * Get the extent of this feature's geometry.
     * @return {import("../extent.js").Extent} Extent.
     * @api
     */
    getExtent(): import("../extent.js").Extent;
    /**
     * @return {Array<number>} Flat interior points.
     */
    getFlatInteriorPoint(): Array<number>;
    /**
     * @return {Array<number>} Flat interior points.
     */
    getFlatInteriorPoints(): Array<number>;
    /**
     * @return {Array<number>} Flat midpoint.
     */
    getFlatMidpoint(): Array<number>;
    /**
     * @return {Array<number>} Flat midpoints.
     */
    getFlatMidpoints(): Array<number>;
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is set when reading data from a remote source.
     * @return {number|string|undefined} Id.
     * @api
     */
    getId(): number | string | undefined;
    /**
     * @return {Array<number>} Flat coordinates.
     */
    getOrientedFlatCoordinates(): Array<number>;
    /**
     * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
     * determining the geometry type in style function (see {@link #getType}).
     * @return {RenderFeature} Feature.
     * @api
     */
    getGeometry(): RenderFeature;
    /**
     * @param {number} squaredTolerance Squared tolerance.
     * @return {RenderFeature} Simplified geometry.
     */
    getSimplifiedGeometry(squaredTolerance: number): RenderFeature;
    /**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
     * @return {RenderFeature} Simplified geometry.
     */
    simplifyTransformed(squaredTolerance: number, transform?: import("../proj.js").TransformFunction | undefined): RenderFeature;
    /**
     * Get the feature properties.
     * @return {Object<string, *>} Feature properties.
     * @api
     */
    getProperties(): {
        [x: string]: any;
    };
    /**
     * @return {number} Stride.
     */
    getStride(): number;
    /**
     * @return {import('../style/Style.js').StyleFunction|undefined} Style
     */
    getStyleFunction(): import('../style/Style.js').StyleFunction | undefined;
    /**
     * Get the type of this feature's geometry.
     * @return {import("../geom/Geometry.js").Type} Geometry type.
     * @api
     */
    getType(): import("../geom/Geometry.js").Type;
    /**
     * Transform geometry coordinates from tile pixel space to projected.
     *
     * @param {import("../proj.js").ProjectionLike} projection The data projection
     */
    transform(projection: import("../proj.js").ProjectionLike): void;
    /**
     * @return {Array<number>|Array<Array<number>>} Ends or endss.
     */
    getEnds(): Array<number> | Array<Array<number>>;
    getEndss: () => Array<number> | Array<Array<number>>;
    /**
     * @return {Array<number>} Flat coordinates.
     */
    getFlatCoordinates: () => Array<number>;
}
import { Point } from "../geom.js";
import { MultiPoint } from "../geom.js";
import { LineString } from "../geom.js";
import { MultiLineString } from "../geom.js";
import { Polygon } from "../geom.js";
import { MultiPolygon } from "../geom.js";
import Feature from "../Feature.js";
//# sourceMappingURL=Feature.d.ts.map