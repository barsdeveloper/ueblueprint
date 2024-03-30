import Parsernostrum from "parsernostrum"
import RotatorEntity from "./RotatorEntity.js"

export default class SimpleSerializationRotatorEntity extends RotatorEntity {

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
            )).map(([_, p, y, r]) => new this({
                R: Number(r),
                P: Number(p),
                Y: Number(y),
            })),
            RotatorEntity.createGrammar()
        )
    }
}
