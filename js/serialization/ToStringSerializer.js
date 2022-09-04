import GeneralSerializer from "./GeneralSerializer"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @template {IEntity} T
 */
export default class ToStringSerializer extends GeneralSerializer {

    /**
     * @param {new () => T} entityType
     */
    constructor(entityType) {
        super(undefined, entityType)
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     */
    write(object, insideString) {
        let result = insideString || object.isShownAsString()
            ? `"${object.toString().replaceAll('"', '\\"')}"`
            : object.toString()
        return result
    }
}
