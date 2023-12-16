/**
 * @typedef {IEntity | String | Number | BigInt | Boolean | Array} TerminalAttribute
 * @typedef {TerminalAttribute | MirroredEntity<TerminalAttribute>} Attribute
 * @typedef {AttributeConstructor<TerminalAttribute> | AttributeConstructor<TerminalAttribute>[] 
 *     | MirroredEntity<Attribute> | Union | Union[] | ComputedType} AttributeTypeDescription
 * @typedef {(entity: IEntity) => Attribute} ValueSupplier
 *//**
* @template T
* @typedef {new (...args: any) => T} AnyConstructor
*/
/**
 * @template {Attribute} T
 * @typedef {AnyConstructor<T> & EntityConstructor | StringConstructor | NumberConstructor | BigIntConstructor
 *     | BooleanConstructor | ArrayConstructor | MirroredEntityConstructor<T>} AttributeConstructor
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
 * @typedef {T extends StringConstructor
 *     ? String
 *     : T extends NumberConstructor
 *     ? Number
 *     : T extends BigIntConstructor
 *     ? BigInt
 *     : T extends BooleanConstructor
 *     ? Boolean
 *     : T extends ArrayConstructor
 *     ? Array
 *     : T extends MirroredEntity<infer R>
 *     ? MirroredEntity<R>
 *     : T extends AnyConstructor<infer R>
 *     ? R
 *     : any
 * } ConstructedType
 */

/**
 * @typedef {{
 *     type?: AttributeTypeDescription,
 *     default?: Attribute | ValueSupplier,
 *     nullable?: Boolean,
 *     ignored?: Boolean,
 *     serialized?: Boolean,
 *     expected?: Boolean,
 *     inlined?: Boolean,
 *     quoted?: Boolean,
 *     predicate?: (value: Attribute) => Boolean,
 * }} AttributeInformation
 * @typedef {{ [key: String]: AttributeInformation }} AttributeDeclarations
 */

/**
 * @typedef {CustomEvent<{ value: [Number, Number] }>} UEBDragEvent
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
 * @typedef {typeof import("./Blueprint.js").default} BlueprintConstructor
 * @typedef {typeof import("./element/LinkElement.js").default} LinkElementConstructor
 * @typedef {typeof import("./element/NodeElement.js").default} NodeElementConstructor
 * @typedef {typeof import("./element/PinElement.js").default} PinElementConstructor
 * @typedef {typeof import("./element/WindowElement.js").default} WindowElementConstructor
 * @typedef {typeof import("./entity/IEntity.js").default} EntityConstructor
 * @typedef {typeof import("./entity/ObjectEntity.js").default} ObjectEntityConstructor
 */
