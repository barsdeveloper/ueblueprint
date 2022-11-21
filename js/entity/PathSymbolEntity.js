import IEntity from "./IEntity"

export default class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String,
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
