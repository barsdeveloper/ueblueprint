import P from "parsernostrum"
import IEntity from "./IEntity.js"

/** @template {typeof IEntity} T */
export default class MirroredEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type

    /** @param {() => InstanceType<T>} getter */
    constructor(getter = null) {
        super()
        const self = /** @type {typeof MirroredEntity<T>} */(this.constructor)
        getter ??= self.default !== undefined ? /** @type {MirroredEntity} */(self.default(self)).getter : getter
        this.getter = getter
    }

    static createGrammar(elementGrammar = this.type?.grammar ?? P.lazy(() => this.unknownEntityGrammar)) {
        return this.type?.grammar.map(v => new this(() => v))
    }


    /**
     * @template {typeof IEntity} T
     * @this {T}
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

    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof MirroredEntity<T>} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        const value = this.getter()
        return value.serialize(insideString, indentation, Self.type, printKey, keySeparator, attributeSeparator, wrap)
    }

    /** @param {IEntity} other */
    equals(other) {
        if (other instanceof MirroredEntity) {
            other = other.getter?.()
        }
        return this.getter?.().equals(other)
    }

    /** @returns {InstanceType<T>} */
    valueOf() {
        // @ts-expect-error
        return this.getter().valueOf()
    }

    toString() {
        return this.getter().toString()
    }
}
