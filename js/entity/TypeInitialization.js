// @ts-check

/**
 * @template T
 */
export default class TypeInitialization {

    /** @type {T} */
    #value
    get value() {
        return this.#value
    }
    set value(v) {
        this.#value = v
    }

    #showDefault = true
    get showDefault() {
        return this.#showDefault
    }
    set showDefault(v) {
        this.#showDefault = v
    }

    /** @type {Constructor|Array<Constructor>} */
    #type
    get type() {
        return this.#type
    }
    set type(v) {
        this.#type = v
    }

    static sanitize(value, targetType) {
        if (targetType === undefined) {
            targetType = value?.constructor
        }
        let wrongType = false
        if (targetType && value?.constructor !== targetType && !(value instanceof targetType)) {
            wrongType = true
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String) {
            value = value.valueOf() // Get the relative primitive value
        }
        if (wrongType) {
            return new targetType(value)
        }
        return value
    }

    /**
     * @typedef {new () => T} Constructor
     * @param {Constructor|Array<Constructor>} type
     * @param {Boolean} showDefault
     * @param {any} value
     */
    constructor(type, showDefault = true, value = undefined) {
        if (value === undefined) {
            if (type instanceof Array) {
                value = []
            } else {
                value = TypeInitialization.sanitize(new type())
            }
        }
        this.#value = value
        this.#showDefault = showDefault
        this.#type = type
    }
}
