import IEntity from "./IEntity"

export default class IntegerEntity extends IEntity {

    static attributes = {
        value: 0,
    }

    /** @param {Object | Number | String} values */
    constructor(values = 0) {
        super(values)
        /** @type {Number} */
        this.value = Math.round(this.value)
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
