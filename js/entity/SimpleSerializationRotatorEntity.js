import Parsernostrum from "parsernostrum/src/Parsernostrum.js"
import RotatorEntity from "./RotatorEntity.js"

export default class SimpleSerializationRotatorEntity extends RotatorEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source
        return Parsernostrum.alt(
            Parsernostrum.reg(new RegExp(
                "(?<p>" + number + ")"
                + "\\s*,\\s"
                + "(?<y>" + number + ")"
                + "\\s*,\\s"
                + "(?<r>" + number + ")"
            ))
                .map(({ groups: { p, y, r } }) => new this({
                    R: Number(r),
                    P: Number(p),
                    Y: Number(y),
                })),
            RotatorEntity.createGrammar()
        )
    }
}
