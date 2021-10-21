import Parsimmon from "parsimmon"
import Grammar from "./Grammar"
import Utility from "../Utility"
import TypeInitialization from "../entity/TypeInitialization"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import Guid from "../Guid"


export default class Serializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    writeValue(value) {
        if (value === null) {
            return "()"
        }
        switch (value?.constructor) {
            case Function:
                return this.writeValue(value())
            case Boolean:
                return Utility.FirstCapital(value.toString())
            case ObjectReferenceEntity:
            case Guid:
                return value.toString()
            case String:
                return `"${value}"`
        }
    }

    /**
     * 
     * @param {String[]} prefix 
     * @param {Object} object 
     * @param {String} separator 
     * @returns 
     */
    subWrite(key, object, separator = "\n", prefix = "") {
        let result = ""
        let fullKey = key.concat("")
        const last = fullKey.length - 1
        for (const property in object) {
            fullKey[last] = property
            const value = object[property]
            if (object[property]?.constructor === Object) {
                // Recursive call when finding an object
                result += this.subWrite(fullKey, value, separator, prefix)
            } else if (this.showProperty(fullKey, value)) {
                result += prefix + fullKey.join(".") + "=" + this.writeValue(value) + separator
            }
        }
        return result
    }

    getAttributes() {
        return PinEntity.attributes
    }

    showProperty(attributeKey, attributeValue) {
        const attributes = this.getAttributes()
        const attribute = Utility.objectGet(attributes, attributeKey)
        if (attribute instanceof TypeInitialization) {
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }

    /**
     * 
     * @param {String} value 
     */
    read(value) {
    }

    /**
     * Returns a string representing the object (serialization)
     * @param {*} object 
     * @returns The serialized string
     */
    write(object) {
        return ''
    }
}