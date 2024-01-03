import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import P from "parsernostrum"

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
        return P.seq(
            // Lookbehind
            Grammar.regexMap(
                new RegExp(`(${Grammar.Regex.Path.source}|${Grammar.Regex.Symbol.source}\\s*)?\\(\\s*`),
                result => result[1] ?? ""
            ),
            P.seq(Grammar.attributeName, Grammar.equalSeparation).map(([attribute, equal]) => attribute)
                .chain(attributeName =>
                    Grammar.unknownValue
                        .map(attributeValue =>
                            values => values[attributeName] = attributeValue
                        )
                )
                .sepBy1(Grammar.commaSeparation),
            P.regexp(/\s*(?:,\s*)?\)/),
        )
            .map(([lookbehind, attributes, _2]) => {
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
