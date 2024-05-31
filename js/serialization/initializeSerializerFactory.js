import Parsernostrum from "parsernostrum"
import Utility from "../Utility.js"
import BlueprintEntity from "../entity/BlueprintEntity.js"
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
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import PinTypeEntity from "../entity/PinTypeEntity.js"
import RBSerializationVector2DEntity from "../entity/RBSerializationVector2DEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
import ScriptVariableEntity from "../entity/ScriptVariableEntity.js"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVector4DEntity from "../entity/SimpleSerializationVector4DEntity.js"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import TerminalTypeEntity from "../entity/TerminalTypeEntity.js"
import UnknownKeysEntity from "../entity/UnknownKeysEntity.js"
import VariableReferenceEntity from "../entity/VariableReferenceEntity.js"
import Vector2DEntity from "../entity/Vector2DEntity.js"
import Vector4DEntity from "../entity/Vector4DEntity.js"
import VectorEntity from "../entity/VectorEntity.js"
import CustomSerializer from "./CustomSerializer.js"
import Grammar from "./Grammar.js"
import ObjectSerializer from "./ObjectSerializer.js"
import Serializer from "./Serializer.js"
import SerializerFactory from "./SerializerFactory.js"
import ToStringSerializer from "./ToStringSerializer.js"
import BooleanEntity from "../entity/BooleanEntity.js"
import NumberEntity from "../entity/NumberEntity.js"
import StringEntity from "../entity/StringEntity.js"
import ArrayEntity from "../entity/ArrayEntity.js"
import AlternativesEntity from "../entity/AlternativesEntity.js"

export default function initializeSerializerFactory() {

    Grammar.unknownValue =
        Parsernostrum.alt(
            // Remember to keep the order, otherwise parsing might fail
            BooleanEntity.grammar,
            GuidEntity.grammar,
            Parsernostrum.str("None").map(() => ObjectReferenceEntity.createNoneInstance()),
            Grammar.null,
            NumberEntity.grammar,
            ObjectReferenceEntity.fullReferenceGrammar,
            StringEntity.grammar,
            LocalizedTextEntity.grammar,
            InvariantTextEntity.grammar,
            FormatTextEntity.grammar,
            PinReferenceEntity.grammar,
            Vector4DEntity.grammar,
            VectorEntity.grammar,
            RotatorEntity.grammar,
            LinearColorEntity.grammar,
            Vector2DEntity.grammar,
            UnknownKeysEntity.grammar,
            SymbolEntity.grammar,
            ArrayEntity.of(PinReferenceEntity).grammar,
            ArrayEntity.of(AlternativesEntity.accepting(NumberEntity, StringEntity, SymbolEntity)).grammar,
            Parsernostrum.lazy(() => ArrayEntity.createGrammar(Grammar.unknownValue)),
        )

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
                    .map(v => SerializerFactory.getSerializer(Utility.getType(v)).write(v, insideString))
                    .join(",")
                })`,
            Array
        )
    )

    SerializerFactory.registerSerializer(
        BigInt,
        new ToStringSerializer(BigInt)
    )

    SerializerFactory.registerSerializer(
        BlueprintEntity,
        new ObjectSerializer(BlueprintEntity),
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
        PinEntity,
        new Serializer(PinEntity, (entity, v) => `${entity.getLookbehind()} (${v})`, ",", true)
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
        ScriptVariableEntity,
        new Serializer(ScriptVariableEntity, Serializer.bracketsWrapped)
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
        SimpleSerializationVector4DEntity,
        new CustomSerializer(
            (value, insideString) => `${value.X}, ${value.Y}, ${value.Z}, ${value.W}`,
            SimpleSerializationVector4DEntity
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

    SerializerFactory.registerSerializer(
        Vector4DEntity,
        new Serializer(Vector4DEntity, Serializer.bracketsWrapped)
    )
}
