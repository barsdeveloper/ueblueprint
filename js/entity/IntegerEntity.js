import Entity from "./Entity"

export default class IntegerEntity extends Entity {

    static attributes = {
        value: Number
    }

    getAttributes() {
        return IntegerEntity.attributes
    }

    constructor(options = {}) {
        super(options)
        this.value = Math.round(value)
    }

    toString() {
        return this.value.toString()
    }
}
