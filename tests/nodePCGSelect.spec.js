import { css } from "lit"
import Configuration from "../js/Configuration.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "PCG Select",
    title: "Select",
    value: String.raw`
        Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="PCGEditorGraphNode_0" ExportPath="/Script/PCGEditor.PCGEditorGraphNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0'"
            Begin Object Class=/Script/PCG.PCGNode Name="Select_1" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1'"
                Begin Object Class=/Script/PCG.PCGBooleanSelectSettings Name="PCGBooleanSelectSettings_0" ExportPath="/Script/PCG.PCGBooleanSelectSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGBooleanSelectSettings_0'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_0'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_1'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_2'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_3'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_4" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_4'"
                End Object
            End Object
            Begin Object Name="Select_1" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1'"
                Begin Object Name="PCGBooleanSelectSettings_0" ExportPath="/Script/PCG.PCGBooleanSelectSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGBooleanSelectSettings_0'"
                    Seed=-764420405
                    CachedOverridableParams(0)=(Label="Use Input B",PropertiesNames=("bUseInputB"),PropertyClass="/Script/CoreUObject.Class'/Script/PCG.PCGBooleanSelectSettings'")
                End Object
                Begin Object Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_0'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_0.Select_1'"
                    Properties=(Label="Input A",Tooltip=NSLOCTEXT("FPCGBooleanSelectElement", "FirstInputPinTooltip", "Will only be used if \'Use Input B\' (overridable) is false"))
                End Object
                Begin Object Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_1'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_0.Select_1'"
                    Properties=(Label="Input B",Tooltip=NSLOCTEXT("FPCGBooleanSelectElement", "SecondInputPinTooltip", "Will only be used if \'Use Input B\' (overridable) is true"))
                End Object
                Begin Object Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_2'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_0.Select_1'"
                    Properties=(Label="Overrides",AllowedTypes=Param,bAdvancedPin=True,Tooltip=NSLOCTEXT("PCGSettings", "GlobalParamPinTooltip", "Atribute Set containing multiple parameters to override. Names must match perfectly."))
                End Object
                Begin Object Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_3'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_0.Select_1'"
                    Properties=(Label="Use Input B",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", NSLOCTEXT("", "16C4E377C2E74CE5BA25165971FD45EF", "bool"), NSLOCTEXT("", "C2769CCD78C64949B3473D033EAF34BC", "bUseInputB")))
                End Object
                Begin Object Name="PCGPin_4" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_0.Select_1.PCGPin_4'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_0.Select_1'"
                    Properties=(Label="Out",Tooltip=NSLOCTEXT("FPCGBooleanSelectElement", "OutputPinTooltip", "All input will gathered into a single data collection"))
                End Object
                PositionX=896
                PositionY=256
                SettingsInterface="/Script/PCG.PCGBooleanSelectSettings'PCGBooleanSelectSettings_0'"
                InputPins(0)="/Script/PCG.PCGPin'PCGPin_0'"
                InputPins(1)="/Script/PCG.PCGPin'PCGPin_1'"
                InputPins(2)="/Script/PCG.PCGPin'PCGPin_2'"
                InputPins(3)="/Script/PCG.PCGPin'PCGPin_3'"
                OutputPins(0)="/Script/PCG.PCGPin'PCGPin_4'"
            End Object
            PCGNode="/Script/PCG.PCGNode'Select_1'"
            NodePosX=896
            NodePosY=256
            AdvancedPinDisplay=Shown
            bUserSetEnabledState=True
            NodeGuid=DC0AF7AFAE5643AEAA102848F6C250A1
            CustomProperties Pin (PinId=44103E0035144DDA9CBDF09DABD6FFBB,PinName="Input A",PinFriendlyName="Input A",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=DDAD3EAD7E13487AB8307520FEC50BFE,PinName="Input B",PinFriendlyName="Input B",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=3368F1F000994A78A1AE7445BE7A84F5,PinName="Overrides",PinFriendlyName="Overrides",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=0EFB81FA173B41D294EB0795B08D8881,PinName="Use Input B",PinFriendlyName="Use Input B",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=49C207211518412D826C77C76B639411,PinName="Out",PinFriendlyName="Out",Direction="EGPD_Output",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [11, 11],
    color: Configuration.nodeColors.intenseGreen,
    icon: null,
    pins: 5,
    pinNames: ["Input A", "Input B", "Overrides", "Use Input B", "Out"],
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-glass"))).toBeFalsy()
        expect(await node.evaluate(node => node.classList.contains("ueb-node-style-default"))).toBeTruthy()
        expect(await pins[0].evaluate(p => p.entity.pinColor().cssText)).toBe(css`132, 132, 132`.cssText)
        expect(await pins[1].evaluate(p => p.entity.pinColor().cssText)).toBe(css`132, 132, 132`.cssText)
        expect(await pins[2].evaluate(p => p.entity.pinColor().cssText)).toBe(css`255, 166, 40`.cssText)
        expect(await pins[3].evaluate(p => p.entity.pinColor().cssText)).toBe(css`255, 166, 40`.cssText)
        expect(await pins[4].evaluate(p => p.entity.pinColor().cssText)).toBe(css`132, 132, 132`.cssText)
    },
})
