import Utility from "../Utility"

export default class TypeInitialization {
    constructor(value, showDefault = true, type = Utility.getType(value)) {
        if (type.prototype.constructor.name != value.constructor.name) {
            throw new Error("Default value expected to be of the same type.")
        }
        this.value = value
        this.showDefault = showDefault
        this.type = type
    }
}