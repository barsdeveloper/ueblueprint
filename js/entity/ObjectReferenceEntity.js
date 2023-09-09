import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import IEntity from "./IEntity.js"

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
        return Utility.getNameFromPath(this.path)
    }

    toString() {
        return `${this.type}'"${this.path}"'`
    }
}
