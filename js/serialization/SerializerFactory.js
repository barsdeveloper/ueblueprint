export default class SerializerFactory {

    static #serializers = new Map()

    /**
     * @template {SimpleValueType<SimpleValue>} T
     * @param {T} type
     * @param {Serializer<T>} object
     */
    static registerSerializer(type, object) {
        SerializerFactory.#serializers.set(type, object)
    }

    /**
     * @template {SimpleValueType<any>} T
     * @param {T} type
     * @returns {Serializer<ConstructedType<T>>}
     */
    static getSerializer(type) {
        return SerializerFactory.#serializers.get(type)
    }
}
