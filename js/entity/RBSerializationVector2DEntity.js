import Grammar from "../serialization/Grammar.js"
import Parsimmon from "parsimmon"
import Vector2DEntity from "./Vector2DEntity.js"

export default class RBSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsimmon.alt(
            Parsimmon.seq(
                Parsimmon.string("X").then(Grammar.equalSeparation).then(Grammar.number),
                Parsimmon.regex(Grammar.Regex.InlineWhitespace),
                Parsimmon.string("Y").then(Grammar.equalSeparation).then(Grammar.number),
            ).map(([x, _1, y]) => new this({
                X: x,
                Y: y,
            })),
            Vector2DEntity.createGrammar()
        )
    }
}
