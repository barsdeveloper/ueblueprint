import { expect } from "./fixtures/test.js"
import Configuration from "../js/Configuration.js"
import generateNodeTests from "./resources/testUtilities.js"
import SVGIcon from "../js/SVGIcon.js"

generateNodeTests([
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
        color: Configuration.nodeColors.darkBlue,
        pins: 4,
        pinNames: ["In", "Overrides", "Seed", "Out"],
        delegate: false,
        development: false,
        additionalTest: (extract, locator) => {
            let pins = locator.locator("ueb-pin")
            const inPin = pins.getByText("In")
            const overridesPin = pins.getByText("Overrides")
            const seedPin = pins.getByText("Seed")
            const out = pins.getByText("Out")
            expect(inPin).toBeVisible()
            expect(inPin.evaluate(pin => /** @type {PinElement} */(pin).template.renderIcon().strings.join("")))
                .toEqual(SVGIcon.pcgStackPin.strings.join(""))
            expect(overridesPin).toBeVisible()
            expect(overridesPin.evaluate(pin => /** @type {PinElement} */(pin).template.renderIcon().strings.join("")))
                .toEqual(SVGIcon.pcgParamPin.strings.join(""))
            expect(seedPin).toBeVisible()
            expect(seedPin.evaluate(pin => /** @type {PinElement} */(pin).template.renderIcon().strings.join("")))
                .toEqual(SVGIcon.pcgParamPin.strings.join(""))
            expect(out).toBeVisible()
            expect(out.evaluate(pin => /** @type {PinElement} */(pin).template.renderIcon().strings.join("")))
                .toEqual(SVGIcon.pcgSpatialPin.strings.join(""))
        }
    },
])
