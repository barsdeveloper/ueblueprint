import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class IdentifierEntity extends IEntity {

    static attributeConverter = {
        fromAttribute: (value, type) => new IdentifierEntity(value),
        toAttribute: (value, type) => value.toString()
    }
    static grammar = Grammar.symbol.map(v => new this(v))

    /** @param {String} value */
    constructor(value) {
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
