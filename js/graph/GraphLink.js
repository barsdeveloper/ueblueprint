import GraphElement from "./GraphElement"
import LinkTemplate from "../template/LinkTemplate"
import Configuration from "../Configuration"


/**
 * @typedef {import("./GraphPin").default} GraphPin
 */
export default class GraphLink extends GraphElement {
    /** @type {GraphPin} */
    #source
    /** @type {GraphPin} */
    #destination
    #nodeDeleteHandler
    #nodeDragSourceHandler
    #nodeDragDestinatonHandler

    /**
     * @param {?GraphPin} source
     * @param {?GraphPin} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate())
        /** @type {import("../template/LinkTemplate").default} */
        this.template
        /** @type {SVGPathElement} */
        this.pathElement = null
        this.originatesFromInput = false
        this.sourceLocation = [0, 0]
        this.destinationLocation = [0, 0]
        const self = this
        this.#nodeDeleteHandler = _ => self.blueprint.removeGraphElement(self)
        this.#nodeDragSourceHandler = e => self.addSourceLocation(e.detail.value)
        this.#nodeDragDestinatonHandler = e => self.addDestinationLocation(e.detail.value)
        this.setSourcePin(source)
        this.setDestinationPin(destination)
    }

    /**
     * 
     * @returns {Number[]} 
     */
    getSourceLocation() {
        return this.sourceLocation
    }

    /**
     * 
     * @param {Number[]} offset 
     */
    addSourceLocation(offset) {
        const location = [
            this.sourceLocation[0] + offset[0],
            this.sourceLocation[1] + offset[1]
        ]
        this.sourceLocation = location
        this.template.applyFullLocation(this)
    }

    /**
     * 
     * @param {Number[]} location 
     */
    setSourceLocation(location) {
        if (location == null) {
            location = this.#source.template.getLinkLocation(this.#source)
        }
        this.sourceLocation = location
        this.template.applySourceLocation(this)
    }

    /**
     * 
     * @returns {Number[]}
     */
    getDestinationLocation() {
        return this.destinationLocation
    }

    /**
     * 
     * @param {Number[]} offset 
     */
    addDestinationLocation(offset) {
        const location = [
            this.destinationLocation[0] + offset[0],
            this.destinationLocation[1] + offset[1]
        ]
        this.setDestinationLocation(location)
    }

    /**
     * 
     * @param {Number[]} location 
     */
    setDestinationLocation(location) {
        if (location == null) {
            location = this.#destination.template.getLinkLocation(this.#destination)
        }
        this.destinationLocation = location
        this.template.applyFullLocation(this)
    }


    /**
     * 
     * @returns {GraphPin}
     */
    getSourcePin() {
        return this.#source
    }

    /**
     * @param {GraphPin} graphPin 
     */
    setSourcePin(graphPin) {
        if (this.#source) {
            const nodeElement = this.#source.getGraphNode()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragEventName, this.#nodeDragSourceHandler)
        }
        this.#source = graphPin
        if (this.#source) {
            const nodeElement = this.#source.getGraphNode()
            this.originatesFromInput = graphPin.isInput()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragEventName, this.#nodeDragSourceHandler)
            this.setSourceLocation()
        }
    }

    /**
     * 
     * @returns {GraphPin}
     */
    getDestinationPin() {
        return this.#destination
    }

    /**
     * 
     * @param {GraphPin} graphPin 
     */
    setDestinationPin(graphPin) {
        if (this.#destination) {
            const nodeElement = this.#source.getGraphNode()
            nodeElement.removeEventListener(Configuration.nodeDragEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragEventName, this.#nodeDragDestinatonHandler)
        }
        this.#destination = graphPin
        if (this.#destination) {
            const nodeElement = this.#source.getGraphNode()
            nodeElement.addEventListener(Configuration.nodeDragEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragEventName, this.#nodeDragDestinatonHandler)
        }
    }
}

customElements.define("ueb-link", GraphLink)
