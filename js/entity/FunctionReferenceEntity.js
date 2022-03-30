// @ts-check

import IEntity from "./IEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"

export default class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: ObjectReferenceEntity,
        MemberName: "",
    }

    constructor(options = {}) {
        super(options)
        /** @type {ObjectReferenceEntity} */ this.MemberParent
        /** @type {String} */ this.MemberName
    }
}
