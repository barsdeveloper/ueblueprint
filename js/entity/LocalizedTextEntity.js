import IEntity from "./IEntity"

export default class LocalizedTextEntity extends IEntity {

    static lookbehind = "NSLOCTEXT"
    static attributes = {
        namespace: String,
        key: String,
        value: String,
    }

    constructor(options = {}) {
        super(options)
        /** @type {String} */ this.namespace
        /** @type {String} */ this.key
        /** @type {String} */ this.value
    }

    toString() {
        if (this.value.length === 0) {
            return this.value
        }
        let result = this.value
        return result.charAt(0).toLocaleUpperCase() + result.slice(1).toLocaleLowerCase()
    }
}
