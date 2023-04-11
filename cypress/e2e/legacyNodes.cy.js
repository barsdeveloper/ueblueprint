/// <reference types="cypress" />

import { generateNodeTest } from "../fixtures/testUtilities.js"

const tests = [
    {
        name: "ROS Change Element",
        value: String.raw`
            Begin Object Class=/Script/BlueprintGraph.K2Node_CustomEvent Name="K2Node_CustomEvent_13465"
                Begin Object Class=/Script/Engine.EdGraphPin_Deprecated Name="EdGraphPin_2859957"
                End Object
                Begin Object Class=/Script/Engine.EdGraphPin_Deprecated Name="EdGraphPin_2859956"
                End Object
                Begin Object Class=/Script/Engine.EdGraphPin_Deprecated Name="EdGraphPin_2859955"
                End Object
                Begin Object Name="EdGraphPin_2859957"
                    PinName="Element"
                    Direction=EGPD_Output
                    PinType=(PinCategory="int")
                    LinkedTo(0)=None
                    LinkedTo(1)=None
                End Object
                Begin Object Name="EdGraphPin_2859956"
                    PinName="then"
                    Direction=EGPD_Output
                    PinType=(PinCategory="exec")
                    LinkedTo(0)=None
                End Object
                Begin Object Name="EdGraphPin_2859955"
                    PinName="OutputDelegate"
                    Direction=EGPD_Output
                    PinType=(PinCategory="delegate")
                End Object
                CustomFunctionName="ROS Change Element"
                FunctionFlags=2097344
                NodePosX=-3696
                NodePosY=-128
                ErrorType=1
                NodeGuid=A7AFBC3557734BFDA0D1E917569CA6A1
                CustomProperties Pin (PinId=989B6502AF0240A28DE51122C9F3F5D7,PinName="OutputDelegate",Direction="EGPD_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent=/Script/Engine.BlueprintGeneratedClass'"/Temp/Untitled_1.Untitled_1_C"',MemberName="ROS Change Element",MemberGuid=A7AFBC3557734BFDA0D1E917569CA6A1),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties Pin (PinId=385BD405C63F4EC5B7D55D902D37A6CE,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                CustomProperties UserDefinedPin ()
            End Object
        `,
        pins: 2,
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
