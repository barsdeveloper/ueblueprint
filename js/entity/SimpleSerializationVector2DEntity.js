import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import Vector2DEntity from "./Vector2DEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static attributeSeparator = ", "
    /** @type {P<SimpleSerializationVector2DEntity>} */
    static grammar = P.alt(
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

    toString(
        insideString = false,
        indentation = "",
        printKey = this.Self().printKey,
    ) {
        const Self = this.Self()
        return this.X.toString(insideString) + Self.attributeSeparator
            + this.Y.toString(insideString) + (this.trailing ? Self.attributeSeparator : "")
    }
}
