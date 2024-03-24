import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberParent: AttributeInfo.createType(ObjectReferenceEntity),
        MemberName: AttributeInfo.createType(String),
        MemberGuid: AttributeInfo.createType(GuidEntity),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values) {
        super(values)
        /** @type {ObjectReferenceEntity} */ this.MemberParent
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.MemberGuid
    }
}
