import BoolInputPinTemplate from "../template/pin/BoolPinTemplate"
import BytePinTemplate from "../template/pin/BytePinTemplate"
import Configuration from "../Configuration"
import ElementFactory from "./ElementFactory"
import ExecPinTemplate from "../template/pin/ExecPinTemplate"
import GuidEntity from "../entity/GuidEntity"
import IElement from "./IElement"
import IntInputPinTemplate from "../template/pin/IntPinTemplate"
import ISerializer from "../serialization/ISerializer"
import LinearColorEntity from "../entity/LinearColorEntity"
import LinearColorInputPinTemplate from "../template/pin/LinearColorPinTemplate"
import NameInputPinTemplate from "../template/pin/NamePinTemplate"
import PinEntity from "../entity/PinEntity"
import PinTemplate from "../template/pin/PinTemplate"
import RealInputPinTemplate from "../template/pin/RealInputPinTemplate"
import ReferencePinTemplate from "../template/pin/ReferencePinTemplate"
import RotatorInputPinTemplate from "../template/pin/RotatorInputPinTemplate"
import StringInputPinTemplate from "../template/pin/StringInputPinTemplate"
import Utility from "../Utility"
import Vector2DPinTemplate from "../template/pin/Vector2DPinTemplate"
import VectorPinTemplate from "../template/pin/VectorPinTemplate"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
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
        "/Script/CoreUObject.LinearColor": LinearColorInputPinTemplate,
        "/Script/CoreUObject.Rotator": RotatorInputPinTemplate,
        "/Script/CoreUObject.Vector": VectorPinTemplate,
        "/Script/CoreUObject.Vector2D": Vector2DPinTemplate,
        "bool": BoolInputPinTemplate,
        "byte": BytePinTemplate,
        "int": IntInputPinTemplate,
        "int64": IntInputPinTemplate,
        "MUTABLE_REFERENCE": ReferencePinTemplate,
        "name": NameInputPinTemplate,
        "real": RealInputPinTemplate,
        "string": StringInputPinTemplate,
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

        // this.entity.subscribe("DefaultValue", value => this.defaultValue = value.toString())
        this.entity.subscribe("PinToolTip", value => {
            let matchResult = value.match(/\s*(.+?(?=\n)|.+\S)\s*/)
            if (matchResult) {
                return Utility.formatStringName(matchResult[1])
            }
            return Utility.formatStringName(this.entity.PinName)
        })
    }

    setup() {
        super.setup()
        this.nodeElement = this.closest("ueb-node")
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
        return Configuration.getPinColor(this)
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
                let link = this.blueprint.getLink(this, pin, true)
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
        if (this.entity.linkTo(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked()
            this.nodeElement?.template.linksChanged()
        }
    }

    /** @param {PinElement} targetPinElement */
    unlinkFrom(targetPinElement) {
        if (this.entity.unlinkFrom(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked()
            this.nodeElement?.template.linksChanged()
        }
    }

    /**
     * @param {PinElement} originalPinElement
     * @param {PinReferenceEntity} newReference
     */
    redirectLink(originalPinElement, newReference) {
        const index = this.entity.LinkedTo.findIndex(pinReference =>
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
