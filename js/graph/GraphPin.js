import GraphElement from "./GraphElement"
import PinTemplate from "../template/PinTemplate"

export default class GraphPin extends GraphElement {

    constructor(entity) {
        super(entity, new PinTemplate())
        /** @type {import("../entity/PinEntity").default} */
        this.entity
    }

    connectedCallback() {
        super.connectedCallback()
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

customElements.define("u-pin", GraphPin)
