import Configuration from "../js/Configuration.js"
import Utility from "../js/Utility.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
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
        const relevantPins = []
        for (const pin of pins) {
            const innerText = await pin.innerText()
            if (Configuration.rgba.includes(innerText)) {
                relevantPins.push(pin)
            }
        }
        for (const pin of relevantPins) {
            const pinName = await pin.innerText()
            // Only pin R is checked
            await expect(pin.locator('input[type="checkbox"]')).toBeChecked({ checked: pinName === "R" })
        }
        await relevantPins[0].locator('input[type="checkbox"]').uncheck() // Uncheck "R"
        await relevantPins[2].locator('input[type="checkbox"]').check() // Check "B"
        await relevantPins[3].locator('input[type="checkbox"]').check() // Check "A"
        await relevantPins[2].locator('input[type="checkbox"]').uncheck() // Uncheck "B"
        await relevantPins[2].locator('input[type="checkbox"]').check() // Check "B"
        await expect(node.locator(".ueb-node-name")).toHaveText("Mask ( B A )")
        const resultSerialization = await blueprintPage.blueprintLocator.evaluate(blueprint => {
            blueprint.selectAll()
            return blueprint.getSerializedText()
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
})
