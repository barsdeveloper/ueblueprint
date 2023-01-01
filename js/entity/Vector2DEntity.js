import IEntity from "./IEntity"

export default class Vector2DEntity extends IEntity {

    static attributes = {
        X: 0,
        Y: 0,
    }

    constructor(values) {
        super(values)
        /** @type {Number} */ this.X
        /** @type {Number} */ this.Y
    }
}
