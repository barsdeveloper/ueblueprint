import Parsernostrum from "parsernostrum"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class Integer64Entity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            default: 0n,
            predicate: v => v >= -(1n << 63n) && v < 1n << 63n,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberBigInteger.map(v => new this(v))
    }

    /** @param {BigInt | Number | Object} values */
    constructor(values = 0) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            }
        }
        if (values.value === -0) {
            values.value = 0n
        }
        super(values)
        /** @type {BigInt} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
