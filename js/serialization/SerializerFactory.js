export default class SerializerFactory {

    static #serializers = new Map()

    /**
     * @template {AttributeConstructor<Attribute>} T
     * @param {T} type
     * @param {Serializer<T>} object
     */
    static registerSerializer(type, object) {
        SerializerFactory.#serializers.set(type, object)
    }

    /**
     * @template {AttributeConstructor<Attribute>} T
     * @param {T} type
     * @returns {Serializer<T>}
     */
    static getSerializer(type) {
        return SerializerFactory.#serializers.get(type)
    }
}
