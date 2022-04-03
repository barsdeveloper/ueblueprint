// @ts-check

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
    get sourcePin() {
        return this.#source
    }
    set sourcePin(pin) {
        if (this.#source) {
            const nodeElement = this.#source.getNodeElement()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
            if (this.#destination) {
                this.#unlinkPins()
            }
        }
        this.#source = pin
        if (this.#source) {
            const nodeElement = this.#source.getNodeElement()
            this.originatesFromInput = pin.isInput()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
            this.setSourceLocation()
            if (this.#destination) {
                this.#linkPins()
            }
        }
    }

    /** @type {PinElement} */
    #destination
    get destinationPin() {
        return this.#destination
    }
    set destinationPin(pin) {
        if (this.#destination) {
            const nodeElement = this.#destination.getNodeElement()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler)
            if (this.#source) {
                this.#unlinkPins()
            }
        }
        this.#destination = pin
        if (this.#destination) {
            const nodeElement = this.#destination.getNodeElement()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler)
            this.setDestinationLocation()
            if (this.#source) {
                this.#linkPins()
            }
        }
    }

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
     * @param {PinElement} source
     * @param {PinElement} destination
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
            this.sourcePin = source
        }
        if (destination) {
            this.destinationPin = destination
        }
        if (source && destination) {
            this.#linkPins()
        }
    }

    #linkPins() {
        this.#source.linkTo(this.#destination)
        this.#destination.linkTo(this.#source)
    }

    #unlinkPins() {
        if (this.#source && this.#destination) {
            this.#source.unlinkFrom(this.#destination)
            this.#destination.unlinkFrom(this.#source)
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.#unlinkPins()
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
    setSourceLocation(location = null) {
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
    setDestinationLocation(location = null) {
        if (location == null) {
            location = this.#destination.template.getLinkLocation(this.#destination)
        }
        this.destinationLocation = location
        this.template.applyFullLocation(this)
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
