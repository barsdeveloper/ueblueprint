import { html, nothing } from "lit"
import Configuration from "../Configuration.js"
import SVGIcon from "../SVGIcon.js"
import Utility from "../Utility.js"
import BooleanEntity from "../entity/BooleanEntity.js"
import LinkTemplate from "../template/LinkTemplate.js"
import IFromToPositionedElement from "./IFromToPositionedElement.js"

/** @extends {IFromToPositionedElement<Object, LinkTemplate>} */
export default class LinkElement extends IFromToPositionedElement {

    static properties = {
        ...super.properties,
        dragging: {
            type: Boolean,
            attribute: "data-dragging",
            converter: BooleanEntity.booleanConverter,
            reflect: true,
        },
        originNode: {
            type: String,
            attribute: "data-origin-node",
            reflect: true,
        },
        originPin: {
            type: String,
            attribute: "data-origin-pin",
            reflect: true,
        },
        targetNode: {
            type: String,
            attribute: "data-target-node",
            reflect: true,
        },
        targetPin: {
            type: String,
            attribute: "data-target-pin",
            reflect: true,
        },
        originatesFromInput: {
            type: Boolean,
            attribute: "data-from-input",
            converter: BooleanEntity.booleanConverter,
            reflect: true,
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
    #origin
    get origin() {
        return this.#origin
    }
    set origin(pin) {
        this.#setPin(pin, false)
    }

    /** @type {PinElement} */
    #target
    get target() {
        return this.#target
    }
    set target(pin) {
        this.#setPin(pin, true)
    }

    #nodeDeleteHandler = () => this.remove()
    /** @param {UEBDragEvent} e */
    #nodeDragOriginHandler = e => this.addOriginLocation(...e.detail.value)
    /** @param {UEBDragEvent} e */
    #nodeDragTargetHandler = e => this.addTargetLocation(...e.detail.value)
    #nodeReflowOriginHandler = e => {
        if (this.origin.isKnot()) {
            this.originatesFromInput = this.origin.isInputVisually()
        }
        this.setOriginLocation()
    }
    #nodeReflowTargetHandler = e => this.setTargetLocation()

    /** @type {TemplateResult | nothing} */
    linkMessageIcon = nothing
    /** @type {TemplateResult | nothing} */
    linkMessageText = nothing

    /** @type {SVGPathElement} */
    pathElement

    constructor() {
        super()
        this.dragging = false
        this.originNode = ""
        this.originPin = ""
        this.targetNode = ""
        this.targetPin = ""
        this.originatesFromInput = false
        this.startPercentage = 0
        this.svgPathD = ""
        this.startPixels = 0
    }

    /**
     * @param {PinElement} origin
     * @param {PinElement?} target
     */
    static newObject(origin, target) {
        const result = new LinkElement()
        result.initialize(origin, target)
        return result
    }

    /**
     * @param {PinElement} origin
     * @param {PinElement?} target
     */
    // @ts-expect-error
    initialize(origin, target) {
        super.initialize({}, new LinkTemplate())
        if (origin) {
            this.origin = origin
            if (!target) {
                this.toX = this.fromX
                this.toY = this.fromY
            }
        }
        if (target) {
            this.target = target
            if (!origin) {
                this.fromX = this.toX
                this.fromY = this.toY
            }
        }
    }

    /**
     * @param {PinElement} pin
     * @param {Boolean} isTargetPin
     */
    #setPin(pin, isTargetPin) {
        const getCurrentPin = () => isTargetPin ? this.target : this.origin
        if (getCurrentPin() == pin) {
            return
        }
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement()
            nodeElement.removeEventListener(Configuration.removeEventName, this.#nodeDeleteHandler)
            nodeElement.removeEventListener(
                Configuration.nodeDragEventName,
                isTargetPin ? this.#nodeDragTargetHandler : this.#nodeDragOriginHandler
            )
            nodeElement.removeEventListener(
                Configuration.nodeReflowEventName,
                isTargetPin ? this.#nodeReflowTargetHandler : this.#nodeReflowOriginHandler
            )
            this.#unlinkPins()
        }
        if (isTargetPin) {
            this.#target = pin
            this.targetNode = pin?.nodeElement.nodeTitle
            this.targetPin = pin?.pinId.toString()
        } else {
            this.#origin = pin
            this.originNode = pin?.nodeElement.nodeTitle
            this.originPin = pin?.pinId.toString()
        }
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement()
            nodeElement.addEventListener(Configuration.removeEventName, this.#nodeDeleteHandler)
            nodeElement.addEventListener(
                Configuration.nodeDragEventName,
                isTargetPin ? this.#nodeDragTargetHandler : this.#nodeDragOriginHandler
            )
            nodeElement.addEventListener(
                Configuration.nodeReflowEventName,
                isTargetPin ? this.#nodeReflowTargetHandler : this.#nodeReflowOriginHandler
            )
            isTargetPin
                ? this.setTargetLocation()
                : (this.setOriginLocation(), this.originatesFromInput = this.origin.isInputVisually())
            this.#linkPins()
        }
    }

    #linkPins() {
        if (this.origin && this.target) {
            this.origin.linkTo(this.target)
            this.target.linkTo(this.origin)
        }
    }

    #unlinkPins() {
        if (this.origin && this.target) {
            this.origin.unlinkFrom(this.target, false)
            this.target.unlinkFrom(this.origin, false)
        }
    }

    cleanup() {
        super.cleanup()
        this.#unlinkPins()
        this.origin = null
        this.target = null
    }

    /** @param {Coordinates} location */
    setOriginLocation(location = null, canPostpone = true) {
        if (location == null) {
            const self = this
            if (canPostpone && (!this.hasUpdated || !this.origin.hasUpdated)) {
                Promise.all([this.updateComplete, this.origin.updateComplete])
                    .then(() => self.setOriginLocation(null, false))
                return
            }
            location = this.origin.template.getLinkLocation()
        }
        const [x, y] = location
        this.fromX = x
        this.fromY = y
    }

    /** @param {Coordinates} location */
    setTargetLocation(location = null, canPostpone = true) {
        if (location == null) {
            const self = this
            if (canPostpone && (!this.hasUpdated || !this.target.hasUpdated)) {
                Promise.all([this.updateComplete, this.target.updateComplete])
                    .then(() => self.setTargetLocation(null, false))
                return
            }
            location = this.target.template.getLinkLocation()
        }
        this.toX = location[0]
        this.toY = location[1]
    }

    getInputPin(getSomething = false) {
        if (this.origin?.isInput()) {
            return this.origin
        }
        if (this.target?.isInput()) {
            return this.target
        }
        if (getSomething) {
            return this.origin ?? this.target
        }
    }

    /** @param {PinElement} pin */
    setInputPin(pin) {
        if (this.origin?.isInput()) {
            this.origin = pin
        }
        this.target = pin
    }

    getOutputPin(getSomething = false) {
        if (this.origin?.isOutput()) {
            return this.origin
        }
        if (this.target?.isOutput()) {
            return this.target
        }
        if (getSomething) {
            return this.origin ?? this.target
        }
    }

    /** @param {PinElement} pin */
    setOutputPin(pin) {
        if (this.target?.isOutput()) {
            this.target = pin
        }
        this.origin = pin
    }

    /** @param {NodeElement} pin */
    getOtherPin(pin) {
        if (this.origin?.nodeElement === pin) {
            return this.target
        }
        if (this.target?.nodeElement === pin) {
            return this.origin
        }
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
        this.linkMessageText = html`Convert ${this.origin.pinType} to ${this.target.pinType}.`
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
