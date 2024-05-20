import Parsernostrum from "parsernostrum"
import Vector2DEntity from "./Vector2DEntity.js"

export default class RBSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                /X\s*=\s*/.source + "(?<x>" + Parsernostrum.number.getParser().parser.regexp.source + ")"
                + "\\s+"
                + /Y\s*=\s*/.source + "(?<y>" + Parsernostrum.number.getParser().parser.regexp.source + ")"
            )).map(({ groups: { x, y } }) => new this({
                X: Number(x),
                Y: Number(y),
            })),
            Vector2DEntity.grammar
        )
    }
}
