import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import Vector2DEntity from "./Vector2DEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static grammar = P.alt(
        P.regArray(new RegExp(
            `(${Grammar.numberRegexSource})`
            + String.raw`\s*,\s*`
            + `(${Grammar.numberRegexSource})`
        )).map(([_, x, y]) => new this({
            X: Number(x),
            Y: Number(y),
        })),
        Vector2DEntity.grammar
    )
}
