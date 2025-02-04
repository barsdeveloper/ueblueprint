import Configuration from "../Configuration.js"
import pinTemplate from "../decoding/pinTemplate.js"
import BooleanEntity from "../entity/BooleanEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import PinTemplate from "../template/pin/PinTemplate.js"
import ElementFactory from "./ElementFactory.js"
import IElement from "./IElement.js"

/**
 * @template {IEntity} T
 * @extends {IElement<PinEntity<T>, PinTemplate>}
 */
export default class PinElement extends IElement {

    static properties = {
        pinId: {
            type: GuidEntity,
            converter: {
                fromAttribute: (value, type) => value
                    ? GuidEntity.grammar.parse(value)
                    : null,
                toAttribute: (value, type) => value?.toString(),
            },
            attribute: "data-id",
            reflect: true,
        },
        pinType: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        advancedView: {
            type: String,
            attribute: "data-advanced-view",
            reflect: true,
        },
        color: {
            type: LinearColorEntity,
            converter: {
                fromAttribute: (value, type) => value
                    ? LinearColorEntity.getLinearColorFromAnyFormat().parse(value)
                    : null,
                /** @param {LinearColorEntity} value */
                toAttribute: (value, type) => value?.toString() ?? "",
            },
            attribute: "data-color",
            reflect: true,
        },
        defaultValue: {
            type: String,
            attribute: false,
        },
        isLinked: {
            type: Boolean,
            converter: BooleanEntity.booleanConverter,
            attribute: "data-linked",
            reflect: true,
        },
        pinDirection: {
            type: String,
            attribute: "data-direction",
            reflect: true,
        },
        connectable: {
            type: Boolean,
            converter: BooleanEntity.booleanConverter,
            attribute: "data-connectable",
            reflect: true,
        }
    }

    /** @type {NodeElement} */
    nodeElement

    static newObject(
        entity = new PinEntity(),
        template = /** @type {PinTemplate} */(new (pinTemplate(entity))()),
        nodeElement = undefined
    ) {
        const result = new PinElement()
        result.initialize(entity, template, nodeElement)
        return result
    }

    initialize(
        entity = /** @type {PinEntity<T>} */(new PinEntity()),
        template = /** @type {PinTemplate} */(new (pinTemplate(entity))()),
        nodeElement = undefined
    ) {
        this.nodeElement = nodeElement
        this.advancedView = entity.bAdvancedView?.valueOf()
        this.isLinked = false
        this.connectable = !entity.bNotConnectable?.valueOf()
        super.initialize(entity, template)
        this.pinId = this.entity.PinId
        this.updateType()
        this.defaultValue = this.entity.getDefaultValue()
        this.pinDirection = entity.isInput() ? "input" : entity.isOutput() ? "output" : "hidden"
        /** @type {LinearColorEntity} */
        this.color = PinElement.properties.color.converter.fromAttribute(this.entity.pinColor().toString())
    }

    setup() {
        super.setup()
        this.nodeElement = this.closest("ueb-node")
    }

    updateType() {
        this.pinType = this.entity.getType()
        const newColor = PinElement.properties.color.converter.fromAttribute(this.entity.pinColor().toString())
        if (!this.color?.equals(newColor)) {
            this.color = newColor
            this.acknowledgeUpdate()
        }
    }

    createPinReference() {
        return new PinReferenceEntity(new SymbolEntity(this.nodeElement.getNodeName()), this.getPinId())
    }

    getPinId() {
        return this.entity.PinId
    }

    getPinName() {
        return this.entity.PinName?.toString() ?? ""
    }

    getPinDisplayName() {
        return this.entity.pinTitle()
    }

