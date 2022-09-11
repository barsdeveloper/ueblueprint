/**
 * @template T
 */
export default class TypeInitialization {

    /** @type {Constructor|Array<Constructor>} */
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

    /** @type {T} */
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
     * @typedef {(new () => T) | StringConstructor | NumberConstructor | BooleanConstructor} Constructor
     * @param {Constructor|Array<Constructor>} type
     * @param {Boolean} showDefault
     * @param {any} value
     * @param {Boolean} serialized
     */
    constructor(type, showDefault = true, value = undefined, serialized = false) {
        if (value === undefined) {
            if (type instanceof Array) {
                value = []
            } else if (serialized) {
                value = ""
            } else {
                value = TypeInitialization.sanitize(new type())
            }
        }
        this.#type = type
        this.#showDefault = showDefault
        this.#value = value
        this.#serialized = serialized
    }
}
