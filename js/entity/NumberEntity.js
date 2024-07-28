import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Utility from "../Utility.js"

export default class NumberEntity extends IEntity {

    static numberRegexSource = String.raw`${Grammar.numberRegexSource}(?<=(?:\.(\d*0+))?)`
    static grammar = this.createGrammar()

    #precision = 0
    get precision() {
        return this.#precision
    }
    set precision(value) {
        this.#precision = value
    }

    /**
     * @protected
     * @type {Number}
     */
    _value
    get value() {
        return this._value
    }
    set value(value) {
        if (value === -0) {
            value = 0
        }
        this._value = value
    }

    constructor(value = 0, precision = 0) {
        super()
        this.value = Number(value)
        this.#precision = Number(precision)
    }

    static createGrammar() {
        return /** @type {P<NumberEntity>} */(
            P.regArray(
                new RegExp(`(?<n>${this.numberRegexSource})|(?<posInf>\\+?inf)|(?<negInf>-inf)`)
            ).map(({ 2: precision, groups: { n, posInf, negInf } }) => new this(
                n ? Number(n) : posInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY,
                precision?.length
            )
            ).label("NumberEntity")
        )
    }

    /** @param {Number} num */
    static printNumber(num) {
        if (num == Number.POSITIVE_INFINITY) {
            return "inf"
        } else if (num == Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        return Utility.minDecimals(num)
    }

    serialize() {
        if (this.value === Number.POSITIVE_INFINITY) {
            return "+inf"
        }
        if (this.value === Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        return this.#precision ? this.value.toFixed(this.#precision) : this.value.toString()
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
