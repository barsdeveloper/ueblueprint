import P from "parsernostrum"
import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import nodeColor from "../decoding/nodeColor.js"
import nodeIcon from "../decoding/nodeIcon.js"
import nodeVariadic from "../decoding/nodeVariadic.js"
import Grammar from "../serialization/Grammar.js"
import AlternativesEntity from "./AlternativesEntity.js"
import ArrayEntity from "./ArrayEntity.js"
import BooleanEntity from "./BooleanEntity.js"
import FunctionReferenceEntity from "./FunctionReferenceEntity.js"
import GuidEntity from "./GuidEntity.js"
import IEntity from "./IEntity.js"
import IntegerEntity from "./IntegerEntity.js"
import LinearColorEntity from "./LinearColorEntity.js"
import MacroGraphReferenceEntity from "./MacroGraphReferenceEntity.js"
import MirroredEntity from "./MirroredEntity.js"
import NaturalNumberEntity from "./NaturalNumberEntity.js"
import NullEntity from "./NullEntity.js"
import ObjectReferenceEntity from "./ObjectReferenceEntity.js"
import PinEntity from "./PinEntity.js"
import ScriptVariableEntity from "./ScriptVariableEntity.js"
import StringEntity from "./StringEntity.js"
import SymbolEntity from "./SymbolEntity.js"
import UnknownPinEntity from "./UnknownPinEntity.js"
import VariableReferenceEntity from "./VariableReferenceEntity.js"

export default class ObjectEntity extends IEntity {

    #exported = false
    get exported() {
        return this.#exported
    }
    set exported(value) {
        this.#exported = value
    }

    static #nameRegex = /^(\w+?)(?:_(\d+))?$/
    static attributeSeparator = "\n"
    static wrap = this.notWrapped
    static trailing = true
    static attributes = {
        ...super.attributes,
        Class: ObjectReferenceEntity,
        Name: StringEntity,
        Archetype: ObjectReferenceEntity,
        ExportPath: ObjectReferenceEntity,
        ObjectRef: ObjectReferenceEntity,
        BlueprintElementType: ObjectReferenceEntity,
        BlueprintElementInstance: ObjectReferenceEntity,
        PinTags: ArrayEntity.of(NullEntity).flagInlined(),
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
        AdvancedPinDisplay: SymbolEntity,
        DelegateReference: VariableReferenceEntity,
        EnabledState: SymbolEntity,
        NodeGuid: GuidEntity,
        ErrorType: IntegerEntity,
        ErrorMsg: StringEntity,
        ScriptVariables: ArrayEntity.of(ScriptVariableEntity),
        Node: MirroredEntity.of(ObjectReferenceEntity),
        ExportedNodes: StringEntity,
        CustomProperties: ArrayEntity.of(AlternativesEntity.accepting(PinEntity, UnknownPinEntity)).withDefault().flagSilent(),
    }
    static customPropertyGrammar = P.seq(
        P.reg(/CustomProperties\s+/),
        this.attributes.CustomProperties.type.grammar,
    ).map(([_0, pin]) => values => {
        /** @type {InstanceType<typeof this.attributes.CustomProperties>} */(
            values.CustomProperties ??= new (this.attributes.CustomProperties)()
        ).values.push(pin)
    })
    static inlinedArrayEntryGrammar = P.seq(
        P.alt(
            Grammar.symbolQuoted.map(v => [v, true]),
            Grammar.symbol.map(v => [v, false]),
        ),
        P.reg(new RegExp(String.raw`\s*\(\s*(\d+)\s*\)\s*\=\s*`), 1).map(Number)
    )
        .chain(
            /** @param {[[keyof ObjectEntity.attributes, Boolean], Number]} param */
            ([[symbol, quoted], index]) =>
                this.attributes[symbol].grammar.map(currentValue =>
                    values => {
                        if (values[symbol] === undefined) {
                            let arrayEntity = ArrayEntity
                            if (quoted != arrayEntity.quoted) {
                                arrayEntity = arrayEntity.flagQuoted(quoted)
                            }
                            if (!arrayEntity.inlined) {
                                arrayEntity = arrayEntity.flagInlined()
                            }
                            values[symbol] = new arrayEntity()
                        }
                        /** @type {ArrayEntity} */
                        const target = values[symbol]
                        target.values[index] = currentValue
                    }
                )
        )
    static grammar = this.createGrammar()
    static grammarMultipleObjects = P.seq(
        P.whitespaceOpt,
        this.grammar,
        P.seq(
            P.whitespace,
            this.grammar,
        )
            .map(([_0, object]) => object)
            .many(),
        P.whitespaceOpt
    ).map(([_0, first, remaining, _4]) => [first, ...remaining])

    static createSubObjectGrammar() {
        return P.lazy(() => this.grammar)
            .map(object =>
                values => values[Configuration.subObjectAttributeNameFromEntity(object)] = object
            )
    }

    /** @type {String} */
    #class

