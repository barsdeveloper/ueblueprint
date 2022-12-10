import GeneralSerializer from "./GeneralSerializer"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {GeneralSerializer<T>}
 */
export default class CustomSerializer extends GeneralSerializer {

    #objectWriter

    /**
     * @param {(v: T, insideString: Boolean) => String} objectWriter
     * @param {AnyValueConstructor<T>} entityType
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
