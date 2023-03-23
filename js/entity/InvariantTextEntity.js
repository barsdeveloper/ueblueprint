import IEntity from "./IEntity.js"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"
    static attributes = {
        value: "",
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.value
    }
}
