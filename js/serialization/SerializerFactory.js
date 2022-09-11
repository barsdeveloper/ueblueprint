import Utility from "../Utility"

/** @typedef {import("../entity/IEntity").default} IEntity */
/**
 * @template {IEntity} T
 * @typedef {import("./ISerializer").default<T>} ISerializer
 */

export default class SerializerFactory {

    /** @type {Map<T, ISerializer<T>>} */
    static #serializers = new Map()

    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object)
    }

    /**
     * @template {IEntity} T
     * @param {T} entity
     */
    static getSerializer(entity) {
        return SerializerFactory.#serializers.get(entity)
    }
}
