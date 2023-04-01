import IEntity from "./IEntity.js"
import GuidEntity from "./GuidEntity.js"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberScope: {
            default: "",
            showDefault: false,
        },
        MemberName: {
            default: "",
        },
        MemberGuid: {
            type: GuidEntity,
        },
        bSelfContext: {
            default: false,
            showDefault: false,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.GuidEntity
        /** @type {Boolean} */ this.bSelfContext
    }
}
