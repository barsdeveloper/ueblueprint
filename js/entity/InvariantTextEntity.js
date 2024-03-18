import Parsernostrum from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"
    static attributes = {
        ...super.attributes,
        value:AttributeInfo.createValue(""),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.seq(
                Parsernostrum.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
                Grammar.grammarFor(this.attributes.value),
                Parsernostrum.reg(/\s*\)/)
            )
                .map(([_0, value, _2]) => value),
            Parsernostrum.reg(new RegExp(this.lookbehind)) // InvariantTextEntity can not have arguments
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
}
