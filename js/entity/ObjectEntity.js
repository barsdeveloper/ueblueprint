import Parsernostrum from "parsernostrum"
import Configuration from "../Configuration.js"
import SVGIcon from "../SVGIcon.js"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import IdentifierEntity from "./IdentifierEntity.js"
import IntegerEntity from "./IntegerEntity.js"
import LinearColorEntity from "./LinearColorEntity.js"
import MacroGraphReferenceEntity from "./MacroGraphReferenceEntity.js"
import MirroredEntity from "./MirroredEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PinEntity from "./PinEntity.js"
import ScriptVariableEntity from "./ScriptVariableEntity.js"
import SymbolEntity from "./SymbolEntity.js"
import Union from "./Union.js"
import UnknownPinEntity from "./UnknownPinEntity.js"
import VariableReferenceEntity from "./VariableReferenceEntity.js"

export default class ObjectEntity extends IEntity {

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
    static attributes = {
        ...super.attributes,
        Class: AttributeInfo.createType(ObjectReferenceEntity),
        Name: AttributeInfo.createType(String),
        Archetype: AttributeInfo.createType(ObjectReferenceEntity),
        ExportPath: AttributeInfo.createType(ObjectReferenceEntity),
        R: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        G: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        B: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        A: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        ObjectRef: AttributeInfo.createType(ObjectReferenceEntity),
        BlueprintElementType: AttributeInfo.createType(ObjectReferenceEntity),
        BlueprintElementInstance: AttributeInfo.createType(ObjectReferenceEntity),
        PinTags: new AttributeInfo({
            type: [null],
            inlined: true,
        }),
        PinNames: new AttributeInfo({
            type: [String],
            inlined: true,
        }),
        AxisKey: AttributeInfo.createType(SymbolEntity),
        InputAxisKey: AttributeInfo.createType(SymbolEntity),
        InputName: AttributeInfo.createType(String),
        InputType: AttributeInfo.createType(SymbolEntity),
        NumAdditionalInputs: AttributeInfo.createType(Number),
        bIsPureFunc: AttributeInfo.createType(Boolean),
        bIsConstFunc: AttributeInfo.createType(Boolean),
        bIsCaseSensitive: AttributeInfo.createType(Boolean),
        VariableReference: AttributeInfo.createType(VariableReferenceEntity),
        SelfContextInfo: AttributeInfo.createType(SymbolEntity),
        DelegatePropertyName: AttributeInfo.createType(String),
        DelegateOwnerClass: AttributeInfo.createType(ObjectReferenceEntity),
        ComponentPropertyName: AttributeInfo.createType(String),
        EventReference: AttributeInfo.createType(FunctionReferenceEntity),
        FunctionReference: AttributeInfo.createType(FunctionReferenceEntity),
        CustomFunctionName: AttributeInfo.createType(String),
        TargetType: AttributeInfo.createType(ObjectReferenceEntity),
        MacroGraphReference: AttributeInfo.createType(MacroGraphReferenceEntity),
        Enum: AttributeInfo.createType(ObjectReferenceEntity),
        EnumEntries: new AttributeInfo({
            type: [String],
            inlined: true,
        }),
        InputKey: AttributeInfo.createType(SymbolEntity),
        MaterialFunction: AttributeInfo.createType(ObjectReferenceEntity),
        bOverrideFunction: AttributeInfo.createType(Boolean),
        bInternalEvent: AttributeInfo.createType(Boolean),
        bConsumeInput: AttributeInfo.createType(Boolean),
        bExecuteWhenPaused: AttributeInfo.createType(Boolean),
        bOverrideParentBinding: AttributeInfo.createType(Boolean),
        bControl: AttributeInfo.createType(Boolean),
        bAlt: AttributeInfo.createType(Boolean),
        bShift: AttributeInfo.createType(Boolean),
        bCommand: AttributeInfo.createType(Boolean),
        CommentColor: AttributeInfo.createType(LinearColorEntity),
        bCommentBubbleVisible_InDetailsPanel: AttributeInfo.createType(Boolean),
        bColorCommentBubble: AttributeInfo.createType(Boolean),
        ProxyFactoryFunctionName: AttributeInfo.createType(String),
        ProxyFactoryClass: AttributeInfo.createType(ObjectReferenceEntity),
        ProxyClass: AttributeInfo.createType(ObjectReferenceEntity),
        StructType: AttributeInfo.createType(ObjectReferenceEntity),
        MaterialExpression: AttributeInfo.createType(ObjectReferenceEntity),
        MaterialExpressionComment: AttributeInfo.createType(ObjectReferenceEntity),
        MoveMode: AttributeInfo.createType(SymbolEntity),
        TimelineName: AttributeInfo.createType(String),
        TimelineGuid: AttributeInfo.createType(GuidEntity),
        SizeX: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        SizeY: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        Text: AttributeInfo.createType(new MirroredEntity(String)),
        MaterialExpressionEditorX: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        MaterialExpressionEditorY: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        NodeTitle: AttributeInfo.createType(String),
        NodeTitleColor: AttributeInfo.createType(LinearColorEntity),
        PositionX: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        PositionY: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        SettingsInterface: AttributeInfo.createType(ObjectReferenceEntity),
        PCGNode: AttributeInfo.createType(ObjectReferenceEntity),
        HiGenGridSize: AttributeInfo.createType(SymbolEntity),
        Operation: AttributeInfo.createType(SymbolEntity),
        NodePosX: AttributeInfo.createType(IntegerEntity),
        NodePosY: AttributeInfo.createType(IntegerEntity),
        NodeHeight: AttributeInfo.createType(IntegerEntity),
        NodeWidth: AttributeInfo.createType(IntegerEntity),
        Graph: AttributeInfo.createType(ObjectReferenceEntity),
        SubgraphInstance: AttributeInfo.createType(String),
        InputPins: new AttributeInfo({
            type: [ObjectReferenceEntity],
            inlined: true,
        }),
        OutputPins: new AttributeInfo({
            type: [ObjectReferenceEntity],
            inlined: true,
        }),
        bExposeToLibrary: AttributeInfo.createType(Boolean),
        bCanRenameNode: AttributeInfo.createType(Boolean),
        bCommentBubblePinned: AttributeInfo.createType(Boolean),
        bCommentBubbleVisible: AttributeInfo.createType(Boolean),
        NodeComment: AttributeInfo.createType(String),
        AdvancedPinDisplay: AttributeInfo.createType(IdentifierEntity),
        DelegateReference: AttributeInfo.createType(VariableReferenceEntity),
        EnabledState: AttributeInfo.createType(IdentifierEntity),
        NodeGuid: AttributeInfo.createType(GuidEntity),
        ErrorType: AttributeInfo.createType(IntegerEntity),
        ErrorMsg: AttributeInfo.createType(String),
        ScriptVariables: new AttributeInfo({
            type: ScriptVariableEntity,
            inlined: true,
        }),
        Node: AttributeInfo.createType(new MirroredEntity(ObjectReferenceEntity)),
        ExportedNodes: AttributeInfo.createType(String),
        CustomProperties: AttributeInfo.createType([new Union(PinEntity, UnknownPinEntity)]),
    }
    static nameRegex = /^(\w+?)(?:_(\d+))?$/
    static sequencerScriptingNameRegex = /\/Script\/SequencerScripting\.MovieSceneScripting(.+)Channel/
    static customPropertyGrammar = Parsernostrum.seq(
        Parsernostrum.reg(/CustomProperties\s+/),
        Grammar.grammarFor(
            undefined,
            this.attributes.CustomProperties.type[0]
        ),
    ).map(([_0, pin]) => values => {
        if (!values.CustomProperties) {
            values.CustomProperties = []
        }
        values.CustomProperties.push(pin)
    })
    static inlinedArrayEntryGrammar = Parsernostrum.seq(
        Parsernostrum.alt(
            Grammar.symbolQuoted.map(v => [v, true]),
            Grammar.symbol.map(v => [v, false]),
        ),
        Parsernostrum.reg(
            new RegExp(`\\s*\\(\\s*(\\d+)\\s*\\)\\s*\\=\\s*`),
            1
        ).map(Number)
    )
        .chain(
            /** @param {[[String, Boolean], Number]} param */
            ([[symbol, quoted], index]) =>
                Grammar.grammarFor(this.attributes[symbol])
                    .map(currentValue =>
                        values => {
                            (values[symbol] ??= [])[index] = currentValue
                            Utility.objectSet(values, ["attributes", symbol, "quoted"], quoted)
                            if (!this.attributes[symbol]?.inlined) {
                                if (!values.attributes) {
                                    IEntity.defineAttributes(values, {})
                                }
                                Utility.objectSet(values, ["attributes", symbol, "type"], [currentValue.constructor])
                                Utility.objectSet(values, ["attributes", symbol, "inlined"], true)
                            }
                        }
                    )
        )
    static grammar = this.createGrammar()

