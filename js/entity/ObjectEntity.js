import Configuration from "../Configuration.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import GuidEntity from "./GuidEntity.js"
import IdentifierEntity from "./IdentifierEntity.js"
import IEntity from "./IEntity.js"
import IntegerEntity from "./IntegerEntity.js"
import LinearColorEntity from "./LinearColorEntity.js"
import MacroGraphReferenceEntity from "./MacroGraphReferenceEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PinEntity from "./PinEntity.js"
import SVGIcon from "../SVGIcon.js"
import SymbolEntity from "./SymbolEntity.js"
import UnionType from "./UnionType.js"
import UserDefinedPinEntity from "./UserDefinedPinEntity.js"
import Utility from "../Utility.js"
import VariableReferenceEntity from "./VariableReferenceEntity.js"

export default class ObjectEntity extends IEntity {

    static attributes = {
        Class: {
            type: ObjectReferenceEntity,
        },
        Name: {
            default: "",
        },
        AxisKey: {
            type: SymbolEntity,
            showDefault: false,
        },
        InputAxisKey: {
            type: SymbolEntity,
            showDefault: false,
        },
        bIsPureFunc: {
            default: false,
            showDefault: false,
        },
        bIsConstFunc: {
            default: false,
            showDefault: false,
        },
        VariableReference: {
            type: VariableReferenceEntity,
            default: null,
            showDefault: false,
        },
        SelfContextInfo: {
            type: SymbolEntity,
            default: null,
            showDefault: false,
        },
        DelegatePropertyName: {
            type: String,
            showDefault: false,
        },
        DelegateOwnerClass: {
            type: ObjectReferenceEntity,
            showDefault: false,
        },
        ComponentPropertyName: {
            type: String,
            showDefault: false,
        },
        EventReference: {
            type: FunctionReferenceEntity,
            default: null,
            showDefault: false,
        },
        FunctionReference: {
            type: FunctionReferenceEntity,
            default: null,
            showDefault: false,
        },
        CustomFunctionName: {
            type: String,
            showDefault: false,
        },
        TargetType: {
            type: ObjectReferenceEntity,
            default: null,
            showDefault: false,
        },
        MacroGraphReference: {
            type: MacroGraphReferenceEntity,
            default: null,
            showDefault: false,
        },
        Enum: {
            type: ObjectReferenceEntity,
            showDefault: false,
        },
        InputKey: {
            type: SymbolEntity,
            showDefault: false,
        },
        bOverrideFunction: {
            type: Boolean,
            showDefault: false,
        },
        bInternalEvent: {
            type: Boolean,
            showDefault: false,
        },
        bConsumeInput: {
            type: Boolean,
            showDefault: false,
        },
        bExecuteWhenPaused: {
            type: Boolean,
            showDefault: false,
        },
        bOverrideParentBinding: {
            type: Boolean,
            showDefault: false,
        },
        bControl: {
            type: Boolean,
            showDefault: false,
        },
        bAlt: {
            type: Boolean,
            showDefault: false,
        },
        bShift: {
            type: Boolean,
            showDefault: false,
        },
        bCommand: {
            type: Boolean,
            showDefault: false,
        },
        CommentColor: {
            type: LinearColorEntity,
            showDefault: false,
        },
        bCommentBubbleVisible_InDetailsPanel: {
            type: Boolean,
            showDefault: false,
        },
        bColorCommentBubble: {
            type: Boolean,
            default: false,
            showDefault: false,
        },
        MoveMode: {
            type: SymbolEntity,
            showDefault: false,
        },
        NodePosX: {
            type: IntegerEntity,
            showDefault: false,
        },
        NodePosY: {
            type: IntegerEntity,
            showDefault: false,
        },
        NodeWidth: {
            type: IntegerEntity,
            showDefault: false,
        },
        NodeHeight: {
            type: IntegerEntity,
            showDefault: false,
        },
        bCommentBubblePinned: {
            type: Boolean,
            showDefault: false,
        },
        bCommentBubbleVisible: {
            type: Boolean,
            showDefault: false,
        },
        NodeComment: {
            type: String,
            showDefault: false,
        },
        AdvancedPinDisplay: {
            type: IdentifierEntity,
            default: null,
            showDefault: false,
        },
        EnabledState: {
            type: IdentifierEntity,
            default: null,
            showDefault: false,
        },
        NodeGuid: {
            type: GuidEntity,
        },
        ErrorType: {
            type: IntegerEntity,
            showDefault: false,
        },
        ErrorMsg: {
            type: String,
            default: "",
            showDefault: false,
        },
        CustomProperties: {
            type: [new UnionType(PinEntity, UserDefinedPinEntity)]
        },
    }

