import Grammar from "../serialization/Grammar.js"
import IntegerEntity from "./IntegerEntity.js"
import Utility from "../Utility.js"

export default class NaturalNumberEntity extends IntegerEntity {

    static #grammar = Grammar.naturalNumber.map(v => new NaturalNumberEntity(v))

    static getGrammar() {
        return NaturalNumberEntity.#grammar
    }

    constructor(values = 0) {
        super(values)
        this.value = Math.round(Utility.clamp(this.value, 0))
    }
}
