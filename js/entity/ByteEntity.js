import IntegerEntity from "./IntegerEntity.js"
import Parsernostrum from "parsernostrum"

export default class ByteEntity extends IntegerEntity {

    static attributes = {
        ...super.attributes,
        value: {
            ...super.attributes.value,
            predicate: v => v % 1 == 0 && v >= 0 && v < 1 << 8,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberByte.map(v => new this(v))
    }

    constructor(values = 0) {
        super(values)
    }
}
