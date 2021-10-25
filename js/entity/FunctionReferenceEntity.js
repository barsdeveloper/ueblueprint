import Entity from "./Entity"
import ObjectReference from "./primitive/ObjectReference"

export default class FunctionReferenceEntity extends Entity {
    static attributes = {
        MemberParent: ObjectReference,
        MemberName: ""
    }

    getAttributes() {
        return FunctionReferenceEntity.attributes
    }
}