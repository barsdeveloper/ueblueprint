import Grammar from "../serialization/Grammar.js"
import IdentifierEntity from "./IdentifierEntity.js"
import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"

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
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            IdentifierEntity.grammar.map(identifier => new this({
                Key: identifier
            })),
            Grammar.createEntityGrammar(this)
        )
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
