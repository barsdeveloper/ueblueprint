import Grammar from "../serialization/Grammar.js"
import Parsernostrum from "parsernostrum"
import PinEntity from "./PinEntity.js"

export default class UnknownPinEntity extends PinEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(
                new RegExp(`${Grammar.Regex.Symbol.source}\\s*\\(\\s*`),
                1
            ),
            Grammar.createAttributeGrammar(this).sepBy(Grammar.commaSeparation),
            Parsernostrum.reg(/\s*(?:,\s*)?\)/)
        ).map(([lookbehind, attributes, _2]) => {
            lookbehind ??= ""
            let values = {}
            if (lookbehind.length) {
                values.lookbehind = lookbehind
            }
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new this(values)
        })
    }

    constructor(values = {}) {
        super(values, true)
    }
}
