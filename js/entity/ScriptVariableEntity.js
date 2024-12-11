import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"

export default class ScriptVariableEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ScriptVariable: ObjectReferenceEntity,
        OriginalChangeId: GuidEntity,
    }
    static grammar = this.createGrammar()

    constructor(values = {}) {
        super(values)
        /** @type {InstanceType<typeof ScriptVariableEntity.attributes.ScriptVariable>} */ this.ScriptVariable
        /** @type {InstanceType<typeof ScriptVariableEntity.attributes.OriginalChangeId>} */ this.OriginalChangeId
    }

    /** @returns {P<ScriptVariableEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this).label("ScriptVariableEntity")
    }
}
