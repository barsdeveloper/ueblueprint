// @ts-check

import IEntity from "./IEntity"

export default class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String,
    }

    constructor(options = {}) {
        super(options)
        /** @type {String} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
