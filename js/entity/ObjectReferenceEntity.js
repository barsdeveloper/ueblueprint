import Entity from "./Entity"

export default class ObjectReferenceEntity extends Entity {

    static attributes = {
        type: String,
        path: String
    }

    getAttributes() {
        return ObjectReferenceEntity.attributes
    }
}
