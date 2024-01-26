import Parsernostrum from "parsernostrum/src/Parsernostrum.js"
import Vector2DEntity from "./Vector2DEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source
        return Parsernostrum.alt(
            Parsernostrum.reg(new RegExp(
                "(?<x>" + number + ")"
                + "\\s*,\\s"
                + "(?<y>" + number + ")"
            ))
                .map(({ groups: { x, y } }) => new this({
                    X: Number(x),
                    Y: Number(y),
                })),
            Vector2DEntity.createGrammar()
        )
    }
}
