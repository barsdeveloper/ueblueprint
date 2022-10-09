import IEntity from "./IEntity"

export default class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: String,
        path: String,
    }

    constructor(options = {}) {
        super(options)
        /** @type {String} */ this.type
        /** @type {String} */ this.path
    }
}
