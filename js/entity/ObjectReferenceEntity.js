import P from "parsernostrum"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class ObjectReferenceEntity extends IEntity {

    static typeReference = P.reg(
        // @ts-expect-error
        new RegExp(Grammar.Regex.Path.source + "|" + Grammar.symbol.getParser().regexp.source)
    )
    static fullReferenceGrammar = this.createFullReferenceGrammar()
    static grammar = this.createGrammar()

    #type
    get type() {
        return this.#type
    }
    set type(value) {
        this.#type = value
    }

    #path
    get path() {
        return this.#path
    }
    set path(value) {
        this.#name = ""
        this.#path = value
    }

    #full
    get full() {
        return this.#full
    }
    set full(value) {
        this.#full = value
    }

    #name = ""

    /** @param {(t: String, p: String) => String} full */
    constructor(
        type = "None",
        path = "",
        full = type.includes("/") || path
            ? (t, p) => `"${t + (p ? (`'${p}'`) : "")}"`
            : (t, p) => t) {
        super()
        this.#type = type
        this.#path = path
        this.#full = full
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createGrammar() {
        return P.alt(
            this.createFullReferenceSerializedGrammar(),
            this.createFullReferenceGrammar(),
            this.createTypeReferenceGrammar(),
        ).label("ObjectReferenceEntity")
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createFullReferenceGrammar() {
        return P.regArray(
            new RegExp(
                // @ts-expect-error
                "(" + this.typeReference.getParser().regexp.source + ")"
                + "(?:"
                + `'"(${Grammar.Regex.InsideString.source})"'`
                + "|"
                + `'(${Grammar.Regex.InsideSingleQuotedString.source})'`
                + ")"
            )
        ).map(([full, type, fullQuotedPath, simpleQuotedPath]) => {
            let fullQuoted = fullQuotedPath ? true : false
            let quotes = fullQuoted ? [`'"`, `"'`] : ["'", "'"]
            return new this(
                type,
                fullQuoted ? fullQuotedPath : simpleQuotedPath,
                (t, p) => t + quotes[0] + p + quotes[1]
            )
        })
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createFullReferenceSerializedGrammar() {
        return P.regArray(
            new RegExp(
                '"(' + Grammar.Regex.InsideString.source + "?)"
                + "(?:'(" + Grammar.Regex.InsideSingleQuotedString.source + `?)')?"`
            )
        ).map(([_0, type, path]) => new this(type, path, (t, p) => `"${t}${p ? `'${p}'` : ""}"`))
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createTypeReferenceGrammar() {
        return this.typeReference.map(v => new this(v, "", (t, p) => t))
    }

    static createNoneInstance() {
        return new this("None")
    }

    getName(dropCounter = false) {
        if (!this.#name) {
            if (!dropCounter) {
                return this.#name = Utility.getNameFromPath(this.path.replace(/_C$/, ""), dropCounter)
            }
            return Utility.getNameFromPath(this.path.replace(/_C$/, ""), dropCounter)
        }
        return this.#name
    }

    doSerialize(insideString = false) {
        let result = this.full(this.type, this.path)
        if (insideString) {
            result = Utility.escapeString(result, false)
        }
        return result
    }

    /** @param {IEntity} other */
    equals(other) {
        if (!(other instanceof ObjectReferenceEntity)) {
            return false
        }
        return this.type == other.type && this.path == other.path
    }

    toString() {
        return this.full(this.type, this.path)
    }
}
