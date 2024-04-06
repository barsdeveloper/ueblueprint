import Parsernostrum from "parsernostrum"
import Vector4DEntity from "./Vector4DEntity.js"

export default class SimpleSerializationVector4DEntity extends Vector4DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
            ))
                .map(([_0, x, y, z, w]) => new this({
                    X: Number(x),
                    Y: Number(y),
                    Z: Number(z),
                    W: Number(w),
                })),
            Vector4DEntity.createGrammar()
        )
    }
}
