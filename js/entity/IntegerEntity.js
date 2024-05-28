import P from "parsernostrum"
import NumberEntity from "./NumberEntity.js"

// @ts-expect-error
export default class IntegerEntity extends NumberEntity {

    static grammar = P.numberInteger.map(v => new this(v))

    set value(value) {
        if (value >= -(1 << 31) && value < 1 << 31) {
            value = Math.floor(value)
            super.value = value
        }
    }
}
