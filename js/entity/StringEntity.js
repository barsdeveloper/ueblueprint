import P from "parsernostrum"
import IEntity from "./IEntity.js"
import Utility from "../Utility.js"

export default class StringEntity extends IEntity {

    static grammar = P.doubleQuotedString.map(insideString => Utility.unescapeString(insideString))

    /** @param {String} value */
    constructor(value = "") {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
