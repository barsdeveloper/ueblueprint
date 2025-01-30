import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import BooleanEntity from "../entity/BooleanEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import MirroredEntity from "../entity/MirroredEntity.js"
import VectorEntity from "../entity/VectorEntity.js"

const paths = Configuration.paths
const sequencerScriptingNameRegex = /\/Script\/SequencerScripting\.MovieSceneScripting(.+)Channel/
const keyNameValue = {
    "A_AccentGrave": "à",
    "Add": "Num +",
    "C_Cedille": "ç",
    "Decimal": "Num .",
    "Divide": "Num /",
    "E_AccentAigu": "é",
    "E_AccentGrave": "è",
    "F1": "F1", // Otherwise F and number will be separated
    "F10": "F10",
    "F11": "F11",
    "F12": "F12",
    "F2": "F2",
    "F3": "F3",
    "F4": "F4",
    "F5": "F5",
    "F6": "F6",
    "F7": "F7",
    "F8": "F8",
    "F9": "F9",
    "Gamepad_Special_Left_X": "Touchpad Button X Axis",
    "Gamepad_Special_Left_Y": "Touchpad Button Y Axis",
    "Mouse2D": "Mouse XY 2D-Axis",
    "Multiply": "Num *",
    "Section": "§",
    "Subtract": "Num -",
    "Tilde": "`",
}
const niagaraNodeNames = {
    "Boolean::LogicAnd": "Logic AND",
    "Boolean::LogicEq": "==",
    "Boolean::LogicNEq": "!=",
    "Boolean::LogicNot": "Logic NOT",
    "Boolean::LogicOr": "Logic OR",
    "Integer::BitAnd": "Bitwise AND",
    "Integer::BitLShift": "Bitwise Left Shift",
    "Integer::BitNot": "Bitwise NOT",
    "Integer::BitOr": "Bitwise OR",
    "Integer::BitRShift": "Bitwise Right Shift",
    "Integer::BitXOr": "Bitwise XOR",
    "Integer::EnumEq": "==",
    "Integer::EnumNEq": "!=",
    "Matrix::MatrixMultiply": "Multiply (Matrix * Matrix)",
    "Matrix::MatrixVectorMultiply": "Multiply (Matrix * Vector4)",
    // Numeric::
    ...Object.fromEntries(Object.entries({
        "Add": "+",
        "ArcCosine": "ArcCosine",
        "ArcCosine(Degrees)": "ArcCos(D)",
        "ArcCosine(Radians)": "ArcCos(R)",
        "ArcSine": "ArcSine",
        "ArcSine(Degrees)": "ArcSin(D)",
        "ArcSine(Radians)": "ArcSin(R)",
        "ArcTangent(Degrees)": "ArcTan(D)",
        "ArcTangent(Radians)": "ArcTan(R)",
        "CmpEQ": "==",
        "CmpGE": ">=",
        "CmpGT": ">",
        "CmpLE": "<=",
        "CmpLT": "<",
        "CmpNEQ": "!=",
        "Cosine(Degrees)": "Cos(D)",
        "Cosine(Radians)": "Cos(R)",
        "DegreesToRadians": "DegToRad",
        "DistancePos": "Distance",
        "Div": String.fromCharCode(0x00f7),
        "FMod": "%",
        "FModFast": "Modulo Fast",
        "Length": "Len",
        "Madd": `(A${String.fromCharCode(0x2a2f)}B)+C`,
        "Mul": String.fromCharCode(0x2a2f),
        "Negate": "-A",
        "OneMinus": "1-A",
        "PI": String.fromCharCode(0x03C0),
        "RadiansToDegrees": "RadToDeg",
        "Rand Float": "Random Float",
        "Rand Integer": "Random Integer",
        "Rand": "Random",
        "Rcp": "Reciprocal",
        "RSqrt": "Rcp Sqrt",
        "Sine(Degrees)": "Sin(D)",
        "Sine(Radians)": "Sin(R)",
        "Subtract": "-",
        "Tangent(Degrees)": "Tan(D)",
        "Tangent(Radians)": "Tan(R)",
        "TWO_PI": `2 ${String.fromCharCode(0x03C0)}`,
    }).map(([k, v]) => ["Numeric::" + k, v])),
}

/** @param {String} value */
function numberFromText(value = "") {
    value = value.toLowerCase()
    switch (value) {
        case "zero": return 0
        case "one": return 1
        case "two": return 2
        case "three": return 3
        case "four": return 4
        case "five": return 5
        case "six": return 6
        case "seven": return 7
        case "eight": return 8
        case "nine": return 9
    }
}

function keyName(value) {
    /** @type {String} */
    let result = keyNameValue[value]
    if (result) {
        return result
    }
    result = numberFromText(value)?.toString()
    if (result) {
        return result
    }
    const match = value.match(/NumPad([a-zA-Z]+)/)
    if (match) {
        result = numberFromText(match[1]).toString()
        if (result) {
            return "Num " + result
        }
    }
}

