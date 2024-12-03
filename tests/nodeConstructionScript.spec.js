import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Construction Script",
    value: String.raw`
        Begin Object Class=/Script/BlueprintGraph.K2Node_FunctionEntry Name="K2Node_FunctionEntry_11"
            bEnforceConstCorrectness=False
            FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.Actor"',MemberName="UserConstructionScript")
            NodePosX=16
            NodePosY=-32
            NodeGuid=521B69F742A30F8EA5B92B8CC131AB54
            CustomProperties Pin (PinId=DE073CBD9EE44F4AA43C9BE239BBCB33,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_CallFunction_4248 064F1F38F42D43ADA53BC41AFC6FBE9F,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    color: Configuration.nodeColors.violet,
    icon: SVGIcon.node,
    pins: 1,
    delegate: false,
    development: false,
})
