import Configuration from "../js/Configuration.js"
import BlueprintFixture from "./fixtures/BlueprintFixture.js"
import { expect, test } from "./fixtures/test.js"

test.describe("Color picker", () => {

    test.beforeAll(async ({ blueprintPage }) => {
        await blueprintPage.removeNodes()
        await blueprintPage.paste(String.raw`
            Begin Object Class=/Script/BlueprintGraph.K2Node_CallFunction Name="K2Node_CallFunction_0"
                FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/UMG.WidgetBlueprintLibrary"',MemberName="DrawBox")
                NodePosX=-528
                NodePosY=16
                NodeGuid=CCD05D4C46B44D439A8A54892EF35583
                CustomProperties Pin (PinId=5FBDA39535314BB8A54233DACD0127B5,PinName="execute",PinToolTip="\nExec",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=50CAADA252984578932EC85ABF55694C,PinName="then",PinToolTip="\nExec",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=55779C53183948C1B4EF08ADB42E06EB,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="Target\nWidget Blueprint Library Object Reference",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/UMG.WidgetBlueprintLibrary"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultObject="/Script/UMG.Default__WidgetBlueprintLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=7EB988E8F2B4448AAE788347A8B1A52A,PinName="Context",PinToolTip="Context\nPaint Context Structure (by ref)",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/UMG.PaintContext"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=True,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=6FC51CC5388D41A19A21A3BBB73D709D,PinName="Position",PinToolTip="Position\nVector 2D Structure",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/CoreUObject.Vector2D"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=CFF6C22A93A44624B9E9D3062A0D2C92,PinName="Size",PinToolTip="Size\nVector 2D Structure",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/CoreUObject.Vector2D"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=0F39A82607874DEBB85E7CF660A8CEE5,PinName="Brush",PinToolTip="Brush\nSlate Brush Asset Object Reference",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.SlateBrushAsset"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=24480A396D474F85A2891846975A2AC6,PinName="Tint",PinToolTip="Tint\nLinear Color Structure",PinType.PinCategory="struct",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/CoreUObject.LinearColor"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="(R=1.000000,G=1.000000,B=1.000000,A=1.000000)",AutogeneratedDefaultValue="(R=1.000000,G=1.000000,B=1.000000,A=1.000000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `)
    })

    /** @param {BlueprintFixture} blueprintPage */
    const getElements = blueprintPage => {
        /** @type {Locator<PinElement>} */
        const tintPin = blueprintPage.blueprintLocator.locator('ueb-pin:has-text("Tint")')
        /** @type {Locator<WindowElement>} */
        const window = blueprintPage.blueprintLocator.locator("ueb-window")
        const input = tintPin.locator(".ueb-pin-input")
        return { tintPin, window, input }
    }

    test("Can cancel the operation", async ({ blueprintPage }) => {
        const { tintPin, window, input } = getElements(blueprintPage)
        await expect(window).toBeHidden()
        const color = await input.evaluate(input => input.dataset.linearColor)
        expect(color).not.toBeUndefined()
        await input.click()
        await expect(window).toBeVisible()
        await window.locator(".ueb-color-picker-wheel").click({ position: { x: 150, y: 60 } })
        await window.getByText(Configuration.windowCancelButtonText).click()
        await expect(window).toBeHidden()
        const newColor = await input.evaluate(input => input.dataset.linearColor)
        expect(newColor).toBe(color)
    })

    test("Can close the window", async ({ blueprintPage }) => {
        const { tintPin, window, input } = getElements(blueprintPage)
        await expect(window).toBeHidden()
        const color = await input.evaluate(input => input.dataset.linearColor)
        await input.click()
        await expect(window).toBeVisible()
        await window.locator(".ueb-color-picker-wheel").click({ position: { x: 150, y: 60 } })
        await window.locator(".ueb-window-close").click()
        await expect(window).toBeHidden()
        const newColor = await input.evaluate(input => input.dataset.linearColor)
        expect(newColor).toBe(color)
    })

    test("Ok changes the color", async ({ blueprintPage }) => {
        const { tintPin, window, input } = getElements(blueprintPage)
        await expect(window).toBeHidden()
        const color = await input.evaluate(input => input.dataset.linearColor)
        await input.click()
        await expect(window).toBeVisible()
        await window.locator(".ueb-color-picker-wheel").click({ position: { x: 150, y: 60 } })
        await window.getByText(Configuration.windowApplyButtonText).click()
        await expect(window).toBeHidden()
        const newColor = await input.evaluate(input => input.dataset.linearColor)
        expect(newColor).not.toBe(color)
    })

    test("Move window", async ({ page, blueprintPage }) => {
        const { tintPin, window, input } = getElements(blueprintPage)
        await expect(window).toBeHidden()
        await input.click()
        const movement = await blueprintPage.move(window.locator(".ueb-window-top"), [-15, 22])
        expect(movement.after[0]).toBe(movement.before[0] - 15)
        expect(movement.after[1]).toBe(movement.before[1] + 22)
    })
})
