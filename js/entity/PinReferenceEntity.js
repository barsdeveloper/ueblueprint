import GuidEntity from "./GuidEntity"
import IEntity from "./IEntity"
import PathSymbol from "./PathSymbolEntity"

export default class PinReferenceEntity extends IEntity {

    static attributes = {
        objectName: PathSymbol,
        pinGuid: GuidEntity
    }
}
