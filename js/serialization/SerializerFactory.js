// @ts-check

import Utility from "../Utility"

export default class SerializerFactory {

    static #serializers = new Map()

    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object)
    }

    static getSerializer(entity) {
        return SerializerFactory.#serializers.get(Utility.getType(entity))
    }
}