/**
 * @param {ObjectEntity} entity
 * @returns {String}
 */
export default function nodeTitle(entity) {
    let value
    switch (entity.getType()) {
        case paths.addDelegate:
            value ??= "Bind Event to "
        case paths.clearDelegate:
            value ??= "Unbind all Events from "
        case paths.removeDelegate:
            value ??= "Unbind Event from "
            return value + Utility.formatStringName(
                entity.DelegateReference?.MemberName?.toString().replace(/Delegate$/, "") ?? "None"
            )
        case paths.asyncAction:
            if (entity.ProxyFactoryFunctionName) {
                return Utility.formatStringName(entity.ProxyFactoryFunctionName?.toString())
            }
        case paths.actorBoundEvent:
        case paths.componentBoundEvent:
            return `${Utility.formatStringName(entity.DelegatePropertyName?.toString())} (${entity.ComponentPropertyName?.toString() ?? "Unknown"})`
        case paths.callDelegate:
            return `Call ${entity.DelegateReference?.MemberName?.toString() ?? "None"}`
        case paths.createDelegate:
            return "Create Event"
        case paths.customEvent:
            if (entity.CustomFunctionName) {
                return entity.CustomFunctionName?.toString()
            }
        case paths.dynamicCast:
            if (!entity.TargetType) {
                return "Bad cast node" // Target type not found
            }
            return `Cast To ${entity.TargetType?.getName()}`
        case paths.enumLiteral:
            return `Literal enum ${entity.Enum?.getName()}`
        case paths.event:
            return `Event ${(entity.EventReference?.MemberName?.toString() ?? "").replace(/^Receive/, "")}`
        case paths.executionSequence:
            return "Sequence"
        case paths.forEachElementInEnum:
            return `For Each ${entity.Enum?.getName()}`
        case paths.forEachLoopWithBreak:
            return "For Each Loop with Break"
        case paths.functionEntry:
            return entity.FunctionReference?.MemberName?.toString() === "UserConstructionScript"
                ? "Construction Script"
                : entity.FunctionReference?.MemberName?.toString()
        case paths.functionResult:
            return "Return Node"
        case paths.ifThenElse:
            return "Branch"
        case paths.makeStruct:
            if (entity.StructType) {
                return `Make ${entity.StructType.getName()}`
            }
        case paths.materialExpressionComponentMask: {
            const materialObject = entity.getMaterialSubobject()
            if (materialObject) {
                return `Mask ( ${Configuration.rgba
                    .filter(k => /** @type {MirroredEntity<typeof BooleanEntity>} */(materialObject[k]).getter().value === true)
                    .map(v => v + " ")
                    .join("")})`
            }
        }
        case paths.materialExpressionConstant:
            value ??= [entity.getCustomproperties().find(pinEntity => pinEntity.PinName.toString() == "Value")?.DefaultValue]
        case paths.materialExpressionConstant2Vector:
            value ??= [
                entity.getCustomproperties().find(pinEntity => pinEntity.PinName?.toString() == "X")?.DefaultValue,
                entity.getCustomproperties().find(pinEntity => pinEntity.PinName?.toString() == "Y")?.DefaultValue,
            ]
        case paths.materialExpressionConstant3Vector:
        case paths.materialExpressionConstant4Vector:
            if (!value) {
                const vector = entity.getCustomproperties()
                    .find(pinEntity => pinEntity.PinName?.toString() == "Constant")
                    ?.DefaultValue
                value = vector instanceof VectorEntity ? [vector.X, vector.Y, vector.Z].map(v => v.valueOf())
                    : vector instanceof LinearColorEntity ? [vector.R, vector.G, vector.B, vector.A].map(v => v.valueOf())
                        : /** @type {Number[]} */([])
            }
            if (value?.length > 0) {
                return value.map(v => Utility.printExponential(v)).join(",")
            }
            value = undefined
            break
        case paths.materialExpressionFunctionInput: {
            const materialObject = entity.getMaterialSubobject()
            const inputName = materialObject?.InputName ?? "In"
            const inputType = materialObject?.InputType?.value.match(/^.+?_(\w+)$/)?.[1] ?? "Vector3"
            return `Input ${inputName} (${inputType})`
        }
        case paths.materialExpressionLogarithm:
            return "Ln"
        case paths.materialExpressionLogarithm10:
            return "Log10"
        case paths.materialExpressionLogarithm2:
            return "Log2"
        case paths.materialExpressionMaterialFunctionCall:
            const materialFunction = entity.getMaterialSubobject()?.MaterialFunction
            if (materialFunction) {
                return materialFunction.getName()
            }
            break
        case paths.materialExpressionSquareRoot:
            return "Sqrt"
        case paths.materialExpressionSubtract:
            const materialObject = entity.getMaterialSubobject()
            if (materialObject) {
                return `Subtract(${materialObject.ConstA ?? "1"},${materialObject.ConstB ?? "1"})`
            }
        case paths.metasoundEditorGraphExternalNode: {
            const name = entity["ClassName"]?.["Name"]
            if (name) {
                switch (name) {
                    case "Add": return "+"
                    default: return name
                }
            }
        }
        case paths.niagaraNodeConvert:
            /** @type {String} */
            const targetType = (entity["AutowireMakeType"]?.["ClassStructOrEnum"] ?? "")
                .toString()
                .match(/(?:Niagara)?(\w+)['"]*$/)
                ?.[1]
                ?? ""
            return `Make ${targetType}`
        case paths.pcgEditorGraphNodeInput:
            return "Input"
        case paths.pcgEditorGraphNodeOutput:
            return "Output"
        case paths.spawnActorFromClass:
            let className = entity.getCustomproperties()
                .find(pinEntity => pinEntity.PinName.toString() == "ReturnValue")
                ?.PinType
                ?.PinSubCategoryObject
                ?.getName()
            if (className === "Actor") {
                className = null
            }
            return `SpawnActor ${Utility.formatStringName(className ?? "NONE")}`
        case paths.switchEnum:
            return `Switch on ${entity.Enum?.getName() ?? "Enum"}`
        case paths.switchInteger:
            return `Switch on Int`
        case paths.variableGet:
            return ""
        case paths.variableSet:
            return "SET"
    }
    const className = entity.getClass()
    let switchTarget = entity.switchTarget()
    if (switchTarget) {
        if (switchTarget[0] !== "E") {
            switchTarget = Utility.formatStringName(switchTarget)
        }
        return `Switch on ${switchTarget}`
    }
    if (entity.isComment()) {
        return entity.NodeComment.toString()
    }
    const keyNameSymbol = entity.getHIDAttribute()
    if (keyNameSymbol) {
        const name = keyNameSymbol.toString()
        let title = keyName(name) ?? Utility.formatStringName(name)
        if (className === paths.inputDebugKey) {
            title = "Debug Key " + title
        } else if (className === paths.getInputAxisKeyValue) {
            title = "Get " + title
        }
        return title
    }
    if (className === paths.macro) {
        return Utility.formatStringName(entity.MacroGraphReference?.getMacroName())
    }
    const materialSubobject = entity.getMaterialSubobject()
    if (materialSubobject) {
        let result = nodeTitle(materialSubobject)
        result = result.match(/Material Expression (.+)/)?.[1] ?? result
        return result
    }
    if (entity.isPcg() && entity.getPcgSubobject()) {
        let pcgSubobject = entity.getPcgSubobject()
        let result = pcgSubobject.NodeTitle ? pcgSubobject.NodeTitle.toString() : nodeTitle(pcgSubobject)
        return result
    }
    const subgraphObject = entity.getSubgraphObject()
    if (subgraphObject) {
        return subgraphObject.Graph.getName()
    }
    const settingsObject = entity.getSettingsObject()
    if (settingsObject) {
        if (settingsObject.ExportPath?.valueOf()?.type === paths.pcgHiGenGridSizeSettings) {
            return `Grid Size: ${(
                settingsObject.HiGenGridSize?.toString().match(/\d+/)?.[0]?.concat("00")
                ?? settingsObject.HiGenGridSize?.toString().match(/^\w+$/)?.[0]
            ) ?? "256"}`
        }
        if (settingsObject.BlueprintElementInstance) {
            return Utility.formatStringName(settingsObject.BlueprintElementType.getName())
        }
        if (settingsObject.Operation) {
            const match = settingsObject.Name?.toString().match(/PCGMetadata(\w+)Settings_\d+/)
            if (match) {
                return Utility.formatStringName(match[1] + ": " + settingsObject.Operation)
            }
        }
        const settingsSubgraphObject = settingsObject.getSubgraphObject()
        if (settingsSubgraphObject && settingsSubgraphObject.Graph) {
            return settingsSubgraphObject.Graph.getName()
        }
    }
    let memberName = entity.FunctionReference?.MemberName?.toString()
    if (memberName) {
        const memberParent = entity.FunctionReference.MemberParent?.path ?? ""
        switch (memberName) {
            case "AddKey":
                let result = memberParent.match(sequencerScriptingNameRegex)
                if (result) {
                    return `Add Key (${Utility.formatStringName(result[1])})`
                }
            case "Concat_StrStr":
                return "Append"
        }
        const memberNameTraceLineMatch = memberName.match(Configuration.lineTracePattern)
        if (memberNameTraceLineMatch) {
            return "Line Trace"
                + (memberNameTraceLineMatch[1] === "Multi" ? " Multi " : " ")
                + (memberNameTraceLineMatch[2] === ""
                    ? "By Channel"
                    : Utility.formatStringName(memberNameTraceLineMatch[2])
                )
        }
        switch (memberParent) {
            case paths.blueprintGameplayTagLibrary:
            case paths.kismetMathLibrary:
            case paths.kismetStringLibrary:
            case paths.slateBlueprintLibrary:
            case paths.timeManagementBlueprintLibrary:
                const leadingLetter = memberName.match(/[BF]([A-Z]\w+)/)
                if (leadingLetter) {
                    // Some functions start with B or F (Like FCeil, FMax, BMin)
                    memberName = leadingLetter[1]
                }
                switch (memberName) {
                    case "Abs": return "ABS"
                    case "BooleanAND": return "AND"
                    case "BooleanNAND": return "NAND"
                    case "BooleanOR": return "OR"
                    case "Exp": return "e"
                    case "LineTraceSingle": return "Line Trace By Channel"
                    case "Max": return "MAX"
                    case "MaxInt64": return "MAX"
                    case "Min": return "MIN"
                    case "MinInt64": return "MIN"
                    case "Not_PreBool": return "NOT"
                    case "Sin": return "SIN"
                    case "Sqrt": return "SQRT"
                    case "Square": return "^2"
                    // Dot products not respecting MemberName pattern
                    case "CrossProduct2D": return "cross"
                    case "Vector4_CrossProduct3": return "cross3"
                    case "DotProduct2D":
                    case "Vector4_DotProduct":
                        return "dot"
                    case "Vector4_DotProduct3": return "dot3"
                }
                if (memberName.startsWith("Add_")) {
                    return "+"
                }
                if (memberName.startsWith("And_")) {
                    return "&"
                }
                if (memberName.startsWith("Conv_")) {
                    return "" // Conversion nodes do not have visible names
                }
                if (memberName.startsWith("Cross_")) {
                    return "cross"
                }
                if (memberName.startsWith("Divide_")) {
                    return String.fromCharCode(0x00f7)
                }
                if (memberName.startsWith("Dot_")) {
                    return "dot"
                }
                if (memberName.startsWith("EqualEqual_")) {
                    return "=="
                }
                if (memberName.startsWith("Greater_")) {
                    return ">"
                }
                if (memberName.startsWith("GreaterEqual_")) {
                    return ">="
                }
                if (memberName.startsWith("Less_")) {
                    return "<"
                }
                if (memberName.startsWith("LessEqual_")) {
                    return "<="
                }
                if (memberName.startsWith("Multiply_")) {
                    return String.fromCharCode(0x2a2f)
                }
                if (memberName.startsWith("Not_")) {
                    return "~"
                }
                if (memberName.startsWith("NotEqual_")) {
                    return "!="
                }
                if (memberName.startsWith("Or_")) {
                    return "|"
                }
                if (memberName.startsWith("Percent_")) {
                    return "%"
                }
                if (memberName.startsWith("Subtract_")) {
                    return "-"
                }
                if (memberName.startsWith("Xor_")) {
                    return "^"
                }
                break
            case paths.blueprintSetLibrary:
                {
                    const setOperationMatch = memberName.match(/Set_(\w+)/)
                    if (setOperationMatch) {
                        return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                    }
                }
                break
            case paths.blueprintMapLibrary:
                {
                    const setOperationMatch = memberName.match(/Map_(\w+)/)
                    if (setOperationMatch) {
                        return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                    }
                }
                break
            case paths.kismetArrayLibrary:
                {
                    const arrayOperationMath = memberName.match(/Array_(\w+)/)
                    if (arrayOperationMath) {
                        return arrayOperationMath[1].toUpperCase()
                    }
                }
                break
        }
        return Utility.formatStringName(memberName)
    }
    if (entity.OpName) {
        return niagaraNodeNames[entity.OpName.toString()]
            ?? Utility.formatStringName(entity.OpName.toString().replaceAll(/(?:^\w+(?<!^Matrix))?::/g, " "))
    }
    if (entity.FunctionDisplayName) {
        return Utility.formatStringName(entity.FunctionDisplayName.toString())
    }
    if (entity.ObjectRef) {
        return entity.ObjectRef.getName()
    }
    let prefix
    if (
        className.startsWith(prefix = "/Script/NiagaraEditor.NiagaraNodeParameter")
        || className.startsWith(prefix = "/Script/NiagaraEditor.NiagaraNode")
    ) {
        return entity["Input"]?.["Name"]?.toString() ?? Utility.formatStringName(className.substring(prefix.length))
    }
    if (entity.ParameterName) {
        return entity.ParameterName.toString()
    }
    return Utility.formatStringName(entity.getNameAndCounter()[0])
}
