import GeneralSerializer from "./GeneralSerializer"

/** @typedef {import("../entity/IEntity").default} IEntity */

/** @template {IEntity | Boolean | Number | String} T */
export default class CustomSerializer extends GeneralSerializer {

    #objectWriter

    /**
     * @param {(v: T, insideString: Boolean) => String} objectWriter
     * @param {new () => T} entityType
     */
    constructor(objectWriter, entityType) {
        super(undefined, entityType)
        this.#objectWriter = objectWriter
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, object, insideString = false) {
        let result = this.#objectWriter(object, insideString)
        return result
    }
}
