import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import ByteEntity from "./ByteEntity.js"
import ComputedType from "./ComputedType.js"
import EnumDisplayValueEntity from "./EnumDisplayValueEntity.js"
import EnumEntity from "./EnumEntity.js"
import FormatTextEntity from "./FormatTextEntity.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import Integer64Entity from "./Integer64Entity.js"
import IntegerEntity from "./IntegerEntity.js"
import InvariantTextEntity from "./InvariantTextEntity.js"
import LinearColorEntity from "./LinearColorEntity.js"
import LocalizedTextEntity from "./LocalizedTextEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PinReferenceEntity from "./PinReferenceEntity.js"
import PinTypeEntity from "./PinTypeEntity.js"
import RBSerializationVector2DEntity from "./RBSerializationVector2DEntity.js"
import RotatorEntity from "./RotatorEntity.js"
import SimpleSerializationRotatorEntity from "./SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "./SimpleSerializationVector2DEntity.js"
import SimpleSerializationVector4DEntity from "./SimpleSerializationVector4DEntity.js"
import SimpleSerializationVectorEntity from "./SimpleSerializationVectorEntity.js"
import Union from "./Union.js"
import Vector2DEntity from "./Vector2DEntity.js"
import Vector4DEntity from "./Vector4DEntity.js"
import VectorEntity from "./VectorEntity.js"

/** @template {TerminalAttribute} T */
export default class PinEntity extends IEntity {

