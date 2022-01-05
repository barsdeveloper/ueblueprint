import Entity from "./Entity"

export default class PathSymbolEntity extends Entity {

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
