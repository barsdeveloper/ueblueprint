import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class Vector2DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
    }
    static grammar = Grammar.createEntityGrammar(this).label("Vector2DEntity")

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof Vector2DEntity.attributes.X>} */ this.X
        /** @type {InstanceType<typeof Vector2DEntity.attributes.Y>} */ this.Y
    }

    /** @returns {[Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf()]
    }
}
