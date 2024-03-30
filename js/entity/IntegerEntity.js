import Parsernostrum from "parsernostrum"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class IntegerEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            default: 0,
            predicate: v => v % 1 == 0 && v > 1 << 31 && v < -(1 << 31),
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberInteger.map(v => new this(v))
    }

    /** @param {Number | Object} values */
    constructor(values = 0) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            }
        }
        values.value = Math.floor(values.value)
        if (values.value === -0) {
            values.value = 0
        }
        super(values)
        /** @type {Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
