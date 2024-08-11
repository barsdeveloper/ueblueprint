import Configuration from "../../js/Configuration.js"
import Utility from "../../js/Utility.js"
import { expect } from "../fixtures/test.js"
import NodeTests from "./NodeTests.js"

export default class IssuesNodes1 extends NodeTests {
    static {
        this.set([
            {
                name: "Issue 18",
                title: "Mask ( R )",
                value: String.raw`
                    Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_37" ExportPath="/Script/UnrealEd.MaterialGraphNode'/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_37'"
                        Begin Object Class=/Script/Engine.MaterialExpressionComponentMask Name="MaterialExpressionComponentMask_0" ExportPath="/Script/Engine.MaterialExpressionComponentMask'/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_37.MaterialExpressionComponentMask_0'"
                        End Object
                        Begin Object Name="MaterialExpressionComponentMask_0" ExportPath="/Script/Engine.MaterialExpressionComponentMask'/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_37.MaterialExpressionComponentMask_0'"
                            R=True
                            MaterialExpressionEditorX=-544
                            MaterialExpressionEditorY=32
                            MaterialExpressionGuid=8EFA535CAE3A4DAF9DAE27B200E06EDC
                            Material="/Script/UnrealEd.PreviewMaterial'/Engine/Transient.NewMaterial'"
                        End Object
                        MaterialExpression="/Script/Engine.MaterialExpressionComponentMask'MaterialExpressionComponentMask_0'"
                        NodePosX=-544
                        NodePosY=32
                        AdvancedPinDisplay=Shown
                        NodeGuid=54A40610EEC646A0954F310727D1B888
                        CustomProperties Pin (PinId=DC3859AB4C8C12645EEA1AA4E500A637,PinName="Input",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=D5C8F4DF4AFE5EEB605ED382CD5744DE,PinName="R",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=7E43455B4D2232C4E99BB098631CAFCE,PinName="G",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=46CEC6754365CB39F9FC39944B40D5C6,PinName="B",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=F658E76C400B0AF242DFE292C92702C8,PinName="A",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=2EC8C8234D570AB2A03DB59A1FF65987,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                    End Object
                `,
                size: [7, 14.5],
                color: Configuration.nodeColors.green,
                icon: null,
                pins: 6,
                pinNames: Configuration.rgba,
                delegate: false,
                development: false,
                additionalTest: async (node, pins, blueprintPage) => {
                    const relevantPins = (await Promise.all(
                        pins.map(async p => {
                            const innerText = await p.innerText()
                            return [Configuration.rgba.includes(innerText), p]
                        })
                    ))
                        .filter(([flag, value]) => flag)
                        .map(([flag, value]) => /** @type {Locator<PinElement>} */(value))
                    expect(await Promise.all(relevantPins.map(async pin => await pin.innerText()))).toStrictEqual(Configuration.rgba)
                    for (const p of relevantPins) {
                        const pinName = await p.innerText()
                        expect(p.locator('input[type="checkbox"]')).toBeChecked({ checked: pinName === "R" })
                    }
                    await relevantPins[0].locator('input[type="checkbox"]').uncheck() // Uncheck "R"
                    await relevantPins[2].locator('input[type="checkbox"]').check() // Check "B"
                    await relevantPins[3].locator('input[type="checkbox"]').check() // Check "A"
                    await relevantPins[2].locator('input[type="checkbox"]').uncheck() // Uncheck "B"
                    await relevantPins[2].locator('input[type="checkbox"]').check() // Check "B"
                    expect(node.locator(".ueb-node-name")).toHaveText("Mask ( B A )")
                    const resultSerialization = await blueprintPage.blueprintLocator.evaluate(blueprint => {
                        blueprint.selectAll()
                        return blueprint.template.getCopyInputObject().getSerializedText()
                    })
                    const expectedSerialization = String.raw`
                        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_37" ExportPath="/Script/UnrealEd.MaterialGraphNode'/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_37'"
                            Begin Object Class=/Script/Engine.MaterialExpressionComponentMask Name="MaterialExpressionComponentMask_0" ExportPath="/Script/Engine.MaterialExpressionComponentMask'/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_37.MaterialExpressionComponentMask_0'"
                            End Object
                            Begin Object Name="MaterialExpressionComponentMask_0" ExportPath="/Script/Engine.MaterialExpressionComponentMask'/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_37.MaterialExpressionComponentMask_0'"
                                B=True
                                A=True
                                MaterialExpressionEditorX=-544
                                MaterialExpressionEditorY=32
                                MaterialExpressionGuid=8EFA535CAE3A4DAF9DAE27B200E06EDC
                                Material="/Script/UnrealEd.PreviewMaterial'/Engine/Transient.NewMaterial'"
                            End Object
                            MaterialExpression="/Script/Engine.MaterialExpressionComponentMask'MaterialExpressionComponentMask_0'"
                            NodePosX=-544
                            NodePosY=32
                            AdvancedPinDisplay=Shown
                            NodeGuid=54A40610EEC646A0954F310727D1B888
                            CustomProperties Pin (PinId=DC3859AB4C8C12645EEA1AA4E500A637,PinName="Input",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                            CustomProperties Pin (PinId=D5C8F4DF4AFE5EEB605ED382CD5744DE,PinName="R",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                            CustomProperties Pin (PinId=7E43455B4D2232C4E99BB098631CAFCE,PinName="G",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                            CustomProperties Pin (PinId=46CEC6754365CB39F9FC39944B40D5C6,PinName="B",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                            CustomProperties Pin (PinId=F658E76C400B0AF242DFE292C92702C8,PinName="A",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                            CustomProperties Pin (PinId=2EC8C8234D570AB2A03DB59A1FF65987,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        End Object
                    `
                    const words = expectedSerialization
                        .split("\n")
                        .map(row => row.match(/\s*("?\w+(\s+\w+)*).+/)?.[1])
                        .filter(v => v?.length > 0)
                    expect(resultSerialization).toMatch(Utility.getFirstWordOrder(words))
                }
            },
            {
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
                    await inputs[0].blur()
                    expect(await node.evaluate(n => n.nodeDisplayName)).toEqual("Subtract(-8,1)")
                    await inputs[1].fill("9.2")
                    await inputs[1].blur()
                    expect(await node.evaluate(n => n.nodeDisplayName)).toEqual("Subtract(-8,9.2)")
                }
            },
        ])
    }
}
