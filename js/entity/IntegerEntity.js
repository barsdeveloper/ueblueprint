import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class IntegerEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: 0,
            predicate: v => v % 1 == 0 && v > 1 << 31 && v < -(1 << 31),
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.integer.map(v => new IntegerEntity(v))

    static getGrammar() {
        return IntegerEntity.#grammar
    }

    constructor(value = 0) {
        if (value.constructor !== Object) {
            // @ts-expect-error
            value = {
                value: value,
            }
        }
        super(value)
        /** @type {Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
