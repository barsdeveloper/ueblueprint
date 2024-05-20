import Parsernostrum from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class InvariantTextEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(""),
        lookbehind: new AttributeInfo({
            ...super.attributes.lookbehind,
            default: "INVTEXT",
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.seq(
                Parsernostrum.reg(new RegExp(`${this.attributes.lookbehind.default}\\s*\\(`)),
                Grammar.grammarFor(this.attributes.value),
                Parsernostrum.reg(/\s*\)/)
            )
                .map(([_0, value, _2]) => value),
            Parsernostrum.reg(new RegExp(this.attributes.lookbehind.default)) // InvariantTextEntity can not have arguments
                .map(() => "")
        ).map(value => new this(value))
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

    toString() {
        return this.value
    }
}
