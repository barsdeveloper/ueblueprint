import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class VectorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
        Z: NumberEntity.withDefault(),
    }
    static grammar = Grammar.createEntityGrammar(this).label("VectorEntity")

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof VectorEntity.attributes.X>} */ this.X
        /** @type {InstanceType<typeof VectorEntity.attributes.Y>} */ this.Y
        /** @type {InstanceType<typeof VectorEntity.attributes.X>} */ this.Z
    }

    /** @returns {[Number, Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf(), this.Z.valueOf()]
    }
}
