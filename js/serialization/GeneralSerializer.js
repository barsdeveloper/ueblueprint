import Grammar from "./Grammar.js"
import ISerializer from "./ISerializer.js"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
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
        let grammar = Grammar.grammarFor(undefined, this.entityType)
        const parseResult = grammar.parse(value)
        if (!parseResult.status) {
            throw new Error(`Error when trying to parse the entity ${this.entityType.prototype.constructor.name}.`)
        }
        return parseResult.value
    }

    /**
     * @param {T} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, insideString = false) {
        let result = this.wrap(super.write(entity, insideString), entity)
        return result
    }
}
