import IEntity from "./IEntity.js"

export default class VectorEntity extends IEntity {

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
        Z: {
            default: 0,
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
