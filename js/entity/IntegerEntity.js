import IEntity from "./IEntity.js"

export default class IntegerEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            value: 0,
            predicate: v => v % 1 == 0 && v > 1 << 31 && v < -(1 << 31),
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(value = 0) {
        super(value)
        /** @type {Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
