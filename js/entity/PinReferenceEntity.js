import Entity from "./Entity"
import GuidEntity from "./GuidEntity"
import PathSymbol from "./PathSymbolEntity"

export default class PinReferenceEntity extends Entity {

    static attributes = {
        objectName: PathSymbol,
        pinGuid: GuidEntity
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}
