import P from "parsernostrum"
import IntegerEntity from "./IntegerEntity.js"

export default class ByteEntity extends IntegerEntity {

    static grammar = /** @type {P<ByteEntity>} */(
        P.numberByte.map(v => new this(v))
    )

    get value() {
        return super.value
    }
    set value(value) {
        value = Math.trunc(value)
        if (value >= 0 && value < 1 << 8) {
            super.value = value
        }
    }
}
