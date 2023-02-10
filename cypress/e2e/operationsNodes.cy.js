/// <reference types="cypress" />

import { generateNodeTest } from "../fixtures/testUtilities"
import Configuration from "../../js/Configuration"
import SVGIcon from "../../js/SVGIcon"

const tests = [
    {
        name: "==",
        value: String.raw`
            Begin Object Class=/Script/BlueprintGraph.K2Node_PromotableOperator Name="K2Node_PromotableOperator_0"
                bIsPureFunc=True
                FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/UMG.SlateBlueprintLibrary"',MemberName="EqualEqual_SlateBrush")
                NodePosX=704
                NodePosY=-320
                NodeGuid=F0C20233151743A3A37807274CF6DF61
                CustomProperties Pin (PinId=4E90C9A1D4034AE68B26FF54DEDF4764,PinName="A",PinToolTip="A\nWildcard",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=1E4802AFBB51467083225499C8967FA5,PinName="B",PinToolTip="B\nWildcard",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=F34B818F900A4222BCC1DE111C2C7816,PinName="ReturnValue",PinToolTip="Return Value\nBoolean\n\nReturns whether brushes A and B are identical.",Direction="EGPD_Output",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            End Object
        `,
        color: Configuration.nodeColors.gray,
        icon: SVGIcon.questionMark,
        pins: 4,
        delegate: false,
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