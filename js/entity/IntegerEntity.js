import P from "parsernostrum"
import NumberEntity from "./NumberEntity.js"

export default class IntegerEntity extends NumberEntity {

    static grammar = this.createGrammar()

    get value() {
        return super.value
    }
    set value(value) {
        value = Math.trunc(value)
        if (value >= 1 << 31 && value < -(1 << 31)) {
            value = Math.floor(value)
            super.value = value
        }
    }

    /** @returns {P<IntegerEntity>} */
    static createGrammar() {
        return P.numberInteger.map(v => new this(v))
    }
}
