import { testNode, expect } from "./fixtures/test.js"

testNode({
    name: "Conv Transform To String",
    title: "",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_CallFunction Name="K2Node_CallFunction_3" ExportPath="/Script/BlueprintGraph.K2Node_CallFunction'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_CallFunction_3'"
            bDefaultsToPureFunc=True
            FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetStringLibrary'",MemberName="Conv_TransformToString")
            NodePosX=2640
            NodePosY=-1152
            NodeGuid=5DE5CD9FB3DD44ADA7C373D59EA63D23
            CustomProperties Pin (PinId=A1DEA5655C524429A83F3447B2DB6A42,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="Target\nKismet String Library Riferimento Oggetto",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.KismetStringLibrary'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultObject="/Script/Engine.Default__KismetStringLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=50F38A250A1944A4A2AFF41A4AE5092C,PinName="InTrans",PinToolTip="In Trans\nTrasformazione (by ref)",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Transform'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_5 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=0A7DB6976935430EAF08AEA50D0C6278,PinName="ReturnValue",PinToolTip="Return Value\nStringa\n\nConverte un valore di trasformazione in una stringa, nel formato \'Translazione: X= Y= Z= Rotazione: P= Y= R= Scala: X= Y= Z=\'",Direction="EGPD_Output",PinType.PinCategory="string",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_CallFunction_0 06ED5D76ADEE42119EC0A4761E2689CE,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    pins: 2,
    delegate: false,
    development: false,
    additionalTest: async node => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeTruthy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-conversion"))).toBeTruthy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-default"))).toBeFalsy()
        expect(await node.locator("ueb-pin").nth(0).evaluate(pin =>
            /** @type {PinElement} */(pin).entity.pinColor().toString()
        )).toEqual("227, 103, 0")
        expect(await node.locator("ueb-pin").nth(1).evaluate(pin =>
            /** @type {PinElement} */(pin).entity.pinColor().toString()
        )).toEqual("251, 0, 208")
    },
})
