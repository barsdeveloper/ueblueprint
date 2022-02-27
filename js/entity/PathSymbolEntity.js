import IEntity from "./IEntity"

export default class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String
    }

    getAttributes() {
        return PathSymbolEntity.attributes
    }

    toString() {
        return this.value
    }
}
