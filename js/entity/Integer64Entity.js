import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"

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
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberBigInteger.map(v => new this(v))
    }

    /** @param {BigInt | Number} value */
    constructor(value = 0) {
        if (value.constructor !== Object) {
            value = {
                // @ts-expect-error
                value: value,
            }
        }
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
