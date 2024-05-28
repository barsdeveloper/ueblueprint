import P from "parsernostrum"
import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import nodeColor from "../decoding/nodeColor.js"
import nodeIcon from "../decoding/nodeIcon.js"
import nodeVariadic from "../decoding/nodeVariadic.js"
import Grammar from "../serialization/Grammar.js"
import AlternativesEntity from "./AlternativesEntity.js"
import ArrayEntity from "./ArrayEntity.js"
import AttributeInfo from "./AttributeInfo.js"
import BooleanEntity from "./BooleanEntity.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import IdentifierEntity from "./IdentifierEntity.js"
import IntegerEntity from "./IntegerEntity.js"
import LinearColorEntity from "./LinearColorEntity.js"
import MacroGraphReferenceEntity from "./MacroGraphReferenceEntity.js"
import MirroredEntity from "./MirroredEntity.js"
import NaturalNumberEntity from "./NaturalNumberEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PinEntity from "./PinEntity.js"
import ScriptVariableEntity from "./ScriptVariableEntity.js"
import StringEntity from "./StringEntity.js"
import SymbolEntity from "./SymbolEntity.js"
import UnknownPinEntity from "./UnknownPinEntity.js"
import VariableReferenceEntity from "./VariableReferenceEntity.js"

export default class ObjectEntity extends IEntity {

    #_exported = false
    get _exported() {
        return this.#_exported
    }
    set _exported(value) {
        this.#_exported = value
    }

