import Utility from "../Utility"

export default class TypeInitialization {
    constructor(value, showDefault = true, type = Utility.getType(value)) {
        this.value = value
        this.showDefault = showDefault
        this.type = type
    }
}