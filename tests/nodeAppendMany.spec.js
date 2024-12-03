import Configuration from "../js/Configuration.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "AppendMany",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_3" ExportPath="/Script/UnrealEd.MaterialGraphNode'/Engine/Transient.Material_0:MaterialGraph_0.MaterialGraphNode_3'"
            Begin Object Class=/Script/Engine.MaterialExpressionMaterialFunctionCall Name="MaterialExpressionMaterialFunctionCall_0" ExportPath="/Script/Engine.MaterialExpressionMaterialFunctionCall'/Engine/Transient.Material_0:MaterialGraph_0.MaterialGraphNode_3.MaterialExpressionMaterialFunctionCall_0'"
            End Object
            Begin Object Name="MaterialExpressionMaterialFunctionCall_0" ExportPath="/Script/Engine.MaterialExpressionMaterialFunctionCall'/Engine/Transient.Material_0:MaterialGraph_0.MaterialGraphNode_3.MaterialExpressionMaterialFunctionCall_0'"
                MaterialFunction="/Script/Engine.MaterialFunction'/Engine/Functions/Engine_MaterialFunctions02/Utility/AppendMany.AppendMany'"
                FunctionInputs(0)=(ExpressionInputId=885D0D3941709A0021D522BB0D350E84,Input=(OutputIndex=-1,InputName="R"))
                FunctionInputs(1)=(ExpressionInputId=66655BEF4DEEE4FBB682D1B2533B646B,Input=(OutputIndex=-1,InputName="G"))
                FunctionInputs(2)=(ExpressionInputId=7971790B4C1CF3D12A6BD5849BF51222,Input=(OutputIndex=-1,InputName="B"))
                FunctionInputs(3)=(ExpressionInputId=E0358D7C4B4022F69AB64786F99318D6,Input=(OutputIndex=-1,InputName="A"))
                FunctionOutputs(0)=(ExpressionOutputId=FA6B13694608C010AF452E92B3981900,Output=(OutputName="RG"))
                FunctionOutputs(1)=(ExpressionOutputId=C48A5AA9468A429E4D9984AD43B50CE5,Output=(OutputName="RGB"))
                FunctionOutputs(2)=(ExpressionOutputId=B55BAD0C44C4D883F0D33CB57D00AB3C,Output=(OutputName="RGBA"))
                MaterialExpressionEditorX=384
                MaterialExpressionEditorY=768
                MaterialExpressionGuid=971FA65449F74582B4418B816DDCBCCF
                Material="/Script/Engine.Material'/Engine/Transient.Material_0'"
                Outputs(0)=(OutputName="RG")
                Outputs(1)=(OutputName="RGB")
                Outputs(2)=(OutputName="RGBA")
            End Object
            MaterialExpression="/Script/Engine.MaterialExpressionMaterialFunctionCall'MaterialExpressionMaterialFunctionCall_0'"
            NodePosX=384
            NodePosY=768
            NodeGuid=7CBF0C7DDBF848FE8D7E9A85D56C3772
            CustomProperties Pin (PinId=36EB45FD36FA4918947D2811918524EF,PinName="R (S)",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=3D2F2B761F6646E298BC96093285F44E,PinName="G (S)",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=4194B7FE10FC4AEEB2B9B620437618C3,PinName="B (S)",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A29788A42F2E43E9B5F8959DF5478E8F,PinName="A (S)",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=7C55A39ECC2E4A78B0A2918AF200EED4,PinName="RG",Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A21DE80A4A454574AF9B1E0F8CD7E9F1,PinName="RGB",Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=E5937F981A604CF1AF885868325FC83E,PinName="RGBA",Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.blue,
    icon: null,
    pins: 7,
    pinNames: [
        "R (S)",
        "G (S)",
        "B (S)",
        "A (S)",
        "RG",
        "RGB",
        "RGBA",
    ],
    delegate: false,
    development: false,
})
