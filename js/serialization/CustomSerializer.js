import Serializer from "./Serializer.js"

/**
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import("../entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {Serializer<T>}
 */
export default class CustomSerializer extends Serializer {

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
