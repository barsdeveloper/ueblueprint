import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class SymbolEntity extends IEntity {

    static attributeConverter = {
        fromAttribute: (value, type) => new this(value),
        toAttribute: (value, type) => value.toString()
    }
    static grammar = this.createGrammar()

    /** @returns {P<SymbolEntity>} */
    static createGrammar() {
        return Grammar.symbol.map(v => new this(v)).label("SymbolEntity")
    }

    constructor(value = "") {
        super()
        this.value = value
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value
        if (Self.serialized) {
            result = `"${result}"`
        }
        return result
    }

    toString() {
        return this.value
    }
}
