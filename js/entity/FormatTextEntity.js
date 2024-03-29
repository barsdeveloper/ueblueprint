import Parsernostrum from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"
import InvariantTextEntity from "./InvariantTextEntity.js"
import LocalizedTextEntity from "./LocalizedTextEntity.js"
import Union from "./Union.js"

export default class FormatTextEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            type: [new Union(String, LocalizedTextEntity, InvariantTextEntity, FormatTextEntity)],
            default: [],
        }),
        lookbehind: /** @type {AttributeInfo<Union<String[]>>} */(new AttributeInfo({
            ...super.attributes.lookbehind,
            default: new Union("LOCGEN_FORMAT_NAMED", "LOCGEN_FORMAT_ORDERED"),
        })),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(
                // Resulting regex: /(LOCGEN_FORMAT_NAMED|LOCGEN_FORMAT_ORDERED)\s*/
                new RegExp(`(${this.attributes.lookbehind.default.values.reduce((acc, cur) => acc + "|" + cur)})\\s*`),
                1
            ),
            Grammar.grammarFor(this.attributes.value)
        )
            .map(([lookbehind, values]) => {
                const result = new this({
                    value: values,
                    lookbehind,
                })
                return result
            })
    }

    constructor(values) {
        super(values)
        /** @type {(String | LocalizedTextEntity | InvariantTextEntity | FormatTextEntity)[]} */ this.value
    }

    toString() {
        const pattern = this.value?.[0]?.toString() // The pattern is always the first element of the array
        if (!pattern) {
            return ""
        }
        const values = this.value.slice(1).map(v => v.toString())
        return this.lookbehind == "LOCGEN_FORMAT_NAMED"
            ? pattern.replaceAll(/\{([a-zA-Z]\w*)\}/g, (substring, arg) => {
                const argLocation = values.indexOf(arg) + 1
                return argLocation > 0 && argLocation < values.length
                    ? values[argLocation]
                    : substring
            })
            : this.lookbehind == "LOCGEN_FORMAT_ORDERED"
                ? pattern.replaceAll(/\{(\d+)\}/g, (substring, arg) => {
                    const argValue = Number(arg)
                    return argValue < values.length
                        ? values[argValue]
                        : substring
                })
                : ""
    }
}
