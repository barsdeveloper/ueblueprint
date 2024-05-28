import P from "parsernostrum"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class ObjectReferenceEntity extends IEntity {

    static #quotedParser = P.regArray(new RegExp(
        `'"(${Grammar.Regex.InsideString.source})"'`
        + "|"
        + `'(${Grammar.Regex.InsideSingleQuotedString.source})'`
    )).map(([_0, a, b]) => a ?? b)
    static typeReference = P.reg(
        new RegExp(Grammar.Regex.Path.source + "|" + Grammar.symbol.getParser().regexp.source)
    )
    static fullReferenceGrammar = P.regArray(
        new RegExp(
            "(" + this.typeReference.getParser().regexp.source + ")"
            + "(?:" + this.#quotedParser.getParser().parser.regexp.source + ")"
        )
    ).map(([full, type, ...path]) => new this(type, path.find(v => v), full))
    static fullReferenceSerializedGrammar = P.regArray(
        new RegExp(
            '"(' + Grammar.Regex.InsideString.source + "?)"
            + "(?:'(" + Grammar.Regex.InsideSingleQuotedString.source + `?)')?"`
        )
    ).map(([full, type, path]) => new this(type, path, full))
    static typeReferenceGrammar = this.typeReference.map(v => new this(v, "", v))
    static grammar = P.alt(
        this.fullReferenceSerializedGrammar,
        this.fullReferenceGrammar,
        this.typeReferenceGrammar,
    )

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
        this.#path = value
    }

    #full
    get full() {
        return this.#full
    }
    set full(value) {
        this.#full = value
    }


    constructor(type = "None", path = "", full = null) {
        super()
        this.#type = type
        this.#path = path
        this.#full = full ?? `"${this.type + (this.path ? (`'${this.path}'`) : "")}"`
    }

    static createNoneInstance() {
        return new ObjectReferenceEntity("None")
    }

    getName(dropCounter = false) {
        return Utility.getNameFromPath(this.path.replace(/_C$/, ""), dropCounter)
    }

    toString() {
        return this.full
    }
}
