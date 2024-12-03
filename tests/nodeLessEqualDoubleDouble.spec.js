import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Less equal double double",
    title: "<=",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_PromotableOperator Name="K2Node_PromotableOperator_6" ExportPath=/Script/BlueprintGraph.K2Node_PromotableOperator'"/Temp/Untitled_1.Untitled_1:PersistentLevel.Untitled.EventGraph.K2Node_PromotableOperator_6"'
            bIsPureFunc=True
            FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.KismetMathLibrary"',MemberName="LessEqual_DoubleDouble")
            NodePosX=-128
            NodePosY=-128
            NodeGuid=BE4FB00052224A8AA7695069C0A4A6C0
            CustomProperties Pin (PinId=B83E6D436D73468087242654C1E71F11,PinName="A",PinToolTip="A\nWildcard",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=25C2CC62A0834A07B81E770F3BD41493,PinName="B",PinToolTip="B\nWildcard",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=3E135915A0FE467CBC499FDCAAB3906A,PinName="ReturnValue",PinToolTip="Return Value\nBoolean\n\nReturns true if A is Less than or equal to B (A <= B)",Direction="EGPD_Output",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=708C4E7324034655B5677DAAE057220D,PinName="ErrorTolerance",PinToolTip="Error Tolerance\nWildcard",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [9, 4],
    pins: 3,
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        for (const pin of pins) {
            expect(await pin.evaluate(pin => pin.template.renderIcon().strings.join("")))
                .toStrictEqual(SVGIcon.operationPin.strings.join(""))
        }
    }
})
