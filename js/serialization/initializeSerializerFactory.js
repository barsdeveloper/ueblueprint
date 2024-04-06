import Parsernostrum from "parsernostrum"
import Utility from "../Utility.js"
import ByteEntity from "../entity/ByteEntity.js"
import ColorChannelEntity from "../entity/ColorChannelEntity.js"
import EnumDisplayValueEntity from "../entity/EnumDisplayValueEntity.js"
import EnumEntity from "../entity/EnumEntity.js"
import FormatTextEntity from "../entity/FormatTextEntity.js"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import IdentifierEntity from "../entity/IdentifierEntity.js"
import Integer64Entity from "../entity/Integer64Entity.js"
import IntegerEntity from "../entity/IntegerEntity.js"
import InvariantTextEntity from "../entity/InvariantTextEntity.js"
import KeyBindingEntity from "../entity/KeyBindingEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import LocalizedTextEntity from "../entity/LocalizedTextEntity.js"
import MacroGraphReferenceEntity from "../entity/MacroGraphReferenceEntity.js"
import MirroredEntity from "../entity/MirroredEntity.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity.js"
import PathSymbolEntity from "../entity/PathSymbolEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import PinTypeEntity from "../entity/PinTypeEntity.js"
import RBSerializationVector2DEntity from "../entity/RBSerializationVector2DEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import TerminalTypeEntity from "../entity/TerminalTypeEntity.js"
import Union from "../entity/Union.js"
import UnknownKeysEntity from "../entity/UnknownKeysEntity.js"
import VariableReferenceEntity from "../entity/VariableReferenceEntity.js"
import Vector2DEntity from "../entity/Vector2DEntity.js"
import VectorEntity from "../entity/VectorEntity.js"
import CustomSerializer from "./CustomSerializer.js"
import Grammar from "./Grammar.js"
import ObjectSerializer from "./ObjectSerializer.js"
import Serializer from "./Serializer.js"
import SerializerFactory from "./SerializerFactory.js"
import ToStringSerializer from "./ToStringSerializer.js"

Grammar.unknownValue =
    Parsernostrum.alt(
        // Remember to keep the order, otherwise parsing might fail
        Grammar.boolean,
        GuidEntity.createGrammar(),
        Parsernostrum.str("None").map(() => new ObjectReferenceEntity({ type: "None" })),
        Grammar.null,
        Grammar.number,
        ObjectReferenceEntity.fullReferenceGrammar,
        Grammar.string,
        LocalizedTextEntity.createGrammar(),
        InvariantTextEntity.createGrammar(),
        FormatTextEntity.createGrammar(),
        PinReferenceEntity.createGrammar(),
        VectorEntity.createGrammar(),
        RotatorEntity.createGrammar(),
        LinearColorEntity.createGrammar(),
        Vector2DEntity.createGrammar(),
        UnknownKeysEntity.createGrammar(),
        SymbolEntity.createGrammar(),
        Grammar.grammarFor(undefined, [PinReferenceEntity]),
        Grammar.grammarFor(undefined, [new Union(Number, String, SymbolEntity)]),
        Parsernostrum.lazy(() => Grammar.grammarFor(undefined, [undefined])),
    )

