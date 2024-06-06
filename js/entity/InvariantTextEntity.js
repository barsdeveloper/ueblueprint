import P from "parsernostrum"
import IPrintableEntity from "./IPrintableEntity.js"

export default class InvariantTextEntity extends IPrintableEntity {

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

    print() {
        let xxxx = P.alt(
            P.seq(
                P.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
                P.doubleQuotedString,
                P.reg(/\s*\)/)
            ).map(([_0, value, _2]) => Number(value)),
            P.reg(new RegExp(this.lookbehind)).map(() => 0) // InvariantTextEntity can not have arguments
        )
        return this.value
    }

    toString() {
        return this.lookbehind + "(" + this.value + ")"
    }
}
