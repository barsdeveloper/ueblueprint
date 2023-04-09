import Grammar from "./Grammar.js"
import SerializerFactory from "./SerializerFactory.js"
import Utility from "../Utility.js"

/**
 * @typedef {import("../entity/IEntity.js").EntityConstructor} EntityConstructor
 * @typedef {import("../entity/IEntity.js").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity.js").AnyValueConstructor<*>} AnyValueConstructor
 */

/** @template {AnyValue} T */
export default class Serializer {

    /** @type {(v: String, entityType: AnyValueConstructor) => String} */
    static bracketsWrapped = ((v, entityType) => `(${v})`)
    /** @type {(v: String) => String} */
    static same = (v => v)

    /** @param {AnyValueConstructor} entityType */
    constructor(
        entityType,
        wrap = Serializer.same,
        attributePrefix = "",
        attributeSeparator = ",",
        trailingSeparator = false,
        attributeValueConjunctionSign = "=",
        attributeKeyPrinter = k => k
    ) {
        this.entityType = entityType
        this.wrap = wrap
        this.attributePrefix = attributePrefix
        this.attributeSeparator = attributeSeparator
        this.trailingSeparator = trailingSeparator
        this.attributeValueConjunctionSign = attributeValueConjunctionSign
        this.attributeKeyPrinter = attributeKeyPrinter
    }

    /**
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        return this.doRead(value)
    }

    /** @param {T} value */
    write(value, insideString = false) {
        return this.doWrite(value, insideString)
    }

    /**
     * @protected
     * @param {String} value
     * @returns {T}
     */
    doRead(value) {
        let grammar = Grammar.grammarFor(undefined, this.entityType)
        const parseResult = grammar.parse(value)
        if (!parseResult.status) {
            throw new Error(`Error when trying to parse the entity ${this.entityType.prototype.constructor.name}.`)
        }
        return parseResult.value
    }

    /**
     * @protected
     * @param {T} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(
        entity,
        insideString,
        wrap = this.wrap,
        attributePrefix = this.attributePrefix,
        attributeSeparator = this.attributeSeparator,
        trailingSeparator = this.trailingSeparator,
        attributeValueConjunctionSign = this.attributeValueConjunctionSign,
        attributeKeyPrinter = this.attributeKeyPrinter
    ) {
        let result = ""
        const attributes = /** @type {EntityConstructor} */(entity.constructor).attributes ?? {}
        const keys = Utility.mergeArrays(
            Object.keys(attributes),
            Object.keys(entity)
        )
        let first = true
        for (const key of keys) {
            const value = entity[key]
            if (value !== undefined && this.showProperty(entity, key)) {
                const isSerialized = Utility.isSerialized(entity, key)
                if (first) {
                    first = false
                } else {
                    result += attributeSeparator
                }
                if (attributes[key]?.inlined) {
                    result += this.doWrite(
                        value,
                        insideString,
                        Serializer.same,
                        attributePrefix,
                        attributeSeparator,
                        false,
                        attributeValueConjunctionSign,
                        attributes[key].type instanceof Array
                            ? k => attributeKeyPrinter(`${key}(${k})`)
                            : k => attributeKeyPrinter(`${key}.${k}`),
                    )
                    continue
                }
                result +=
                    attributePrefix
                    + attributeKeyPrinter(key)
                    + this.attributeValueConjunctionSign
                    + (
                        isSerialized
                            ? `"${this.doWriteValue(value, true)}"`
                            : this.doWriteValue(value, insideString)
                    )
            }
        }
        if (trailingSeparator && result.length) {
            // append separator at the end if asked and there was printed content
            result += this.attributeSeparator
        }
        return wrap(result, entity.constructor)
    }

    /**
     * @protected
     * @param {Boolean} insideString
     */
    doWriteValue(value, insideString) {
        const type = Utility.getType(value)
        // @ts-expect-error
        const serializer = SerializerFactory.getSerializer(type)
        if (!serializer) {
            throw new Error(
                `Unknown value type "${type.name}", a serializer must be registered in the SerializerFactory class, `
                + "check initializeSerializerFactory.js"
            )
        }
        return serializer.doWrite(
            value,
            insideString
        )
    }

    showProperty(entity, key) {
        const attributes = /** @type {EntityConstructor} */(this.entityType).attributes
        const attribute = attributes[key]
        const value = entity[key]
        if (attribute?.constructor === Object) {
            if (attribute.ignored) {
                return false
            }
            return !Utility.equals(attribute.value, value) || attribute.showDefault
        }
        return true
    }
}
