import IEntity from "./IEntity"
import GuidEntity from "./GuidEntity"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberScope: {
            value: "",
            showDefault: false,
        },
        MemberName: "",
        MemberGuid: {
            type: GuidEntity,
        },
        bSelfContext: {
            value: false,
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
