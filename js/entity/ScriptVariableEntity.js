import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"

export default class ScriptVariableEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ScriptVariable: AttributeInfo.createType(ObjectReferenceEntity),
        OriginalChangeId: AttributeInfo.createType(GuidEntity),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values = {}, suppressWarns = false) {
        super(values, suppressWarns)
        /** @type {ObjectReferenceEntity} */ this.ScriptVariable
        /** @type {GuidEntity} */ this.OriginalChangeId
    }
}
