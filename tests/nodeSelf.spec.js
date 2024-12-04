import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Self",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_Self Name="K2Node_Self_0" ExportPath="/Script/BlueprintGraph.K2Node_Self'/Temp/Untitled_1.Untitled_1:PersistentLevel.Untitled.EventGraph.K2Node_Self_0'"
            NodePosX=224
            NodePosY=848
            NodeGuid=70A71735B5F247699242DBC67A166772
            CustomProperties Pin (PinId=3B41006840BA3918576575AC4419E030,PinName="self",Direction="EGPD_Output",PinType.PinCategory="object",PinType.PinSubCategory="self",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_CallFunction_1 C3A04D2142AC39C30B0A62876AF7ECC8,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [8, 2.5],
    pins: 1,
    delegate: false,
    development: false,
    additionalTest: async node => {
        expect(await (node.evaluate(n => n.classList.contains("ueb-node-style-getter")))).toBeTruthy()
    }
})
