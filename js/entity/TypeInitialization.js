import Utility from "../Utility"

export default class TypeInitialization {

    /**
     * 
     * @param {typeof Object} type 
     * @param {boolean} showDefault 
     * @param {*} value
     */
    constructor(type, showDefault = true, value = undefined) {
        if (value === undefined) {
            value = Utility.sanitize(new type())
        }
        this.value = value
        this.showDefault = showDefault
        this.type = type
    }
}