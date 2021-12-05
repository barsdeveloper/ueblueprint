import Entity from "./Entity"

export default class IntegerEntity extends Entity {

    static attributes = {
        value: Number
    }

    getAttributes() {
        return IntegerEntity.attributes
    }

    constructor(options = { value: 0 }) {
        options.value = Math.round(options.value)
        super(options)
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
