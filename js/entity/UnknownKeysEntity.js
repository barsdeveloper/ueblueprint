import IEntity from "./IEntity"

export default class UnknownKeysEntity extends IEntity {

    static attributes = {
        lookbehind:
        {
            value: "",
            showDefault: false,
            ignore: true,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.lookbehind
    }
}
