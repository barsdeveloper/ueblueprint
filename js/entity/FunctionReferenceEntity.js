import IEntity from "./IEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import TypeInitialization from "./TypeInitialization"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: new TypeInitialization(ObjectReferenceEntity, false),
        MemberName: "",
    }

    constructor(values) {
        super(values)
        /** @type {ObjectReferenceEntity} */ this.MemberParent
        /** @type {String} */ this.MemberName
    }
}
