import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "UseDepthBiasedAlpha",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_1" ExportPath="/Script/UnrealEd.MaterialGraphNode'/Engine/Transient.M_EV_FalloffSphere_Master_01:MaterialGraph_0.MaterialGraphNode_1'"
            Begin Object Class=/Script/Engine.MaterialExpressionStaticSwitchParameter Name="MaterialExpressionStaticSwitchParameter_0" ExportPath="/Script/Engine.MaterialExpressionStaticSwitchParameter'/Engine/Transient.M_EV_FalloffSphere_Master_01:MaterialGraph_0.MaterialGraphNode_1.MaterialExpressionStaticSwitchParameter_0'"
            End Object
            Begin Object Name="MaterialExpressionStaticSwitchParameter_0" ExportPath="/Script/Engine.MaterialExpressionStaticSwitchParameter'/Engine/Transient.M_EV_FalloffSphere_Master_01:MaterialGraph_0.MaterialGraphNode_1.MaterialExpressionStaticSwitchParameter_0'"
                A=(Expression="/Script/Engine.MaterialExpressionDepthFade'MaterialExpressionDepthFade_14'")
                B=(Expression="/Script/Engine.MaterialExpressionClamp'MaterialExpressionClamp_4'")
                ParameterName="UseDepthBiasedAlpha"
                ExpressionGUID=A98669E9462B7E6612CF93B055A7A463
                MaterialExpressionEditorX=-192
                MaterialExpressionEditorY=80
                MaterialExpressionGuid=9D794A6744E0E3E14AE3D591EDA26066
                Material="/Script/UnrealEd.PreviewMaterial'/Engine/Transient.M_EV_FalloffSphere_Master_01'"
            End Object
            MaterialExpression="/Script/Engine.MaterialExpressionStaticSwitchParameter'MaterialExpressionStaticSwitchParameter_0'"
            NodePosX=-192
            NodePosY=80
            bCanRenameNode=True
            NodeGuid=89C3972A02314DC8A228AB85296ECA16
            CustomProperties Pin (PinId=23E012B58ADF4CF68CA0999863D5163F,PinName="True",PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(MaterialGraphNode_22 D118252F518B41C6A3C0547D4373C8D2,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=284ACC75E7314F9CBD42D10EF5FBD72E,PinName="False",PinType.PinCategory="required",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(MaterialGraphNode_3 25011B470F774D60A90AAF331D1D007D,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=DA812709AA7249B5B20C36C2B9416C05,PinName="Default Value",PinType.PinCategory="optional",PinType.PinSubCategory="bool",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="false",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=DF5352C192C74D44A5C0ABEEA4676022,PinName="Output",PinFriendlyName=NSLOCTEXT("MaterialGraphNode", "Space", " "),Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(MaterialGraphNode_Root_0 5174BC871BCF4E68A56F055BCFD12053,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [11, 9],
    icon: null,
    pins: 4,
    delegate: false,
    development: false,
    variadic: false,
    additionalTest: async (node, pins) => {
        for (const pin of pins) {
            expect(await pin.evaluate(pin => pin.template.renderIcon().strings.join("")))
                .toStrictEqual(SVGIcon.genericPin.strings.join(""))
        }
    }
})
