// @ts-check

import IEntity from "./IEntity"

export default class LinearColorEntity extends IEntity {

    static attributes = {
        R: Number,
        G: Number,
        B: Number,
        A: Number,
    }

    constructor(options = {}) {
        super(options)
        /** @type {Number} */ this.R
        /** @type {Number} */ this.G
        /** @type {Number} */ this.B
        /** @type {Number} */ this.A
    }
}
