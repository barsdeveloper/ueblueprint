import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import VectorEntity from "./VectorEntity.js"
import NumberEntity from "./NumberEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static attributeSeparator = ", "
    /** @type {P<SimpleSerializationVectorEntity>} */
    static grammar = P.alt(
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

    toString(
        insideString = false,
        indentation = "",
        printKey = this.Self().printKey,
    ) {
        const Self = this.Self()
        return this.X.toString(insideString) + Self.attributeSeparator
            + this.Y.toString(insideString) + Self.attributeSeparator
            + this.Z.toString(insideString) + (this.trailing ? Self.attributeSeparator : "")
    }
}
