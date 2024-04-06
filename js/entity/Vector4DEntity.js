import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class Vector4DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        Y: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        Z: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        W: new AttributeInfo({
            default: 0,
            expected: true,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(Vector4DEntity, false)
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.X
        /** @type {Number} */ this.Y
        /** @type {Number} */ this.Z
        /** @type {Number} */ this.W
    }

    /** @returns {[Number, Number, Number, Number]} */
    toArray() {
        return [this.X, this.Y, this.Z, this.W]
    }
}
