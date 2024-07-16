import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"

    static grammar = /** @type {P<InvariantTextEntity>} */(
        P.alt(
            P.seq(
                P.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
                P.doubleQuotedString,
                P.reg(/\s*\)/)
            ).map(([_0, value, _2]) => Number(value)),
            P.reg(new RegExp(this.lookbehind)).map(() => 0) // InvariantTextEntity can not have arguments
        )
            .map(value => new this(value))
            .label("InvariantTextEntity")
    )

    constructor(value = "") {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.lookbehind + "(" + this.value + ")"
    }
}
