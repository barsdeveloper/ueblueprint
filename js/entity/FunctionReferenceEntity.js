import Entity from "./Entity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"

export default class FunctionReferenceEntity extends Entity {
    static attributes = {
        MemberParent: new ObjectReferenceEntity({
            type: "Class",
            path: "/Script/Engine.GameplayStatics"
        }),
        MemberName: ""
    }

    getAttributes() {
        return FunctionReferenceEntity.attributes
    }
}