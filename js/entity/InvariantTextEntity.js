import IEntity from "./IEntity"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"
    static attributes = {
        value: String,
    }

    constructor(options = {}) {
        super(options)
        /** @type {String} */ this.value
    }
}
