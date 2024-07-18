/**
 * @template T
 * @typedef {abstract new (...args: any) => T} AnyConstructor
 */
/**
 * @template {Attribute} T
 * @typedef {AnyConstructor<T> & EntityConstructor | StringConstructor | NumberConstructor | BigIntConstructor
 *     | BooleanConstructor | ArrayConstructor | MirroredEntityConstructor<T>} AttributeConstructor
 */
/**
 * @typedef {[Number, Number]} Coordinates
 * @typedef {IEntity | String | Number | BigInt | Boolean | Array} TerminalAttribute
 * @typedef {TerminalAttribute | MirroredEntity<TerminalAttribute>} Attribute
 * @typedef {(
 *      AttributeConstructor<Attribute> | AttributeConstructor<Attribute>[] 
 *     | MirroredEntity<Attribute> | Union<any> | Union<any>[] | ComputedType
 * )} AttributeTypeDescription
 * @typedef {(entity: IEntity) => Attribute} ValueSupplier
 */
/**
 * @template {Attribute} T
 * @typedef {T extends String
 *     ? StringConstructor
 *     : T extends Number
 *     ? NumberConstructor
 *     : T extends BigInt
 *     ? BigIntConstructor
 *     : T extends Boolean
 *     ? BooleanConstructor
 *     : T extends Array
 *     ? ArrayConstructor
 *     : T extends MirroredEntity<infer R>
 *     ? MirroredEntityConstructor<R>
 *     : T extends IEntity
 *     ? AnyConstructor<T> & EntityConstructor
 *     : any
 * } ConstructorType
 */
/**
 * @template T
 * @typedef {T extends AnyConstructor<infer R>
 *     ? R
 *     : T extends StringConstructor
 *     ? String
 *     : T extends NumberConstructor
 *     ? Number
 *     : T extends BigIntConstructor
 *     ? BigInt
 *     : T extends BooleanConstructor
 *     ? Boolean
 *     : T extends ArrayConstructor
 *     ? Array
 *     : any
 * } ConstructedType
 */
/**
 * @template T
 * @typedef {T extends [infer A] ? DescribedType<A>
 *     : T extends [infer A, ...infer B] ? (DescribedType<A> | DescribedTypesFromArray<B>)
 *     : any
 * } DescribedTypesFromArray
 **/
/**
 * @template T
 * @typedef {T extends AnyConstructor<infer R>
 *     ? R
 *     : T extends StringConstructor
 *     ? String
 *     : T extends NumberConstructor
 *     ? Number
 *     : T extends BigIntConstructor
 *     ? BigInt
 *     : T extends BooleanConstructor
 *     ? Boolean
 *     : T extends Array<infer R>
 *     ? DescribedType<R>[]
 *     : T extends MirroredEntity<infer R>
 *     ? DescribedType<R>
 *     : T
 * } DescribedType
 */
/**
 * @typedef {CustomEvent<{ value: Coordinates }>} UEBDragEvent
 */
/**
 * @template T
 * @typedef {{
 *     (value: Boolean): BooleanConstructor,
 *     (value: Number): NumberConstructor,
 *     (value: String): StringConstructor,
 *     (value: BigInt): BigIntConstructor,
 *     (value: T): typeof value.constructor,
 * }} TypeGetter
 */
/**
 * @template T
 * @typedef {T extends [infer A extends EntityConstructor] ? InstanceType<A>
 *     : T extends [infer A extends EntityConstructor, ...infer B] ? InstanceType<A> | UnionFromArray<B>
 *     : never
 * } UnionFromArray
 */
/**
 * @template {EntityConstructor} T
 * @typedef {T extends AlternativesEntityConstructor & { alternatives: infer R } ? UnionFromArray<R>
 *     : InstanceType<T>
 * } ExtractType
 */
/**
 * @typedef {typeof import("./js/Blueprint.js").default} BlueprintConstructor
 * @typedef {typeof import("./js/element/LinkElement.js").default} LinkElementConstructor
 * @typedef {typeof import("./js/element/NodeElement.js").default} NodeElementConstructor
 * @typedef {typeof import("./js/element/PinElement.js").default} PinElementConstructor
 * @typedef {typeof import("./js/element/WindowElement.js").default} WindowElementConstructor
 * @typedef {typeof import("./js/entity/IEntity.js").default} EntityConstructor
 * @typedef {typeof import("./js/entity/AlternativesEntity.js").default} AlternativesEntityConstructor
 * @typedef {typeof import("./js/entity/ObjectEntity.js").default} ObjectEntityConstructor
 */
