import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class NumberEntity extends IEntity {

    static grammar = P.regArray(
        new RegExp(`(${P.number.getParser().parser.regexp.source})|(\\+?inf)|(-inf)`)
    ).map(([_0, n, plusInf, minusInf]) => new this(
        n ? Number(n) : plusInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY
    ))

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
        return this.value.toString()
    }
}
