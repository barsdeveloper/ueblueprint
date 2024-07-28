import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import SymbolEntity from "./SymbolEntity.js"

export default class EnumEntity extends SymbolEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return /** @type {P<EnumEntity>} */(
            Grammar.symbol.map(v => new this(v))
        )
    }
}
