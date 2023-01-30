/// <reference types="cypress" />

import Blueprint from "../../../js/Blueprint"
import Configuration from "../../../js/Configuration"
import getFirstWordOrder from "../../fixtures/getFirstWordOrder"
import NodeElement from "../../../js/element/NodeElement"
import SVGIcon from "../../../js/SVGIcon"
import Utility from "../../../js/Utility"

/** @type {Blueprint} */
let blueprint

before(() => {
    cy.visit(`http://127.0.0.1:${Cypress.env("UEBLUEPRINT_TEST_SERVER_PORT")}/empty.html`, {
        onLoad: () => {
            cy.get("ueb-blueprint")
                .then(b => blueprint = b[0])
                .click(100, 300)
        }
    })
})

context("Is Valid", () => {
    /** @type {NodeElement} */
    let node

    before(() => {
        blueprint.removeGraphElement(...blueprint.getNodes())
        Utility.paste(blueprint, String.raw`
            Begin Object Class=/Script/BlueprintGraph.K2Node_MacroInstance Name="K2Node_MacroInstance_0"
                MacroGraphReference=(MacroGraph=/Script/Engine.EdGraph'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:IsValid"',GraphBlueprint=/Script/Engine.Blueprint'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros"',GraphGuid=64422BCD430703FF5CAEA8B79A32AA65)
                NodePosX=-656
                NodePosY=304
                NodeGuid=4CE17DC3398743D3A0DF641B28BA82FE
                CustomProperties Pin (PinId=8E6B4EA9EF3D418A9017555312A36415,PinName="exec",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=18F0CDCFCDFC49FC92EABDFD77FB2649,PinName="InputObject",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/CoreUObject.Object"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=B4E31AA12E8D448C8A19F523C10F8527,PinName="Is Valid",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=49E3CCDD6EBB46AE9B6FDFBC951E092C,PinName="Is Not Valid",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `)
        node = blueprint.querySelector("ueb-node")
    })
    it("is gray", () => expect(node.entity.nodeColor()).to.be.deep.equal(Configuration.nodeColors.gray))
    it("has no delegate", () => expect(node.querySelector('.ueb-node-top ueb-pin[data-type="delegate"]')).to.be.null)
    it("is called Is Valid", () => expect(node.getNodeDisplayName()).to.be.equal("Is Valid"))
    it("has a question mark icon", () => expect(node.entity.nodeIcon()).to.be.deep.equal(SVGIcon.questionMark))
    it("has 4 pins", () => expect(node.querySelectorAll("ueb-pin")).to.be.lengthOf(4))
    it("is not development only", () => expect(node.entity.isDevelopmentOnly()).to.be.false)
    it("maintains the order of attributes", () => {
        blueprint.selectAll()
        const value = blueprint.template.getCopyInputObject().getSerializedText()
        expect(value).to.match(getFirstWordOrder([
            "MacroGraphReference",
            "NodePosX",
            "NodePosY",
            "NodeGuid",
            "CustomProperties",
            "CustomProperties",
            "CustomProperties",
            "CustomProperties",
        ]))
    })
})
