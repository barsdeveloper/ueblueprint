import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import PinEntity from "./PinEntity.js"

export default class UnknownPinEntity extends PinEntity {

    static grammar = P.seq(
        P.reg(new RegExp(`(${Grammar.Regex.Symbol.source})\\s*\\(\\s*`), 1),
        Grammar.createAttributeGrammar(this).sepBy(Grammar.commaSeparation),
        P.reg(/\s*(?:,\s*)?\)/)
    ).map(([lookbehind, attributes, _2]) => {
        lookbehind ??= ""
        let values = {}
        if (lookbehind.length) {
            values.lookbehind = lookbehind
        }
        attributes.forEach(attributeSetter => attributeSetter(values))
        return new this(values)
    }).label("UnknownPinEntity")
}
