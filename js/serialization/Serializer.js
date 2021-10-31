import Entity from "../entity/Entity"
import Grammar from "./Grammar"
import Parsimmon from "parsimmon"
import Primitive from "../entity/primitive/Primitive"
import SerializerFactory from "./SerializerFactory"
import TypeInitialization from "../entity/TypeInitialization"
import Utility from "../Utility"


export default class Serializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    constructor(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        this.entityType = entityType
        this.prefix = prefix ?? ""
        this.separator = separator ?? ","
        this.trailingSeparator = trailingSeparator ?? false
        this.attributeValueConjunctionSign = attributeValueConjunctionSign ?? "="
        this.attributeKeyPrinter = attributeKeyPrinter ?? (k => k.join("."))
    }

    writeValue(value) {
        if (value === null) {
            return "()"
        }
        // This is an exact match (and not instanceof) to hit also primitive types (by accessing value.constructor they are converted to objects automatically)
        switch (value?.constructor) {
            case Function:
                return this.writeValue(value())
            case Boolean:
                return Utility.FirstCapital(value.toString())
            case Number:
                return value.toString()
            case String:
                return `"${value}"`
        }
        if (value instanceof Entity) {
            return SerializerFactory.getSerializer(Utility.getType(value)).write(value)
        }
        if (value instanceof Primitive) {
            return value.toString()
        }
    }

    subWrite(key, object) {
        let result = ""
        let fullKey = key.concat("")
        const last = fullKey.length - 1
        for (const property in object) {
            fullKey[last] = property
            const value = object[property]
            if (object[property]?.constructor === Object) {
                // Recursive call when finding an object
                result += this.subWrite(fullKey, value, this.prefix, this.separator)
            } else if (this.showProperty(fullKey, value)) {
                result += (result.length ? this.separator : "")
                    + this.prefix
                    + this.attributeKeyPrinter(fullKey)
                    + this.attributeValueConjunctionSign
                    + this.writeValue(value)
            }
        }
        if (this.trailingSeparator && result.length) {
            // append separator at the end if asked and there was printed content
            result += this.separator
        }
        return result
    }

    showProperty(attributeKey, attributeValue) {
        const attributes = this.entityType.attributes
        const attribute = Utility.objectGet(attributes, attributeKey)
        if (attribute instanceof TypeInitialization) {
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}
