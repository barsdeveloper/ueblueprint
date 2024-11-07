import Configuration from "../js/Configuration.js"
import NumberEntity from "../js/entity/NumberEntity.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Constant",
    title: "1e+04",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_41" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_41"'
            Begin Object Class=/Script/Engine.MaterialExpressionConstant Name="MaterialExpressionConstant_0" ExportPath=/Script/Engine.MaterialExpressionConstant'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_41.MaterialExpressionConstant_0"'
            End Object
            Begin Object Name="MaterialExpressionConstant_0" ExportPath=/Script/Engine.MaterialExpressionConstant'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_41.MaterialExpressionConstant_0"'
                R=10000.000000
                MaterialExpressionEditorX=-1328
                MaterialExpressionEditorY=-880
                MaterialExpressionGuid=1149D6828E794743B8343514F4B5E579
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
                bCollapsed=False
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionConstant'"MaterialExpressionConstant_0"'
            NodePosX=-1328
            NodePosY=-880
            NodeGuid=087DAB628E1148BE89BB1DBC720109F1
            CustomProperties Pin (PinId=A4EA20596A6C410598615F5328D298C4,PinName="Value",PinType.PinCategory="optional",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="10000.0",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=99BE24A176124E02830C5F17A7DEF554,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: null,
    pins: 2,
    pinNames: ["Value"],
    delegate: false,
    development: false,
    additionalTest: async node => {
        const value = 10000.0
        /** @type {Locator<PinElement<NumberEntity>>} */
        const pin = node.locator("ueb-pin").first()
        expect(await pin.evaluate(pin => pin.getDefaultValue().valueOf())).toBeCloseTo(value)
        await expect(node.locator("ueb-input")).toHaveText([NumberEntity.printNumber(value)])
    }
})
