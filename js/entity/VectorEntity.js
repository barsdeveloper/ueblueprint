import IEntity from "./IEntity"

export default class VectorEntity extends IEntity {

    static attributes = {
        X: 0,
        Y: 0,
        Z: 0,
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