export default function initializeSerializerFactory() {

    SerializerFactory.registerSerializer(
        null,
        new CustomSerializer(
            (nullValue, insideString) => "()",
            null
        )
    )

    SerializerFactory.registerSerializer(
        Array,
        new CustomSerializer(
            (array, insideString) =>
                `(${array
                    .map(v =>
                        SerializerFactory.getSerializer(Utility.getType(v)).write(v, insideString) + ","
                    )
                    .join("")
                })`,
            Array
        )
    )

    SerializerFactory.registerSerializer(
        BigInt,
        new ToStringSerializer(BigInt)
    )

    SerializerFactory.registerSerializer(
        Boolean,
        new CustomSerializer(
            /** @param {Boolean} boolean */
            (boolean, insideString) => boolean
                ? insideString
                    ? "true"
                    : "True"
                : insideString
                    ? "false"
                    : "False",
            Boolean
        )
    )

    SerializerFactory.registerSerializer(
        ByteEntity,
        new ToStringSerializer(ByteEntity)
    )

    SerializerFactory.registerSerializer(
        ColorChannelEntity,
        new ToStringSerializer(ColorChannelEntity)
    )

    SerializerFactory.registerSerializer(
        EnumDisplayValueEntity,
        new ToStringSerializer(EnumDisplayValueEntity)
    )

    SerializerFactory.registerSerializer(
        EnumEntity,
        new ToStringSerializer(EnumEntity)
    )

    SerializerFactory.registerSerializer(
        FormatTextEntity,
        new CustomSerializer(
            (v, insideString) => {
                let result = v.getLookbehind() + "("
                    + v.value.map(v =>
                        SerializerFactory.getSerializer(Utility.getType(v)).write(v, insideString)
                    ).join(", ")
                    + ")"
                return result
            },
            FormatTextEntity)
    )

    SerializerFactory.registerSerializer(
        FunctionReferenceEntity,
        new Serializer(FunctionReferenceEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        GuidEntity,
        new ToStringSerializer(GuidEntity)
    )

    SerializerFactory.registerSerializer(
        IdentifierEntity,
        new ToStringSerializer(IdentifierEntity)
    )

    SerializerFactory.registerSerializer(
        Integer64Entity,
        new ToStringSerializer(Integer64Entity)
    )

    SerializerFactory.registerSerializer(
        IntegerEntity,
        new ToStringSerializer(IntegerEntity)
    )

    SerializerFactory.registerSerializer(
        InvariantTextEntity,
        new Serializer(InvariantTextEntity, (entity, v) => `${entity.getLookbehind()}(${v})`, ", ", false, "", () => "")
    )

    SerializerFactory.registerSerializer(
        KeyBindingEntity,
        new Serializer(KeyBindingEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        LinearColorEntity,
        new Serializer(LinearColorEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new Serializer(LocalizedTextEntity, (entity, v) => `${entity.getLookbehind()}(${v})`, ", ", false, "", () => "")
    )

    SerializerFactory.registerSerializer(
        MacroGraphReferenceEntity,
        new Serializer(MacroGraphReferenceEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        MirroredEntity,
        new CustomSerializer(
            (v, insideString) => SerializerFactory.getSerializer(v.getTargetType()).write(v.get(), insideString),
            MirroredEntity
        )
    )

    SerializerFactory.registerSerializer(
        Number,
        new ToStringSerializer(Number)
    )

    SerializerFactory.registerSerializer(
        ObjectEntity,
        new ObjectSerializer()
    )

    SerializerFactory.registerSerializer(
        ObjectReferenceEntity,
        new CustomSerializer(
            objectReference => {
                let type = objectReference.type ?? ""
                let name = objectReference.path ?? ""
                if (type && name && Utility.isSerialized(objectReference, "path")) {
                    name = `'${name}'`
                }
                let result = type + name
                if (Utility.isSerialized(objectReference, "type")) {
                    result = `"${result}"`
                }
                return result
            },
            ObjectReferenceEntity
        )
    )

    SerializerFactory.registerSerializer(
        PathSymbolEntity,
        new ToStringSerializer(PathSymbolEntity)
    )

    SerializerFactory.registerSerializer(
        PinEntity,
        new Serializer(PinEntity, (entity, v) => `${entity.getLookbehind()} (${v})`, ",", true)
    )

    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new Serializer(PinReferenceEntity, undefined, " ", false, "", () => "")
    )

    SerializerFactory.registerSerializer(
        PinTypeEntity,
        new Serializer(PinTypeEntity)
    )

    SerializerFactory.registerSerializer(
        TerminalTypeEntity,
        new Serializer(TerminalTypeEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        RBSerializationVector2DEntity,
        new CustomSerializer(
            (value, insideString) => `X=${value.X} Y=${value.Y}`,
            RBSerializationVector2DEntity
        )
    )

    SerializerFactory.registerSerializer(
        RotatorEntity,
        new Serializer(RotatorEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        String,
        new CustomSerializer(
            (value, insideString) => insideString
                ? Utility.escapeString(value)
                : `"${Utility.escapeString(value)}"`,
            String
        )
    )

    SerializerFactory.registerSerializer(
        SimpleSerializationRotatorEntity,
        new CustomSerializer(
            (value, insideString) => `${value.P}, ${value.Y}, ${value.R}`,
            SimpleSerializationRotatorEntity
        )
    )

    SerializerFactory.registerSerializer(
        SimpleSerializationVector2DEntity,
        new CustomSerializer(
            (value, insideString) => `${value.X}, ${value.Y}`,
            SimpleSerializationVector2DEntity
        )
    )

    SerializerFactory.registerSerializer(
        SimpleSerializationVectorEntity,
        new CustomSerializer(
            (value, insideString) => `${value.X}, ${value.Y}, ${value.Z}`,
            SimpleSerializationVectorEntity
        )
    )

    SerializerFactory.registerSerializer(
        SymbolEntity,
        new ToStringSerializer(SymbolEntity)
    )

    SerializerFactory.registerSerializer(
        UnknownKeysEntity,
        new Serializer(UnknownKeysEntity, (entity, string) => `${entity.getLookbehind() ?? ""}(${string})`)
    )

    SerializerFactory.registerSerializer(
        VariableReferenceEntity,
        new Serializer(VariableReferenceEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        Vector2DEntity,
        new Serializer(Vector2DEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        VectorEntity,
        new Serializer(VectorEntity, Serializer.bracketsWrapped)
    )
}
