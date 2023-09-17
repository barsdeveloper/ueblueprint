import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class SymbolEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: "",
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.symbol.map(v => new SymbolEntity(v))

    static getGrammar() {
        return SymbolEntity.#grammar
    }

    /** @param {String | Object} values */
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
