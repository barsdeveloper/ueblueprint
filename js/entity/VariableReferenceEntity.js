import Guid from "../Guid"
import Entity from "./Entity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"

export default class VariableReferenceEntity extends Entity {
    static attributes = {
        MemberName: "",
        MemberGuid: Guid,
        bSelfContext: true
    }

    getAttributes() {
        return VariableReferenceEntity.attributes
    }
}