    static attributes = {
        ...super.attributes,
        Class: ObjectReferenceEntity,
        Name: StringEntity,
        Archetype: ObjectReferenceEntity,
        ExportPath: ObjectReferenceEntity,
        ObjectRef: ObjectReferenceEntity,
        BlueprintElementType: ObjectReferenceEntity,
        BlueprintElementInstance: ObjectReferenceEntity,
        PinNames: ArrayEntity.of(StringEntity).flagInlined(),
        AxisKey: SymbolEntity,
        InputAxisKey: SymbolEntity,
        InputName: StringEntity,
        InputType: SymbolEntity,
        NumAdditionalInputs: NaturalNumberEntity,
        bIsPureFunc: BooleanEntity,
        bIsConstFunc: BooleanEntity,
        bIsCaseSensitive: BooleanEntity,
        VariableReference: VariableReferenceEntity,
        SelfContextInfo: SymbolEntity,
        DelegatePropertyName: StringEntity,
        DelegateOwnerClass: ObjectReferenceEntity,
        ComponentPropertyName: StringEntity,
        EventReference: FunctionReferenceEntity,
        FunctionReference: FunctionReferenceEntity,
        FunctionScript: ObjectReferenceEntity,
        CustomFunctionName: StringEntity,
        TargetType: ObjectReferenceEntity,
        MacroGraphReference: MacroGraphReferenceEntity,
        Enum: ObjectReferenceEntity,
        EnumEntries: ArrayEntity.of(StringEntity).flagInlined(),
        InputKey: SymbolEntity,
        OpName: StringEntity,
        CachedChangeId: GuidEntity,
        FunctionDisplayName: StringEntity,
        AddedPins: ArrayEntity.of(UnknownPinEntity).withDefault().flagInlined().flagSilent(),
        ChangeId: GuidEntity,
        MaterialFunction: ObjectReferenceEntity,
        bOverrideFunction: BooleanEntity,
        bInternalEvent: BooleanEntity,
        bConsumeInput: BooleanEntity,
        bExecuteWhenPaused: BooleanEntity,
        bOverrideParentBinding: BooleanEntity,
        bControl: BooleanEntity,
        bAlt: BooleanEntity,
        bShift: BooleanEntity,
        bCommand: BooleanEntity,
        CommentColor: LinearColorEntity,
        bCommentBubbleVisible_InDetailsPanel: BooleanEntity,
        bColorCommentBubble: BooleanEntity,
        ProxyFactoryFunctionName: StringEntity,
        ProxyFactoryClass: ObjectReferenceEntity,
        ProxyClass: ObjectReferenceEntity,
        StructType: ObjectReferenceEntity,
        MaterialExpression: ObjectReferenceEntity,
        MaterialExpressionComment: ObjectReferenceEntity,
        MoveMode: SymbolEntity,
        TimelineName: StringEntity,
        TimelineGuid: GuidEntity,
        SizeX: MirroredEntity.of(IntegerEntity),
        SizeY: MirroredEntity.of(IntegerEntity),
        Text: MirroredEntity.of(StringEntity),
        MaterialExpressionEditorX: MirroredEntity.of(IntegerEntity),
        MaterialExpressionEditorY: MirroredEntity.of(IntegerEntity),
        NodeTitle: StringEntity,
        NodeTitleColor: LinearColorEntity,
        PositionX: MirroredEntity.of(IntegerEntity),
        PositionY: MirroredEntity.of(IntegerEntity),
        SettingsInterface: ObjectReferenceEntity,
        PCGNode: ObjectReferenceEntity,
        HiGenGridSize: SymbolEntity,
        Operation: SymbolEntity,
        NodePosX: IntegerEntity,
        NodePosY: IntegerEntity,
        NodeHeight: IntegerEntity,
        NodeWidth: IntegerEntity,
        Graph: ObjectReferenceEntity,
        SubgraphInstance: StringEntity,
        InputPins: ArrayEntity.of(ObjectReferenceEntity).flagInlined(),
        OutputPins: ArrayEntity.of(ObjectReferenceEntity).flagInlined(),
        bExposeToLibrary: BooleanEntity,
        bCanRenameNode: BooleanEntity,
        bCommentBubblePinned: BooleanEntity,
        bCommentBubbleVisible: BooleanEntity,
        NodeComment: StringEntity,
        AdvancedPinDisplay: IdentifierEntity,
        DelegateReference: VariableReferenceEntity,
        EnabledState: IdentifierEntity,
        NodeGuid: GuidEntity,
        ErrorType: IntegerEntity,
        ErrorMsg: StringEntity,
        ScriptVariables: ArrayEntity.of(ScriptVariableEntity),
        Node: MirroredEntity.of(ObjectReferenceEntity),
        ExportedNodes: StringEntity,
        CustomProperties: ArrayEntity.of(AlternativesEntity.accepting(PinEntity, UnknownPinEntity)),
    }
    static #nameRegex = /^(\w+?)(?:_(\d+))?$/
    static customPropertyGrammar = P.seq(
        P.reg(/CustomProperties\s+/),
        this.attributes.CustomProperties.type.grammar,
    ).map(([_0, pin]) => values => {
        (values.CustomProperties ??= []).push(pin)
    })
    static inlinedArrayEntryGrammar = P.seq(
        P.alt(
            Grammar.symbolQuoted.map(v => [v, true]),
            Grammar.symbol.map(v => [v, false]),
        ),
        P.reg(
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
        return P.lazy(() => this.grammar)
            .map(object =>
                values => values[Configuration.subObjectAttributeNameFromEntity(object)] = object
            )
    }

    static createGrammar() {
        return P.seq(
            P.reg(/Begin +Object/),
            P.seq(
                P.whitespace,
                P.alt(
                    this.createSubObjectGrammar(),
                    this.customPropertyGrammar,
                    Grammar.createAttributeGrammar(this, P.reg(Grammar.Regex.MultipleWordsSymbols)),
                    Grammar.createAttributeGrammar(this, Grammar.attributeNameQuoted, undefined, (obj, k, v) =>
                        Utility.objectSet(obj, ["attributes", ...k, "quoted"], true)
                    ),
                    this.inlinedArrayEntryGrammar,
                )
            )
                .map(([_0, entry]) => entry)
                .many(),
            P.reg(/\s+End +Object/),
        )
            .map(([_0, attributes, _2]) => {
                const values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                return new this(values)
            })
    }

    static getMultipleObjectsGrammar() {
        return P.seq(
            P.whitespaceOpt,
            this.grammar,
            P.seq(
                P.whitespace,
                this.grammar,
            )
                .map(([_0, object]) => object)
                .many(),
            P.whitespaceOpt
        )
            .map(([_0, first, remaining, _4]) => [first, ...remaining])
    }

    /** @type {String} */
    #class

    constructor(values = {}) {
        if ("NodePosX" in values !== "NodePosY" in values) {
            const entries = Object.entries(values)
            const [key, position] = "NodePosX" in values
                ? ["NodePosY", Object.keys(values).indexOf("NodePosX") + 1]
                : ["NodePosX", Object.keys(values).indexOf("NodePosY")]
            const entry = [key, new (AttributeInfo.getAttribute(values, key, "type", ObjectEntity))()]
            entries.splice(position, 0, entry)
            values = Object.fromEntries(entries)
        }
        super(values)

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
        /** @type {UnknownPinEntity[]} */ this.AddedPins
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
                obj.R = new (
                    MirroredEntity.of(BooleanEntity).withDefault().flagSilent()
                )(() => rgbaPins[0].DefaultValue)
                obj.G = new (
                    MirroredEntity.of(BooleanEntity).withDefault().flagSilent()
                )(() => rgbaPins[1].DefaultValue)
                obj.B = new (
                    MirroredEntity.of(BooleanEntity).withDefault().flagSilent()
                )(() => rgbaPins[2].DefaultValue)
                obj.A = new (
                    MirroredEntity.of(BooleanEntity).withDefault().flagSilent()
                )(() => rgbaPins[3].DefaultValue)
                obj.keys = [...Configuration.rgba, ...super.keys.filter(k => !Configuration.rgba.includes(k))]
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
                            obj.Node.getter = () => new ObjectReferenceEntity(
                                this.PCGNode.type,
                                `${this.Name}.${this.PCGNode.path}`,
                            )
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
        const result = this.getObjectName().match(ObjectEntity.#nameRegex)
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
        return this.Class && (this.Class.type ? this.Class.type : this.Class.path)?.startsWith("/Script/NiagaraEditor.")
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
        const name = this.SubgraphInstance
        return name
            ? this[Configuration.subObjectAttributeNameFromName(name)]
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
        return nodeVariadic(this)
    }
}
