import IEntity from "./IEntity"

export default class PathSymbolEntity extends IEntity {

    //value

    static attributes = {
        value: String
    }

    toString() {
        return this.value
    }
}
