import Entity from "./Entity"
import Guid from "./primitive/Guid"

export default class VariableReferenceEntity extends Entity {

    static attributes = {
        MemberName: String,
        MemberGuid: Guid,
        bSelfContext: false
    }

    getAttributes() {
        return VariableReferenceEntity.attributes
    }
}
