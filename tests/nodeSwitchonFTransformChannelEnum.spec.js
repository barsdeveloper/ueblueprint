import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Switch on FTransformChannelEnum",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_SwitchEnum Name="K2Node_SwitchEnum_4"
            Enum=/Script/CoreUObject.Enum'"/Script/MovieSceneTools.FTransformChannelEnum"'
            EnumEntries(0)="TranslateX"
            EnumEntries(1)="TranslateY"
            EnumEntries(2)="TranslateZ"
            EnumEntries(3)="RotateX"
            EnumEntries(4)="RotateY"
            EnumEntries(5)="RotateZ"
            EnumEntries(6)="ScaleX"
            EnumEntries(7)="ScaleY"
            EnumEntries(8)="ScaleZ"
            NodePosX=-48
            NodePosY=448
            AdvancedPinDisplay=Shown
            NodeGuid=27936712DE844DD68577CF8D703E315B
            CustomProperties Pin (PinId=AF3B9C33C7E84817A720F393F7307A46,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=045AC753EEF74356BE997C19BB00B82B,PinName="Selection",PinType.PinCategory="byte",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Enum'"/Script/MovieSceneTools.FTransformChannelEnum"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="ScaleX",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=759822D08F654AF7ACDFA6F0590404B8,PinName="NotEqual_ByteByte",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.KismetMathLibrary"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultObject="/Script/Engine.Default__KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=True,bDefaultValueIsReadOnly=True,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=D91E0E2866954BC887234AA8883DCB83,PinName="TranslateX",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.TranslateX", "Translate X"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=697FB3903E294ADF821BFBD574CB2976,PinName="TranslateY",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.TranslateY", "Translate Y"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=F76AB334C5E24919815C2AAAEACCD14B,PinName="TranslateZ",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.TranslateZ", "Translate Z"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=1C6C49D0E8A94F2F99A1DF9AF1574D16,PinName="RotateX",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.RotateX", "Rotate X"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=0D35BB4401504A20B45D152BCA0B9BD0,PinName="RotateY",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.RotateY", "Rotate Y"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=2024CA11E8E840F1A1D7C087145476AC,PinName="RotateZ",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.RotateZ", "Rotate Z"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=E9F47D5F991E43318D29DD40089114D4,PinName="ScaleX",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.ScaleX", "Scale X"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=D41C6BF492AD4AB09AE11DFEF442E256,PinName="ScaleY",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.ScaleY", "Scale Y"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A7460C8034394A20863B4AB8A38249D9,PinName="ScaleZ",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "FTransformChannelEnum.ScaleZ", "Scale Z"),Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
        End Object
    `,
    size: [22, 21],
    color: Configuration.nodeColors.lime,
    icon: SVGIcon.switch,
    pins: 11,
    pinNames: [
        "Selection",
        "Translate X",
        "Translate Y",
        "Translate Z",
        "Rotate X",
        "Rotate Y",
        "Rotate Z",
        "Scale X",
        "Scale Y",
        "Scale Z",
    ],
    delegate: false,
    development: false,
})
