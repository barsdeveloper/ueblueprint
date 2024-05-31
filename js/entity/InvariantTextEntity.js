import Parsernostrum from "parsernostrum"
import IPrintableEntity from "./IPrintableEntity.js"

export default class InvariantTextEntity extends IPrintableEntity {

    static lookbehind = "INVTEXT"

    static grammar = Parsernostrum.alt(
        Parsernostrum.seq(
            Parsernostrum.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
            Parsernostrum.doubleQuotedString,
            Parsernostrum.reg(/\s*\)/)
        ).map(([_0, value, _2]) => Number(value)),
        Parsernostrum.reg(new RegExp(this.lookbehind)).map(() => 0) // InvariantTextEntity can not have arguments
    )
        .map(value => new this(value))
        .label("InvariantTextEntity")

    constructor(value = "") {
        super()
        this.value = value
    }

    print() {
        let xxxx = Parsernostrum.alt(
            Parsernostrum.seq(
                Parsernostrum.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
                Parsernostrum.doubleQuotedString,
                Parsernostrum.reg(/\s*\)/)
            ).map(([_0, value, _2]) => Number(value)),
            Parsernostrum.reg(new RegExp(this.lookbehind)).map(() => 0) // InvariantTextEntity can not have arguments
        )
        return this.value
    }

    toString() {
        return this.lookbehind + "(" + this.value + ")"
    }
}
