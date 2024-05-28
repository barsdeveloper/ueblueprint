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
        values.Name = "K2Node_Knot"
        const inputPinEntity = new PinEntity(
            { PinName: "InputPin" },
        )
        const outputPinEntity = new PinEntity(
            {
                PinName: "OutputPin",
                Direction: "EGPD_Output",
            },
        )
        if (pinReferenceForType) {
            inputPinEntity.copyTypeFrom(pinReferenceForType)
            outputPinEntity.copyTypeFrom(pinReferenceForType)
        }
        values["CustomProperties"] = [inputPinEntity, outputPinEntity]
        super(values)
    }
}
