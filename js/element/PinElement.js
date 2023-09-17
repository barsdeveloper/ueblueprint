import BoolPinTemplate from "../template/pin/BoolPinTemplate.js"
import Configuration from "../Configuration.js"
import ElementFactory from "./ElementFactory.js"
import EnumPinTemplate from "../template/pin/EnumPinTemplate.js"
import ExecPinTemplate from "../template/pin/ExecPinTemplate.js"
import Grammar from "../serialization/Grammar.js"
import GuidEntity from "../entity/GuidEntity.js"
import IElement from "./IElement.js"
import Int64PinTemplate from "../template/pin/Int64PinTemplate.js"
import IntPinTemplate from "../template/pin/IntPinTemplate.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import LinearColorPinTemplate from "../template/pin/LinearColorPinTemplate.js"
import NamePinTemplate from "../template/pin/NamePinTemplate.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import PinTemplate from "../template/pin/PinTemplate.js"
import RealPinTemplate from "../template/pin/RealPinTemplate.js"
import ReferencePinTemplate from "../template/pin/ReferencePinTemplate.js"
import RotatorPinTemplate from "../template/pin/RotatorPinTemplate.js"
import StringPinTemplate from "../template/pin/StringPinTemplate.js"
import Utility from "../Utility.js"
import Vector2DPinTemplate from "../template/pin/Vector2DPinTemplate.js"
import VectorPinTemplate from "../template/pin/VectorPinTemplate.js"

/**
 * @typedef {import("../entity/IEntity.js").AnyValue} AnyValue
 * @typedef {import("./LinkElement.js").LinkElementConstructor} LinkElementConstructor
 * @typedef {import("./NodeElement.js").default} NodeElement
 * @typedef {import("lit").CSSResult} CSSResult
 * @typedef {typeof PinElement} PinElementConstructor
 */
/**
 * @template T
 * @typedef {import("parsimmon").Success<T>} Success
 */

/**
 * @template {AnyValue} T
 * @extends {IElement<PinEntity<T>, PinTemplate>}
 */
export default class PinElement extends IElement {

    static #inputPinTemplates = {
        "bool": BoolPinTemplate,
        "byte": IntPinTemplate,
        "enum": EnumPinTemplate,
        "int": IntPinTemplate,
        "int64": Int64PinTemplate,
        "MUTABLE_REFERENCE": ReferencePinTemplate,
        "name": NamePinTemplate,
        "real": RealPinTemplate,
        "string": StringPinTemplate,
        [Configuration.paths.linearColor]: LinearColorPinTemplate,
        [Configuration.paths.rotator]: RotatorPinTemplate,
        [Configuration.paths.vector]: VectorPinTemplate,
        [Configuration.paths.vector2D]: Vector2DPinTemplate,
    }

    static properties = {
        pinId: {
            type: GuidEntity,
            converter: {
                fromAttribute: (value, type) => value
                    ? /** @type {Success<GuidEntity>} */(GuidEntity.getGrammar().parse(value)).value
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
                    ? /** @type {Success<LinearColorEntity>} */(LinearColorEntity.getLinearColorFromAnyFormat().parse(value)).value
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

    /**
     * @param {PinEntity<any>} pinEntity
     * @return {new () => PinTemplate}
     */
    static getTypeTemplate(pinEntity) {
        if (pinEntity.PinType.ContainerType?.toString() === "Array") {
            return PinTemplate
        }
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
        return this.entity.pinDisplayName()
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
