import Grammar from "../serialization/Grammar.js"
import SymbolEntity from "./SymbolEntity.js"

export default class EnumEntity extends SymbolEntity {

    static #grammar = Grammar.symbol.map(v => new EnumEntity(v))

    static getGrammar() {
        return EnumEntity.#grammar
    }
}
