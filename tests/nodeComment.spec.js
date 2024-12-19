import { testNode } from "./fixtures/test.js"

testNode({
    name: "Comment",
    value: String.raw`
        Begin Object Class=/Script/UnrealEd.MaterialGraphNode_Comment Name="MaterialGraphNode_Comment_0" ExportPath=/Script/UnrealEd.MaterialGraphNode_Comment'"/Engine/Transient.M_CobbleStone_Smooth:MaterialGraph_0.MaterialGraphNode_Comment_0"'
            Begin Object Class=/Script/Engine.MaterialExpressionComment Name="MaterialExpressionComment_0" ExportPath=/Script/Engine.MaterialExpressionComment'"/Engine/Transient.M_CobbleStone_Smooth:MaterialGraph_0.MaterialGraphNode_Comment_0.MaterialExpressionComment_0"'
            End Object
            Begin Object Name="MaterialExpressionComment_0" ExportPath=/Script/Engine.MaterialExpressionComment'"/Engine/Transient.M_CobbleStone_Smooth:MaterialGraph_0.MaterialGraphNode_Comment_0.MaterialExpressionComment_0"'
                SizeX=249
                SizeY=165
                Text="Comment"
                MaterialExpressionEditorX=-5920
                MaterialExpressionEditorY=-704
                MaterialExpressionGuid=E21961B2B09144CF8607171C9D1E3489
            End Object
            MaterialExpressionComment=/Script/Engine.MaterialExpressionComment'"MaterialExpressionComment_0"'
            bCommentBubbleVisible_InDetailsPanel=False
            NodePosX=-5920
            NodePosY=-704
            NodeWidth=249
            NodeHeight=165
            bCommentBubblePinned=False
            bCommentBubbleVisible=False
            NodeComment="Comment"
            NodeGuid=A04CE0EEECF047A4918AC9B13818854E
        End Object
    `,
    delegate: false,
    development: false,
})
