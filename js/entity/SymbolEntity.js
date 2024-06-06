import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class SymbolEntity extends IEntity {

    static attributeConverter = {
        fromAttribute: (value, type) => new this(value),
        toAttribute: (value, type) => value.toString()
    }
    static grammar = /** @type {P<SymbolEntity>} */(
        Grammar.symbol.map(v => new this(v)).label("SymbolEntity")
    )

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
