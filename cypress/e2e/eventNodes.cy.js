/// <reference types="cypress" />

import { generateNodeTest } from "../fixtures/testUtilities"
import Blueprint from "../../js/Blueprint"
import Configuration from "../../js/Configuration"
import SVGIcon from "../../js/SVGIcon"

const tests = [
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
        color: Configuration.nodeColors.red,
        icon: SVGIcon.event,
        pins: 2,
        delegate: true,
        development: false,
    },
]

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

tests.forEach(
    testObject => generateNodeTest(testObject, () => blueprint)
)
