import Entity from "./Entity"

export default class LocalizedTextEntity extends Entity {

    static lookbehind = "NSLOCTEXT"
    static attributes = {
        namespace: String,
        key: String,
        value: String
    }

    getAttributes() {
        return LocalizedTextEntity.attributes
    }
}
