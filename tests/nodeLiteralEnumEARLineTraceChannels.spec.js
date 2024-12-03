import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Literal enum EARLineTraceChannels",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_EnumLiteral Name="K2Node_EnumLiteral_0"
            Enum=/Script/CoreUObject.Enum'"/Script/AugmentedReality.EARLineTraceChannels"'
            NodePosX=-864
            NodePosY=-1856
            NodeGuid=50A89C411ADB4A4388E2CDE22CBEF9B0
            CustomProperties Pin (PinId=BEEA33BA22304D868E6E7C78C7E4BE6A,PinName="Enum",PinType.PinCategory="byte",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Enum'"/Script/AugmentedReality.EARLineTraceChannels"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="None",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=B682278698A545E79A232FCCA7C1EB4D,PinName="ReturnValue",Direction="EGPD_Output",PinType.PinCategory="byte",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Enum'"/Script/AugmentedReality.EARLineTraceChannels"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: SVGIcon.enum,
    pins: 2,
    pinNames: ["Enum", "Return Value"],
    delegate: false,
    development: false,
})
