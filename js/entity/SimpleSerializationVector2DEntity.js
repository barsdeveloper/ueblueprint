import P from "parsernostrum"
import Vector2DEntity from "./Vector2DEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static grammar = P.alt(
        P.regArray(new RegExp(
            `(${P.number.getParser().parser.regexp.source})`
            + String.raw`\s*,\s*`
            + `(${P.number.getParser().parser.regexp.source})`
        )).map(([_, x, y]) => new this({
            X: Number(x),
            Y: Number(y),
        })),
        Vector2DEntity.grammar
    )
}
