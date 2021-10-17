import Parsimmon from "parsimmon"
import PinGrammar from "./PinGrammar"

export default class Serializer {

    static writeValue(value) {
        if (value?.constructor?.name === 'Function') {
            return this.writeValue(value())
        }
        // No quotes
        if (value === null) {
            return '()'
        }
        if (value?.constructor?.name === 'Boolean') {
            return value ? 'True' : 'False'
        }
        if (value?.constructor?.name === 'ETypesNames' || value?.constructor?.name === 'FGuid') {
            return value.toString()
        }
        // Quotes
        if (value?.constructor?.name === 'String') {
            return `"${value}"`
        }
    }

    static subWrite(prefix, object) {
        let result = ""
        prefix += prefix != "" ? "." : ""
        const fullPropertyName = prefix + property
        for (const property in object) {
            if (object[property]?.constructor?.name === 'Object') {
                result += Serializer.subWrite(fullPropertyName, object[property])
            } else if (!object.constructor.optionalKeys.contains(fullPropertyName)) {
                result += `${fullPropertyName}=${Serializer.writeValue(object[property])},`
            }
        }
        return result
    }

    /**
     * 
     * @param {String} value 
     */
    read(value) {
        //Parsimmon.length
    }

    write(object) {
        return ''
    }
}