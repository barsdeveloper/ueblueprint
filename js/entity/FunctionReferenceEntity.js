import Grammar from "../serialization/Grammar.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberParent: {
            type: ObjectReferenceEntity,
        },
        MemberName: {
            type: String,
        },
        MemberGuid: {
            type: GuidEntity,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.createEntityGrammar(FunctionReferenceEntity)

    static getGrammar() {
        return FunctionReferenceEntity.#grammar
    }

    constructor(values) {
        super(values)
        /** @type {ObjectReferenceEntity} */ this.MemberParent
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.MemberGuid
    }
}
