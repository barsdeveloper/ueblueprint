import P from "parsernostrum"
import NumberEntity from "./NumberEntity.js"
import RotatorEntity from "./RotatorEntity.js"

export default class SimpleSerializationRotatorEntity extends RotatorEntity {

    static attributeSeparator = ", "
    static grammar = /** @type {P<SimpleSerializationRotatorEntity>} */(
        P.alt(
            P.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
            )).map(([_, p, pPrecision, y, yPrecision, r, rPrecision]) => new this({
                R: new NumberEntity(r, rPrecision?.length),
                P: new NumberEntity(p, pPrecision?.length),
                Y: new NumberEntity(y, yPrecision?.length),
            })),
            RotatorEntity.grammar.map(v => new this({
                R: v.R,
                P: v.P,
                Y: v.Y,
            }))
        ).label("SimpleSerializationRotatorEntity")
    )

    serialize() {
        const attributeSeparator = this.Self().attributeSeparator
        return this.P.serialize() + attributeSeparator
            + this.Y.serialize() + attributeSeparator
            + this.R.serialize() + (this.trailing ? attributeSeparator : "")
    }
}
