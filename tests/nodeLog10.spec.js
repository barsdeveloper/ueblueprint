import Configuration from "../js/Configuration.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Log10",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_26" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_26"'
            Begin Object Class=/Script/Engine.MaterialExpressionLogarithm10 Name="MaterialExpressionLogarithm10_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm10'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_26.MaterialExpressionLogarithm10_0"'
            End Object
            Begin Object Name="MaterialExpressionLogarithm10_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm10'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_26.MaterialExpressionLogarithm10_0"'
                MaterialExpressionEditorX=-1699
                MaterialExpressionEditorY=-366
                MaterialExpressionGuid=D6C0D0C0B1C241C7BC5CAE85C32A967E
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionLogarithm10'"MaterialExpressionLogarithm10_0"'
            NodePosX=-1699
            NodePosY=-366
            NodeGuid=7432C0BB32F74D54B23EB5FFEB9D7255
            CustomProperties Pin (PinId=C3E922C93B644E5781F1C76FD70CA87D,PinName="X",PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=48EB102C92F74A7E817286C32A8D217A,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: null,
    pins: 2,
    pinNames: ["X"],
    delegate: false,
    development: false,
})
