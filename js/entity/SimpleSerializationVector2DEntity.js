import Parsernostrum from "parsernostrum"
import Vector2DEntity from "./Vector2DEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source
        return Parsernostrum.alt(
            Parsernostrum.reg(new RegExp(
                "(" + number + ")"
                + "\\s*,\\s"
                + "(" + number + ")"
            )).map(([x, y]) => new this({
                X: Number(x),
                Y: Number(y),
            })),
            Vector2DEntity.createGrammar()
        )
    }
}
