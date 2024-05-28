import P from "parsernostrum"
import Vector2DEntity from "./Vector2DEntity.js"

export default class RBSerializationVector2DEntity extends Vector2DEntity {

    static grammar = P.alt(
        P.regArray(new RegExp(
            /X\s*=\s*/.source + "(?<x>" + P.number.getParser().parser.regexp.source + ")"
            + "\\s+"
            + /Y\s*=\s*/.source + "(?<y>" + P.number.getParser().parser.regexp.source + ")"
        )).map(({ groups: { x, y } }) => new this({
            X: Number(x),
            Y: Number(y),
        })),
        Vector2DEntity.grammar
    )
}
