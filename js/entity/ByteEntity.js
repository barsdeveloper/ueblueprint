import Parsernostrum from "parsernostrum"
import AttributeInfo from "./AttributeInfo.js"
import IntegerEntity from "./IntegerEntity.js"

export default class ByteEntity extends IntegerEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            ...super.attributes.value,
            predicate: v => v % 1 == 0 && v >= 0 && v < 1 << 8,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberByte.map(v => new this(v))
    }

    constructor(values = 0) {
        super(values)
    }
}
