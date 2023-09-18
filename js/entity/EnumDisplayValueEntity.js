import EnumEntity from "./EnumEntity.js"
import Grammar from "../serialization/Grammar.js"
import Parsimmon from "parsimmon"

export default class EnumDisplayValueEntity extends EnumEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsimmon.regex(Grammar.Regex.InsideString).map(v => new this(v))
    }
}
