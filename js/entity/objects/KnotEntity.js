import ObjectEntity from "../ObjectEntity"
import ObjectReferenceEntity from "../ObjectReferenceEntity"
import PinEntity from "../PinEntity"

export default class KnotEntity extends ObjectEntity {

    constructor(options = {}, pinType = undefined) {
        super(options)
        this.Class = new ObjectReferenceEntity("/Script/BlueprintGraph.K2Node_Knot")
        this.Name = "K2Node_Knot"
        this.CustomProperties = [
            new PinEntity({
                PinName: "InputPin",
            }),
            new PinEntity({
                PinName: "OutputPin",
                Direction: "EGPD_Output",
            })
        ]
    }
}
