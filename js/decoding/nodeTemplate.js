import Configuration from "../Configuration.js"
import CommentNodeTemplate from "../template/node/CommentNodeTemplate.js"
import EventNodeTemplate from "../template/node/EventNodeTemplate.js"
import KnotNodeTemplate from "../template/node/KnotNodeTemplate.js"
import MetasoundNodeTemplate from "../template/node/MetasoundNodeTemplate.js"
import MetasoundOperationTemplate from "../template/node/MetasoundOperationTemplate.js"
import NodeTemplate from "../template/node/NodeTemplate.js"
import VariableAccessNodeTemplate from "../template/node/VariableAccessNodeTemplate.js"
import VariableConversionNodeTemplate from "../template/node/VariableConversionNodeTemplate.js"
import VariableOperationNodeTemplate from "../template/node/VariableOperationNodeTemplate.js"

/**
 * @param {ObjectEntity} nodeEntity
 * @return {new () => NodeTemplate}
 */
export default function nodeTemplateClass(nodeEntity) {
    if (
        nodeEntity.getClass() === Configuration.paths.callFunction
        || nodeEntity.getClass() === Configuration.paths.commutativeAssociativeBinaryOperator
        || nodeEntity.getClass() === Configuration.paths.callArrayFunction
    ) {
        const memberParent = nodeEntity.FunctionReference?.MemberParent?.path ?? ""
        const memberName = nodeEntity.FunctionReference?.MemberName?.valueOf()
        if (
            memberName && (
                memberParent === Configuration.paths.kismetMathLibrary
                || memberParent === Configuration.paths.kismetArrayLibrary
            )) {
            if (memberName.startsWith("Conv_")) {
                return VariableConversionNodeTemplate
            }
            if (
                memberName.startsWith("Add_")
                || memberName.startsWith("And_")
                || memberName.startsWith("Boolean") // Boolean logic operations
                || memberName.startsWith("Cross_")
                || memberName.startsWith("Dot_")
                || memberName.startsWith("Not_")
                || memberName.startsWith("Or_")
                || memberName.startsWith("Percent_")
                || memberName.startsWith("Xor_")
            ) {
                return VariableOperationNodeTemplate
            }
            switch (memberName) {
                case "Abs":
                case "Array_Add":
                case "Array_AddUnique":
                case "Array_Identical":
                case "BMax":
                case "BMin":
                case "CrossProduct2D":
                case "DotProduct2D":
                case "Exp":
                case "FMax":
                case "FMin":
                case "GetPI":
                case "Max":
                case "MaxInt64":
                case "Min":
                case "MinInt64":
                case "Sqrt":
                case "Square":
                case "Vector4_CrossProduct3":
                case "Vector4_DotProduct":
                case "Vector4_DotProduct3":
                // Trigonometry
                case "Acos":
                case "Asin":
                case "Cos":
                case "DegAcos":
                case "DegCos":
                case "DegSin":
                case "DegTan":
                case "Sin":
                case "Tan":
                    return VariableOperationNodeTemplate
            }
        }
        if (memberParent === Configuration.paths.blueprintSetLibrary) {
            return VariableOperationNodeTemplate
        }
        if (memberParent === Configuration.paths.blueprintMapLibrary) {
            return VariableOperationNodeTemplate
        }
    }
    switch (nodeEntity.getClass()) {
        case Configuration.paths.comment:
        case Configuration.paths.materialGraphNodeComment:
            return CommentNodeTemplate
        case Configuration.paths.createDelegate:
            return NodeTemplate
        case Configuration.paths.metasoundEditorGraphExternalNode:
            if (nodeEntity["ClassName"]?.["Name"] == "Add") {
                return MetasoundOperationTemplate
            }
            return MetasoundNodeTemplate
        case Configuration.paths.niagaraNodeOp:
            if (
                [
                    "Boolean::LogicEq",
                    "Boolean::LogicNEq",
                    "Numeric::Abs",
                    "Numeric::Add",
                    "Numeric::Mul",
                ].includes(nodeEntity.OpName?.valueOf())
            ) {
                return VariableOperationNodeTemplate
            }
            break
        case Configuration.paths.promotableOperator:
            return VariableOperationNodeTemplate
        case Configuration.paths.knot:
            return KnotNodeTemplate
        case Configuration.paths.literal:
        case Configuration.paths.self:
        case Configuration.paths.variableGet:
        case Configuration.paths.variableSet:
            return VariableAccessNodeTemplate
    }
    if (nodeEntity.isEvent()) {
        return EventNodeTemplate
    }
    return NodeTemplate
}
