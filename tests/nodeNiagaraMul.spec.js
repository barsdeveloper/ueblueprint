import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Niagara Mul",
    title: String.fromCharCode(0x2a2f),
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeOp Name="NiagaraNodeOp_2" ExportPath="/Script/NiagaraEditor.NiagaraNodeOp'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeOp_2'"
            OpName="Numeric::Mul"
            ChangeId=D255C58006D942A3B9EA40A7D0A9A26C
            NodePosX=-432
            NodePosY=432
            NodeGuid=6C57BD28235446B286204A350C20824E
            CustomProperties Pin (PinId=2CA19EFC7B8943C59D997AE9E20EDD9D,PinName="A",PinToolTip="A",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraNumeric'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1.0",AutogeneratedDefaultValue="1.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A6992BD09EBC4303B4B30A86BCF295A9,PinName="B",PinToolTip="B",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraNumeric'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1.0",AutogeneratedDefaultValue="1.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=8539D0F6BC1F4A85A708B488C37C6FD9,PinName="Result",PinToolTip="Result",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraNumeric'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=C484E4BEEE6E41779EFFB696880FCAF0,PinName="Add",PinType.PinCategory="Misc",PinType.PinSubCategory="DynamicAddPin",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [9.5, 6],
    pins: 4,
    delegate: false,
    development: false,
    additionalTest: async node => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeTruthy()
    },
})