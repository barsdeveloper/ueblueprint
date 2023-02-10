/// <reference types="cypress" />

import Configuration from "../../js/Configuration"
import Utility from "../../js/Utility"
import PinElement from "../../js/element/PinElement"
import LinearColorEntity from "../../js/entity/LinearColorEntity"

/** @type {Blueprint} */
let blueprint

before(() => {
    cy.visit(`http://127.0.0.1:${Cypress.env("UEBLUEPRINT_TEST_SERVER_PORT")}/empty.html`)
    cy.get("ueb-blueprint")
        .click(100, 300)
        .then(blueprint => blueprint[0].removeGraphElement(...blueprint[0].getNodes()))
        .then(blueprint => Utility.paste(blueprint[0], String.raw`
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
        `))
})

context("Color picker", () => {

    let color

    it("Can cancel the operation", () => {
        cy.get("ueb-window")
            .should("not.exist")
        cy.contains("ueb-pin", "Tint")
            .then(pin => (color = pin[0].dataset.color, pin))
            .find(".ueb-pin-input")
            .click()
        cy.get("ueb-window")
            .should("exist")
            .contains(Configuration.windowCancelButtonText)
            .click()
            .should("not.exist")
        cy.contains("ueb-pin", "Tint")
            .then(
                /** @param {JQuery<PinElement<LinearColorEntity>>} pin */
                pin => expect(color).to.not.be.undefined.and.to.be.equal(pin[0].getDefaultValue().toString()))
    })

    it("Can close the window", () => {
        cy.get("ueb-window")
            .should("not.exist")
        cy.contains("ueb-pin", "Tint")
            .then(pin => (color = pin[0].dataset.color, pin))
            .find(".ueb-pin-input")
            .click()
        cy.get("ueb-window")
            .should("exist")
            .find(".ueb-window-close")
            .click()
            .should("not.exist")
        cy.contains("ueb-pin", "Tint")
            .then(
                /** @param {JQuery<PinElement<LinearColorEntity>>} pin */
                pin => expect(color).to.not.be.undefined.and.to.be.equal(pin[0].getDefaultValue().toString()))
    })

    it("Ok changes the color", () => {
        cy.get("ueb-window")
            .should("not.exist")
        cy.contains("ueb-pin", "Tint")
            .find(".ueb-pin-input")
            .click()
        cy.get("ueb-window")
            .should("exist")
            .find(".ueb-color-picker-wheel")
            .click("bottom")
        cy.contains("ueb-window *", Configuration.windowApplyButtonText)
            .click()
        cy.get("ueb-window")
            .should("not.exist")
        cy.contains("ueb-pin", "Tint")
            .then(
                /** @param {JQuery<PinElement<LinearColorEntity>>} pin */
                pin => expect(color).to.not.be.undefined.and.to.not.be.equal(pin[0].getDefaultValue().toString()))
    })
})
