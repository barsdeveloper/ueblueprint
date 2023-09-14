import IEntity from "./IEntity.js"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"
    static attributes = {
        ...super.attributes,
        value: {
            default: "",
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            }
        }
        super(values)
        /** @type {String} */ this.value
    }
}
