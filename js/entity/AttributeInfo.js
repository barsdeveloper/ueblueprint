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

    /** @typedef {keyof AttributeInfo<any>} AttributeKey */

    static #default = {
        nullable: false,
        ignored: false,
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
        this.nullable = source.nullable
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
     * @template V
     * @param {V} type
     * @returns {AttributeInfo<InstanceType<V>>}
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
        const result = entity.attributes[attribute][key]
        return /** @type {result} */(
            result
            ?? type?.attributes?.[attribute]?.[key]
            ?? AttributeInfo.#default[key]
        )
    }

    /**
     * @param {IEntity | Object} source
     * @param {String} attribute
     * @param {AttributeKey} key
     */
    static getAttribute(source, attribute, key, type = /** @type {EntityConstructor} */(source.constructor)) {
        const entity = /** @type {IEntity} */(source)
        let result = entity.attributes?.[attribute][key]
        if (result !== undefined) {
            return result
        }
        result = type?.attributes?.[attribute]?.[key]
        if (result !== undefined) {
            return result
        }
        result = AttributeInfo.#default[key]
        if (result !== undefined) {
            return result
        }
    }

    /** @param {AttributeKey} key */
    get(key) {
        return this[key] ?? AttributeInfo.#default[key]
    }
}
