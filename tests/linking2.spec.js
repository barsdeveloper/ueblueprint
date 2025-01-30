import { expect, test } from "./fixtures/test.js"

test("Linking 2", async ({ blueprintPage }) => {
    const source = String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_6" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/Examples/Tag/Blueprints/DirectionDistanceObserver.DirectionDistanceObserver:GetObservationSpace.K2Node_Knot_6'"
            NodePosX=816
            NodePosY=256
            NodeGuid=E8BC1D254BC44CC5E7076388BC697D41
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_7" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/Examples/Tag/Blueprints/DirectionDistanceObserver.DirectionDistanceObserver:GetObservationSpace.K2Node_Knot_7'"
            NodePosX=1088
            NodePosY=256
            NodeGuid=E8BC1D254BC44CC5E7076388BC697D41
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_8" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/Examples/Tag/Blueprints/DirectionDistanceObserver.DirectionDistanceObserver:GetObservationSpace.K2Node_Knot_8'"
            NodePosX=832
            NodePosY=448
            NodeGuid=E8BC1D254BC44CC5E7076388BC697D41
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
        Begin Object Class=/Script/BlueprintGraph.K2Node_Knot Name="K2Node_Knot_5" ExportPath="/Script/BlueprintGraph.K2Node_Knot'/Game/Examples/Tag/Blueprints/DirectionDistanceObserver.DirectionDistanceObserver:GetObservationSpace.K2Node_Knot_5'"
            NodePosX=1088
            NodePosY=464
            NodeGuid=E8BC1D254BC44CC5E7076388BC697D41
            CustomProperties Pin (PinId=47E4D9AF4CD414564F484A96E876E80B,PinName="InputPin",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=True,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=009095D54E2C15EBBB57DC9098EC7D8B,PinName="OutputPin",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `
    await blueprintPage.paste(source)
    /** @type {(i: Number) => Locator<NodeElement>} */
    const getKnot = i => blueprintPage.blueprintLocator.locator("ueb-node").nth(i)
    const getRect = async i => await getKnot(i).evaluate(pin => pin.getBoundingClientRect())
    let rect = await getRect(0)
    const knotSize = [rect.width / 2, rect.height / 2]
    await blueprintPage.blueprintLocator.evaluate(b => b.template.centerContentInViewport(false))
    const mouse = blueprintPage.page.mouse
    const link = async (origin, target) => {
        await origin.hover()
        await mouse.down()
        await mouse.move(100, 100, { steps: 4 })
        await target.hover()
        await mouse.up()
    }

    await expect(blueprintPage.blueprintLocator.locator("ueb-node")).toHaveCount(4)
    await expect(blueprintPage.blueprintLocator.locator("ueb-link")).toHaveCount(0)

    let a = getKnot(0)
    let b = getKnot(1)
    await link(a, b)
    await expect(blueprintPage.blueprintLocator.locator("ueb-node")).toHaveCount(4)
    await expect(blueprintPage.blueprintLocator.locator("ueb-link")).toHaveCount(1)
    expect((await a.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).inputPin.isLinked))).toBeFalsy()
    expect((await a.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).outputPin.isLinked))).toBeTruthy()
    expect((await b.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).inputPin.isLinked))).toBeTruthy()
    expect((await b.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).outputPin.isLinked))).toBeFalsy()

    a = getKnot(3)
    b = getKnot(2)
    await link(a, b)
    await expect(blueprintPage.blueprintLocator.locator("ueb-node")).toHaveCount(4)
    await expect(blueprintPage.blueprintLocator.locator("ueb-link")).toHaveCount(2)
    expect((await a.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).inputPin.isLinked))).toBeTruthy()
    expect((await a.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).outputPin.isLinked))).toBeFalsy()
    expect((await b.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).inputPin.isLinked))).toBeFalsy()
    expect((await b.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).outputPin.isLinked))).toBeTruthy()

    a = getKnot(3)
    b = getKnot(0)
    await link(a, b)
    await expect(blueprintPage.blueprintLocator.locator("ueb-node")).toHaveCount(4)
    await expect(blueprintPage.blueprintLocator.locator("ueb-link")).toHaveCount(2)
    expect((await a.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).inputPin.isLinked))).toBeTruthy()
    expect((await a.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).outputPin.isLinked))).toBeFalsy()
    expect((await b.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).inputPin.isLinked))).toBeFalsy()
    expect((await b.evaluate(n => /** @type {KnotNodeTemplate} */(n.template).outputPin.isLinked))).toBeTruthy()

})
