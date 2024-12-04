import P from "parsernostrum"
import IEntity from "./IEntity.js"

/** @template {(typeof IEntity)[]} T */
export default class AlternativesEntity extends IEntity {

    /** @type {(typeof IEntity)[]} */
    static alternatives = []

    static className() {
        let result = super.className()
        if (this.alternatives.length) {
            result += ".accepting(" + this.alternatives.map(v => v.className()).join(", ") + ")"
        }
        return result
    }

    static createGrammar() {
        const grammars = this.alternatives.map(entity => entity.grammar)
        if (this.alternatives.length == 0 || grammars.includes(this.unknownEntityGrammar)) {
            return this.unknownEntityGrammar
        }
        return P.alt(...grammars)
    }

    /**
     * @template {(typeof IEntity)[]} Types
     * @param {Types} types
     */
    static accepting(...types) {
        const result = /** @type {typeof AlternativesEntity<Types> & { alternatives: Types }} */(
            this.asUniqueClass()
        )
        result.alternatives = types
        result.grammar = result.createGrammar()
        return result
    }
}
