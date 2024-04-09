import Parsernostrum from "parsernostrum"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import PathSymbolEntity from "./PathSymbolEntity.js"
import AttributeInfo from "./AttributeInfo.js"

export default class PinReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        objectName: AttributeInfo.createType(PathSymbolEntity),
        pinGuid: AttributeInfo.createType(GuidEntity),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            PathSymbolEntity.grammar,
            Parsernostrum.whitespace,
            GuidEntity.grammar
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
