import Configuration from "../Configuration.js"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"
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
    static {
        this.cleanupAttributes(this.attributes)
    }
    static noneReferenceGrammar = Parsernostrum.str("None").map(() => this.createNoneInstance())
    static fullReferenceGrammar = Parsernostrum.seq(
        Grammar.typeReference,
        Parsernostrum.whitespaceInlineOpt,
        Grammar.pathQuotes
    ).map(([type, _2, path]) => new this({ type, path }))
    static typeReferenceGrammar = Grammar.typeReference.map(v => new this({ type: v, path: "" }))
    static pathReferenceGrammar = Grammar.path.map(path => new this({ type: "", path: path }))
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            this.noneReferenceGrammar,
            this.fullReferenceGrammar,
            this.typeReferenceGrammar,
            this.pathReferenceGrammar,
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
