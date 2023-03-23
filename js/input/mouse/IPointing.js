import IInput from "../IInput.js"
import Utility from "../../Utility.js"

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
    locationFromEvent(mouseEvent) {
        const location = Utility.convertLocation(
            [mouseEvent.clientX, mouseEvent.clientY],
            this.movementSpace,
            this.options.ignoreScale
        )
        return this.options.ignoreTranslateCompensate
            ? location
            : this.blueprint.compensateTranslation(location[0], location[1])
    }
}
