import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PathSymbolEntity from "./PathSymbolEntity.js"

export default class PinTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        PinCategory: AttributeInfo.createValue(""),
        PinSubCategory: AttributeInfo.createValue(""),
        PinSubCategoryObject: new AttributeInfo({
            type: ObjectReferenceEntity,
            default: () => ObjectReferenceEntity.createNoneInstance(),
        }),
        PinSubCategoryMemberReference: new AttributeInfo({
            type: FunctionReferenceEntity,
            default: null,
        }),
        PinValueType: new AttributeInfo({
            type: PinTypeEntity,
            default: null,
        }),
        ContainerType: AttributeInfo.createType(PathSymbolEntity),
        bIsReference: AttributeInfo.createValue(false),
        bIsConst: AttributeInfo.createValue(false),
        bIsWeakPointer: AttributeInfo.createValue(false),
        bIsUObjectWrapper: AttributeInfo.createValue(false),
        bSerializeAsSinglePrecisionFloat: AttributeInfo.createValue(false),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values = {}, suppressWarns = false) {
        super(values, suppressWarns)
        /** @type {String} */ this.PinCategory
        /** @type {String} */ this.PinSubCategory
        /** @type {ObjectReferenceEntity} */ this.PinSubCategoryObject
        /** @type {FunctionReferenceEntity} */ this.PinSubCategoryMemberReference
        /** @type {PinTypeEntity} */ this.PinValueType
        /** @type {PathSymbolEntity} */ this.ContainerType
        /** @type {Boolean} */ this.bIsReference
        /** @type {Boolean} */ this.bIsConst
        /** @type {Boolean} */ this.bIsWeakPointer
        /** @type {Boolean} */ this.bIsUObjectWrapper
        /** @type {Boolean} */ this.bIsUObjectWrapper
        /** @type {Boolean} */ this.bSerializeAsSinglePrecisionFloat
    }

    /** @param {PinTypeEntity} other */
    copyTypeFrom(other) {
        this.PinCategory = other.PinCategory
        this.PinSubCategory = other.PinSubCategory
        this.PinSubCategoryObject = other.PinSubCategoryObject
        this.PinSubCategoryMemberReference = other.PinSubCategoryMemberReference
        this.PinValueType = other.PinValueType
        this.ContainerType = other.ContainerType
        this.bIsReference = other.bIsReference
        this.bIsConst = other.bIsConst
        this.bIsWeakPointer = other.bIsWeakPointer
        this.bIsUObjectWrapper = other.bIsUObjectWrapper
        this.bSerializeAsSinglePrecisionFloat = other.bSerializeAsSinglePrecisionFloat
    }
}
