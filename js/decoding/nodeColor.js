import Configuration from "../Configuration.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"

const p = Configuration.paths

/** @param {ObjectEntity} entity */
export default function nodeColor(entity) {
    switch (entity.getType()) {
        case p.materialExpressionConstant2Vector:
        case p.materialExpressionConstant3Vector:
        case p.materialExpressionConstant4Vector:
            return Configuration.nodeColors.yellow
        case p.materialExpressionFunctionInput:
        case p.materialExpressionTextureCoordinate:
        case p.materialExpressionWorldPosition:
        case p.pcgEditorGraphNodeInput:
        case p.pcgEditorGraphNodeOutput:
            return Configuration.nodeColors.red
        case p.makeStruct:
            return Configuration.nodeColors.darkBlue
        case p.materialExpressionMaterialFunctionCall:
            return Configuration.nodeColors.blue
        case p.materialExpressionTextureSample:
            return Configuration.nodeColors.darkTurquoise
        case p.niagaraNodeInput:
            switch (entity["Usage"]?.toString()) {
                case "Attribute": return Configuration.nodeColors.intenseGreen
                case "Parameter": return Configuration.nodeColors.red
                case "RapidIterationParameter": return Configuration.nodeColors.black
                case "SystemConstant": return Configuration.nodeColors.gray
                case "TranslatorConstant": return Configuration.nodeColors.gray
                default: return Configuration.nodeColors.red
            }
    }
    switch (entity.getClass()) {
        case p.niagaraNodeFunctionCall:
            return Configuration.nodeColors.darkerBlue
        case p.dynamicCast:
            return Configuration.nodeColors.turquoise
        case p.inputDebugKey:
        case p.inputKey:
            return Configuration.nodeColors.red
        case p.createDelegate:
        case p.enumLiteral:
        case p.makeArray:
        case p.makeMap:
        case p.materialGraphNode:
        case p.select:
            return Configuration.nodeColors.green
        case p.executionSequence:
        case p.ifThenElse:
        case p.macro:
        case p.multiGate:
            return Configuration.nodeColors.gray
        case p.functionEntry:
        case p.functionResult:
            return Configuration.nodeColors.violet
        case p.timeline:
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
    if (entity.bIsPureFunc?.valueOf() || entity.bDefaultsToPureFunc?.valueOf()) {
        return Configuration.nodeColors.green
    }
    if (entity["Input"]?.["Name"]) {
        return Configuration.nodeColors.gray
    }
    return Configuration.nodeColors.blue
}
