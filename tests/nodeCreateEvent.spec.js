import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Create Event",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_CreateDelegate Name="K2Node_CreateDelegate_1"
            NodePosX=368
            NodePosY=-224
            NodeGuid=0FA4EE58928C4CF285441256561E250A
            CustomProperties Pin (PinId=4735A6AC4F9F7A3AFD64B2801F623052,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "CreateDelegate_ObjectInputName", "Object"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/CoreUObject.Object"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=0A66F49740A5DDD42C1AECA040844EBF,PinName="OutputDelegate",PinFriendlyName=NSLOCTEXT("K2Node", "CreateDelegate_DelegateOutName", "Event"),Direction="EGPD_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: SVGIcon.node,
    pins: 2,
    pinNames: ["Object", "Event"],
    delegate: false,
    development: false,
})
