import Grammar from "../serialization/Grammar.js"
import SymbolEntity from "./SymbolEntity.js"

export default class EnumEntity extends SymbolEntity {

    static getGrammar() {
        return Grammar.symbol.map(v => new EnumEntity(v))
    }
}