    static nameRegex = /^(\w+?)(?:_(\d+))?$/
    static sequencerScriptingNameRegex = /\/Script\/SequencerScripting\.MovieSceneScripting(.+)Channel/
    static #keyName = {
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

    static {
        this.cleanupAttributes(this.attributes)
    }

    /** @param {String} value */
    static keyName(value) {
        let result = ObjectEntity.#keyName[value]
        if (result) {
            return result
        }
        result = Utility.numberFromText(value)?.toString()
        if (result) {
            return result
        }
        const match = value.match(/NumPad([a-zA-Z]+)/)
        if (match) {
            result = Utility.numberFromText(match[1])
            if (result) {
                return "Num " + result
            }
        }
    }

    constructor(values, suppressWarns = false) {
        super(values, suppressWarns)
        /** @type {ObjectReferenceEntity} */ this.Class
        /** @type {String} */ this.Name
        /** @type {SymbolEntity?} */ this.AxisKey
        /** @type {SymbolEntity?} */ this.InputAxisKey
        /** @type {Boolean?} */ this.bIsPureFunc
        /** @type {Boolean?} */ this.bIsConstFunc
        /** @type {VariableReferenceEntity?} */ this.VariableReference
        /** @type {SymbolEntity?} */ this.SelfContextInfo
        /** @type {String?} */ this.DelegatePropertyName
        /** @type {ObjectReferenceEntity?} */ this.DelegateOwnerClass
        /** @type {FunctionReferenceEntity?} */ this.ComponentPropertyName
        /** @type {FunctionReferenceEntity?} */ this.EventReference
        /** @type {FunctionReferenceEntity?} */ this.FunctionReference
        /** @type {String} */ this.CustomFunctionName
        /** @type {ObjectReferenceEntity?} */ this.TargetType
        /** @type {MacroGraphReferenceEntity?} */ this.MacroGraphReference
        /** @type {ObjectReferenceEntity?} */ this.Enum
        /** @type {SymbolEntity?} */ this.InputKey
        /** @type {Boolean?} */ this.bOverrideFunction
        /** @type {Boolean?} */ this.bInternalEvent
        /** @type {Boolean?} */ this.bConsumeInput
        /** @type {Boolean?} */ this.bExecuteWhenPaused
        /** @type {Boolean?} */ this.bOverrideParentBinding
        /** @type {Boolean?} */ this.bControl
        /** @type {Boolean?} */ this.bAlt
        /** @type {Boolean?} */ this.bShift
        /** @type {Boolean?} */ this.bCommand
        /** @type {LinearColorEntity?} */ this.CommentColor
        /** @type {Boolean?} */ this.bCommentBubbleVisible_InDetailsPanel
        /** @type {IntegerEntity} */ this.NodePosX
        /** @type {IntegerEntity} */ this.NodePosY
        /** @type {IntegerEntity?} */ this.NodeWidth
        /** @type {IntegerEntity?} */ this.NodeHeight
        /** @type {Boolean?} */ this.bCommentBubblePinned
        /** @type {Boolean?} */ this.bCommentBubbleVisible
        /** @type {String?} */ this.NodeComment
        /** @type {IdentifierEntity?} */ this.AdvancedPinDisplay
        /** @type {IdentifierEntity?} */ this.EnabledState
        /** @type {GuidEntity} */ this.NodeGuid
        /** @type {IntegerEntity?} */ this.ErrorType
        /** @type {String?} */ this.ErrorMsg
        /** @type {PinEntity[]} */ this.CustomProperties
    }

