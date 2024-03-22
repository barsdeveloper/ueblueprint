import Utility from "../Utility.js"
import Serializer from "./Serializer.js"

/**
 * @template {AttributeConstructor<Attribute>} T
 * @extends {Serializer<T>}
 */
export default class ToStringSerializer extends Serializer {

    /** @param {T} entityType */
    constructor(entityType) {
        super(entityType)
    }

    /**
     * @param {ConstructedType<T>} entity
     * @param {Boolean} insideString
     */
    doWrite(entity, insideString, indentation = "") {
        return !insideString && entity.constructor === String
            ? `"${Utility.escapeString(entity.toString())}"` // String will have quotes if not inside a string already
            : Utility.escapeString(entity.toString())
    }
}
