import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: {
            type: ObjectReferenceEntity,
            showDefault: false
        },
        MemberName: {
            type: String,
            showDefault: false,
        },
        MemberGuid: {
            type: GuidEntity,
            showDefault: false,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {ObjectReferenceEntity} */ this.MemberParent
        /** @type {String} */ this.MemberName
    }
}
