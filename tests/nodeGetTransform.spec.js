import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { testNode } from "./fixtures/test.js"

testNode({
    name: "Get Transform",
    subtitle: "Target is Actor",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_CallFunction Name="K2Node_CallFunction_1" ExportPath="/Script/BlueprintGraph.K2Node_CallFunction'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_CallFunction_1'"
            bDefaultsToPureFunc=True
            FunctionReference=(MemberName="GetTransform",bSelfContext=True)
            NodePosX=2416
            NodePosY=-720
            NodeGuid=CFB627D77A3A4419AFF2A5539B872404
            CustomProperties Pin (PinId=2BC8CE91A0424570A4CCEBCC33E102C4,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="Target\nActor Riferimento Oggetto",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.Actor'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=BDF15274D22541DA9E33F342F6341F11,PinName="ReturnValue",PinToolTip="Return Value\nTrasformazione (by ref)\n\nLa trasformazione che trasforma lo spazio dell\'attore in quello del mondo.",Direction="EGPD_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Transform'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_8 47E4D9AF4CD414564F484A96E876E80B,K2Node_Knot_5 47E4D9AF4CD414564F484A96E876E80B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [15, 5],
    color: Configuration.nodeColors.green,
    icon: SVGIcon.functionSymbol,
    pins: 2,
    pinNames: ["Target", "Return Value"],
    delegate: false,
    development: false,
})
