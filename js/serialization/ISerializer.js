// @ts-check

import Grammar from "./Grammar"
import IEntity from "../entity/IEntity"
import Parsimmon from "parsimmon"
import SerializerFactory from "./SerializerFactory"
import TypeInitialization from "../entity/TypeInitialization"
import Utility from "../Utility"

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

    writeValue(value, fullKey = undefined) {
        if (value === null) {
            return "()"
        }
        const serialize = v => SerializerFactory.getSerializer(Utility.getType(v)).write(v)
        // This is an exact match (and not instanceof) to hit also primitive types (by accessing value.constructor they are converted to objects automatically)
        switch (value?.constructor) {
            case Function:
                return this.writeValue(value(), fullKey)
            case Boolean:
                return Utility.FirstCapital(value.toString())
            case Number:
                return value.toString()
            case String:
                return `"${Utility.encodeString(value)}"`
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
     * @returns {String}
     */
    subWrite(key, object) {
        let result = ""
        let fullKey = key.concat("")
        const last = fullKey.length - 1
        for (const property of Object.getOwnPropertyNames(object)) {
            fullKey[last] = property
            const value = object[property]
            if (object[property]?.constructor === Object) {
                // Recursive call when finding an object
                result += (result.length ? this.separator : "")
                    + this.subWrite(fullKey, value)
            } else if (value !== undefined && this.showProperty(object, fullKey, value)) {
                result += (result.length ? this.separator : "")
                    + this.prefix
                    + this.attributeKeyPrinter(fullKey)
                    + this.attributeValueConjunctionSign
                    + this.writeValue(value, fullKey)
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
