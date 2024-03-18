import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class RotatorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        P: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        Y: new AttributeInfo({
            default: 0,
            expected: true,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this, false)
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.R
        /** @type {Number} */ this.P
        /** @type {Number} */ this.Y
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
