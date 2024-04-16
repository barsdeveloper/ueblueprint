import SVGIcon from "../../js/SVGIcon.js"
import { expect } from "../fixtures/test.js"
import NodeTests from "./NodeTests.js"

export default class PCGNodes extends NodeTests {
    static {
        this.set([
            {
                name: "Execute Blueprint",
                value: String.raw`
                    Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="PCGEditorGraphNode_2" ExportPath=/Script/PCGEditor.PCGEditorGraphNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2"'
                        Begin Object Class=/Script/PCG.PCGNode Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7"'
                            Begin Object Class=/Script/PCG.PCGBlueprintSettings Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGBlueprintSettings_0"'
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_0"'
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_1" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_1"'
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_2"'
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_3" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_3"'
                            End Object
                        End Object
                        Begin Object Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7"'
                            Begin Object Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGBlueprintSettings_0"'
                                "Seed"=-1282097489
                                "bExposeToLibrary"=False
                                "CachedOverridableParams"(0)=(Label="Seed",PropertiesNames=("Seed"),PropertyClass=/Script/CoreUObject.Class'"/Script/PCG.PCGBlueprintSettings"')
                            End Object
                            Begin Object Name="PCGPin_0" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_0"'
                                "Node"=/Script/PCG.PCGNode'"PCGEditorGraphNode_2.ExecuteBlueprint_7"'
                                "Properties"=(Label="In")
                            End Object
                            Begin Object Name="PCGPin_1" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_1"'
                                "Node"=/Script/PCG.PCGNode'"PCGEditorGraphNode_2.ExecuteBlueprint_7"'
                                "Properties"=(Label="Overrides",AllowedTypes=Param,bAdvancedPin=True,Tooltip=NSLOCTEXT("PCGSettings", "GlobalParamPinTooltip", "Atribute Set containing multiple parameters to override. Names must match perfectly."))
                            End Object
                            Begin Object Name="PCGPin_2" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_2"'
                                "Node"=/Script/PCG.PCGNode'"PCGEditorGraphNode_2.ExecuteBlueprint_7"'
                                "Properties"=(Label="Seed",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", "int32", "Seed"))
                            End Object
                            Begin Object Name="PCGPin_3" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_3"'
                                "Node"=/Script/PCG.PCGNode'"PCGEditorGraphNode_2.ExecuteBlueprint_7"'
                                "Properties"=(Label="Out",AllowedTypes=Spatial)
                            End Object
                            "PositionX"=768
                            "PositionY"=128
                            "SettingsInterface"=/Script/PCG.PCGBlueprintSettings'"PCGBlueprintSettings_0"'
                            "InputPins"(0)=/Script/PCG.PCGPin'"PCGPin_0"'
                            "InputPins"(1)=/Script/PCG.PCGPin'"PCGPin_1"'
                            "InputPins"(2)=/Script/PCG.PCGPin'"PCGPin_2"'
                            "OutputPins"(0)=/Script/PCG.PCGPin'"PCGPin_3"'
                        End Object
                        "PCGNode"=/Script/PCG.PCGNode'"ExecuteBlueprint_7"'
                        "NodePosX"=768
                        "NodePosY"=128
                        "AdvancedPinDisplay"=Shown
                        "bUserSetEnabledState"=True
                        "NodeGuid"=510EDA9C48C94C29D834BDBC2E6698A5
                        CustomProperties Pin (PinId=84EFEAC94F4D8F7B54DBA39777ACE90B,PinName="In",PinFriendlyName="In",PinType.PinCategory="",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=14D4F997473AFF411CEB30824798BF16,PinName="Overrides",PinFriendlyName="Overrides",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=B534894344C992A0A4DA798A15D1C438,PinName="Seed",PinFriendlyName="Seed",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=A6E46EE44272FFAB9F2E1B944ADC28CB,PinName="Out",PinFriendlyName="Out",Direction="EGPD_Output",PinType.PinCategory="Spatial Data",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                    End Object
                `,
                size: [10, 9],
                pins: 4,
                pinNames: ["In", "Overrides", "Seed", "Out"],
                delegate: false,
                development: false,
                additionalTest: async node => {
                    /** @type {Locator<PinElement>} */
                    const inPin = node.locator('ueb-pin:has-text("In")')
                    /** @type {Locator<PinElement>} */
                    const overridesPin = node.locator('ueb-pin:has-text("Overrides")')
                    /** @type {Locator<PinElement>} */
                    const seedPin = node.locator('ueb-pin:has-text("Seed")')
                    /** @type {Locator<PinElement>} */
                    const outPin = node.locator('ueb-pin:has-text("Out")')
                    await expect(inPin).toBeVisible()
                    await expect(overridesPin).toBeVisible()
                    await expect(seedPin).toBeVisible()
                    await expect(outPin).toBeVisible()
                    expect(await inPin.evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgStackPin.strings.join(""))
                    expect(await overridesPin.evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await seedPin.evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await outPin.evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgSpatialPin.strings.join(""))
                }
            },
            {
                name: "Set Point Color",
                value: String.raw`
                    Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="PCGEditorGraphNode_1" ExportPath="/Script/PCGEditor.PCGEditorGraphNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1'"
                        Begin Object Class=/Script/PCG.PCGNode Name="ExecuteBlueprint_1" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                            Begin Object Class=/Script/PCG.PCGBlueprintSettings Name="PCGBlueprintSettings_1" ExportPath="/Script/PCG.PCGBlueprintSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGBlueprintSettings_1'"
                                Begin Object Class=/PCG/BP_Elements/SetPointColor.SetPointColor_C Name="SetPointColor_C_0" ExportPath="/PCG/BP_Elements/SetPointColor.SetPointColor_C'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGBlueprintSettings_1.SetPointColor_C_0'"
                                End Object
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_0'"
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_1'"
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_2'"
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_3'"
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_4" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_4'"
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_5" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_5'"
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_6" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_6'"
                            End Object
                            Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_7" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_7'"
                            End Object
                        End Object
                        Begin Object Name="ExecuteBlueprint_1" ExportPath="/Script/PCG.PCGNode'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                            Begin Object Name="PCGBlueprintSettings_1" ExportPath="/Script/PCG.PCGBlueprintSettings'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGBlueprintSettings_1'"
                                Begin Object Name="SetPointColor_C_0" ExportPath="/PCG/BP_Elements/SetPointColor.SetPointColor_C'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGBlueprintSettings_1.SetPointColor_C_0'"
                                End Object
                                BlueprintElementType="/Script/Engine.BlueprintGeneratedClass'/PCG/BP_Elements/SetPointColor.SetPointColor_C'"
                                BlueprintElementInstance="/PCG/BP_Elements/SetPointColor.SetPointColor_C'SetPointColor_C_0'"
                                Seed=-1868785340
                                bExposeToLibrary=False
                                CachedOverridableParams(0)=(Label="Seed",PropertiesNames=("Seed"),PropertyClass="/Script/CoreUObject.Class'/Script/PCG.PCGBlueprintSettings'")
                                CachedOverridableParams(1)=(Label="R",PropertiesNames=("Linear Color","R"),PropertyClass="/Script/Engine.BlueprintGeneratedClass'/PCG/BP_Elements/SetPointColor.SetPointColor_C'")
                                CachedOverridableParams(2)=(Label="G",PropertiesNames=("Linear Color","G"),PropertyClass="/Script/Engine.BlueprintGeneratedClass'/PCG/BP_Elements/SetPointColor.SetPointColor_C'")
                                CachedOverridableParams(3)=(Label="B",PropertiesNames=("Linear Color","B"),PropertyClass="/Script/Engine.BlueprintGeneratedClass'/PCG/BP_Elements/SetPointColor.SetPointColor_C'")
                                CachedOverridableParams(4)=(Label="A",PropertiesNames=("Linear Color","A"),PropertyClass="/Script/Engine.BlueprintGeneratedClass'/PCG/BP_Elements/SetPointColor.SetPointColor_C'")
                            End Object
                            Begin Object Name="PCGPin_0" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_0'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="In",AllowedTypes=Point)
                            End Object
                            Begin Object Name="PCGPin_1" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_1'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="Overrides",AllowedTypes=Param,bAdvancedPin=True,Tooltip=NSLOCTEXT("PCGSettings", "GlobalParamPinTooltip", "Atribute Set containing multiple parameters to override. Names must match perfectly."))
                            End Object
                            Begin Object Name="PCGPin_2" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_2'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="Seed",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", "int32", "Seed"))
                            End Object
                            Begin Object Name="PCGPin_3" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_3'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="Out",AllowedTypes=Point)
                            End Object
                            Begin Object Name="PCGPin_4" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_4'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="R",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", "float", "Linear Color/R"))
                            End Object
                            Begin Object Name="PCGPin_5" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_5'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="G",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", "float", "Linear Color/G"))
                            End Object
                            Begin Object Name="PCGPin_6" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_6'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="B",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", "float", "Linear Color/B"))
                            End Object
                            Begin Object Name="PCGPin_7" ExportPath="/Script/PCG.PCGPin'/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_0.PCGEditorGraphNode_1.ExecuteBlueprint_1.PCGPin_7'"
                                Node="/Script/PCG.PCGNode'PCGEditorGraphNode_1.ExecuteBlueprint_1'"
                                Properties=(Label="A",AllowedTypes=Param,bAllowMultipleData=False,bAllowMultipleConnections=False,bAdvancedPin=True,Tooltip=LOCGEN_FORMAT_ORDERED(NSLOCTEXT("PCGSettings", "OverridableParamPinTooltip", "{0}Attribute type is \"{1}\" and its exact name is \"{2}\""), "", "float", "Linear Color/A"))
                            End Object
                            PositionX=512
                            PositionY=256
                            SettingsInterface="/Script/PCG.PCGBlueprintSettings'PCGBlueprintSettings_1'"
                            InputPins(0)="/Script/PCG.PCGPin'PCGPin_0'"
                            InputPins(1)="/Script/PCG.PCGPin'PCGPin_1'"
                            InputPins(2)="/Script/PCG.PCGPin'PCGPin_2'"
                            InputPins(3)="/Script/PCG.PCGPin'PCGPin_4'"
                            InputPins(4)="/Script/PCG.PCGPin'PCGPin_5'"
                            InputPins(5)="/Script/PCG.PCGPin'PCGPin_6'"
                            InputPins(6)="/Script/PCG.PCGPin'PCGPin_7'"
                            OutputPins(0)="/Script/PCG.PCGPin'PCGPin_3'"
                        End Object
                        PCGNode="/Script/PCG.PCGNode'ExecuteBlueprint_1'"
                        NodePosX=512
                        NodePosY=256
                        AdvancedPinDisplay=Shown
                        bUserSetEnabledState=True
                        NodeGuid=74E6A6E9EF084BF4A24B56E43712EC85
                        CustomProperties Pin (PinId=53B558601FD94E0A81D59879F7C84EE4,PinName="In",PinFriendlyName="In",PinType.PinCategory="Concrete Data",PinType.PinSubCategory="Point Data",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=D2D1A26AF9524E569FCA2DD6B15C7667,PinName="Overrides",PinFriendlyName="Overrides",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=3506C39048EA435D8E16028C6E481FFE,PinName="Seed",PinFriendlyName="Seed",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=7FBFCE159BE5483F9C0AF8E8053BF3B9,PinName="R",PinFriendlyName="R",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=996EFC1D746C46D39BB50E0AF3A156D4,PinName="G",PinFriendlyName="G",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=4693B14DC236425097A5FA8B3DDD46A3,PinName="B",PinFriendlyName="B",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=831312342DB14283A98ECB2D331C1B3D,PinName="A",PinFriendlyName="A",PinType.PinCategory="Attribute Set",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=True,bOrphanedPin=False,)
                        CustomProperties Pin (PinId=6F13FFA544CF43BD94FA007B9D6FC25A,PinName="Out",PinFriendlyName="Out",Direction="EGPD_Output",PinType.PinCategory="Concrete Data",PinType.PinSubCategory="Point Data",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
                    End Object
                `,
                size: [10, 16],
                pins: 8,
                pinNames: ["In", "Overrides", "Seed", "R", "G", "B", "A", "Out"],
                delegate: false,
                development: false,
                additionalTest: async (node, pins) => {
                    expect(await pins[0].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgStackPin.strings.join(""))
                    expect(await pins[0].evaluate(pin => pin.entity.pinColor().cssText)).toEqual("63, 137, 255")
                    expect(await pins[1].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await pins[2].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await pins[3].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await pins[4].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await pins[5].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await pins[6].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgParamPin.strings.join(""))
                    expect(await pins[7].evaluate(pin => pin.template.renderIcon().strings.join("")))
                        .toEqual(SVGIcon.pcgPin.strings.join(""))
                    expect(await pins[7].evaluate(pin => pin.entity.pinColor().cssText)).toEqual("63, 137, 255")
                }
            },
            {
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
            },
        ])
    }
}
