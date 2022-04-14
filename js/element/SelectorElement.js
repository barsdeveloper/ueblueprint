// @ts-check

import FastSelectionModel from "../selection/FastSelectionModel"
import IElement from "./IElement"
import SelectorTemplate from "../template/SelectorTemplate"

/**
 * @extends {IElement<Object, SelectorTemplate>}
 */
export default class SelectorElement extends IElement {

    constructor() {
        super({}, new SelectorTemplate())
        this.selectionModel = null
    }

    /**
     * @param {Number[]} initialPosition
     */
    startSelecting(initialPosition) {
        this.template.applyStartSelecting(this, initialPosition)
        this.selectionModel = new FastSelectionModel(initialPosition, this.blueprint.getNodes(), this.blueprint.nodeBoundariesSupplier, this.blueprint.nodeSelectToggleFunction)
    }

    /**
     * @param {Number[]} finalPosition
     */
    doSelecting(finalPosition) {
        this.template.applyDoSelecting(this, finalPosition)
        this.selectionModel.selectTo(finalPosition)
    }

    finishSelecting() {
        this.template.applyFinishSelecting(this)
        this.selectionModel = null
    }
}

customElements.define("ueb-selector", SelectorElement)