/**
 * @typedef {import ("./tests/fixtures/BlueprintFixture.js").default} BlueprintFixture
 * @typedef {import("./js/Blueprint.js").default} Blueprint
 * @typedef {import("./js/element/ColorHandlerElement.js").default} ColorHandlerElement
 * @typedef {import("./js/element/ColorSliderElement.js").default} ColorSliderElement
 * @typedef {import("./js/element/DropdownElement.js").default} DropdownElement
 * @typedef {import("./js/element/ElementFactory.js").default} ElementFactory
 * @typedef {import("./js/element/IDraggableControlElement.js").default} IDraggableControlElement
 * @typedef {import("./js/element/IDraggableElement.js").default} IDraggableElement
 * @typedef {import("./js/element/IElement.js").default} IElement
 * @typedef {import("./js/element/IFromToPositionedElement.js").default} IFromToPositionedElement
 * @typedef {import("./js/element/InputElement.js").default} InputElement
 * @typedef {import("./js/element/ISelectableDraggableElement.js").default} ISelectableDraggableElement
 * @typedef {import("./js/element/LinkElement.js").default} LinkElement
 * @typedef {import("./js/element/NodeElement.js").default} NodeElement
 * @typedef {import("./js/element/PinElement.js").default} PinElement
 * @typedef {import("./js/element/SelectorElement.js").default} SelectorElement
 * @typedef {import("./js/element/WindowElement.js").default} WindowElement
 * @typedef {import("./js/entity/ByteEntity.js").default} ByteEntity
 * @typedef {import("./js/entity/ColorChannelEntity.js").default} ColorChannelEntity
 * @typedef {import("./js/entity/ComputedTypeEntity.js").default} ComputedTypeEntity
 * @typedef {import("./js/entity/EnumDisplayValueEntity.js").default} EnumDisplayValueEntity
 * @typedef {import("./js/entity/EnumEntity.js").default} EnumEntity
 * @typedef {import("./js/entity/FormatTextEntity.js").default} FormatTextEntity
 * @typedef {import("./js/entity/FunctionReferenceEntity.js").default} FunctionReferenceEntity
 * @typedef {import("./js/entity/GuidEntity.js").default} GuidEntity
 * @typedef {import("./js/entity/IEntity.js").default} IEntity
 * @typedef {import("./js/entity/Integer64Entity.js").default} Integer64Entity
 * @typedef {import("./js/entity/IntegerEntity.js").default} IntegerEntity
 * @typedef {import("./js/entity/InvariantTextEntity.js").default} InvariantTextEntity
 * @typedef {import("./js/entity/KeyBindingEntity.js").default} KeyBindingEntity
 * @typedef {import("./js/entity/LinearColorEntity.js").default} LinearColorEntity
 * @typedef {import("./js/entity/LocalizedTextEntity.js").default} LocalizedTextEntity
 * @typedef {import("./js/entity/MacroGraphReferenceEntity.js").default} MacroGraphReferenceEntity
 * @typedef {import("./js/entity/NaturalNumberEntity.js").default} NaturalNumberEntity
 * @typedef {import("./js/entity/NullEntity.js").default} NullEntity
 * @typedef {import("./js/entity/ObjectEntity.js").default} ObjectEntity
 * @typedef {import("./js/entity/ObjectReferenceEntity.js").default} ObjectReferenceEntity
 * @typedef {import("./js/entity/objects/KnotEntity.js").default} KnotEntity
 * @typedef {import("./js/entity/PinEntity.js").default} PinEntity
 * @typedef {import("./js/entity/PinReferenceEntity.js").default} PinReferenceEntity
 * @typedef {import("./js/entity/PinTypeEntity.js").default} PinTypeEntity
 * @typedef {import("./js/entity/RBSerializationVector2DEntity.js").default} RBSerializationVector2DEntity
 * @typedef {import("./js/entity/RotatorEntity.js").default} RotatorEntity
 * @typedef {import("./js/entity/SimpleSerializationRotatorEntity.js").default} SimpleSerializationRotatorEntity
 * @typedef {import("./js/entity/SimpleSerializationVector2DEntity.js").default} SimpleSerializationVector2DEntity
 * @typedef {import("./js/entity/SimpleSerializationVectorEntity.js").default} SimpleSerializationVectorEntity
 * @typedef {import("./js/entity/SymbolEntity.js").default} SymbolEntity
 * @typedef {import("./js/entity/TerminalTypeEntity.js").default} TerminalTypeEntity
 * @typedef {import("./js/entity/UnknownKeysEntity.js").default} UnknownKeysEntity
 * @typedef {import("./js/entity/UnknownPinEntity.js").default} UnknownPinEntity
 * @typedef {import("./js/entity/VariableReferenceEntity.js").default} VariableReferenceEntity
 * @typedef {import("./js/entity/Vector2DEntity.js").default} Vector2DEntity
 * @typedef {import("./js/entity/VectorEntity.js").default} VectorEntity
 * @typedef {import("./js/input/IInput.js").default} IInput
 * @typedef {import("./js/input/keyboard/KeyboardShortcut.js").default} KeyboardShortcut
 * @typedef {import("./js/input/mouse/MouseMoveDraggable.js").default} MouseMoveDraggable
 * @typedef {import("./js/template/BlueprintTemplate.js").default} BlueprintTemplate
 * @typedef {import("./js/template/ColorHandlerTemplate.js").default} ColorHandlerTemplate
 * @typedef {import("./js/template/ColorSliderTemplate.js").default} ColorSliderTemplate
 * @typedef {import("./js/template/IDraggableControlTemplate.js").default} IDraggableControlTemplate
 * @typedef {import("./js/template/IDraggablePositionedTemplate.js").default} IDraggablePositionedTemplate
 * @typedef {import("./js/template/IDraggableTemplate.js").default} IDraggableTemplate
 * @typedef {import("./js/template/IFromToPositionedTemplate.js").default} IFromToPositionedTemplate
 * @typedef {import("./js/template/IResizeableTemplate.js").default} IResizeableTemplate
 * @typedef {import("./js/template/ISelectableDraggableTemplate.js").default} ISelectableDraggableTemplate
 * @typedef {import("./js/template/ITemplate.js").default} ITemplate
 * @typedef {import("./js/template/LinkTemplate.js").default} LinkTemplate
 * @typedef {import("./js/template/node/CommentNodeTemplate.js").default} CommentNodeTemplate
 * @typedef {import("./js/template/node/EventNodeTemplate.js").default} EventNodeTemplate
 * @typedef {import("./js/template/node/KnotNodeTemplate.js").default} KnotNodeTemplate
 * @typedef {import("./js/template/node/NodeTemplate.js").default} NodeTemplate
 * @typedef {import("./js/template/node/VariableAccessNodeTemplate.js").default} VariableAccessNodeTemplate
 * @typedef {import("./js/template/node/VariableConversionNodeTemplate.js").default} VariableConversionNodeTemplate
 * @typedef {import("./js/template/node/VariableMangementNodeTemplate.js").default} VariableMangementNodeTemplate
 * @typedef {import("./js/template/node/VariableOperationNodeTemplate.js").default} VariableOperationNodeTemplate
 * @typedef {import("./js/template/pin/BoolPinTemplate.js").default} BoolPinTemplate
 * @typedef {import("./js/template/pin/DropdownTemplate.js").default} DropdownTemplate
 * @typedef {import("./js/template/pin/EnumPinTemplate.js").default} EnumPinTemplate
 * @typedef {import("./js/template/pin/ExecPinTemplate.js").default} ExecPinTemplate
 * @typedef {import("./js/template/pin/IInputPinTemplate.js").default} IInputPinTemplate
 * @typedef {import("./js/template/pin/InputTemplate.js").default} InputTemplate
 * @typedef {import("./js/template/pin/Int64PinTemplate.js").default} Int64PinTemplate
 * @typedef {import("./js/template/pin/IntPinTemplate.js").default} IntPinTemplate
 * @typedef {import("./js/template/pin/INumericPinTemplate.js").default} INumericPinTemplate
 * @typedef {import("./js/template/pin/KnotPinTemplate.js").default} KnotPinTemplate
 * @typedef {import("./js/template/pin/LinearColorPinTemplate.js").default} LinearColorPinTemplate
 * @typedef {import("./js/template/pin/MinimalPinTemplate.js").default} MinimalPinTemplate
 * @typedef {import("./js/template/pin/NamePinTemplate.js").default} NamePinTemplate
 * @typedef {import("./js/template/pin/RealPinTemplate.js").default} RealPinTemplate
 * @typedef {import("./js/template/pin/ReferencePinTemplate.js").default} ReferencePinTemplate
 * @typedef {import("./js/template/pin/RotatorPinTemplate.js").default} RotatorPinTemplate
 * @typedef {import("./js/template/pin/StringPinTemplate.js").default} StringPinTemplate
 * @typedef {import("./js/template/pin/Vector2DPinTemplate.js").default} Vector2DPinTemplate
 * @typedef {import("./js/template/pin/VectorPinTemplate.js").default} VectorPinTemplate
 * @typedef {import("./js/template/SelectorTemplate.js").default} SelectorTemplate
 * @typedef {import("./js/template/window/ColorPickerWindowTemplate.js").default} ColorPickerWindowTemplate
 * @typedef {import("./js/template/window/WindowTemplate.js").default} WindowTemplate
 * @typedef {import("lit").CSSResult} CSSResult
 * @typedef {import("lit").PropertyValues} PropertyValues
 * @typedef {import("lit").TemplateResult} TemplateResult
 */
/**
 * @template T
 * @typedef {{
 *     evaluate<R, Arg>(pageFunction: (node: T, arg: Arg) => R, arg: Arg, options?: { timeout?: number }): Promise<R>
 *     evaluate<R>(pageFunction: (node: T) => R, options?: { timeout?: number }): Promise<R>
 * } & import("@playwright/test").Locator} Locator
 */
/**
 * @template T
 * @typedef {import("parsernostrum").ProducerParser<T>} Parser
 */
