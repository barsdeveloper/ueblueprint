import ByteEntity from "../entity/ByteEntity.js"
import CustomSerializer from "./CustomSerializer.js"
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
import ObjectSerializer from "./ObjectSerializer.js"
import PathSymbolEntity from "../entity/PathSymbolEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import RealUnitEntity from "../entity/UnitRealEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
import Serializer from "./Serializer.js"
import SerializerFactory from "./SerializerFactory.js"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import TerminalTypeEntity from "../entity/TerminalTypeEntity.js"
import ToStringSerializer from "./ToStringSerializer.js"
import UnknownKeysEntity from "../entity/UnknownKeysEntity.js"
import Utility from "../Utility.js"
import VariableReferenceEntity from "../entity/VariableReferenceEntity.js"
import Vector2DEntity from "../entity/Vector2DEntity.js"
import VectorEntity from "../entity/VectorEntity.js"

/** @typedef {import("../entity/IEntity.js").AnySimpleValue} AnySimpleValue */

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
            /** @param {AnySimpleValue[]} array */
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
                let result = FormatTextEntity.lookbehind + "("
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
        new Serializer(InvariantTextEntity, (entity, v) => `${InvariantTextEntity.lookbehind}(${v})`, ", ", false, "", _ => "")
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
        new Serializer(LocalizedTextEntity, (entity, v) => `${LocalizedTextEntity.lookbehind}(${v})`, ", ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        MacroGraphReferenceEntity,
        new Serializer(MacroGraphReferenceEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        MirroredEntity,
        new Serializer(MirroredEntity)
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
            objectReference => (objectReference.type ?? "") + (
                objectReference.path
                    ? objectReference.type ? `'"${objectReference.path}"'` : `"${objectReference.path}"`
                    : ""
            ),
            ObjectReferenceEntity
        )
    )

    SerializerFactory.registerSerializer(
        PathSymbolEntity,
        new ToStringSerializer(PathSymbolEntity)
    )

    SerializerFactory.registerSerializer(
        PinEntity,
        new Serializer(PinEntity, (entity, v) => `${PinEntity.lookbehind} (${v})`, ",", true)
    )

    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new Serializer(PinReferenceEntity, undefined, " ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        TerminalTypeEntity,
        new Serializer(TerminalTypeEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        RealUnitEntity,
        new ToStringSerializer(RealUnitEntity)
    )

    SerializerFactory.registerSerializer(
        RotatorEntity,
        new Serializer(RotatorEntity, Serializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        String,
        new CustomSerializer(
            (value, insideString) => insideString
                // @ts-expect-error
                ? Utility.escapeString(value)
                // @ts-expect-error
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
        new Serializer(UnknownKeysEntity, (entity, string) => `${entity.lookbehind ?? ""}(${string})`)
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
