import P from "parsernostrum"
import Utility from "../Utility.js"
import IEntity from "./IEntity.js"

export default class StringEntity extends IEntity {

    static grammar = /** @type {P<StringEntity>} */(
        P.doubleQuotedString
            .map(insideString => new this(Utility.unescapeString(insideString)))
            .label("StringEntity")
    )

    /** @param {String} value */
    constructor(value = "") {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString(
        insideString = false,
        indentation = "",
        Self = this.Self(),
        printKey = Self.printKey,
        wrap = Self.wrap,
    ) {
        let result = `"${Utility.escapeString(this.value)}"`
        if (insideString) {
            result = Utility.escapeString(result, false)
        }
        return result
    }
}
