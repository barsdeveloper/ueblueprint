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
     * @typedef {{
     *     (entity: new (...args: any) => T) : Serializer<T>
     *     (entity: BigIntConstructor): Serializer<BigInt>;
     * }} SerializerGetter
     */
    /**
     * @template {AnyValue} T
     * @type {SerializerGetter<T>}
     */
    static getSerializer = 
    /**
     * @param {T} entity
     * @returns {Serializer<T>}
     */    
    (entity) => {
        // @ts-expect-error
        return SerializerFactory.#serializers.get(entity)
    }
}

let x
/**
 * @template T
 * @param {T} v
 * @returns {InstanceType<T>}
 */
function a(v) {
    return x
}

class A {}

let aaaaa = a(BigInt)
