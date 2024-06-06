import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import Vector2DEntity from "./Vector2DEntity.js"

export default class RBSerializationVector2DEntity extends Vector2DEntity {

    static grammar = /** @type {P<RBSerializationVector2DEntity>} */(P.alt(
        P.regArray(new RegExp(
            /X\s*=\s*/.source + "(?<x>" + Grammar.numberRegexSource + ")"
            + "\\s+"
            + /Y\s*=\s*/.source + "(?<y>" + Grammar.numberRegexSource + ")"
        )).map(({ groups: { x, y } }) => new this({
            X: Number(x),
            Y: Number(y),
        })),
        Vector2DEntity.grammar
    ).label("RBSerializationVector2DEntity"))
}
