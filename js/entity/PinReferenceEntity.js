import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import PathSymbolEntity from "./PathSymbolEntity.js"

export default class PinReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
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
