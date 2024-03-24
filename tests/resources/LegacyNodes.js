import Configuration from "../../js/Configuration.js"
import SVGIcon from "../../js/SVGIcon.js"
import { expect } from "../fixtures/test.js"
import NodeTests from "./NodeTests.js"

export default class LegacyNodes extends NodeTests {
    static {
        this.set([
            {
                name: "Flip Flop legacy",
                title: "Flip Flop",
                value: String.raw`
                    Begin Object Class=K2Node_MacroInstance Name="K2Node_MacroInstance_1262"
                        NodePosX=3984
                        NodePosY=-960
                        NodeGuid=968059974A02AF6B67D2879EC909179A
                        Begin Object Class=EdGraphPin Name="EdGraphPin_59688"
                        End Object
                        Begin Object Class=EdGraphPin Name="EdGraphPin_59689"
                        End Object
                        Begin Object Class=EdGraphPin Name="EdGraphPin_59690"
                        End Object
                        Begin Object Class=EdGraphPin Name="EdGraphPin_59691"
                        End Object
                        MacroGraphReference=(MacroGraph=EdGraph'/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:FlipFlop',GraphBlueprint=Blueprint'/Engine/EditorBlueprintResources/StandardMacros.StandardMacros',GraphGuid=BFFFAAE4434E166F549665AD1AA89B60)
                        Pins(0)=EdGraphPin'EdGraphPin_59688'
                        Pins(1)=EdGraphPin'EdGraphPin_59689'
                        Pins(2)=EdGraphPin'EdGraphPin_59690'
                        Pins(3)=EdGraphPin'EdGraphPin_59691'
                        Begin Object Name="EdGraphPin_59688"
                            PinType=(PinCategory="exec")
                            LinkedTo(0)=EdGraphPin'K2Node_InputKey_1185.EdGraphPin_42090'
                            LinkedTo(1)=EdGraphPin'K2Node_InputKey_14487.EdGraphPin_45417'
                        End Object
                        Begin Object Name="EdGraphPin_59689"
                            PinName="A"
                            Direction=EGPD_Output
                            PinType=(PinCategory="exec")
                            LinkedTo(0)=EdGraphPin'K2Node_CallFunction_7370.EdGraphPin_43320'
                        End Object
                        Begin Object Name="EdGraphPin_59690"
                            PinName="B"
                            Direction=EGPD_Output
                            PinType=(PinCategory="exec")
                            LinkedTo(0)=EdGraphPin'K2Node_CallFunction_44249.EdGraphPin_43272'
                        End Object
                        Begin Object Name="EdGraphPin_59691"
                            PinName="IsA"
                            Direction=EGPD_Output
                            PinType=(PinCategory="bool")
                        End Object
                    End Object
                `,
                size: [7.5, 8],
                color: Configuration.nodeColors.gray,
                icon: SVGIcon.flipflop,
                pins: 4,
                pinNames: ["A", "B", "Is A"],
                delegate: false,
                development: false,
                additionalTest: async node => {
                    expect(await node.evaluate(node => node.entity.Class.type))
                        .toBe("/Script/BlueprintGraph.K2Node_MacroInstance")
                    expect(await node.evaluate(node => node.entity.MacroGraphReference.MacroGraph.type))
                        .toBe("/Script/Engine.EdGraph")
                    expect(await node.evaluate(node => node.entity.MacroGraphReference.MacroGraph.path))
                        .toBe("/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:FlipFlop")
                    expect(await node.evaluate(node => node.entity.MacroGraphReference.GraphBlueprint.type))
                        .toBe("/Script/Engine.Blueprint")
                    expect(await node.evaluate(node => node.entity.MacroGraphReference.GraphBlueprint.path))
                        .toBe("/Engine/EditorBlueprintResources/StandardMacros.StandardMacros")
                    expect(await node.evaluate(
                        (node, subObjectAttributeNamePrefix) => Object.keys(node.entity)
                            .filter(k => k.startsWith(subObjectAttributeNamePrefix))
                            .map(k => /** @type {ObjectEntity} */(node.entity[k]))
                            .filter(v => v.Class)
                            .map(objectEntity => objectEntity.getType())
                        ,
                        Configuration.subObjectAttributeNamePrefix
                    ))
                        .toStrictEqual(Array(4).fill(Configuration.paths.edGraphPinDeprecated))
                    expect(await node.evaluate(node => node.getPinEntities().length)).toBe(4)
                }
            },
        ])
    }
}
