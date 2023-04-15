import Serializer from "./Serializer.js"
import Utility from "../Utility.js"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {Serializer<T>}
 */
export default class ToStringSerializer extends Serializer {

    /** @param {AnyValueConstructor} entityType */
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
