import { css } from "lit"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Niagara ArcCosine",
    title: "ArcCosine",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeOp Name="NiagaraNodeOp_0" ExportPath="/Script/NiagaraEditor.NiagaraNodeOp'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeOp_0'"
            OpName="Numeric::ArcCosine"
            ChangeId=9FDAB11E05194F05975DBA0752A4E397
            NodePosX=-512
            NodePosY=208
            NodeGuid=94DC004A5F26482498EF5089FC398E6A
            CustomProperties Pin (PinId=D5013974C3A3451689FF7914177841D1,PinName="A",PinFriendlyName=NSLOCTEXT("NiagaraOpInfo", "First Function Param", "A"),PinToolTip="A",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraNumeric'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1.0",AutogeneratedDefaultValue="1.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=7D223B636DFF42DCBE2F9F1E93176BF5,PinName="Period",PinFriendlyName=NSLOCTEXT("NiagaraOpInfo", "Period Name", "Period"),PinToolTip="Value in which a complete rotation has occurred.",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraFloat'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="5.000000",AutogeneratedDefaultValue="1.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=180D0157D43F407B90DD3580C988779C,PinName="Result",PinToolTip="Result",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraNumeric'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [12, 6],
    icon: null,
    pins: 3,
    delegate: false,
    development: false,
    additionalTest: async (node, pins, blueprintPage) => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeFalsy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-default"))).toBeTruthy()
        await expect(pins[1].locator("ueb-input")).toHaveText("5.0")
        await pins[1].locator("ueb-input").fill("8")
        await blueprintPage.blur()
        await expect(pins[1].locator("ueb-input")).toHaveText("8.0")
        expect(await pins[1].evaluate(p => p.entity.pinColor().cssText)).toBe(css`160, 250, 68`.cssText)
    },
})
