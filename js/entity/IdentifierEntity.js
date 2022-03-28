// @ts-check

import IEntity from "./IEntity"

export default class IdentifierEntity extends IEntity {

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
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
