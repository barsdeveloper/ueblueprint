import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import Vector2DEntity from "./Vector2DEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static attributeSeparator = ", "
    static grammar = /** @type {P<SimpleSerializationVector2DEntity>} */(
        P.alt(
            P.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
            )).map(([_, x, xPrecision, y, yPrecision]) => new this({
                X: new NumberEntity(x, xPrecision?.length),
                Y: new NumberEntity(y, yPrecision?.length),
            })),
            Vector2DEntity.grammar.map(v => new this({
                X: v.X,
                Y: v.Y,
            }))
        ).label("SimpleSerializationVector2DEntity")
    )

    serialize(
        insideString = false,
        indentation = "",
        Self = this.Self(),
        printKey = Self.printKey,
        wrap = Self.wrap,
    ) {
        return this.X.serialize() + Self.attributeSeparator
            + this.Y.serialize() + (this.trailing ? Self.attributeSeparator : "")
    }
}
