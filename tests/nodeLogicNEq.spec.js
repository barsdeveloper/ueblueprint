import { css } from "lit"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "LogicNEq",
    title: "!=",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeOp Name="NiagaraNodeOp_85" ExportPath="/Script/NiagaraEditor.NiagaraNodeOp'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeOp_85'"
            OpName="Boolean::LogicNEq"
            ChangeId=3526C49A19484FCAA258F5F1399E5199
            NodePosX=-80
            NodePosY=128
            NodeGuid=591862B832B847AE8F2194837B5C9A68
            CustomProperties Pin (PinId=0E889E7597AD478C9D4E65D8593F9192,PinName="A",PinToolTip="A",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraBool'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",AutogeneratedDefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A6BF9D71327E4000BD8D29B52CE0C168,PinName="B",PinToolTip="B",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraBool'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",AutogeneratedDefaultValue="true",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=36E21F9BAA3D45BEB74DD7D06C763524,PinName="Result",PinToolTip="Result",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraBool'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [10, 5],
    pins: 3,
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeTruthy()
        for (const pin of pins) {
            expect(await pin.evaluate(element => element.entity.pinColor().cssText))
                .toBe(css`146, 0, 0`.cssText)
        }
    },
})