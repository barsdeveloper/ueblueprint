import ByteEntity from "../entity/ByteEntity.js"
import CustomSerializer from "./CustomSerializer.js"
import EnumEntity from "../entity/EnumEntity.js"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import IdentifierEntity from "../entity/IdentifierEntity.js"
import Integer64Entity from "../entity/Integer64Entity.js"
import IntegerEntity from "../entity/IntegerEntity.js"
import InvariantTextEntity from "../entity/InvariantTextEntity.js"
import ISerializer from "./ISerializer.js"
import KeyBindingEntity from "../entity/KeyBindingEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import LocalizedTextEntity from "../entity/LocalizedTextEntity.js"
import MacroGraphReferenceEntity from "../entity/MacroGraphReferenceEntity.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity.js"
import ObjectSerializer from "./ObjectSerializer.js"
import PathSymbolEntity from "../entity/PathSymbolEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import RealUnitEntity from "../entity/UnitRealEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
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

/**
 * @typedef {import("../entity/IEntity").AnySimpleValue} AnySimpleValue
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 */

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
                        // @ts-expect-error
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
        EnumEntity,
        new ToStringSerializer(EnumEntity)
    )

    SerializerFactory.registerSerializer(
        FunctionReferenceEntity,
        new ISerializer(FunctionReferenceEntity, ISerializer.bracketsWrapped)
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
        new ISerializer(InvariantTextEntity, v => `${InvariantTextEntity.lookbehind}(${v})`, "", ", ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        KeyBindingEntity,
        new ISerializer(KeyBindingEntity, ISerializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        LinearColorEntity,
        new ISerializer(LinearColorEntity, ISerializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new ISerializer(LocalizedTextEntity, v => `${LocalizedTextEntity.lookbehind}(${v})`, "", ", ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        MacroGraphReferenceEntity,
        new ISerializer(MacroGraphReferenceEntity, ISerializer.bracketsWrapped)
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
        new ISerializer(PinEntity, v => `${PinEntity.lookbehind} (${v})`, "", ",", true)
    )

    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new ISerializer(PinReferenceEntity, v => v, "", " ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        TerminalTypeEntity,
        new ISerializer(TerminalTypeEntity, ISerializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        RealUnitEntity,
        new ToStringSerializer(RealUnitEntity)
    )

    SerializerFactory.registerSerializer(
        RotatorEntity,
        new ISerializer(RotatorEntity, ISerializer.bracketsWrapped)
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
        new ISerializer(UnknownKeysEntity, (string, entity) => `${entity.lookbehind ?? ""}(${string})`)
    )

    SerializerFactory.registerSerializer(
        VariableReferenceEntity,
        new ISerializer(VariableReferenceEntity, ISerializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        Vector2DEntity,
        new ISerializer(Vector2DEntity, ISerializer.bracketsWrapped)
    )

    SerializerFactory.registerSerializer(
        VectorEntity,
        new ISerializer(VectorEntity, ISerializer.bracketsWrapped)
    )
}
