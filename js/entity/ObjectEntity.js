import Configuration from "../Configuration.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import GuidEntity from "./GuidEntity.js"
import IdentifierEntity from "./IdentifierEntity.js"
import IEntity from "./IEntity.js"
import IntegerEntity from "./IntegerEntity.js"
import LinearColorEntity from "./LinearColorEntity.js"
import MacroGraphReferenceEntity from "./MacroGraphReferenceEntity.js"
import MirroredEntity from "./MirroredEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PinEntity from "./PinEntity.js"
import SVGIcon from "../SVGIcon.js"
import SymbolEntity from "./SymbolEntity.js"
import UnionType from "./UnionType.js"
import UnknownPinEntity from "./UnknownPinEntity.js"
import Utility from "../Utility.js"
import VariableReferenceEntity from "./VariableReferenceEntity.js"

/** @typedef {import("./VectorEntity.js").default} VectorEntity */

export default class ObjectEntity extends IEntity {

    static attributes = {
        Class: {
            type: ObjectReferenceEntity,
        },
        Name: {
            default: "",
        },
        ExportPath: {
            type: ObjectReferenceEntity,
        },
        ObjectRef: {
            type: ObjectReferenceEntity,
        },
        PinNames: {
            type: [String],
            default: undefined, // To keep the order, may be defined in additionalPinInserter()
            inlined: true,
        },
        AxisKey: {
            type: SymbolEntity,
        },
        InputAxisKey: {
            type: SymbolEntity,
        },
        NumAdditionalInputs: {
            type: Number,
            default: undefined, // To keep the order, may be defined in additionalPinInserter()
        },
        bIsPureFunc: {
            type: Boolean,
        },
        bIsConstFunc: {
            type: Boolean,
        },
        bIsCaseSensitive: {
            type: Boolean,
        },
        VariableReference: {
            type: VariableReferenceEntity,
        },
        SelfContextInfo: {
            type: SymbolEntity,
        },
        DelegatePropertyName: {
            type: String,
        },
        DelegateOwnerClass: {
            type: ObjectReferenceEntity,
        },
        ComponentPropertyName: {
            type: String,
        },
        EventReference: {
            type: FunctionReferenceEntity,
        },
        FunctionReference: {
            type: FunctionReferenceEntity,
        },
        CustomFunctionName: {
            type: String,
        },
        TargetType: {
            type: ObjectReferenceEntity,
        },
        MacroGraphReference: {
            type: MacroGraphReferenceEntity,
        },
        Enum: {
            type: ObjectReferenceEntity,
        },
        EnumEntries: {
            type: [String],
            inlined: true,
        },
        InputKey: {
            type: SymbolEntity,
        },
        bOverrideFunction: {
            type: Boolean,
        },
        bInternalEvent: {
            type: Boolean,
        },
        bConsumeInput: {
            type: Boolean,
        },
        bExecuteWhenPaused: {
            type: Boolean,
        },
        bOverrideParentBinding: {
            type: Boolean,
        },
        bControl: {
            type: Boolean,
        },
        bAlt: {
            type: Boolean,
        },
        bShift: {
            type: Boolean,
        },
        bCommand: {
            type: Boolean,
        },
        CommentColor: {
            type: LinearColorEntity,
        },
        bCommentBubbleVisible_InDetailsPanel: {
            type: Boolean,
        },
        bColorCommentBubble: {
            type: Boolean,
        },
        R: {
            type: Number,
        },
        G: {
            type: Number,
        },
        MaterialExpression: {
            type: ObjectReferenceEntity,
        },
        MaterialExpressionComment: {
            type: ObjectReferenceEntity,
        },
        MoveMode: {
            type: SymbolEntity,
        },
        TimelineName: {
            type: String,
        },
        TimelineGuid: {
            type: GuidEntity,
        },
        SizeX: {
            type: new MirroredEntity(ObjectEntity, "NodeWidth"),
        },
        SizeY: {
            type: new MirroredEntity(ObjectEntity, "NodeHeight"),
        },
        Text: {
            type: new MirroredEntity(ObjectEntity, "NodeComment"),
        },
        MaterialExpressionEditorX: {
            type: new MirroredEntity(ObjectEntity, "NodePosX"),
        },
        MaterialExpressionEditorY: {
            type: new MirroredEntity(ObjectEntity, "NodePosY"),
        },
        NodePosX: {
            type: IntegerEntity,
        },
        NodePosY: {
            type: IntegerEntity,
        },
        NodeWidth: {
            type: IntegerEntity,
        },
        NodeHeight: {
            type: IntegerEntity,
        },
        bCanRenameNode: {
            type: Boolean,
        },
        bCommentBubblePinned: {
            type: Boolean,
        },
        bCommentBubbleVisible: {
            type: Boolean,
        },
        NodeComment: {
            type: String,
        },
        AdvancedPinDisplay: {
            type: IdentifierEntity,
        },
        EnabledState: {
            type: IdentifierEntity,
        },
        NodeGuid: {
            type: GuidEntity,
        },
        ErrorType: {
            type: IntegerEntity,
        },
        ErrorMsg: {
            type: String,
        },
        CustomProperties: {
            type: [new UnionType(PinEntity, UnknownPinEntity)],
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

    constructor(values = {}, suppressWarns = false) {
        let keys = Object.keys(values)
        if (keys.some(k => k.startsWith(Configuration.subObjectAttributeNamePrefix))) {
            let subObjectsValues = keys
                .filter(k => k.startsWith(Configuration.subObjectAttributeNamePrefix))
                .reduce(
                    (acc, k) => {
                        acc[k] = values[k]
                        return acc
                    },
                    {}
                )
            // Reorder sub objects to be the first entries
            values = {
                ...subObjectsValues,
                ...values,
            }
        }
        super(values, suppressWarns)
        /** @type {ObjectReferenceEntity} */ this.Class
        /** @type {String} */ this.Name
        /** @type {ObjectReferenceEntity?} */ this.ExportPath
        /** @type {ObjectReferenceEntity?} */ this.ObjectRef
        /** @type {String[]} */ this.PinNames
        /** @type {SymbolEntity?} */ this.AxisKey
        /** @type {SymbolEntity?} */ this.InputAxisKey
        /** @type {Number?} */ this.NumAdditionalInputs
        /** @type {Boolean?} */ this.bIsPureFunc
        /** @type {Boolean?} */ this.bIsConstFunc
        /** @type {Boolean?} */ this.bIsCaseSensitive
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
        /** @type {String[]?} */ this.EnumEntries
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
        /** @type {Boolean?} */ this.bColorCommentBubble
        /** @type {Number?} */ this.R
        /** @type {Number?} */ this.G
        /** @type {ObjectReferenceEntity?} */ this.MaterialExpression
        /** @type {ObjectReferenceEntity?} */ this.MaterialExpressionComment
        /** @type {SymbolEntity?} */ this.MoveMode
        /** @type {String?} */ this.TimelineName
        /** @type {GuidEntity?} */ this.TimelineGuid
        /** @type {MirroredEntity?} */ this.SizeX
        /** @type {MirroredEntity?} */ this.SizeY
        /** @type {MirroredEntity?} */ this.Text
        /** @type {MirroredEntity?} */ this.MaterialExpressionEditorX
        /** @type {MirroredEntity?} */ this.MaterialExpressionEditorY
        /** @type {IntegerEntity} */ this.NodePosX
        /** @type {IntegerEntity} */ this.NodePosY
        /** @type {IntegerEntity?} */ this.NodeWidth
        /** @type {IntegerEntity?} */ this.NodeHeight
        /** @type {Boolean?} */ this.bCanRenameNode
        /** @type {Boolean?} */ this.bCommentBubblePinned
        /** @type {Boolean?} */ this.bCommentBubbleVisible
        /** @type {String?} */ this.Text
        /** @type {String?} */ this.NodeComment
        /** @type {IdentifierEntity?} */ this.AdvancedPinDisplay
        /** @type {IdentifierEntity?} */ this.EnabledState
        /** @type {GuidEntity} */ this.NodeGuid
        /** @type {IntegerEntity?} */ this.ErrorType
        /** @type {String?} */ this.ErrorMsg
        /** @type {(PinEntity | UnknownPinEntity)[]} */ this.CustomProperties

        // Legacy nodes cleanup
        if (this["Pins"] instanceof Array) {
            this["Pins"]
                .forEach(
                    /** @param {ObjectReferenceEntity} objectReference */
                    objectReference => {
                        const pinObject = this[Configuration.subObjectAttributeNameFromReference(objectReference, true)]
                        if (pinObject) {
                            const pinEntity = PinEntity.fromLegacyObject(pinObject)
                            pinEntity.LinkedTo = []
                            this.getCustomproperties(true).push(pinEntity)
                        }
                    })
            delete this["Pins"]
        }
        this.Class?.sanitize()
        if (this.MacroGraphReference) {
            this.MacroGraphReference.MacroGraph?.sanitize()
            this.MacroGraphReference.GraphBlueprint?.sanitize()
        }
        /** @type {ObjectEntity} */
        const materialSubobject = this.getMaterialSubobject()
        if (materialSubobject) {
            const obj = materialSubobject
            obj.SizeX && (obj.SizeX.getter = () => this.NodeWidth)
            obj.SizeY && (obj.SizeY.getter = () => this.NodeHeight)
            obj.Text && (obj.Text.getter = () => this.NodeComment)
            obj.MaterialExpressionEditorX && (obj.MaterialExpressionEditorX.getter = () => this.NodePosX)
            obj.MaterialExpressionEditorY && (obj.MaterialExpressionEditorY.getter = () => this.NodePosY)
        }
    }

    getClass() {
        return this.Class?.path ? this.Class.path : this.Class?.type ?? ""
    }

    getType() {
        let classValue = this.getClass()
        if (this.MacroGraphReference?.MacroGraph?.path) {
            return this.MacroGraphReference.MacroGraph.path
        }
        if (this.MaterialExpression) {
            return this.MaterialExpression.type
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
        return this.NodeWidth
            ?? this.isComment() ? Configuration.defaultCommentWidth : undefined
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        if (!this.NodeWidth) {
            this.NodeWidth = new IntegerEntity()
        }
        this.NodeWidth.value = value
    }

    getNodeHeight() {
        return this.NodeHeight
            ?? this.isComment() ? Configuration.defaultCommentHeight : undefined
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

    getCustomproperties(canCreate = false) {
        if (canCreate && !this.CustomProperties) {
            this.CustomProperties = []
        }
        return this.CustomProperties ?? []
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.getCustomproperties().filter(v => v.constructor === PinEntity)
    }

    switchTarget() {
        const switchMatch = this.getClass().match(Configuration.switchTargetPattern)
        if (switchMatch) {
            return switchMatch[1]
        }
    }

    isEvent() {
        switch (this.getClass()) {
            case Configuration.paths.customEvent:
            case Configuration.paths.event:
            case Configuration.paths.inputAxisKeyEvent:
            case Configuration.paths.inputVectorAxisEvent:
                return true
        }
        return false
    }

    isComment() {
        switch (this.getClass()) {
            case Configuration.paths.comment:
            case Configuration.paths.materialGraphNodeComment:
                return true
        }
        return false
    }

    isMaterial() {
        return this.getClass() === Configuration.paths.materialGraphNode
    }

    /** @return {ObjectEntity} */
    getMaterialSubobject() {
        const expression = this.MaterialExpression ?? this.MaterialExpressionComment
        return expression
            ? this[Configuration.subObjectAttributeNameFromReference(expression, true)]
            : null
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
        return this.getCustomproperties().find(pin => pin.PinType.PinCategory === "delegate")
    }

    /** @returns {String} */
    nodeDisplayName() {
        let input
        switch (this.getType()) {
            case Configuration.paths.componentBoundEvent:
                return `${Utility.formatStringName(this.DelegatePropertyName)} (${this.ComponentPropertyName})`
            case Configuration.paths.createDelegate:
                return "Create Event"
            case Configuration.paths.customEvent:
                if (this.CustomFunctionName) {
                    return this.CustomFunctionName
                }
            case Configuration.paths.dynamicCast:
                if (!this.TargetType) {
                    return "Bad cast node" // Target type not found
                }
                return `Cast To ${this.TargetType?.getName()}`
            case Configuration.paths.enumLiteral:
                return `Literal enum ${this.Enum?.getName()}`
            case Configuration.paths.event:
                return `Event ${(this.EventReference?.MemberName ?? "").replace(/^Receive/, "")}`
            case Configuration.paths.executionSequence:
                return "Sequence"
            case Configuration.paths.forEachElementInEnum:
                return `For Each ${this.Enum?.getName()}`
            case Configuration.paths.forEachLoopWithBreak:
                return "For Each Loop with Break"
            case Configuration.paths.functionEntry:
                return "Construction Script"
            case Configuration.paths.ifThenElse:
                return "Branch"
            case Configuration.paths.materialExpressionConstant:
                input ??= [this.getCustomproperties().find(pinEntity => pinEntity.PinName == "Value")?.DefaultValue]
            case Configuration.paths.materialExpressionConstant2Vector:
                input ??= [
                    this.getCustomproperties().find(pinEntity => pinEntity.PinName == "X")?.DefaultValue,
                    this.getCustomproperties().find(pinEntity => pinEntity.PinName == "Y")?.DefaultValue,
                ]
            case Configuration.paths.materialExpressionConstant3Vector:
                if (!input) {
                    /** @type {VectorEntity} */
                    const vector = this.getCustomproperties()
                        .find(pinEntity => pinEntity.PinName == "Constant")
                        ?.DefaultValue
                    input = [vector.X, vector.Y, vector.Z]
                }
            case Configuration.paths.materialExpressionConstant4Vector:
                if (!input) {
                    /** @type {LinearColorEntity} */
                    const vector = this.getCustomproperties()
                        .find(pinEntity => pinEntity.PinName == "Constant")
                        ?.DefaultValue
                    input = [vector.R, vector.G, vector.B, vector.A].map(v => v.valueOf())
                }
                if (input.length > 0) {
                    return input.map(v => Utility.printExponential(v)).reduce((acc, cur) => acc + "," + cur)
                }
            case Configuration.paths.materialExpressionLogarithm:
                return "Ln"
            case Configuration.paths.materialExpressionLogarithm10:
                return "Log10"
            case Configuration.paths.materialExpressionLogarithm2:
                return "Log2"
            case Configuration.paths.materialExpressionSquareRoot:
                return "Sqrt"
            case Configuration.paths.spawnActorFromClass:
                return `SpawnActor ${Utility.formatStringName(
                    this.getCustomproperties().find(pinEntity => pinEntity.getType() == "class")?.DefaultObject?.getName()
                    ?? "NONE"
                )}`
            case Configuration.paths.switchEnum:
                return `Switch on ${this.Enum?.getName() ?? "Enum"}`
            case Configuration.paths.switchInteger:
                return `Switch on Int`
            case Configuration.paths.variableGet:
                return ""
            case Configuration.paths.variableSet:
                return "SET"
        }
        let switchTarget = this.switchTarget()
        if (switchTarget) {
            if (switchTarget[0] !== "E") {
                switchTarget = Utility.formatStringName(switchTarget)
            }
            return `Switch on ${switchTarget}`
        }
        if (this.isComment()) {
            return this.NodeComment
        }
        const keyNameSymbol = this.getHIDAttribute()
        if (keyNameSymbol) {
            const keyName = keyNameSymbol.toString()
            let title = ObjectEntity.keyName(keyName) ?? Utility.formatStringName(keyName)
            if (this.getClass() === Configuration.paths.inputDebugKey) {
                title = "Debug Key " + title
            } else if (this.getClass() === Configuration.paths.getInputAxisKeyValue) {
                title = "Get " + title
            }
            return title
        }
        if (this.getClass() === Configuration.paths.macro) {
            return Utility.formatStringName(this.MacroGraphReference?.getMacroName())
        }
        if (this.isMaterial() && this.MaterialExpression) {
            const materialObject = /** @type {ObjectEntity} */(
                this[Configuration.subObjectAttributeNameFromReference(this.MaterialExpression, true)]
            )
            let result = materialObject.nodeDisplayName()
            result = result.match(/Material Expression (.+)/)?.[1] ?? result
            return result
        }
        let memberName = this.FunctionReference?.MemberName
        if (memberName) {
            const memberParent = this.FunctionReference.MemberParent?.path ?? ""
            switch (memberName) {
                case "AddKey":
                    let result = memberParent.match(ObjectEntity.sequencerScriptingNameRegex)
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
                case Configuration.paths.slateBlueprintLibrary:
                case Configuration.paths.kismetMathLibrary:
                    if (memberName.startsWith("And_")) {
                        return "&"
                    }
                    if (memberName.startsWith("Conv_")) {
                        return "" // Conversion nodes do not have visible names
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
                    if (memberName.startsWith("Xor_")) {
                        return "^"
                    }
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
                        case "Sqrt": return "SQRT"
                        case "Square": return "^2"
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
            }
            return Utility.formatStringName(memberName)
        }
        if (this.ObjectRef) {
            return this.ObjectRef.getName()
        }
        return Utility.formatStringName(this.getNameAndCounter()[0])
    }

    nodeColor() {
        switch (this.getType()) {
            case Configuration.paths.materialExpressionConstant2Vector:
            case Configuration.paths.materialExpressionConstant3Vector:
            case Configuration.paths.materialExpressionConstant4Vector:
                return Configuration.nodeColors.yellow
            case Configuration.paths.materialExpressionTextureSample:
                return Configuration.nodeColors.darkBlue
            case Configuration.paths.materialExpressionTextureCoordinate:
                return Configuration.nodeColors.red
        }
        switch (this.getClass()) {
            case Configuration.paths.callFunction:
                return this.bIsPureFunc
                    ? Configuration.nodeColors.green
                    : Configuration.nodeColors.blue
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
                return Configuration.nodeColors.violet
            case Configuration.paths.timeline:
                return Configuration.nodeColors.yellow
        }
        if (this.switchTarget()) {
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
            case Configuration.paths.addDelegate:
            case Configuration.paths.createDelegate:
            case Configuration.paths.functionEntry:
                return SVGIcon.node
            case Configuration.paths.customEvent: return SVGIcon.event
            case Configuration.paths.doN: return SVGIcon.doN
            case Configuration.paths.doOnce: return SVGIcon.doOnce
            case Configuration.paths.dynamicCast: return SVGIcon.cast
            case Configuration.paths.enumLiteral: return SVGIcon.enum
            case Configuration.paths.event: return SVGIcon.event
            case Configuration.paths.executionSequence:
            case Configuration.paths.multiGate:
                return SVGIcon.sequence
            case Configuration.paths.flipflop:
                return SVGIcon.flipflop
            case Configuration.paths.forEachElementInEnum:
            case Configuration.paths.forLoop:
            case Configuration.paths.forLoopWithBreak:
            case Configuration.paths.whileLoop:
                return SVGIcon.loop
            case Configuration.paths.forEachLoop:
            case Configuration.paths.forEachLoopWithBreak:
                return SVGIcon.forEachLoop
            case Configuration.paths.ifThenElse: return SVGIcon.branchNode
            case Configuration.paths.isValid: return SVGIcon.questionMark
            case Configuration.paths.makeArray: return SVGIcon.makeArray
            case Configuration.paths.makeMap: return SVGIcon.makeMap
            case Configuration.paths.makeSet: return SVGIcon.makeSet
            case Configuration.paths.select: return SVGIcon.select
            case Configuration.paths.spawnActorFromClass: return SVGIcon.spawnActor
            case Configuration.paths.timeline: return SVGIcon.timer
        }
        if (this.switchTarget()) {
            return SVGIcon.switch
        }
        if (this.nodeDisplayName().startsWith("Break")) {
            return SVGIcon.breakStruct
        }
        if (this.getClass() === Configuration.paths.macro) {
            return SVGIcon.macro
        }
        if (this.isMaterial()) {
            return undefined
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
        if (this.ObjectRef?.type === Configuration.paths.ambientSound) {
            return SVGIcon.sound
        }
        return SVGIcon.functionSymbol
    }

    additionalPinInserter() {
        /** @type {() => PinEntity[]} */
        let pinEntities
        /** @type {(pinEntity: PinEntity) => Number} */
        let pinIndexFromEntity
        /** @type {(newPinIndex: Number, minIndex: Number, maxIndex: Number) => String} */
        let pinNameFromIndex
        switch (this.getType()) {
            case Configuration.paths.commutativeAssociativeBinaryOperator:
                switch (this.FunctionReference?.MemberName) {
                    case "And_Int64Int64":
                    case "And_IntInt":
                    case "BMax":
                    case "BMin":
                    case "BooleanAND":
                    case "BooleanNAND":
                    case "BooleanOR":
                    case "Concat_StrStr":
                    case "FMax":
                    case "FMin":
                    case "Max":
                    case "MaxInt64":
                    case "Min":
                    case "MinInt64":
                    case "Or_Int64Int64":
                    case "Or_IntInt":
                        pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isInput())
                        pinIndexFromEntity ??= pinEntity =>
                            pinEntity.PinName.match(/^\s*([A-Z])\s*$/)?.[1]?.charCodeAt(0) - "A".charCodeAt(0)
                        pinNameFromIndex ??= (index, min = -1, max = -1) => {
                            const result = String.fromCharCode(index >= 0 ? index : max + "A".charCodeAt(0) + 1)
                            this.NumAdditionalInputs = pinEntities().length - 1
                            return result
                        }
                        break
                }
                break
            case Configuration.paths.multiGate:
                pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isOutput())
                pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.match(/^\s*Out[_\s]+(\d+)\s*$/i)?.[1])
                pinNameFromIndex ??= (index, min = -1, max = -1) => `Out ${index >= 0 ? index : min > 0 ? "Out 0" : max + 1}`
                break
            case Configuration.paths.switchInteger:
                pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isOutput())
                pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.match(/^\s*(\d+)\s*$/)?.[1])
                pinNameFromIndex ??= (index, min = -1, max = -1) => (index < 0 ? max + 1 : index).toString()
                break
            case Configuration.paths.switchName:
            case Configuration.paths.switchString:
                pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isOutput())
                pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.match(/^\s*Case[_\s]+(\d+)\s*$/i)?.[1])
                pinNameFromIndex ??= (index, min = -1, max = -1) => {
                    const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`
                    this.PinNames ??= []
                    this.PinNames.push(result)
                    return result
                }
                break
        }
        if (pinEntities) {
            return () => {
                let min = Number.MAX_SAFE_INTEGER
                let max = Number.MIN_SAFE_INTEGER
                let values = []
                const modelPin = pinEntities().reduce(
                    (acc, cur) => {
                        const value = pinIndexFromEntity(cur)
                        if (!isNaN(value)) {
                            values.push(value)
                            min = Math.min(value, min)
                            if (value > max) {
                                max = value
                                return cur
                            }
                        } else if (acc === undefined) {
                            return cur
                        }
                        return acc
                    },
                    undefined
                )
                if (min === Number.MAX_SAFE_INTEGER || max === Number.MIN_SAFE_INTEGER) {
                    min = undefined
                    max = undefined
                }
                if (!modelPin) {
                    return null
                }
                values.sort((a, b) => a < b ? -1 : a === b ? 0 : 1)
                let prev = values[0]
                let index = values.findIndex(
                    // Search for a gap
                    value => {
                        const result = value - prev > 1
                        prev = value
                        return result
                    }
                )
                const newPin = new PinEntity(modelPin)
                newPin.PinId = GuidEntity.generateGuid()
                newPin.PinName = pinNameFromIndex(index, min, max)
                newPin.PinToolTip = undefined
                this.CustomProperties.push(newPin)
                return newPin
            }
        }
    }
}
