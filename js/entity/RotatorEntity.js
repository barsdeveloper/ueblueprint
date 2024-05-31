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
    static grammar = Grammar.createEntityGrammar(this).label("RotatorEntity")

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof RotatorEntity.attributes.R>} */ this.R
        /** @type {InstanceType<typeof RotatorEntity.attributes.P>} */ this.P
        /** @type {InstanceType<typeof RotatorEntity.attributes.Y>} */ this.Y
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