    /** @param {PinElement} pin */
    #traverseKnots(pin) {
        while (pin?.isKnot()) {
            const pins = pin.nodeElement.getPinElements()
            pin = pin === pins[0] ? pins[1] : pins[0]
            pin = pin.isLinked ? this.blueprint.getPin(pin.getLinks()[0]) : null
        }
        return pin?.isKnot() ? undefined : pin
    }

    isInput(ignoreKnots = false) {
        /** @type {PinElement} */
        let result = this
        if (ignoreKnots) {
            return this.#traverseKnots(result)?.isInput()
        }
        return result.entity.isInput()
    }

    /** @returns {boolean} True when the pin is the input part of a knot that can switch direction */
    isInputLoosely() {
        return this.isInput(false) && this.isInput(true) === undefined
    }

    /** @returns {boolean} True when the pin is input and if it is a knot it appears input */
    isInputVisually() {
        const template = /** @type {KnotNodeTemplate} */(this.nodeElement.template)
        const isKnot = this.isKnot()
        return isKnot && this.isInput() != template.switchDirectionsVisually
            || !isKnot && this.isInput()
    }

    isOutput(ignoreKnots = false) {
        /** @type {PinElement} */
        let result = this
        if (ignoreKnots) {
            return this.#traverseKnots(result)?.isOutput()
        }
        return result.entity.isOutput()
    }

    /** @returns {boolean} True when the pin is the output part of a knot that can switch direction */
    isOutputLoosely() {
        return this.isOutput(false) && this.isOutput(true) === undefined
    }

    /** @returns {boolean} True when the pin is output and if it is a knot it appears output */
    isOutputVisually() {
        const template = /** @type {KnotNodeTemplate} */(this.nodeElement.template)
        const isKnot = this.isKnot()
        return isKnot && this.isOutput() != template.switchDirectionsVisually
            || !isKnot && this.isOutput()
    }


    /** @returns {value is InstanceType<PinElement<>>} */
    isKnot() {
        return this.nodeElement?.getType() == Configuration.paths.knot
    }

    getLinkLocation(oppositeDirection = false) {
        return this.template.getLinkLocation(oppositeDirection)
    }

    getNodeElement() {
        return this.nodeElement
    }

    getLinks() {
        return this.entity.LinkedTo?.valueOf() ?? []
    }

    getDefaultValue(maybeCreate = false) {
        return this.defaultValue = this.entity.getDefaultValue(maybeCreate)
    }

    /** @param {T} value */
    setDefaultValue(value) {
        this.entity.DefaultValue = value
        this.defaultValue = value
        if (this.entity.recomputesNodeTitleOnChange) {
            this.nodeElement?.computeNodeDisplayName()
        }
    }

    /** @param  {IElement[]} nodesWhitelist */
    sanitizeLinks(nodesWhitelist = []) {
        this.entity.LinkedTo = new (PinEntity.attributes.LinkedTo)(
            this.entity.LinkedTo?.valueOf().filter(pinReference => {
                let pin = this.blueprint.getPin(pinReference)
                if (pin) {
                    if (nodesWhitelist.length && !nodesWhitelist.includes(pin.nodeElement)) {
                        return false
                    }
                    let link = this.blueprint.getLink(this, pin)
                    if (!link) {
                        link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
                            .newObject(this, pin)
                        this.blueprint.addGraphElement(link)
                    }
                }
                return pin
            })
        )
        this.isLinked = this.entity.isLinked()
    }

    /** @param {PinElement} targetPinElement */
    linkTo(targetPinElement) {
        const pinReference = this.createPinReference()
        if (
            this.isLinked
            && this.entity.isExecution()
            && this.isOutput(true)
            && this.getLinks().some(ref => !pinReference.equals(ref))
        ) {
            if (this.isKnot()) {

            }
            this.unlinkFromAll()
        }
        if (this.entity.linkTo(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked()
            if (this.entity.recomputesNodeTitleOnChange) {
                this.nodeElement?.computeNodeDisplayName()
            }
        }
    }

    /** @param {PinElement} targetPinElement */
    unlinkFrom(targetPinElement, removeLink = true) {
        if (this.entity.unlinkFrom(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked()
            if (removeLink) {
                this.blueprint.getLink(this, targetPinElement)?.remove() // Might be called after the link is removed
            }
            if (this.entity.recomputesNodeTitleOnChange) {
                this.nodeElement?.computeNodeDisplayName()
            }
        }
    }

    unlinkFromAll() {
        this.getLinks().map(ref => this.blueprint.getPin(ref)).forEach(pin => this.unlinkFrom(pin))
        const isLinked = false
    }

    /**
     * @param {PinElement} originalPinElement
     * @param {PinReferenceEntity} newReference
     */
    redirectLink(originalPinElement, newReference) {
        const index = this.getLinks().findIndex(pinReference =>
            pinReference.objectName.toString() == originalPinElement.getNodeElement().getNodeName()
            && pinReference.pinGuid.toString() == originalPinElement.entity.PinId.toString()
        )
        if (index >= 0) {
            this.entity.LinkedTo.valueOf()[index] = newReference
            return true
        }
        return false
    }

    acknowledgeUpdate() {
        let event = new CustomEvent(Configuration.pinUpdateEventName)
        this.dispatchEvent(event)
    }
}
