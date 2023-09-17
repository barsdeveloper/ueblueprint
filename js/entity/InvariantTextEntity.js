import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Parsimmon from "parsimmon"

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
    static #grammar = Parsimmon.alt(
        Parsimmon.seq(
            Parsimmon.regex(new RegExp(`${InvariantTextEntity.lookbehind}\\s*\\(`)),
            Grammar.grammarFor(InvariantTextEntity.attributes.value),
            Parsimmon.regex(/\s*\)/)
        )
            .map(([_0, value, _2]) => value),
        Parsimmon.regex(new RegExp(InvariantTextEntity.lookbehind)) // InvariantTextEntity can not have arguments
            .map(() => "")
    ).map(value => new InvariantTextEntity(value))

    static getGrammar() {
        return InvariantTextEntity.#grammar
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
