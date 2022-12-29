import FastSelectionModel from "../selection/FastSelectionModel"
import IFromToPositionedElement from "./IFromToPositionedElement"
import SelectorTemplate from "../template/SelectorTemplate"

/** @typedef {import("../Blueprint").BlueprintConstructor} BlueprintConstructor */

/** @extends {IFromToPositionedElement<Object, SelectorTemplate>} */
export default class SelectorElement extends IFromToPositionedElement {

    /** @type {FastSelectionModel} */
    selectionModel = null

    constructor() {
        super()
        super.initialize({}, new SelectorTemplate())
    }

    static newObject() {
        return new SelectorElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }

    /** @param {Number[]} initialPosition */
    beginSelect(initialPosition) {
        const blueprintConstructor = /** @type {BlueprintConstructor} */(this.blueprint.constructor)
        this.blueprint.selecting = true
        this.setBothLocations(initialPosition)
        this.selectionModel = new FastSelectionModel(
            initialPosition,
            this.blueprint.getNodes(),
            blueprintConstructor.nodeBoundariesSupplier,
            blueprintConstructor.nodeSelectToggleFunction
        )
    }

    /** @param {Number[]} finalPosition */
    selectTo(finalPosition) {
        this.selectionModel.selectTo(finalPosition)
        this.toX = finalPosition[0]
        this.toY = finalPosition[1]
    }

    endSelect() {
        this.blueprint.selecting = false
        this.selectionModel = null
        this.fromX = 0
        this.fromY = 0
        this.toX = 0
        this.toY = 0
    }
}
