import IEntity from "./IEntity"

export default class RotatorEntity extends IEntity {

    static attributes = {
        R: Number,
        P: Number,
        Y: Number,
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.R
        /** @type {Number} */ this.P
        /** @type {Number} */ this.Y
    }
}
