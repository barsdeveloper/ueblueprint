import IEntity from "./IEntity"

export default class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String,
    }

    toString() {
        return this.value
    }
}
