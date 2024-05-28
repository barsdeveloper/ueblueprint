import P from "parsernostrum"
import Vector4DEntity from "./Vector4DEntity.js"

export default class SimpleSerializationVector4DEntity extends Vector4DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = P.number.getParser().parser.regexp.source
        return P.alt(
            P.regArray(new RegExp(
                `(${P.number.getParser().parser.regexp.source})`
                + String.raw`\s*,\s*`
                + `(${P.number.getParser().parser.regexp.source})`
                + String.raw`\s*,\s*`
                + `(${P.number.getParser().parser.regexp.source})`
                + String.raw`\s*,\s*`
                + `(${P.number.getParser().parser.regexp.source})`
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