    getClass() {
        return this.Class.path
    }

    getType() {
        let classValue = this.getClass()
        if (this.MacroGraphReference?.MacroGraph?.path) {
            return this.MacroGraphReference.MacroGraph.path
        }
        return classValue
    }

    getObjectName(dropCounter = false) {
        if (dropCounter) {
            return this.getNameAndCounter()[0]
        }
        return this.Name
    }

    /** @returns {[String, Number]} */
    getNameAndCounter() {
        const result = this.getObjectName(false).match(ObjectEntity.nameRegex)
        let name = ""
        let counter = null
        if (result) {
            if (result.length > 1) {
                name = result[1]
            }
            if (result.length > 2) {
                counter = parseInt(result[2])
            }
            return [name, counter]
        }
        return ["", 0]
    }

    getCounter() {
        return this.getNameAndCounter()[1]
    }

    getNodeWidth() {
        return this.NodeWidth ??
            this.getType() == Configuration.nodeType.comment ? Configuration.defaultCommentWidth : undefined
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        if (!this.NodeWidth) {
            this.NodeWidth = new IntegerEntity()
        }
        this.NodeWidth.value = value
    }

    getNodeHeight() {
        return this.NodeHeight ??
            this.getType() == Configuration.nodeType.comment ? Configuration.defaultCommentHeight : undefined
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        if (!this.NodeHeight) {
            this.NodeHeight = new IntegerEntity()
        }
        this.NodeHeight.value = value
    }

    getNodePosX() {
        return this.NodePosX?.value ?? 0
    }

    /** @param {Number} value */
    setNodePosX(value) {
        if (!this.NodePosX) {
            this.NodePosX = new IntegerEntity()
        }
        this.NodePosX.value = Math.round(value)
    }

    getNodePosY() {
        return this.NodePosY?.value ?? 0
    }

    /** @param {Number} value */
    setNodePosY(value) {
        if (!this.NodePosY) {
            this.NodePosY = new IntegerEntity()
        }
        this.NodePosY.value = Math.round(value)
    }

    isEvent() {
        switch (this.getClass()) {
            case Configuration.nodeType.customEvent:
            case Configuration.nodeType.event:
            case Configuration.nodeType.inputAxisKeyEvent:
            case Configuration.nodeType.inputVectorAxisEvent:
                return true
        }
        return false
    }

    isDevelopmentOnly() {
        const nodeClass = this.getClass()
        return this.EnabledState?.toString() === "DevelopmentOnly"
            || nodeClass.includes("Debug", Math.max(0, nodeClass.lastIndexOf(".")))
    }

    getHIDAttribute() {
        return this.InputKey ?? this.AxisKey ?? this.InputAxisKey
    }

    getDelegatePin() {
        return this.CustomProperties?.find(pin => pin.PinType.PinCategory === "delegate")
    }

