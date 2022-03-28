// @ts-check

export default class TypeInitialization {

    static sanitize(value) {
        if (!(value instanceof Object)) {
            return value // Is already primitive
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String) {
            return value.valueOf()
        }
        return value
    }

    /**
     * @param {Object} type
     * @param {boolean} showDefault
     * @param {*} value
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
