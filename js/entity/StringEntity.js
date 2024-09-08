import P from "parsernostrum"
import Utility from "../Utility.js"
import IEntity from "./IEntity.js"

export default class StringEntity extends IEntity {

    static grammar = this.createGrammar()

    constructor(value = "") {
        super()
        this.value = value
    }

    static createGrammar() {
        return /** @type {P<StringEntity>} */(
            P.doubleQuotedString
                .map(insideString => new this(Utility.unescapeString(insideString)))
                .label("StringEntity")
        )
    }

    doSerialize(insideString = false) {
        let result = `"${Utility.escapeString(this.value)}"`
        if (insideString) {
            result = Utility.escapeString(result, false)
        }
        return result
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
