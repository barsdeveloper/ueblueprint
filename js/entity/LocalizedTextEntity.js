import IEntity from "./IEntity"

export default class LocalizedTextEntity extends IEntity {

    static lookbehind = "NSLOCTEXT"
    static attributes = {
        namespace: String,
        key: String,
        value: String
    }

    /** @type {String} */ namespace
    /** @type {String} */ key
    /** @type {String} */ value
}
