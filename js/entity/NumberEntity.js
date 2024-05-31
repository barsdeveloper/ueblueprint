import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class NumberEntity extends IEntity {

    static grammar = P.regArray(
        new RegExp(`(${Grammar.numberRegexSource})|(\\+?inf)|(-inf)`)
    ).map(([_0, n, plusInf, minusInf]) => new this(
        n ? Number(n) : plusInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY
    )).label("NumberEntity")

    /** @type {Number} */
    #value
    get value() {
        return this.#value
    }
    set value(value) {
        if (value === -0) {
            value = 0
        }
        this.#value = value
    }

    constructor(value = 0) {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        if (this.value === Number.POSITIVE_INFINITY) {
            return "+inf"
        }
        if (this.value === Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        return this.value.toString()
    }
}
