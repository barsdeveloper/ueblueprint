import Utility from "../Utility.js"
import pinTemplate from "../decoding/pinTemplate.js"
import GuidEntity from "../entity/GuidEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import PinTemplate from "../template/pin/PinTemplate.js"
import ElementFactory from "./ElementFactory.js"
import IElement from "./IElement.js"

/**
 * @template {TerminalAttribute} T
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
                toAttribute: (value, type) => /** @type {String} */(value?.toString()),
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
                toAttribute: (value, type) => value ? Utility.printLinearColor(value) : null,
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
            converter: Utility.booleanConverter,
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
            converter: Utility.booleanConverter,
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
        this.advancedView = entity.bAdvancedView
        this.isLinked = false
        this.connectable = !entity.bNotConnectable
        super.initialize(entity, template)
        this.pinType = this.entity.getType()
        this.defaultValue = this.entity.getDefaultValue()
        this.color = PinElement.properties.color.converter.fromAttribute(this.getColor().toString())
        this.pinDirection = entity.isInput() ? "input" : entity.isOutput() ? "output" : "hidden"
    }

    setup() {
        super.setup()
        this.nodeElement = this.closest("ueb-node")
    }

    createPinReference() {
        return new PinReferenceEntity({
            objectName: this.nodeElement.getNodeName(),
            pinGuid: this.getPinId(),
        })
    }

    /** @return {GuidEntity} */
    getPinId() {
        return this.entity.PinId
    }

    /** @returns {String} */
    getPinName() {
        return this.entity.PinName
    }

    getPinDisplayName() {
        return this.entity.pinTitle()
    }

    /** @return {CSSResult} */
    getColor() {
        return this.entity.pinColor()
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    getLinkLocation() {
        return this.template.getLinkLocation()
    }

    getNodeElement() {
        return this.nodeElement
    }

    getLinks() {
        return this.entity.LinkedTo ?? []
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
        this.entity.LinkedTo = this.entity.LinkedTo?.filter(pinReference => {
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
        this.isLinked = this.entity.isLinked()
    }

    /** @param {PinElement} targetPinElement */
    linkTo(targetPinElement) {
        const pinReference = this.createPinReference()
        if (
            this.isLinked
            && this.isOutput()
            && (this.pinType === "exec" || targetPinElement.pinType === "exec")
            && !this.getLinks().some(ref => pinReference.equals(ref))) {
            this.unlinkFromAll()
        }
        if (this.entity.linkTo(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked()
            this.nodeElement?.template.linksChanged()
            if (this.entity.recomputesNodeTitleOnChange) {
                this.nodeElement?.computeNodeDisplayName()
            }
        }
    }

    /** @param {PinElement} targetPinElement */
    unlinkFrom(targetPinElement, removeLink = true) {
        if (this.entity.unlinkFrom(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked()
            this.nodeElement?.template.linksChanged()
            if (removeLink) {
                this.blueprint.getLink(this, targetPinElement)?.remove() // Might be called after the link is removed
            }
            if (this.entity.recomputesNodeTitleOnChange) {
                this.nodeElement?.computeNodeDisplayName()
            }
        }
    }

    unlinkFromAll() {
        const isLinked = this.getLinks().length
        this.getLinks().map(ref => this.blueprint.getPin(ref)).forEach(pin => this.unlinkFrom(pin))
        if (isLinked) {
            this.nodeElement?.template.linksChanged()
        }
    }

    /**
     * @param {PinElement} originalPinElement
     * @param {PinReferenceEntity} newReference
     */
    redirectLink(originalPinElement, newReference) {
        const index = this.getLinks().findIndex(pinReference =>
            pinReference.objectName.toString() == originalPinElement.getNodeElement().getNodeName()
            && pinReference.pinGuid.valueOf() == originalPinElement.entity.PinId.valueOf()
        )
        if (index >= 0) {
            this.entity.LinkedTo[index] = newReference
            return true
        }
        return false
    }
}
