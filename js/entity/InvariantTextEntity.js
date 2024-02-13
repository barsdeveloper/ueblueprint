import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"
    static attributes = {
        ...super.attributes,
        value: {
            default: "",
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
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
