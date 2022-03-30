// @ts-check

import IEntity from "./IEntity"

export default class IntegerEntity extends IEntity {

    static attributes = {
        value: Number,
    }

    /**
     * @param {Object | Number | String} options
     */
    constructor(options = 0) {
        if (options.constructor == Number || options.constructor == String) {
            options = {
                value: options,
            }
        }
        super(options)
        this.value = Math.round(this.value)
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}
