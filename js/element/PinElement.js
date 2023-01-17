import BoolPinTemplate from "../template/pin/BoolPinTemplate"
import Configuration from "../Configuration"
import ElementFactory from "./ElementFactory"
import ExecPinTemplate from "../template/pin/ExecPinTemplate"
import GuidEntity from "../entity/GuidEntity"
import IElement from "./IElement"
import Int64PinTemplate from "../template/pin/Int64PinTemplate"
import IntPinTemplate from "../template/pin/IntPinTemplate"
import ISerializer from "../serialization/ISerializer"
import LinearColorEntity from "../entity/LinearColorEntity"
import LinearColorPinTemplate from "../template/pin/LinearColorPinTemplate"
import NamePinTemplate from "../template/pin/NamePinTemplate"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import PinTemplate from "../template/pin/PinTemplate"
import RealPinTemplate from "../template/pin/RealPinTemplate"
import ReferencePinTemplate from "../template/pin/ReferencePinTemplate"
import RotatorPinTemplate from "../template/pin/RotatorPinTemplate"
import StringPinTemplate from "../template/pin/StringPinTemplate"
import Utility from "../Utility"
import Vector2DPinTemplate from "../template/pin/Vector2DPinTemplate"
import VectorPinTemplate from "../template/pin/VectorPinTemplate"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("./LinkElement").LinkElementConstructor} LinkElementConstructor
 * @typedef {import("./NodeElement").default} NodeElement
 * @typedef {import("lit").CSSResult} CSSResult
 * @typedef {typeof PinElement} PinElementConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {IElement<PinEntity<T>, PinTemplate>}
 */
export default class PinElement extends IElement {

    static #inputPinTemplates = {
        "/Script/CoreUObject.LinearColor": LinearColorPinTemplate,
        "/Script/CoreUObject.Rotator": RotatorPinTemplate,
        "/Script/CoreUObject.Vector": VectorPinTemplate,
        "/Script/CoreUObject.Vector2D": Vector2DPinTemplate,
        "bool": BoolPinTemplate,
        "byte": IntPinTemplate,
        "int": IntPinTemplate,
        "int64": Int64PinTemplate,
        "MUTABLE_REFERENCE": ReferencePinTemplate,
        "name": NamePinTemplate,
        "real": RealPinTemplate,
        "string": StringPinTemplate,
    }

    static properties = {
        pinId: {
            type: GuidEntity,
            converter: {
                fromAttribute: (value, type) => value
                    ? ISerializer.grammar.Guid.parse(value).value
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
                    ? ISerializer.grammar.LinearColorFromAnyColor.parse(value).value
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
    }

    /** @type {NodeElement} */
    nodeElement

    /**
     * @param {PinEntity<any>} pinEntity
     * @return {new () => PinTemplate}
     */
    static getTypeTemplate(pinEntity) {
        if (pinEntity.PinType.bIsReference && !pinEntity.PinType.bIsConst) {
            return PinElement.#inputPinTemplates["MUTABLE_REFERENCE"]
        }
        if (pinEntity.getType() === "exec") {
            return ExecPinTemplate
        }
        let result
        if (pinEntity.isInput()) {
            result = PinElement.#inputPinTemplates[pinEntity.getType()]
        }
        return result ?? PinTemplate
    }

    static newObject(
        entity = new PinEntity(),
        template = new (PinElement.getTypeTemplate(entity))(),
        nodeElement = undefined
    ) {
        const result = new PinElement()
        result.initialize(entity, template, nodeElement)
        return result
    }

    initialize(
        entity = /** @type {PinEntity<T>} */(new PinEntity()),
        template = new (PinElement.getTypeTemplate(entity))(),
        nodeElement = undefined
    ) {
        super.initialize(entity, template)
        this.pinId = this.entity.PinId
        this.pinType = this.entity.getType()
        this.advancedView = this.entity.bAdvancedView
        this.defaultValue = this.entity.getDefaultValue()
        this.color = PinElement.properties.color.converter.fromAttribute(this.getColor().toString())
        this.isLinked = false
        this.pinDirection = entity.isInput() ? "input" : entity.isOutput() ? "output" : "hidden"
        this.nodeElement = /** @type {NodeElement} */(nodeElement)
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
        return this.entity.getDisplayName()
    }

    /** @return {CSSResult} */
    getColor() {
        return Configuration.pinColor(this)
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
    }

    /** @param  {IElement[]} nodesWhitelist */
    sanitizeLinks(nodesWhitelist = []) {
        this.entity.LinkedTo = this.getLinks().filter(pinReference => {
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
