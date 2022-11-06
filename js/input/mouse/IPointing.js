import IInput from "../IInput"
import Utility from "../../Utility"

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
export default class IPointing extends IInput {

    constructor(target, blueprint, options = {}) {
        options.ignoreTranslateCompensate ??= false
        options.movementSpace ??= blueprint.getGridDOMElement() ?? document.documentElement
        super(target, blueprint, options)
        this.movementSpace = options.movementSpace
    }

    /** @param {MouseEvent} mouseEvent */
    locationFromEvent(mouseEvent) {
        const location = Utility.convertLocation(
            [mouseEvent.clientX, mouseEvent.clientY],
            this.movementSpace
        )
        return this.options.ignoreTranslateCompensate
            ? location
            : this.blueprint.compensateTranslation(location)
    }
}
