import P from "parsernostrum"
import Utility from "../Utility.js"
import IntegerEntity from "./IntegerEntity.js"

export default class NaturalNumberEntity extends IntegerEntity {

    static grammar = this.createGrammar()

    get value() {
        return super.value
    }
    set value(value) {
        value = Math.round(Utility.clamp(value, 0))
        super.value = value
    }

    /** @returns {P<NaturalNumberEntity>} */
    static createGrammar() {
        return P.numberNatural.map(v => new this(v))
    }
}
