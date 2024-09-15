import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"

    static grammar = this.createGrammar()

    constructor(value = "") {
        super()
        this.value = value
    }

    /** @returns {P<InvariantTextEntity>} */
    static createGrammar() {
        return P.alt(
            P.seq(
                P.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
                P.doubleQuotedString,
                P.reg(/\s*\)/)
            ).map(([_0, value, _2]) => value),
            P.reg(new RegExp(this.lookbehind)).map(() => "") // InvariantTextEntity can have no arguments
        )
            .map(value => new this(value))
            .label("InvariantTextEntity")
    }

    doSerialize() {
        return this.lookbehind + '("' + this.value + '")'
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
