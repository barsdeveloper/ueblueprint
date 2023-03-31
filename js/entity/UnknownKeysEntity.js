import IEntity from "./IEntity.js"

export default class UnknownKeysEntity extends IEntity {

    static attributes = {
        lookbehind:
        {
            value: "",
            showDefault: false,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values, true)
        /** @type {String} */ this.lookbehind
    }
}
