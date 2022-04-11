// @ts-check

import Grammar from "./Grammar"
import ISerializer from "./ISerializer"

export default class GeneralSerializer extends ISerializer {

    constructor(wrap, entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        wrap = wrap ?? (v => `(${v})`)
        super(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter)
        this.wrap = wrap
    }

    /**
     * @template T
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
     * @template T
     * @param {T} object
     * @returns {String}
     */
    write(object) {
        let result = this.wrap(this.subWrite([], object))
        return result
    }
}
