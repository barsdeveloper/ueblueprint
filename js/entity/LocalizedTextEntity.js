import IEntity from "./IEntity"
import Utility from "../Utility"

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
        return Utility.capitalFirstLetter(this.value)
    }
}
