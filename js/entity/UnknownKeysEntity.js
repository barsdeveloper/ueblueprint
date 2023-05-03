import IEntity from "./IEntity.js"

export default class UnknownKeysEntity extends IEntity {

    static attributes = {
        lookbehind: {
            default: "",
            showDefault: true,
            ignored: true,
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
