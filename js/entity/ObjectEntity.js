import Parsernostrum from "parsernostrum"
import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import nodeColor from "../decoding/nodeColor.js"
import nodeIcon from "../decoding/nodeIcon.js"
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

    static attributes = {
        ...super.attributes,
        isExported: new AttributeInfo({
            type: Boolean,
            ignored: true,
        }),
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
        FunctionScript: AttributeInfo.createType(ObjectReferenceEntity),
        CustomFunctionName: AttributeInfo.createType(String),
        TargetType: AttributeInfo.createType(ObjectReferenceEntity),
        MacroGraphReference: AttributeInfo.createType(MacroGraphReferenceEntity),
        Enum: AttributeInfo.createType(ObjectReferenceEntity),
        EnumEntries: new AttributeInfo({
            type: [String],
            inlined: true,
        }),
        InputKey: AttributeInfo.createType(SymbolEntity),
        OpName: AttributeInfo.createType(String),
        CachedChangeId: AttributeInfo.createType(GuidEntity),
        FunctionDisplayName: AttributeInfo.createType(String),
        ChangeId: AttributeInfo.createType(GuidEntity),
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
            type: [ScriptVariableEntity],
            inlined: true,
        }),
        Node: AttributeInfo.createType(new MirroredEntity(ObjectReferenceEntity)),
        ExportedNodes: AttributeInfo.createType(String),
        CustomProperties: AttributeInfo.createType([new Union(PinEntity, UnknownPinEntity)]),
    }
    static nameRegex = /^(\w+?)(?:_(\d+))?$/
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
            Parsernostrum.reg(/Begin +Object/),
            Parsernostrum.seq(
                Parsernostrum.whitespace,
                Parsernostrum.alt(
                    this.createSubObjectGrammar(),
                    this.customPropertyGrammar,
                    Grammar.createAttributeGrammar(this, Parsernostrum.reg(Grammar.Regex.MultipleWordsSymbols)),
                    Grammar.createAttributeGrammar(this, Grammar.attributeNameQuoted, undefined, (obj, k, v) =>
                        Utility.objectSet(obj, ["attributes", ...k, "quoted"], true)
                    ),
                    this.inlinedArrayEntryGrammar,
                )
            )
                .map(([_0, entry]) => entry)
                .many(),
            Parsernostrum.reg(/\s+End +Object/),
        )
            .map(([_0, attributes, _2]) => {
                const values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                return new this(values)
            })
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
        /** @type {Boolean} */ this.isExported
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
        /** @type {ObjectReferenceEntity} */ this.FunctionScript
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
        /** @type {String} */ this.FunctionDisplayName
        /** @type {String} */ this.InputName
        /** @type {String} */ this.Name
        /** @type {String} */ this.NodeComment
        /** @type {String} */ this.NodeTitle
        /** @type {String} */ this.Operation
        /** @type {String} */ this.OpName
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
            pcgObject.getSubobjects().forEach(
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

    isNiagara() {
        return (this.Class.type ? this.Class.type : this.Class.path)?.startsWith("/Script/NiagaraEditor.")
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

    nodeColor() {
        return nodeColor(this)
    }

    nodeIcon() {
        return nodeIcon(this)
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
