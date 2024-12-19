import Configuration from "../js/Configuration.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Input In (Vector3)",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_17" ExportPath="/Script/UnrealEd.MaterialGraphNode'/Engine/Transient.Material_1:MaterialGraph_0.MaterialGraphNode_17'"
            Begin Object Class=/Script/Engine.MaterialExpressionFunctionInput Name="MaterialExpressionFunctionInput_7" ExportPath="/Script/Engine.MaterialExpressionFunctionInput'/Engine/Transient.Material_1:MaterialGraph_0.MaterialGraphNode_17.MaterialExpressionFunctionInput_7'"
            End Object
            Begin Object Name="MaterialExpressionFunctionInput_7" ExportPath="/Script/Engine.MaterialExpressionFunctionInput'/Engine/Transient.Material_1:MaterialGraph_0.MaterialGraphNode_17.MaterialExpressionFunctionInput_7'"
                Id=2590318028564D9BAF90BEA43FBD3F1F
                MaterialExpressionEditorX=512
                MaterialExpressionEditorY=224
                MaterialExpressionGuid=B0F1358EACAF46E5A277253263F0ECFC
                Material="/Script/Engine.Material'/Engine/Transient.Material_1'"
            End Object
            MaterialExpression="/Script/Engine.MaterialExpressionFunctionInput'MaterialExpressionFunctionInput_7'"
            NodePosX=512
            NodePosY=224
            NodeGuid=7F222623B44A4774BCA3C2F32DD16E98
            CustomProperties Pin (PinId=DD534EE002554330B23E7F4B984A52F5,PinName="Preview",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=22FB979A3F314CBA9B2ABE11214E9827,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.red,
    icon: null,
    pins: 2,
    pinNames: ["Preview"],
    delegate: false,
    development: false,
})
