// @ts-check

import IContext from "../IContext"
import Utility from "../../Utility"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 */

/**
 * @template {HTMLElement} T
 * @extends {IContext<T>}
 */
export default class IPointing extends IContext {

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
