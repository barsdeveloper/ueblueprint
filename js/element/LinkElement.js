// @ts-check

import Configuration from "../Configuration"
import IElement from "./IElement"
import LinkTemplate from "../template/LinkTemplate"
import PinElement from "./PinElement"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @extends {IElement<Object, LinkTemplate>}
 */
export default class LinkElement extends IElement {

    static properties = {
        source: {
            type: PinElement,
            reflect: true,
        },
        destination: {
            type: PinElement,
            reflect: true,
        },
        creatingLink: {
            type: Boolean,
            attribute: false,
        },
        originatesFromInput: {
            type: Boolean,
            attribute: false,
        },
        sourceLocationX: {
            type: Number,
            attribute: false,
        },
        sourceLocationY: {
            attribute: false,
            type: Number,
        },
        destinationLocationX: {
            type: Number,
            attribute: false,
        },
        destinationLocationY: {
            type: Number,
            attribute: false,
        },
        startPercentage: {
            type: Number,
            attribute: false,
        },
        startPixels: {
            type: Number,
            attribute: false,
        },
        svgPathD: {
            type: String,
            attribute: false,
        },
        linkMessageIcon: {
            type: String,
            attribute: false,
        },
        linkMessageText: {
            type: String,
            attribute: false,
        },
    }

    /** @type {PinElement} */
    #source
    get sourcePin() {
        return this.#source
    }
    set sourcePin(pin) {
        this.template.applyPins(this)
    }

    /** @type {PinElement} */
    #destination
    get destinationPin() {
        return this.#destination
    }
    set destinationPin(pin) {
        if (this.#destination == pin) {
            return
        }
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
        this.template.applyPins(this)
    }

    #nodeDeleteHandler
    #nodeDragSourceHandler
    #nodeDragDestinatonHandler
    sourceLocation = [0, 0]
    /** @type {SVGPathElement} */
    pathElement
    destinationLocation = [0, 0]

    /**
     * @param {PinElement} source
     * @param {PinElement} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate())
        const self = this
        this.#nodeDeleteHandler = () => self.remove()
        this.#nodeDragSourceHandler = e => self.addSourceLocation(e.detail.value)
        this.#nodeDragDestinatonHandler = e => self.addDestinationLocation(e.detail.value)
        this.source = null
        this.destination = null
        this.creatingLink = false
        this.originatesFromInput = false
        this.sourceLocationX = 0
        this.sourceLocationY = 0
        this.destinationLocationX = 0
        this.destinationLocationY = 0
        this.startPercentage = 0
        this.startPixels = 0
        this.svgPathD = ""
        this.linkMessageIcon = ""
        this.linkMessageText = ""
        if (source) {
            this.svgPathD = ""
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
     * @param {Map} changedProperties
     */
    willUpdate(changedProperties) {
        if (changedProperties.has("sourcePin")) {
            /** @type {PinElement} */
            const oldSourcePin = changedProperties.get("sourcePin")
            if (oldSourcePin) {

                const nodeElement = oldSourcePin.getNodeElement()
                nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
                nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
                if (this.#destination) {
                    this.#unlinkPins()
                }
            }
            if (this.source) {
                const nodeElement = this.source.getNodeElement()
                this.originatesFromInput = pin.isInput()
                nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
                nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
                this.setSourceLocation()
                if (this.#destination) {
                    this.#linkPins()
                }
            }
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
    setSourceLocation(location = null) {
        if (location == null) {
            location = this.#source.template.getLinkLocation(this.#source)
        }
        this.sourceLocation = location
    }

    getDestinationLocation() {
        return this.destinationLocation
    }

    /**
     * @param {Number[]} offset
     */
    addDestinationLocation(offset) {
        const location = [
            this.destinationLocationX + offset[0],
            this.destinationLocationY + offset[1]
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
        this.destinationLocationX = location[0]
        this.destinationLocationY = location[1]
    }

    startDragging() {
        this.creatingLink = true
    }

    finishDragging() {
        this.creatingLink = false
    }

    removeMessage() {
        this.linkMessageIcon = ""
        this.linkMessageText = ""
    }

    setMessageConvertType() {
        this.linkMessageIcon = "ueb-icon-conver-type"
        this.linkMessageText = `Convert ${this.sourcePin.getType()} to ${this.destinationPin.getType()}.`
    }

    setMessageCorrect() {
        this.linkMessageIcon = "ueb-icon-correct"
        this.linkMessageText = ""
    }

    setMessageDirectionsIncompatible() {
        this.linkMessageIcon = "ueb-icon-directions-incompatible"
        this.linkMessageText = "Directions are not compatbile."
    }

    setMessagePlaceNode() {
        this.linkMessageIcon = "ueb-icon-place-node"
        this.linkMessageText = "Place a new node."
    }

    setMessageReplaceLink() {
        this.linkMessageIcon = "ueb-icon-replace-link"
        this.linkMessageText = "Replace existing input connections."
    }

    setMessageSameNode() {
        this.linkMessageIcon = "ueb-icon-same-node"
        this.linkMessageText = "Both are on the same node."
    }

    setMEssagetypesIncompatible() {
        this.linkMessageIcon = "ueb-icon-types-incompatible"
        this.linkMessageText = `${this.sourcePin.getType()} is not compatible with ${this.destinationPin.getType()}.`
    }
}

customElements.define("ueb-link", LinkElement)
