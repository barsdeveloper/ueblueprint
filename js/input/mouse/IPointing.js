// @ts-check

import IInput from "../IInput"
import Utility from "../../Utility"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 */

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
export default class IPointing extends IInput {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document.documentElement
    }

    /**
     * @param {MouseEvent} mouseEvent
     */
    locationFromEvent(mouseEvent) {
        return this.blueprint.compensateTranslation(
            Utility.convertLocation(
                [mouseEvent.clientX, mouseEvent.clientY],
                this.movementSpace
            )
        )
    }
}
