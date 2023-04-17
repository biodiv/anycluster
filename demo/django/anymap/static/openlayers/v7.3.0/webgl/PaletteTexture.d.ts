export default PaletteTexture;
/**
 * @module ol/webgl/PaletteTexture
 */
declare class PaletteTexture {
    /**
     * @param {string} name The name of the texture.
     * @param {Uint8Array} data The texture data.
     */
    constructor(name: string, data: Uint8Array);
    name: string;
    data: Uint8Array;
    /**
     * @type {WebGLTexture}
     * @private
     */
    private texture_;
    /**
     * @param {WebGLRenderingContext} gl Rendering context.
     * @return {WebGLTexture} The texture.
     */
    getTexture(gl: WebGLRenderingContext): WebGLTexture;
}
//# sourceMappingURL=PaletteTexture.d.ts.map