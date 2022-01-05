import GraphElement from "./GraphElement"
import LinkTemplate from "../template/LinkTemplate"
import GraphPin from "./GraphPin"


/**
 * @type {import("./GraphPin").default} GraphPin
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
        super(this, new LinkTemplate())
        /** @type {import("../template/LinkTemplate").default} */
        this.template
        this.setSource(source)
        this.setDestination(destination)
    }

    setSourceLocation(location) {
        this.template.applySourceLocation(this.#source.getLinkLocation())
    }

    setDestinationLocation(location) {
        this.template.applyDestinationLocation(this.#destination.getLinkLocation())
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
    }
}

customElements.define("ueb-link", GraphLink)
