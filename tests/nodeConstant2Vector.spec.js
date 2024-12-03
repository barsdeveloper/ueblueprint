import Configuration from "../js/Configuration.js"
import PinElement from "../js/element/PinElement.js"
import NumberEntity from "../js/entity/NumberEntity.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Constant2Vector",
    title: "0.1,23.9",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_42" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_42"'
            Begin Object Class=/Script/Engine.MaterialExpressionConstant2Vector Name="MaterialExpressionConstant2Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant2Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_42.MaterialExpressionConstant2Vector_1"'
            End Object
            Begin Object Name="MaterialExpressionConstant2Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant2Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_42.MaterialExpressionConstant2Vector_1"'
                R=0.100000
                G=23.888880
                MaterialExpressionEditorX=-1312
                MaterialExpressionEditorY=-1312
                MaterialExpressionGuid=E1302404B22A4D66BB39F9C2652EA0A5
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionConstant2Vector'"MaterialExpressionConstant2Vector_1"'
            NodePosX=-1312
            NodePosY=-1312
            NodeGuid=50998E65A4E54B04A39EADA323DEEEE0
            CustomProperties Pin (PinId=F0B9EDE0763E414096FA82A0C1D3B3D3,PinName="X",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.1",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A5A2FCBE348D4075A3F7FCAD9299C9CB,PinName="Y",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="23.88888",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=FF6B0DF61B3849DEA00B539430E73C90,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=68FF49DB3534433CB8A7486036E434B7,PinName="Output2",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A98F7CB8EB5D467D8E2217BF4A1AFA71,PinName="Output3",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.yellow,
    icon: null,
    pins: 5,
    pinNames: ["X", "Y"],
    delegate: false,
    development: false,
    additionalTest: async node => {
        const x = 0.1
        const y = 23.88888
        /** @type {Locator<PinElement<NumberEntity>>} */
        const xPin = node.locator("ueb-pin").nth(0)
        /** @type {Locator<PinElement<NumberEntity>>} */
        const yPin = node.locator("ueb-pin").nth(1)
        expect(await xPin.evaluate(pin => pin.getDefaultValue().valueOf())).toBeCloseTo(x)
        expect(await yPin.evaluate(pin => pin.getDefaultValue().valueOf())).toBeCloseTo(y)
        await expect(node.locator("ueb-input")).toHaveText([NumberEntity.printNumber(x), NumberEntity.printNumber(y)])
    }
})
