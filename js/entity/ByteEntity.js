import P from "parsernostrum"
import IntegerEntity from "./IntegerEntity.js"

export default class ByteEntity extends IntegerEntity {

    static grammar = P.numberByte.map(v => new this(v))

    set value(value) {
        if (value % 1 == 0 && value >= 0 && value < 1 << 8) {
            super.value = value
        }
    }
}
