import IEntity from "./IEntity"

export default class RotatorEntity extends IEntity {

    static attributes = {
        R: {
            value: 0,
        },
        P: {
            value: 0,
        },
        Y: {
            value: 0,
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
