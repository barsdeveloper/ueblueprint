import Utility from "../Utility.js"
import Serializer from "./Serializer.js"

/**
 * @template {AttributeConstructor<Attribute>} T
 * @extends {Serializer<T>}
 */
export default class ToStringSerializer extends Serializer {

    /** @param {T} entityType */
    constructor(entityType, escape = true) {
        super(entityType)
        if (escape) {
            this.wrap = (entity, serialized) => Utility.escapeString(serialized)
        }
    }

    /**
     * @param {ConstructedType<T>} entity
     * @param {Boolean} insideString
     */
    doWrite(entity, insideString, indentation = "") {

        return !insideString && entity.constructor === String
            ? `"${this.wrap(entity, entity.toString())}"` // String will have quotes if not inside a string already
            : this.wrap(entity, entity.toString())
    }
}
