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
    static grammar = Grammar.createEntityGrammar(this)

    constructor(values) {
        super(values)
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.GuidEntity
        /** @type {Boolean} */ this.bSelfContext
    }
}
