import Configuration from "../js/Configuration.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Ln",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_27" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_27"'
            Begin Object Class=/Script/InterchangeImport.MaterialExpressionLogarithm Name="MaterialExpressionLogarithm_0" ExportPath=/Script/InterchangeImport.MaterialExpressionLogarithm'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_27.MaterialExpressionLogarithm_0"'
            End Object
            Begin Object Name="MaterialExpressionLogarithm_0" ExportPath=/Script/InterchangeImport.MaterialExpressionLogarithm'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_27.MaterialExpressionLogarithm_0"'
                MaterialExpressionEditorX=-1808
                MaterialExpressionEditorY=-384
                MaterialExpressionGuid=A88BE2DBB50544539F7C340F1C521570
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
            End Object
            MaterialExpression=/Script/InterchangeImport.MaterialExpressionLogarithm'"MaterialExpressionLogarithm_0"'
            NodePosX=-1808
            NodePosY=-384
            NodeGuid=7BC7C5E93F8F47BAB3C0086F9C2AE036
            CustomProperties Pin (PinId=DCCD2C267163472C98FFD44B5AC004DD,PinName="Input",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=D0ACD287FE494F0D8CB682DC7EABDD07,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: null,
    pins: 2,
    pinNames: [],
    delegate: false,
    development: false,
})
