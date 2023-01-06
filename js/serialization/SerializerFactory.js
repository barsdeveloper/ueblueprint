/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 */

/**
 * @template {AnyValue} T
 * @typedef {import("../entity/IEntity").AnyValueConstructor<T>} AnyValueConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {import("./ISerializer").default<T>} ISerializer
 */

export default class SerializerFactory {

    /** @type {Map<AnyValueConstructor<AnyValue>, ISerializer<AnyValue>>} */
    static #serializers = new Map()

    /**
     * @template {AnyValue} T
     * @param {AnyValueConstructor<T>} entity
     * @param {ISerializer<T>} object
     */
    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object)
    }

    /**
     * @template {AnyValue} T
     * @param {new () => T} entity
     * @returns {ISerializer<T>}
     */
    static getSerializer(entity) {
        // @ts-expect-error
        return SerializerFactory.#serializers.get(entity)
    }
}
