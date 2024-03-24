/**
 * @template T
 * @typedef {{
 *     type?: AttributeTypeDescription,
 *     default?: T,
 *     nullable?: Boolean,
 *     ignored?: Boolean,
 *     serialized?: Boolean,
 *     expected?: Boolean,
 *     inlined?: Boolean,
 *     quoted?: Boolean,
 *     silent?: Boolean,
 *     predicate?: (value: T) => Boolean,
 * }} AttributeInfoSource
 */

/** @template T */
export default class AttributeInfo {

    /** @typedef {keyof AttributeInfo<number>} AttributeKey */

    static #default = {
        nullable: false,
        ignored: false, // Never serialize or deserialize
        serialized: false, // Value is written and read as string
        expected: false, // Must be there
        inlined: false, // The key is a subobject or array and printed as inlined (A.B=123, A(0)=123)
        quoted: false, // Key is serialized with quotes
        silent: false, // Do not serialize if default
    }

    /** @param {AttributeInfoSource<T>} source */
    constructor(source) {
        this.type = source.type ?? source.default?.constructor
        this.default = source.default
        this.nullable = source.nullable ?? source.default === null
        this.ignored = source.ignored
        this.serialized = source.serialized
        this.expected = source.expected
        this.inlined = source.inlined
        this.quoted = source.quoted
        this.silent = source.silent
        this.predicate = source.predicate
        if (this.type === Array && this.default instanceof Array && this.default.length > 0) {
            this.type = this.default
                .map(v => v.constructor)
                .reduce((acc, cur) => acc.includes(cur) ? acc : (acc.push(cur), acc), [])
        }
    }

    /**
     * @template {AttributeTypeDescription} D
     * @param {D} type
     * @returns {AttributeInfo<DescribedType<type>>}
     */
    static createType(type) {
        return new AttributeInfo({ type })
    }

    /** 
     * @template V
     * @param {V} value
     */
    static createValue(value) {
        return new AttributeInfo({ default: value })
    }

    /**
     * @param {IEntity | Object} source
     * @param {String} attribute
     * @param {AttributeKey} key
     */
    static hasAttribute(source, attribute, key, type = /** @type {EntityConstructor} */(source.constructor)) {
        const entity = /** @type {IEntity} */(source)
        const result = entity.attributes[attribute]?.[key]
        return /** @type {result} */(
            result
            ?? type?.attributes?.[attribute]?.[key]
            ?? AttributeInfo.#default[key]
        )
    }

    /**
     * @template {IEntity | Object} S
     * @template {EntityConstructor} C
     * @template {keyof C["attributes"]} A
     * @template {keyof C["attributes"][attribute]} K
     * @param {S} source
     * @param {A} attribute
     * @param {K} key
     * @param {C} type
     * @returns {C["attributes"][attribute][key]}
     */
    static getAttribute(source, attribute, key, type = /** @type {C} */(source.constructor)) {
        let result = source["attributes"]?.[attribute]?.[key]
        // Remember null is a valid asignment value for some attributes
        if (result !== undefined) {
            return result
        }
        result = /** @type {C["attributes"]} */(type?.attributes)?.[attribute]?.[key]
        if (result !== undefined) {
            return result
        }
        result = /** @type {C["attributes"][attribute]} */(AttributeInfo.#default)[key]
        if (result !== undefined) {
            return result
        }
    }

    /** @param {AttributeKey} key */
    get(key) {
        return this[key] ?? AttributeInfo.#default[key]
    }
}
