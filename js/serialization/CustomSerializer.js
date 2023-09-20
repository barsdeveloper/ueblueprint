import Serializer from "./Serializer.js"

/**
 * @template {AnyValue} T
 * @extends {Serializer<T>}
 */
export default class CustomSerializer extends Serializer {

    #objectWriter

    /**
     * @param {(v: T, insideString: Boolean) => String} objectWriter
     * @param {AnyConstructor} entityType
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
    doWrite(entity, insideString, indentation = "") {
        let result = this.#objectWriter(entity, insideString)
        return result
    }
}
