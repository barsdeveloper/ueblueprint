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
     * @param {T} object
     * @param {Boolean} insideString
     */
    write(entity, object, insideString) {
        return !insideString && object.constructor === String
            ? `"${Utility.escapeString(object.toString())}"` // String will have quotes if not inside a string already
            : Utility.escapeString(object.toString())
    }
}
