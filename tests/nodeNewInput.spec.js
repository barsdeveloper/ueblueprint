import { css } from "lit"
import Configuration from "../js/Configuration.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "NewInput",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeInput Name="NiagaraNodeInput_0" ExportPath="/Script/NiagaraEditor.NiagaraNodeInput'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeInput_0'"
            Begin Object Class=/Script/Niagara.NiagaraDataInterfaceCurlNoise Name="NiagaraDataInterfaceCurlNoise_0" ExportPath="/Script/Niagara.NiagaraDataInterfaceCurlNoise'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeInput_0.NiagaraDataInterfaceCurlNoise_0'"
            End Object
            Begin Object Name="NiagaraDataInterfaceCurlNoise_0" ExportPath="/Script/Niagara.NiagaraDataInterfaceCurlNoise'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeInput_0.NiagaraDataInterfaceCurlNoise_0'"
                MergeId=B27AD273F4414A418771FD27B9271A58
            End Object
            Input=(Name="NewInput",TypeDefHandle=(RegisteredTypeIndex=43))
            ExposureOptions=(bRequired=False)
            DataInterface="/Script/Niagara.NiagaraDataInterfaceCurlNoise'NiagaraDataInterfaceCurlNoise_0'"
            ChangeId=B9C3FCA46F974BF5B38DBB1BE9DCA56C
            NodePosX=144
            NodePosY=-1632
            NodeGuid=78107E5ED9AF405A8DF06545ABCB7628
            CustomProperties Pin (PinId=7A1E4994E9794F56AA000841A575C413,PinName="Input",Direction="EGPD_Output",PinType.PinCategory="Class",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Niagara.NiagaraDataInterfaceCurlNoise'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.red,
    icon: null,
    pins: 1,
    delegate: false,
    development: false,
    variadic: false,
    additionalTest: async (node, pins) => {
        expect(await pins[0].evaluate(p => p.entity.pinColor().toString())).toEqual(css`0, 168, 242`.toString())
    }
})
