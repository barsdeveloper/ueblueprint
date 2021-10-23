import GuidEntity from "./GuidEntity"
import Entity from "./Entity"

export default class VariableReferenceEntity extends Entity {

    static attributes = {
        MemberName: String,
        MemberGuid: GuidEntity,
        bSelfContext: true
    }

    getAttributes() {
        return VariableReferenceEntity.attributes
    }
}