import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class ColorChannelEntity extends IEntity {

    static grammar = /** @type {P<ColorChannelEntity>} */(
        P.number.map(v => new this(v))
    )

    constructor(value = 0) {
        super()
        this.value = value
    }

    valueOf() {
        return this.value
    }

    serialize() {
        return this.value.toFixed(6)
    }
}
