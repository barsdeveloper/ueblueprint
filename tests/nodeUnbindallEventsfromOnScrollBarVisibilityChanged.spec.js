import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Unbind all Events from On Scroll Bar Visibility Changed",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_ClearDelegate Name="K2Node_ClearDelegate_1" ExportPath="/Script/BlueprintGraph.K2Node_ClearDelegate'/Engine/Maps/Templates/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_ClearDelegate_1'"
            DelegateReference=(MemberParent="/Script/CoreUObject.Class'/Script/UMG.ScrollBox'",MemberName="OnScrollBarVisibilityChanged")
            NodePosX=2688
            NodePosY=-640
            NodeGuid=48B5357C4A6344B685D58484C8CA6100
            CustomProperties Pin (PinId=0186059A7F58440D9CDE09CF2E4211BE,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=CB57C7A59EC4491EAC932C4AF3B43254,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=C088A6049D2C4A238885632C5D33C490,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "BaseMCDelegateSelfPinName", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/UMG.ScrollBox'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [24, 6],
    color: Configuration.nodeColors.blue,
    icon: SVGIcon.node,
    pins: 3,
    pinNames: ["Target"],
    delegate: false,
    development: false,
})
