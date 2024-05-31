import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class BooleanEntity extends IEntity {

    static grammar = P.regArray(/(true)|false/i)
        .map(v => v[1] ? new this(true) : new this(false))
        .label("BooleanEntity")

    constructor(value = false) {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString(insideString = false) {
        return this.value
            ? insideString
                ? "true"
                : "True"
            : insideString
                ? "false"
                : "False"
    }
}
