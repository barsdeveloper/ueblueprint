import IEntity from "./IEntity"

export default class IntegerEntity extends IEntity {

    static attributes = {
        value: 0,
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    /** @param {Object | Number | String} value */
    constructor(value = 0) {
        super(value)
        this.value = Math.round(this.value)
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
