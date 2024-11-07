import Configuration from "../js/Configuration.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Sqrt",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_24" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_24"'
            Begin Object Class=/Script/Engine.MaterialExpressionSquareRoot Name="MaterialExpressionSquareRoot_0" ExportPath=/Script/Engine.MaterialExpressionSquareRoot'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_24.MaterialExpressionSquareRoot_0"'
            End Object
            Begin Object Name="MaterialExpressionSquareRoot_0" ExportPath=/Script/Engine.MaterialExpressionSquareRoot'"/Engine/Transient.M_CobbleStone_Pebble:MaterialGraph_0.MaterialGraphNode_24.MaterialExpressionSquareRoot_0"'
                MaterialExpressionEditorX=-1552
                MaterialExpressionEditorY=-416
                MaterialExpressionGuid=3F37EEB301AE4B0192673A114358C546
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_CobbleStone_Pebble"'
                bCollapsed=False
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionSquareRoot'"MaterialExpressionSquareRoot_0"'
            NodePosX=-1552
            NodePosY=-416
            NodeGuid=5DB895BECADE486CB5F8A40B72C64637
            CustomProperties Pin (PinId=9BEA4A9DE7DE411EB9590041B6137505,PinName="Input",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=4F7BCB72BB064C5FA9EDFC004EEF3591,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: null,
    pins: 2,
    pinNames: [],
    delegate: false,
    development: false,
})
