import IEntity from "./IEntity.js"

export default class Integer64Entity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: 0n,
            predicate: v => v >= -(1n << 63n) && v < 1n << 63n,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    /** @param {BigInt | Number} value */
    constructor(value = 0) {
        super(value)
        /** @type {BigInt | Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
