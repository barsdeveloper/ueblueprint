import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import Parsernostrum from "parsernostrum"
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
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            PathSymbolEntity.createGrammar(),
            Parsernostrum.whitespace,
            GuidEntity.createGrammar()
        ).map(
            ([objectName, _1, pinGuid]) => new this({
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
