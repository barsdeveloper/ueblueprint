import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Parsimmon from "parsimmon"

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

    static getGrammar() {
        return Parsimmon.seq(
            // Lookbehind
            Grammar.regexMap(
                new RegExp(`(${Grammar.Regex.Path.source}|${Grammar.Regex.Symbol.source}\\s*)?\\(\\s*`),
                result => result[1] ?? ""
            ),
            Grammar.attributeName
                .skip(Grammar.equalSeparation)
                .chain(attributeName =>
                    Grammar.unknownValue
                        .map(attributeValue =>
                            values => values[attributeName] = attributeValue
                        )
                )
                .sepBy1(Grammar.commaSeparation),
            Parsimmon.regex(/\s*(?:,\s*)?\)/),
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
