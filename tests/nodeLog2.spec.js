import Configuration from "../js/Configuration.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Log2",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_25" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_25"'
            Begin Object Class=/Script/Engine.MaterialExpressionLogarithm2 Name="MaterialExpressionLogarithm2_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm2'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_25.MaterialExpressionLogarithm2_0"'
            End Object
            Begin Object Name="MaterialExpressionLogarithm2_0" ExportPath=/Script/Engine.MaterialExpressionLogarithm2'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_25.MaterialExpressionLogarithm2_0"'
                MaterialExpressionEditorX=-1343
                MaterialExpressionEditorY=-380
                MaterialExpressionGuid=DFB490DA67CD4FED91729623FA6F76F9
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionLogarithm2'"MaterialExpressionLogarithm2_0"'
            NodePosX=-1343
            NodePosY=-380
            NodeGuid=C413E5EDE2484269AB5BB8E6E14FD5DC
            CustomProperties Pin (PinId=AA0DC6E48E864B2483F3F5239FDBC26D,PinName="X",PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=7E2CEF20073B4A8DBCA5AEAFBEA3BE0B,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: null,
    pins: 2,
    pinNames: ["X"],
    delegate: false,
    development: false,
})
