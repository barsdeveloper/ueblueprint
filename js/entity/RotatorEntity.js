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
    static grammar = Grammar.createEntityGrammar(this, false)

    constructor(values) {
        super(values)
        /** @type {NumberEntity} */ this.R
        /** @type {NumberEntity} */ this.P
        /** @type {NumberEntity} */ this.Y
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
