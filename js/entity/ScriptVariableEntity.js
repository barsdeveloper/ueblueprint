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
    static grammar = Grammar.createEntityGrammar(this).label("ScriptVariableEntity")

    constructor(values = {}) {
        super(values)
        /** @type {InstanceType<typeof ScriptVariableEntity.attributes.ScriptVariable>} */ this.ScriptVariable
        /** @type {InstanceType<typeof ScriptVariableEntity.attributes.OriginalChangeId>} */ this.OriginalChangeId
    }
}
