import Utility from "../Utility"
import IEntity from "./IEntity"

export default class LinearColorEntity extends IEntity {

    static attributes = {
        R: Number,
        G: Number,
        B: Number,
        A: Number,
    }

    static fromWheelLocation([x, y], radius) {
        x -= radius
        y -= radius
        const mod = Math.sqrt(x * x + y * y)
    }

    constructor(options = {}) {
        super(options)
        /** @type {Number} */ this.R
        /** @type {Number} */ this.G
        /** @type {Number} */ this.B
        /** @type {Number} */ this.A
    }

    toRGBA() {
        return [this.R, this.G, this.B, this.A]
    }

    toHSV() {
        const max = Math.max(this.R, this.G, this.B)
        const min = Math.min(this.R, this.G, this.B)
        const d = max - min
        let h
        const s = (max === 0 ? 0 : d / max)
        const v = max / 255
        switch (max) {
            case min:
                h = 0
                break
            case this.R:
                h = (this.G - this.B) + d * (this.G < this.B ? 6 : 0)
                break
            case this.G:
                h = (this.B - this.R) + d * 2
                break
            case this.B:
                h = (this.R - this.G) + d * 4
                break
        }
        h /= 6 * d
        return [h, s, v]
    }

    toNumber() {
        return this.A + this.B << 8 + this.G << 16 + this.R << 24
    }

    toString() {
        return Utility.printLinearColor(this)
    }

}
