import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class Integer64Entity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: 0n,
            predicate: v => v >= -(1n << 63n) && v < 1n << 63n,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.bigInt.map(v => new Integer64Entity(v))

    static getGrammar() {
        return Integer64Entity.#grammar
    }

    /** @param {BigInt | Number} value */
    constructor(value = 0) {
        if (value.constructor !== Object) {
            value = {
                // @ts-expect-error
                value: value,
            }
        }
        super(value)
        /** @type {BigInt | Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
