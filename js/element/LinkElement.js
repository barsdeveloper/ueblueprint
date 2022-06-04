// @ts-check

import Configuration from "../Configuration"
import IElement from "./IElement"
import LinkTemplate from "../template/LinkTemplate"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @extends {IElement<Object, LinkTemplate>}
 */
export default class LinkElement extends IElement {

    static properties = {
        source: {
            type: String,
            reflect: true,
        },
        destination: {
            type: String,
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
    #sourcePin
    get sourcePin() {
        return this.#sourcePin
    }
    set sourcePin(pin) {
    }

    /** @type {PinElement} */
    #destinationPin
    get destinationPin() {
        return this.#destinationPin
    }
    set destinationPin(pin) {
        if (this.#destinationPin == pin) {
            return
        }
        if (this.#destinationPin) {
            const nodeElement = this.#destinationPin.getNodeElement()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler)
            if (this.#sourcePin) {
                this.#unlinkPins()
            }
        }
        this.#destinationPin = pin
        if (this.#destinationPin) {
            const nodeElement = this.#destinationPin.getNodeElement()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler)
            this.setDestinationLocation()
            if (this.#sourcePin) {
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

    /**
     * @param {PinElement} pin
     * @param {Boolean} isSourcePin
     */
    #setPin(pin, isSourcePin) {
        const pinA = isSourcePin ? this.#sourcePin : this.#destinationPin
        const pinB = isSourcePin ? this.#destinationPin : this.#sourcePin
        if (pinA == pin) {
            return
        }
        if (pinA) {
            const nodeElement = pinA.getNodeElement()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
            if (this.#destinationPin) {
                this.#unlinkPins()
            }
        }
        this.#sourcePin = pin
        if (this.#sourcePin) {
            const nodeElement = this.#sourcePin.getNodeElement()
            this.originatesFromInput = pin.isInput()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
            this.setSourceLocation()
            if (this.#destinationPin) {
                this.#linkPins()
            }
        }
        this.template.applyPins(this)
    }

    #linkPins() {
        this.#sourcePin.linkTo(this.#destinationPin)
        this.#destinationPin.linkTo(this.#sourcePin)
    }

    #unlinkPins() {
        if (this.#sourcePin && this.#destinationPin) {
            this.#sourcePin.unlinkFrom(this.#destinationPin)
            this.#destinationPin.unlinkFrom(this.#sourcePin)
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
                if (this.#destinationPin) {
                    this.#unlinkPins()
                }
            }
            if (this.source) {
                const nodeElement = this.source.getNodeElement()
                this.originatesFromInput = this.source.isInput()
                nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
                nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler)
                this.setSourceLocation()
                if (this.#destinationPin) {
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
            location = this.#sourcePin.template.getLinkLocation(this.#sourcePin)
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
            location = this.#destinationPin.template.getLinkLocation(this.#destinationPin)
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
