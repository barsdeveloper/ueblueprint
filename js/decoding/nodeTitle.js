import Configuration from "../Configuration.js"
import Utility from "../Utility.js"

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

function keyName(value) {
    /** @type {String} */
    let result = keyNameValue[value]
    if (result) {
        return result
    }
    result = Utility.numberFromText(value)?.toString()
    if (result) {
        return result
    }
    const match = value.match(/NumPad([a-zA-Z]+)/)
    if (match) {
        result = Utility.numberFromText(match[1]).toString()
        if (result) {
            return "Num " + result
        }
    }
}

/** @param {ObjectEntity} entity */
export default function nodeTitle(entity) {
    let input
    switch (entity.getType()) {
        case Configuration.paths.asyncAction:
            if (entity.ProxyFactoryFunctionName) {
                return Utility.formatStringName(entity.ProxyFactoryFunctionName)
            }
        case Configuration.paths.actorBoundEvent:
        case Configuration.paths.componentBoundEvent:
            return `${Utility.formatStringName(entity.DelegatePropertyName)} (${entity.ComponentPropertyName ?? "Unknown"})`
        case Configuration.paths.callDelegate:
            return `Call ${entity.DelegateReference?.MemberName ?? "None"}`
        case Configuration.paths.createDelegate:
            return "Create Event"
        case Configuration.paths.customEvent:
            if (entity.CustomFunctionName) {
                return entity.CustomFunctionName
            }
        case Configuration.paths.dynamicCast:
            if (!entity.TargetType) {
                return "Bad cast node" // Target type not found
            }
            return `Cast To ${entity.TargetType?.getName()}`
        case Configuration.paths.enumLiteral:
            return `Literal enum ${entity.Enum?.getName()}`
        case Configuration.paths.event:
            return `Event ${(entity.EventReference?.MemberName ?? "").replace(/^Receive/, "")}`
        case Configuration.paths.executionSequence:
            return "Sequence"
        case Configuration.paths.forEachElementInEnum:
            return `For Each ${entity.Enum?.getName()}`
        case Configuration.paths.forEachLoopWithBreak:
            return "For Each Loop with Break"
        case Configuration.paths.functionEntry:
            return entity.FunctionReference?.MemberName === "UserConstructionScript"
                ? "Construction Script"
                : entity.FunctionReference?.MemberName
        case Configuration.paths.functionResult:
            return "Return Node"
        case Configuration.paths.ifThenElse:
            return "Branch"
        case Configuration.paths.makeStruct:
            if (entity.StructType) {
                return `Make ${entity.StructType.getName()}`
            }
        case Configuration.paths.materialExpressionComponentMask: {
            const materialObject = entity.getMaterialSubobject()
            return `Mask ( ${Configuration.rgba
                .filter(k => /** @type {MirroredEntity<any>} */(materialObject[k]).get() === true)
                .map(v => v + " ")
                .join("")})`
        }
        case Configuration.paths.materialExpressionConstant:
            input ??= [entity.getCustomproperties().find(pinEntity => pinEntity.PinName == "Value")?.DefaultValue]
        case Configuration.paths.materialExpressionConstant2Vector:
            input ??= [
                entity.getCustomproperties().find(pinEntity => pinEntity.PinName == "X")?.DefaultValue,
                entity.getCustomproperties().find(pinEntity => pinEntity.PinName == "Y")?.DefaultValue,
            ]
        case Configuration.paths.materialExpressionConstant3Vector:
            if (!input) {
                /** @type {VectorEntity} */
                const vector = entity.getCustomproperties()
                    .find(pinEntity => pinEntity.PinName == "Constant")
                    ?.DefaultValue
                input = [vector.X, vector.Y, vector.Z]
            }
        case Configuration.paths.materialExpressionConstant4Vector:
            if (!input) {
                /** @type {LinearColorEntity} */
                const vector = entity.getCustomproperties()
                    .find(pinEntity => pinEntity.PinName == "Constant")
                    ?.DefaultValue
                input = [vector.R, vector.G, vector.B, vector.A].map(v => v.valueOf())
            }
            if (input.length > 0) {
                return input.map(v => Utility.printExponential(v)).reduce((acc, cur) => acc + "," + cur)
            }
            break
        case Configuration.paths.materialExpressionFunctionInput: {
            const materialObject = entity.getMaterialSubobject()
            const inputName = materialObject?.InputName ?? "In"
            const inputType = materialObject?.InputType?.value.match(/^.+?_(\w+)$/)?.[1] ?? "Vector3"
            return `Input ${inputName} (${inputType})`
        }
        case Configuration.paths.materialExpressionLogarithm:
            return "Ln"
        case Configuration.paths.materialExpressionLogarithm10:
            return "Log10"
        case Configuration.paths.materialExpressionLogarithm2:
            return "Log2"
        case Configuration.paths.materialExpressionMaterialFunctionCall:
            const materialFunction = entity.getMaterialSubobject()?.MaterialFunction
            if (materialFunction) {
                return materialFunction.getName()
            }
            break
        case Configuration.paths.materialExpressionSquareRoot:
            return "Sqrt"
        case Configuration.paths.metasoundEditorGraphExternalNode:
            if (entity["ClassName"]?.["Name"]) {
                return entity["ClassName"]["Name"]
            }
        case Configuration.paths.pcgEditorGraphNodeInput:
            return "Input"
        case Configuration.paths.pcgEditorGraphNodeOutput:
            return "Output"
        case Configuration.paths.spawnActorFromClass:
            let className = entity.getCustomproperties()
                .find(pinEntity => pinEntity.PinName == "ReturnValue")
                ?.PinType
                ?.PinSubCategoryObject
                ?.getName()
            if (className === "Actor") {
                className = null
            }
            return `SpawnActor ${Utility.formatStringName(className ?? "NONE")}`
        case Configuration.paths.switchEnum:
            return `Switch on ${entity.Enum?.getName() ?? "Enum"}`
        case Configuration.paths.switchInteger:
            return `Switch on Int`
        case Configuration.paths.variableGet:
            return ""
        case Configuration.paths.variableSet:
            return "SET"
    }
    let switchTarget = entity.switchTarget()
    if (switchTarget) {
        if (switchTarget[0] !== "E") {
            switchTarget = Utility.formatStringName(switchTarget)
        }
        return `Switch on ${switchTarget}`
    }
    if (entity.isComment()) {
        return entity.NodeComment
    }
    const keyNameSymbol = entity.getHIDAttribute()
    if (keyNameSymbol) {
        const name = keyNameSymbol.toString()
        let title = keyName(name) ?? Utility.formatStringName(name)
        if (entity.getClass() === Configuration.paths.inputDebugKey) {
            title = "Debug Key " + title
        } else if (entity.getClass() === Configuration.paths.getInputAxisKeyValue) {
            title = "Get " + title
        }
        return title
    }
    if (entity.getClass() === Configuration.paths.macro) {
        return Utility.formatStringName(entity.MacroGraphReference?.getMacroName())
    }
    if (entity.isMaterial() && entity.getMaterialSubobject()) {
        let result = nodeTitle(entity.getMaterialSubobject())
        result = result.match(/Material Expression (.+)/)?.[1] ?? result
        return result
    }
    if (entity.isPcg() && entity.getPcgSubobject()) {
        let pcgSubobject = entity.getPcgSubobject()
        let result = pcgSubobject.NodeTitle ? pcgSubobject.NodeTitle : nodeTitle(pcgSubobject)
        return result
    }
    const subgraphObject = entity.getSubgraphObject()
    if (subgraphObject) {
        return subgraphObject.Graph.getName()
    }
    const settingsObject = entity.getSettingsObject()
    if (settingsObject) {
        if (settingsObject.ExportPath.type === Configuration.paths.pcgHiGenGridSizeSettings) {
            return `Grid Size: ${(
                settingsObject.HiGenGridSize?.toString().match(/\d+/)?.[0]?.concat("00")
                ?? settingsObject.HiGenGridSize?.toString().match(/^\w+$/)?.[0]
            ) ?? "256"}`
        }
        if (settingsObject.BlueprintElementInstance) {
            return Utility.formatStringName(settingsObject.BlueprintElementType.getName())
        }
        if (settingsObject.Operation) {
            const match = settingsObject.Name.match(/PCGMetadata(\w+)Settings_\d+/)
            if (match) {
                return Utility.formatStringName(match[1] + ": " + settingsObject.Operation)
            }
        }
        const settingsSubgraphObject = settingsObject.getSubgraphObject()
        if (settingsSubgraphObject && settingsSubgraphObject.Graph) {
            return settingsSubgraphObject.Graph.getName()
        }
    }
    let memberName = entity.FunctionReference?.MemberName
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
            case Configuration.paths.blueprintGameplayTagLibrary:
            case Configuration.paths.kismetMathLibrary:
            case Configuration.paths.slateBlueprintLibrary:
            case Configuration.paths.timeManagementBlueprintLibrary:
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
            case Configuration.paths.blueprintSetLibrary:
                {
                    const setOperationMatch = memberName.match(/Set_(\w+)/)
                    if (setOperationMatch) {
                        return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                    }
                }
                break
            case Configuration.paths.blueprintMapLibrary:
                {
                    const setOperationMatch = memberName.match(/Map_(\w+)/)
                    if (setOperationMatch) {
                        return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                    }
                }
                break
            case Configuration.paths.kismetArrayLibrary:
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
        switch (entity.OpName) {
            case "Boolean::LogicAnd": return "Logic AND"
            case "Boolean::LogicEq": return "=="
            case "Boolean::LogicNEq": return "!="
            case "Boolean::LogicNot": return "Logic NOT"
            case "Boolean::LogicOr": return "Logic OR"
            case "Matrix::MatrixMultiply": return "Multiply (Matrix * Matrix)"
            case "Matrix::MatrixVectorMultiply": return "Multiply (Matrix * Vector4)"
            case "Numeric::Abs": return "Abs"
            case "Numeric::Add": return "+"
            case "Numeric::DistancePos": return "Distance"
            case "Numeric::Mul": return String.fromCharCode(0x2a2f)
        }
        return Utility.formatStringName(entity.OpName).replaceAll("::", " ")
    }
    if (entity.FunctionDisplayName) {
        return Utility.formatStringName(entity.FunctionDisplayName)
    }
    if (entity.ObjectRef) {
        return entity.ObjectRef.getName()
    }
    return Utility.formatStringName(entity.getNameAndCounter()[0])
}
