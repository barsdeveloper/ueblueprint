import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberScope: AttributeInfo.createType(String),
        MemberName: AttributeInfo.createValue(""),
        MemberGuid: AttributeInfo.createType(GuidEntity),
        bSelfContext: AttributeInfo.createType(Boolean),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.GuidEntity
        /** @type {Boolean} */ this.bSelfContext
    }
}
