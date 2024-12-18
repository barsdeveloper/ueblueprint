import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class Vector2DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values)
        /** @type {InstanceType<typeof Vector2DEntity.attributes.X>} */ this.X
        /** @type {InstanceType<typeof Vector2DEntity.attributes.Y>} */ this.Y
    }

    /** @returns {P<Vector2DEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 1).label("Vector2DEntity")
    }

    /** @returns {[Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf()]
    }
}
