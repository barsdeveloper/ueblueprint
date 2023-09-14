import IEntity from "./IEntity.js"

export default class RotatorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: {
            default: 0,
            expected: true,
        },
        P: {
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
