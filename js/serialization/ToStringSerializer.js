import Utility from "../Utility"
import GeneralSerializer from "./GeneralSerializer"

/** @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */
/**
 * @template {AnyValue} T
 * @extends {GeneralSerializer<T>}
 */
export default class ToStringSerializer extends GeneralSerializer {

    /** @param {AnyValueConstructor<T>} entityType */
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
