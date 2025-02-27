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

const niagaraOperationNodes = [
    "Boolean::LogicEq",
    "Boolean::LogicNEq",
    "Integer::EnumNEq",
    "Integer::EnumEq",
    ...[
        "Abs",
        "Add",
        "ArcCosine(Degrees)",
        "ArcCosine(Radians)",
        "ArcSine(Degrees)",
        "ArcSine(Radians)",
        "ArcTangent(Degrees)",
        "ArcTangent(Radians)",
        "Ceil",
        "CmpEQ",
        "CmpGE",
        "CmpGT",
        "CmpLE",
        "CmpLT",
        "CmpNEQ",
        "Cosine(Degrees)",
        "Cosine(Radians)",
        "DegreesToRadians",
        "Div",
        "Dot",
        "Exp",
        "Exp2",
        "Floor",
        "FMod",
        "Frac",
        "Length",
        "Lerp",
        "Log",
        "Log2",
        "Madd",
        "Max",
        "Min",
        "Mul",
        "Negate",
        "Normalize",
        "OneMinus",
        "PI",
        "RadiansToDegrees",
        "Rcp",
        "RcpFast",
        "Round",
        "RSqrt",
        "Sign",
        "Sine(Degrees)",
        "Sine(Radians)",
        "Sqrt",
        "Step",
        "Subtract",
        "Tangent(Degrees)",
        "Tangent(Radians)",
        "Trunc",
        "TWO_PI",
    ].map(v => "Numeric::" + v),
    "Vector3::Cross",
]

const p = Configuration.paths

/**
 * @param {ObjectEntity} nodeEntity
 * @return {new () => NodeTemplate}
 */
export default function nodeTemplateClass(nodeEntity) {
    const className = nodeEntity.getClass()
    if (
        className === p.callFunction
        || className === p.commutativeAssociativeBinaryOperator
        || className === p.callArrayFunction
    ) {
        const memberParent = nodeEntity.FunctionReference?.MemberParent?.path ?? ""
        const memberName = nodeEntity.FunctionReference?.MemberName?.toString()
        if (
            memberName && (
                memberParent === p.kismetArrayLibrary
                || memberParent === p.kismetMathLibrary
                || memberParent === p.kismetStringLibrary
                || memberParent === p.typedElementHandleLibrary
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
                case "Equal":
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
        if (memberParent === p.blueprintSetLibrary) {
            return VariableOperationNodeTemplate
        }
        if (memberParent === p.blueprintMapLibrary) {
            return VariableOperationNodeTemplate
        }
    }
    switch (className) {
        case p.comment:
        case p.materialGraphNodeComment:
            return CommentNodeTemplate
        case p.createDelegate:
            return NodeTemplate
        case p.metasoundEditorGraphExternalNode:
            if (nodeEntity["ClassName"]?.["Name"] == "Add") {
                return MetasoundOperationTemplate
            }
            return MetasoundNodeTemplate
        case p.niagaraNodeOp:
            if (niagaraOperationNodes.includes(nodeEntity.OpName?.toString())) {
                return VariableOperationNodeTemplate
            }
            break
        case p.promotableOperator:
            return VariableOperationNodeTemplate
        case p.knot:
            return KnotNodeTemplate
        case p.literal:
        case p.self:
        case p.variableGet:
        case p.variableSet:
            return VariableAccessNodeTemplate
    }
    if (nodeEntity.isEvent()) {
        return EventNodeTemplate
    }
    return NodeTemplate
}
