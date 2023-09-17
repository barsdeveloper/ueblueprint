import Parsimmon from "parsimmon"
import PinEntity from "./PinEntity.js"
import Grammar from "../serialization/Grammar.js"

export default class UnknownPinEntity extends PinEntity {

    static #grammar = Parsimmon.lazy(() => Parsimmon.seq(
        Grammar.regexMap(
            new RegExp(`${Grammar.Regex.Symbol.source}\\s*\\(\\s*`),
            result => result[1] ?? ""
        ),
        Grammar.createAttributeGrammar(UnknownPinEntity.#grammar).sepBy1(Grammar.commaSeparation),
        Parsimmon.regex(/\s*(?:,\s*)?\)/)
    )
        .map(([lookbehind, attributes, _2]) => {
            let values = {}
            if (lookbehind.length) {
                values.lookbehind = lookbehind
            }
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new UnknownPinEntity(values)
        })
    )
    static lookbehind = ""

    static getGrammar() {
        return UnknownPinEntity.#grammar
    }

    constructor(values = {}) {
        super(values, true)
    }
}
