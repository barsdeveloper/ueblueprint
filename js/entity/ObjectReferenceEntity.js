import Parsernostrum from "parsernostrum"
import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class ObjectReferenceEntity extends IEntity {

    static #quoteSymbols = [
        [`'"`, Grammar.Regex.InsideString.source],
        [`'`, Grammar.Regex.InsideSingleQuotedString.source],
        [`"`, Grammar.Regex.InsideString.source]
    ]
    static attributes = {
        ...super.attributes,
        type: new AttributeInfo({
            default: "",
            serialized: true,
        }),
        path: new AttributeInfo({
            default: "",
            serialized: true,
        }),
        delim: new AttributeInfo({
            ignored: true,
        }),
    }
    static quoted = Parsernostrum.regArray(new RegExp(
        this.#quoteSymbols.map(([delim, parser]) =>
            delim + "(" + parser + ")" + delim.split("").reverse().join("")).join("|")
    )).map(([_0, a, b, c]) => a ?? b ?? c)
    static path = this.quoted.getParser().parser.regexp.source + "|" + Grammar.Regex.Path.source
    static typeReference = Parsernostrum.reg(
        new RegExp(Grammar.Regex.Path.source + "|" + Grammar.symbol.getParser().regexp.source)
    )
    static fullReferenceGrammar = Parsernostrum.regArray(
        new RegExp(
            "(" + this.typeReference.getParser().regexp.source + ")"
            + /\s*/.source
            + "(?:" + this.quoted.getParser().parser.regexp.source + ")"
        )
    ).map(([_0, type, ...path]) => new this({
        type,
        path: path.find(v => v),
        delim: this.#quoteSymbols[path.findIndex(v => v)]?.[0] ?? "",
    }))
    static fullReferenceSerializedGrammar = Parsernostrum.regArray(
        new RegExp(
            "(" + this.typeReference.getParser().regexp.source + ")"
            + /\s*/.source
            + `'(` + Grammar.Regex.InsideSingleQuotedString.source + `)'`
        )
    ).map(([_0, type, ...path]) => new this({
        type,
        path: path.find(v => v),
        delim: "'",
    }))
    static typeReferenceGrammar = this.typeReference.map(v => new this({ type: v, path: "" }))
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.seq(
                Parsernostrum.str('"'),
                Parsernostrum.alt(
                    this.fullReferenceSerializedGrammar,
                    this.typeReferenceGrammar,
                ),
                Parsernostrum.str('"'),
            ).map(([_0, objectReference, _1]) => objectReference),
            this.fullReferenceGrammar.map(v => (Utility.objectSet(v, ["attributes", "type", "serialized"], false), v)),
            this.typeReferenceGrammar.map(v => (Utility.objectSet(v, ["attributes", "type", "serialized"], false), v)),
        )
    }

    constructor(values = {}) {
        if (values.constructor === String) {
            values = {
                path: values
            }
        }
        super(values)
        /** @type {String} */ this.type
        /** @type {String} */ this.path
        /** @type {String} */ this.delim
    }

    static createNoneInstance() {
        return new ObjectReferenceEntity({ type: "None", path: "" })
    }

    getName() {
        return Utility.getNameFromPath(this.path.replace(/_C$/, ""))
    }

    toString() {
        return this.type + (this.path ? (this.delim + this.path + this.delim.split("").reverse().join("")) : "")
    }
}
