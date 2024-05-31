import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

/** @template {typeof IEntity} T */
export default class ArrayEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type
    static grammar = this.createGrammar()

    /** @param {ExtractType<T>[]} values */
    constructor(values = []) {
        super()
        this.values = values
    }

    static createGrammar(elementGrammar = this.type?.grammar ?? P.lazy(() => Grammar.unknownValue)) {
        return this.inlined
            ? elementGrammar
            : P.seq(
                P.reg(/\(\s*/),
                elementGrammar.sepBy(Grammar.commaSeparation).opt(),
                P.reg(/\s*(,\s*)?\)/, 1),
            ).map(([_0, values, trailing]) => {
                let self = this
                const hasTrailing = trailing !== undefined
                if (hasTrailing !== self.trailing) {
                    self = self.flagTrailing(hasTrailing)
                }
                values = values instanceof Array ? values : []
                return new self(values)
            }).label(`ArrayEntity of ${this.type?.className() ?? "unknown values"}`)
    }

    /**
     * @template {typeof IEntity} T
     * @param {NonNullable<T>} type
     */
    static of(type) {
        const result = /** @type {typeof ArrayEntity<T> & { type: ExtractType<T>, grammar: P<ArrayEntity<T>> }} */(
            this.asUniqueClass()
        )
        result.type = /** @type {ExtractType<T>} */(type)
        result.grammar = result.createGrammar()
        return result
    }

    valueOf() {
        return this.values
    }
}
