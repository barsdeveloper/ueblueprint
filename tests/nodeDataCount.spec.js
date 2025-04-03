import Configuration from "../js/Configuration.js"
import { expect, testNode } from "./fixtures/test.js"

testNode({
    name: "Data Count",
    title: "Data Num",
    subtitle: null,
    value: String.raw`
        Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="PCGEditorGraphNode_2" ExportPath="/Script/PCGEditor.PCGEditorGraphNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2'"
            Begin Object Class=/Script/PCG.PCGNode Name="DataNum_2" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2'"
                Begin Object Class=/Script/PCG.PCGTrivialSettings Name="DefaultNodeSettings" Archetype="/Script/PCG.PCGTrivialSettings'/Script/PCG.Default__PCGNode:DefaultNodeSettings'" ExportPath="/Script/PCG.PCGTrivialSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.DefaultNodeSettings'"
                End Object
                Begin Object Class=/Script/PCG.PCGDataNumSettings Name="PCGDataNumSettings_0" ExportPath="/Script/PCG.PCGDataNumSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGDataNumSettings_0'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_0'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_1'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_2'"
                End Object
                Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_3'"
                End Object
            End Object
            Begin Object Name="DataNum_2" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2'"
                Begin Object Name="DefaultNodeSettings" ExportPath="/Script/PCG.PCGTrivialSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.DefaultNodeSettings'"
                End Object
                Begin Object Name="PCGDataNumSettings_0" ExportPath="/Script/PCG.PCGDataNumSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGDataNumSettings_0'"
                    Seed=45482541
                    CachedOverridableParams(0)=(Label="OutputAttributeName",PropertiesNames=("OutputAttributeName"),PropertyClass="/Script/CoreUObject.Class'/Script/PCG.PCGDataNumSettings'")
                End Object
                Begin Object Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_0'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.DataNum_2'"
                    Properties=(Label="In",PinStatus=Required)
                End Object
                Begin Object Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_1'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.DataNum_2'"
                    Properties=(Label="Overrides",AllowedTypes=Param,PinStatus=OverrideOrUserParam,Tooltip=NSLOCTEXT("PCGSettings", "GlobalParamPinTooltip", "Atribute Set containing multiple parameters to override. Names must match perfectly."))
                End Object
                Begin Object Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_2'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.DataNum_2'"
                    Properties=(Label="OutputAttributeName",AllowedTypes=Param,bAllowMultipleData=False,PinStatus=OverrideOrUserParam,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", NSLOCTEXT("", "F685A80C7F3642D39D0D096256DA7E07", "FName"), NSLOCTEXT("", "0337A20A0B2C400AAE0AF477C663D73D", "OutputAttributeName")),bAllowMultipleConnections=False)
                End Object
                Begin Object Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_2.DataNum_2.PCGPin_3'"
                    Node="/Script/PCG.PCGNode'PCGEditorGraphNode_2.DataNum_2'"
                    Properties=(Label="Out",AllowedTypes=Param,Tooltip=NSLOCTEXT("PCGDataNumElement", "OutParamTooltip", "Attribute set containing the data count from the input collection"))
                End Object
                PositionX=560
                PositionY=160
                SettingsInterface="/Script/PCG.PCGDataNumSettings'PCGDataNumSettings_0'"
                InputPins(0)="/Script/PCG.PCGPin'PCGPin_0'"
                InputPins(1)="/Script/PCG.PCGPin'PCGPin_1'"
                InputPins(2)="/Script/PCG.PCGPin'PCGPin_2'"
                OutputPins(0)="/Script/PCG.PCGPin'PCGPin_3'"
            End Object
            PCGNode="/Script/PCG.PCGNode'DataNum_2'"
            NodePosX=560
            NodePosY=160
            AdvancedPinDisplay=Shown
            bUserSetEnabledState=True
            bCanRenameNode=False
            NodeGuid=7CCECFCAA65840AD93744F46C8689EBB
            CustomProperties Pin (PinId=E362D4F678C942C08A861CFE7E8FA846,PinName="In",PinFriendlyName="In",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
            CustomProperties Pin (PinId=04A829D535AB461AA23D8CA2BB1BF18A,PinName="Overrides",PinFriendlyName="Overrides",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=6843659B0B194D358888D2F44F517B89,PinName="OutputAttributeName",PinFriendlyName=NSLOCTEXT("UObjectDisplayNames", "PCGDataNumSettings:OutputAttributeName", "Output Attribute Name"),PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
            CustomProperties Pin (PinId=D863A6ECDFA8449787BE6CA83A3B4617,PinName="Out",PinFriendlyName="Out",Direction="EGPD_Output",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
        End Object
    `,
    size: [14.5, 9],
    color: Configuration.nodeColors.blue,
    icon: null,
    pins: 4,
    pinNames: ["In", "Overrides", "Output Attribute Name", "Out"],
    delegate: false,
    development: false,
    additionalTest: async (node, pins) => {
        for (let i = 0; i < pins.length; ++i) {
            await expect(pins[i].locator(".ueb-pin-required-mark")).toHaveCount(i == 0 ? 1 : 0)
        }
    }
})
