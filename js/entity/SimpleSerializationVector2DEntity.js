import Grammar from "../serialization/Grammar.js"
import Parsimmon from "parsimmon"
import Vector2DEntity from "./Vector2DEntity.js"

export default class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static getGrammar() {
        return Parsimmon.alt(
            Parsimmon.seq(
                Grammar.number,
                Grammar.commaSeparation,
                Grammar.number,
            ).map(([x, _1, y]) => new SimpleSerializationVector2DEntity({
                X: x,
                Y: y,
            })),
            Vector2DEntity.getGrammar()
        )
    }
}
