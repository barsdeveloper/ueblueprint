import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class Vector4DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
        Z: NumberEntity.withDefault(),
        W: NumberEntity.withDefault(),
    }
    static grammar = Grammar.createEntityGrammar(this).label("Vector4DEntity")

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof Vector4DEntity.attributes.X>} */ this.X
        /** @type {InstanceType<typeof Vector4DEntity.attributes.Y>} */ this.Y
        /** @type {InstanceType<typeof Vector4DEntity.attributes.Z>} */ this.Z
        /** @type {InstanceType<typeof Vector4DEntity.attributes.W>} */ this.W
    }

    /** @returns {[Number, Number, Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf(), this.Z.valueOf(), this.W.valueOf()]
    }
}
