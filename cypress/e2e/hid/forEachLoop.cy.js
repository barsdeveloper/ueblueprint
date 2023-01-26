/// <reference types="cypress" />

import Blueprint from "../../../js/Blueprint"
import Configuration from "../../../js/Configuration"
import getFirstWordOrder from "../../fixtures/getFirstWordOrder"
import NodeElement from "../../../js/element/NodeElement"
import SVGIcon from "../../../js/SVGIcon"
import Utility from "../../../js/Utility"

describe("For Each Loop", () => {

    context("Tests", () => {
        /** @type {NodeElement} */
        let node
        /** @type {Blueprint} */
        let blueprint

        before(() => {
            cy.visit(`http://127.0.0.1:${Cypress.env("UEBLUEPRINT_TEST_SERVER_PORT")}/empty.html`)
            cy.get("ueb-blueprint")
                .then(b => blueprint = b[0])
                .click(100, 300)
                .then(() => Utility.paste(blueprint, String.raw`
                    Begin Object Class=/Script/BlueprintGraph.K2Node_MacroInstance Name="K2Node_MacroInstance_0"
                        MacroGraphReference=(MacroGraph=/Script/Engine.EdGraph'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop"',GraphBlueprint=/Script/Engine.Blueprint'"/Engine/EditorBlueprintResources/StandardMacros.StandardMacros"',GraphGuid=99DBFD5540A796041F72A5A9DA655026)
                        NodePosX=-576
                        NodePosY=112
                        NodeGuid=0E4CA93E7C804825BE9D71A479196FDA
                        CustomProperties Pin (PinId=0BA3B2464C7648A8B4DAC1E14FBBF7B5,PinName="Exec",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=7D762D06E33240719C8465424F6DBA71,PinName="Array",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=Array,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=65DB5BDA2BF84FB5B293984140BB0434,PinName="LoopBody",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=339DF1FA8CDD473782B4B0F50F431639,PinName="Array Element",Direction="EGPD_Output",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=E7620BC02CB6423DB3B2B9771CF8DC60,PinName="Array Index",Direction="EGPD_Output",PinType.PinCategory="int",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=8826526C2F8D474AB32DCF6446194BD6,PinName="Completed",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                    End Object
                `))
                .then(() => node = blueprint.querySelector("ueb-node"))
        })
        it("is gray", () => expect(Configuration.nodeColor(node)).to.be.equal(Configuration.nodeColors.gray))
        it("has no delegate", () => expect(node.querySelector('.ueb-node-top ueb-pin[data-type="delegate"]')).to.be.null)
        it("is called For Each Loop", () => expect(node.getNodeDisplayName()).to.be.equal("For Each Loop"))
        it("has a specific icon", () => expect(Configuration.nodeIcon(node)).to.be.equal(SVGIcon.forEachLoop))
        it("has 6 pins", () => expect(node.querySelectorAll("ueb-pin")).to.be.lengthOf(6))
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
                "CustomProperties",
                "CustomProperties",
            ]))
        })
    })
})
