
/**
 * @typedef {import("./IEntity").default} IEntity
 * @typedef {IEntity | String | Number | Boolean | Array} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("./IEntity").IEntityConstructor<T>} IEntityConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {IEntityConstructor<T> | StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor} AnyValueConstructor
 */

/** @template {AnyValue} T */
export default class TypeInitialization {

    /** @type {AnyValueConstructor<T>|AnyValueConstructor<T>[]} */
    #type
    get type() {
        return this.#type
    }
    set type(v) {
        this.#type = v
    }

    #showDefault = true
    get showDefault() {
        return this.#showDefault
    }
    set showDefault(v) {
        this.#showDefault = v
    }

    /** @type {T | T[] | String | (() => T) | (() => T[])} */
    #value
    get value() {
        return this.#value
    }
    set value(v) {
        this.#value = v
    }

    /** @type {Boolean} */
    #serialized
    get serialized() {
        return this.#serialized
    }
    set serialized(v) {
        this.#serialized = v
    }

    #ignored
    get ignored() {
        return this.#ignored
    }
    set ignored(v) {
        this.#ignored = v
    }

    static sanitize(value, targetType) {
        if (targetType === undefined) {
            targetType = value?.constructor
        }
        if (
            targetType
            // value is not of type targetType
            && !(value?.constructor === targetType || value instanceof targetType)
        ) {
            value = new targetType(value)
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String) {
            value = value.valueOf() // Get the relative primitive value
        }
        return value
    }

    /**
     * @param {AnyValueConstructor<T>|AnyValueConstructor<T>[]} type
     * @param {Boolean} showDefault
     * @param {T | T[] | String | (() => T) | (() => T[])} value
     * @param {Boolean} serialized
     */
    constructor(type, showDefault = true, value = undefined, serialized = false, ignored = false) {
        if (value === undefined) {
            if (type instanceof Array) {
                value = []
            } else if (serialized) {
                value = ""
            } else {
                value = () => TypeInitialization.sanitize(new type())
            }
        }
        this.#type = type
        this.#showDefault = showDefault
        this.#value = value
        this.#serialized = serialized
        this.#ignored = ignored
    }
}
