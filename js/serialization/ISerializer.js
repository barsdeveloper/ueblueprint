import Grammar from "./Grammar"
import Parsimmon from "parsimmon"
import SerializerFactory from "./SerializerFactory"
import TypeInitialization from "../entity/TypeInitialization"
import Utility from "../Utility"

/**
 * @typedef {import("../entity/IEntity").EntityConstructor} EntityConstructor
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

/** @template {AnyValue} T */
export default class ISerializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    /** @param {AnyValueConstructor<T>} entityType */
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
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        throw new Error("Not implemented")
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, object, insideString) {
        throw new Error("Not implemented")
    }

    /**
     * @param {AnyValue} value
     * @param {String[]} fullKey
     * @param {Boolean} insideString
     */
    writeValue(entity, value, fullKey, insideString) {
        const type = Utility.getType(value)
        const serializer = SerializerFactory.getSerializer(type)
        if (!serializer) {
            throw new Error(`Unknown value type "${type.name}", a serializer must be registered in the SerializerFactory class, check initializeSerializerFactory.js`)
        }
        return serializer.write(entity, value, insideString)
    }

    /**
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
        const keys =
            attributes ?
                Utility.mergeArrays(
                    Object.getOwnPropertyNames(attributes),
                    Object.getOwnPropertyNames(object)
                )
                : Object.getOwnPropertyNames(object)
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
        // @ts-expect-error
        const attributes = /** @type {EntityConstructor} */(this.entityType).attributes
        const attribute = Utility.objectGet(attributes, attributeKey)
        if (attribute instanceof TypeInitialization) {
            if (attribute.ignored) {
                return false
            }
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}
