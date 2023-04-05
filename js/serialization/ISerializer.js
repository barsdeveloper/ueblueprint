import IndexedArray from "../entity/IndexedArray.js"
import SerializerFactory from "./SerializerFactory.js"
import Utility from "../Utility.js"

/**
 * @typedef {import("../entity/IEntity").EntityConstructor} EntityConstructor
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */

/** @template {AnyValue} T */
export default class ISerializer {

    /** @param {AnyValueConstructor} entityType */
    constructor(
        entityType,
        attributePrefix = "",
        attributeSeparator = ",",
        trailingSeparator = false,
        attributeValueConjunctionSign = "=",
        attributeKeyPrinter = k => k
    ) {
        this.entityType = entityType
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
        throw new Error("Not implemented")
    }

    /**
     * @protected
     * @param {T} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(entity, insideString) {
        let result = ""
        const attributes = /** @type {EntityConstructor} */(entity.constructor).attributes ?? {}
        const keys = Utility.mergeArrays(
            Object.keys(attributes),
            Object.keys(entity)
        )
        for (const key of keys) {
            const value = entity[key]
            if (value !== undefined && this.showProperty(entity, key)) {
                const isSerialized = Utility.isSerialized(entity, key)
                if (value instanceof IndexedArray) {
                    value.value.forEach((value, i) =>
                        result += (result.length ? this.attributeSeparator : "")
                        + this.attributePrefix
                        + Utility.decodeKeyName(this.attributeKeyPrinter(key))
                        + `(${i})`
                        + this.attributeValueConjunctionSign
                        + (
                            isSerialized
                                ? `"${this.doWriteValue(value, true)}"`
                                : this.doWriteValue(value, insideString)
                        )
                    )
                    continue
                }
                result += (result.length ? this.attributeSeparator : "")
                    + this.attributePrefix
                    + Utility.decodeKeyName(this.attributeKeyPrinter(key))
                    + this.attributeValueConjunctionSign
                    + (
                        isSerialized
                        ? `"${this.doWriteValue(value, true)}"`
                        : this.doWriteValue(value, insideString)
                    )
            }
        }
        if (this.trailingSeparator && result.length) {
            // append separator at the end if asked and there was printed content
            result += this.attributeSeparator
        }
        return result
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