    nodeDisplayName() {
        switch (this.getType()) {
            case Configuration.nodeType.componentBoundEvent:
                return `${Utility.formatStringName(this.DelegatePropertyName)} (${this.ComponentPropertyName})`
            case Configuration.nodeType.createDelegate:
                return "Create Event"
            case Configuration.nodeType.customEvent:
                if (this.CustomFunctionName) {
                    return this.CustomFunctionName
                }
            case Configuration.nodeType.dynamicCast:
                if (!this.TargetType) {
                    return "Bad cast node" // Target type not found
                }
                return `Cast To ${this.TargetType?.getName()}`
            case Configuration.nodeType.enumLiteral:
                return `Literal enum ${this.Enum?.getName()}`
            case Configuration.nodeType.event:
                return `Event ${(this.EventReference?.MemberName ?? "").replace(/^Receive/, "")}`
            case Configuration.nodeType.executionSequence:
                return "Sequence"
            case Configuration.nodeType.forEachElementInEnum:
                return `For Each ${this.Enum?.getName()}`
            case Configuration.nodeType.forEachLoopWithBreak:
                return "For Each Loop with Break"
            case Configuration.nodeType.ifThenElse:
                return "Branch"
            case Configuration.nodeType.spawnActorFromClass:
                return `SpawnActor ${Utility.formatStringName(
                    this.CustomProperties.find(pinEntity => pinEntity.getType() == "class")?.DefaultObject?.getName()
                    ?? "NONE"
                )}`
            case Configuration.nodeType.switchEnum:
                return `Switch on ${this.Enum?.getName() ?? "Enum"}`
            case Configuration.nodeType.variableGet:
                return ""
            case Configuration.nodeType.variableSet:
                return "SET"
        }
        const keyNameSymbol = this.getHIDAttribute()
        if (keyNameSymbol) {
            const keyName = keyNameSymbol.toString()
            let title = ObjectEntity.keyName(keyName) ?? Utility.formatStringName(keyName)
            if (this.getClass() === Configuration.nodeType.inputDebugKey) {
                title = "Debug Key " + title
            } else if (this.getClass() === Configuration.nodeType.getInputAxisKeyValue) {
                title = "Get " + title
            }
            return title
        }
        if (this.getClass() === Configuration.nodeType.macro) {
            return Utility.formatStringName(this.MacroGraphReference?.getMacroName())
        }
        let memberName = this.FunctionReference?.MemberName
        if (memberName) {
            const memberParent = this.FunctionReference.MemberParent?.path ?? ""
            switch (memberName) {
                case "AddKey":
                    {
                        let result = memberParent.match(ObjectEntity.sequencerScriptingNameRegex)
                        if (result) {
                            return `Add Key (${Utility.formatStringName(result[1])})`
                        }
                    }
                    break
                case "LineTraceSingle":
                    return "Line Trace By Channel"
                case "LineTraceSingleByProfile":
                    return "Line Trace By Profile"
            }
            switch (memberParent) {
                case "/Script/Engine.KismetMathLibrary":
                    if (memberName.startsWith("Conv_")) {
                        return "" // Conversion  nodes do not have visible names
                    }
                    if (memberName.startsWith("Percent_")) {
                        return "%"
                    }
                    if (memberName.startsWith("EqualEqual_")) {
                        return "=="
                    }
                    const leadingLetter = memberName.match(/[BF]([A-Z]\w+)/)
                    if (leadingLetter) {
                        // Some functions start with B or F (Like FCeil, FMax, BMin)
                        memberName = leadingLetter[1]
                    }
                    switch (memberName) {
                        case "Abs": return "ABS"
                        case "Exp": return "e"
                        case "LineTraceSingle": return "Line Trace By Channel"
                        case "Max": return "MAX"
                        case "MaxInt64": return "MAX"
                        case "Min": return "MIN"
                        case "MinInt64": return "MIN"
                    }
                    break
                case "/Script/Engine.BlueprintSetLibrary":
                    {
                        const setOperationMatch = memberName.match(/Set_(\w+)/)
                        if (setOperationMatch) {
                            return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                        }
                    }
                    break
                case "/Script/Engine.BlueprintMapLibrary":
                    {
                        const setOperationMatch = memberName.match(/Map_(\w+)/)
                        if (setOperationMatch) {
                            return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                        }
                    }
                    break
            }
            return Utility.formatStringName(memberName)
        }
        return Utility.formatStringName(this.getNameAndCounter()[0])
    }

