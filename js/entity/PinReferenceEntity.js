import Entity from "./Entity"
import Guid from "./primitive/Guid"

export default class PinReferenceEntity extends Entity {

    static attributes = {
        objectName: String,
        pinGuid: Guid
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}
