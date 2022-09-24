import Utility from "../Utility"
import GeneralSerializer from "./GeneralSerializer"

/** @typedef {import("../entity/IEntity").default} IEntity */

/** @template {IEntity} T */
export default class ToStringSerializer extends GeneralSerializer {

    /** @param {new () => T} entityType */
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
