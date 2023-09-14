import IEntity from "./IEntity.js"

export default class ColorChannelEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: 0,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values = 0) {
        if (values.constructor !== Object) {
            // @ts-expect-error
            values = {
                value: values,
            }
        }
        super(values)
        /** @type {Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toFixed(6)
    }
}
