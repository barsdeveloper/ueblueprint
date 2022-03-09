import IEntity from "./IEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: ObjectReferenceEntity,
        MemberName: ""
    }

    /** @type {ObjectReferenceEntity} */ MemberParent
    /** @type {String} */ MemberName
}
