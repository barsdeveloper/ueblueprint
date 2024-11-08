import Configuration from "../js/Configuration.js"
import PinElement from "../js/element/PinElement.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Temporal Sobol",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_9" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_9"'
            Begin Object Class=/Script/Engine.MaterialExpressionTemporalSobol Name="MaterialExpressionTemporalSobol_0" ExportPath=/Script/Engine.MaterialExpressionTemporalSobol'"/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_9.MaterialExpressionTemporalSobol_0"'
            End Object
            Begin Object Name="MaterialExpressionTemporalSobol_0" ExportPath=/Script/Engine.MaterialExpressionTemporalSobol'"/Engine/Transient.NewMaterial:MaterialGraph_0.MaterialGraphNode_9.MaterialExpressionTemporalSobol_0"'
                "ConstIndex"=4
                "ConstSeed"=(X=77.000000,Y=55.000000)
                "MaterialExpressionEditorX"=-345
                "MaterialExpressionEditorY"=225
                "MaterialExpressionGuid"=D1A3B12340EE27538A3109B7B3D0E119
                "Material"=/Script/UnrealEd.PreviewMaterial'"/Engine/Transient.NewMaterial"'
            End Object
            "MaterialExpression"=/Script/Engine.MaterialExpressionTemporalSobol'"MaterialExpressionTemporalSobol_0"'
            "NodePosX"=-345
            "NodePosY"=225
            "NodeGuid"=5BE5108B48EB26B6366D4DA6AF99285D
            CustomProperties Pin (PinId=E9B08066434FD243EF8856B11A08588D,PinName="Index",PinType.PinCategory="optional",PinType.PinSubCategory="int",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="4",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=4EB376FB4105AA0CFA52D990C82FE284,PinName="Seed",PinType.PinCategory="optional",PinType.PinSubCategory="rg",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="X=77.000 Y=55.000",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=4A57DE0448EEA04661E83AA561BE2D94,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.green,
    icon: null,
    pins: 3,
    pinNames: [
        "Index",
        "Seed"
    ],
    delegate: false,
    development: false,
    additionalTest: async node => {
        /** @type {Locator<PinElement<IntegerEntity>>} */
        const indexPin = node.locator("ueb-pin").nth(0)
        /** @type {Locator<PinElement<RBSerializationVector2DEntity>>} */
        const seedPin = node.locator("ueb-pin").nth(1)
        expect(await indexPin.evaluate(pin => pin.getDefaultValue().value)).toBe(4)
        const values = await seedPin.evaluate(pin => pin.getDefaultValue().toArray())
        expect(values).toStrictEqual([77, 55])
    }
})
