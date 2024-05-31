import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import VectorEntity from "./VectorEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static grammar = P.alt(
        P.regArray(new RegExp(
            `(${Grammar.numberRegexSource})`
            + String.raw`\s*,\s*`
            + `(${Grammar.numberRegexSource})`
            + String.raw`\s*,\s*`
            + `(${Grammar.numberRegexSource})`
        ))
            .map(([_0, x, y, z]) => new this({
                X: Number(x),
                Y: Number(y),
                Z: Number(z),
            })),
        VectorEntity.grammar
    )
}
