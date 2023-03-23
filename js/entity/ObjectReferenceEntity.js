import IEntity from "./IEntity.js"

export default class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: "",
        path: "",
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

    getName() {
        return this.path.match(/[^\.\/]+$/)?.[0] ?? ""
    }
}
