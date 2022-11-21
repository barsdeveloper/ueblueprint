import IEntity from "./IEntity"

export default class IdentifierEntity extends IEntity {

    static attributes = {
        value: String,
    }

    static attributeConverter = {
        fromAttribute: (value, type) => new IdentifierEntity(value),
        toAttribute: (value, type) => value.toString()
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
