import IEntity from "./IEntity.js"

export default class Vector2DEntity extends IEntity {

    static attributes = {
        X: {
            value: 0,
            expected: true,
        },
        Y: {
            value: 0,
            expected: true,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.X
        /** @type {Number} */ this.Y
    }
}
