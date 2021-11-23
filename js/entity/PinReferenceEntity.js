import Entity from "./Entity"
import Guid from "./primitive/Guid"
import PathSymbol from "./PathSymbolEntity"

export default class PinReferenceEntity extends Entity {

    static attributes = {
        objectName: PathSymbol,
        pinGuid: Guid
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}
