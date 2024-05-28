import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class AlternativesEntity extends IEntity {

    /** @type {(typeof IEntity)[]} */
    static alternatives = []

    static createGrammar() {
        return this.alternatives
            .map(entity => entity.grammar)
            .reduce((acc, cur) => !cur || cur === Grammar.unknownValue || acc === Grammar.unknownValue
                ? Grammar.unknownValue
                : P.alt(acc, cur)
            )
    }

    /**
     * @template {(typeof IEntity)[]} Types
     * @param {Types} types
     */
    static accepting(...types) {
        const result = /** @type {typeof AlternativesEntity & { alternatives: Types }} */(this.asUniqueClass())
        result.alternatives = types
        result.grammar = result.createGrammar()
        return result
    }
}
