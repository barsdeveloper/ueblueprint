import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Less timespan timespan",
    title: "<",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_PromotableOperator Name="K2Node_PromotableOperator_0" ExportPath=/Script/BlueprintGraph.K2Node_PromotableOperator'"/Temp/Untitled_1.Untitled_1:PersistentLevel.Untitled.EventGraph.K2Node_PromotableOperator_0"'
            bIsPureFunc=True
            FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.KismetMathLibrary"',MemberName="Less_TimespanTimespan")
            NodePosX=-192
            NodePosY=256
            NodeGuid=2CF3423BF9604C71957BE3EFDFD9DAFF
            CustomProperties Pin (PinId=84732B8AE02247EB898E6FB149457E6A,PinName="A",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=8218DDBA01704149AD5FE655CE9FAD07,PinName="B",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=680CD9CFA7924525AFE30B703BD20BD6,PinName="ReturnValue",Direction="EGPD_Output",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [7.5, 4],
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
