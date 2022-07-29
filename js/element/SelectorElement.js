// @ts-check

import FastSelectionModel from "../selection/FastSelectionModel"
import IElement from "./IElement"
import SelectorTemplate from "../template/SelectorTemplate"

/**
 * @extends {IElement<Object, SelectorTemplate>}
 */
export default class SelectorElement extends IElement {

    static properties = {
        initialPositionX: {
            type: Number,
            attribute: false,
        },
        initialPositionY: {
            type: Number,
            attribute: false,
        },
        finaPositionX: {
            type: Number,
            attribute: false,
        },
        finaPositionY: {
            type: Number,
            attribute: false,
        },
    }

    constructor() {
        super({}, new SelectorTemplate())
        this.selectionModel = null
        this.initialPositionX = 0
        this.initialPositionY = 0
        this.finaPositionX = 0
        this.finaPositionY = 0
    }
    /**
     * @param {Number[]} initialPosition
     */
    beginSelect(initialPosition) {
        this.blueprint.selecting = true
        this.initialPositionX = initialPosition[0]
        this.initialPositionY = initialPosition[1]
        this.finaPositionX = initialPosition[0]
        this.finaPositionY = initialPosition[1]
        this.selectionModel = new FastSelectionModel(
            initialPosition,
            this.blueprint.getNodes(),
            this.blueprint.nodeBoundariesSupplier,
            this.blueprint.nodeSelectToggleFunction
        )
    }

    /**
     * @param {Number[]} finalPosition
     */
    selectTo(finalPosition) {
        this.selectionModel.selectTo(finalPosition)
        this.finaPositionX = finalPosition[0]
        this.finaPositionY = finalPosition[1]
    }

    endSelect() {
        this.blueprint.selecting = false
        this.selectionModel = null
        this.initialPositionX = 0
        this.initialPositionY = 0
        this.finaPositionX = 0
        this.finaPositionY = 0
    }
}

customElements.define("ueb-selector", SelectorElement)
