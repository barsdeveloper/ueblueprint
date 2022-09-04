import IEntity from "./IEntity"

export default class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String,
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
