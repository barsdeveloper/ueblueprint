import IEntity from "./IEntity.js"
import Utility from "../Utility.js"

export default class RealUnitEntity extends IEntity {

    static attributes = {
        value: 0,
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

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
