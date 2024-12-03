import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"

/** @template {typeof IEntity} T */
export default class ArrayEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type
    static grammar = this.createGrammar()

    get length() {
        return this.values.length
    }

    /** @param {(ExtractType<T>)[]} values */
    constructor(values = []) {
        super()
        this.values = values
    }

    /** @returns {P<ArrayEntity<typeof IEntity>>} */
    static createGrammar(elementGrammar = this.type?.grammar ?? P.lazy(() => this.unknownEntityGrammar)) {
        return this.inlined
            ? elementGrammar
            : P.seq(
                P.reg(/\(\s*/),
                elementGrammar.sepBy(Grammar.commaSeparation).opt(),
                P.reg(/\s*(,\s*)?\)/, 1),
            ).map(([_0, values, trailing]) => {
                values = values instanceof Array ? values : []
                let Self = this
                if ((trailing !== undefined) !== Self.trailing) {
                    Self = Self.flagTrailing(trailing !== undefined)
                }
                return new Self(values)
            }).label(`ArrayEntity of ${this.type?.className() ?? "unknown values"}`)
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagInlined(value = true) {
        const result = this.asUniqueClass()
        result.inlined = value
        result.grammar = /** @type {P<ArrayEntity>} */(result.createGrammar())
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @param {T} type
     */
    static of(type) {
        const result = /** @type {{type: T, grammar: P<ArrayEntity<T>> } & typeof ArrayEntity<T>} */(
            this.asUniqueClass()
        )
        result.type = type
        result.grammar = /** @type {P<ArrayEntity>} */(result.createGrammar())
        return result
    }

    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof ArrayEntity<T>} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        if (Self.inlined) {
            return super.serialize.bind(
                this.values,
                insideString,
                indentation,
                Self,
                printKey,
                keySeparator,
                attributeSeparator,
                wrap
            )()
        }
        let result = this.values.map(v => v?.serialize(insideString)).join(Self.attributeSeparator)
        if (this.trailing) {
            result += Self.attributeSeparator
        }
        return `(${result})`
    }

    valueOf() {
        return this.values
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
}
