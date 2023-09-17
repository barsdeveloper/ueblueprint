import Configuration from "../Configuration.js"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Parsimmon from "parsimmon"
import Utility from "../Utility.js"

export default class ObjectReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        type: {
            default: "",
        },
        path: {
            default: "",
        },
    }
    static noneReferenceGrammar = Parsimmon.string("None").map(() => ObjectReferenceEntity.createNoneInstance())
    static fullReferenceGrammar = Parsimmon.seq(
        Grammar.typeReference,
        Parsimmon.regex(Grammar.Regex.InlineOptWhitespace),
        Grammar.pathQuotes
    )
        .map(([type, _2, path]) =>
            new ObjectReferenceEntity({ type: type, path: path })
        )
    static typeReferenceGrammar = Grammar.typeReference.map(v =>
        new ObjectReferenceEntity({ type: v, path: "" })
    )
    static pathReferenceGrammar = Grammar.path.map(path =>
        new ObjectReferenceEntity({ type: "", path: path })
    )

    static {
        this.cleanupAttributes(this.attributes)
    }

    static getGrammar() {
        return Parsimmon.alt(
            ObjectReferenceEntity.noneReferenceGrammar,
            ObjectReferenceEntity.fullReferenceGrammar,
            ObjectReferenceEntity.typeReferenceGrammar,
            ObjectReferenceEntity.pathReferenceGrammar,
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
    }

    static createNoneInstance() {
        return new ObjectReferenceEntity({ type: "None", path: "" })
    }

    sanitize() {
        if (this.type && !this.type.startsWith("/")) {
            let deprecatedType = this.type + "_Deprecated"
            let path = Object.keys(Configuration.paths)
                .find(type => {
                    const name = Utility.getNameFromPath(Configuration.paths[type])
                    return name === this.type || name === deprecatedType
                })
            if (path) {
                this.type = Configuration.paths[path]
            }
        }
    }

    getName() {
        return Utility.getNameFromPath(this.path.replace(/_C$/, ""))
    }

    toString() {
        return `${this.type}'"${this.path}"'`
    }
}
