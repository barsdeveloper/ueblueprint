import Grammar from "./Grammar.js"
import ISerializer from "./ISerializer.js"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */
/**
 * @template T
 * @typedef {import("arcsecond").Ok<T, any>} Ok
 */

/**
 * @template {AnyValue} T
 * @extends ISerializer<T>
 */
export default class GeneralSerializer extends ISerializer {

    /**
     * @param {(value: String, entity: T) => String} wrap
     * @param {AnyValueConstructor} entityType
     */
    constructor(wrap, entityType, attributePrefix, attributeSeparator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        wrap = wrap ?? (v => `(${v})`)
        super(entityType, attributePrefix, attributeSeparator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter)
        this.wrap = wrap
    }

    /**
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        const grammar = Grammar.grammarFor(undefined, this.entityType)
        const parseResult = grammar.run(value)
        if (parseResult.isError) {
            throw new Error(`Error when trying to parse the entity ${this.entityType.prototype.constructor.name}`)
        }
        return /** @type {Ok<T>} */(parseResult).result
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, object, insideString = false) {
        let result = this.wrap(this.subWrite(entity, [], object, insideString), object)
        return result
    }
}
