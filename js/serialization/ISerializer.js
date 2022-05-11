// @ts-check

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
    serialize(object, insideString) {
        insideString ||= object.isShownAsString()
        let result = this.write(object, insideString)
        if (object.isShownAsString()) {
            result = `"${result}"`
        }
        return result
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
    write(object, insideString) {
        throw new Error("Not implemented")
    }

    /**
     * @param {String[]} fullKey
     * @param {Boolean} insideString
     */
    writeValue(value, fullKey, insideString) {
        if (value === null) {
            return "()"
        }
        const serialize = v => SerializerFactory.getSerializer(Utility.getType(v)).serialize(v)
        // This is an exact match (and not instanceof) to hit also primitive types (by accessing value.constructor they are converted to objects automatically)
        switch (value?.constructor) {
            case Function:
                return this.writeValue(value(), fullKey, insideString)
            case Boolean:
                return Utility.FirstCapital(value.toString())
            case Number:
                return value.toString()
            case String:
                return insideString
                    ? `\\"${Utility.encodeString(value)}\\"`
                    : `"${Utility.encodeString(value)}"`
        }
        if (value instanceof Array) {
            return `(${value.map(v => serialize(v) + ",").join("")})`
        }
        if (value instanceof IEntity) {
            return serialize(value)
        }
    }

    /**
     * @param {String[]} key
     * @param {Object} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    subWrite(key, object, insideString) {
        let result = ""
        let fullKey = key.concat("")
        const last = fullKey.length - 1
        for (const property of Object.getOwnPropertyNames(object)) {
            fullKey[last] = property
            const value = object[property]
            if (value?.constructor === Object) {
                // Recursive call when finding an object
                result += (result.length ? this.separator : "")
                    + this.subWrite(fullKey, value, insideString)
            } else if (value !== undefined && this.showProperty(object, fullKey, value)) {
                result += (result.length ? this.separator : "")
                    + this.prefix
                    + this.attributeKeyPrinter(fullKey)
                    + this.attributeValueConjunctionSign
                    + this.writeValue(value, fullKey, insideString)
            }
        }
        if (this.trailingSeparator && result.length && fullKey.length === 1) {
            // append separator at the end if asked and there was printed content
            result += this.separator
        }
        return result
    }

    showProperty(object, attributeKey, attributeValue) {
        const attributes = this.entityType.attributes
        const attribute = Utility.objectGet(attributes, attributeKey)
        if (attribute instanceof TypeInitialization) {
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}
