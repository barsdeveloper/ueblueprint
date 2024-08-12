import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import Vector2DEntity from "./Vector2DEntity.js"

export default class RBSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return /** @type {P<RBSerializationVector2DEntity>} */(P.alt(
            P.regArray(new RegExp(
                /X\s*=\s*/.source + "(?<x>" + Grammar.numberRegexSource + ")"
                + "\\s+"
                + /Y\s*=\s*/.source + "(?<y>" + Grammar.numberRegexSource + ")"
            )).map(({ groups: { x, y } }) => new this({
                X: new (Vector2DEntity.attributes.X)(x),
                Y: new (Vector2DEntity.attributes.Y)(y),
            })),
            Vector2DEntity.grammar.map(v => new this({
                X: v.X,
                Y: v.Y,
            }))
        ).label("RBSerializationVector2DEntity"))
    }
}
