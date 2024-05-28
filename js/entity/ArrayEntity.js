import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

/** @template {typeof IEntity} T */
export default class ArrayEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type

    /** @param {InstanceType<T>[]} values */
    constructor(values = []) {
        super()
        this.values = values
    }

    static createGrammar(elementGrammar = this.type.grammar) {
        return this.inlined
            ? elementGrammar
            : P.seq(
                P.reg(/\(\s*/),
                elementGrammar.sepBy(Grammar.commaSeparation).opt(),
                P.reg(/\s*(?:,\s*)?\)/),
            ).map(([_0, values, _3]) => new this(values instanceof Array ? values : []))
    }

    /**
     * @template {typeof IEntity} T
     * @param {NonNullable<T>} type
     */
    static of(type) {
        const result = /** @type {(typeof ArrayEntity<T>) & { type: T }} */(this.asUniqueClass())
        result.type = type
        this.grammar = result.createGrammar()
        return result
    }

    valueOf() {
        return this.values
    }
}
