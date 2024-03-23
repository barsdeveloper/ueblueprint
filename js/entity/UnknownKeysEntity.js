import Parsernostrum from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class UnknownKeysEntity extends IEntity {


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
    }
}
