import IntegerEntity from "./IntegerEntity.js"
import Utility from "../Utility.js"

export default class NaturalNumberEntity extends IntegerEntity {

    constructor(values) {
        super(values)
        this.value = Math.round(Utility.clamp(this.value, 0))
    }
}
