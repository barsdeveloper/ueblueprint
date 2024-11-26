import { css } from "lit"
import Configuration from "../js/Configuration.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Calculate A Volume Textures Distance Field Gradient",
    value: String.raw`
        Begin Object Class=/Script/NiagaraEditor.NiagaraNodeFunctionCall Name="NiagaraNodeFunctionCall_118" ExportPath="/Script/NiagaraEditor.NiagaraNodeFunctionCall'/Engine/Transient.NewNiagaraScript:NiagaraScriptSource_0.NiagaraGraph_0.NiagaraNodeFunctionCall_118'"
            FunctionScript="/Script/Niagara.NiagaraScript'/Niagara/Functions/Textures/CalculateA_VolumeTexturesDistanceFieldGradient.CalculateA_VolumeTexturesDistanceFieldGradient'"
            SelectedScriptVersion=FE54E5B243F724F59CBE18B14F541840
            CachedChangeId=DC7328824039207713ADFF82DEAF3A32
            FunctionDisplayName="CalculateA_VolumeTexturesDistanceFieldGradient"
            ChangeId=5A8AF63A07AB47CCBF806D83FFB9020F
            NodePosX=-512
            NodePosY=-512
            NodeGuid=3803C1B7F13C4D818D7AF71764B9957B
            CustomProperties Pin (PinId=1C49656E46D540D0AC5961597B947D85,PinName="Sample Position",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraPosition'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.000,0.000,0.000",AutogeneratedDefaultValue="0.000,0.000,0.000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=1FF0DD84BE324BEE94AC35A5D83896E1,PinName="Scale Factor",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraFloat'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1.000000",AutogeneratedDefaultValue="1.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A2030D2728C34982A599AC7EAE2FDDE0,PinName="Volume Texture",PinType.PinCategory="Class",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Niagara.NiagaraDataInterfaceVolumeTexture'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=FCCC0AC1CCD54A099E450D4A4FA6A23C,PinName="Volume Center Location",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraPosition'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.000,0.000,0.000",AutogeneratedDefaultValue="0.000,0.000,0.000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=F1BA4EFE91554666A80389736EB5005B,PinName="Volume Extents",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Vector3f'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.000,0.000,0.000",AutogeneratedDefaultValue="0.000,0.000,0.000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=40512C3E4F5C4B85BAC287179458EDEF,PinName="Distance Field Texture Channel",PinType.PinCategory="Enum",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/Engine.UserDefinedEnum'/Niagara/Enums/ENiagara_Float4Channel.ENiagara_Float4Channel'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="NewEnumerator0",AutogeneratedDefaultValue="NewEnumerator0",PersistentGuid=CC547F87ED03FB8EEA661F18ABDF8C16,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A5FEC96B447C42EB9CA7BE93AB04F93E,PinName="Vector To Surface",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Vector3f'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=6D55F00292734872B750828E15779CD5,PinName="Distance To Surface",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraFloat'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=CC5826BFCC784BECA71B5B09C145DCF7,PinName="Sampled Color",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Vector4f'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A22662833F8446309AF4E72E09B2A6C5,PinName="Field Gradient",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Vector3f'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=59A2DB801C7D4E9180793F5F1F597B4F,PinName="IsoSurface Position",Direction="EGPD_Output",PinType.PinCategory="Type",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/Niagara.NiagaraPosition'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [25, 18],
    icon: null,
    color: Configuration.nodeColors.darkerBlue,
    pins: 11,
    pinNames: [
        "Sample Position",
        "Scale Factor",
        "Volume Texture",
        "Volume Center Location",
        "Volume Extents",
        "Distance Field Texture Channel",
        "Vector To Surface",
        "Distance To Surface",
        "Sampled Color",
        "Field Gradient",
        "Iso Surface Position",
    ],
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeFalsy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-default"))).toBeTruthy()
        expect(await pins[0].evaluate(p => p.entity.pinColor().cssText)).toBe(css`251, 146, 251`.cssText)
        expect(await pins[1].evaluate(p => p.entity.pinColor().cssText)).toBe(css`160, 250, 68`.cssText)
        expect(await pins[2].evaluate(p => p.entity.pinColor().cssText)).toBe(css`0, 168, 242`.cssText)
        expect(await pins[3].evaluate(p => p.entity.pinColor().cssText)).toBe(css`251, 146, 251`.cssText)
        expect(await pins[4].evaluate(p => p.entity.pinColor().cssText)).toBe(css`250, 200, 36`.cssText)
        expect(await pins[6].evaluate(p => p.entity.pinColor().cssText)).toBe(css`250, 200, 36`.cssText)
        expect(await pins[7].evaluate(p => p.entity.pinColor().cssText)).toBe(css`160, 250, 68`.cssText)
        expect(await pins[8].evaluate(p => p.entity.pinColor().cssText)).toBe(css`0, 88, 200`.cssText)
        expect(await pins[9].evaluate(p => p.entity.pinColor().cssText)).toBe(css`250, 200, 36`.cssText)
        expect(await pins[10].evaluate(p => p.entity.pinColor().cssText)).toBe(css`251, 146, 251`.cssText)
    },
})