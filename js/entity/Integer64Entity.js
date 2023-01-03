import IEntity from "./IEntity"

export default class Integer64Entity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            value: 0n,
            predicate: v => v >= -(1n << 63n) && v < 1n << 63n,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(value = 0) {
        super(value)
        /** @type {Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
