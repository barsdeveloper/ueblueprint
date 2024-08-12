import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import Vector4DEntity from "./Vector4DEntity.js"

export default class SimpleSerializationVector4DEntity extends Vector4DEntity {

    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationVector4DEntity> } */
    static createGrammar() {
        const number = Grammar.numberRegexSource
        return P.alt(
            P.regArray(new RegExp(
                `(${Grammar.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${Grammar.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${Grammar.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${Grammar.numberRegexSource})`
            ))
                .map(([_0, x, y, z, w]) => new this({
                    X: new (Vector4DEntity.attributes.X)(x),
                    Y: new (Vector4DEntity.attributes.Y)(y),
                    Z: new (Vector4DEntity.attributes.Z)(z),
                    W: new (Vector4DEntity.attributes.W)(w),
                })),
            Vector4DEntity.grammar
        )
    }
}
