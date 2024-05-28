import Grammar from "../serialization/Grammar.js"
import BooleanEntity from "./BooleanEntity.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PathSymbolEntity from "./PathSymbolEntity.js"
import StringEntity from "./StringEntity.js"

export default class PinTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        PinCategory: StringEntity.withDefault(),
        PinSubCategory: StringEntity.withDefault(),
        PinSubCategoryObject: ObjectReferenceEntity.withDefault(),
        PinSubCategoryMemberReference: FunctionReferenceEntity.withDefault(type => null),
        PinValueType: PinTypeEntity.withDefault(),
        ContainerType: PathSymbolEntity,
        bIsReference: BooleanEntity.withDefault(),
        bIsConst: BooleanEntity.withDefault(),
        bIsWeakPointer: BooleanEntity.withDefault(),
        bIsUObjectWrapper: BooleanEntity.withDefault(),
        bSerializeAsSinglePrecisionFloat: BooleanEntity.withDefault(),
    }
    static grammar = Grammar.createEntityGrammar(this)

    constructor(values = {}) {
        super(values)
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
        for (const key of this.keys) {
            if (other[key] !== undefined) {
                this[key] = other[key]
            }
        }
    }
}
