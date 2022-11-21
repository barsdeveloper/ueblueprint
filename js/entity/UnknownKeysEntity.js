import IEntity from "./IEntity"
import TypeInitialization from "./TypeInitialization"

export default class UnknownKeysEntity extends IEntity {

    static attributes = {
        lookbehind: new TypeInitialization(String, false, "", false, true)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.lookbehind
    }
}
