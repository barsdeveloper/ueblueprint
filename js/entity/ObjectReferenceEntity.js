import Entity from "./Entity"

export default class ObjectReferenceEntity extends Entity {

    static attributes = {
        type: "",
        path: ""
    }

    getAttributes() {
        return ObjectReferenceEntity.attributes
    }

    toString() {
        return (this.type ?? "") + (
            this.path
                ? this.type ? `'"${this.path}"'` : this.path
                : ""
        )
    }
}