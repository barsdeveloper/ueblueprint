import Configuration from "../js/Configuration.js"
import PinElement from "../js/element/PinElement.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Constant4Vector",
    title: "4,10.5,2.5e+03,0.33",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_45" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_45"'
            Begin Object Class=/Script/Engine.MaterialExpressionConstant4Vector Name="MaterialExpressionConstant4Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant4Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_45.MaterialExpressionConstant4Vector_1"'
            End Object
            Begin Object Name="MaterialExpressionConstant4Vector_1" ExportPath=/Script/Engine.MaterialExpressionConstant4Vector'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_45.MaterialExpressionConstant4Vector_1"'
                Constant=(R=4.000000,G=10.500000,B=2500.669922,A=0.330000)
                MaterialExpressionEditorX=-2864
                MaterialExpressionEditorY=-1600
                MaterialExpressionGuid=FA680399FB1F40299DCCD649976E2007
                Material=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.M_Brick_Cut_Stone"'
            End Object
            MaterialExpression=/Script/Engine.MaterialExpressionConstant4Vector'"MaterialExpressionConstant4Vector_1"'
            NodePosX=-2864
            NodePosY=-1600
            NodeGuid=E48583AF6A9443409451AADB2BB950D8
            CustomProperties Pin (PinId=053AE05C1AE341DA9DF315E7AD1C181C,PinName="Constant",PinType.PinCategory="optional",PinType.PinSubCategory="rgba",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="(R=4.000000,G=10.500000,B=2500.669922,A=0.330000)",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=DE4B35BE73EA4746848199EF88522E9F,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="rgba",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=68ECEB1DC6FD474285DCD24084C6791D,PinName="Output2",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="red",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=4781E87620764899BAFA52A198FBD3CD,PinName="Output3",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="green",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=447371DFAD4C468993232380A3E37707,PinName="Output4",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="blue",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=AFCF5ADE766948A2889F0FAC51FDA44D,PinName="Output5",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="alpha",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.yellow,
    icon: null,
    pins: 6,
    pinNames: ["Constant"],
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        const r = 4.0
        const g = 10.5
        const b = 2500.669922
        const a = 0.33
        /** @type {Locator<PinElement<LinearColorEntity>>} */
        const pin = pins[0]
        const rgba = await pin.evaluate(node => node.getDefaultValue().toArray())
        expect(rgba[0]).toBeCloseTo(r)
        expect(rgba[1]).toBeCloseTo(g)
        expect(rgba[2]).toBeCloseTo(b)
        expect(rgba[3]).toBeCloseTo(a)
    }
})
