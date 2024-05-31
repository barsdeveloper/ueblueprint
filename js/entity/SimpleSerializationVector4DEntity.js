import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import Vector4DEntity from "./Vector4DEntity.js"

export default class SimpleSerializationVector4DEntity extends Vector4DEntity {

    static grammar = this.createGrammar()

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
                    X: Number(x),
                    Y: Number(y),
                    Z: Number(z),
                    W: Number(w),
                })),
            Vector4DEntity.grammar
        )
    }
}
