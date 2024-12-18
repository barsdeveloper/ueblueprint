import Configuration from "../js/Configuration.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Input X_1 (Scalar)",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_14" ExportPath="/Script/UnrealEd.MaterialGraphNode'/Engine/Transient.Material_1:MaterialGraph_0.MaterialGraphNode_14'"
            Begin Object Class=/Script/Engine.MaterialExpressionFunctionInput Name="MaterialExpressionFunctionInput_4" ExportPath="/Script/Engine.MaterialExpressionFunctionInput'/Engine/Transient.Material_1:MaterialGraph_0.MaterialGraphNode_14.MaterialExpressionFunctionInput_4'"
            End Object
            Begin Object Name="MaterialExpressionFunctionInput_4" ExportPath="/Script/Engine.MaterialExpressionFunctionInput'/Engine/Transient.Material_1:MaterialGraph_0.MaterialGraphNode_14.MaterialExpressionFunctionInput_4'"
                InputName="X_1"
                Id=220B12C48A1B4FD2A2F1964A3670D092
                InputType=FunctionInput_Scalar
                bUsePreviewValueAsDefault=True
                SortPriority=2
                MaterialExpressionEditorX=-64
                MaterialExpressionEditorY=208
                MaterialExpressionGuid=5B9F03CCBBD54567A9B6EAD08AAA08F0
                Material="/Script/Engine.Material'/Engine/Transient.Material_1'"
                Function="/Script/Engine.MaterialFunction'/Engine/Transient.AppendMany'"
            End Object
            MaterialExpression="/Script/Engine.MaterialExpressionFunctionInput'MaterialExpressionFunctionInput_4'"
            NodePosX=-64
            NodePosY=208
            NodeGuid=9379668BD62A45458DC56BE5B3F80A73
            CustomProperties Pin (PinId=1021DF0F4ABC4FE3BF1CF97F6FD78496,PinName="Preview",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=C875FB5EEFDC4CE6BD98B872403F7C29,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.red,
    icon: null,
    pins: 2,
    pinNames: ["Preview"],
    delegate: false,
    development: false,
})
