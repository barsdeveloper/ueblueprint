import ISerializer from "./ISerializer.js"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {ISerializer<T>}
 */
export default class CustomSerializer extends ISerializer {

    #objectWriter

    /**
     * @param {(v: T, insideString: Boolean) => String} objectWriter
     * @param {AnyValueConstructor} entityType
     */
    constructor(objectWriter, entityType) {
        super(entityType)
        this.#objectWriter = objectWriter
    }

    /**
     * @param {T} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(entity, insideString = false) {
        let result = this.#objectWriter(entity, insideString)
        return result
    }
}
