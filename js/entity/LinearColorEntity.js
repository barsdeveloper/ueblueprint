import IEntity from "./IEntity"
import Utility from "../Utility"
import RealUnitEntity from "./UnitRealEntity"

export default class LinearColorEntity extends IEntity {

    static attributes = {
        R: RealUnitEntity,
        G: RealUnitEntity,
        B: RealUnitEntity,
        A: new RealUnitEntity(1),
    }

    static fromWheelLocation([x, y], radius, v, a) {
        x -= radius
        y -= radius
        const [r, theta] = Utility.getPolarCoordinates([x, y], true)
        return LinearColorEntity.fromHSVA([
            1 - theta / (2 * Math.PI),
            r / radius,
            v,
            a,
        ])
    }

    /** @param {Number[]} param0 */
    static fromHSVA([h, s, v, a = 1]) {
        const i = Math.floor(h * 6)
        const f = h * 6 - i
        const p = v * (1 - s)
        const q = v * (1 - f * s)
        const t = v * (1 - (1 - f) * s)
        const values = [v, q, p, p, t, v]
        const [r, g, b] = [values[i % 6], values[(i + 2) % 6], values[(i + 4) % 6]]
        return new LinearColorEntity({
            R: r,
            G: g,
            B: b,
            A: a,
        })
    }

    constructor(options = {}) {
        super(options)
        /** @type {RealUnitEntity} */ this.R
        /** @type {RealUnitEntity} */ this.G
        /** @type {RealUnitEntity} */ this.B
        /** @type {RealUnitEntity} */ this.A
    }

    toRGBA() {
        return [
            Math.round(this.R.value * 255),
            Math.round(this.G.value * 255),
            Math.round(this.B.value * 255),
            Math.round(this.A.value * 255),
        ]
    }

    toHSVA() {
        const [r, g, b, a] = [this.R.value, this.G.value, this.B.value, this.A.value]
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const d = max - min
        let h
        const s = (max == 0 ? 0 : d / max)
        const v = max
        switch (max) {
            case min:
                h = 0
                break
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
        return [new RealUnitEntity(h), new RealUnitEntity(s), new RealUnitEntity(v), new RealUnitEntity(a)]
    }

    toNumber() {
        return (this.R.value * 0xff << 3 * 0x8) + (this.G.value * 0xff << 2 * 0x8) + (this.B.value * 0xff << 0x8) + this.A.value
    }

    toString() {
        return Utility.printLinearColor(this)
    }

}
