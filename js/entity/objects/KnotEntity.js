import ObjectEntity from "../ObjectEntity"
import ObjectReferenceEntity from "../ObjectReferenceEntity"
import PinEntity from "../PinEntity"

export default class KnotEntity extends ObjectEntity {

    /**
     * @param {Object} options
     * @param {PinEntity} pinReferenceForType
     */
    constructor(options = {}, pinReferenceForType = undefined) {
        super(options, true)
        this.Class = new ObjectReferenceEntity("/Script/BlueprintGraph.K2Node_Knot")
        this.Name = "K2Node_Knot"
        const inputPinEntity = new PinEntity(
            {
                PinName: "InputPin",
            },
            true
        )
        const outputPinEntity = new PinEntity(
            {
                PinName: "OutputPin",
                Direction: "EGPD_Output",
            },
            true
        )
        if (pinReferenceForType) {
            inputPinEntity.copyTypeFrom(pinReferenceForType)
            outputPinEntity.copyTypeFrom(pinReferenceForType)
        }
        this.CustomProperties = [inputPinEntity, outputPinEntity]
    }
}
