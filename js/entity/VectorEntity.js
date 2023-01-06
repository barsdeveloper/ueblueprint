import IEntity from "./IEntity"

export default class VectorEntity extends IEntity {

    static attributes = {
        X: {
            value: 0,
            expected: true,
        },
        Y: {
            value: 0,
            expected: true,
        },
        Z: {
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
        /** @type {Number} */ this.Z
    }
}
