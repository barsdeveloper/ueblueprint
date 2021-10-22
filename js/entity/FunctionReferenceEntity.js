import Entity from "./Entity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"

export default class FunctionReferenceEntity extends Entity {
    static attributes = {
        MemberParent: ObjectReferenceEntity,
        MemberName: ""
    }

    getAttributes() {
        return FunctionReferenceEntity.attributes
    }
}