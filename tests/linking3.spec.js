import { expect, test } from "./fixtures/test.js"

test("Linking 3", async ({ blueprintPage }) => {
    const source = String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_25" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_25'"
            NodePosX=976
            NodePosY=288
            NodeGuid=CF9256F15B564DB0B289FDB4704A2290
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_8 47E4D9AF4CD414564F484A96E876E80B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_27" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_27'"
            NodePosX=1232
            NodePosY=288
            NodeGuid=43A2EF73BD644DD382666D7AC1FB6075
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_8 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_35 47E4D9AF4CD414564F484A96E876E80B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_8" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_8'"
            NodePosX=1120
            NodePosY=288
            NodeGuid=E3B195FA61CC499A9B34F07F5F5A6CCE
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_25 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_27 47E4D9AF4CD414564F484A96E876E80B,K2Node_Knot_38 47E4D9AF4CD414564F484A96E876E80B,K2Node_Knot_40 47E4D9AF4CD414564F484A96E876E80B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_35" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_35'"
            NodePosX=1376
            NodePosY=288
            NodeGuid=60EA1A96C0B544C1A23FE8E43E93C5A9
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_27 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_38" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_38'"
            NodePosX=1232
            NodePosY=336
            NodeGuid=C85E3544423E44F4A7097FB732C2EA9F
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_8 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_39 47E4D9AF4CD414564F484A96E876E80B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_39" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_39'"
            NodePosX=1376
            NodePosY=336
            NodeGuid=EBFD7E66E2564FB6B72CD6B9609F2584
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_38 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_40" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_40'"
            NodePosX=1232
            NodePosY=384
            NodeGuid=DE79DE02C598433FA7F3ED8EB016E9E2
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_8 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_41 47E4D9AF4CD414564F484A96E876E80B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_41" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/NewWorld.NewWorld:PersistentLevel.NewWorld.EventGraph.K2Node_Knot_41'"
            NodePosX=1376
            NodePosY=384
            NodeGuid=033ED30A27A7469CA482FDE433792DD8
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Knot_40 009095D54E2C15EBBB57DC9098EC7D8B,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class="/Script/BlueprintGraph.K2Node_VariableGet" Name="K2Node_VariableGet_131" ExportPath=/Script/BlueprintGraph.K2Node_VariableGet'"/Game/StarterContent/Blueprints/Blueprint_WallSconce.Blueprint_WallSconce:UserConstructionScript.K2Node_VariableGet_131"'
            VariableReference=(MemberName="Color",MemberGuid=AAEC3E9C476A2187972DDE8D142A814B,bSelfContext=True)
            NodePosX=768
            NodePosY=272
            NodeGuid=5BE70A964537A1F13BE2489B0DC06370
            CustomProperties Pin (PinId=E11890DA93464F48A6221977085C4549,PinName="Color",Direction="EGPD_Output",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/CoreUObject.LinearColor"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=506366A2BD594C01A714D4B3A4B67508,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/Engine.BlueprintGeneratedClass'"/Game/StarterContent/Blueprints/Blueprint_WallSconce.Blueprint_WallSconce_C"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `
    const nodes = blueprintPage.blueprintLocator.locator("ueb-node")
    const knots = blueprintPage.blueprintLocator.locator('ueb-node[data-type="/Script/BlueprintGraph.K2Node_Knot"]')
    const links = blueprintPage.blueprintLocator.locator("ueb-link")
    const mouse = blueprintPage.page.mouse
    const wildcardColor = "128, 120, 120"
    const blueColor = "0, 88, 200"

    /** @type {(i: Number) => Locator<NodeElement>} */
    const getNode = i => blueprintPage.blueprintLocator.locator("ueb-node").nth(i)
    const link = async (origin, target) => {
        await origin.hover()
        await mouse.down()
        await mouse.move(100, 100, { steps: 4 })
        await target.hover()
        await mouse.up()
    }
    /** @param {NodeElement} n */
    const getKnotColors = n => {
        const template = /** @type {KnotNodeTemplate} */(n.template)
        return [
            template.inputPin.entity.pinColor().toString(),
            template.inputPin.color.toString(),
            template.outputPin.entity.pinColor().toString(),
            template.outputPin.color.toString(),
        ]
    }

    await expect(nodes).toHaveCount(0)
    await expect(knots).toHaveCount(0)
    await expect(links).toHaveCount(0)

    await blueprintPage.paste(source)
    await blueprintPage.blueprintLocator.evaluate(b => b.template.centerContentInViewport(false))

    await expect(nodes).toHaveCount(9)
    await expect(knots).toHaveCount(8)
    await expect(links).toHaveCount(7)

    const knotsCount = await knots.count()
    for (let i = 0; i < knotsCount; ++i) {
        expect(await knots.nth(i).evaluate(getKnotColors)).toEqual(Array(4).fill(wildcardColor))
    }

    const linksCount = await links.count()
    for (let i = 0; i < linksCount; ++i) {
        /** @type {Locator<LinkElement>} */
        const link = links.nth(i)
        expect(await link.evaluate(l => l.color.toString())).toEqual(wildcardColor)
    }

    await link(blueprintPage.blueprintLocator.locator("ueb-pin").getByText("Color", { exact: true }), knots.nth(0))
    await expect(links).toHaveCount(8)
    for (let i = 0; i < knotsCount; ++i) {
        expect(await knots.nth(i).evaluate(getKnotColors)).toEqual(Array(4).fill(blueColor))
    }
    for (let i = 0; i < linksCount; ++i) {
        /** @type {Locator<LinkElement>} */
        const link = links.nth(i)
        expect(await link.evaluate(l => l.color.toString())).toEqual(blueColor)
    }
    await links.evaluateAll(ls => ls.forEach(l => l.remove()))
    for (let i = 0; i < knotsCount; ++i) {
        expect(await knots.nth(i).evaluate(getKnotColors)).toEqual(Array(4).fill(wildcardColor))
    }
    await expect(links).toHaveCount(0)
})
