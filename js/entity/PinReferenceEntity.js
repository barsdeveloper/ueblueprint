import P from "parsernostrum"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import SymbolEntity from "./SymbolEntity.js"

export default class PinReferenceEntity extends IEntity {

    static grammar = /** @type {P<PinReferenceEntity>} */(
        P.seq(
            SymbolEntity.grammar,
            P.whitespace,
            GuidEntity.grammar
        )
            .map(([objectName, _1, pinGuid]) => new this(objectName, pinGuid))
            .label("PinReferenceEntity")
    )

    /**
     * @param {SymbolEntity} objectName
     * @param {GuidEntity} pinGuid
     */
    constructor(objectName = null, pinGuid = null) {
        super()
        this.objectName = objectName
        this.pinGuid = pinGuid
    }

    serialize() {
        return this.objectName.serialize() + " " + this.pinGuid.serialize()
    }
}
