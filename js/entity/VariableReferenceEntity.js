// @ts-check

import IEntity from "./IEntity"
import GuidEntity from "./GuidEntity"

export default class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberName: String,
        MemberGuid: GuidEntity,
        bSelfContext: false,
    }
}
