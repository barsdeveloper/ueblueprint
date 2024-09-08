import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class RotatorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: NumberEntity.withDefault(),
        P: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof RotatorEntity.attributes.R>} */ this.R
        /** @type {InstanceType<typeof RotatorEntity.attributes.P>} */ this.P
        /** @type {InstanceType<typeof RotatorEntity.attributes.Y>} */ this.Y
    }

    static createGrammar() {
        return /** @type {P<RotatorEntity>} */(
            Grammar.createEntityGrammar(this, Grammar.commaSeparation, true).label("RotatorEntity")
        )
    }

    getRoll() {
        return this.R
    }

    getPitch() {
        return this.P
    }

    getYaw() {
        return this.Y
    }
}
