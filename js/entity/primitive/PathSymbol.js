import Primitive from "./Primitive"

export default class PathSymbol extends Primitive {

    constructor(value) {
        super()
        this.value = new String(value).valueOf()
    }

    valueOf() {
        this.value
    }

    toString() {
        return this.value
    }
}