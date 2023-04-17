export default JSONFeature;
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for JSON feature formats.
 *
 * @abstract
 */
declare class JSONFeature extends FeatureFormat {
    /**
     * Read a feature.  Only works for a single feature. Use `readFeatures` to
     * read a feature collection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @return {import("../Feature.js").default} Feature.
     * @api
     */
    readFeature(source: ArrayBuffer | Document | Element | any | string, options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * Read all features.  Works with both a single feature and a feature
     * collection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @return {Array<import("../Feature.js").default>} Features.
     * @api
     */
    readFeatures(source: ArrayBuffer | Document | Element | any | string, options?: import("./Feature.js").ReadOptions | undefined): Array<import("../Feature.js").default>;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {import("../Feature.js").default} Feature.
     */
    protected readFeatureFromObject(object: any, options?: import("./Feature.js").ReadOptions | undefined): import("../Feature.js").default;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {Array<import("../Feature.js").default>} Features.
     */
    protected readFeaturesFromObject(object: any, options?: import("./Feature.js").ReadOptions | undefined): Array<import("../Feature.js").default>;
    /**
     * @abstract
     * @param {Object} object Object.
     * @param {import("./Feature.js").ReadOptions} [options] Read options.
     * @protected
     * @return {import("../geom/Geometry.js").default} Geometry.
     */
    protected readGeometryFromObject(object: any, options?: import("./Feature.js").ReadOptions | undefined): import("../geom/Geometry.js").default;
    /**
     * Read the projection.
     *
     * @param {ArrayBuffer|Document|Element|Object|string} source Source.
     * @return {import("../proj/Projection.js").default} Projection.
     * @api
     */
    readProjection(source: ArrayBuffer | Document | Element | any | string): import("../proj/Projection.js").default;
    /**
     * @abstract
     * @param {Object} object Object.
     * @protected
     * @return {import("../proj/Projection.js").default} Projection.
     */
    protected readProjectionFromObject(object: any): import("../proj/Projection.js").default;
    /**
     * Encode a feature as string.
     *
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded feature.
     * @api
     */
    writeFeature(feature: import("../Feature.js").default, options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../Feature.js").default} feature Feature.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {Object} Object.
     */
    writeFeatureObject(feature: import("../Feature.js").default, options?: import("./Feature.js").WriteOptions | undefined): any;
    /**
     * Encode an array of features as string.
     *
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded features.
     * @api
     */
    writeFeatures(features: Array<import("../Feature.js").default>, options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {Array<import("../Feature.js").default>} features Features.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {Object} Object.
     */
    writeFeaturesObject(features: Array<import("../Feature.js").default>, options?: import("./Feature.js").WriteOptions | undefined): any;
    /**
     * Encode a geometry as string.
     *
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {string} Encoded geometry.
     * @api
     */
    writeGeometry(geometry: import("../geom/Geometry.js").default, options?: import("./Feature.js").WriteOptions | undefined): string;
    /**
     * @abstract
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @param {import("./Feature.js").WriteOptions} [options] Write options.
     * @return {Object} Object.
     */
    writeGeometryObject(geometry: import("../geom/Geometry.js").default, options?: import("./Feature.js").WriteOptions | undefined): any;
}
import FeatureFormat from "./Feature.js";
//# sourceMappingURL=JSONFeature.d.ts.map