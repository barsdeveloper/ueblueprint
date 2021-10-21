import Entity from "./Entity"

export default class ObjectReferenceEntity extends Entity {

    static attributes = {
        type: "None",
        path: ""
    }

    getAttributes() {
        return ObjectReferenceEntity.attributes
    }

    toString() {
        return this.type + (this.path ? `'"${this.path}"'` : "")
    }
}