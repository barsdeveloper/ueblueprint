import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Matrix Transform Position",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeOp Name="NiagaraNodeOp_93" ExportPath="/Script/NiagaraEditor.NiagaraNodeOp'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeOp_93'"
            OpName="Matrix::TransformPosition"
            ChangeId=B50CCE545D064D12991CD1407DF14437
            NodePosX=800
            NodePosY=352
            NodeGuid=C8731F92EF32437D949081E06D044FC5
            CustomProperties Pin (PinId=B92730CFC09540B7A8B7C89EBC2A9526,PinName="M",PinToolTip="M",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraMatrix'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1.0,0.0,0.0,0.0,\\t\\t0.0,1.0,0.0,0.0,\\t\\t0.0,0.0,1.0,0.0,\\t\\t0.0,0.0,0.0,1.0",AutogeneratedDefaultValue="1.0,0.0,0.0,0.0,\\t\\t0.0,1.0,0.0,0.0,\\t\\t0.0,0.0,1.0,0.0,\\t\\t0.0,0.0,0.0,1.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=D970C7D4FA4949918AD657EF0D55462B,PinName="V",PinToolTip="V",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraPosition'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1.0,1.0,1.0",AutogeneratedDefaultValue="1.0,1.0,1.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=356EC3AE7343453EB6554019FC162416,PinName="Result",PinToolTip="Result",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraPosition'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [17.5, 6],
    pins: 3,
    pinNames: ["M", "V", "Result"],
    delegate: false,
    development: false,
    additionalTest: async node => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeFalsy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-default"))).toBeTruthy()
    },
})