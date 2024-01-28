import Parsernostrum from "parsernostrum"
import VectorEntity from "./VectorEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source
        return Parsernostrum.alt(
            Parsernostrum.reg(new RegExp(
                "(" + number + ")"
                + "\\s*,\\s"
                + "(" + number + ")"
                + "\\s*,\\s"
                + "(" + number + ")"
            ))
                .map(([x, y, z]) => new this({
                    X: Number(x),
                    Y: Number(y),
                    Z: Number(z),
                })),
            VectorEntity.createGrammar()
        )
    }
}
