import GeneralSerializer from "./GeneralSerializer.js"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {GeneralSerializer<T>}
 */
export default class CustomSerializer extends GeneralSerializer {

    #objectWriter

    /**
     * @param {(v: T, insideString: Boolean) => String} objectWriter
     * @param {AnyValueConstructor} entityType
     */
    constructor(objectWriter, entityType) {
        super(undefined, entityType)
        this.#objectWriter = objectWriter
    }

    /**
     * @param {T} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, insideString = false) {
        let result = this.#objectWriter(entity, insideString)
        return result
    }
}
