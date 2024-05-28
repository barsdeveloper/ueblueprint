import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"

    static grammar = P.alt(
        P.seq(
            P.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
            P.doubleQuotedString,
            P.reg(/\s*\)/)
        ).map(([_0, value, _2]) => new this(value)),
        P.reg(new RegExp(this.lookbehind)).map(() => new this()) // InvariantTextEntity can not have arguments
    ).map(value => new this(value))

    constructor(value = "") {
        super()
        this.value = value
    }

    toString() {
        return this.value
    }
}
