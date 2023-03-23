import IntegerEntity from "./IntegerEntity.js"

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

    constructor(values = 0) {
        super(values)
    }
}
