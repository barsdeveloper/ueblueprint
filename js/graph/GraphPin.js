import GraphElement from "./GraphElement"
import PinTemplate from "../template/PinTemplate"
import DragLink from "../input/DragLink"
import GraphLink from "./GraphLink"

export default class GraphPin extends GraphElement {

    constructor(entity) {
        super(entity, new PinTemplate())
        /** @type {import("../entity/PinEntity").default} */
        this.entity
        /** @type {HTMLElement} */
        this.clickableElement = null
    }

    createInputObjects() {
        return [
            new DragLink(this.clickableElement, this.blueprint, {
                moveEverywhere: true
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
     * 
     * @returns {GraphLink} The link created
     */
    dragLink() {
        let link = new GraphLink(this)
        return link
    }

    /**
     * Returns The exact location where the link originates from or arrives at.
     * @returns {Number[]} The location array
     */
    getLinkLocation() {
        return [0, 0];
    }
}

customElements.define("ueb-pin", GraphPin)
