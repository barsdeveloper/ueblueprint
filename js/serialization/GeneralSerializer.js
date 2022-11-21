import Grammar from "./Grammar"
import ISerializer from "./ISerializer"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends ISerializer<T>
 */
export default class GeneralSerializer extends ISerializer {

    /**
     * @param {(value: String, entity: T) => String} wrap
     * @param {AnyValueConstructor<T>} entityType 
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
        // @ts-expect-error
        let grammar = Grammar.getGrammarForType(ISerializer.grammar, this.entityType)
        const parseResult = grammar.parse(value)
        if (!parseResult.status) {
            // @ts-expect-error
            throw new Error(`Error when trying to parse the entity ${this.entityType.prototype.constructor.name}.`)
        }
        return parseResult.value
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
