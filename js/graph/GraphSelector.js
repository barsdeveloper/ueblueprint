import FastSelectionModel from "../selection/FastSelectionModel"
import GraphEntity from "./GraphEntity"
import Template from "../template/Template"

export default class GraphSelector extends GraphEntity {

    constructor() {
        super(new Template())
        /**
         * @type {import("./GraphSelector").default}
         */
        this.selectionModel = null
    }

    connectedCallback() {
        super.connectedCallback()
        this.classList.add('ueb-selector')
        this.dataset.selecting = "false"
    }

    /**
     * Create a selection rectangle starting from the specified position
     * @param {number[]} initialPosition - Selection rectangle initial position (relative to the .ueb-grid element)
     */
    startSelecting(initialPosition) {
        initialPosition = this.blueprint.compensateTranslation(initialPosition)
        // Set initial position
        this.style.setProperty('--ueb-select-from-x', initialPosition[0])
        this.style.setProperty('--ueb-select-from-y', initialPosition[1])
        // Final position coincide with the initial position, at the beginning of selection
        this.style.setProperty('--ueb-select-to-x', initialPosition[0])
        this.style.setProperty('--ueb-select-to-y', initialPosition[1])
        this.dataset.selecting = "true"
        this.selectionModel = new FastSelectionModel(initialPosition, this.blueprint.nodes, this.blueprint.nodeBoundariesSupplier, this.blueprint.nodeSelectToggleFunction)
    }

    /**
     * Move selection rectagle to the specified final position. The initial position was specified by startSelecting()
     * @param {number[]} finalPosition - Selection rectangle final position (relative to the .ueb-grid element)
     */
    doSelecting(finalPosition) {
        finalPosition = this.blueprint.compensateTranslation(finalPosition)
        this.style.setProperty('--ueb-select-to-x', finalPosition[0])
        this.style.setProperty('--ueb-select-to-y', finalPosition[1])
        this.selectionModel.selectTo(finalPosition)
    }

    finishSelecting() {
        this.dataset.selecting = "false"
        this.selectionModel = null
    }
}

customElements.define('u-selector', GraphSelector)
