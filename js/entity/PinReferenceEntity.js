import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import Parsimmon from "parsimmon"
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

    static getGrammar() {
        return Parsimmon.seq(
            PathSymbolEntity.getGrammar(),
            Parsimmon.whitespace,
            GuidEntity.getGrammar()
        ).map(
            ([objectName, _1, pinGuid]) => new PinReferenceEntity({
                objectName: objectName,
                pinGuid: pinGuid,
            })
        )
    }

    constructor(values) {
        super(values)
        /** @type {PathSymbolEntity} */ this.objectName
        /** @type {GuidEntity} */ this.pinGuid
    }
}
