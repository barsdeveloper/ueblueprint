import P from "parsernostrum"
import Utility from "../Utility.js"
import IntegerEntity from "./IntegerEntity.js"

export default class NaturalNumberEntity extends IntegerEntity {

    static grammar = P.numberNatural.map(v => new this(v))

    get value() {
        return super.value
    }
    set value(value) {
        value = Math.round(Utility.clamp(this.value, 0))
        super.value = value
    }
}
