import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Print String",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_CallFunction Name="K2Node_CallFunction_0" ExportPath="/Script/BlueprintGraph.K2Node_CallFunction'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_CallFunction_0'"
            FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",MemberName="PrintString")
            NodePosX=240
            NodePosY=-864
            AdvancedPinDisplay=Hidden
            EnabledState=DevelopmentOnly
            NodeGuid=14DD6F7D44124A658CD68FB343BC4D1A
            CustomProperties Pin (PinId=4FE6F4E3DB6D409981D89065AFE8BF2F,PinName="execute",PinToolTip="\nExec",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=13AC580D21B94589B4B1B19278120554,PinName="then",PinToolTip="\nExec",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=F61D04DD27404462A36526288993FBF4,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="Target\nKismet System Library Riferimento Oggetto",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultObject="/Script/Engine.Default__KismetSystemLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=FC6BA3A0E5C2435D97AC52360A8AEFFF,PinName="WorldContextObject",PinToolTip="World Context Object\nRiferimento Oggetto",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/CoreUObject.Object'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=70AD8C44A07448E2BF09777154C08EAC,PinName="InString",PinToolTip="In String\nStringa\n\nLa stringa per il logout",PinType.PinCategory="string",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="Hello",AutogeneratedDefaultValue="Hello",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=4ECB71FAB91542CF91AEDB183F6D32DC,PinName="bPrintToScreen",PinToolTip="Print to Screen\nBooleano\n\nDetermina se stampare o meno l\'output sullo schermo",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",AutogeneratedDefaultValue="true",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=2B43087213E74C45B6966B74339D8A14,PinName="bPrintToLog",PinToolTip="Print to Log\nBooleano\n\nDetermina se stampare o meno l\'output nel registro",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="true",AutogeneratedDefaultValue="true",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=4612C799C1274D47A3375DF3A83E7D17,PinName="TextColor",PinToolTip="Text Color\nLinear Color Struttura\n\nIl colore del testo da visualizzare",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.LinearColor'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="(R=0.000000,G=0.660000,B=1.000000,A=1.000000)",AutogeneratedDefaultValue="(R=0.000000,G=0.660000,B=1.000000,A=1.000000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=EBBF38DD44AF4345B527FD06A283A6E0,PinName="Duration",PinToolTip="Duration\nFloat (precisione singola)",PinType.PinCategory="real",PinType.PinSubCategory="float",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="2.000000",AutogeneratedDefaultValue="2.000000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=848FFEC708A449C6B3324C04B5B080BF,PinName="Key",PinToolTip="Key\nNome",PinType.PinCategory="name",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="None",AutogeneratedDefaultValue="None",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
        End Object
    `,
    size: [11.5, 8.5],
    color: Configuration.nodeColors.blue,
    icon: SVGIcon.functionSymbol,
    pins: 8,
    pinNames: [
        "In String",
        "Print to Screen",
        "Print to Log",
        "Text Color",
        "Duration",
        "Key",
    ],
    delegate: false,
    development: true,
    additionalTest: async (node, pins, blueprintPage) => {
        await blueprintPage.page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
        const input = pins[1].locator("ueb-input")
        let value = await input.innerText()
        expect(value).toEqual("Hello")
        expect(await pins[1].evaluate(p => p.entity.DefaultValue.serialize())).toEqual('"Hello"')

        await input.focus()
        await input.evaluate(() => navigator.clipboard.writeText("1\n2"))
        await input.press("Control+V")
        await input.blur()
        expect(await pins[1].evaluate(p => p.entity.DefaultValue.serialize())).toEqual(String.raw`"1\n2"`)

        await input.focus()
        await input.evaluate(() => navigator.clipboard.writeText('a"b"c'))
        await input.press("Control+V")
        await input.blur()
        expect(await pins[1].evaluate(p => p.entity.DefaultValue.serialize())).toEqual(String.raw`"a\"b\"c"`)

        await input.focus()
        await input.evaluate(() => navigator.clipboard.writeText(String.raw`"some \"word\" escaped"`))
        await input.press("Control+V")
        await input.blur()
        expect(await pins[1].evaluate(p => p.entity.DefaultValue.serialize()))
            .toEqual(String.raw`"\"some \\\"word\\\" escaped\""`)

        await input.focus()
        await input.evaluate(() => navigator.clipboard.writeText(String.raw`1'2'3`))
        await input.press("Control+V")
        await input.blur()
        expect(await pins[1].evaluate(p => p.entity.DefaultValue.serialize())).toEqual(String.raw`"1\'2\'3"`)

        await input.focus()
        await input.evaluate(() => navigator.clipboard.writeText("1`2`3"))
        await input.press("Control+V")
        await input.blur()
        expect(await pins[1].evaluate(p => p.entity.DefaultValue.serialize())).toEqual('"1`2`3"')

        await input.focus()
        await input.evaluate(() => navigator.clipboard.writeText(
            String.raw`    alpha + 'beta'${"\n"}text: "gamma"${"\n"}multiline: ${"`\n"}    "Some 'text' \"quoted\"";${"\n`"}`)
        )
        await input.press("Control+V")
        await input.blur()
        expect(await pins[1].evaluate(p => p.entity.DefaultValue.serialize())).toEqual(
            String.raw`"    alpha + \'beta\'\ntext: \"gamma\"\nmultiline: ${"`"}\n    \"Some \'text\' \\\"quoted\\\"\";\n${"`"}"`
        )
    }
})
