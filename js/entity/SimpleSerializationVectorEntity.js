import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import VectorEntity from "./VectorEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static attributeSeparator = ", "
    static grammar = /** @type {P<SimpleSerializationVectorEntity>} */(
        P.alt(
            P.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
            ))
                .map(([_, x, xPrecision, y, yPrecision, z, zPrecision]) => new this({
                    X: new NumberEntity(x, xPrecision?.length),
                    Y: new NumberEntity(y, yPrecision?.length),
                    Z: new NumberEntity(z, zPrecision?.length),
                })),
            VectorEntity.grammar.map(v => new this({
                X: v.X,
                Y: v.Y,
                Z: v.Z,
            }))
        )
    )

    toString(
        insideString = false,
        indentation = "",
        Self = this.Self(),
        printKey = Self.printKey,
        wrap = Self.wrap,
    ) {
        return this.X.toString() + Self.attributeSeparator
            + this.Y.toString() + Self.attributeSeparator
            + this.Z.toString() + (this.trailing ? Self.attributeSeparator : "")
    }
}
