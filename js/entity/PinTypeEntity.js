import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import BooleanEntity from "./BooleanEntity.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import StringEntity from "./StringEntity.js"
import SymbolEntity from "./SymbolEntity.js"

export default class PinTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        PinCategory: StringEntity.withDefault(),
        PinSubCategory: StringEntity,
        PinSubCategoryObject: ObjectReferenceEntity,
        PinSubCategoryMemberReference: FunctionReferenceEntity,
        ContainerType: SymbolEntity,
        bIsReference: BooleanEntity,
        bIsConst: BooleanEntity,
        bIsWeakPointer: BooleanEntity,
        bIsUObjectWrapper: BooleanEntity,
        bSerializeAsSinglePrecisionFloat: BooleanEntity,
    }
    static grammar = this.createGrammar()

    constructor(values = {}) {
        super(values)
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinCategory>} */ this.PinCategory
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinSubCategory>} */ this.PinSubCategory
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinSubCategoryObject>} */ this.PinSubCategoryObject
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinSubCategoryMemberReference>} */ this.PinSubCategoryMemberReference
        /** @type {InstanceType<typeof PinTypeEntity.attributes.ContainerType>} */ this.ContainerType
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsReference>} */ this.bIsReference
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsConst>} */ this.bIsConst
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsWeakPointer>} */ this.bIsWeakPointer
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsUObjectWrapper>} */ this.bIsUObjectWrapper
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsUObjectWrapper>} */ this.bIsUObjectWrapper
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bSerializeAsSinglePrecisionFloat>} */ this.bSerializeAsSinglePrecisionFloat
    }

    /** @returns {P<PinTypeEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this).label("PinTypeEntity")
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
