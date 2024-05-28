import P from "parsernostrum"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import PathSymbolEntity from "./PathSymbolEntity.js"

export default class PinReferenceEntity extends IEntity {

    static grammar = P.seq(
        PathSymbolEntity.grammar,
        P.whitespace,
        GuidEntity.grammar
    ).map(([objectName, _1, pinGuid]) => new this(objectName, pinGuid))

    /**
     * @param {PathSymbolEntity} objectName
     * @param {GuidEntity} pinGuid
     */
    constructor(objectName = null, pinGuid = null) {
        super()
        this.objectName = objectName
        this.pinGuid = pinGuid
    }
}
