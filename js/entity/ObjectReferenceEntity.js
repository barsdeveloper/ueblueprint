import IEntity from "./IEntity"

export default class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: String,
        path: String,
    }

    constructor(values = {}) {
        if (values.constructor !== Object) {
            values = {
                path: values
            }
        }
        super(values)
        /** @type {String} */ this.type
        /** @type {String} */ this.path
    }

    getName() {
        return this.path.match(/[^\.\/]+$/)[0]
    }
}
