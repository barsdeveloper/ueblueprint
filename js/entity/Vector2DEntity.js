import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class Vector2DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: {
            default: 0,
            expected: true,
        },
        Y: {
            default: 0,
            expected: true,
        },
    }
    static {
        this.cleanupAttributes(this.attributes)
    }
    static #grammar = Grammar.createEntityGrammar(Vector2DEntity, false)

    static getGrammar() {
        return Vector2DEntity.#grammar
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.X
        /** @type {Number} */ this.Y
    }
}
