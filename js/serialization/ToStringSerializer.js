import ISerializer from "./ISerializer.js"
import Utility from "../Utility.js"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {ISerializer<T>}
 */
export default class ToStringSerializer extends ISerializer {

    /** @param {AnyValueConstructor} entityType */
    constructor(entityType) {
        super(entityType)
    }

    /**
     * @param {T} entity
     * @param {Boolean} insideString
     */
    doWrite(entity, insideString) {
        return !insideString && entity.constructor === String
            ? `"${Utility.escapeString(entity.toString())}"` // String will have quotes if not inside a string already
            : Utility.escapeString(entity.toString())
    }
}
