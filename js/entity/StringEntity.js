import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class StringEntity extends IEntity {

    static grammar = this.createGrammar()
    static escapedCharacters = /['"\\]/g
    static unescapedBackslash = /(?<=(?:[^\\]|^)(?:\\\\)*)\\(?!\\)/

    constructor(value = "") {
        super()
        this.value = value
    }

    /** @returns {P<StringEntity>} */
    static createGrammar() {
        return P.doubleQuotedString
            .map(insideString => new this(StringEntity.unescape(insideString)))
            .label("StringEntity")
    }


    /** @param {String} value */
    static escape(value, inline = true) {
        let result = value.replaceAll(new RegExp(`(${StringEntity.escapedCharacters.source})`, "g"), '\\$1')
        if (inline) {
            result = result
                .replaceAll("\n", "\\n") // Replace newline with \n
                .replaceAll("\t", "\\t") // Replace tab with \t
        }
        return result
    }

    /** @param {String} value */
    static unescape(value) {
        return value
            .replaceAll(new RegExp(StringEntity.unescapedBackslash.source + "t", "g"), "\t") // Replace tab with \t
            .replaceAll(new RegExp(StringEntity.unescapedBackslash.source + "n", "g"), "\n") // Replace newline with \n
            .replaceAll(new RegExp(`\\\\(${StringEntity.escapedCharacters.source})`, "g"), "$1")
    }

    doSerialize(insideString = false) {
        let result = `"${StringEntity.escape(this.value)}"`
        if (insideString) {
            result = StringEntity.escape(result, false)
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
