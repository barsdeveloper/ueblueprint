import IntegerEntity from "./IntegerEntity"

export default class ByteEntity extends IntegerEntity {

    static attributes = {
        value: 0,
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    /** @param {Object | Number | String} values */
    constructor(values = 0) {
        super(values)
        const value = Math.round(this.value)
        this.value = value >= 0 && value < 1 << 8 ? value : 0
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
