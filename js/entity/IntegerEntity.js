import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"

export default class IntegerEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: 0,
            predicate: v => v % 1 == 0 && v > 1 << 31 && v < -(1 << 31),
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberInteger.map(v => new this(v))
    }

    /** @param {Number | AttributeInformation} value */
    constructor(value = 0) {
        super(value.constructor === Object
            ? value
            : {
                value: value,
            }
        )
        /** @type {Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
