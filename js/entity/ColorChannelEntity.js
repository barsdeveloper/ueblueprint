import Parsernostrum from "parsernostrum"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class ColorChannelEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(0),
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
