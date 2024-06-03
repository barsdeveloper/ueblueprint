import P from "parsernostrum"
import Utility from "../Utility.js"
import IPrintableEntity from "./IPrintableEntity.js"

export default class StringEntity extends IPrintableEntity {

    static grammar = P.doubleQuotedString
        .map(insideString => new this(Utility.unescapeString(insideString)))
        .label("StringEntity")

    /** @param {String} value */
    constructor(value = "") {
        super()
        this.value = value
    }

    print() {
        return this.value
    }

    valueOf() {
        return this.value
    }

    toString(insideString = false) {
        let result = `"${Utility.escapeString(this.value)}"`
        if (insideString) {
            result = Utility.escapeString(result, false)
        }
        return result
    }
}
