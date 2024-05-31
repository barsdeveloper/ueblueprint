import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

export default class AlternativesEntity extends IEntity {

    /** @type {(typeof IEntity)[]} */
    static alternatives = []

    static className() {
        let result = super.className()
        if (this.alternatives.length) {
            result += " (accepting: " + this.alternatives.map(v => v.className()).join(", ") + ")"
        }
        return result
    }

    static createGrammar() {
        const grammars = this.alternatives.map(entity => entity.grammar)
        if (grammars.includes(Grammar.unknownValue)) {
            return Grammar.unknownValue
        }
        return P.alt(...grammars)
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
