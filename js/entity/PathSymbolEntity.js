import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class PathSymbolEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: "",
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.symbol.map(v => new PathSymbolEntity(v))

    static getGrammar() {
        return PathSymbolEntity.#grammar
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
