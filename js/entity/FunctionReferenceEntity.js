import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import StringEntity from "./StringEntity.js"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberParent: ObjectReferenceEntity,
        MemberName: StringEntity,
        MemberGuid: GuidEntity,
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof FunctionReferenceEntity.attributes.MemberParent>} */ this.MemberParent
        /** @type {InstanceType<typeof FunctionReferenceEntity.attributes.MemberName>} */ this.MemberName
        /** @type {InstanceType<typeof FunctionReferenceEntity.attributes.MemberGuid>} */ this.MemberGuid
    }

    /** @returns {P<FunctionReferenceEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 0, 0)
    }
}
