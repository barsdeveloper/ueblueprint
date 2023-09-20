import { html, nothing } from "lit"
import Configuration from "../Configuration.js"
import IFromToPositionedElement from "./IFromToPositionedElement.js"
import LinkTemplate from "../template/LinkTemplate.js"
import SVGIcon from "../SVGIcon.js"
import Utility from "../Utility.js"

/** @extends {IFromToPositionedElement<Object, LinkTemplate>} */
export default class LinkElement extends IFromToPositionedElement {

    static properties = {
        ...super.properties,
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
    #source
    get source() {
        return this.#source
    }
    set source(pin) {
        this.#setPin(pin, false)
    }

    /** @type {PinElement} */
    #destination
    get destination() {
        return this.#destination
    }
    set destination(pin) {
        this.#setPin(pin, true)
    }

    #nodeDeleteHandler = () => this.remove()
    /** @param {UEBDragEvent} e */
    #nodeDragSourceHandler = e => this.addSourceLocation(...e.detail.value)
    /** @param {UEBDragEvent} e */
    #nodeDragDestinatonHandler = e => this.addDestinationLocation(...e.detail.value)
    #nodeReflowSourceHandler = e => this.setSourceLocation()
    #nodeReflowDestinatonHandler = e => this.setDestinationLocation()

    /** @type {TemplateResult | nothing} */
    linkMessageIcon = nothing
    /** @type {TemplateResult | nothing} */
    linkMessageText = nothing

    /** @type {SVGPathElement} */
    pathElement

    constructor() {
        super()
        this.dragging = false
        this.originatesFromInput = false
        this.startPercentage = 0
        this.svgPathD = ""
        this.startPixels = 0
    }

    /**
     * @param {PinElement} source
     * @param {PinElement?} destination
     */
    static newObject(source, destination) {
        const result = new LinkElement()
        result.initialize(source, destination)
        return result
    }

    /**
     * @param {PinElement} source
     * @param {PinElement?} destination
     */
    // @ts-expect-error
    initialize(source, destination) {
        super.initialize({}, new LinkTemplate())
        if (source) {
            this.source = source
            if (!destination) {
                this.toX = this.fromX
                this.toY = this.fromY
            }
        }
        if (destination) {
            this.destination = destination
            if (!source) {
                this.fromX = this.toX
                this.fromY = this.toY
            }
        }
    }

    /**
     * @param {PinElement} pin
     * @param {Boolean} isDestinationPin
     */
    #setPin(pin, isDestinationPin) {
        const getCurrentPin = () => isDestinationPin ? this.destination : this.source
        if (getCurrentPin() == pin) {
            return
        }
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement()
            nodeElement.removeEventListener(Configuration.removeEventName, this.#nodeDeleteHandler)
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
            ? this.#destination = pin
            : this.#source = pin
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement()
            nodeElement.addEventListener(Configuration.removeEventName, this.#nodeDeleteHandler)
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
                : (this.setSourceLocation(), this.originatesFromInput = this.source.isInput())
            this.#linkPins()
        }
    }

    #linkPins() {
        if (this.source && this.destination) {
            this.source.linkTo(this.destination)
            this.destination.linkTo(this.source)
        }
    }

    #unlinkPins() {
        if (this.source && this.destination) {
            this.source.unlinkFrom(this.destination, false)
            this.destination.unlinkFrom(this.source, false)
        }
    }

    cleanup() {
        super.cleanup()
        this.#unlinkPins()
        this.source = null
        this.destination = null
    }

    /** @param {Number[]?} location */
    setSourceLocation(location = null, canPostpone = true) {
        if (location == null) {
            const self = this
            if (canPostpone && (!this.hasUpdated || !this.source.hasUpdated)) {
                Promise.all([this.updateComplete, this.source.updateComplete])
                    .then(() => self.setSourceLocation(null, false))
                return
            }
            location = this.source.template.getLinkLocation()
        }
        const [x, y] = location
        this.fromX = x
        this.fromY = y
    }

    /** @param {Number[]?} location */
    setDestinationLocation(location = null, canPostpone = true) {
        if (location == null) {
            const self = this
            if (canPostpone && (!this.hasUpdated || !this.destination.hasUpdated)) {
                Promise.all([this.updateComplete, this.destination.updateComplete])
                    .then(() => self.setDestinationLocation(null, false))
                return
            }
            location = this.destination.template.getLinkLocation()
        }
        this.toX = location[0]
        this.toY = location[1]
    }

    getInputPin() {
        if (this.source?.isInput()) {
            return this.source
        }
        return this.destination
    }

    /** @param {PinElement} pin */
    setInputPin(pin) {
        if (this.source?.isInput()) {
            this.source = pin
        }
        this.destination = pin
    }

    getOutputPin() {
        if (this.destination?.isOutput()) {
            return this.destination
        }
        return this.source
    }

    /** @param {PinElement} pin */
    setOutputPin(pin) {
        if (this.destination?.isOutput()) {
            this.destination = pin
        }
        this.source = pin
    }

    startDragging() {
        this.dragging = true
    }

    finishDragging() {
        this.dragging = false
    }

    removeMessage() {
        this.linkMessageIcon = nothing
        this.linkMessageText = nothing
    }

    setMessageConvertType() {
        this.linkMessageIcon = SVGIcon.convert
        this.linkMessageText = html`Convert ${this.source.pinType} to ${this.destination.pinType}.`
    }

    setMessageCorrect() {
        this.linkMessageIcon = SVGIcon.correct
        this.linkMessageText = nothing
    }

    setMessageReplace() {
        this.linkMessageIcon = SVGIcon.correct
        this.linkMessageText = nothing
    }

    setMessageDirectionsIncompatible() {
        this.linkMessageIcon = SVGIcon.reject
        this.linkMessageText = html`Directions are not compatbile.`
    }

    setMessagePlaceNode() {
        this.linkMessageIcon = nothing
        this.linkMessageText = html`Place a new node.`
    }

    setMessageReplaceLink() {
        this.linkMessageIcon = SVGIcon.correct
        this.linkMessageText = html`Replace existing input connections.`
    }

    setMessageReplaceOutputLink() {
        this.linkMessageIcon = SVGIcon.correct
        this.linkMessageText = html`Replace existing output connections.`
    }

    setMessageSameNode() {
        this.linkMessageIcon = SVGIcon.reject
        this.linkMessageText = html`Both are on the same node.`
    }

    /**
     * @param {PinElement} a
     * @param {PinElement} b
     */
    setMessageTypesIncompatible(a, b) {
        this.linkMessageIcon = SVGIcon.reject
        this.linkMessageText =
            html`${Utility.capitalFirstLetter(a.pinType)} is not compatible with ${Utility.capitalFirstLetter(b.pinType)}.`
    }
}
