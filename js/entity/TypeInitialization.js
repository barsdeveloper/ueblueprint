import Integer from "./primitive/Integer"

export default class TypeInitialization {

    static sanitize(value) {
        if (!(value instanceof Object)) {
            return value // Is already primitive
        }
        if (value instanceof Boolean || value instanceof Integer || value instanceof Number) {
            return value.valueOf()
        }
        if (value instanceof String) {
            return value.toString()
        }
        return value
    }

    /**
     * 
     * @param {typeof Object} type 
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
