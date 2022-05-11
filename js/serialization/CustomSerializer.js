// @ts-check

import GeneralSerializer from "./GeneralSerializer"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @template {IEntity} T
 */
export default class CustomSerializer extends GeneralSerializer {

    /**
     * @param {new () => T} entityType
     */
    constructor(objectWriter, entityType) {
        super(undefined, entityType)
        this.objectWriter = objectWriter
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(object, insideString = false) {
        let result = this.objectWriter(object, insideString)
        return result
    }
}
