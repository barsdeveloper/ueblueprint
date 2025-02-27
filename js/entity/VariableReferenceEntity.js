import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import BooleanEntity from "./BooleanEntity.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import StringEntity from "./StringEntity.js"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberScope: StringEntity,
        MemberName: StringEntity.withDefault(),
        MemberGuid: GuidEntity,
        bSelfContext: BooleanEntity,
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.MemberScope>} */ this.MemberScope
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.MemberName>} */ this.MemberName
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.MemberGuid>} */ this.MemberGuid
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.bSelfContext>} */ this.bSelfContext
    }

    /** @returns {P<VariableReferenceEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this).label("VariableReferenceEntity")
    }
}
