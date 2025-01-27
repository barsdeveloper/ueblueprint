import { expect, test } from "./fixtures/test.js"

const firstRowOnly = v => v.replaceAll(/^\s+|\n.+/gs, "")

test("Renaming", async ({ blueprintPage }) => {
    let source = String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_40" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40"'
        End Object
    `
    await blueprintPage.paste(source)
    expect(firstRowOnly(await blueprintPage.getSerializedNodes())).toEqual(
        `Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_40" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.MaterialGraphNode_40"'`
    )
    await blueprintPage.node.evaluate(n => n.entity.Name.value = "new name")
    expect(firstRowOnly(await blueprintPage.getSerializedNodes())).toEqual(
        `Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="new name" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.new name"'`
    )
    await blueprintPage.node.evaluate(n => n.entity.Name = new (n.entity.constructor.attributes.Name)("new name 2"))
    expect(firstRowOnly(await blueprintPage.getSerializedNodes())).toEqual(
        `Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="new name 2" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0.new name 2"'`
    )
    await blueprintPage.node.evaluate(n => n.entity.Name = new (n.entity.constructor.attributes.Name)())
    expect(firstRowOnly(await blueprintPage.getSerializedNodes())).toEqual(
        `Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="" ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0."'`
    )
    await blueprintPage.node.evaluate(n => delete n.entity.Name)
    expect(firstRowOnly(await blueprintPage.getSerializedNodes())).toEqual(
        `Begin Object Class=/Script/UnrealEd.MaterialGraphNode ExportPath=/Script/UnrealEd.MaterialGraphNode'"/Engine/Transient.M_Brick_Cut_Stone:MaterialGraph_0."'`
    )
})
