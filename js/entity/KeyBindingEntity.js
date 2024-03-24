import Parsernostrum from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"
import IdentifierEntity from "./IdentifierEntity.js"

export default class KeyBindingEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ActionName: AttributeInfo.createValue(""),
        bShift: AttributeInfo.createValue(false),
        bCtrl: AttributeInfo.createValue(false),
        bAlt: AttributeInfo.createValue(false),
        bCmd: AttributeInfo.createValue(false),
        Key: AttributeInfo.createType(IdentifierEntity),
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
