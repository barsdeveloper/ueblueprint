import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Bind Event to On Pre Initialize",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_AddDelegate Name="K2Node_AddDelegate_4" ExportPath="/Script/BlueprintGraph.K2Node_AddDelegate'/Engine/Maps/Templates/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_AddDelegate_4'"
            DelegateReference=(MemberParent="/Script/CoreUObject.Class'/Script/ControlRig.ControlRigComponent'",MemberName="OnPreInitializeDelegate")
            NodePosX=1760
            NodePosY=-688
            NodeGuid=12A5D8F5736842F7B70C88C26D36B422
            CustomProperties Pin (PinId=CF6740C1F0A4487E91E6C33CA32F78B7,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=AD533F241A0B44A68FCDFDFE2F698A95,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=6E432C9EE60143F4890F0BDC6BCF4637,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "BaseMCDelegateSelfPinName", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/ControlRig.ControlRigComponent'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=8C762AAFD03F4B89A4150D17A3C20598,PinName="Delegate",PinFriendlyName=NSLOCTEXT("K2Node", "PinFriendlyDelegatetName", "Event"),PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent="/Script/CoreUObject.Package'/Script/ControlRig'",MemberName="ControlRigComponentDelegate__DelegateSignature"),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [15, 8],
    color: Configuration.nodeColors.blue,
    icon: SVGIcon.node,
    pins: 4,
    pinNames: ["Target", "Event"],
    delegate: false,
    development: false,
})
