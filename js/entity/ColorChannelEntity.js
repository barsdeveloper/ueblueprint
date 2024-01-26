import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"

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
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.number.map(value => new this(value))
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
