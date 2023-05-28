import IInput from "./IInput.js"
import Utility from "../Utility.js"

/** @typedef {{ [identifier: Number]: [Number, Number] }} TouchLocations */

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
export default class IPointing extends IInput {

    constructor(target, blueprint, options = {}) {
        options.ignoreTranslateCompensate ??= false
        options.ignoreScale ??= false
        options.movementSpace ??= blueprint.getGridDOMElement() ?? document.documentElement
        super(target, blueprint, options)
        /** @type {HTMLElement} */
        this.movementSpace = options.movementSpace
    }

    /** @param {MouseEvent} mouseEvent */
    locationFromMouseEvent(mouseEvent) {
        const location = Utility.convertLocation(
            [mouseEvent.clientX, mouseEvent.clientY],
            this.movementSpace,
            this.options.ignoreScale
        )
        return this.options.ignoreTranslateCompensate
            ? location
            : this.blueprint.compensateTranslation(location[0], location[1])
    }

    /** @param {TouchEvent} touchEvent */
    locationsFromTouchEvent(touchEvent) {
        /** @type {TouchLocations} */
        const locations = {}
        for (const touch of touchEvent.touches) {
            locations[touch.identifier] = Utility.convertLocation(
                [touch.clientX, touch.clientY],
                this.movementSpace,
                this.options.ignoreScale
            )
            if (!this.options.ignoreTranslateCompensate) {
                locations[touch.identifier] = this.blueprint.compensateTranslation(location[0], location[1])
            }
        }
        return locations
    }
}
