import P from "parsernostrum"
import RotatorEntity from "./RotatorEntity.js"

export default class SimpleSerializationRotatorEntity extends RotatorEntity {

    static grammar = P.alt(
        P.regArray(new RegExp(
            `(${P.number.getParser().parser.regexp.source})`
            + String.raw`\s*,\s*`
            + `(${P.number.getParser().parser.regexp.source})`
            + String.raw`\s*,\s*`
            + `(${P.number.getParser().parser.regexp.source})`
        )).map(([_, p, y, r]) => new this({
            R: Number(r),
            P: Number(p),
            Y: Number(y),
        })),
        RotatorEntity.grammar
    )
}
