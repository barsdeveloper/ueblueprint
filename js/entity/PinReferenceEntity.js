import GuidEntity from "./GuidEntity"
import IEntity from "./IEntity"
import PathSymbolEntity from "./PathSymbolEntity"

export default class PinReferenceEntity extends IEntity {

    static attributes = {
        objectName: PathSymbolEntity,
        pinGuid: GuidEntity,
    }

    constructor(values) {
        super(values)
        /** @type {PathSymbolEntity} */ this.objectName
        /** @type {GuidEntity} */ this.pinGuid
    }
}
