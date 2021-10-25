import Primitive from "./Primitive"

export default class Integer extends Primitive {

    constructor(value) {
        super()
        // Using constructor equality and not instanceof in order to consider both primitives and objects
        if (value?.constructor === String) {
            value = Number(value)
        }
        if (value?.constructor === Number) {
            value = Math.round(value)
        }
        /** @type {number} */
        this.value = value
    }

    valueOf() {
        this.value
    }

    toString() {
        return this.value.toString()
    }
}