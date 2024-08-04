import P from "parsernostrum"
import IEntity from "./IEntity.js"

/** @template {typeof IEntity} T */
export default class MirroredEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type

    /** @param {() => InstanceType<T>} getter */
    constructor(getter = null) {
        super()
        this.getter = getter
    }

    static createGrammar(elementGrammar = this.type?.grammar ?? P.lazy(() => this.unknownEntityGrammar)) {
        return this.getTargetType()?.grammar.map(v => new this(() => v))
    }


    /**
     * @template {typeof IEntity} T
     * @param {(type: T) => (InstanceType<T> | NullEntity)} value
     * @returns {T}
     */
    // @ts-expect-error
    static withDefault(value = type => new type(() => new (type.type)())) {
        // @ts-expect-error
        return super.withDefault(value)
    }

    /**
     * @template {typeof IEntity} T
     * @param {T} type
     */
    static of(type) {
        const result = /** @type {{type: T, grammar: P<MirroredEntity<T>> } & typeof MirroredEntity<T>} */(
            this.asUniqueClass()
        )
        result.type = type
        result.grammar = result.createGrammar()
        return result
    }

    /** @returns {typeof IEntity} */
    static getTargetType() {
        const result = this.type
        if (result?.prototype instanceof MirroredEntity) {
            return /** @type {typeof MirroredEntity} */(result).getTargetType()
        }
        return result
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = this.Self(),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        this.serialize = this.getter().serialize.bind(this.getter())
        return this.serialize(insideString, indentation, Self, printKey, keySeparator, attributeSeparator, wrap)
    }

    /** @param {IEntity} other */
    equals(other) {
        if (other instanceof MirroredEntity) {
            other = other.getter?.()
        }
        return this.getter?.().equals(other)
    }

    valueOf() {
        this.valueOf = this.getter().valueOf.bind(this.getter())
        return this.valueOf()
    }

    toString() {
        this.toString = this.getter().toString.bind(this.getter())
        return this.toString()
    }
}
