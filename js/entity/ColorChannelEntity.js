import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class ColorChannelEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            default: 0,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.number.map(value => new ColorChannelEntity(value))

    static getGrammar() {
        return ColorChannelEntity.#grammar
    }

    constructor(values = 0) {
        if (values.constructor !== Object) {
            // @ts-expect-error
            values = {
                value: values,
            }
        }
        super(values)
        /** @type {Number} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toFixed(6)
    }
}
