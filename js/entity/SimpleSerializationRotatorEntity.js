import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import RotatorEntity from "./RotatorEntity.js"
import NumberEntity from "./NumberEntity.js"

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

    toString(
        insideString = false,
        indentation = "",
        Self = this.Self(),
        printKey = Self.printKey,
        wrap = Self.wrap,
    ) {
        return this.P.toString() + Self.attributeSeparator
            + this.Y.toString() + Self.attributeSeparator
            + this.R.toString() + (this.trailing ? Self.attributeSeparator : "")
    }
}
