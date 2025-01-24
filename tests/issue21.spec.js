import Configuration from "../js/Configuration.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Issue 21",
    title: "Subtract(1,1)",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_202" ExportPath=/Script/UnrealEd.MaterialGraphNode'/Engine/Transient.卡通:MaterialGraph_0.MaterialGraphNode_202'
            Begin Object Class=/Script/Engine.MaterialExpressionSubtract Name="MaterialExpressionSubtract_10" ExportPath=/Script/Engine.MaterialExpressionSubtract'/Engine/Transient.卡通:MaterialGraph_0.MaterialGraphNode_202.MaterialExpressionSubtract_10'
            End Object
            Begin Object Name="MaterialExpressionSubtract_10" ExportPath=/Script/Engine.MaterialExpressionSubtract'/Engine/Transient.卡通:MaterialGraph_0.MaterialGraphNode_202.MaterialExpressionSubtract_10'
                A=(Expression="/Script/Engine.MaterialExpressionSaturate'MaterialGraphNode_237.MaterialExpressionSaturate_3'")
                B=(Expression="/Script/Engine.MaterialExpressionSaturate'MaterialGraphNode_201.MaterialExpressionSaturate_7'")
                MaterialExpressionEditorX=0
                MaterialExpressionEditorY=0
                MaterialExpressionGuid=7202C13642DA1225C118CF867599387C
                Material="/Script/UnrealEd.PreviewMaterial'/Engine/Transient.卡通'"
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionSubtract'MaterialExpressionSubtract_10'
            NodePosX=0
            NodePosY=0
            NodeGuid=7008F5AC49E8F5BFD4C707819A58C021
            CustomProperties Pin (PinId=86D4DE5E48C71A576ED0519B982907B3,PinName="A",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1",LinkedTo=(),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=5C75E1374E1E7436C72B9FA072875C04,PinName="B",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1",LinkedTo=(),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=528D346A49976B0854764CA755AF2F93,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [8, 6],
    color: Configuration.nodeColors.green,
    icon: null,
    pins: 3,
    pinNames: ["A", "B"],
    delegate: false,
    development: false,
    additionalTest: async (node, pins, blueprintPage) => {
        await expect(pins[0].locator("ueb-input")).toHaveText("1.0")
        await expect(pins[1].locator("ueb-input")).toHaveText("1.0")
        let inputs = await node.locator("ueb-input").all()
        await inputs[0].fill("-8")
        await blueprintPage.blur()
        expect(await node.evaluate(n => n.nodeDisplayName)).toEqual("Subtract(-8,1)")
        await inputs[1].fill("9.2")
        await blueprintPage.blur()
        expect(await node.evaluate(n => n.nodeDisplayName)).toEqual("Subtract(-8,9.2)")
    }
})
