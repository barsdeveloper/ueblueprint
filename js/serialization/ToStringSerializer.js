import Utility from "../Utility.js"
import GeneralSerializer from "./GeneralSerializer.js"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {GeneralSerializer<T>}
 */
export default class ToStringSerializer extends GeneralSerializer {

    /** @param {AnyValueConstructor} entityType */
    constructor(entityType) {
        super(undefined, entityType)
    }

    /**
     * @param {T} entity
     * @param {Boolean} insideString
     */
    write(entity, insideString) {
        return !insideString && entity.constructor === String
            ? `"${Utility.escapeString(entity.toString())}"` // String will have quotes if not inside a string already
            : Utility.escapeString(entity.toString())
    }
}
