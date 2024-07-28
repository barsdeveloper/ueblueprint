import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class BooleanEntity extends IEntity {

    static grammar = this.createGrammar()
    static booleanConverter = {
        fromAttribute: (value, type) => {
            value ? "true" : "false"
        },
        toAttribute: (value, type) => {
            if (value === true) {
                return "true"
            }
            if (value === false) {
                return "false"
            }
            return ""
        }
    }

    #uppercase = true
    get uppercase() {
        return this.#uppercase
    }
    set uppercase(value) {
        this.#uppercase = value
    }

    static createGrammar() {
        return /** @type {P<BooleanEntity>} */(
            P.regArray(/(true)|(True)|(false)|(False)/)
                .map(v => {
                    const result = (v[1] ?? v[2]) ? new this(true) : new this(false)
                    result.uppercase = (v[2] ?? v[4]) !== undefined
                    return result
                })
                .label("BooleanEntity")
        )
    }

    constructor(value = false) {
        super()
        this.value = value
    }

    serialize() {
        return this.value
            ? this.#uppercase
                ? "True"
                : "true"
            : this.#uppercase
                ? "False"
                : "false"
    }

    valueOf() {
        return this.value
    }
}
