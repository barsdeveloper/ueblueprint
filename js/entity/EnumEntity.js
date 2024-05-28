import Grammar from "../serialization/Grammar.js"
import SymbolEntity from "./SymbolEntity.js"

export default class EnumEntity extends SymbolEntity {

    static grammar = Grammar.symbol.map(v => new this(v))
}
