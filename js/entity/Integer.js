import Entity from "./Entity"

export default class Integer extends Entity {

    static attributes = {
        value: 0
    }

    constructor(value) {
        if (value?.constructor === String) {
            value = Number(value)
        }
        if (value?.constructor === Number) {
            value = {
                value: Math.round(value.valueOf())
            }
        }
        super(value)
    }

    getAttributes() {
        return Integer.attributes
    }
}