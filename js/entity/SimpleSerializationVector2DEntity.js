import P from "parsernostrum"
import NumberEntity from "./NumberEntity.js"
import Vector2DEntity from "./Vector2DEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static attributeSeparator = ", "
    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationVector2DEntity>} */
    static createGrammar() {
        return P.alt(
            P.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
            )).map(([_, x, xPrecision, y, yPrecision]) => new this({
                X: new (Vector2DEntity.attributes.X)(x, xPrecision?.length),
                Y: new (Vector2DEntity.attributes.Y)(y, yPrecision?.length),
            })),
            Vector2DEntity.grammar.map(v => new this({
                X: v.X,
                Y: v.Y,
            }))
        ).label("SimpleSerializationVector2DEntity")
    }

    doSerialize() {
        const attributeSeparator = /** @type {typeof SimpleSerializationVector2DEntity} */(
            this.constructor
        ).attributeSeparator
        return this.X.serialize() + attributeSeparator
            + this.Y.serialize() + (this.trailing ? attributeSeparator : "")
    }
}
