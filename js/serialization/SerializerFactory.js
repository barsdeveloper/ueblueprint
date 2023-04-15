/**
 * @typedef {import("../entity/IEntity.js").default} IEntity
 * @typedef {import("../entity/IEntity.js").AnyValue} AnyValue
 */

/**
 * @template {AnyValue} T
 * @typedef {import("../entity/IEntity.js").AnyValueConstructor<T>} AnyValueConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {import("./Serializer.js").default<T>} Serializer
 */

export default class SerializerFactory {

    /** @type {Map<AnyValueConstructor<AnyValue>, Serializer<AnyValue>>} */
    static #serializers = new Map()

    /**
     * @template {AnyValue} T
     * @param {AnyValueConstructor<T>} entity
     * @param {Serializer<T>} object
     */
    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object)
    }

    /**
     * @template {AnyValue} T
     * @param {new (...any) => T} entity
     * @returns {Serializer<T>}
     */
    static getSerializer(entity) {
        // @ts-expect-error
        return SerializerFactory.#serializers.get(entity)
    }
}
