import { css } from "lit"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Niagara Logic NOT",
    title: "Logic NOT",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeOp Name="NiagaraNodeOp_83" ExportPath="/Script/NiagaraEditor.NiagaraNodeOp'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeOp_83'"
            OpName="Boolean::LogicNot"
            ChangeId=850211C079724647B479BFA82D533C76
            NodePosX=128
            NodePosY=128
            NodeGuid=1F3DA06DD27E488A9B6766E8CD203F81
            CustomProperties Pin (PinId=1396C29ABE9F4330B91B88E4788956D0,PinName="A",PinToolTip="A",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraBool'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",AutogeneratedDefaultValue="true",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=F4FABE23D34A4B0C915D6B7117C11B57,PinName="Result",PinToolTip="Result",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraBool'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [10, 4],
    pins: 2,
    pinNames: ["A", "Result"],
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeFalsy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-default"))).toBeTruthy()
        for (const pin of pins) {
            expect(await pin.evaluate(element => element.entity.pinColor().cssText))
                .toBe(css`146, 0, 0`.cssText)
        }
    },
})