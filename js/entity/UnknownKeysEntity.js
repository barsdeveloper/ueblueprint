import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class UnknownKeysEntity extends IEntity {


    static grammar = P.seq(
        // Lookbehind
        P.reg(new RegExp(`(${Grammar.Regex.Path.source}|${Grammar.Regex.Symbol.source}\\s*)?\\(\\s*`), 1),
        P.seq(Grammar.attributeName, Grammar.equalSeparation).map(([attribute, equal]) => attribute)
            .chain(attributeName =>
                Grammar.unknownValue.map(attributeValue =>
                    values => values[attributeName] = attributeValue
                )
            )
            .sepBy(Grammar.commaSeparation),
        P.reg(/\s*(?:,\s*)?\)/),
    ).map(([lookbehind, attributes, _2]) => {
        lookbehind ??= ""
        let values = {}
        if (lookbehind.length) {
            values.lookbehind = lookbehind
        }
        attributes.forEach(attributeSetter => attributeSetter(values))
        return new this(values)
    })

    constructor(values = {}) {
        super(values)
    }
}
