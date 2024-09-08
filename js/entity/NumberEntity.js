import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Utility from "../Utility.js"

export default class NumberEntity extends IEntity {

    static numberRegexSource = String.raw`${Grammar.numberRegexSource}(?<=(?:\.(\d*0+))?)`
    static grammar = this.createGrammar()
    /** @type {Number} */
    static precision // Can override this.precision

    #precision
    get precision() {
        return /** @type {typeof NumberEntity} */(this.constructor).precision ?? this.#precision
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

    constructor(value = 0, precision = null) {
        super()
        this.value = Number(value)
        if (precision !== null) {
            this.#precision = Number(precision)
        }
    }

    /** @returns {P<NumberEntity>} */
    static createGrammar() {
        return P.regArray(
            new RegExp(`(?<n>${this.numberRegexSource})|(?<posInf>\\+?inf)|(?<negInf>-inf)`)
        ).map(({ 2: precision, groups: { n, posInf, negInf } }) => new this(
            n ? Number(n) : posInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY,
            precision?.length
        )
        ).label("NumberEntity")
    }

    /**
     * @template {typeof NumberEntity} T
     * @this {T}
     * @returns {T}
     */
    static withPrecision(value = 0) {
        const result = this.asUniqueClass()
        result.precision = value
        return result
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

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof NumberEntity} */(this.constructor),
    ) {
        if (this.value === Number.POSITIVE_INFINITY) {
            return "+inf"
        }
        if (this.value === Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        const precision = Self.precision ?? this.precision
        let result = precision !== undefined ? this.value.toFixed(precision) : this.value.toString()
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
