import Entity from "./Entity"

export default class LocalizedTextEntity extends Entity {

    static attributes = {
        namespace: String,
        key: String,
        value: String
    }

    getAttributes() {
        return LocalizedTextEntity.attributes
    }
}
