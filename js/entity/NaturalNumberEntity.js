import P from "parsernostrum"
import Utility from "../Utility.js"
import IntegerEntity from "./IntegerEntity.js"

export default class NaturalNumberEntity extends IntegerEntity {

    static grammar = P.numberNatural.map(v => new this(v))

    set value(value) {
        value = Math.round(Utility.clamp(this.value, 0))
        super.value = value
    }

    constructor(value = 0) {
        super(value)
    }
}
