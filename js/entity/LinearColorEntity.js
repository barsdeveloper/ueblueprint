import { css } from "lit"
import Parsernostrum from "parsernostrum"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import ColorChannelEntity from "./ColorChannelEntity.js"
import IEntity from "./IEntity.js"

export default class LinearColorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            expected: true,
        }),
        G: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            expected: true,
        }),
        B: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            expected: true,
        }),
        A: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(1),
        }),
        H: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            ignored: true,
        }),
        S: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            ignored: true,
        }),
        V: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            ignored: true,
        }),
    }
    static grammar = this.createGrammar()

    /** @param {Number} x */
    static linearToSRGB(x) {
        if (x <= 0) {
            return 0
        } else if (x >= 1) {
            return 1
        } else if (x < 0.0031308) {
            return x * 12.92
        } else {
            return Math.pow(x, 1 / 2.4) * 1.055 - 0.055
        }
    }

    /** @param {Number} x */
    static sRGBtoLinear(x) {
        if (x <= 0) {
            return 0
        } else if (x >= 1) {
            return 1
        } else if (x < 0.04045) {
            return x / 12.92
        } else {
            return Math.pow((x + 0.055) / 1.055, 2.4)
        }
    }

    static getWhite() {
        return new LinearColorEntity({
            R: 1,
            G: 1,
            B: 1,
        })
    }

    static createGrammar() {
        return Grammar.createEntityGrammar(this, false)
    }

    static getLinearColorFromHexGrammar() {
        return Parsernostrum.regArray(new RegExp(
            "#(" + Grammar.Regex.HexDigit.source + "{2})"
            + "(" + Grammar.Regex.HexDigit.source + "{2})"
            + "(" + Grammar.Regex.HexDigit.source + "{2})"
            + "(" + Grammar.Regex.HexDigit.source + "{2})?"
        )).map(([m, R, G, B, A]) => new this({
            R: parseInt(R, 16) / 255,
            G: parseInt(G, 16) / 255,
            B: parseInt(B, 16) / 255,
            A: parseInt(A ?? "FF", 16) / 255,
        }))
    }

    static getLinearColorRGBListGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.numberByte,
            Grammar.commaSeparation,
            Parsernostrum.numberByte,
            Grammar.commaSeparation,
            Parsernostrum.numberByte,
        ).map(([R, _1, G, _3, B]) => new this({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: 1,
        }))
    }

    static getLinearColorRGBGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/rgb\s*\(\s*/),
            this.getLinearColorRGBListGrammar(),
            Parsernostrum.reg(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    }

    static getLinearColorRGBAGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/rgba\s*\(\s*/),
            this.getLinearColorRGBListGrammar(),
            Parsernostrum.reg(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    }

    static getLinearColorFromAnyFormat() {
        return Parsernostrum.alt(
            this.getLinearColorFromHexGrammar(),
            this.getLinearColorRGBAGrammar(),
            this.getLinearColorRGBGrammar(),
            this.getLinearColorRGBListGrammar(),
        )
    }

    constructor(values) {
        if (values instanceof Array) {
            values = {
                R: values[0] ?? 0,
                G: values[1] ?? 0,
                B: values[2] ?? 0,
                A: values[3] ?? 1,
            }
        }
        super(values)
        /** @type {ColorChannelEntity} */ this.R
        /** @type {ColorChannelEntity} */ this.G
        /** @type {ColorChannelEntity} */ this.B
        /** @type {ColorChannelEntity} */ this.A
        /** @type {ColorChannelEntity} */ this.H
        /** @type {ColorChannelEntity} */ this.S
        /** @type {ColorChannelEntity} */ this.V
        this.#updateHSV()
    }

    #updateHSV() {
        const r = this.R.value
        const g = this.G.value
        const b = this.B.value
        if (Utility.approximatelyEqual(r, g) && Utility.approximatelyEqual(r, b) && Utility.approximatelyEqual(g, b)) {
            this.S.value = 0
            this.V.value = r
            return
        }
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const d = max - min
        let h
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
        this.H.value = h
        this.S.value = max == 0 ? 0 : d / max
        this.V.value = max
    }

    /**
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     * @param {Number} a
     */
    setFromRGBA(r, g, b, a = 1) {
        this.R.value = r
        this.G.value = g
        this.B.value = b
        this.A.value = a
        this.#updateHSV()
    }

    /**
     * @param {Number} h
     * @param {Number} s
     * @param {Number} v
     * @param {Number} a
     */
    setFromHSVA(h, s, v, a = 1) {
        const i = Math.floor(h * 6)
        const f = h * 6 - i
        const p = v * (1 - s)
        const q = v * (1 - f * s)
        const t = v * (1 - (1 - f) * s)
        const values = [v, q, p, p, t, v]
        const [r, g, b] = [values[i % 6], values[(i + 4) % 6], values[(i + 2) % 6]]
        this.R.value = r
        this.G.value = g
        this.B.value = b
        this.A.value = a
        this.H.value = h
        this.S.value = s
        this.V.value = v
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} v
     * @param {Number} a
     */
    setFromWheelLocation(x, y, v, a) {
        const [r, theta] = Utility.getPolarCoordinates(x, y, true)
        this.setFromHSVA(1 - theta / (2 * Math.PI), r, v, a)
    }

    toDimmedColor(minV = 0) {
        const result = new LinearColorEntity()
        result.setFromRGBANumber(this.toNumber())
        result.setFromHSVA(
            result.H.value,
            result.S.value * 0.6,
            Math.pow(result.V.value + minV, 0.55) * 0.7
        )
        return result
    }

    toCSSRGBValues() {
        const r = Math.round(this.R.value * 255)
        const g = Math.round(this.G.value * 255)
        const b = Math.round(this.B.value * 255)
        return css`${r}, ${g}, ${b}`
    }

    toRGBA() {
        return [
            Math.round(this.R.value * 255),
            Math.round(this.G.value * 255),
            Math.round(this.B.value * 255),
            Math.round(this.A.value * 255),
        ]
    }

    toSRGBA() {
        return [
            Math.round(LinearColorEntity.linearToSRGB(this.R.value) * 255),
            Math.round(LinearColorEntity.linearToSRGB(this.G.value) * 255),
            Math.round(LinearColorEntity.linearToSRGB(this.B.value) * 255),
            Math.round(this.A.value * 255),
        ]
    }

    toRGBAString() {
        return this
            .toRGBA()
            .map(v => v.toString(16).toUpperCase().padStart(2, "0"))
            .join("")
    }

    toSRGBAString() {
        return this
            .toSRGBA()
            .map(v => v.toString(16).toUpperCase().padStart(2, "0"))
            .join("")
    }

    toHSVA() {
        return [this.H.value, this.S.value, this.V.value, this.A.value]
    }

    toNumber() {
        return (
            Math.round(this.R.value * 0xff) << 24)
            + (Math.round(this.G.value * 0xff) << 16)
            + (Math.round(this.B.value * 0xff) << 8)
            + Math.round(this.A.value * 0xff)
    }

    /** @param {Number} number */
    setFromRGBANumber(number) {
        this.A.value = (number & 0xff) / 0xff
        this.B.value = ((number >> 8) & 0xff) / 0xff
        this.G.value = ((number >> 16) & 0xff) / 0xff
        this.R.value = ((number >> 24) & 0xff) / 0xff
        this.#updateHSV()
    }

    /** @param {Number} number */
    setFromSRGBANumber(number) {
        this.A.value = (number & 0xff) / 0xff
        this.B.value = LinearColorEntity.sRGBtoLinear(((number >> 8) & 0xff) / 0xff)
        this.G.value = LinearColorEntity.sRGBtoLinear(((number >> 16) & 0xff) / 0xff)
        this.R.value = LinearColorEntity.sRGBtoLinear(((number >> 24) & 0xff) / 0xff)
        this.#updateHSV()
    }

    /** @returns {[Number, Number, Number, Number]} */
    toArray() {
        return [this.R.value, this.G.value, this.B.value, this.A.value]
    }

    toString() {
        return Utility.printLinearColor(this)
    }
}
