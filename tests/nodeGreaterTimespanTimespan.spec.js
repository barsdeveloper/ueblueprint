import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Greater timespan timespan",
    title: ">",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_PromotableOperator Name="K2Node_PromotableOperator_3" ExportPath=/Script/BlueprintGraph.K2Node_PromotableOperator'"/Temp/Untitled_1.Untitled_1:PersistentLevel.Untitled.EventGraph.K2Node_PromotableOperator_3"'
            "bIsPureFunc"=True
            "FunctionReference"=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.KismetMathLibrary"',MemberName="Greater_TimespanTimespan")
            "NodePosX"=-288
            "NodePosY"=256
            "NodeGuid"=F7FABC9C44966BAAC491D4AE6E588CCC
            CustomProperties Pin (PinId=E5B7684F4812610A60F5E8A1217BD592,PinName="A",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=62516570444A943984F804A683C737A1,PinName="B",PinType.PinCategory="wildcard",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=58F3E9EC42933068D0F9B493EB7C1F16,PinName="ReturnValue",Direction="EGPD_Output",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
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
