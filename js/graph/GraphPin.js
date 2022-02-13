import GraphElement from "./GraphElement"
import PinTemplate from "../template/PinTemplate"
import MouseCreateLink from "../input/mouse/MouseCreateLink"

export default class GraphPin extends GraphElement {

    constructor(entity) {
        super(entity, new PinTemplate())
        /** @type {import("../entity/PinEntity").default} */
        this.entity
        /** @type {PinTemplate} */
        this.template
        /** @type {HTMLElement} */
        this.clickableElement = null
    }

    createInputObjects() {
        return [
            new MouseCreateLink(this.clickableElement, this.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            }),
        ]
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

    /**
     * Returns The exact location where the link originates from or arrives at.
     * @returns {Number[]} The location array
     */
    getLinkLocation() {
        return this.template.getLinkLocation(this)
    }

    getGraphNode() {
        return this.closest("ueb-node")
    }
}

customElements.define("ueb-pin", GraphPin)
