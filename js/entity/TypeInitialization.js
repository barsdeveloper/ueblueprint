// @ts-check

/**
 * @template T
 */
export default class TypeInitialization {

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
     * @param {new () => T} type
     * @param {Boolean} showDefault
     * @param {any} value
     */
    constructor(type, showDefault = true, value = undefined) {
        if (value === undefined) {
            value = TypeInitialization.sanitize(new type())
        }
        this.value = value
        this.showDefault = showDefault
        this.type = type
    }
}
