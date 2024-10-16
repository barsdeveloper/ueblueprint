import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import GuidEntity from "./GuidEntity.js"
import PinEntity from "./PinEntity.js"

export default class UnknownPinEntity extends PinEntity {

    static attributes = {
        ...super.attributes,
        PinId: GuidEntity
    }

    static grammar = this.createGrammar()

    /** @returns {P<UnknownPinEntity>} */
    static createGrammar() {
        return P.seq(
            // Lookbehind
            P.reg(new RegExp(`(${Grammar.Regex.Symbol.source}\\s*)\\(\\s*`), 1),
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
}
