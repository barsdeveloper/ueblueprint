import Configuration from "../Configuration"
import IFromToPositionedElement from "./IFromToPositionedElement"
import LinkTemplate from "../template/LinkTemplate"
import Utility from "../Utility"

/** @typedef {import("./PinElement").default} PinElement */

/** @extends {IFromToPositionedElement<Object, LinkTemplate>} */
export default class LinkElement extends IFromToPositionedElement {

    static properties = {
        ...super.properties,
        source: {
            type: String,
            reflect: true,
        },
        destination: {
            type: String,
            reflect: true,
        },
        dragging: {
            type: Boolean,
            attribute: "data-dragging",
            converter: Utility.booleanConverter,
            reflect: true,
        },
        originatesFromInput: {
            type: Boolean,
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
        this.#setPin(pin, false)
    }

    /** @type {PinElement} */
    #destinationPin
    get destinationPin() {
        return this.#destinationPin
    }
    set destinationPin(pin) {
        this.#setPin(pin, true)
    }

    #nodeDeleteHandler
    #nodeDragSourceHandler
    #nodeDragDestinatonHandler
    #nodeReflowSourceHandler
    #nodeReflowDestinatonHandler
    /** @type {SVGPathElement} */
    pathElement

    /**
     * @param {PinElement} source
     * @param {PinElement?} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate())
        const self = this
        this.#nodeDeleteHandler = () => self.remove()
        this.#nodeDragSourceHandler = e => self.addSourceLocation(e.detail.value)
        this.#nodeDragDestinatonHandler = e => self.addDestinationLocation(e.detail.value)
        this.#nodeReflowSourceHandler = e => self.setSourceLocation()
        this.#nodeReflowDestinatonHandler = e => self.setDestinationLocation()
        this.source = null
        this.destination = null
        this.dragging = false
        this.originatesFromInput = false
        this.startPercentage = 0
        this.svgPathD = ""
        this.startPixels = 0
        this.linkMessageIcon = ""
        this.linkMessageText = ""
        if (source) {
            this.sourcePin = source
            if (!destination) {
                this.toX = this.fromX
                this.toY = this.fromY
            }
        }
        if (destination) {
            this.destinationPin = destination
            if (!source) {
                this.fromX = this.toX
                this.fromY = this.toY
            }
        }
        this.#linkPins()
    }

    /**
     * @param {PinElement} pin
     * @param {Boolean} isDestinationPin
     */
    #setPin(pin, isDestinationPin) {
        const getCurrentPin = () => isDestinationPin ? this.destinationPin : this.sourcePin
        if (getCurrentPin() == pin) {
            return
        }
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement()
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(
                Configuration.nodeDragEventName,
                isDestinationPin ? this.#nodeDragDestinatonHandler : this.#nodeDragSourceHandler
            )
            nodeElement.removeEventListener(
                Configuration.nodeReflowEventName,
                isDestinationPin ? this.#nodeReflowDestinatonHandler : this.#nodeReflowSourceHandler
            )
            this.#unlinkPins()
        }
        isDestinationPin
            ? this.#destinationPin = pin
            : this.#sourcePin = pin
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement()
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(
                Configuration.nodeDragEventName,
                isDestinationPin ? this.#nodeDragDestinatonHandler : this.#nodeDragSourceHandler
            )
            nodeElement.addEventListener(
                Configuration.nodeReflowEventName,
                isDestinationPin ? this.#nodeReflowDestinatonHandler : this.#nodeReflowSourceHandler
            )
            isDestinationPin
                ? this.setDestinationLocation()
                : (this.setSourceLocation(), this.originatesFromInput = this.sourcePin.isInput())
            this.#linkPins()
        }
    }

    #linkPins() {
        if (this.sourcePin && this.destinationPin) {
            this.sourcePin.linkTo(this.destinationPin)
            this.destinationPin.linkTo(this.sourcePin)
        }
    }

    #unlinkPins() {
        if (this.sourcePin && this.destinationPin) {
            this.sourcePin.unlinkFrom(this.destinationPin)
            this.destinationPin.unlinkFrom(this.sourcePin)
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.#unlinkPins()
        this.sourcePin = null
        this.destinationPin = null
    }

    /** @param {Number[]?} location */
    setSourceLocation(location = null) {
        if (location == null) {
            const self = this
            if (!this.hasUpdated || !this.sourcePin.hasUpdated) {
                Promise.all([this.updateComplete, this.sourcePin.updateComplete]).then(() => self.setSourceLocation())
                return
            }
            location = this.sourcePin.template.getLinkLocation()
        }
        const [x, y] = location
        this.fromX = x
        this.fromY = y
    }

    /** @param {Number[]?} location */
    setDestinationLocation(location = null) {
        if (location == null) {
            const self = this
            if (!this.hasUpdated || !this.destinationPin.hasUpdated) {
                Promise.all([this.updateComplete, this.destinationPin.updateComplete]).then(() => self.setDestinationLocation())
                return
            }
            location = this.destinationPin.template.getLinkLocation()
        }
        this.toX = location[0]
        this.toY = location[1]
    }

    startDragging() {
        this.dragging = true
    }

    finishDragging() {
        this.dragging = false
    }

    removeMessage() {
        this.linkMessageIcon = ""
        this.linkMessageText = ""
    }

    setMessageConvertType() {
        this.linkMessageIcon = "ueb-icon-conver-type"
        this.linkMessageText = `Convert ${this.sourcePin.pinType} to ${this.destinationPin.pinType}.`
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
        this.linkMessageText = `${this.sourcePin.pinType} is not compatible with ${this.destinationPin.pinType}.`
    }
}
