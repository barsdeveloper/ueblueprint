import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

/** @template {IEntity} T */
export default class ArrayEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type
    static grammar = /** @type {P<ArrayEntity<IEntity>>} */(
        this.createGrammar()
    )

    get length() {
        return this.values.length
    }

    /** @param {T[]} values */
    constructor(values = []) {
        super()
        this.values = values
    }

    /** @returns {P<ArrayEntity<IEntity>>} */
    static createGrammar(elementGrammar = this.type?.grammar ?? P.lazy(() => this.unknownEntityGrammar)) {
        return this.inlined
            ? elementGrammar
            : P.seq(
                P.reg(/\(\s*/),
                elementGrammar.sepBy(Grammar.commaSeparation).opt(),
                P.reg(/\s*(,\s*)?\)/, 1),
            ).map(([_0, values, trailing]) => {
                values = values instanceof Array ? values : []
                const result = new this(values)
                result.trailing = trailing !== undefined
                return result
            }).label(`ArrayEntity of ${this.type?.className() ?? "unknown values"}`)
    }

    /**
     * @template {typeof IEntity} T
     * @param {T} type
     */
    static of(type) {
        const result = /** @type {typeof ArrayEntity<ExtractType<T>> & {type: T, grammar: P<ArrayEntity<ExtractType<T>>> }} */(
            this.asUniqueClass()
        )
        result.type = type
        result.grammar = /** @type {P<ArrayEntity>} */(result.createGrammar())
        return result
    }

    /** @param {IEntity} other */
    equals(other) {
        if (!(other instanceof ArrayEntity) || this.values.length !== other.values.length) {
            return false
        }
        for (let i = 0; i < this.values.length; ++i) {
            if (!this.values[i].equals(other.values[i])) {
                return false
            }
        }
        return true
    }

    valueOf() {
        return this.values
    }

    toString(
        insideString = false,
        indentation = "",
        Self = this.Self(),
        printKey = Self.printKey,
        wrap = Self.wrap,
    ) {
        if (Self.inlined) {
            return super.toString.bind(this.values, insideString, indentation, Self, printKey, wrap)()
        }
        let result = this.values.map(v => v?.toString(insideString)).join(Self.attributeSeparator)
        if (this.trailing) {
            result += Self.attributeSeparator
        }
        return `(${result})`
    }
}
