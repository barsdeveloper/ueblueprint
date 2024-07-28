import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import BooleanEntity from "./BooleanEntity.js"
import IEntity from "./IEntity.js"
import StringEntity from "./StringEntity.js"

export default class TerminalTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        TerminalCategory: StringEntity,
        TerminalSubCategory: StringEntity,
        bTerminalIsConst: BooleanEntity,
        bTerminalIsWeakPointer: BooleanEntity,
        bTerminalIsUObjectWrapper: BooleanEntity,
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values)
        /** @type {String} */ this.TerminalCategory
        /** @type {String} */ this.TerminalSubCategory
        /** @type {Boolean} */ this.bTerminalIsConst
        /** @type {Boolean} */ this.bTerminalIsWeakPointer
        /** @type {Boolean} */ this.bTerminalIsUObjectWrapper
    }

    static createGrammar() {
        return /** @type {P<TerminalTypeEntity>} */(
            Grammar.createEntityGrammar(this)
        )
    }
}
