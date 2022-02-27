import IEntity from "./IEntity"
import GuidEntity from "./GuidEntity"
import PathSymbol from "./PathSymbolEntity"

export default class PinReferenceEntity extends IEntity {

    static attributes = {
        objectName: PathSymbol,
        pinGuid: GuidEntity
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}
