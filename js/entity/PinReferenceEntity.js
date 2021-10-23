import Entity from "./Entity"
import GuidEntity from "./GuidEntity"

export default class PinReferenceEntity extends Entity {

    static attributes = {
        objectName: String,
        pinGuid: GuidEntity
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}