    nodeColor() {
        switch (this.getClass()) {
            case Configuration.nodeType.callFunction:
                return this.bIsPureFunc
                    ? Configuration.nodeColors.green
                    : Configuration.nodeColors.blue
            case Configuration.nodeType.inputDebugKey:
            case Configuration.nodeType.inputKey:
                return Configuration.nodeColors.red
            case Configuration.nodeType.createDelegate:
            case Configuration.nodeType.enumLiteral:
            case Configuration.nodeType.makeArray:
            case Configuration.nodeType.makeMap:
            case Configuration.nodeType.select:
                return Configuration.nodeColors.green
            case Configuration.nodeType.executionSequence:
            case Configuration.nodeType.ifThenElse:
            case Configuration.nodeType.macro:
            case Configuration.nodeType.multiGate:
                return Configuration.nodeColors.gray
            case Configuration.nodeType.dynamicCast:
                return Configuration.nodeColors.turquoise
            case Configuration.nodeType.switchEnum:
                return Configuration.nodeColors.lime
        }
        if (this.isEvent()) {
            return Configuration.nodeColors.red
        }
        if (this.bIsPureFunc) {
            return Configuration.nodeColors.green
        }
        return Configuration.nodeColors.blue
    }

    nodeIcon() {
        switch (this.getType()) {
            case Configuration.nodeType.addDelegate:
            case Configuration.nodeType.createDelegate:
                return SVGIcon.node
            case Configuration.nodeType.customEvent: return SVGIcon.event
            case Configuration.nodeType.doN: return SVGIcon.doN
            case Configuration.nodeType.doOnce: return SVGIcon.doOnce
            case Configuration.nodeType.dynamicCast: return SVGIcon.cast
            case Configuration.nodeType.enumLiteral: return SVGIcon.enum
            case Configuration.nodeType.event: return SVGIcon.event
            case Configuration.nodeType.executionSequence:
            case Configuration.nodeType.multiGate:
                return SVGIcon.sequence
            case Configuration.nodeType.forEachElementInEnum:
            case Configuration.nodeType.forLoop:
            case Configuration.nodeType.forLoopWithBreak:
            case Configuration.nodeType.whileLoop:
                return SVGIcon.loop
            case Configuration.nodeType.forEachLoop:
            case Configuration.nodeType.forEachLoopWithBreak:
                return SVGIcon.forEachLoop
            case Configuration.nodeType.ifThenElse: return SVGIcon.branchNode
            case Configuration.nodeType.isValid: return SVGIcon.questionMark
            case Configuration.nodeType.makeArray: return SVGIcon.makeArray
            case Configuration.nodeType.makeMap: return SVGIcon.makeMap
            case Configuration.nodeType.makeSet: return SVGIcon.makeSet
            case Configuration.nodeType.select: return SVGIcon.select
            case Configuration.nodeType.spawnActorFromClass: return SVGIcon.spawnActor
            case Configuration.nodeType.switchEnum: return SVGIcon.switch
        }
        if (this.nodeDisplayName().startsWith("Break")) {
            return SVGIcon.breakStruct
        }
        if (this.getClass() === Configuration.nodeType.macro) {
            return SVGIcon.macro
        }
        const hidValue = this.getHIDAttribute()?.toString()
        if (hidValue) {
            if (hidValue.includes("Mouse")) {
                return SVGIcon.mouse
            } else if (hidValue.includes("Gamepad_Special")) {
                return SVGIcon.keyboard // This is called Touchpad in UE
            } else if (hidValue.includes("Gamepad") || hidValue.includes("Steam")) {
                return SVGIcon.gamepad
            } else if (hidValue.includes("Touch")) {
                return SVGIcon.touchpad
            } else {
                return SVGIcon.keyboard
            }
        }
        if (this.getDelegatePin()) {
            return SVGIcon.event
        }
        return SVGIcon.functionSymbol
    }
}
