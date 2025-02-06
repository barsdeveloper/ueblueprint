import P from "parsernostrum"
import NumberEntity from "./NumberEntity.js"
import VectorEntity from "./VectorEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static allowShortSerialization = false
    static attributeSeparator = ", "
    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationVectorEntity>} */
    static createGrammar() {
        return P.alt(
            P.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                // If allow simple serialization then it can parse only a single number ...
                + (this.allowShortSerialization ? `(?:` : "")
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                // ... that will be assigned to X and the rest is optional and set to 0
                + (this.allowShortSerialization ? `)?` : "")
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
    }

    /**
     * @template {typeof SimpleSerializationVectorEntity} T
     * @this {T}
     */
    static flagAllowShortSerialization(value = true) {
        const result = this.asUniqueClass()
        if (value !== result.allowShortSerialization) {
            result.allowShortSerialization = value
            result.grammar = result.createGrammar()
        }
        return result
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