    static #typeEntityMap = {
        [Configuration.paths.linearColor]: LinearColorEntity,
        [Configuration.paths.rotator]: RotatorEntity,
        [Configuration.paths.vector]: VectorEntity,
        [Configuration.paths.vector2D]: Vector2DEntity,
        [Configuration.paths.vector4f]: Vector4DEntity,
        "bool": Boolean,
        "byte": ByteEntity,
        "enum": EnumEntity,
        "exec": String,
        "int": IntegerEntity,
        "int64": Integer64Entity,
        "name": String,
        "real": Number,
        "string": String,
    }
    static #alternativeTypeEntityMap = {
        "enum": EnumDisplayValueEntity,
        "rg": RBSerializationVector2DEntity,
        [Configuration.paths.rotator]: SimpleSerializationRotatorEntity,
        [Configuration.paths.vector]: SimpleSerializationVectorEntity,
        [Configuration.paths.vector2D]: SimpleSerializationVector2DEntity,
        [Configuration.paths.vector3f]: SimpleSerializationVectorEntity,
        [Configuration.paths.vector4f]: SimpleSerializationVector4DEntity,
    }
    static attributes = {
        ...super.attributes,
        lookbehind: new AttributeInfo({
            default: "Pin",
            ignored: true,
        }),
        objectEntity: new AttributeInfo({
            ignored: true,
        }),
        pinIndex: new AttributeInfo({
            type: Number,
            ignored: true,
        }),
        PinId: new AttributeInfo({
            type: GuidEntity,
            default: () => new GuidEntity()
        }),
        PinName: AttributeInfo.createValue(""),
        PinFriendlyName: AttributeInfo.createType(new Union(LocalizedTextEntity, FormatTextEntity, InvariantTextEntity, String)),
        PinToolTip: AttributeInfo.createType(String),
        Direction: AttributeInfo.createType(String),
        PinType: new AttributeInfo({
            type: PinTypeEntity,
            default: () => new PinTypeEntity(),
            inlined: true,
        }),
        LinkedTo: AttributeInfo.createType([PinReferenceEntity]),
        SubPins: AttributeInfo.createType([PinReferenceEntity]),
        ParentPin: AttributeInfo.createType(PinReferenceEntity),
        DefaultValue: new AttributeInfo({
            type: new ComputedType(
                /** @param {PinEntity} pinEntity */
                pinEntity => pinEntity.getEntityType(true) ?? String
            ),
            serialized: true,
        }),
        AutogeneratedDefaultValue: AttributeInfo.createType(String),
        DefaultObject: AttributeInfo.createType(ObjectReferenceEntity),
        PersistentGuid: AttributeInfo.createType(GuidEntity),
        bHidden: AttributeInfo.createValue(false),
        bNotConnectable: AttributeInfo.createValue(false),
        bDefaultValueIsReadOnly: AttributeInfo.createValue(false),
        bDefaultValueIsIgnored: AttributeInfo.createValue(false),
        bAdvancedView: AttributeInfo.createValue(false),
        bOrphanedPin: AttributeInfo.createValue(false),
    }
    static grammar = this.createGrammar()

    #recomputesNodeTitleOnChange = false
    set recomputesNodeTitleOnChange(value) {
        this.#recomputesNodeTitleOnChange = value
    }
    get recomputesNodeTitleOnChange() {
        return this.#recomputesNodeTitleOnChange
    }

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values = {}, suppressWarns = false) {
        super(values, suppressWarns)
        /** @type {ObjectEntity} */ this.objectEntity
        /** @type {Number} */ this.pinIndex
        /** @type {GuidEntity} */ this.PinId
        /** @type {String} */ this.PinName
        /** @type {LocalizedTextEntity | String} */ this.PinFriendlyName
        /** @type {String} */ this.PinToolTip
        /** @type {String} */ this.Direction
        /** @type {PinTypeEntity} */ this.PinType
        /** @type {PinReferenceEntity[]} */ this.LinkedTo
        /** @type {T} */ this.DefaultValue
        /** @type {String} */ this.AutogeneratedDefaultValue
        /** @type {ObjectReferenceEntity} */ this.DefaultObject
        /** @type {GuidEntity} */ this.PersistentGuid
        /** @type {Boolean} */ this.bHidden
        /** @type {Boolean} */ this.bNotConnectable
        /** @type {Boolean} */ this.bDefaultValueIsReadOnly
        /** @type {Boolean} */ this.bDefaultValueIsIgnored
        /** @type {Boolean} */ this.bAdvancedView
        /** @type {Boolean} */ this.bOrphanedPin
    }

    /** @param {ObjectEntity} objectEntity */
    static fromLegacyObject(objectEntity) {
        return new PinEntity(objectEntity, true)
    }

    getType() {
        const category = this.PinType.PinCategory.toLocaleLowerCase()
        if (category === "struct" || category === "class" || category === "object" || category === "type") {
            return this.PinType.PinSubCategoryObject.path
        }
        if (this.isEnum()) {
            return "enum"
        }
        if (this.objectEntity?.isPcg()) {
            const pcgSuboject = this.objectEntity.getPcgSubobject()
            const pinObjectReference = this.isInput()
                ? pcgSuboject.InputPins?.[this.pinIndex]
                : pcgSuboject.OutputPins?.[this.pinIndex]
            if (pinObjectReference) {
                /** @type {ObjectEntity} */
                const pinObject = pcgSuboject[Configuration.subObjectAttributeNameFromReference(pinObjectReference, true)]
                let allowedTypes = pinObject.Properties?.AllowedTypes?.toString() ?? ""
                if (allowedTypes == "") {
                    allowedTypes = this.PinType.PinCategory ?? ""
                    if (allowedTypes == "") {
                        allowedTypes = "Any"
                    }
                }
                if (allowedTypes) {
                    if (
                        pinObject.Properties.bAllowMultipleData !== false
                        && pinObject.Properties.bAllowMultipleConnections !== false
                    ) {
                        allowedTypes += "[]"
                    }
                    return allowedTypes
                }
            }
        }
        if (category === "optional") {
            switch (this.PinType.PinSubCategory) {
                case "red":
                    return "real"
                case "rg":
                    return "rg"
                case "rgb":
                    return Configuration.paths.vector
                case "rgba":
                    return Configuration.paths.linearColor
                default:
                    return this.PinType.PinSubCategory
            }
        }
        return category
    }

    getEntityType(alternative = false) {
        const typeString = this.getType()
        const entity = PinEntity.#typeEntityMap[typeString]
        const alternativeEntity = PinEntity.#alternativeTypeEntityMap[typeString]
        return alternative && alternativeEntity !== undefined
            ? alternativeEntity
            : entity
    }

    pinDisplayName() {
        let result = this.PinFriendlyName
            ? this.PinFriendlyName.toString()
            : Utility.formatStringName(this.PinName ?? "")
        let match
        if (
            this.PinToolTip
            // Match up until the first \n excluded or last character
            && (match = this.PinToolTip.match(/\s*(.+?(?=\n)|.+\S)\s*/))
        ) {
            if (match[1].toLowerCase() === result.toLowerCase()) {
                return match[1] // In case they match, then keep the case of the PinToolTip
            }
        }
        return result
    }

    /** @param {PinEntity} other */
    copyTypeFrom(other) {
        this.PinType.PinCategory = other.PinType.PinCategory
        this.PinType.PinSubCategory = other.PinType.PinSubCategory
        this.PinType.PinSubCategoryObject = other.PinType.PinSubCategoryObject
        this.PinType.PinSubCategoryMemberReference = other.PinType.PinSubCategoryMemberReference
        this.PinType.PinValueType = other.PinType.PinValueType
        this.PinType.ContainerType = other.PinType.ContainerType
        this.PinType.bIsReference = other.PinType.bIsReference
        this.PinType.bIsConst = other.PinType.bIsConst
        this.PinType.bIsWeakPointer = other.PinType.bIsWeakPointer
        this.PinType.bIsUObjectWrapper = other.PinType.bIsUObjectWrapper
        this.PinType.bSerializeAsSinglePrecisionFloat = other.PinType.bSerializeAsSinglePrecisionFloat
    }

    getDefaultValue(maybeCreate = false) {
        if (this.DefaultValue === undefined && maybeCreate) {
            // @ts-expect-error
            this.DefaultValue = new (this.getEntityType(true))()
        }
        return this.DefaultValue
    }

    isEnum() {
        const type = this.PinType.PinSubCategoryObject.type
        return type === Configuration.paths.enum
            || type === Configuration.paths.userDefinedEnum
            || type.toLowerCase() === "enum"
    }

    isExecution() {
        return this.PinType.PinCategory === "exec"
    }

    isHidden() {
        return this.bHidden
    }

    isInput() {
        return !this.bHidden && this.Direction != "EGPD_Output"
    }

    isOutput() {
        return !this.bHidden && this.Direction == "EGPD_Output"
    }

    isLinked() {
        return this.LinkedTo?.length > 0 ?? false
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     * @returns true if it was not already linked to the tarket
     */
    linkTo(targetObjectName, targetPinEntity) {
        const linkFound = this.LinkedTo?.some(pinReferenceEntity =>
            pinReferenceEntity.objectName.toString() == targetObjectName
            && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        )
        if (!linkFound) {
            (this.LinkedTo ??= []).push(new PinReferenceEntity({
                objectName: targetObjectName,
                pinGuid: targetPinEntity.PinId,
            }))
            return true
        }
        return false // Already linked
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     * @returns true if it was linked to the target
     */
    unlinkFrom(targetObjectName, targetPinEntity) {
        const indexElement = this.LinkedTo?.findIndex(pinReferenceEntity => {
            return pinReferenceEntity.objectName.toString() == targetObjectName
                && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        })
        if (indexElement >= 0) {
            this.LinkedTo.splice(indexElement, 1)
            if (this.LinkedTo.length === 0 && PinEntity.attributes.LinkedTo.default === undefined) {
                this.LinkedTo = undefined
            }
            return true
        }
        return false
    }

    getSubCategory() {
        return this.PinType.PinSubCategoryObject.path
    }

    /** @return {CSSResult} */
    pinColor() {
        if (this.PinType.PinCategory == "mask") {
            const result = Configuration.pinColor[this.PinType.PinSubCategory]
            if (result) {
                return result
            }
        } else if (this.PinType.PinCategory == "optional") {
            return Configuration.pinColorMaterial
        }
        return Configuration.pinColor[this.getType()]
            ?? Configuration.pinColor[this.PinType.PinCategory.toLowerCase()]
            ?? Configuration.pinColor["default"]
    }
}
