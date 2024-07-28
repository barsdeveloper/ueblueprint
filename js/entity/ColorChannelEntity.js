import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class ColorChannelEntity extends IEntity {

    static grammar = this.createGrammar()

    constructor(value = 0) {
        super()
        this.value = value
    }

    static createGrammar() {
        return  /** @type {P<ColorChannelEntity>} */(
            P.number.map(v => new this(v))
        )
    }

    serialize() {
        return this.value.toFixed(6)
    }

    valueOf() {
        return this.value
    }
}
