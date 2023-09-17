import Grammar from "../serialization/Grammar.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberScope: {
            type: String,
        },
        MemberName: {
            default: "",
        },
        MemberGuid: {
            type: GuidEntity,
        },
        bSelfContext: {
            type: Boolean,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.createEntityGrammar(VariableReferenceEntity)

    static getGrammar() {
        return VariableReferenceEntity.#grammar
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.GuidEntity
        /** @type {Boolean} */ this.bSelfContext
    }
}
