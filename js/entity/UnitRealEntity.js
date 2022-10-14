import IEntity from "./IEntity"
import Utility from "../Utility"

export default class RealUnitEntity extends IEntity {

    static attributes = {
        value: Number,
    }

    /** @param {Object | Number | String} options */
    constructor(options = 0) {
        super(options)
        /** @type {Number} */
        this.value = Utility.clamp(this.value, 0, 1)
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toFixed(6)
    }
}