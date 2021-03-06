// @ts-check

import SerializedType from "./SerializedType"

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

    static sanitize(value, targetType) {
        if (targetType === undefined) {
            targetType = value?.constructor
        }
        let wrongType = false
        if (
            targetType
            && targetType !== SerializedType
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
     * @typedef {(new () => T) | SerializedType | StringConstructor | NumberConstructor | BooleanConstructor} Constructor
     * @param {Constructor|Array<Constructor>} type
     * @param {Boolean} showDefault
     * @param {any} value
     */
    constructor(type, showDefault = true, value = undefined) {
        if (value === undefined) {
            if (type instanceof Array) {
                value = []
            } else if (type instanceof SerializedType) {
                value = ""
            } else {
                value = TypeInitialization.sanitize(new type())
            }
        }
        this.#showDefault = showDefault
        this.#type = type
    }
}
