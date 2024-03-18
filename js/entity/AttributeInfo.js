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

    /** @typedef {"type" | "default" | "nullable" | "ignored" | "serialized" | "expected" | "inlined" | "quoted" | "silent" | "predicate"} AttributeKey */

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
        this.type = source.type
        this.default = source.default
        this.nullable = source.nullable
        this.ignored = source.ignored
        this.serialized = source.serialized
        this.expected = source.expected
        this.inlined = source.inlined
        this.quoted = source.quoted
        this.silent = source.silent
        this.predicate = source.predicate
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
     * @param {IEntity} source
     * @param {String} attribute
     * @param {AttributeKey} key
     */
    static getAttribute(source, attribute, key) {
        return source.attributes?.[attribute][key]
            ?? /** @type {EntityConstructor} */(source.constructor)?.attributes?.[attribute]?.[key]
            ?? this[key]
    }

    /** @param {AttributeKey} key */
    get(key) {
        return this[key] ?? AttributeInfo.#default[key]
    }
}
