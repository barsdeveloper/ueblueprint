import Configuration from "../js/Configuration.js"
import SVGIcon from "../js/SVGIcon.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "PCG Branch",
    title: "Branch",
    value: String.raw`
        Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="PCGEditorGraphNode_2" ExportPath="/Script/PCGEditor.PCGEditorGraphNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2'"
            Begin Object Class=/Script/PCG.PCGNode Name="Branch_2" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2'"
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_4" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_4'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_3'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_2'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_1'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_0'"
                End Object
                Begin Object Class=/Script/PCG.PCGBranchSettings Name="PCGBranchSettings_0" ExportPath="/Script/PCG.PCGBranchSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGBranchSettings_0'"
                End Object
            End Object
            Begin Object Name="Branch_2" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2'"
                Begin Object Name="PCGPin_4" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_4'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.Branch_2'"
                    Properties=(Label="Output B",Tooltip=NSLOCTEXT("FPCGBranchElement", "OutputPinTooltipB", "Will only route input if \'Output To B\' (overridable) is true"))
                End Object
                Begin Object Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_3'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.Branch_2'"
                    Properties=(Label="Output A",Tooltip=NSLOCTEXT("FPCGBranchElement", "OutputPinTooltipA", "Will only route input if \'Output To B\' (overridable) is false"))
                End Object
                Begin Object Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_2'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.Branch_2'"
                    Properties=(Label="Output to B",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", "bool", "bOutputToB"))
                End Object
                Begin Object Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_1'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.Branch_2'"
                    Properties=(Label="Overrides",AllowedTypes=Param,bAdvancedPin=True,Tooltip=NSLOCTEXT("PCGSettings", "GlobalParamPinTooltip", "Atribute Set containing multiple parameters to override. Names must match perfectly."))
                End Object
                Begin Object Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGPin_0'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.Branch_2'"
                    Properties=(Label="In")
                End Object
                Begin Object Name="PCGBranchSettings_0" ExportPath="/Script/PCG.PCGBranchSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.Branch_2.PCGBranchSettings_0'"
                    Seed=-420875123
                    CachedOverridableParams(0)=(Label="Output to B",PropertiesNames=("bOutputToB"),PropertyClass="/Script/CoreUObject.Class'/Script/PCG.PCGBranchSettings'")
                End Object
                PositionX=384
                PositionY=128
                SettingsInterface="/Script/PCG.PCGBranchSettings'PCGBranchSettings_0'"
                InputPins(0)="/Script/PCG.PCGPin'PCGPin_0'"
                InputPins(1)="/Script/PCG.PCGPin'PCGPin_1'"
                InputPins(2)="/Script/PCG.PCGPin'PCGPin_2'"
                OutputPins(0)="/Script/PCG.PCGPin'PCGPin_3'"
                OutputPins(1)="/Script/PCG.PCGPin'PCGPin_4'"
            End Object
            PCGNode="/Script/PCG.PCGNode'Branch_2'"
            NodePosX=384
            NodePosY=128
            AdvancedPinDisplay=Shown
            bUserSetEnabledState=True
            NodeGuid=BCEBB6C85A8844F2B06322DF95805CB5
            CustomProperties Pin (PinId=4CBC2755317F47F7BA23B7E928C7A436,PinName="In",PinFriendlyName="In",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=390B992FE20D4AAAB63EC14DE8732AD2,PinName="Overrides",PinFriendlyName="Overrides",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=15D942E8E7C640719B71544BBEA5365D,PinName="Output to B",PinFriendlyName="Output To B",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=9397BA7C5D694D9FB070B353BB26BA57,PinName="Output A",PinFriendlyName="Output A",Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=32167D5DBA9A4498B162B90B0F16A191,PinName="Output B",PinFriendlyName="Output B",Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [13, 9],
    color: Configuration.nodeColors.intenseGreen,
    pins: 5,
    pinNames: ["In", "Overrides", "Output To B", "Output A", "Output B"],
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        expect(await pins[0].evaluate(pin => pin.template.renderIcon().strings.join("")))
            .toEqual(SVGIcon.pcgStackPin.strings.join(""))
        expect(await pins[0].evaluate(pin => pin.entity.pinColor().cssText)).toEqual("132, 132, 132")
        expect(await pins[1].evaluate(pin => pin.template.renderIcon().strings.join("")))
            .toEqual(SVGIcon.pcgParamPin.strings.join(""))
        expect(await pins[2].evaluate(pin => pin.template.renderIcon().strings.join("")))
            .toEqual(SVGIcon.pcgParamPin.strings.join(""))
        expect(await pins[3].evaluate(pin => pin.template.renderIcon().strings.join("")))
            .toEqual(SVGIcon.pcgPin.strings.join(""))
        expect(await pins[3].evaluate(pin => pin.entity.pinColor().cssText)).toEqual("132, 132, 132")
        expect(await pins[4].evaluate(pin => pin.template.renderIcon().strings.join("")))
            .toEqual(SVGIcon.pcgPin.strings.join(""))
        expect(await pins[4].evaluate(pin => pin.entity.pinColor().cssText)).toEqual("132, 132, 132")
    }
})
