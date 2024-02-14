import Serializer from "./Serializer.js"

/**
 * @template {AttributeConstructor<Attribute>} T
 * @extends {Serializer<T>}
 */
export default class CustomSerializer extends Serializer {

    #objectWriter

    /**
     * @param {(v: ConstructedType<T>, insideString: Boolean) => String} objectWriter
     * @param {T} entityType
     */
    constructor(objectWriter, entityType) {
        super(entityType)
        this.#objectWriter = objectWriter
    }

    /**
     * @param {ConstructedType<T>} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(entity, insideString, indentation = "") {
        let result = this.#objectWriter(entity, insideString)
        return result
    }
}
