import P from "parsernostrum"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class LocalizedTextEntity extends IEntity {

    static lookbehind = "NSLOCTEXT"
    static grammar = P.regArray(new RegExp(
        String.raw`${this.attributes.lookbehind.default}\s*\(`
        + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
        + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
        + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*`
        + String.raw`(?:,\s+)?`
        + String.raw`\)`,
        "m"
    )).map(matchResult => new this(
        Utility.unescapeString(matchResult[1]),
        Utility.unescapeString(matchResult[2]),
        Utility.unescapeString(matchResult[3]),
    ))

    #namespace
    get namespace() {
        return this.#namespace
    }
    set namespace(value) {
        this.#namespace = value
    }

    #key
    get key() {
        return this.#key
    }
    set key(value) {
        this.#key = value
    }

    #value
    get value() {
        return this.#value
    }
    set value(value) {
        this.#value = value
    }


    constructor(namespace = "", key = "", value = "") {
        super()
        this.namespace = namespace
        this.key = key
        this.value = value
    }

    toString() {
        return Utility.capitalFirstLetter(this.value)
    }
}
