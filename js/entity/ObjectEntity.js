import Configuration from "../Configuration"
import FunctionReferenceEntity from "./FunctionReferenceEntity"
import GuidEntity from "./GuidEntity"
import IdentifierEntity from "./IdentifierEntity"
import IEntity from "./IEntity"
import IntegerEntity from "./IntegerEntity"
import LinearColorEntity from "./LinearColorEntity"
import MacroGraphReferenceEntity from "./MacroGraphReferenceEntity"
import ObjectReferenceEntity from "./ObjectReferenceEntity"
import PinEntity from "./PinEntity"
import SVGIcon from "../SVGIcon"
import SymbolEntity from "./SymbolEntity"
import Utility from "../Utility"
import VariableReferenceEntity from "./VariableReferenceEntity"

export default class ObjectEntity extends IEntity {

    static attributes = {
        Class: {
            type: ObjectReferenceEntity,
        },
        Name: "",
        AxisKey: {
            type: SymbolEntity,
            showDefault: false,
        },
        InputAxisKey: {
            type: SymbolEntity,
            showDefault: false,
        },
        bIsPureFunc: {
            value: false,
            showDefault: false,
        },
        bIsConstFunc: {
            value: false,
            showDefault: false,
        },
        VariableReference: {
            type: VariableReferenceEntity,
            value: null,
            showDefault: false,
        },
        SelfContextInfo: {
            type: SymbolEntity,
            value: null,
            showDefault: false,
        },
        EventReference: {
            type: FunctionReferenceEntity,
            value: null,
            showDefault: false,
        },
        FunctionReference: {
            type: FunctionReferenceEntity,
            value: null,
            showDefault: false,
        },
        CustomFunctionName: {
            type: String,
            showDefault: false,
        },
        TargetType: {
            type: ObjectReferenceEntity,
            value: null,
            showDefault: false,
        },
        MacroGraphReference: {
            type: MacroGraphReferenceEntity,
            value: null,
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
            value: false,
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
            value: null,
            showDefault: false,
        },
        EnabledState: {
            type: IdentifierEntity,
            value: null,
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
            value: "",
            showDefault: false,
        },
        CustomProperties: {
            type: [PinEntity]
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
        /** @type {SymbolEntity?} */ this.InputKey
        /** @type {Boolean?} */ this.bIsPureFunc
        /** @type {Boolean?} */ this.bIsConstFunc
        /** @type {VariableReferenceEntity?} */ this.VariableReference
        /** @type {SymbolEntity?} */ this.SelfContextInfo
        /** @type {FunctionReferenceEntity?} */ this.FunctionReference
        /** @type {String} */ this.CustomFunctionName
        /** @type {FunctionReferenceEntity?} */ this.EventReference
        /** @type {ObjectReferenceEntity?} */ this.TargetType
        /** @type {MacroGraphReferenceEntity?} */ this.MacroGraphReference
        /** @type {ObjectReferenceEntity?} */ this.Enum
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
        if (classValue === Configuration.nodeType.macro) {
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
        if (
            this.getClass() === Configuration.nodeType.event
            || this.getClass() === Configuration.nodeType.customEvent
        ) {
            return true
        }
        if (this.getDelegatePin()) {
            return true
        }
        return false
    }

    isDevelopmentOnly() {
        const nodeClass = this.getClass()
        return this.EnabledState?.toString() === "DevelopmentOnly"
            || nodeClass.includes("Debug", Math.max(0, nodeClass.lastIndexOf(".")))
    }

    hasHIDAttribute() {
        return this.InputKey ?? this.AxisKey ?? this.InputAxisKey
    }

    getDelegatePin() {
        return this.CustomProperties?.find(pin => pin.PinType.PinCategory === "delegate")
    }

    nodeDisplayName() {
        switch (this.getType()) {
            case Configuration.nodeType.callFunction:
            case Configuration.nodeType.commutativeAssociativeBinaryOperator:
                let memberName = this.FunctionReference.MemberName ?? ""
                const memberParent = this.FunctionReference.MemberParent?.path ?? ""
                if (memberName === "AddKey") {
                    let result = memberParent.match(ObjectEntity.sequencerScriptingNameRegex)
                    if (result) {
                        return `Add Key (${Utility.formatStringName(result[1])})`
                    }
                }
                if (memberParent == "/Script/Engine.KismetMathLibrary") {
                    if (memberName.startsWith("Conv_")) {
                        return "" // Conversion  nodes do not have visible names
                    }
                    if (memberName.startsWith("Percent_")) {
                        return "%"
                    }
                    const leadingLetter = memberName.match(/[BF]([A-Z]\w+)/)
                    if (leadingLetter) {
                        // Some functions start with B or F (Like FCeil, FMax, BMin)
                        memberName = leadingLetter[1]
                    }
                    switch (memberName) {
                        case "Abs": return "ABS"
                        case "Exp": return "e"
                        case "Max": return "MAX"
                        case "MaxInt64": return "MAX"
                        case "Min": return "MIN"
                        case "MinInt64": return "MIN"
                    }
                }
                if (memberParent === "/Script/Engine.BlueprintSetLibrary") {
                    const setOperationMatch = memberName.match(/Set_(\w+)/)
                    if (setOperationMatch) {
                        return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                    }
                }
                if (memberParent === "/Script/Engine.BlueprintMapLibrary") {
                    const setOperationMatch = memberName.match(/Map_(\w+)/)
                    if (setOperationMatch) {
                        return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                    }
                }
                return Utility.formatStringName(memberName)
            case Configuration.nodeType.dynamicCast:
                if (!this.TargetType) {
                    return "Bad cast node" // Target type not found
                }
                return `Cast To ${this.TargetType.getName()}`
            case Configuration.nodeType.event:
                return `Event ${(this.EventReference?.MemberName ?? "").replace(/^Receive/, "")}`
            case Configuration.nodeType.executionSequence:
                return "Sequence"
            case Configuration.nodeType.forEachElementInEnum:
                return `For Each ${this.Enum.getName()}`
            case Configuration.nodeType.forEachLoopWithBreak:
                return "For Each Loop with Break"
            case Configuration.nodeType.ifThenElse:
                return "Branch"
            case Configuration.nodeType.variableGet:
                return ""
            case Configuration.nodeType.variableSet:
                return "SET"
        }
        const keyNameSymbol = this.hasHIDAttribute()
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
            return Utility.formatStringName(this.MacroGraphReference.getMacroName())
        } else {
            return Utility.formatStringName(this.getNameAndCounter()[0])
        }
    }

    nodeColor() {
        switch (this.getClass()) {
            case Configuration.nodeType.callFunction:
                return this.bIsPureFunc
                    ? Configuration.nodeColors.green
                    : Configuration.nodeColors.blue
            case Configuration.nodeType.event:
            case Configuration.nodeType.customEvent:
            case Configuration.nodeType.inputKey:
            case Configuration.nodeType.inputAxisKeyEvent:
            case Configuration.nodeType.inputDebugKey:
                return Configuration.nodeColors.red
            case Configuration.nodeType.makeArray:
            case Configuration.nodeType.makeMap:
            case Configuration.nodeType.select:
                return Configuration.nodeColors.green
            case Configuration.nodeType.executionSequence:
            case Configuration.nodeType.ifThenElse:
            case Configuration.nodeType.macro:
                return Configuration.nodeColors.gray
            case Configuration.nodeType.dynamicCast:
                return Configuration.nodeColors.turquoise
        }
        if (this.bIsPureFunc) {
            return Configuration.nodeColors.green
        }
        if (this.isEvent()) {
            return Configuration.nodeColors.red
        }
        return Configuration.nodeColors.blue
    }

    nodeIcon() {
        switch (this.getType()) {
            case Configuration.nodeType.customEvent: return SVGIcon.event
            case Configuration.nodeType.doN: return SVGIcon.doN
            case Configuration.nodeType.dynamicCast: return SVGIcon.cast
            case Configuration.nodeType.event: return SVGIcon.event
            case Configuration.nodeType.executionSequence: return SVGIcon.sequence
            case Configuration.nodeType.forEachElementInEnum: return SVGIcon.loop
            case Configuration.nodeType.forEachLoop: return SVGIcon.forEachLoop
            case Configuration.nodeType.forEachLoopWithBreak: return SVGIcon.forEachLoop
            case Configuration.nodeType.forLoop: return SVGIcon.loop
            case Configuration.nodeType.forLoopWithBreak: return SVGIcon.loop
            case Configuration.nodeType.ifThenElse: return SVGIcon.branchNode
            case Configuration.nodeType.isValid: return SVGIcon.questionMark
            case Configuration.nodeType.makeArray: return SVGIcon.makeArray
            case Configuration.nodeType.makeMap: return SVGIcon.makeMap
            case Configuration.nodeType.makeSet: return SVGIcon.makeSet
            case Configuration.nodeType.select: return SVGIcon.select
            case Configuration.nodeType.whileLoop: return SVGIcon.loop
        }
        if (this.nodeDisplayName().startsWith("Break")) {
            return SVGIcon.breakStruct
        }
        if (this.getClass() === Configuration.nodeType.macro) {
            return SVGIcon.macro
        }
        const hidValue = this.hasHIDAttribute()?.toString()
        if (hidValue) {
            if (hidValue.includes("Mouse")) {
                return SVGIcon.mouse
            } else if (hidValue.includes("Gamepad_Special")) {
                return SVGIcon.keyboard // This is called Touchpad in Unreal Engine
            } else if (hidValue.includes("Gamepad") || hidValue.includes("Steam")) {
                return SVGIcon.gamepad
            } else if (hidValue.includes("Touch")) {
                return SVGIcon.touchpad
            } else {
                return SVGIcon.keyboard
            }
        }
        return SVGIcon.functionSymbol
    }
}
