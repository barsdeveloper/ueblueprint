import IEntity from "./IEntity"
import GuidEntity from "./GuidEntity"
import TypeInitialization from "./TypeInitialization"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberScope: new TypeInitialization(String, false),
        MemberName: String,
        MemberGuid: GuidEntity,
        bSelfContext: new TypeInitialization(Boolean, false, false)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.GuidEntity
        /** @type {Boolean} */ this.bSelfContext
    }
}
