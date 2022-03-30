// @ts-check

import IEntity from "./IEntity"
import GuidEntity from "./GuidEntity"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberName: String,
        MemberGuid: GuidEntity,
        bSelfContext: false,
    }

    constructor(options = {}) {
        super(options)
        /** @type {String} */ this.MemberName
        /** @type {GuidEntity} */ this.MemberGuid
        /** @type {Boolean} */ this.bSelfContext
    }
}
