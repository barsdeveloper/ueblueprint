import Configuration from "../../Configuration.js"
import ObjectEntity from "../ObjectEntity.js"
import ObjectReferenceEntity from "../ObjectReferenceEntity.js"
import PinEntity from "../PinEntity.js"

export default class KnotEntity extends ObjectEntity {

    /**
     * @param {Object} values
     * @param {PinEntity} pinReferenceForType
     */
    constructor(values = {}, pinReferenceForType = undefined) {
        values.Class = new ObjectReferenceEntity(Configuration.paths.knot)
        values.Name = new (ObjectEntity.attributes.Name)("K2Node_Knot")
        const inputPinEntity = new PinEntity(
            { PinName: new (PinEntity.attributes.PinName)("InputPin") },
        )
        const outputPinEntity = new PinEntity(
            {
                PinName: new (PinEntity.attributes.PinName)("OutputPin"),
                Direction: new (PinEntity.attributes.Direction)("EGPD_Output"),
            },
        )
        if (pinReferenceForType) {
            inputPinEntity.copyTypeFrom(pinReferenceForType)
            outputPinEntity.copyTypeFrom(pinReferenceForType)
        }
        values["CustomProperties"] = new (ObjectEntity.attributes.CustomProperties)([inputPinEntity, outputPinEntity])
        super(values)
    }
}
