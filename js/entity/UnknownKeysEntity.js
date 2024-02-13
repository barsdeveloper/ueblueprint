import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"

export default class UnknownKeysEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        lookbehind: {
            default: "",
            ignored: true,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            // Lookbehind
            Parsernostrum.reg(
                new RegExp(`(${Grammar.Regex.Path.source}|${Grammar.Regex.Symbol.source}\\s*)?\\(\\s*`),
                1
            ),
            Parsernostrum.seq(Grammar.attributeName, Grammar.equalSeparation).map(([attribute, equal]) => attribute)
                .chain(attributeName =>
                    Grammar.unknownValue.map(attributeValue =>
                        values => values[attributeName] = attributeValue
                    )
                )
                .sepBy(Grammar.commaSeparation),
            Parsernostrum.reg(/\s*(?:,\s*)?\)/),
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

    constructor(values) {
        super(values, true)
        /** @type {String} */ this.lookbehind
    }
}
