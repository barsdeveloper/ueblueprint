import ByteEntity from "../entity/ByteEntity"
import CustomSerializer from "./CustomSerializer"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GeneralSerializer from "./GeneralSerializer"
import GuidEntity from "../entity/GuidEntity"
import IdentifierEntity from "../entity/IdentifierEntity"
import Integer64Entity from "../entity/Integer64Entity"
import IntegerEntity from "../entity/IntegerEntity"
import InvariantTextEntity from "../entity/InvariantTextEntity"
import KeyBindingEntity from "../entity/KeyBindingEntity"
import LinearColorEntity from "../entity/LinearColorEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"
import MacroGraphReferenceEntity from "../entity/MacroGraphReferenceEntity"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import ObjectSerializer from "./ObjectSerializer"
import PathSymbolEntity from "../entity/PathSymbolEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import PinTypeEntity from "../entity/PinTypeEntity"
import RealUnitEntity from "../entity/UnitRealEntity"
import RotatorEntity from "../entity/RotatorEntity"
import SerializerFactory from "./SerializerFactory"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity"
import SymbolEntity from "../entity/SymbolEntity"
import ToStringSerializer from "./ToStringSerializer"
import UnknownKeysEntity from "../entity/UnknownKeysEntity"
import Utility from "../Utility"
import VariableReferenceEntity from "../entity/VariableReferenceEntity"
import Vector2DEntity from "../entity/Vector2DEntity"
import VectorEntity from "../entity/VectorEntity"

/**
 * @typedef {import("../entity/IEntity").AnySimpleValue} AnySimpleValue
 * @typedef {import("../entity/IEntity").AnyValue} AnyValue
 */

export default function initializeSerializerFactory() {

    const bracketsWrapped = v => `(${v})`

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
                        SerializerFactory.getSerializer(Utility.getType(v)).serialize(v, insideString) + ","
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
        FunctionReferenceEntity,
        new GeneralSerializer(bracketsWrapped, FunctionReferenceEntity)
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
        new GeneralSerializer(v => `${InvariantTextEntity.lookbehind}(${v})`, InvariantTextEntity, "", ", ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        KeyBindingEntity,
        new GeneralSerializer(bracketsWrapped, KeyBindingEntity)
    )

    SerializerFactory.registerSerializer(
        LinearColorEntity,
        new GeneralSerializer(bracketsWrapped, LinearColorEntity)
    )

    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new GeneralSerializer(v => `${LocalizedTextEntity.lookbehind}(${v})`, LocalizedTextEntity, "", ", ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        MacroGraphReferenceEntity,
        new GeneralSerializer(bracketsWrapped, MacroGraphReferenceEntity)
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
        new GeneralSerializer(v => `${PinEntity.lookbehind} (${v})`, PinEntity, "", ",", true)
    )

    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new GeneralSerializer(v => v, PinReferenceEntity, "", " ", false, "", _ => "")
    )

    SerializerFactory.registerSerializer(
        PinTypeEntity,
        new GeneralSerializer(bracketsWrapped, PinTypeEntity)
    )

    SerializerFactory.registerSerializer(
        RealUnitEntity,
        new ToStringSerializer(RealUnitEntity)
    )

    SerializerFactory.registerSerializer(
        RotatorEntity,
        new GeneralSerializer(bracketsWrapped, RotatorEntity)
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
        new GeneralSerializer((string, entity) => `${entity.lookbehind ?? ""}(${string})`, UnknownKeysEntity)
    )

    SerializerFactory.registerSerializer(
        VariableReferenceEntity,
        new GeneralSerializer(bracketsWrapped, VariableReferenceEntity)
    )

    SerializerFactory.registerSerializer(
        Vector2DEntity,
        new GeneralSerializer(bracketsWrapped, Vector2DEntity)
    )

    SerializerFactory.registerSerializer(
        VectorEntity,
        new GeneralSerializer(bracketsWrapped, VectorEntity)
    )
}
