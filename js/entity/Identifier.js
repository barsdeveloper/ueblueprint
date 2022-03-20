import IEntity from "./IEntity"


export default class Identifier extends IEntity {

    static attributes = {
        value: String,
    }

    constructor(options = {}) {
        // Not instanceof to pick also primitive string
        if (options.constructor === String) {
            options = {
                value: options
            }
        }
        super(options)
        /** @type {String} */
        this.value
        if (!this.value.match(/\w+/)) {
            throw new Error("The value must be an identifier (/\w+/).")
        }
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
