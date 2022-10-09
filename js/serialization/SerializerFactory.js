/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {import("./ISerializer").default<T>} ISerializer
 */

export default class SerializerFactory {

    /** @type {Map<AnyValueConstructor<AnyValue>, ISerializer<AnyValue>>} */
    static #serializers = new Map()

    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object)
    }

    /**
     * @template {AnyValue} T
     * @param {AnyValueConstructor<T>} entity
     */
    static getSerializer(entity) {
        return SerializerFactory.#serializers.get(entity)
    }
}
