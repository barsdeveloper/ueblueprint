import IEntity from "./IEntity.js"

export default class SymbolEntity extends IEntity {

    static attributes = {
        value: {
            default: "",
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    /** @param {String | Object} values */
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
