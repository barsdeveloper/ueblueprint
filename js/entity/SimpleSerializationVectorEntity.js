import Grammar from "../serialization/Grammar.js"
import Parsimmon from "parsimmon"
import VectorEntity from "./VectorEntity.js"

export default class SimpleSerializationVectorEntity extends VectorEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsimmon.alt(
            Parsimmon.seq(
                Grammar.number,
                Grammar.commaSeparation,
                Grammar.number,
                Grammar.commaSeparation,
                Grammar.number,
            ).map(([x, _1, y, _3, z]) => new this({
                X: x,
                Y: y,
                Z: z,
            })),
            VectorEntity.createGrammar()
        )
    }
}
