import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class Vector2DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
    }
    static grammar = Grammar.createEntityGrammar(this, false)

    constructor(values) {
        super(values)
        /** @type {NumberEntity} */ this.X
        /** @type {NumberEntity} */ this.Y
    }

    /** @returns {[Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf()]
    }
}
