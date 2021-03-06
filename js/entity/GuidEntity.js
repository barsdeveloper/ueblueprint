// @ts-check

import IEntity from "./IEntity"

export default class GuidEntity extends IEntity {

    static attributes = {
        value: String,
    }

    static generateGuid(random = true) {
        let values = new Uint32Array(4)
        if (random === true) {
            crypto.getRandomValues(values)
        }
        let guid = ""
        values.forEach(n => {
            guid += ("0".repeat(8) + n.toString(16).toUpperCase()).slice(-8)
        })
        return new GuidEntity({ value: guid })
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
