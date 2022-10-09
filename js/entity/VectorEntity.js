import IEntity from "./IEntity"

export default class VectorEntity extends IEntity {

    static attributes = {
        X: Number,
        Y: Number,
        Z: Number,
    }

    constructor(options = {}) {
        super(options)
        /** @type {Number} */ this.X
        /** @type {Number} */ this.Y
        /** @type {Number} */ this.Z
    }
}
