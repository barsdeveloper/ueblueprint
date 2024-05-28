import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class SymbolEntity extends IEntity {

    static grammar = Grammar.symbol.map(v => new this(v))

    /** @param {String} value */
    constructor(value = "") {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