/**
 * @typedef {import("./Blueprint.js").default} Blueprint
 * @typedef {import("./element/ColorHandlerElement.js").default} ColorHandlerElement
 * @typedef {import("./element/ColorSliderElement.js").default} ColorSliderElement
 * @typedef {import("./element/DropdownElement.js").default} DropdownElement
 * @typedef {import("./element/ElementFactory.js").default} ElementFactory
 * @typedef {import("./element/IDraggableControlElement.js").default} IDraggableControlElement
 * @typedef {import("./element/IDraggableElement.js").default} IDraggableElement
 * @typedef {import("./element/IElement.js").default} IElement
 * @typedef {import("./element/IFromToPositionedElement.js").default} IFromToPositionedElement
 * @typedef {import("./element/InputElement.js").default} InputElement
 * @typedef {import("./element/ISelectableDraggableElement.js").default} ISelectableDraggableElement
 * @typedef {import("./element/LinkElement.js").default} LinkElement
 * @typedef {import("./element/NodeElement.js").default} NodeElement
 * @typedef {import("./element/PinElement.js").default} PinElement
 * @typedef {import("./element/SelectorElement.js").default} SelectorElement
 * @typedef {import("./element/WindowElement.js").default} WindowElement
 * @typedef {import("./entity/Base64ObjectsEncoded.js").default} Base64ObjectsEncoded
 * @typedef {import("./entity/ByteEntity.js").default} ByteEntity
 * @typedef {import("./entity/ColorChannelEntity.js").default} ColorChannelEntity
 * @typedef {import("./entity/ComputedType.js").default} ComputedType
 * @typedef {import("./entity/EnumDisplayValueEntity.js").default} EnumDisplayValueEntity
 * @typedef {import("./entity/EnumEntity.js").default} EnumEntity
 * @typedef {import("./entity/FormatTextEntity.js").default} FormatTextEntity
 * @typedef {import("./entity/FunctionReferenceEntity.js").default} FunctionReferenceEntity
 * @typedef {import("./entity/GuidEntity.js").default} GuidEntity
 * @typedef {import("./entity/IdentifierEntity.js").default} IdentifierEntity
 * @typedef {import("./entity/IEntity.js").default} IEntity
 * @typedef {import("./entity/Integer64Entity.js").default} Integer64Entity
 * @typedef {import("./entity/IntegerEntity.js").default} IntegerEntity
 * @typedef {import("./entity/InvariantTextEntity.js").default} InvariantTextEntity
 * @typedef {import("./entity/KeyBindingEntity.js").default} KeyBindingEntity
 * @typedef {import("./entity/LinearColorEntity.js").default} LinearColorEntity
 * @typedef {import("./entity/LocalizedTextEntity.js").default} LocalizedTextEntity
 * @typedef {import("./entity/MacroGraphReferenceEntity.js").default} MacroGraphReferenceEntity
 * @typedef {import("./entity/NaturalNumberEntity.js").default} NaturalNumberEntity
 * @typedef {import("./entity/ObjectEntity.js").default} ObjectEntity
 * @typedef {import("./entity/ObjectReferenceEntity.js").default} ObjectReferenceEntity
 * @typedef {import("./entity/objects/KnotEntity.js").default} KnotEntity
 * @typedef {import("./entity/PathSymbolEntity.js").default} PathSymbolEntity
 * @typedef {import("./entity/PinEntity.js").default} PinEntity
 * @typedef {import("./entity/PinReferenceEntity.js").default} PinReferenceEntity
 * @typedef {import("./entity/PinTypeEntity.js").default} PinTypeEntity
 * @typedef {import("./entity/RotatorEntity.js").default} RotatorEntity
 * @typedef {import("./entity/SimpleSerializationRotatorEntity.js").default} SimpleSerializationRotatorEntity
 * @typedef {import("./entity/SimpleSerializationVector2DEntity.js").default} SimpleSerializationVector2DEntity
 * @typedef {import("./entity/SimpleSerializationVectorEntity.js").default} SimpleSerializationVectorEntity
 * @typedef {import("./entity/SymbolEntity.js").default} SymbolEntity
 * @typedef {import("./entity/TerminalTypeEntity.js").default} TerminalTypeEntity
 * @typedef {import("./entity/Union.js").default} Union
 * @typedef {import("./entity/UnknownKeysEntity.js").default} UnknownKeysEntity
 * @typedef {import("./entity/UnknownPinEntity.js").default} UnknownPinEntity
 * @typedef {import("./entity/VariableReferenceEntity.js").default} VariableReferenceEntity
 * @typedef {import("./entity/Vector2DEntity.js").default} Vector2DEntity
 * @typedef {import("./entity/VectorEntity.js").default} VectorEntity
 * @typedef {import("./input/IInput.js").default} IInput
 * @typedef {import("./template/BlueprintTemplate.js").default} BlueprintTemplate
 * @typedef {import("./template/ColorHandlerTemplate.js").default} ColorHandlerTemplate
 * @typedef {import("./template/ColorSliderTemplate.js").default} ColorSliderTemplate
 * @typedef {import("./template/IDraggableControlTemplate.js").default} IDraggableControlTemplate
 * @typedef {import("./template/IDraggablePositionedTemplate.js").default} IDraggablePositionedTemplate
 * @typedef {import("./template/IDraggableTemplate.js").default} IDraggableTemplate
 * @typedef {import("./template/IFromToPositionedTemplate.js").default} IFromToPositionedTemplate
 * @typedef {import("./template/IResizeableTemplate.js").default} IResizeableTemplate
 * @typedef {import("./template/ISelectableDraggableTemplate.js").default} ISelectableDraggableTemplate
 * @typedef {import("./template/ITemplate.js").default} ITemplate
 * @typedef {import("./template/LinkTemplate.js").default} LinkTemplate
 * @typedef {import("./template/node/CommentNodeTemplate.js").default} CommentNodeTemplate
 * @typedef {import("./template/node/EventNodeTemplate.js").default} EventNodeTemplate
 * @typedef {import("./template/node/KnotNodeTemplate.js").default} KnotNodeTemplate
 * @typedef {import("./template/node/NodeTemplate.js").default} NodeTemplate
 * @typedef {import("./template/node/VariableAccessNodeTemplate.js").default} VariableAccessNodeTemplate
 * @typedef {import("./template/node/VariableConversionNodeTemplate.js").default} VariableConversionNodeTemplate
 * @typedef {import("./template/node/VariableMangementNodeTemplate.js").default} VariableMangementNodeTemplate
 * @typedef {import("./template/node/VariableOperationNodeTemplate.js").default} VariableOperationNodeTemplate
 * @typedef {import("./template/pin/BoolPinTemplate.js").default} BoolPinTemplate
 * @typedef {import("./template/pin/DropdownTemplate.js").default} DropdownTemplate
 * @typedef {import("./template/pin/EnumPinTemplate.js").default} EnumPinTemplate
 * @typedef {import("./template/pin/ExecPinTemplate.js").default} ExecPinTemplate
 * @typedef {import("./template/pin/IInputPinTemplate.js").default} IInputPinTemplate
 * @typedef {import("./template/pin/InputTemplate.js").default} InputTemplate
 * @typedef {import("./template/pin/Int64PinTemplate.js").default} Int64PinTemplate
 * @typedef {import("./template/pin/IntPinTemplate.js").default} IntPinTemplate
 * @typedef {import("./template/pin/INumericPinTemplate.js").default} INumericPinTemplate
 * @typedef {import("./template/pin/KnotPinTemplate.js").default} KnotPinTemplate
 * @typedef {import("./template/pin/LinearColorPinTemplate.js").default} LinearColorPinTemplate
 * @typedef {import("./template/pin/MinimalPinTemplate.js").default} MinimalPinTemplate
 * @typedef {import("./template/pin/NamePinTemplate.js").default} NamePinTemplate
 * @typedef {import("./template/pin/RealPinTemplate.js").default} RealPinTemplate
 * @typedef {import("./template/pin/ReferencePinTemplate.js").default} ReferencePinTemplate
 * @typedef {import("./template/pin/RotatorPinTemplate.js").default} RotatorPinTemplate
 * @typedef {import("./template/pin/StringPinTemplate.js").default} StringPinTemplate
 * @typedef {import("./template/pin/Vector2DPinTemplate.js").default} Vector2DPinTemplate
 * @typedef {import("./template/pin/VectorPinTemplate.js").default} VectorPinTemplate
 * @typedef {import("./template/SelectorTemplate.js").default} SelectorTemplate
 * @typedef {import("./template/window/ColorPickerWindowTemplate.js").default} ColorPickerWindowTemplate
 * @typedef {import("./template/window/WindowTemplate.js").default} WindowTemplate
 * @typedef {import("./input/keyboard/KeyboardShortcut.js").default} KeyboardShortcut
 * @typedef {import("lit").CSSResult} CSSResult
 * @typedef {import("lit").PropertyValues} PropertyValues
 * @typedef {import("lit").TemplateResult} TemplateResult
 */
/**
 * @template {AttributeConstructor<Attribute>} T
 * @typedef {import("./serialization/Serializer.js").default<T>} Serializer
 */
/**
 * @template {Attribute} T
 * @typedef {import("./entity/MirroredEntity.js").default<T>} MirroredEntity
 */
/**
 * @template {Attribute} T
 * @typedef {typeof import("./entity/MirroredEntity.js").default<T>} MirroredEntityConstructor
 */
