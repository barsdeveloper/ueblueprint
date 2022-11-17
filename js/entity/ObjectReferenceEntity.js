import IEntity from "./IEntity"

export default class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: String,
        path: String,
    }

    constructor(options = {}) {
        if (options.constructor !== Object) {
            options = {
                path: options
            }
        }
        super(options)
        /** @type {String} */ this.type
        /** @type {String} */ this.path
    }

    getName() {
        return this.path.match(/[^\.\/]+$/)[0]
    }
}
