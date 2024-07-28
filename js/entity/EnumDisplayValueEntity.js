import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import EnumEntity from "./EnumEntity.js"

export default class EnumDisplayValueEntity extends EnumEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return /** @type {P<EnumDisplayValueEntity>} */(
            P.reg(Grammar.Regex.InsideString).map(v => new this(v))
        )
    }
}
