import Serializer from "./Serializer.js"
import Utility from "../Utility.js"

/**
 * @template {SimpleValue} T
 * @extends {Serializer<T>}
 */
export default class ToStringSerializer extends Serializer {

    /** @param {SimpleValueType<T>} entityType */
    constructor(entityType) {
        super(entityType)
    }

    /**
     * @param {T} entity
     * @param {Boolean} insideString
     */
    doWrite(entity, insideString, indentation = "") {
        return !insideString && entity.constructor === String
            ? `"${Utility.escapeString(entity.toString())}"` // String will have quotes if not inside a string already
            : Utility.escapeString(entity.toString())
    }
}
