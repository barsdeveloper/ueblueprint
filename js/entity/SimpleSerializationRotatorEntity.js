import Parsimmon from "parsimmon"
import RotatorEntity from "./RotatorEntity.js"
import Grammar from "../serialization/Grammar.js"

export default class SimpleSerializationRotatorEntity extends RotatorEntity {

    static #grammar = Parsimmon.alt(
        Parsimmon.seq(
            Grammar.number,
            Grammar.commaSeparation,
            Grammar.number,
            Grammar.commaSeparation,
            Grammar.number,
        ).map(([p, _1, y, _3, r]) =>
            new SimpleSerializationRotatorEntity({
                R: r,
                P: p,
                Y: y,
            })
        ),
        RotatorEntity.getGrammar()
    )

    static getGrammar() {
        return SimpleSerializationRotatorEntity.#grammar
    }
}
