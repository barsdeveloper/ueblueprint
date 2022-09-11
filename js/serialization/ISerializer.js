import Grammar from "./Grammar"
import IEntity from "../entity/IEntity"
import Parsimmon from "parsimmon"
import SerializerFactory from "./SerializerFactory"
import TypeInitialization from "../entity/TypeInitialization"
import Utility from "../Utility"

/**
 * @template {IEntity} T
 */
export default class ISerializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    constructor(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        this.entityType = entityType
        this.prefix = prefix ?? ""
        this.separator = separator ?? ","
        this.trailingSeparator = trailingSeparator ?? false
        this.attributeValueConjunctionSign = attributeValueConjunctionSign ?? "="
        this.attributeKeyPrinter = attributeKeyPrinter ?? (k => k.join("."))
    }

    /**
     * @param {String} value
     * @returns {T}
     */
    deserialize(value) {
        return this.read(value)
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    serialize(object, insideString, entity = object) {
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
     * @param {String[]} fullKey
     * @param {Boolean} insideString
     */
    writeValue(entity, value, fullKey, insideString) {
        const serializer = SerializerFactory.getSerializer(Utility.getType(value))
        if (!serializer) {
            throw new Error("Unknown value type, a serializer must be registered in the SerializerFactory class")
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
        for (const property of Object.getOwnPropertyNames(object)) {
            fullKey[last] = property
            const value = object[property]
            if (value?.constructor === Object) {
                // Recursive call when finding an object
                result += (result.length ? this.separator : "")
                    + this.subWrite(entity, fullKey, value, insideString)
            } else if (value !== undefined && this.showProperty(entity, object, fullKey, value)) {
                const isSerialized = Utility.isSerialized(entity, fullKey)
                result += (result.length ? this.separator : "")
                    + this.prefix
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
            result += this.separator
        }
        return result
    }

    showProperty(entity, object, attributeKey, attributeValue) {
        const attributes = this.entityType.attributes
        const attribute = Utility.objectGet(attributes, attributeKey)
        if (attribute instanceof TypeInitialization) {
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}
