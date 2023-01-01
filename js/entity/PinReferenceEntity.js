import GuidEntity from "./GuidEntity"
import IEntity from "./IEntity"
import PathSymbolEntity from "./PathSymbolEntity"

export default class PinReferenceEntity extends IEntity {

    static attributes = {
        objectName: {
            type: PathSymbolEntity,
        },
        pinGuid: {
            type: GuidEntity,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {PathSymbolEntity} */ this.objectName
        /** @type {GuidEntity} */ this.pinGuid
    }
}
