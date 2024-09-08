import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class Integer64Entity extends IEntity {

    static grammar = this.createGrammar()

    /**
     * @protected
     * @type {bigint}
     */
    _value
    get value() {
        return this._value
    }
    set value(value) {
        if (value >= -(1n << 63n) && value < 1n << 63n) {
            this._value = value
        }
    }

    /** @param {bigint | Number} value */
    constructor(value = 0n) {
        super()
        this.value = BigInt(value)
    }

    /** @returns {P<Integer64Entity>} */
    static createGrammar() {
        return P.numberBigInteger.map(v => new this(v))
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value.toString()
        if (Self.serialized) {
            result = `"${result}"`
        }
        return result
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
