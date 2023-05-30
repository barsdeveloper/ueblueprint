import IInput from "../IInput.js"
import Utility from "../../Utility.js"

/** @typedef {{ [identifier: Number]: [Number, Number] }} TouchLocations */

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
export default class ITouch extends IInput {

    /** @type {TouchLocations} */
    touches = {}

    constructor(target, blueprint, options = {}) {
        options.ignoreTranslateCompensate ??= false
        options.ignoreScale ??= false
        options.movementSpace ??= blueprint.getGridDOMElement() ?? document.documentElement
        super(target, blueprint, options)
        /** @type {HTMLElement} */
        this.movementSpace = options.movementSpace
    }

    /** @param {TouchEvent} event */
    locationsFromEvent(event) {
        /** @type {TouchLocations} */
        const locations = {}
        for (const touch of event.touches) {
            if (touch.identifier in this.touches) {
                continue
            }
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

    /** @param {TouchEvent} touchEvent  */
    clientLocationsFromEvent(touchEvent) {
        /** @type {TouchLocations} */
        const locations = {}
        for (const touch of touchEvent.touches) {
            if (touch.identifier in this.touches) {
                continue
            }
            locations[touch.identifier] = [touch.clientX, touch.clientY]
        }
        return locations
    }
}
