import IEntity from "./IEntity"
import Utility from "../Utility"

export default class RealUnitEntity extends IEntity {

    static attributes = {
        value: 0,
    }

    /** @param {Object | Number | String} values */
    constructor(values = 0) {
        super(values)
        this.value = Utility.clamp(this.value, 0, 1)
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toFixed(6)
    }
}
