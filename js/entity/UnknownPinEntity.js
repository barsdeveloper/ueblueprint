import Parsimmon from "parsimmon"
import PinEntity from "./PinEntity.js"
import Grammar from "../serialization/Grammar.js"

export default class UnknownPinEntity extends PinEntity {

    static lookbehind = ""
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsimmon.lazy(() => Parsimmon.seq(
            Grammar.regexMap(
                new RegExp(`${Grammar.Regex.Symbol.source}\\s*\\(\\s*`),
                result => result[1] ?? ""
            ),
            Grammar.createAttributeGrammar(this).sepBy1(Grammar.commaSeparation),
            Parsimmon.regex(/\s*(?:,\s*)?\)/)
        )
            .map(([lookbehind, attributes, _2]) => {
                let values = {}
                if (lookbehind.length) {
                    values.lookbehind = lookbehind
                }
                attributes.forEach(attributeSetter => attributeSetter(values))
                return new this(values)
            })
        )
    }

    constructor(values = {}) {
        super(values, true)
    }
}
