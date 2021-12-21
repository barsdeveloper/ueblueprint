import GraphElement from "./GraphElement"
import PinTemplate from "../template/PinTemplate"
import DragLink from "../input/DragLink"

export default class GraphPin extends GraphElement {

    constructor(entity) {
        super(entity, new PinTemplate())
        /** @type {import("../entity/PinEntity").default} */
        this.entity
        /** @type {HTMLElement} */
        this.clickableElement = null
    }

    connectedCallback() {
        super.connectedCallback()
        new DragLink(this.clickableElement, this.blueprint, {
            moveEverywhere: true
        })
    }

    /**
     * 
     * @returns {String}
     */
    getPinDisplayName() {
        return this.entity.PinName
    }

    getAttributes() {
        return PinEntity.attributes
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    isConnected() {
        return this.entity.isConnected()
    }

    getType() {
        return this.entity.getType()
    }
}

customElements.define("ueb-pin", GraphPin)
