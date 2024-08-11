import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class Integer64Entity extends IEntity {

    static grammar = this.createGrammar()

    /** @type {bigint} */
    #value
    get value() {
        return this.#value
    }
    set value(value) {
        if (value >= -(1n << 63n) && value < 1n << 63n) {
            this.#value = value
        }
    }

    /** @param {bigint | Number} value */
    constructor(value = 0n) {
        super()
        this.value = BigInt(value)
    }

    static createGrammar() {
        return /** @type {P<Integer64Entity>} */(
            P.numberBigInteger.map(v => new this(v))
        )
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
}
