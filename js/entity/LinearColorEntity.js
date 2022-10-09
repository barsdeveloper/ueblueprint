import ColorChannelRealValueEntity from "./ColorChannelRealValueEntity"
import IEntity from "./IEntity"
import Utility from "../Utility"

export default class LinearColorEntity extends IEntity {

    static attributes = {
        R: ColorChannelRealValueEntity,
        G: ColorChannelRealValueEntity,
        B: ColorChannelRealValueEntity,
        A: ColorChannelRealValueEntity,
    }

    static fromWheelLocation([x, y], radius) {
        x -= radius
        y -= radius
        const mod = Math.sqrt(x * x + y * y)
    }

    constructor(options = {}) {
        super(options)
        /** @type {ColorChannelRealValueEntity} */ this.R
        /** @type {ColorChannelRealValueEntity} */ this.G
        /** @type {ColorChannelRealValueEntity} */ this.B
        /** @type {ColorChannelRealValueEntity} */ this.A
    }

    toRGBA() {
        return [this.R, this.G, this.B, this.A]
    }

    toHSV() {
        const max = Math.max(this.R.value, this.G.value, this.B.value)
        const min = Math.min(this.R.value, this.G.value, this.B.value)
        const d = max - min
        let h
        const s = (max == 0 ? 0 : d / max)
        const v = max / 255
        switch (max) {
            case min:
                h = 0
                break
            case this.R.value:
                h = (this.G.value - this.B.value) + d * (this.G.value < this.B.value ? 6 : 0)
                break
            case this.G.value:
                h = (this.B.value - this.R.value) + d * 2
                break
            case this.B.value:
                h = (this.R.value - this.G.value) + d * 4
                break
        }
        h /= 6 * d
        return [h, s, v]
    }

    toNumber() {
        return (this.R.value << 24) + (this.G.value << 16) + (this.B.value << 8) + this.A.value
    }

    toString() {
        return Utility.printLinearColor(this)
    }

}
