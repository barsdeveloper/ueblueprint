import IntegerEntity from "./IntegerEntity.js"
import Parsernostrum from "parsernostrum"
import Utility from "../Utility.js"

export default class NaturalNumberEntity extends IntegerEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberNatural.map(v => new this(v))
    }

    constructor(values = 0) {
        super(values)
        this.value = Math.round(Utility.clamp(this.value, 0))
    }
}
