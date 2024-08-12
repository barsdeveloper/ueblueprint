import P from "parsernostrum"
import NumberEntity from "./NumberEntity.js"
import VectorEntity from "./VectorEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static attributeSeparator = ", "
    static grammar = this.createGrammar()

    static createGrammar() {
        return /** @type {P<SimpleSerializationVectorEntity>} */(
            P.alt(
                P.regArray(new RegExp(
                    `(${NumberEntity.numberRegexSource})`
                    + String.raw`\s*,\s*`
                    + `(${NumberEntity.numberRegexSource})`
                    + String.raw`\s*,\s*`
                    + `(${NumberEntity.numberRegexSource})`
                ))
                    .map(([_, x, xPrecision, y, yPrecision, z, zPrecision]) => new this({
                        X: new (VectorEntity.attributes.X)(x, xPrecision?.length),
                        Y: new (VectorEntity.attributes.Y)(y, yPrecision?.length),
                        Z: new (VectorEntity.attributes.Z)(z, zPrecision?.length),
                    })),
                VectorEntity.grammar.map(v => new this({
                    X: v.X,
                    Y: v.Y,
                    Z: v.Z,
                }))
            )
        )
    }

    doSerialize() {
        const attributeSeparator = /** @type {typeof SimpleSerializationVectorEntity} */(
            this.constructor
        ).attributeSeparator
        return this.X.serialize() + attributeSeparator
            + this.Y.serialize() + attributeSeparator
            + this.Z.serialize() + (this.trailing ? attributeSeparator : "")
    }
}
