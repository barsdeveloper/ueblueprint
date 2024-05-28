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
    static grammar = Grammar.createEntityGrammar(VectorEntity, false)

    constructor(values) {
        super(values)
        /** @type {NumberEntity} */ this.X
        /** @type {NumberEntity} */ this.Y
        /** @type {NumberEntity} */ this.Z
    }

    /** @returns {[Number, Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf(), this.Z.valueOf()]
    }
}
