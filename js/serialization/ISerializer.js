import SerializerFactory from "./SerializerFactory.js"
import Utility from "../Utility.js"
import IEntity from "../entity/IEntity.js"

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
        attributeKeyPrinter = k => k.join(".")
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
    deserialize(value) {
        return this.read(value)
    }

    /** @param {T} object */
    serialize(object, insideString = false, entity = object) {
        return this.write(entity, object, insideString)
    }

    /**
     * @protected
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        throw new Error("Not implemented")
    }

    /**
     * @protected
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, object, insideString) {
        throw new Error("Not implemented")
    }

    /**
     * @protected
     * @param {AnyValue} value
     * @param {String[]} fullKey
     * @param {Boolean} insideString
     */
    writeValue(entity, value, fullKey, insideString) {
        const type = Utility.getType(value)
        // @ts-expect-error
        const serializer = SerializerFactory.getSerializer(type)
        if (!serializer) {
            throw new Error(`Unknown value type "${type.name}", a serializer must be registered in the SerializerFactory class, check initializeSerializerFactory.js`)
        }
        return serializer.write(
            value instanceof IEntity ? value : entity,
            value,
            insideString
        )
    }

    /**
     * @protected
     * @param {String[]} key
     * @param {Object} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    subWrite(entity, key, object, insideString) {
        let result = ""
        let fullKey = key.concat("")
        const last = fullKey.length - 1
        const attributes = /** @type {EntityConstructor} */(object.constructor).attributes
        const keys = attributes
            ? Utility.mergeArrays(
                Object.keys(attributes),
                Object.keys(object)
            )
            : Object.keys(object)
        for (const property of keys) {
            fullKey[last] = property
            const value = object[property]
            if (value?.constructor === Object) {
                // Recursive call when finding an object
                result += (result.length ? this.attributeSeparator : "")
                    + this.subWrite(entity, fullKey, value, insideString)
            } else if (value !== undefined && this.showProperty(entity, object, fullKey, value)) {
                const isSerialized = Utility.isSerialized(entity, fullKey)
                result += (result.length ? this.attributeSeparator : "")
                    + this.attributePrefix
                    + this.attributeKeyPrinter(fullKey)
                    + this.attributeValueConjunctionSign
                    + (
                        isSerialized
                            ? `"${this.writeValue(entity, value, fullKey, true)}"`
                            : this.writeValue(entity, value, fullKey, insideString)
                    )
            }
        }
        if (this.trailingSeparator && result.length && fullKey.length === 1) {
            // append separator at the end if asked and there was printed content
            result += this.attributeSeparator
        }
        return result
    }

    showProperty(entity, object, attributeKey, attributeValue) {
        const attributes = /** @type {EntityConstructor} */(this.entityType).attributes
        const attribute = attributes[attributeKey]
        if (attribute?.constructor === Object) {
            if (attribute.ignored) {
                return false
            }
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}
