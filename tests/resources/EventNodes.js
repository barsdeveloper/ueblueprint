import Configuration from "../../js/Configuration.js"
import SVGIcon from "../../js/SVGIcon.js"
import NodeTests from "./NodeTests.js"

export default class EventNodes extends NodeTests {
    static {
        this.set([
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
                size: [16, 5],
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
                size: [16.5, 16],
                color: Configuration.nodeColors.red,
                icon: SVGIcon.event,
                pins: 8,
                pinNames: [
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
            {
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
            },
            {
                name: "Bind Event to On Actor Hit",
                value: String.raw`
                    Begin Object Class=/Script/BlueprintGraph.K2Node_AddDelegate Name="K2Node_AddDelegate_0" ExportPath="/Script/BlueprintGraph.K2Node_AddDelegate'/Game/Examples/MazeSolver/Blueprints/MazeSolverTrainer.MazeSolverTrainer:EventGraph.K2Node_AddDelegate_0'"
                        DelegateReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.Actor'",MemberName="OnActorHit")
                        NodePosX=256
                        NodePosY=-48
                        NodeGuid=A94C879148610E75EBAC94807E94F5DD
                        CustomProperties Pin (PinId=252C72EA45F1370E8B00FFB6D5C87B3A,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Event_0 F135CD17D40347269BBBD101437B6AF0,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=66AE85F346F350F62B127B97DFC49563,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=D7358C004BE0EF6651DE69A7346E77D4,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "BaseMCDelegateSelfPinName", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.Actor'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_CallFunction_0 EDE2516A4F187C93CBF2D7AE88066240,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=180DE95D4FD5AF2404F1CB80F0FBD29E,PinName="Delegate",PinFriendlyName=NSLOCTEXT("K2Node", "PinFriendlyDelegatetName", "Event"),PinType.PinCategory="Delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent="/Script/CoreUObject.Package'/Script/Engine'",MemberName="ActorHitSignature__DelegateSignature"),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                    End Object
                `,
                size: [13.5, 8],
                color: Configuration.nodeColors.blue,
                icon: SVGIcon.node,
                pins: 4,
                pinNames: ["Target", "Event"],
                delegate: false,
                development: false,
            },
            {
                name: "Bind Event to Modified Event Dynamic",
                value: String.raw`
                    Begin Object Class=/Script/BlueprintGraph.K2Node_AddDelegate Name="K2Node_AddDelegate_1" ExportPath="/Script/BlueprintGraph.K2Node_AddDelegate'/Engine/Maps/Templates/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_AddDelegate_1'"
                        DelegateReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.AnimDataModel'",MemberName="ModifiedEventDynamic")
                        NodePosX=1920
                        NodePosY=-384
                        NodeGuid=9F798056B9CB474A9EE2FE88063D4D20
                        CustomProperties Pin (PinId=4D2AF198B99A445C925AA2A8380C533E,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=46363EE0231F4EA186E029977F586416,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=D3AD4B9A6EA745BD8EC70EE4B33FDB44,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "BaseMCDelegateSelfPinName", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.AnimDataModel'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=48F1FF2C45A147C7B390B9D1A35FC3A2,PinName="Delegate",PinFriendlyName=NSLOCTEXT("K2Node", "PinFriendlyDelegatetName", "Event"),PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent="/Script/CoreUObject.Package'/Script/Engine'",MemberName="AnimDataModelModifiedDynamicEvent__DelegateSignature"),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                    End Object
                `,
                size: [18, 8],
                color: Configuration.nodeColors.blue,
                icon: SVGIcon.node,
                pins: 4,
                pinNames: ["Target", "Event"],
                delegate: false,
                development: false,
            },
            {
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
            },
            {
                name: "Unbind Event from On Pre Initialize",
                value: String.raw`
                    Begin Object Class=/Script/BlueprintGraph.K2Node_RemoveDelegate Name="K2Node_RemoveDelegate_0" ExportPath="/Script/BlueprintGraph.K2Node_RemoveDelegate'/Engine/Maps/Templates/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_RemoveDelegate_0'"
                        DelegateReference=(MemberParent="/Script/CoreUObject.Class'/Script/ControlRig.ControlRigComponent'",MemberName="OnPreInitializeDelegate")
                        NodePosX=2688
                        NodePosY=-512
                        NodeGuid=68504A8520394A2F9B8AACFD2F457D9E
                        CustomProperties Pin (PinId=1D7D2FBFEB344721B4EE9D149F615BBD,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=2AB22AF068E943BEB99DAAE276EA0C9A,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=42FC9475607C479097689D14713CCC43,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "BaseMCDelegateSelfPinName", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/ControlRig.ControlRigComponent'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=7729342B171248D8A6EF908ED8E1D8B7,PinName="Delegate",PinFriendlyName=NSLOCTEXT("K2Node", "PinFriendlyDelegatetName", "Event"),PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent="/Script/CoreUObject.Package'/Script/ControlRig'",MemberName="ControlRigComponentDelegate__DelegateSignature"),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                    End Object
                `,
                size: [16.5, 8],
                color: Configuration.nodeColors.blue,
                icon: SVGIcon.node,
                pins: 4,
                pinNames: ["Target", "Event"],
                delegate: false,
                development: false,
            },
            {
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
            },
        ])
    }
}
