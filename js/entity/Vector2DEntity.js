import IEntity from "./IEntity"

export default class Vector2DEntity extends IEntity {

    static attributes = {
        X: Number,
        Y: Number,
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.X
        /** @type {Number} */ this.Y
    }
}
