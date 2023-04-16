import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import IEntity from "./IEntity.js"

export default class ObjectReferenceEntity extends IEntity {

    static attributes = {
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

    sanitize() {
        if (this.type && !this.type.startsWith("/")) {
            let deprecatedType = this.type + "_Deprecated"
            let nodeType = Object.keys(Configuration.nodeType)
                .find(type => {
                    const name = Utility.getNameFromPath(Configuration.nodeType[type])
                    return name === this.type || name === deprecatedType
                })
            if (nodeType) {
                this.type = Configuration.nodeType[nodeType]
            }
        }
    }

    getName() {
        return Utility.getNameFromPath(this.path)
    }
}
