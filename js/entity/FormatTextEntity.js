import P from "parsernostrum"
import IPrintableEntity from "./IPrintableEntity.js"
import InvariantTextEntity from "./InvariantTextEntity.js"
import LocalizedTextEntity from "./LocalizedTextEntity.js"
import StringEntity from "./StringEntity.js"

export default class FormatTextEntity extends IPrintableEntity {

    static lookbehind = ["LOCGEN_FORMAT_NAMED", "LOCGEN_FORMAT_ORDERED"]
    /** @type {P<FormatTextEntity>} */
    static grammar = P.lazy(() => P.seq(
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

    /** @param {(StringEntity | LocalizedTextEntity | InvariantTextEntity | FormatTextEntity)[]} values */
    constructor(values) {
        super()
        this.values = values
    }

    print() {
        const pattern = this.values?.[0]?.print() // The pattern is always the first element of the array
        if (!pattern) {
            return ""
        }

        const values = this.values.slice(1).map(v => v.print())
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
