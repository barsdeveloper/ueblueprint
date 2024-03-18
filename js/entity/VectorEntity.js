import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class VectorEntity extends IEntity {

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
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(VectorEntity, false)
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.X
        /** @type {Number} */ this.Y
        /** @type {Number} */ this.Z
    }

    /** @returns {[Number, Number, Number]} */
    toArray() {
        return [this.X, this.Y, this.Z]
    }
}
