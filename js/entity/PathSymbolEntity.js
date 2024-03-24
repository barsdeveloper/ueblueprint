import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class PathSymbolEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            default: "",
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.symbol.map(v => new this(v))
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
