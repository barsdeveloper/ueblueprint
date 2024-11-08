import Configuration from "../js/Configuration.js"
import PinElement from "../js/element/PinElement.js"
import NumberEntity from "../js/entity/NumberEntity.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Constant3Vector",
    title: "0.00432,123,7.66e+09",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_40" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40"'
            Begin Object Class=/Script/Engine.MaterialExpressionConstant3Vector Name="MaterialExpressionConstant3Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant3Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40.MaterialExpressionConstant3Vector_1"'
            End Object
            Begin Object Name="MaterialExpressionConstant3Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant3Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40.MaterialExpressionConstant3Vector_1"'
                Constant=(R=0.004320,G=123.199997,B=7657650176.000000,A=0.000000)
                MaterialExpressionEditorX=-2592
                MaterialExpressionEditorY=-688
                MaterialExpressionGuid=6854D92803B449F79902FC5BE6D244F9
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_1"'
            NodePosX=-2592
            NodePosY=-688
            NodeGuid=A166C6EF5D5D4C298F8549BFCD353E30
            CustomProperties Pin (PinId=8CFCA073717A4E7795F803C9A3F3ADA6,PinName="Constant",PinType.PinCategory="optional",PinType.PinSubCategory="rgb",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="0.00432,123.199997,7657650176.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=CD2387366A1745BA9A1F861F7698480A,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=F1B3B937A4074949AA46A2D9743D51A1,PinName="Output2",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=2EE41C91F9B841ADA834AA42D10ADE20,PinName="Output3",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=A4B265999B284DB0A5175E969C471A17,PinName="Output4",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="blue",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.yellow,
    icon: null,
    pins: 5,
    pinNames: ["Constant"],
    delegate: false,
    development: false,
    additionalTest: async node => {
        /** @type {Locator<PinElement<VectorEntity>>} */
        const input = node.locator("ueb-pin").first()
        const values = await input.evaluate(pin => pin.getDefaultValue().toArray())
        const expected = [0.00432, 123.199997, 7657650176.0]
        expected.forEach((v, i) => expect(v).toBeCloseTo(values[i]))
        await expect(input.locator("ueb-input")).toHaveText(expected.map(v => NumberEntity.printNumber(v)))
    }
})
