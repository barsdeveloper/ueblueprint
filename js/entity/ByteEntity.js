import IntegerEntity from "./IntegerEntity.js"
import Grammar from "../serialization/Grammar.js"

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

    static getGrammar() {
        return Grammar.byteNumber.map(v => new ByteEntity(v))
    }

    constructor(values = 0) {
        super(values)
    }
}
