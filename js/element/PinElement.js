import BoolPinTemplate from "../template/BoolPinTemplate"
import Configuration from "../Configuration"
import ExecPinTemplate from "../template/ExecPinTemplate"
import IElement from "./IElement"
import ISerializer from "../serialization/ISerializer"
import LinearColorEntity from "../entity/LinearColorEntity"
import LinearColorPinTemplate from "../template/LinearColorPinTemplate"
import LinkElement from "./LinkElement"
import NamePinTemplate from "../template/NamePinTemplate"
import PinTemplate from "../template/PinTemplate"
import RealPinTemplate from "../template/RealPinTemplate"
import ReferencePinTemplate from "../template/ReferencePinTemplate"
import RotatorPinTemplate from "../template/RotatorPinTemplate"
import StringPinTemplate from "../template/StringPinTemplate"
import Utility from "../Utility"
import VectorPinTemplate from "../template/VectorPinTemplate"

/**
 * @typedef {import("../entity/GuidEntity").default} GuidEntity
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("./NodeElement").default} NodeElement
 */
/**
 * @template T
 * @typedef {import("../entity/PinEntity").default<T>} PinEntity
 */

/**
 * @template T
 * @extends {IElement<PinEntity<T>, PinTemplate>}
 */
export default class PinElement extends IElement {

    static #typeTemplateMap = {
        "/Script/CoreUObject.LinearColor": LinearColorPinTemplate,
        "/Script/CoreUObject.Rotator": RotatorPinTemplate,
        "/Script/CoreUObject.Vector": VectorPinTemplate,
        "bool": BoolPinTemplate,
        "exec": ExecPinTemplate,
        "MUTABLE_REFERENCE": ReferencePinTemplate,
        "name": NamePinTemplate,
        "real": RealPinTemplate,
        "string": StringPinTemplate,
    }

    static properties = {
        advancedView: {
            type: String,
            attribute: "data-advanced-view",
            reflect: true,
        },
        color: {
            type: LinearColorEntity,
            converter: {
                fromAttribute: (value, type) => {
                    // @ts-expect-error
                    return value ? ISerializer.grammar.LinearColorFromAnyColor.parse(value).value : null
                },
                toAttribute: (value, type) => {
                    return value ? Utility.printLinearColor(value) : null
                },
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
        pinType: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        pinDirection: {
            type: String,
            attribute: "data-direction",
            reflect: true,
        },
    }

    /**
     * @param {PinEntity<any>} pinEntity
     * @return {new () => PinTemplate}
     */
    static getTypeTemplate(pinEntity) {
        let result = PinElement.#typeTemplateMap[
            pinEntity.PinType.bIsReference && !pinEntity.PinType.bIsConst
                ? "MUTABLE_REFERENCE"
                : pinEntity.getType()
        ]
        return result ?? PinTemplate
    }

    /** @type {NodeElement} */
    nodeElement

    /** @type {HTMLElement} */
    clickableElement

    connections = 0

    /** @param {PinEntity<T>} entity */
    constructor(entity) {
        super(
            entity,
            new (PinElement.getTypeTemplate(entity))()
        )
        this.advancedView = entity.bAdvancedView
        this.defaultValue = entity.getDefaultValue()
        this.pinType = this.entity.getType()
        this.color = PinElement.properties.color.converter.fromAttribute(Configuration.pinColor[this.pinType]?.toString())
        this.isLinked = false
        this.pinDirection = entity.isInput() ? "input" : entity.isOutput() ? "output" : "hidden"

        // this.entity.subscribe("DefaultValue", value => this.defaultValue = value.toString())
        this.entity.subscribe("PinToolTip", value => {
            let matchResult = value.match(/\s*(.+?(?=\n)|.+\S)\s*/)
            if (matchResult) {
                return Utility.formatStringName(matchResult[1])
            }
            return Utility.formatStringName(this.entity.PinName)
        })
    }

    /** @return {GuidEntity} */
    GetPinId() {
        return this.entity.PinId
    }

    /** @return {String} */
    GetPinIdValue() {
        return this.GetPinId().value
    }

    /** @returns {String} */
    getPinName() {
        return this.entity.PinName
    }

    getPinDisplayName() {
        let matchResult = null
        if (
            this.entity.PinToolTip
            // Match up until the first \n excluded or last character
            && (matchResult = this.entity.PinToolTip.match(/\s*(.+?(?=\n)|.+\S)\s*/))
        ) {
            return Utility.formatStringName(matchResult[1])
        }
        return Utility.formatStringName(this.entity.PinName)
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    getClickableElement() {
        return this.clickableElement
    }

    getLinkLocation() {
        return this.template.getLinkLocation()
    }

    /** @returns {NodeElement} */
    getNodeElement() {
        return this.nodeElement
    }

    getLinks() {
        return this.entity.LinkedTo ?? []
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
                    this.blueprint.addGraphElement(new LinkElement(this, pin))
                }
            }
            return pin
        })
    }

    /** @param {PinElement} targetPinElement */
    linkTo(targetPinElement) {
        this.entity.linkTo(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)
        this.isLinked = this.entity.isLinked()
    }

    /** @param {PinElement} targetPinElement */
    unlinkFrom(targetPinElement) {
        this.entity.unlinkFrom(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)
        this.isLinked = this.entity.isLinked()
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
