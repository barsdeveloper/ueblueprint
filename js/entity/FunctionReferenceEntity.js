import IEntity from "./IEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: {
            type: ObjectReferenceEntity,
            showDefault: false
        },
        MemberName: "",
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
