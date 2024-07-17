import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class BooleanEntity extends IEntity {

    static grammar = /** @type {P<BooleanEntity>} */(
        P.regArray(/(true)|(True)|(false)|(False)/)
            .map(v => {
                const result = (v[1] ?? v[2]) ? new this(true) : new this(false)
                result.uppercase = (v[2] ?? v[4]) !== undefined
                return result
            })
            .label("BooleanEntity")
    )

    #uppercase = true
    get uppercase() {
        return this.#uppercase
    }
    set uppercase(value) {
        this.#uppercase = value
    }

    constructor(value = false) {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
            ? this.#uppercase
                ? "True"
                : "true"
            : this.#uppercase
                ? "False"
                : "false"
    }
}
