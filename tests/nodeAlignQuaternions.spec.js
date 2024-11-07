import { css } from "lit"
import Configuration from "../js/Configuration.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Align Quaternions",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeFunctionCall Name="NiagaraNodeFunctionCall_125" ExportPath="/Script/NiagaraEditor.NiagaraNodeFunctionCall'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeFunctionCall_125'"
            FunctionScript="/Script/Niagara.NiagaraScript'/Niagara/Functions/Rotation/AlignQuaternions.AlignQuaternions'"
            CachedChangeId=46822C6B48B121BA33580E809890283B
            FunctionDisplayName="AlignQuaternions"
            ChangeId=1773D73F6A644287931126B8B2F67371
            NodePosX=-512
            NodePosY=128
            NodeGuid=DF5F941A4DE7430989CE74C42E9F0E6F
            CustomProperties Pin (PinId=AE6D0569136F4208B97DD62D9FB2EFF6,PinName="BaselineRotation",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Quat4f'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.000,0.000,0.000,1.000",AutogeneratedDefaultValue="0.000,0.000,0.000,1.000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=32A04106CE014CF3B7A74E4CE3B7064B,PinName="NewRotation",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Quat4f'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.000,0.000,0.000,1.000",AutogeneratedDefaultValue="0.000,0.000,0.000,1.000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=5F121C4330074978A1F9792824AE3B5A,PinName="NewOutput",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Quat4f'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [16, 5.5],
    icon: null,
    color: Configuration.nodeColors.darkerBlue,
    pins: 3,
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeFalsy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-default"))).toBeTruthy()
        expect(await pins[0].evaluate(p => p.entity.pinColor().cssText)).toBe(css`0, 88, 200`.cssText)
        expect(await pins[1].evaluate(p => p.entity.pinColor().cssText)).toBe(css`0, 88, 200`.cssText)
        expect(await pins[2].evaluate(p => p.entity.pinColor().cssText)).toBe(css`0, 88, 200`.cssText)
    },
})
