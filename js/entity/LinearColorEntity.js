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

    /**
     * @param {Number} number
     */
    static numberToString(number) {
        return Math.round(number * 255).toString(16)
    }

    static fromString(value) {
        return new LinearColorEntity({
            R: parseInt(value.substr(0, 2), 16) / 255,
            G: parseInt(value.substr(2, 2), 16) / 255,
            B: parseInt(value.substr(4, 2), 16) / 255,
            A: parseInt(value.substr(6, 2), 16) / 255,
        })
    }

    toString() {
        return "#" + LinearColorEntity.numberToString(this.R)
            + LinearColorEntity.numberToString(this.G)
            + LinearColorEntity.numberToString(this.B)
            + LinearColorEntity.numberToString(this.A)
    }
}
