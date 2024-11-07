import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Call AS!%sasdAdsadDD",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_CallDelegate Name="K2Node_CallDelegate_0" ExportPath=/Script/BlueprintGraph.K2Node_CallDelegate'"/PCG/BP_Elements/PCGAsset.PCGAsset:EventGraph.K2Node_CallDelegate_0"'
            "DelegateReference"=(MemberName="AS!%sasdAdsadDD",MemberGuid=FB6F7CD342716A4FA22AA6AD6E6B7ED9,bSelfContext=True)
            "NodePosX"=-176
            "NodePosY"=368
            "NodeGuid"=DE76D7A748D78DF77131B0AE166442A6
            CustomProperties Pin (PinId=C329158B42D4E4DA1CAEF7A04ED77100,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=8D92F70C46C94C389AAC3E87191AB46A,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=88182FCB4DE7B6D80AD1B79906069691,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "BaseMCDelegateSelfPinName", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/Engine.BlueprintGeneratedClass'"/PCG/BP_Elements/PCGAsset.PCGAsset_C"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.blue,
    icon: SVGIcon.node,
    pins: 3,
    pinNames: ["Target"],
    delegate: false,
    development: false,
})