    static createSubObjectGrammar() {
        return Parsernostrum.lazy(() => this.grammar)
            .map(object =>
                values => values[Configuration.subObjectAttributeNameFromEntity(object)] = object
            )
    }

    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/Begin\s+Object/),
            Parsernostrum.seq(
                Parsernostrum.whitespace,
                Parsernostrum.alt(
                    this.customPropertyGrammar,
                    Grammar.createAttributeGrammar(this),
                    Grammar.createAttributeGrammar(this, Grammar.attributeNameQuoted, undefined, (obj, k, v) =>
                        Utility.objectSet(obj, ["attributes", ...k, "quoted"], true)
                    ),
                    this.inlinedArrayEntryGrammar,
                    this.createSubObjectGrammar()
                )
            )
                .map(([_0, entry]) => entry)
                .many(),
            Parsernostrum.reg(/\s+End\s+Object/),
        )
            .map(([_0, attributes, _2]) => {
                const values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                return new this(values)
            })
    }

    /** @param {String} value */
    static keyName(value) {
        /** @type {String} */
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
            result = Utility.numberFromText(match[1]).toString()
            if (result) {
                return "Num " + result
            }
        }
    }

    static getMultipleObjectsGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.whitespaceOpt,
            this.createGrammar(),
            Parsernostrum.seq(
                Parsernostrum.whitespace,
                this.createGrammar(),
            )
                .map(([_0, object]) => object)
                .many(),
            Parsernostrum.whitespaceOpt
        )
            .map(([_0, first, remaining, _4]) => [first, ...remaining])
    }

    /** @type {String} */
    #class

    constructor(values = {}, suppressWarns = false) {
        if ("NodePosX" in values !== "NodePosY" in values) {
            const entries = Object.entries(values)
            const [key, position] = "NodePosX" in values
                ? ["NodePosY", Object.keys(values).indexOf("NodePosX") + 1]
                : ["NodePosX", Object.keys(values).indexOf("NodePosY")]
            const entry = [key, new (AttributeInfo.getAttribute(values, key, "type", ObjectEntity))()]
            entries.splice(position, 0, entry)
            values = Object.fromEntries(entries)
        }
        super(values, suppressWarns)

        // Attributes not assigned a strong type in attributes because the names are too generic
        /** @type {Number | MirroredEntity<Boolean>} */ this.R
        /** @type {Number | MirroredEntity<Boolean>} */ this.G
        /** @type {Number | MirroredEntity<Boolean>} */ this.B
        /** @type {Number | MirroredEntity<Boolean>} */ this.A

        // Attributes
        /** @type {(PinEntity | UnknownPinEntity)[]} */ this.CustomProperties
        /** @type {Boolean} */ this.bIsPureFunc
        /** @type {FunctionReferenceEntity} */ this.ComponentPropertyName
        /** @type {FunctionReferenceEntity} */ this.EventReference
        /** @type {FunctionReferenceEntity} */ this.FunctionReference
        /** @type {IdentifierEntity} */ this.AdvancedPinDisplay
        /** @type {IdentifierEntity} */ this.EnabledState
        /** @type {IntegerEntity} */ this.NodeHeight
        /** @type {IntegerEntity} */ this.NodePosX
        /** @type {IntegerEntity} */ this.NodePosY
        /** @type {IntegerEntity} */ this.NodeWidth
        /** @type {LinearColorEntity} */ this.CommentColor
        /** @type {LinearColorEntity} */ this.NodeTitleColor
        /** @type {MacroGraphReferenceEntity} */ this.MacroGraphReference
        /** @type {MirroredEntity} */ this.MaterialExpressionEditorX
        /** @type {MirroredEntity} */ this.MaterialExpressionEditorY
        /** @type {MirroredEntity} */ this.SizeX
        /** @type {MirroredEntity} */ this.SizeY
        /** @type {MirroredEntity} */ this.Text
        /** @type {MirroredEntity<IntegerEntity>} */ this.PositionX
        /** @type {MirroredEntity<IntegerEntity>} */ this.PositionY
        /** @type {MirroredEntity<ObjectReferenceEntity>} */ this.Node
        /** @type {null[]} */ this.PinTags
        /** @type {Number} */ this.NumAdditionalInputs
        /** @type {ObjectReferenceEntity[]} */ this.InputPins
        /** @type {ObjectReferenceEntity[]} */ this.OutputPins
        /** @type {ObjectReferenceEntity} */ this.Archetype
        /** @type {ObjectReferenceEntity} */ this.BlueprintElementInstance
        /** @type {ObjectReferenceEntity} */ this.BlueprintElementType
        /** @type {ObjectReferenceEntity} */ this.Class
        /** @type {ObjectReferenceEntity} */ this.Enum
        /** @type {ObjectReferenceEntity} */ this.ExportPath
        /** @type {ObjectReferenceEntity} */ this.Graph
        /** @type {ObjectReferenceEntity} */ this.MaterialExpression
        /** @type {ObjectReferenceEntity} */ this.MaterialExpressionComment
        /** @type {ObjectReferenceEntity} */ this.MaterialFunction
        /** @type {ObjectReferenceEntity} */ this.ObjectRef
        /** @type {ObjectReferenceEntity} */ this.PCGNode
        /** @type {ObjectReferenceEntity} */ this.SettingsInterface
        /** @type {ObjectReferenceEntity} */ this.StructType
        /** @type {ObjectReferenceEntity} */ this.TargetType
        /** @type {ScriptVariableEntity[]} */ this.ScriptVariables
        /** @type {String[]} */ this.EnumEntries
        /** @type {String[]} */ this.PinNames
        /** @type {String} */ this.CustomFunctionName
        /** @type {String} */ this.DelegatePropertyName
        /** @type {String} */ this.ExportedNodes
        /** @type {String} */ this.InputName
        /** @type {String} */ this.Name
        /** @type {String} */ this.NodeComment
        /** @type {String} */ this.NodeTitle
        /** @type {String} */ this.Operation
        /** @type {String} */ this.ProxyFactoryFunctionName
        /** @type {String} */ this.SubgraphInstance
        /** @type {String} */ this.Text
        /** @type {SymbolEntity} */ this.AxisKey
        /** @type {SymbolEntity} */ this.HiGenGridSize
        /** @type {SymbolEntity} */ this.InputAxisKey
        /** @type {SymbolEntity} */ this.InputKey
        /** @type {SymbolEntity} */ this.InputType
        /** @type {VariableReferenceEntity} */ this.DelegateReference
        /** @type {VariableReferenceEntity} */ this.VariableReference

        // Legacy nodes pins
        if (this["Pins"] instanceof Array) {
            this["Pins"].forEach(
                /** @param {ObjectReferenceEntity} objectReference */
                objectReference => {
                    const pinObject = this[Configuration.subObjectAttributeNameFromReference(objectReference, true)]
                    if (pinObject) {
                        const pinEntity = PinEntity.fromLegacyObject(pinObject)
                        pinEntity.LinkedTo = []
                        this.getCustomproperties(true).push(pinEntity)
                        Utility.objectSet(this, ["attributes", "CustomProperties", "ignored"], true)
                    }
                }
            )
        }
        /** @type {ObjectEntity} */
        const materialSubobject = this.getMaterialSubobject()
        if (materialSubobject) {
            const obj = materialSubobject
            obj.SizeX !== undefined && (obj.SizeX.getter = () => this.NodeWidth)
            obj.SizeY && (obj.SizeY.getter = () => this.NodeHeight)
            obj.Text && (obj.Text.getter = () => this.NodeComment)
            obj.MaterialExpressionEditorX && (obj.MaterialExpressionEditorX.getter = () => this.NodePosX)
            obj.MaterialExpressionEditorY && (obj.MaterialExpressionEditorY.getter = () => this.NodePosY)
            if (this.getType() === Configuration.paths.materialExpressionComponentMask) {
                // The following attributes are too generic therefore not assigned a MirroredEntity
                const rgbaPins = Configuration.rgba.map(pinName =>
                    this.getPinEntities().find(pin => pin.PinName === pinName && (pin.recomputesNodeTitleOnChange = true))
                )
                const attribute = {}
                obj.R = new MirroredEntity(Boolean, () => rgbaPins[0].DefaultValue)
                obj.G = new MirroredEntity(Boolean, () => rgbaPins[1].DefaultValue)
                obj.B = new MirroredEntity(Boolean, () => rgbaPins[2].DefaultValue)
                obj.A = new MirroredEntity(Boolean, () => rgbaPins[3].DefaultValue)
            }
        }
        /** @type {ObjectEntity} */
        const pcgObject = this.getPcgSubobject()
        if (pcgObject) {
            pcgObject.PositionX && (pcgObject.PositionX.getter = () => this.NodePosX)
            pcgObject.PositionY && (pcgObject.PositionY.getter = () => this.NodePosY)
            pcgObject.getSubobjects()
                .forEach(
                    /** @param {ObjectEntity} obj */
                    obj => {
                        if (obj.Node !== undefined) {
                            const nodeRef = obj.Node.get()
                            if (
                                nodeRef.type === this.PCGNode.type
                                && nodeRef.path === `${this.Name}.${this.PCGNode.path}`
                            ) {
                                obj.Node.getter = () => new ObjectReferenceEntity({
                                    type: this.PCGNode.type,
                                    path: `${this.Name}.${this.PCGNode.path}`,
                                })
                            }
                        }
                    }
                )

        }
        let inputIndex = 0
        let outputIndex = 0
        this.CustomProperties?.forEach((pinEntity, i) => {
            pinEntity.objectEntity = this
            pinEntity.pinIndex = pinEntity.isInput()
                ? inputIndex++
                : pinEntity.isOutput()
                    ? outputIndex++
                    : i
        })
    }

    getClass() {
        if (!this.#class) {
            this.#class = (this.Class?.path ? this.Class.path : this.Class?.type)
                ?? (this.ExportPath?.path ? this.ExportPath.path : this.ExportPath?.type)
                ?? ""
            if (this.#class && !this.#class.startsWith("/")) {
                // Old path names did not start with /Script or /Engine, check tests/resources/LegacyNodes.js
                let path = Object.values(Configuration.paths).find(path => path.endsWith("." + this.#class))
                if (path) {
                    this.#class = path
                }
            }
        }
        return this.#class
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
        const result = this.getObjectName().match(ObjectEntity.nameRegex)
        let name = ""
        let counter = null
        return result
            ? [result[1] ?? "", parseInt(result[2] ?? "0")]
            : ["", 0]
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

    /** @returns {ObjectEntity[]} */
    getSubobjects() {
        return Object.keys(this)
            .filter(k => k.startsWith(Configuration.subObjectAttributeNamePrefix))
            .flatMap(k => [this[k], .../** @type {ObjectEntity} */(this[k]).getSubobjects()])
    }

    switchTarget() {
        const switchMatch = this.getClass().match(Configuration.switchTargetPattern)
        if (switchMatch) {
            return switchMatch[1]
        }
    }

    isEvent() {
        switch (this.getClass()) {
            case Configuration.paths.actorBoundEvent:
            case Configuration.paths.componentBoundEvent:
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
        // return [
        //     Configuration.paths.materialExpressionConstant,
        //     Configuration.paths.materialExpressionConstant2Vector,
        //     Configuration.paths.materialExpressionConstant3Vector,
        //     Configuration.paths.materialExpressionConstant4Vector,
        //     Configuration.paths.materialExpressionLogarithm,
        //     Configuration.paths.materialExpressionLogarithm10,
        //     Configuration.paths.materialExpressionLogarithm2,
        //     Configuration.paths.materialExpressionMaterialFunctionCall,
        //     Configuration.paths.materialExpressionSquareRoot,
        //     Configuration.paths.materialExpressionTextureCoordinate,
        //     Configuration.paths.materialExpressionTextureSample,
        //     Configuration.paths.materialGraphNode,
        //     Configuration.paths.materialGraphNodeComment,
        // ]
        //     .includes(this.getClass())
    }

    /** @return {ObjectEntity} */
    getMaterialSubobject() {
        const expression = this.MaterialExpression ?? this.MaterialExpressionComment
        return expression
            ? this[Configuration.subObjectAttributeNameFromReference(expression, true)]
            : null
    }

    isPcg() {
        return this.getClass() === Configuration.paths.pcgEditorGraphNode
            || this.getPcgSubobject()
    }

    /** @return {ObjectEntity} */
    getPcgSubobject() {
        const node = this.PCGNode
        return node
            ? this[Configuration.subObjectAttributeNameFromReference(node, true)]
            : null
    }

    /** @return {ObjectEntity} */
    getSettingsObject() {
        const settings = this.SettingsInterface
        return settings
            ? this[Configuration.subObjectAttributeNameFromReference(settings, true)]
            : null
    }

    /** @return {ObjectEntity} */
    getSubgraphObject() {
        const node = this.SubgraphInstance
        return node
            ? this[Configuration.subObjectAttributeNameFromName(node)]
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
            case Configuration.paths.asyncAction:
                if (this.ProxyFactoryFunctionName) {
                    return Utility.formatStringName(this.ProxyFactoryFunctionName)
                }
            case Configuration.paths.actorBoundEvent:
            case Configuration.paths.componentBoundEvent:
                return `${Utility.formatStringName(this.DelegatePropertyName)} (${this.ComponentPropertyName ?? "Unknown"})`
            case Configuration.paths.callDelegate:
                return `Call ${this.DelegateReference?.MemberName ?? "None"}`
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
                return this.FunctionReference?.MemberName === "UserConstructionScript"
                    ? "Construction Script"
                    : this.FunctionReference?.MemberName
            case Configuration.paths.functionResult:
                return "Return Node"
            case Configuration.paths.ifThenElse:
                return "Branch"
            case Configuration.paths.makeStruct:
                if (this.StructType) {
                    return `Make ${this.StructType.getName()}`
                }
            case Configuration.paths.materialExpressionComponentMask: {
                const materialObject = this.getMaterialSubobject()
                return `Mask ( ${Configuration.rgba
                    .filter(k => /** @type {MirroredEntity} */(materialObject[k]).get() === true)
                    .map(v => v + " ")
                    .join("")})`
            }
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
                break
            case Configuration.paths.materialExpressionFunctionInput: {
                const materialObject = this.getMaterialSubobject()
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
                const materialFunction = this.getMaterialSubobject()?.MaterialFunction
                if (materialFunction) {
                    return materialFunction.getName()
                }
                break
            case Configuration.paths.materialExpressionSquareRoot:
                return "Sqrt"
            case Configuration.paths.pcgEditorGraphNodeInput:
                return "Input"
            case Configuration.paths.pcgEditorGraphNodeOutput:
                return "Output"
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
        if (this.isMaterial() && this.getMaterialSubobject()) {
            let result = this.getMaterialSubobject().nodeDisplayName()
            result = result.match(/Material Expression (.+)/)?.[1] ?? result
            return result
        }
        if (this.isPcg() && this.getPcgSubobject()) {
            let pcgSubobject = this.getPcgSubobject()
            let result = pcgSubobject.NodeTitle ? pcgSubobject.NodeTitle : pcgSubobject.nodeDisplayName()
            return result
        }
        const subgraphObject = this.getSubgraphObject()
        if (subgraphObject) {
            return subgraphObject.Graph.getName()
        }
        const settingsObject = this.getSettingsObject()
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
            case Configuration.paths.makeStruct:
                return Configuration.nodeColors.darkBlue
            case Configuration.paths.materialExpressionMaterialFunctionCall:
                return Configuration.nodeColors.blue
            case Configuration.paths.materialExpressionFunctionInput:
                return Configuration.nodeColors.red
            case Configuration.paths.materialExpressionTextureSample:
                return Configuration.nodeColors.darkTurquoise
            case Configuration.paths.materialExpressionTextureCoordinate:
                return Configuration.nodeColors.red
            case Configuration.paths.pcgEditorGraphNodeInput:
            case Configuration.paths.pcgEditorGraphNodeOutput:
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
            case Configuration.paths.functionResult:
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
        if (this.isComment()) {
            return (this.CommentColor ? this.CommentColor : LinearColorEntity.getWhite())
                .toDimmedColor()
                .toCSSRGBValues()
        }
        const pcgSubobject = this.getPcgSubobject()
        if (pcgSubobject && pcgSubobject.NodeTitleColor) {
            return pcgSubobject.NodeTitleColor.toDimmedColor(0.1).toCSSRGBValues()
        }
        if (this.bIsPureFunc) {
            return Configuration.nodeColors.green
        }
        return Configuration.nodeColors.blue
    }

    nodeIcon() {
        if (this.isMaterial() || this.isPcg()) {
            return null
        }
        switch (this.getType()) {
            case Configuration.paths.addDelegate:
            case Configuration.paths.asyncAction:
            case Configuration.paths.callDelegate:
            case Configuration.paths.createDelegate:
            case Configuration.paths.functionEntry:
            case Configuration.paths.functionResult:
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
            case Configuration.paths.makeStruct: return SVGIcon.makeStruct
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
            case Configuration.paths.promotableOperator:
                switch (this.FunctionReference?.MemberName) {
                    default:
                        if (
                            !this.FunctionReference?.MemberName?.startsWith("Add_")
                            && !this.FunctionReference?.MemberName?.startsWith("Subtract_")
                            && !this.FunctionReference?.MemberName?.startsWith("Multiply_")
                            && !this.FunctionReference?.MemberName?.startsWith("Divide_")
                        ) {
                            break
                        }
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
                pinNameFromIndex ??= (index, min = -1, max = -1) =>
                    `Out ${index >= 0 ? index : min > 0 ? "Out 0" : max + 1}`
                break
            case Configuration.paths.switchInteger:
                pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isOutput())
                pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.match(/^\s*(\d+)\s*$/)?.[1])
                pinNameFromIndex ??= (index, min = -1, max = -1) => (index < 0 ? max + 1 : index).toString()
                break
            case Configuration.paths.switchGameplayTag:
                pinNameFromIndex ??= (index, min = -1, max = -1) => {
                    const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`
                    this.PinNames ??= []
                    this.PinNames.push(result)
                    delete this.PinTags[this.PinTags.length - 1]
                    this.PinTags[this.PinTags.length] = null
                    return result
                }
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
                this.getCustomproperties(true).push(newPin)
                return newPin
            }
        }
    }
}
