import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import InvariantTextEntity from "./InvariantTextEntity.js"
import LocalizedTextEntity from "./LocalizedTextEntity.js"
import Parsernostrum from "parsernostrum"
import Union from "./Union.js"

export default class FormatTextEntity extends IEntity {

    static lookbehind = new Union("LOCGEN_FORMAT_NAMED", "LOCGEN_FORMAT_ORDERED")
    static attributes = {
        ...super.attributes,
        value: {
            type: [new Union(String, LocalizedTextEntity, InvariantTextEntity, FormatTextEntity)],
            default: [],
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(
                // Resulting regex: /(LOCGEN_FORMAT_NAMED|LOCGEN_FORMAT_ORDERED)\s*/
                new RegExp(`(${this.lookbehind.values.reduce((acc, cur) => acc + "|" + cur)})\\s*`),
                1
            ),
            Grammar.grammarFor(this.attributes.value)
        )
            .map(([lookbehind, values]) => {
                const result = new this({
                    value: values,
                })
                result.lookbehind = lookbehind
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
