import Parsernostrum from "parsernostrum/src/Parsernostrum.js"
import VectorEntity from "./VectorEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source
        return Parsernostrum.alt(
            Parsernostrum.reg(new RegExp(
                "(?<x>" + number + ")"
                + "\\s*,\\s"
                + "(?<y>" + number + ")"
                + "\\s*,\\s"
                + "(?<z>" + number + ")"
            ))
                .map(({ groups: { x, y, z } }) => new this({
                    X: Number(x),
                    Y: Number(y),
                    Z: Number(z),
                })),
            VectorEntity.createGrammar()
        )
    }
}
