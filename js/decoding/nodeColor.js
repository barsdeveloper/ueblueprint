import Configuration from "../Configuration.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"

/** @param {ObjectEntity} entity */
export default function nodeColor(entity) {
    switch (entity.getType()) {
        case Configuration.paths.materialExpressionConstant2Vector:
        case Configuration.paths.materialExpressionConstant3Vector:
        case Configuration.paths.materialExpressionConstant4Vector:
            return Configuration.nodeColors.yellow
        case Configuration.paths.materialExpressionFunctionInput:
        case Configuration.paths.materialExpressionTextureCoordinate:
        case Configuration.paths.materialExpressionWorldPosition:
        case Configuration.paths.pcgEditorGraphNodeInput:
        case Configuration.paths.pcgEditorGraphNodeOutput:
            return Configuration.nodeColors.red
        case Configuration.paths.makeStruct:
            return Configuration.nodeColors.darkBlue
        case Configuration.paths.materialExpressionMaterialFunctionCall:
            return Configuration.nodeColors.blue
        case Configuration.paths.materialExpressionTextureSample:
            return Configuration.nodeColors.darkTurquoise
    }
    switch (entity.getClass()) {
        case Configuration.paths.callFunction:
            return entity.bIsPureFunc?.valueOf()
                ? Configuration.nodeColors.green
                : Configuration.nodeColors.blue
        case Configuration.paths.niagaraNodeFunctionCall:
            return Configuration.nodeColors.darkerBlue
        case Configuration.paths.dynamicCast:
            return Configuration.nodeColors.turquoise
        case Configuration.paths.inputDebugKey:
        case Configuration.paths.inputKey:
            return Configuration.nodeColors.red
        case Configuration.paths.createDelegate:
        case Configuration.paths.enumLiteral:
        case Configuration.paths.makeArray:
        case Configuration.paths.makeMap:
        case Configuration.paths.materialGraphNode:
        case Configuration.paths.select:
            return Configuration.nodeColors.green
        case Configuration.paths.executionSequence:
        case Configuration.paths.ifThenElse:
        case Configuration.paths.macro:
        case Configuration.paths.multiGate:
            return Configuration.nodeColors.gray
        case Configuration.paths.functionEntry:
        case Configuration.paths.functionResult:
            return Configuration.nodeColors.violet
        case Configuration.paths.timeline:
            return Configuration.nodeColors.yellow
    }
    if (entity.switchTarget()) {
        return Configuration.nodeColors.lime
    }
    if (entity.isEvent()) {
        return Configuration.nodeColors.red
    }
    if (entity.isComment()) {
        return (entity.CommentColor ? entity.CommentColor : LinearColorEntity.getWhite())
            .toDimmedColor()
            .toCSSRGBValues()
    }
    const pcgSubobject = entity.getPcgSubobject()
    if (pcgSubobject) {
        if (pcgSubobject.NodeTitleColor) {
            return pcgSubobject.NodeTitleColor.toDimmedColor(0.1).toCSSRGBValues()
        }
        switch (entity.PCGNode?.getName(true)) {
            case "Branch":
            case "Select":
                return Configuration.nodeColors.intenseGreen
        }
    }
    if (entity.bIsPureFunc?.valueOf()) {
        return Configuration.nodeColors.green
    }
    return Configuration.nodeColors.blue
}
