import P from "parsernostrum"
import VectorEntity from "./VectorEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static grammar = P.alt(
        P.regArray(new RegExp(
            `(${P.number.getParser().parser.regexp.source})`
            + String.raw`\s*,\s*`
            + `(${P.number.getParser().parser.regexp.source})`
            + String.raw`\s*,\s*`
            + `(${P.number.getParser().parser.regexp.source})`
        ))
            .map(([_0, x, y, z]) => new this({
                X: Number(x),
                Y: Number(y),
                Z: Number(z),
            })),
        VectorEntity.grammar
    )
}
