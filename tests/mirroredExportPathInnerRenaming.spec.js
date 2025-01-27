import { expect, test } from "./fixtures/test.js"

const firstRowOnly = v => v.replaceAll(/^\s+|\n.+/gs, "")

test("Inner renaming", async ({ blueprintPage }) => {
    let source = String.raw`
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
            End Object
        End Object
    `

    await blueprintPage.paste(source)
    expect(firstRowOnly(await blueprintPage.node.evaluate(n => n.entity.serialize()))).toEqual(
        `Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="PCGEditorGraphNode_2" ExportPath=/Script/PCGEditor.PCGEditorGraphNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGNode Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGBlueprintSettings_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGBlueprintSettings Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_2'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGPin_2"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7']['#SubObject_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.PCGEditorGraphNode_2.ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )

    // Rename outer object PCGEditorGraphNode_2 -> Name1
    await blueprintPage.node.evaluate(n => n.entity.Name.value = "Name1")
    expect(firstRowOnly(await blueprintPage.node.evaluate(n => n.entity.serialize()))).toEqual(
        `Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="Name1" ExportPath=/Script/PCGEditor.PCGEditorGraphNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.Name1"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGNode Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.Name1.ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGBlueprintSettings_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGBlueprintSettings Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.Name1.ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.Name1.ExecuteBlueprint_7.PCGPin_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_2'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.Name1.ExecuteBlueprint_7.PCGPin_2"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.Name1.ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7']['#SubObject_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.Name1.ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )

    // Rename outer object another name -> new StringEntity("another name")
    await blueprintPage.node.evaluate(n => n.entity.Name = new (n.entity.constructor.attributes.Name)("another name"))
    expect(firstRowOnly(await blueprintPage.node.evaluate(n => n.entity.serialize()))).toEqual(
        `Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode Name="another name" ExportPath=/Script/PCGEditor.PCGEditorGraphNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.another name"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGNode Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.another name.ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGBlueprintSettings_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGBlueprintSettings Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.another name.ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.another name.ExecuteBlueprint_7.PCGPin_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_2'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.another name.ExecuteBlueprint_7.PCGPin_2"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.another name.ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7']['#SubObject_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1.another name.ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )

    // Rename outer object another name -> null
    await blueprintPage.node.evaluate(n => n.entity.Name = null)
    expect(firstRowOnly(await blueprintPage.node.evaluate(n => n.entity.serialize()))).toEqual(
        `Begin Object Class=/Script/PCGEditor.PCGEditorGraphNode ExportPath=/Script/PCGEditor.PCGEditorGraphNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1."'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGNode Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1..ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGBlueprintSettings_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGBlueprintSettings Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1..ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_0'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_0" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1..ExecuteBlueprint_7.PCGPin_0"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_/Script/PCG.PCGNode_ExecuteBlueprint_7']['#SubObject_/Script/PCG.PCGPin_PCGPin_2'].serialize()
    ))).toEqual(
        `Begin Object Class=/Script/PCG.PCGPin Name="PCGPin_2" ExportPath=/Script/PCG.PCGPin'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1..ExecuteBlueprint_7.PCGPin_2"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7'].serialize()
    ))).toEqual(
        `Begin Object Name="ExecuteBlueprint_7" ExportPath=/Script/PCG.PCGNode'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1..ExecuteBlueprint_7"'`
    )
    expect(firstRowOnly(await blueprintPage.node.evaluate(n =>
        n.entity['#SubObject_ExecuteBlueprint_7']['#SubObject_PCGBlueprintSettings_0'].serialize()
    ))).toEqual(
        `Begin Object Name="PCGBlueprintSettings_0" ExportPath=/Script/PCG.PCGBlueprintSettings'"/Game/NewPCGGraph.NewPCGGraph:PCGEditorGraph_1..ExecuteBlueprint_7.PCGBlueprintSettings_0"'`
    )
})
