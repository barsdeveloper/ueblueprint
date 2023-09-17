import Grammar from "../serialization/Grammar.js"
import IdentifierEntity from "./IdentifierEntity.js"
import IEntity from "./IEntity.js"
import Parsimmon from "parsimmon"

export default class KeyBindingEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ActionName: {
            default: "",
        },
        bShift: {
            default: false,
        },
        bCtrl: {
            default: false,
        },
        bAlt: {
            default: false,
        },
        bCmd: {
            default: false,
        },
        Key: {
            type: IdentifierEntity,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Parsimmon.alt(
        IdentifierEntity.getGrammar().map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createEntityGrammar(KeyBindingEntity)
    )

    static getGrammar() {
        return KeyBindingEntity.#grammar
    }

    constructor(values = {}) {
        super(values, true)
        /** @type {String} */ this.ActionName
        /** @type {Boolean} */ this.bShift
        /** @type {Boolean} */ this.bCtrl
        /** @type {Boolean} */ this.bAlt
        /** @type {Boolean} */ this.bCmd
        /** @type {IdentifierEntity} */ this.Key
    }
}
