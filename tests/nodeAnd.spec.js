import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "AND",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_CommutativeAssociativeBinaryOperator Name="K2Node_CommutativeAssociativeBinaryOperator_0" ExportPath=/Script/BlueprintGraph.K2Node_CommutativeAssociativeBinaryOperator'"/Temp/Untitled_1.Untitled_1:PersistentLevel.Untitled.EventGraph.K2Node_CommutativeAssociativeBinaryOperator_0"'
            bIsPureFunc=True
            FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.KismetMathLibrary"',MemberName="BooleanAND")
            NodePosX=-128
            NodePosY=240
            NodeGuid=9E1635738D62423D9FD5F68526C4C6BF
            CustomProperties Pin (PinId=DDE978511D404B33BC2B8FE6546ED348,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinToolTip="Target\nKismet Math Library Object Reference",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.KismetMathLibrary"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultObject="/Script/Engine.Default__KismetMathLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=651536110BC540B8902A00F40231EC0E,PinName="A",PinToolTip="A\nBoolean",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",AutogeneratedDefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=AD6A19CF20A24DAB9D04A29222CFC7A4,PinName="B",PinToolTip="B\nBoolean",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",AutogeneratedDefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=6CB3B4F8E6B245FDAC6C8EBB4C7255CA,PinName="ReturnValue",PinToolTip="Return Value\nBoolean\n\nReturns the logical AND of two values (A AND B)",Direction="EGPD_Output",PinType.PinCategory="bool",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",AutogeneratedDefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [12, 5],
    pins: 3,
    delegate: false,
    development: false,
    variadic: true,
    additionalTest: async (node, pins, blueprintPage) => {
        for (const pin of pins) {
            expect(await pin.evaluate(pin => pin.template.renderIcon().strings.join("")))
                .toStrictEqual(SVGIcon.operationPin.strings.join(""))
        }
        let inputs = await node.locator(".ueb-pin-input").all()
        for (const input of inputs) {
            expect(await input.isChecked()).toBeFalsy()
        }
        await inputs[inputs.length - 1].check()
        expect(await inputs[inputs.length - 1].isChecked()).toBeTruthy()
        const variadic = blueprintPage.node.getByText("Add pin")
        await variadic.click()
        inputs = await node.locator(".ueb-pin-input").all()
        await inputs[inputs.length - 2].uncheck()
        for (const input of inputs) {
            expect(await input.isChecked()).toBeFalsy()
        }
    }
})
