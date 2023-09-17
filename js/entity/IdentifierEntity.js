import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class IdentifierEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: "",
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static attributeConverter = {
        fromAttribute: (value, type) => new IdentifierEntity(value),
        toAttribute: (value, type) => value.toString()
    }
    static #grammar = Grammar.symbol.map(v => new IdentifierEntity(v))

    static getGrammar() {
        return IdentifierEntity.#grammar
    }

    constructor(values) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            }
        }
        super(values)
        /** @type {String} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
