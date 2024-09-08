import P from "parsernostrum"
import NumberEntity from "./NumberEntity.js"
import RotatorEntity from "./RotatorEntity.js"

export default class SimpleSerializationRotatorEntity extends RotatorEntity {

    static attributeSeparator = ", "
    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationRotatorEntity>} */
    static createGrammar() {
        return P.alt(
            P.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
            )).map(([_, p, pPrecision, y, yPrecision, r, rPrecision]) => new this({
                R: new (RotatorEntity.attributes.R)(r, rPrecision?.length),
                P: new (RotatorEntity.attributes.P)(p, pPrecision?.length),
                Y: new (RotatorEntity.attributes.Y)(y, yPrecision?.length),
            })),
            RotatorEntity.grammar.map(v => new this({
                R: v.R,
                P: v.P,
                Y: v.Y,
            }))
        ).label("SimpleSerializationRotatorEntity")
    }

    doSerialize() {
        const attributeSeparator = /** @type {typeof SimpleSerializationRotatorEntity} */(
            this.constructor
        ).attributeSeparator
        return this.P.serialize() + attributeSeparator
            + this.Y.serialize() + attributeSeparator
            + this.R.serialize() + (this.trailing ? attributeSeparator : "")
    }
}
