import Configuration from "../Configuration"
import IElement from "./IElement"
import LinkTemplate from "../template/LinkTemplate"

/**
 * @typedef {import("./PinElement").default} PinElement
 * @typedef {import("./LinkMessageElement").default} LinkMessageElement
 */
export default class LinkElement extends IElement {

    static tagName = "ueb-link"
    /** @type {PinElement} */
    #source
    /** @type {PinElement} */
    #destination
    #nodeDeleteHandler
    #nodeDragSourceHandler
    #nodeDragDestinatonHandler
    sourceLocation = [0, 0]
    /** @type {SVGPathElement} */
    pathElement
    /** @type {LinkMessageElement} */
    linkMessageElement
    originatesFromInput = false
    destinationLocation = [0, 0]

    /**
     * @param {?PinElement} source
     * @param {?PinElement} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate())
        /** @type {import("../template/LinkTemplate").default} */
        this.template
        const self = this
        this.#nodeDeleteHandler = _ => self.remove()
        this.#nodeDragSourceHandler = e => self.addSourceLocation(e.detail.value)
        this.#nodeDragDestinatonHandler = e => self.addDestinationLocation(e.detail.value)
        if (source) {
            this.setSourcePin(source)
        }
        if (destination) {
            this.setDestinationPin(destination)
        }
    }

    /**
     * @returns {Number[]}
     */
    getSourceLocation() {
        return this.sourceLocation
    }

    /**
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
     * @returns {Number[]}
     */
    getDestinationLocation() {
        return this.destinationLocation
    }

    /**
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
     * @returns {PinElement}
     */
    getSourcePin() {
        return this.#source
    }

    /**
     * @param {PinElement} pin
     */
    setSourcePin(pin) {
        if (this.#source) {
            const nodeElement = this.#source.getNodeElement()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
        }
        this.#source = pin
        if (this.#source) {
            const nodeElement = this.#source.getNodeElement()
            this.originatesFromInput = pin.isInput()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
            this.setSourceLocation()
        }
    }

    /**
     * @returns {PinElement}
     */
    getDestinationPin() {
        return this.#destination
    }

    /**
     * @param {PinElement} pin
     */
    setDestinationPin(pin) {
        if (this.#destination) {
            const nodeElement = this.#destination.getNodeElement()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler)
        }
        this.#destination = pin
        if (this.#destination) {
            const nodeElement = this.#destination.getNodeElement()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler)
            this.setDestinationLocation()
        }
    }

    /**
     * @param {LinkMessageElement} linkMessage
     */
    setLinkMessage(linkMessage) {
        if (linkMessage) {
            this.template.applyLinkMessage(this, linkMessage)
        } else if (this.linkMessageElement) {
            this.linkMessageElement.remove()
            this.linkMessageElement = null
        }
    }

    startDragging() {
        this.template.applyStartDragging(this)
    }

    finishDragging() {
        this.template.applyFinishDragging(this)
    }
}

customElements.define(LinkElement.tagName, LinkElement)
