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
    static grammar = Grammar.createEntityGrammar(Vector4DEntity, false)

    constructor(values) {
        super(values)
        /** @type {NumberEntity} */ this.X
        /** @type {NumberEntity} */ this.Y
        /** @type {NumberEntity} */ this.Z
        /** @type {NumberEntity} */ this.W
    }

    /** @returns {[Number, Number, Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf(), this.Z.valueOf(), this.W.valueOf()]
    }
}
