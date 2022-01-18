import GraphElement from "./GraphElement"
import LinkTemplate from "../template/LinkTemplate"


/**
 * @typedef {import("./GraphPin").default} GraphPin
 */
export default class GraphLink extends GraphElement {

    /** @type {GraphPin} */
    #source
    /** @type {GraphPin} */
    #destination
    #nodeDeleteHandler = _ => this.blueprint.removeGraphElement(this)
    #nodeDragSourceHandler = _ => this.setSourceLocation(this.#source.getLinkLocation())
    #nodeDragDestinatonHandler = _ => this.setDestinationLocation(this.#destination.getLinkLocation())

    /**
     * @param {?GraphPin} source
     * @param {?GraphPin} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate())
        /** @type {import("../template/LinkTemplate").default} */
        this.template
        this.setSourcePin(source)
        this.setDestinationPin(destination)
    }

    setSourceLocation(location) {
        if (location == null) {
            location = this.#source.template.getLinkLocation(this.#source)
        }
        this.template.applySourceLocation(this, location)
    }

    setDestinationLocation(location) {
        if (location == null) {
            location = this.#destination.template.getLinkLocation(this.#destination)
        }
        this.template.applyDestinationLocation(this, location)
    }


    getSourcePin() {
        return this.#source
    }

    /**
     * @param {GraphPin} graphPin 
     */
    setSourcePin(graphPin) {
        this.#source?.removeEventListener("ueb-node-delete", this.#nodeDeleteHandler)
        this.#source?.removeEventListener("ueb-node-drag", this.#nodeDragSourceHandler)
        this.#source = graphPin
        this.#source?.addEventListener("ueb-node-delete", this.#nodeDeleteHandler)
        this.#source?.addEventListener("ueb-node-drag", this.#nodeDragSourceHandler)
        this.setSourceLocation()
        this.originatesFromInput = this.#destination == null
    }

    getDestinationPin() {
        return this.#destination
    }

    /**
     * 
     * @param {GraphPin} graphPin 
     */
    setDestinationPin(graphPin) {
        this.#destination?.removeEventListener("ueb-node-delete", this.#nodeDeleteHandler)
        this.#destination?.removeEventListener("ueb-node-drag", this.#nodeDragDestinatonHandler)
        this.#destination = graphPin
        this.#destination?.addEventListener("ueb-node-delete", this.#nodeDeleteHandler)
        this.#destination?.addEventListener("ueb-node-drag", this.#nodeDragDestinatonHandler)
        this.originatesFromInput = false
    }
}

customElements.define("ueb-link", GraphLink)
