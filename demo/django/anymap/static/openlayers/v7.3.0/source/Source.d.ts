export default Source;
/**
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */
export type State = 'undefined' | 'loading' | 'ready' | 'error';
/**
 * A function that takes a {@link import ("../View.js").ViewStateAndExtent} and returns a string or
 * an array of strings representing source attributions.
 */
export type Attribution = (arg0: import("../View.js").ViewStateAndExtent) => (string | Array<string>);
/**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module :ol/source/Source~Attribution})
 */
export type AttributionLike = string | Array<string> | Attribution;
export type Options = {
    /**
     * Attributions.
     */
    attributions?: AttributionLike | undefined;
    /**
     * Attributions are collapsible.
     */
    attributionsCollapsible?: boolean | undefined;
    /**
     * Projection. Default is the view projection.
     */
    projection?: import("../proj.js").ProjectionLike;
    /**
     * State.
     */
    state?: State | undefined;
    /**
     * WrapX.
     */
    wrapX?: boolean | undefined;
    /**
     * Use interpolated values when resampling.  By default,
     * the nearest neighbor is used when resampling.
     */
    interpolate?: boolean | undefined;
};
/**
 * @typedef {'undefined' | 'loading' | 'ready' | 'error'} State
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */
/**
 * A function that takes a {@link import("../View.js").ViewStateAndExtent} and returns a string or
 * an array of strings representing source attributions.
 *
 * @typedef {function(import("../View.js").ViewStateAndExtent): (string|Array<string>)} Attribution
 */
/**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 */
/**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("./Source.js").State} [state='ready'] State.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 */
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */
declare class Source extends BaseObject {
    /**
     * @param {Options} options Source options.
     */
    constructor(options: Options);
    /**
     * @protected
     * @type {import("../proj/Projection.js").default|null}
     */
    protected projection: import("../proj/Projection.js").default | null;
    /**
     * @private
     * @type {?Attribution}
     */
    private attributions_;
    /**
     * @private
     * @type {boolean}
     */
    private attributionsCollapsible_;
    /**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */
    loading: boolean;
    /**
     * @private
     * @type {import("./Source.js").State}
     */
    private state_;
    /**
     * @private
     * @type {boolean}
     */
    private wrapX_;
    /**
     * @private
     * @type {boolean}
     */
    private interpolate_;
    /**
     * @protected
     * @type {function(import("../View.js").ViewOptions):void}
     */
    protected viewResolver: (arg0: import("../View.js").ViewOptions) => void;
    /**
     * @protected
     * @type {function(Error):void}
     */
    protected viewRejector: (arg0: Error) => void;
    /**
     * @private
     * @type {Promise<import("../View.js").ViewOptions>}
     */
    private viewPromise_;
    /**
     * Get the attribution function for the source.
     * @return {?Attribution} Attribution function.
     * @api
     */
    getAttributions(): Attribution | null;
    /**
     * @return {boolean} Attributions are collapsible.
     * @api
     */
    getAttributionsCollapsible(): boolean;
    /**
     * Get the projection of the source.
     * @return {import("../proj/Projection.js").default|null} Projection.
     * @api
     */
    getProjection(): import("../proj/Projection.js").default | null;
    /**
     * @param {import("../proj/Projection").default} [projection] Projection.
     * @return {Array<number>|null} Resolutions.
     */
    getResolutions(projection?: import("../proj/Projection.js").default | undefined): Array<number> | null;
    /**
     * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
     */
    getView(): Promise<import("../View.js").ViewOptions>;
    /**
     * Get the state of the source, see {@link import("./Source.js").State} for possible states.
     * @return {import("./Source.js").State} State.
     * @api
     */
    getState(): import("./Source.js").State;
    /**
     * @return {boolean|undefined} Wrap X.
     */
    getWrapX(): boolean | undefined;
    /**
     * @return {boolean} Use linear interpolation when resampling.
     */
    getInterpolate(): boolean;
    /**
     * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
     * @api
     */
    refresh(): void;
    /**
     * Set the attributions of the source.
     * @param {AttributionLike|undefined} attributions Attributions.
     *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
     *     or `undefined`.
     * @api
     */
    setAttributions(attributions: AttributionLike | undefined): void;
    /**
     * Set the state of the source.
     * @param {import("./Source.js").State} state State.
     */
    setState(state: import("./Source.js").State): void;
}
import BaseObject from "../Object.js";
//# sourceMappingURL=Source.d.ts.map