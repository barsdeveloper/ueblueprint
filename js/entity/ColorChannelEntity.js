import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class ColorChannelEntity extends IEntity {

    static grammar = this.createGrammar()

    constructor(value = 0) {
        super()
        this.value = value
    }

    /** @returns {P<ColorChannelEntity>} */
    static createGrammar() {
        return P.number.map(v => new this(v))
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value.toFixed(6)
        if (Self.serialized) {
            result = `"${result}"`
        }
        return result
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
