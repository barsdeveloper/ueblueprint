import ITouchDrag from "./ITouchDrag.js"

/**
 * @typedef {import("../../Blueprint.js").default} Blueprint
 * @typedef {import("../../element/IElement.js").default} IElement
 * @typedef {import("../IPointing.js").TouchLocations } TouchLocations
 */

export default class TouchScrollGraph extends ITouchDrag {

    /**
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(blueprint, options = {}) {
        options.consumeEvent ??= true
        options.touchpointsCount ??= 1
        options.stepSize ??= 1
        options.ignoreTranslateCompensate ??= true
        super(blueprint.getGridDOMElement(), blueprint, options)
    }

    startDrag() {
        this.blueprint.scrolling = true
    }

    /**
     * @param {TouchLocations} locations
     * @param {TouchLocations} offsets
     */
    dragTo(locations, offsets) {
        const offset = Object.values(offsets)[0]
        this.blueprint.scrollDelta(-offset[0], -offset[1])
    }

    endDrag() {
        this.blueprint.scrolling = false
    }
}
