import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import BooleanEntity from "./BooleanEntity.js"
import IEntity from "./IEntity.js"
import IdentifierEntity from "./IdentifierEntity.js"
import StringEntity from "./StringEntity.js"

export default class KeyBindingEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ActionName: StringEntity,
        bShift: BooleanEntity,
        bCtrl: BooleanEntity,
        bAlt: BooleanEntity,
        bCmd: BooleanEntity,
        Key: IdentifierEntity,
    }
    static grammar = P.alt(
        IdentifierEntity.grammar.map(identifier => {
            const result = new this()
            result.Key = identifier
            return result
        }),
        Grammar.createEntityGrammar(this)
    )

    constructor() {
        super()
        /** @type {String} */ this.ActionName
        /** @type {Boolean} */ this.bShift
        /** @type {Boolean} */ this.bCtrl
        /** @type {Boolean} */ this.bAlt
        /** @type {Boolean} */ this.bCmd
        /** @type {IdentifierEntity} */ this.Key
    }
}