    constructor(values = {}) {
        if (("NodePosX" in values) !== ("NodePosY" in values)) {
            const entries = Object.entries(values)
            const [key, position] = "NodePosX" in values
                ? ["NodePosY", Object.keys(values).indexOf("NodePosX") + 1]
                : ["NodePosX", Object.keys(values).indexOf("NodePosY")]
            entries.splice(position, 0, [key, new IntegerEntity(0)])
            values = Object.fromEntries(entries)
        }
        super(values)

        // Attributes
        /** @type {InstanceType<typeof ObjectEntity.attributes.AddedPins>} */ this.AddedPins
        /** @type {InstanceType<typeof ObjectEntity.attributes.AdvancedPinDisplay>} */ this.AdvancedPinDisplay
        /** @type {InstanceType<typeof ObjectEntity.attributes.Archetype>} */ this.Archetype
        /** @type {InstanceType<typeof ObjectEntity.attributes.AxisKey>} */ this.AxisKey
        /** @type {InstanceType<typeof ObjectEntity.attributes.bIsPureFunc>} */ this.bIsPureFunc
        /** @type {InstanceType<typeof ObjectEntity.attributes.BlueprintElementInstance>} */ this.BlueprintElementInstance
        /** @type {InstanceType<typeof ObjectEntity.attributes.BlueprintElementType>} */ this.BlueprintElementType
        /** @type {InstanceType<typeof ObjectEntity.attributes.Class>} */ this.Class
        /** @type {InstanceType<typeof ObjectEntity.attributes.CommentColor>} */ this.CommentColor
        /** @type {InstanceType<typeof ObjectEntity.attributes.ComponentPropertyName>} */ this.ComponentPropertyName
        /** @type {InstanceType<typeof ObjectEntity.attributes.CustomFunctionName>} */ this.CustomFunctionName
        /** @type {ExtractType<typeof ObjectEntity.attributes.CustomProperties>} */ this.CustomProperties
        /** @type {InstanceType<typeof ObjectEntity.attributes.DelegatePropertyName>} */ this.DelegatePropertyName
        /** @type {InstanceType<typeof ObjectEntity.attributes.DelegateReference>} */ this.DelegateReference
        /** @type {InstanceType<typeof ObjectEntity.attributes.EnabledState>} */ this.EnabledState
        /** @type {InstanceType<typeof ObjectEntity.attributes.Enum>} */ this.Enum
        /** @type {InstanceType<typeof ObjectEntity.attributes.EnumEntries>} */ this.EnumEntries
        /** @type {InstanceType<typeof ObjectEntity.attributes.EventReference>} */ this.EventReference
        /** @type {InstanceType<typeof ObjectEntity.attributes.ExportedNodes>} */ this.ExportedNodes
        /** @type {InstanceType<typeof ObjectEntity.attributes.ExportPath>} */ this.ExportPath
        /** @type {InstanceType<typeof ObjectEntity.attributes.FunctionDisplayName>} */ this.FunctionDisplayName
        /** @type {InstanceType<typeof ObjectEntity.attributes.FunctionReference>} */ this.FunctionReference
        /** @type {InstanceType<typeof ObjectEntity.attributes.FunctionScript>} */ this.FunctionScript
        /** @type {InstanceType<typeof ObjectEntity.attributes.Graph>} */ this.Graph
        /** @type {InstanceType<typeof ObjectEntity.attributes.HiGenGridSize>} */ this.HiGenGridSize
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputAxisKey>} */ this.InputAxisKey
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputKey>} */ this.InputKey
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputName>} */ this.InputName
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputPins>} */ this.InputPins
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputType>} */ this.InputType
        /** @type {InstanceType<typeof ObjectEntity.attributes.MacroGraphReference>} */ this.MacroGraphReference
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpression>} */ this.MaterialExpression
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpressionComment>} */ this.MaterialExpressionComment
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpressionEditorX>} */ this.MaterialExpressionEditorX
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpressionEditorY>} */ this.MaterialExpressionEditorY
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialFunction>} */ this.MaterialFunction
        /** @type {InstanceType<typeof ObjectEntity.attributes.Name>} */ this.Name
        /** @type {InstanceType<typeof ObjectEntity.attributes.Node>} */ this.Node
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeComment>} */ this.NodeComment
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeHeight>} */ this.NodeHeight
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodePosX>} */ this.NodePosX
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodePosY>} */ this.NodePosY
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeTitle>} */ this.NodeTitle
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeTitleColor>} */ this.NodeTitleColor
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeWidth>} */ this.NodeWidth
        /** @type {InstanceType<typeof ObjectEntity.attributes.NumAdditionalInputs>} */ this.NumAdditionalInputs
        /** @type {InstanceType<typeof ObjectEntity.attributes.ObjectRef>} */ this.ObjectRef
        /** @type {InstanceType<typeof ObjectEntity.attributes.Operation>} */ this.Operation
        /** @type {InstanceType<typeof ObjectEntity.attributes.OpName>} */ this.OpName
        /** @type {InstanceType<typeof ObjectEntity.attributes.OutputPins>} */ this.OutputPins
        /** @type {InstanceType<typeof ObjectEntity.attributes.PCGNode>} */ this.PCGNode
        /** @type {InstanceType<typeof ObjectEntity.attributes.PinTags>} */ this.PinTags
        /** @type {InstanceType<typeof ObjectEntity.attributes.PinNames>} */ this.PinNames
        /** @type {InstanceType<typeof ObjectEntity.attributes.PositionX>} */ this.PositionX
        /** @type {InstanceType<typeof ObjectEntity.attributes.PositionY>} */ this.PositionY
        /** @type {InstanceType<typeof ObjectEntity.attributes.ProxyFactoryFunctionName>} */ this.ProxyFactoryFunctionName
        /** @type {InstanceType<typeof ObjectEntity.attributes.ScriptVariables>} */ this.ScriptVariables
        /** @type {InstanceType<typeof ObjectEntity.attributes.SettingsInterface>} */ this.SettingsInterface
        /** @type {InstanceType<typeof ObjectEntity.attributes.SizeX>} */ this.SizeX
        /** @type {InstanceType<typeof ObjectEntity.attributes.SizeY>} */ this.SizeY
        /** @type {InstanceType<typeof ObjectEntity.attributes.StructType>} */ this.StructType
        /** @type {InstanceType<typeof ObjectEntity.attributes.SubgraphInstance>} */ this.SubgraphInstance
        /** @type {InstanceType<typeof ObjectEntity.attributes.TargetType>} */ this.TargetType
        /** @type {InstanceType<typeof ObjectEntity.attributes.Text>} */ this.Text
        /** @type {InstanceType<typeof ObjectEntity.attributes.Text>} */ this.Text
        /** @type {InstanceType<typeof ObjectEntity.attributes.VariableReference>} */ this.VariableReference

        // Legacy nodes pins
        if (this["Pins"] instanceof Array) {
            this["Pins"].forEach(
                /** @param {ObjectReferenceEntity} objectReference */
                objectReference => {
                    const pinObject = this[Configuration.subObjectAttributeNameFromReference(objectReference, true)]
                    if (pinObject) {
                        const pinEntity = PinEntity.fromLegacyObject(pinObject)
                        pinEntity.LinkedTo = new (PinEntity.attributes.LinkedTo)()
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
                    this.getPinEntities().find(pin => pin.PinName.serialize() === pinName && (pin.recomputesNodeTitleOnChange = true))
                )
                const silentBool = MirroredEntity.of(BooleanEntity).withDefault().flagSilent()
                obj["R"] = new silentBool(() => rgbaPins[0].DefaultValue)
                obj["G"] = new silentBool(() => rgbaPins[1].DefaultValue)
                obj["B"] = new silentBool(() => rgbaPins[2].DefaultValue)
                obj["A"] = new silentBool(() => rgbaPins[3].DefaultValue)
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
                        const nodeRef = obj.Node.getter()
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
        this.getCustomproperties().forEach((pinEntity, i) => {
            pinEntity.objectEntity = this
            pinEntity.pinIndex = pinEntity.isInput()
                ? inputIndex++
                : pinEntity.isOutput()
                    ? outputIndex++
                    : i
        })
    }

    static createGrammar() {
        return /** @type {P<ObjectEntity>} */(
            P.seq(
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
                .label("ObjectEntity")
        )
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
        return this.Name.toString()
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
        return this.CustomProperties.values
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
            || this.getPcgSubobject() != null
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
        return this.EnabledState?.serialize() === "DevelopmentOnly"
            || nodeClass.includes("Debug", Math.max(0, nodeClass.lastIndexOf(".")))
    }

    getHIDAttribute() {
        return this.InputKey ?? this.AxisKey ?? this.InputAxisKey
    }

    getDelegatePin() {
        return this.getCustomproperties().find(pin => pin.PinType.PinCategory.toString() === "delegate")
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

    /** @param {String} key */
    showProperty(key) {
        switch (key) {
            case "Class":
            case "Name":
            case "Archetype":
            case "ExportPath":
            case "CustomProperties":
                // Serielized separately, check doWrite()
                return false
        }
        return super.showProperty(key)
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = this.Self(),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        const moreIndentation = indentation + Configuration.indentation
        let result = indentation + "Begin Object"
            + (this.Class?.type || this.Class?.path ? ` Class=${this.Class.serialize(insideString)}` : "")
            + (this.Name ? ` Name=${this.Name.serialize(insideString)}` : "")
            + (this.Archetype ? ` Archetype=${this.Archetype.serialize(insideString)}` : "")
            + (this.ExportPath?.type || this.ExportPath?.path ? ` ExportPath=${this.ExportPath.serialize(insideString)}` : "")
            + "\n"
            + super.serialize(insideString, moreIndentation, Self, printKey, keySeparator, attributeSeparator, wrap)
            + (!this.CustomProperties.Self().ignored
                ? this.getCustomproperties().map(pin =>
                    moreIndentation
                    + printKey("CustomProperties ")
                    + pin.serialize(insideString)
                    + this.Self().attributeSeparator
                ).join("")
                : ""
            )
            + indentation + "End Object\n"
        return result
    }
}
