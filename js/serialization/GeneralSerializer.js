// @ts-check

import Grammar from "./Grammar"
import ISerializer from "./ISerializer"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @template {IEntity} T
 */
export default class GeneralSerializer extends ISerializer {

    /**
     * @param {new () => T} entityType
     */
    constructor(wrap, entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        wrap = wrap ?? (v => `(${v})`)
        super(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter)
        this.wrap = wrap
    }

    /**
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        let grammar = Grammar.getGrammarForType(ISerializer.grammar, this.entityType)
        const parseResult = grammar.parse(value)
        if (!parseResult.status) {
            throw new Error(`Error when trying to parse the entity ${this.entityType.prototype.constructor.name}.`)
        }
        return parseResult.value
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(object, insideString = false) {
        let result = this.wrap(this.subWrite([], object, insideString))
        return result
    }
}
