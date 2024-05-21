import Parsernostrum from "parsernostrum"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class ObjectReferenceEntity extends IEntity {

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
        _full: new AttributeInfo({
            ignored: true,
        }),
    }
    static quoted = Parsernostrum.regArray(new RegExp(
        `'"(${Grammar.Regex.InsideString.source})"'`
        + "|"
        + `'(${Grammar.Regex.InsideSingleQuotedString.source})'`
    )).map(([_0, a, b]) => a ?? b)
    static path = this.quoted.getParser().parser.regexp.source + "|" + Grammar.Regex.Path.source
    static typeReference = Parsernostrum.reg(
        new RegExp(Grammar.Regex.Path.source + "|" + Grammar.symbol.getParser().regexp.source)
    )
    static fullReferenceGrammar = Parsernostrum.regArray(
        new RegExp(
            "(" + this.typeReference.getParser().regexp.source + ")"
            + "(?:" + this.quoted.getParser().parser.regexp.source + ")"
        )
    ).map(([_full, type, ...path]) => new this({ type, path: path.find(v => v), _full }))
    static fullReferenceSerializedGrammar = Parsernostrum.regArray(
        new RegExp(
            '"(' + Grammar.Regex.InsideString.source + "?)"
            + "(?:'(" + Grammar.Regex.InsideSingleQuotedString.source + `?)')?"`
        )
    ).map(([_full, type, path]) => new this({ type, path, _full }))
    static typeReferenceGrammar = this.typeReference.map(v => new this({ type: v, path: "", _full: v }))
    static grammar = this.createGrammar()

    constructor(values = {}) {
        if (values.constructor === String) {
            values = {
                path: values
            }
        }
        super(values)
        if (!values._full || values._full.length === 0) {
            this._full = `"${this.type + (this.path ? (`'${this.path}'`) : "")}"`
        }
        /** @type {String} */ this.type
        /** @type {String} */ this.path
    }

    static createGrammar() {
        return Parsernostrum.alt(
            this.fullReferenceSerializedGrammar,
            this.fullReferenceGrammar,
            this.typeReferenceGrammar,
        )
    }

    static createNoneInstance() {
        return new ObjectReferenceEntity({ type: "None", path: "" })
    }

    getName(dropCounter = false) {
        return Utility.getNameFromPath(this.path.replace(/_C$/, ""), dropCounter)
    }

    toString() {
        return this._full
    }
}
