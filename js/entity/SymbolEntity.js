import IEntity from "./IEntity"

export default class SymbolEntity extends IEntity {

    static attributes = {
        value: String
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.value
    }
}
