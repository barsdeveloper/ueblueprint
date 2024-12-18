import P from "parsernostrum"
import InvariantTextEntity from "./InvariantTextEntity.js"
import LocalizedTextEntity from "./LocalizedTextEntity.js"
import StringEntity from "./StringEntity.js"
import IEntity from "./IEntity.js"

export default class FormatTextEntity extends IEntity {

    static attributeSeparator = ", "
    static lookbehind = ["LOCGEN_FORMAT_NAMED", "LOCGEN_FORMAT_ORDERED"]
    static grammar = this.createGrammar()

    /** @param {(StringEntity | LocalizedTextEntity | InvariantTextEntity | FormatTextEntity)[]} values */
    constructor(values) {
        super()
        this.values = values
    }

    /** @returns {P<FormatTextEntity>} */
    static createGrammar() {
        return P.lazy(() => P.seq(
            // Resulting regex: /(LOCGEN_FORMAT_NAMED|LOCGEN_FORMAT_ORDERED)\s*/
            P.reg(new RegExp(String.raw`(${this.lookbehind.join("|")})\s*\(\s*`), 1),
            P.alt(
                ...[StringEntity, LocalizedTextEntity, InvariantTextEntity, FormatTextEntity].map(type => type.grammar)
            ).sepBy(P.reg(/\s*\,\s*/)),
            P.reg(/\s*\)/)
        )
            .map(([lookbehind, values]) => {
                const result = new this(values)
                result.lookbehind = lookbehind
                return result
            }))
            .label("FormatTextEntity")
    }

    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof FormatTextEntity} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        const separator = Self.attributeSeparator
        return this.lookbehind + "("
            + this.values.map(v => v.serialize(insideString)).join(separator)
            + (Self.trailing ? separator : "")
            + ")"
    }

    toString() {
        const pattern = this.values?.[0]?.toString() // The pattern is always the first element of the array
        if (!pattern) {
            return ""
        }
        const values = this.values.slice(1).map(v => v?.valueOf())
        let result = this.lookbehind == "LOCGEN_FORMAT_NAMED"
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
        return result
    }
}
