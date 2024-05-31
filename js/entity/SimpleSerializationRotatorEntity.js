import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import RotatorEntity from "./RotatorEntity.js"

export default class SimpleSerializationRotatorEntity extends RotatorEntity {

    static grammar = P.alt(
        P.regArray(new RegExp(
            `(${Grammar.numberRegexSource})`
            + String.raw`\s*,\s*`
            + `(${Grammar.numberRegexSource})`
            + String.raw`\s*,\s*`
            + `(${Grammar.numberRegexSource})`
        )).map(([_, p, y, r]) => new this({
            R: Number(r),
            P: Number(p),
            Y: Number(y),
        })),
        RotatorEntity.grammar
    )
}
