/// <reference types="cypress" />

import generateNodeTests from "../fixtures/testUtilities.js"
import Configuration from "../../js/Configuration.js"
import SVGIcon from "../../js/SVGIcon.js"

const tests = [
    {
        name: "MoveCharacterRandomLocation",
        subtitle: "Custom Event",
        value: String.raw`
            Begin Object Class=/Script/BlueprintGraph.K2Node_CustomEvent Name="K2Node_CustomEvent_4"
                CustomFunctionName="MoveCharacterRandomLocation"
                NodePosX=-368
                NodePosY=64
                NodeGuid=9C3BF2E5A27C4B45825C025A224639EA
                CustomProperties Pin (PinId=B563D2CC4FC67B5F348BE18F59F694A4,PinName="OutputDelegate",Direction="EGPD_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent=/Script/Engine.BlueprintGeneratedClass'"/Temp/Untitled_1.Untitled_C"',MemberName="MoveCharacterRandomLocation",MemberGuid=9C3BF2E5A27C4B45825C025A224639EA),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=0DE0B9A2469DB01A69BD5C8BB17D15BB,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_8 C5BBC59C45ACF577B59616A9D79986B3,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.red,
        icon: SVGIcon.event,
        pins: 2,
        delegate: true,
        development: false,
    },
    {
        name: "OnComponentBeginOverlap_Event",
        subtitle: "Custom Event",
        value: String.raw`
            Begin Object Class=/Script/BlueprintGraph.K2Node_CustomEvent Name="K2Node_CustomEvent_0"
                CustomFunctionName="OnComponentBeginOverlap_Event"
                NodePosX=-96
                NodePosY=608
                NodeGuid=6BB0872D81764DAD9270E32E66A4E01C
                CustomProperties Pin (PinId=DB4E85FC86FD4EC784FFC45C77BB895C,PinName="OutputDelegate",Direction="EGPD_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent=/Script/Engine.BlueprintGeneratedClass'"/Temp/Untitled_1.Untitled_C"',MemberName="OnComponentBeginOverlap_Event",MemberGuid=6BB0872D81764DAD9270E32E66A4E01C),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_AssignDelegate_0 D1C3E8BFC4A54F62B5A566D72FAF5363,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=FE89EFE7B4AF4461B4969FF6AA4E46FC,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=0253993B7559437ABDA8A4FFE6EC2CA6,PinName="OverlappedComponent",Direction="EGPD_Output",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.PrimitiveComponent"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=E1538C05015F49D3A3927FFCB700ACB4,PinName="OtherActor",Direction="EGPD_Output",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.Actor"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=DA531C332C9041CCBBE58A42C94A0BA3,PinName="OtherComp",Direction="EGPD_Output",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.PrimitiveComponent"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=C957CCBA488341E787645E4C886DE2F2,PinName="OtherBodyIndex",Direction="EGPD_Output",PinType.PinCategory="int",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=03154C6B4A784B3E82393A3A66803DEF,PinName="bFromSweep",Direction="EGPD_Output",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=FC68A0EBC0FC4A27BECAB79E49D860BD,PinName="SweepResult",Direction="EGPD_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/Engine.HitResult"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties UserDefinedPin (PinName="OverlappedComponent",PinType=(PinCategory="object",PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.PrimitiveComponent"'),DesiredPinDirection=EGPD_Output)
                CustomProperties UserDefinedPin (PinName="OtherActor",PinType=(PinCategory="object",PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.Actor"'),DesiredPinDirection=EGPD_Output)
                CustomProperties UserDefinedPin (PinName="OtherComp",PinType=(PinCategory="object",PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.PrimitiveComponent"'),DesiredPinDirection=EGPD_Output)
                CustomProperties UserDefinedPin (PinName="OtherBodyIndex",PinType=(PinCategory="int"),DesiredPinDirection=EGPD_Output)
                CustomProperties UserDefinedPin (PinName="bFromSweep",PinType=(PinCategory="bool"),DesiredPinDirection=EGPD_Output)
                CustomProperties UserDefinedPin (PinName="SweepResult",PinType=(PinCategory="struct",PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/Engine.HitResult"',bIsReference=True,bIsConst=True),DesiredPinDirection=EGPD_Output)
            End Object
        `,
        color: Configuration.nodeColors.red,
        icon: SVGIcon.event,
        pins: 8,
        pinName: [
            "Overlapped Component",
            "Other Actor",
            "Other Comp",
            "Other Body Index",
            "From Sweep",
            "Sweep Result",
        ],
        delegate: true,
        development: false,
    },
]

generateNodeTests(tests)
