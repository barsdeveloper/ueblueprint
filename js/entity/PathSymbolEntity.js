import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class PathSymbolEntity extends IEntity {

    static grammar = Grammar.symbol.map(v => new this(v))

    constructor(value = "") {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
